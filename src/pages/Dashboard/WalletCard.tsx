import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//Icons
import { Loader2 } from "lucide-react";
import { Send2, WalletAdd, DirectboxReceive, Category, Copy, CopySuccess } from "iconsax-react";


export default function WalletCard({ walletId, balance, isLoading }: WalletCardProps) {

    const [copied, setCopied] = useState<boolean>(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletId)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    const actions = [
        { icon: <Send2 size={20} />, label: "Send", url: "/user/coins?page=send" },
        { icon: <DirectboxReceive size={20} />, label: "Receive", url: "/user/coins?page=receive" },
        { icon: <WalletAdd size={20} />, label: "Buy", url: "/user/buy" },
        { icon: <Category size={20} />, label: "Detail", url: "/user/transactions" },
    ]

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-black shadow-lg rounded-2xl">
            <div className="p-4 md:p-5 xl:p-6 pb-0">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-primary">WALLET ID</span>
                    {isLoading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                </div>
                <div className="flex items-center space-x-2 mb-1">
                    <span className="text-neutral-300 text-sm md:text-base xl:text-lg">{walletId}</span>
                    <button onClick={copyToClipboard} className="text-neutral-400 hover:text-neutral-200 transition-colors">
                        {copied ? <CopySuccess size={20} className="text-green-600" variant="Bold" /> : <Copy size={20} />}
                        <span className="sr-only">Copy wallet ID</span>
                    </button>
                    {copied && (
                        <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-primary">
                            Copied!
                        </motion.span>
                    )}
                </div>
            </div>

            <div className="px-4 md:px-5 xl:px-6 py-4">
                {isLoading ? (
                    <div className="flex items-center space-x-4 h-12">
                        <div className="bg-neutral-800 rounded w-24 h-8 animate-pulse"></div>
                    </div>
                ) : (
                    <h2 className="font-bold text-white text-3xl md:text-4xl xl:text-5xl">{balance}</h2>
                )}
            </div>

            <div className="grid grid-cols-4 border-neutral-800 border-y divide-x divide-neutral-800">
                {actions.map((action, index) => (
                    <Link to={action.url} key={index} className="flex flex-col justify-center items-center hover:bg-neutral-900 disabled:opacity-50 py-5 transition-colors disabled:cursor-not-allowed">
                        <div className="flex justify-center items-center bg-neutral-800 mb-2 rounded-full w-10 h-10">
                            {isLoading ? <Loader2 size={16} className="text-neutral-400 animate-spin" /> : action.icon}
                        </div>
                        <span className="text-neutral-300 text-xs">{action.label}</span>
                    </Link>
                ))}
            </div>
        </motion.div>
    )
}

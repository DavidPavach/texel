import { motion } from "framer-motion";

//Icons
import { EmptyWalletTick } from "iconsax-react";
import { CheckCircle,Info } from "lucide-react";

type WalletConnectedNoticeProps = {
    walletName?: string
    variant?: "success" | "info" | "warning"
}

export default function Done({ walletName, variant }: WalletConnectedNoticeProps) {


    const getVariantStyles = () => {
        switch (variant) {
            case "success":
                return {
                    bg: "bg-green-500/10",
                    border: "border-green-500/20",
                    icon: "text-green-400",
                    text: "text-green-100",
                    accent: "text-green-400",
                }
            case "warning":
                return {
                    bg: "bg-yellow-500/10",
                    border: "border-yellow-500/20",
                    icon: "text-yellow-400",
                    text: "text-yellow-100",
                    accent: "text-yellow-400",
                }
            case "info":
            default:
                return {
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/20",
                    icon: "text-blue-400",
                    text: "text-blue-100",
                    accent: "text-blue-400",
                }
        }
    }

    const styles = getVariantStyles()

    return (
        <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.3, type: "spring" }} className={`relative ${styles.bg} ${styles.border} mt-10 border rounded-xl p-4 backdrop-blur-sm  max-w-2xl mx-auto`}>

            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    {variant === "success" ? (
                        <CheckCircle size={20} className={styles.icon} />
                    ) : (
                        <Info size={20} className={styles.icon} />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <EmptyWalletTick size={24} className={styles.accent} />
                        <h3 className={`font-medium ${styles.text}`}>Wallet Connected</h3>
                    </div>
                    <p className="my-2 text-neutral-300">
                        Your <span className={`font-medium ${styles.accent}`}>{walletName}</span> wallet is successfully connected.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 md:text-xs xl:text-sm">
                        <span>Address:</span>
                        <code className="bg-black/20 px-2 py-1 rounded font-mono">{"###...###...###"}</code>
                    </div>
                    <p className="mt-2 text-[10px] text-neutral-400 md:text-xs xl:text-sm">
                        You cannot initiate another wallet connection while this wallet is active.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

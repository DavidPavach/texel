import { motion } from "framer-motion";

//Components
import { SecurityUser } from "iconsax-react";
import { CheckCircle, Info } from "lucide-react";

type DoneProps = {
    variant?: "success" | "info" | "warning";
    heading: string;
    idType: string;
    gender: string;
    images: string[];
};

export default function Done({ variant = "info", heading, idType, gender, images }: DoneProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case "success":
                return {
                    bg: "bg-green-500/10",
                    border: "border-green-500/20",
                    icon: "text-green-400",
                    text: "text-green-100",
                    accent: "text-green-400",
                };
            case "warning":
                return {
                    bg: "bg-yellow-500/10",
                    border: "border-yellow-500/20",
                    icon: "text-yellow-400",
                    text: "text-yellow-100",
                    accent: "text-yellow-400",
                };
            case "info":
            default:
                return {
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/20",
                    icon: "text-blue-400",
                    text: "text-blue-100",
                    accent: "text-blue-400",
                };
        }
    };

    const styles = getVariantStyles();

    return (
        <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.3, type: "spring" }} className={`relative ${styles.bg} ${styles.border} mt-10 border rounded-xl p-4 backdrop-blur-sm max-w-2xl mx-auto`}>
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-0.5">
                    {variant === "success" ? (
                        <CheckCircle size={20} className={styles.icon} />
                    ) : (
                        <Info size={20} className={styles.icon} />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <SecurityUser variant="Bold" size={24} className={styles.accent} />
                        <h3 className={`font-medium ${styles.text}`}>{heading}</h3>
                    </div>

                    <div className="space-y-1 text-neutral-300 text-sm md:text-base capitalize">
                        <p>
                            <span className={`font-medium ${styles.accent}`}>ID Type:</span>{" "}
                            {idType}
                        </p>
                        <p>
                            <span className={`font-medium ${styles.accent}`}>Gender:</span>{" "}
                            {gender}
                        </p>
                    </div>

                    <div className="mt-3">
                        <p className="mb-1 text-neutral-400 text-xs">Uploaded ID Images:</p>
                        <div className="gap-2 grid grid-cols-2">
                            {images.map((src, idx) => (
                                <img key={idx} src={src} alt={`ID ${idx + 1}`} className="border border-neutral-700 rounded-lg w-full h-32 object-cover" />
                            ))}
                        </div>
                    </div>

                    <p className="mt-3 text-[10px] text-neutral-400 md:text-xs xl:text-sm">
                        You will be notified once your identity is verified. Please ensure
                        your ID matches your profile details.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

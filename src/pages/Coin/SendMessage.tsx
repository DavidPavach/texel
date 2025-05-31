"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom";

type CheckmarkProps = { size?: number; strokeWidth?: number; color?: string; className?: string }

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: {
                delay: i * 0.2,
                type: "spring",
                duration: 1.5,
                bounce: 0.2,
                ease: "easeInOut",
            },
            opacity: { delay: i * 0.2, duration: 0.2 },
        },
    }),
}

export function Checkmark({ size = 100, strokeWidth = 2, color = "currentColor", className = "" }: CheckmarkProps) {
    return (
        <motion.svg width={size} height={size} viewBox="0 0 100 100" initial="hidden" animate="visible" className={className}>
            <title>Animated Checkmark</title>
            <motion.circle cx="50" cy="50" r="40" stroke={color} variants={draw} custom={0}
                style={{
                    strokeWidth,
                    strokeLinecap: "round",
                    fill: "transparent",
                }} />
            <motion.path d="M30 50L45 65L70 35" stroke={color} variants={draw} custom={1} style={{
                strokeWidth,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                fill: "transparent",
            }} />
        </motion.svg>
    )
}

export default function SendMessage({ message }: { message: string }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-30 fixed inset-0 flex justify-center items-center bg-black/90 p-4">
            <main className="flex flex-col justify-center items-center space-y-5 bg-[#121212] shadow-2xl px-4 py-8 rounded-xl w-full max-w-md">
                <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                        scale: {
                            type: "spring",
                            damping: 15,
                            stiffness: 200,
                        },
                    }}>
                    <div className="relative">
                        <motion.div
                            className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 0.2,
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                        />
                        <Checkmark size={80} strokeWidth={4} color="rgb(16 185 129)" className="z-10 relative" />
                    </div>
                </motion.div>
                <motion.div className="space-y-2 w-full text-neutral-100 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
                    <motion.h2 className="font-semibold text-base md:text-lg xl:text-xl uppercase tracking-tighter"
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.4 }}>
                        Transfer Successful
                    </motion.h2>
                    <p className="text-sm md:text-base xl:text-lg">{message}</p>
                </motion.div>
                <div className="flex justify-between items-center w-full">
                    <Link to={'/user/transactions'} className="text-neutral-400">Transactions</Link>
                    <Link to={'/user/dashboard'} className="font-medium text-primary hover:text-yellow-600 hover:underline duration-300">Go to Dashboard</Link>
                </div>
            </main>
        </motion.div>
    )
}

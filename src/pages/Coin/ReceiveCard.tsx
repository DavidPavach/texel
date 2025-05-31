import { useState } from "react";

//Enums
import { coinMeta, getWallet } from "@/enums";

//Icons
import { Copy, CheckCircle, AlertTriangle, Share2 } from "lucide-react";



export default function Receive({ coin }: { coin: string }) {

    //Constants
    const currency = coinMeta[coin].name;
    const currencySymbol = coinMeta[coin].symbol;
    const currencyLogo = coinMeta[coin].logo;
    const address = getWallet[coin].walletAddress;
    const estimatedTime = getWallet[coin].estimatedTime;
    const coinQrCode = getWallet[coin].qrCode;
    const coinNetwork = getWallet[coin].network;

    //States
    const [copied, setCopied] = useState<boolean>(false);

    //Functions
    const copyToClipboard = () => {
        navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    const shareAddress = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${currency} Deposit Address`,
                    text: `My ${currency} deposit address: ${address}`,
                })
            } catch (err) {
                console.error("Error sharing:", err)
            }
        } else {
            copyToClipboard()
        }
    }

    return (
        <main>
            <div className="bg-black shadow-xl border border-neutral-800 rounded-xl">
                <div className="flex justify-between items-center p-4 border-neutral-800 border-b">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10">
                            <img src={currencyLogo || "/coin.svg"} alt={currency} className="rounded-lg w-full h-full object-contain" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-base md:text-lg xl:text-xl">{currency}</h1>
                            <p className="text-neutral-400 text-sm md:text-base xl:text-lg">{coinNetwork} Network</p>
                        </div>
                    </div>
                    <div className="bg-[#1E1E1E] px-4 py-1 rounded-full">
                        <span className="font-medium text-[#00E676] text-[10px] md:text-xs xl:text-sm">Active</span>
                    </div>
                </div>

                <div className="flex flex-col items-center p-6">
                    <p className="mb-4 text-neutral-300 text-center">Scan QR code to Deposit</p>
                    <div className="group relative bg-white p-1 rounded-xl">
                        <img src={coinQrCode} alt={`${currency} Qr Image`} className="h-60 md:h-72 xl:h-80" />
                    </div>

                    <div className="mt-6 w-full">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-neutral-400 text-sm">Deposit Address</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#1E1E1E] px-4 py-3 border border-neutral-800 rounded-lg overflow-hidden text-white">
                                <p className="font-mono truncate">{address}</p>
                            </div>
                            <button onClick={copyToClipboard}
                                className={`min-w-[80px] h-10 rounded-lg flex items-center justify-center transition-colors ${copied ? "bg-yellow-800 text-primary" : "bg-primary hover:bg-yellow-800 text-black font-medium hover:text-white duration-300"
                                    }`}>
                                {copied ? (
                                    <>
                                        <CheckCircle size={16} className="mr-1" />
                                        <span>Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} className="mr-1" />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4 w-full">
                        <button onClick={shareAddress} className="flex flex-1 justify-center items-center gap-2 bg-[#1E1E1E] hover:bg-[#2A2A2A] py-2 rounded-lg text-white transition-colors">
                            <Share2 size={16} />
                            <span>Share</span>
                        </button>
                    </div>

                    <div className="gap-3 grid grid-cols-2 mt-6 w-full">
                        <div className="bg-[#1E1E1E] p-3 rounded-lg">
                            <p className="mb-1 text-neutral-400 text-xs">Estimated Time</p>
                            <p className="font-medium text-white text-sm">{estimatedTime}</p>
                        </div>
                        <div className="bg-[#1E1E1E] p-3 rounded-lg">
                            <p className="mb-1 text-neutral-400 text-xs">Coin Network</p>
                            <p className="font-medium text-white text-sm">{coinNetwork}</p>
                        </div>
                    </div>

                    <div className="mt-6 w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-white">Disclaimer</span>
                            <div className="flex-1 bg-neutral-800 h-px"></div>
                        </div>
                        <div className="flex gap-3 bg-[#FF9800]/10 p-4 border border-[#FF9800]/20 rounded-lg">
                            <AlertTriangle size={20} className="flex-shrink-0 mt-1 text-[#FF9800]" />
                            <div>
                                <p className="text-neutral-300">
                                    Please deposit only <span className="font-medium text-white">{currencySymbol}</span> ({currency}) to
                                    this address, and make sure the network {coinNetwork} is the same. If you deposit any other coins, it will be lost forever.
                                </p>
                                <p className="mt-2 text-neutral-400">
                                    Deposits require network confirmations. Your funds will be available in your account after{" "}
                                    {estimatedTime}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

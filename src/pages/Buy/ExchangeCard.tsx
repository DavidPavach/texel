import { useState } from "react";

//Icons
import { Play, ExternalLink, Info, Shield, CreditCard, Clock } from "lucide-react";


export default function ExchangeCard({ name, logo, description, videoId, features, paymentMethods, processingTime, securityLevel, url }: ExchangeCardProps) {

    const [showVideo, setShowVideo] = useState(false)

    const getSecurityColor = (level: string) => {
        switch (level) {
            case "high":
                return "text-green-500"
            case "medium":
                return "text-yellow-500"
            case "low":
                return "text-red-500"
            default:
                return "text-neutral-500"
        }
    }

    return (
        <div className="bg-black shadow-lg border border-neutral-800 hover:border-neutral-700 rounded-xl overflow-hidden transition-colors">
            <div className="p-6">
                <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative size-8 md:size-10 xl:size-12">
                            <img src={logo || "/coin.svg"} alt={`${name} logo`} className="rounded-[50%] w-full h-full object-cover" />
                        </div>
                        <h3 className="font-bold text-white text-base md:text-lg xl:text-xl">{name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Shield size={16} className={getSecurityColor(securityLevel)} />
                            <span className={`text-sm ${getSecurityColor(securityLevel)}`}>
                                {securityLevel.charAt(0).toUpperCase() + securityLevel.slice(1)} Security
                            </span>
                        </div>
                    </div>
                </div>

                <p className="mb-6 text-neutral-400">{description}</p>

                <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-6">
                    <div className="bg-neutral-900 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard size={16} className="text-primary" />
                            <h4 className="font-medium text-[10px] text-white md:text-xs xl:text-sm">Payment Methods</h4>
                        </div>
                        <ul className="space-y-1 text-neutral-400 text-sm">
                            {paymentMethods.map((method, index) => (
                                <li key={index}>{method}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-neutral-900 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock size={16} className="text-primary" />
                            <h4 className="font-medium text-[10px] text-white md:text-xs xl:text-sm">Processing Time</h4>
                        </div>
                        <p className="text-neutral-400 text-sm">{processingTime}</p>
                    </div>

                    <div className="bg-neutral-900 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Info size={16} className="text-primary" />
                            <h4 className="font-medium text-[10px] text-white md:text-xs xl:text-sm">Features</h4>
                        </div>
                        <ul className="space-y-1 text-neutral-400 text-sm">
                            {features.map((feature, index) => (
                                <li key={index}>• {feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex md:flex-row flex-col gap-4">
                    <button onClick={() => setShowVideo(!showVideo)} className="flex flex-1 justify-center items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-lg text-white transition-colors">
                        <Play size={18} />
                        <span>{showVideo ? "Hide Tutorial" : "Watch Tutorial"}</span>
                    </button>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                        className="flex flex-1 justify-center items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg font-medium text-black transition-colors">
                        <span>Buy on {name}</span>
                        <ExternalLink size={18} />
                    </a>
                </div>
            </div>

            {showVideo && (
                <div className="bg-neutral-900 w-full aspect-video">
                    <iframe src={`https://www.youtube.com/embed/${videoId}`} title={`How to buy cryptocurrency on ${name}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            )}
        </div>
    )
}

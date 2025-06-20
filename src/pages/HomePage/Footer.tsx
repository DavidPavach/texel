import { Link } from "react-router-dom";
import { toast } from "react-fox-toast";

//Images
import google from "/googleStore.png";
import apple from "/appleStore.png";

//Icons
import { Copyright } from "iconsax-react";
import { Mail } from "lucide-react";

const PAGES = [
    { page: "Send & Receive", path: "/send" },
    { page: "Buy & Sell", path: "/buy" },
    { page: "Businesses", path: "/business" },
    { page: "About", path: "/about" },
]

const BUTTONS = [
    { page: "Log in", path: "/login" },
    { page: "Sign up", path: "/create" },
]

export default function Footer() {

    const currentYear = new Date().getFullYear()

    const legalLinks = [
        { name: "Privacy Policy", to: "/privacy" },
    ]

    return (
        <footer className="bg-black p-4 md:p-6 xl:p-8 text-white">
            <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-8">
                <div className="space-y-4">
                    <h3 className="font-bold text-primary text-sm md:text-base xl:text-xl">TexelChain</h3>
                    <p className="text-neutral-300">The world's most trusted cryptocurrency platform.</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-neutral-300">
                            <Mail className="size-4" />
                            <span>support@texelchain.org</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-white">Platform</h4>
                    <div className="space-y-2">
                        {PAGES.map((link) => (
                            <Link key={link.path} to={link.path} className="block text-neutral-300 hover:text-primary text-sm transition-colors">
                                {link.page}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-white">Account</h4>
                    <div className="space-y-2">
                        {BUTTONS.map((link) => (
                            <Link key={link.path} to={link.path} className="block text-neutral-300 hover:text-primary transition-colors">
                                {link.page}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-white">App Stores</h4>
                    <img src={google} className="h-8 cursor-pointer" alt="Google Store" onClick={() => toast.info("The App is currently not available in your Region. Kindly use the web app.")} />
                    <img src={apple} className="h-8 cursor-pointer" alt="Apple Store" onClick={() => toast.info("The App is currently not available in your Region. Kindly use the web app.")} />
                </div>
            </div>

            <div className="pt-8 border-neutral-800 border-t">
                <div className="flex md:flex-row flex-col justify-between items-center gap-4">
                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                        {legalLinks.map((link) => (
                            <Link key={link.to} to={link.to} className="text-[10px] text-neutral-400 hover:text-primary md:text-xs xl:text-sm transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <p className="text-[10px] text-neutral-400 md:text-xs xl:text-smtext-center md:text-right">
                        <Copyright size="16" className="inline" /> {currentYear} CryptoTrade. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

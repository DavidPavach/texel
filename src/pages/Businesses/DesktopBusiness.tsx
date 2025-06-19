//Components
import { Badge } from "@/components/ui/badge";

//Icons
import { Monitor, Shield, TrendingUp, Users, CheckCircle } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-level encryption and multi-signature protection for institutional-grade security",
    },
    {
        icon: TrendingUp,
        title: "Real-time Analytics",
        description: "Advanced portfolio tracking with detailed transaction history and performance metrics",
    },
    {
        icon: Users,
        title: "Team Management",
        description: "Multi-user access controls with role-based permissions for business operations",
    },
]

const businessBenefits = [
    "Multi-currency support with 100+ cryptocurrencies",
    "Advanced API integration for business systems",
    "Compliance reporting and audit trails",
    "24/7 dedicated business support",
    "Custom white-label solutions available",
    "Institutional-grade custody services",
]

export default function DesktopBusiness() {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0">
                <div className="top-0 left-1/4 absolute bg-primary/5 blur-3xl rounded-full w-96 h-96"></div>
                <div className="right-1/4 bottom-0 absolute bg-accent/5 blur-3xl rounded-full w-96 h-96"></div>
            </div>

            <div className="z-10 relative">
                <div className="items-center gap-12 grid lg:grid-cols-2">
                    <div className="space-y-8">
                        <div>
                            <Badge className="bg-primary/20 hover:bg-primary/20 my-4 py-1 w-fit font-medium text-primary">
                                <Monitor className="mr-2 size-4" />
                                Desktop Platform
                            </Badge>
                            <h2 className="mb-6 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">
                                Professional{" "}
                                <span className="bg-clip-text bg-gradient-to-r from-primary to-accent text-transparent">
                                    Crypto Management
                                </span>
                            </h2>
                            <p className="mx-auto mt-4 mb-8 max-w-[60ch] text-sm md:text-base xl:text-lg">
                                Manage your business cryptocurrency portfolio with our comprehensive desktop platform. Track
                                transactions, monitor performance, and execute trades with institutional-grade tools.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="mb-6 font-bold text-white text-base sm:text-lg md:text-xl xl:text-2xl">Enterprise Features</h3>
                            <div className="gap-4 grid">
                                {features.map((feature, index) => {
                                    const IconComponent = feature.icon
                                    return (
                                        <div key={index} className="flex items-start gap-4 bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm p-4 border border-neutral-600/20 hover:border-primary/30 rounded-xl transition-all duration-300">
                                            <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg w-10 h-10">
                                                <IconComponent className="size-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="mb-1 font-semibold text-white text-sm md:text-base xl:text-lg">{feature.title}</h4>
                                                <p className="text-neutral-300 text-sm">{feature.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-30 blur-3xl scale-110"></div>
                        <div className="relative bg-gradient-to-br from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm p-4 border border-neutral-600/20 hover:border-primary/30 rounded-2xl transition-all duration-300">
                            <img src="/business.jpg" alt="Professional cryptocurrency wallet desktop interface showing portfolio management" className="shadow-2xl rounded-xl w-full h-auto"
                                crossOrigin="anonymous" />

                            {/* Floating Stats */}
                            <div className="-bottom-6 -left-6 absolute bg-gradient-to-r from-green-500/90 to-green-600/90 shadow-lg backdrop-blur-sm p-4 rounded-xl">
                                <div className="font-medium text-white text-sm">Portfolio Value</div>
                                <div className="font-bold text-white text-base sm:text-lg md:text-xl xl:text-2xl">$203,193.10</div>
                                <div className="text-green-200 text-xs">+12.5% (24h)</div>
                            </div>

                            <div className="-top-6 -right-6 absolute bg-gradient-to-r from-primary/90 to-accent/90 shadow-lg backdrop-blur-sm p-4 rounded-xl">
                                <div className="font-medium text-black text-sm">Active Wallets</div>
                                <div className="font-bold text-black text-base sm:text-lg md:text-xl xl:text-2xl">3</div>
                                <div className="text-black/70 text-xs">Multi-chain</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <div className="mb-12 text-center">
                        <h3 className="mb-4 font-bold text-white text-lg sm:text-xl md:text-2xl xl:text-3xl">Why Businesses Choose Us</h3>
                        <p className="mx-auto max-w-2xl text-neutral-300">
                            Comprehensive features designed for professional cryptocurrency management
                        </p>
                    </div>

                    <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
                        {businessBenefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-neutral-800/30 to-neutral-700/30 backdrop-blur-sm p-4 border border-neutral-600/20 rounded-xl">
                                <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                <span className="text-neutral-200 text-sm">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

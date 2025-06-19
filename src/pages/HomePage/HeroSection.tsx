import { Link } from "react-router-dom"

//Icons
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative rounded-xl min-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent"></div>
            <div className="top-1/4 right-1/4 absolute bg-yellow-400/5 blur-3xl rounded-full w-96 h-96"></div>
            <div className="bottom-1/4 left-1/4 absolute bg-blue-400/5 blur-3xl rounded-full w-64 h-64"></div>

            <div className="relative mx-auto px-4 py-12 lg:py-20 container">
                <div className="min-h-[80vh]">
                    <div className="space-y-8 lg:space-y-10">
                        <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-4 py-2 border border-yellow-400/20 rounded-full font-medium text-yellow-400 text-sm">
                            <TrendingUp className="size-4" />
                            #1 Crypto Trading Platform
                        </div>

                        <div className="space-y-4">
                            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight grotesk">
                                <span className="text-yellow-400">Discover, Exchange, and Thrive</span>
                                <span className="block mt-2 text-white">on Our Cryptocurrency Trading Platform.</span>
                            </h1>
                        </div>
                        <p className="max-w-[40ch] text-base md:text-lg xl:text-xl leading-relaxed">
                            TexelChain is the premier platform for purchasing, earning, holding, and transferring cryptocurrency. Join
                            millions of traders worldwide and start your crypto journey today.
                        </p>
                        <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 py-6">
                            <div className="flex items-center gap-3 text-gray-300">
                                <Shield className="w-5 h-5 text-yellow-400" />
                                <span className="text-sm">Bank-level Security</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                <span className="text-sm">Instant Trading</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <TrendingUp className="w-5 h-5 text-yellow-400" />
                                <span className="text-sm">Real-time Analytics</span>
                            </div>
                        </div>

                        <div className="flex sm:flex-row flex-col gap-4 pt-4">
                            <Link to="/create" className="group inline-flex justify-center items-center gap-2 bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-400/25 px-8 py-4 rounded-xl font-semibold text-black hover:scale-105 transition-all duration-300">
                                Get Started
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="gap-8 grid grid-cols-3 mx-auto pt-8 border-gray-800 border-t text-center">
                            <div>
                                <div className="font-bold text-yellow-400 text-2xl lg:text-3xl">10M+</div>
                                <div className="text-gray-400 text-sm">Active Users</div>
                            </div>
                            <div>
                                <div className="font-bold text-yellow-400 text-2xl lg:text-3xl">$50B+</div>
                                <div className="text-gray-400 text-sm">Trading Volume</div>
                            </div>
                            <div>
                                <div className="font-bold text-yellow-400 text-2xl lg:text-3xl">99.9%</div>
                                <div className="text-gray-400 text-sm">Uptime</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex justify-center items-center my-20 lg:h-[600px]">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 blur-2xl rounded-3xl scale-110"></div>
                            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 border border-gray-700/50 rounded-3xl">
                                <img src="/hero.png" alt="TexelChain Cryptocurrency Trading Platform" width={500} height={600} className="w-full h-auto object-contain" />
                            </div>
                            <div className="-top-4 -right-4 absolute bg-green-500 px-3 py-1 rounded-full font-medium text-white text-sm animate-pulse">
                                +24.5%
                            </div>
                            <div className="-bottom-4 -left-4 absolute bg-yellow-400 px-3 py-1 rounded-full font-medium text-black text-sm">
                                Live Trading
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black to-transparent h-32"></div>
        </section>
    )
}

export default HeroSection

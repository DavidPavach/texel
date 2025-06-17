import { useState } from "react";
import { Link } from "react-router-dom";

//Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

//Icons
import { Zap, Globe, CheckCircle, ArrowUpRight, Smartphone, QrCode, TrendingDown, Clock, DollarSign } from "lucide-react"

export default function Instant() {

    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    return (
        <section className="space-y-8 my-10">

            <div className="space-y-4 text-center">
                <Badge className="bg-primary/20 hover:bg-primary/20 px-4 py-2 text-primary">
                    <Zap className="mr-2 size-4" />
                    Lightning Fast Crypto Experience
                </Badge>
                <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">Everything you need for crypto trading</h2>
                <p className="mx-auto mt-4 max-w-[60ch] text-sm md:text-base xl:text-lg">
                    Experience seamless cryptocurrency transactions with our advanced platform designed for modern traders.
                </p>
            </div>

            <div className="gap-8 grid lg:grid-cols-2">
                <Card className="group relative bg-gradient-to-br from-lightBlack via-neutral-800 to-neutral-900 shadow-2xl hover:shadow-3xl border-0 overflow-hidden text-white transition-all duration-500" onMouseEnter={() => setHoveredCard(1)} onMouseLeave={() => setHoveredCard(null)}>

                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 opacity-50" />
                    <div className="top-0 right-0 absolute bg-primary/10 blur-3xl rounded-full w-64 h-64 -translate-y-32 translate-x-32 transform" />
                    <div className="bottom-0 left-0 absolute bg-accent/10 blur-2xl rounded-full w-48 h-48 -translate-x-24 translate-y-24 transform" />

                    <CardContent className="relative flex flex-col p-4 md:p-6 xl:p-8 h-full">
                        <div className="z-10 relative flex-1 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex justify-center items-center bg-primary/20 rounded-xl size-12">
                                            <Zap className="size-6 text-primary" />
                                        </div>
                                        <Badge className="bg-green-500/20 hover:bg-green-500/20 text-green-400">
                                            <Globe className="mr-1 size-3" />
                                            Global Network
                                        </Badge>
                                    </div>

                                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl leading-tight">
                                        Instantly send & receive
                                        <span className="block text-primary">crypto anytime</span>
                                    </h3>

                                    <p className="max-w-[50ch] text-neutral-100 leading-relaxed">
                                        No waiting, no worrying—transact instantly and globally through the Lightning Network with
                                        enterprise-grade security.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-neutral-100">
                                    <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                    <span>Lightning Network integration</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-100">
                                    <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                    <span>QR code scanning & generation</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-100">
                                    <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                    <span>Real-time transaction tracking</span>
                                </div>
                            </div>
                        </div>

                        <div className="z-10 relative pt-6 border-neutral-700 border-t">
                            <Link to="/create"><Button className="group/btn bg-primary hover:bg-primary/90 px-6 py-3 font-semibold text-black transition-all duration-300" size="lg">
                                <Smartphone className="mr-2 size-5" />
                                Get Started
                                <ArrowUpRight className="ml-2 size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                            </Button></Link>
                        </div>

                        <div className={`absolute -bottom-4 -right-4 transition-all duration-700 ${hoveredCard === 1 ? "transform scale-105 rotate-1" : ""}`}>
                            <div className="relative">
                                <div className="bg-neutral-900 shadow-2xl border border-neutral-600 rounded-3xl w-48 h-96 overflow-hidden">
                                    <div className="space-y-4 p-4">
                                        <div className="bg-neutral-700 rounded-full h-6" />
                                        <div className="space-y-2">
                                            <div className="bg-neutral-600 rounded w-3/4 h-4" />
                                            <div className="bg-neutral-600 rounded w-1/2 h-4" />
                                        </div>
                                        <div className="flex justify-center items-center bg-primary/20 mx-auto rounded-xl w-32 h-32">
                                            <QrCode className="w-16 h-16 text-primary" />
                                        </div>
                                        <div className="bg-primary rounded-xl h-12" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="group relative bg-gradient-to-br from-lightBlack via-neutral-800 to-neutral-900 shadow-2xl hover:shadow-3xl border-0 overflow-hidden text-white transition-all duration-500" onMouseEnter={() => setHoveredCard(2)} onMouseLeave={() => setHoveredCard(null)}>

                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/10 opacity-50" />
                    <div className="top-0 left-0 absolute bg-accent/10 blur-3xl rounded-full w-64 h-64 -translate-x-32 -translate-y-32 transform" />
                    <div className="right-0 bottom-0 absolute bg-primary/10 blur-2xl rounded-full w-48 h-48 translate-x-24 translate-y-24 transform" />

                    <CardContent className="relative flex flex-col p-4 md:p-6 xl:p-8 h-full">
                        <div className="z-10 relative flex-1 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex justify-center items-center bg-accent/20 rounded-xl size-12">
                                            <TrendingDown className="size-6 text-accent" />
                                        </div>
                                        <Badge className="bg-blue-500/20 hover:bg-blue-500/20 text-blue-400">
                                            <Clock className="mr-1 size-3" />
                                            Real-time
                                        </Badge>
                                    </div>

                                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl leading-tight">
                                        Buy the dip without
                                        <span className="block text-accent">delay and worry</span>
                                    </h3>

                                    <p className="max-w-[50ch] text-neutral-100 leading-relaxed">
                                        We make buying cryptocurrencies safe and convenient, ensuring a seamless experience with advanced
                                        market analysis tools.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-neutral-100">
                                    <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                    <span>Instant market execution</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-100">
                                    <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                    <span>Smart price alerts & notifications</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-100">
                                    <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                    <span>Secure payment processing</span>
                                </div>
                            </div>
                        </div>

                        <div className="z-10 relative pt-6 border-neutral-700 border-t">
                            <Link to="/login"><Button className="group/btn bg-accent hover:bg-accent/90 px-6 py-3 font-semibold text-white transition-all duration-300" size="lg">
                                <DollarSign className="mr-2 size-5" />
                                Start Buying
                                <ArrowUpRight className="ml-2 size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                            </Button></Link>
                        </div>

                        <div className={`absolute -bottom-4 -right-4 transition-all duration-700 ${hoveredCard === 2 ? "transform scale-105 rotate-1" : ""}`}>
                            <div className="relative">
                                <div className="bg-neutral-900 shadow-2xl border border-neutral-600 rounded-3xl w-48 h-96 overflow-hidden">
                                    <div className="space-y-4 p-4">
                                        <div className="bg-neutral-700 rounded-full h-6" />
                                        <div className="space-y-2 text-center">
                                            <div className="font-bold text-white text-2xl">$150</div>
                                            <div className="bg-neutral-600 mx-auto rounded w-2/3 h-4" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="bg-neutral-600 rounded h-4" />
                                            <div className="bg-neutral-600 rounded w-3/4 h-4" />
                                        </div>
                                        <div className="bg-accent rounded-xl h-12" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

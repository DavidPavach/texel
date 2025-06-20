/* eslint-disable @typescript-eslint/no-explicit-any */

//Components
import { Badge } from "@/components/ui/badge";

//Icons
import { ChartSquare } from "iconsax-react";
import { Target, Eye, Heart, Users, TrendingUp, Shield } from "lucide-react";


const mvvData: MVVItem[] = [
    {
        title: "Mission",
        content: "Form alliances with other companies and service providers as part of a strategic partnership initiative.",
        icon: Target,
        gradient: "from-blue-500/10 to-primary/10",
        iconBg: "from-blue-500/20 to-primary/20",
    },
    {
        title: "Vision",
        content: "Minimizing the risk of slippage and maximizing your potential gains.",
        icon: Eye,
        gradient: "from-purple-500/10 to-accent/10",
        iconBg: "from-purple-500/20 to-accent/20",
    },
    {
        title: "Values",
        content: "We assist in the growth of your finances through active management, not merely through promises.",
        icon: Heart,
        gradient: "from-green-500/10 to-primary/10",
        iconBg: "from-green-500/20 to-primary/20",
    },
]

const supportingFeatures = [
    {
        icon: Users,
        title: "Strategic Partnerships",
        description: "Building meaningful alliances that drive mutual growth",
    },
    {
        icon: TrendingUp,
        title: "Risk Management",
        description: "Advanced algorithms to minimize slippage and optimize returns",
    },
    {
        icon: Shield,
        title: "Active Management",
        description: "Hands-on approach to growing your financial portfolio",
    },
]

export default function MissionVisionValues() {
    return (
        <section className="relative bg-lightBlack py-20 overflow-hidden">
            <div className="absolute inset-0">
                <div className="top-0 left-1/4 absolute bg-primary/5 blur-3xl rounded-full w-96 h-96"></div>
                <div className="right-1/4 bottom-0 absolute bg-accent/5 blur-3xl rounded-full w-96 h-96"></div>
                <div className="top-1/2 left-1/2 absolute bg-gradient-to-r from-primary/3 to-accent/3 blur-3xl rounded-full w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 transform"></div>
            </div>

            <div className="z-10 relative">
                <div className="mb-16 text-center">
                    <Badge className="bg-primary/20 hover:bg-primary/20 my-4 py-1 w-fit font-medium text-primary">
                        <ChartSquare className="mr-2 size-4" />
                        Our Foundation
                    </Badge>
                    <h2 className="mb-6 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">
                        Driven by{" "}
                        <span className="bg-clip-text bg-gradient-to-r from-primary to-accent text-transparent">Purpose</span>
                    </h2>

                    <p className="mx-auto mt-4 mb-8 max-w-[60ch] text-sm md:text-base xl:text-lg">
                        Our mission, vision, and values guide every decision we make and every partnership we forge
                    </p>
                </div>
                <div className="gap-8 grid lg:grid-cols-3 mb-20">
                    {mvvData.map((item, index) => {
                        const IconComponent = item.icon
                        return (
                            <div key={item.title} className="group relative">
                                {index < mvvData.length - 1 && (
                                    <div className="hidden lg:block top-20 left-full z-0 absolute bg-gradient-to-r from-primary/30 to-transparent w-full h-0.5 translate-x-8 transform"></div>
                                )}
                                <div className={`relative bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-neutral-600/20 rounded-2xl p-4 md:-6 xl:p-8 hover:border-primary/30 transition-all duration-500 group-hover:transform group-hover:scale-105 z-10 h-full`}>
                                    <div className="top-0 right-0 absolute flex justify-center items-center bg-gradient-to-br from-primary to-accent shadow-lg rounded-lg size-8 md:size-10 xl:size-12 font-bold text-black">
                                        <p className="text-sm md:text-base xl:text-lg">{String(index + 1).padStart(2, "0")}</p>
                                    </div>
                                    <div className={`size-12 md:size-14 xl:size-16 bg-gradient-to-br ${item.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="size-6 md:size-7 xl:size-8 text-primary" />
                                    </div>
                                    <h3 className="mb-4 font-bold text-white group-hover:text-primary text-lg md:text-xl xl:text-2xl transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="mb-6 text-neutral-200 text-sm md:text-base xl:text-lg leading-relaxed">{item.content}</p>
                                    <div className="right-4 bottom-4 absolute opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                                        <IconComponent className="size-12 text-primary" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mb-16">
                    <div className="mb-12 text-center">
                        <h3 className="mb-4 font-bold text-white text-lg sm:text-xl md:text-2xl xl:text-3xl">How We Deliver</h3>
                        <p className="mx-auto max-w-2xl text-neutral-300">
                            Our core principles translate into tangible benefits and measurable results for our clients
                        </p>
                    </div>

                    <div className="gap-6 grid md:grid-cols-3">
                        {supportingFeatures.map((feature, index) => {
                            const IconComponent = feature.icon
                            return (
                                <div key={index} className="group bg-gradient-to-br from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm p-6 border border-neutral-600/20 hover:border-primary/30 rounded-xl hover:scale-105 transition-all duration-300 hover:transform">
                                    <div className="flex justify-center items-center bg-gradient-to-br from-primary/20 to-accent/20 mb-4 rounded-lg size-8 md:size-10 xl:size-12 group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="size-4 md:size-5 xl:size-6 text-primary" />
                                    </div>
                                    <h4 className="mb-2 font-semibold text-white group-hover:text-primary text-sm md:text-base xl:text-lg transition-colors duration-300">
                                        {feature.title}
                                    </h4>
                                    <p className="text-neutral-300 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

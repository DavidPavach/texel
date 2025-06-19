//Images
import { Badge } from "@/components/ui/badge";
import send from "/send.jpeg";

//Icons
import { Shield, Calculator, Heart, TrendingUp } from "lucide-react";

export default function CryptoSection() {
    const features = [
        {
            icon: Shield,
            title: "Automated self-custody",
            description:
                "Our automatic withdrawals feature gives you a hands-off way to send your cryptocurrency to self-custody.",
        },
        {
            icon: Calculator,
            title: "Tax optimization features",
            description: "Track tax lots and configure cost basis methods for optimal tax planning.",
        },
        {
            icon: Heart,
            title: "Safeguard your wealth",
            description: "Create a personalized beneficiary plan to pass your cryptocurrency on to your loved ones.",
        },
    ]

    return (
        <section className="bg-neutral-900 my-10 p-4 md:p-6 xl:p-8 border border-neutral-600 rounded-xl">
            <main className="flex md:flex-row flex-col md:justify-between md:items-center gap-5 my-4">
                <div className="md:w-[48%]">
                    <Badge className="bg-primary/20 hover:bg-primary/20 my-4 px-4 py-1 w-fit font-medium text-primary">
                        <TrendingUp className="mr-2 size-4" />
                        Trusted by 500,000+ Users
                    </Badge>
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">Secure Your Speed:<span className="text-primary"> Instant Crypto Transfers.</span></h1>
                    <p className="mt-4 max-w-[50ch] text-sm md:text-base xl:text-lg">Sending and receiving crypto has never been this seamless and secure. We are engineered for blazing-fast transactions.</p>
                </div>
                <div className="md:w-[48%]">
                    <img src={send} alt="Receive Section Image" className="rounded-xl" />
                </div>
            </main>
            <div className="gap-8 grid sm:grid-cols-2 md:grid-cols-3">
                {features.map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                        <div key={index} className="group bg-gradient-to-br from-neutral-600/10 to-neutral-600/5 backdrop-blur-sm p-4 md:p-6 xl:p-8 border border-neutral-600/20 hover:border-primary/30 rounded-2xl hover:scale-105 transition-all duration-300 hover:transform">
                            <div className="flex justify-center items-center bg-gradient-to-br from-primary/20 group-hover:from-primary/30 to-accent/20 group-hover:to-accent/30 mb-6 rounded-xl size-14 transition-all duration-300">
                                <IconComponent className="size-5 md:size-6 xl:size-7 text-primary" />
                            </div>

                            <h3 className="mb-4 font-bold text-white group-hover:text-primary text-base md:text-lg xl:text-xl transition-colors duration-300">
                                {feature.title}
                            </h3>

                            <p className="text-neutral-200 leading-relaxed">{feature.description}</p>

                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

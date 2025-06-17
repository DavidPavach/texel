//Components
import { Badge } from "@/components/ui/badge";

//Images
import receive from "/receive.jpg";

//Icons
import { Lock, Shield } from "iconsax-react";
import { CheckCircle, TrendingUp, Zap } from "lucide-react";

const Receive = () => {

    const features = [
        {
            icon: <Shield className="size-5" />,
            title: "Bank-Level Security",
            description: "Multi-layer encryption & cold storage",
        },
        {
            icon: <Zap className="size-5" />,
            title: "Lightning Fast",
            description: "Swift, reliable and instant transfers",
        },
        {
            icon: <Lock className="size-5" />,
            title: "Secure Wallets",
            description: "Your keys, your crypto, your control",
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
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">Receive, Hodl and Transfer<span className="text-primary">  with Confidence.</span></h1>
                    <p className="mt-4 max-w-[50ch] text-sm md:text-base xl:text-lg">Easily transfer your cryptocurrencies using just a few clicks and keep your assets safe in our secure wallets.</p>
                    <div className="gap-2 grid grid-cols-3 pt-4 text-[10px] sm:text-xs md:text-sm xl:text-base">
                        <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="size-3 md:size-4 xl:size-5" />
                            <span className="font-medium">$2B+ Secured</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="size-3 md:size-4 xl:size-5" />
                            <span className="font-medium">99.9% Uptime</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="size-3 md:size-4 xl:size-5" />
                            <span className="font-medium">24/7 Support</span>
                        </div>
                    </div>
                </div>
                <div className="md:w-[48%]">
                    <img src={receive} alt="Receive Section Image" className="rounded-xl" />
                </div>
            </main>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mt-4 py-6">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 bg-neutral-50 p-4 border border-neutral-100 rounded-lg">
                        <div className="flex flex-shrink-0 justify-center items-center bg-primary/20 rounded-lg size-10 text-primary">
                            {feature.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lightBlack text-sm">{feature.title}</h3>
                            <p className="mt-1 text-neutral-600 text-xs">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default Receive; 
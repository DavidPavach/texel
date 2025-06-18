import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Images
import cardFront from "/card_front.jpg";
import cardBack from "/card_back.jpg";

//Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

//Icons
import { CreditCard, Shield, Zap, Globe, CheckCircle, ArrowRight, Smartphone } from "lucide-react";
import { Wallet1 } from "iconsax-react";

export default function CardShowcase() {

    const navigate = useNavigate();
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

    const cardFeatures = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Bank-Level Security",
            description: "Advanced encryption and fraud protection",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Instant Transactions",
            description: "Real-time payments and transfers",
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Global Acceptance",
            description: "Use anywhere Mastercard is accepted",
        },
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: "Mobile Integration",
            description: "Seamless app and digital wallet support",
        },
    ]

    const benefits = [
        "Perfect for online transactions and bill payments",
        "Simplified financial management and cash flow",
        "Short-term credit options with competitive rates",
        "Comprehensive insurance protection included",
        "Advanced expenditure monitoring and analytics",
        "Exclusive benefits within our ecosystem",
    ]

    return (
        <div className="py-16">
            <div className="space-y-6 text-center">
                <Badge className="bg-primary/20 hover:bg-primary/20 px-4 py-2 text-primary">
                    <CreditCard className="mr-2 size-4" />
                    Premium Financial Solutions
                </Badge>

                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">
                    Introducing our
                    <span className="block text-primary">Premium Card</span>
                </h1>

                <p className="mx-auto max-w-[60ch] text-sm md:text-base xl:text-lg">
                    Integrating high-quality trading cards into your business processes can significantly enhance your
                    organization's financial health and operational efficiency.
                </p>
            </div>

            <div className="items-center gap-12 grid lg:grid-cols-2 my-10">
                <div className="flex flex-col gap-y-5 bg-transparent">
                    <img src={cardFront} alt="Card Front Design" className="rounded-2xl sm:rounded-3xl md:rounded-[2.5rem]" />
                    <img src={cardBack} alt="Card Back Design" className="rounded-2xl sm:rounded-3xl md:rounded-[2.5rem]" />
                </div>

                <div className="space-y-8 bg-neutral-900 p-4 md:p-6 xl:p-8 border border-neutral-600 rounded-xl">
                    <div className="space-y-6">
                        <h2 className="font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl leading-tight">
                            Elevate your financial
                            <span className="block text-primary">Experience</span>
                        </h2>

                        <p className="text-sm md:text-base xl:text-lg leading-relaxed">
                            These cards are perfect for making online transactions, paying bills, and handling tax obligations.
                            They simplify your financial transactions, increase available cash flow, and offer comprehensive benefits.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle className="flex-shrink-0 mt-0.5 size-5 text-green-500" />
                                <span className="text-neutral-400">{benefit}</span>
                            </div>
                        ))}
                    </div>

                    <Button onClick={() => navigate("/create")} className="group bg-primary hover:bg-primary/90 px-8 py-3 font-semibold text-black">
                        <Wallet1 className="mr-2 size-5" />
                        Apply Now
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>

            <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
                {cardFeatures.map((feature, index) => (
                    <Card key={index} className="group shadow-sm hover:shadow-lg border-neutral-200 transition-all duration-300 cursor-pointer" onMouseEnter={() => setHoveredFeature(index)} onMouseLeave={() => setHoveredFeature(null)}>
                        <CardContent className="space-y-2 p-4 text-center">
                            <div className={`size-12 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${hoveredFeature === index ? "bg-primary text-black scale-110" : "bg-primary/20 text-primary"
                                }`}>
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="mb-2 font-semibold text-lightBlack">{feature.title}</h3>
                                <p className="text-neutral-600 text-sm">{feature.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

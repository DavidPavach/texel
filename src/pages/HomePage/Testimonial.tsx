import { Link } from "react-router-dom";

//Components
import TestimonialCarousel from "./TestimonialCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

//Icons
import { Star, Users, TrendingUp, Shield } from "lucide-react"

export default function Testimonial() {

    const stats = [
        { label: "Happy Customers", value: "500,000+", icon: <Users className="size-5" /> },
        { label: "Average Rating", value: "4.9/5", icon: <Star className="size-5" /> },
        { label: "Success Rate", value: "99.8%", icon: <TrendingUp className="size-5" /> },
        { label: "Secure Transactions", value: "$2B+", icon: <Shield className="size-5" /> },
    ]

    return (
        <div className="py-16">
            <div>
                <div className="space-y-6 mb-16 text-center">
                    <Badge className="bg-primary/20 hover:bg-primary/20 px-4 py-2 font-medium text-primary">
                        <Star className="fill-current mr-2 size-4" />
                        Trusted by Thousands
                    </Badge>
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">
                        What our customers
                        <span className="block text-primary">are saying</span>
                    </h1>
                    <p className="mx-auto max-w-[60ch] text-sm md:text-base xl:text-lg">
                        Don't just take our word for it. Here's what real users have to say about their experience with our
                        platform.
                    </p>
                </div>

                <div className="gap-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
                    {stats.map((stat, index) => (
                        <Card key={index} className="shadow-sm hover:shadow-md border-neutral-200 transition-shadow">
                            <CardContent className="space-y-3 p-4 md:p-6 xl:p-8 text-center">
                                <div className="flex justify-center items-center bg-primary/20 mx-auto rounded-xl size-12 text-primary">
                                    {stat.icon}
                                </div>
                                <div className="font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl leading-tight">{stat.value}</div>
                                <div className="text-neutral-600 text-sm">{stat.label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <TestimonialCarousel />

                <div className="space-y-2 mt-16 text-center">
                    <h2 className="font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl leading-tight">
                        Ready to join thousands of satisfied customers?
                    </h2>
                    <p className="mx-auto max-w-2xl text-neutral-300 text-sm md:text-base xl:text-lg">
                        Experience the same level of service and security that our customers rave about.
                    </p>
                    <Link to="/create" className="block">
                        <button className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold text-black transition-colors">
                            Get Started Today
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

//Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

//Icons
import { Shield, Scale, CheckCircle, Award, Star, Verified } from "lucide-react";

export default function Assets() {

    return (
        <section className="space-y-12 my-10">
            <div className="space-y-6 text-center">
                <Badge className="bg-primary/20 hover:bg-primary/20 px-4 py-2 font-medium text-primary">
                    <Award className="mr-2 size-4" />
                    Industry Leading Security
                </Badge>
                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">
                    Your crypto, <span className="text-primary">your control</span>
                </h1>
                <p className="mx-auto max-w-[60ch] text-sm md:text-base xl:text-lg">
                    Built on institutional-grade security with full regulatory compliance. Your assets are protected by the same
                    standards trusted by the world's largest financial institutions.
                </p>
            </div>

            <div className="gap-8 grid lg:grid-cols-2">

                <Card className="group relative bg-gradient-to-br from-lightBlack via-neutral-800 to-neutral-900 shadow-2xl hover:shadow-3xl border-0 overflow-hidden text-white transition-all duration-500">

                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-green-500/10 opacity-50" />
                    <div className="top-0 right-0 absolute bg-primary/10 blur-3xl rounded-full w-64 h-64 -translate-y-32 translate-x-32 transform" />
                    <div className="bottom-0 left-0 absolute bg-green-500/10 blur-2xl rounded-full w-48 h-48 -translate-x-24 translate-y-24 transform" />

                    <CardContent className="relative space-y-8 p-4 md:p-6 xl:p-8">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex justify-center items-center bg-primary/20 rounded-2xl size-16">
                                    <Shield className="size-8 text-primary" />
                                </div>
                                <Badge className="bg-green-500/20 hover:bg-green-500/20 text-green-400">
                                    <Verified className="mr-1 size-3" />
                                    Verified
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl leading-tight">
                                    100% full reserve
                                    <span className="block text-primary">custody</span>
                                </h3>
                                <p className="text-neutral-300 text-sm md:text-base xl:text-lg leading-relaxed">
                                    All assets are held 1:1 with complete transparency. We never use, lend, or stake your
                                    cryptocurrencies. Your assets remain yours alone, always.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-neutral-300">
                                <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                <span>Real-time proof of reserves</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-300">
                                <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                <span>Cold storage with multi-signature security</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-300">
                                <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                <span>Third-party audited reserves</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-300">
                                <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                <span>Insurance coverage up to $250M</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="group relative bg-gradient-to-br from-lightBlack via-neutral-800 to-neutral-900 shadow-2xl hover:shadow-3xl border-0 overflow-hidden text-white transition-all duration-500">

                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-accent/10 opacity-50" />
                    <div className="top-0 left-0 absolute bg-blue-500/10 blur-3xl rounded-full w-64 h-64 -translate-x-32 -translate-y-32 transform" />
                    <div className="right-0 bottom-0 absolute bg-accent/10 blur-2xl rounded-full w-48 h-48 translate-x-24 translate-y-24 transform" />

                    <CardContent className="relative space-y-8 p-4 md:p-6 xl:p-8">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex justify-center items-center bg-blue-500/20 rounded-2xl size-16">
                                    <Scale className="size-8 text-blue-400" />
                                </div>
                                <Badge className="bg-blue-500/20 hover:bg-blue-500/20 text-blue-400">
                                    <Award className="mr-1 size-3" />
                                    Compliant
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl leading-tight">
                                    Licensed and
                                    <span className="block text-blue-400">regulated</span>
                                </h3>
                                <p className="text-neutral-300 text-sm md:text-base xl:text-lg leading-relaxed">
                                    Operating in a secure and licensed environment with full regulatory compliance. Trusted by over 2
                                    million active users worldwide.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-neutral-300">
                                <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                <span>Licensed in 50+ jurisdictions</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-300">
                                <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                <span>AML/KYC compliance</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-300">
                                <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                <span>Regular regulatory audits</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-300">
                                <CheckCircle className="flex-shrink-0 size-5 text-green-400" />
                                <span>Consumer protection guarantees</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-gradient-to-r from-neutral-50 to-neutral-100 shadow-sm border-neutral-200">
                <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                            <Star className="fill-current size-4 md:size-5 xl:size-6 text-primary" />
                            <Star className="fill-current size-4 md:size-5 xl:size-6 text-primary" />
                            <Star className="fill-current size-4 md:size-5 xl:size-6 text-primary" />
                            <Star className="fill-current size-4 md:size-5 xl:size-6 text-primary" />
                            <Star className="fill-current size-4 md:size-5 xl:size-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lightBlack text-base sm:text-lg md:text-xl xl:text-2xl">Trusted by millions worldwide</h3>
                        <p className="mx-auto max-w-2xl text-neutral-600">
                            Join over 2 million users who trust us with their digital assets. Our commitment to security,
                            transparency, and regulatory compliance has made us the preferred choice for crypto custody.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

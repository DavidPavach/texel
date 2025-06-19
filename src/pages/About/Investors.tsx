import { Badge } from "@/components/ui/badge";

//Icons
import { Handshake } from "lucide-react"
import { Link } from "react-router-dom";

const investors: Investor[] = [
    {
        name: "Polychain Capital",
        description: "Leading blockchain investment firm",
        website: "https://polychain.capital",
        category: "venture",
        logo: "/polychain.svg",
    },
    {
        name: "Castle Island Ventures",
        description: "Public blockchain-focused VC",
        website: "https://castleisland.vc",
        category: "venture",
        logo: "/castle.svg",
    },
    {
        name: "The Co Lab",
        description: "Innovation and technology accelerator",
        website: "https://thecolab.com",
        category: "strategic",
        logo: "/ideo.svg",
    },
    {
        name: "Goldcrest Capital",
        description: "Private equity and venture capital",
        website: "https://goldcrestcapital.com",
        category: "institutional",
        logo: "/goldcrest.svg",
    },
    {
        name: "Craft Ventures",
        description: "Early-stage venture capital firm",
        website: "https://craft.co",
        category: "venture",
        logo: "/craft.svg",
    },
    {
        name: "M13",
        description: "Consumer technology venture capital",
        website: "https://m13.co",
        category: "venture",
        logo: "/m13.svg",
    },
]

const categoryColors = {
    venture: "from-blue-500/20 to-primary/20",
    strategic: "from-purple-500/20 to-accent/20",
    institutional: "from-green-500/20 to-primary/20",
}

const categoryLabels = {
    venture: "Venture Capital",
    strategic: "Strategic Partner",
    institutional: "Institutional",
}

export default function Investors() {

    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0">
                <div className="top-0 left-1/4 absolute bg-primary/5 blur-3xl rounded-full w-96 h-96"></div>
                <div className="right-1/4 bottom-0 absolute bg-accent/5 blur-3xl rounded-full w-96 h-96"></div>
            </div>

            <div className="z-10 relative">
                <div className="mb-16 text-center">
                    <Badge className="bg-primary/20 hover:bg-primary/20 my-4 py-1 w-fit font-medium text-primary">
                        <Handshake className="mr-2 size-4" />
                        Trusted by Industry Leaders
                    </Badge>
                    <h2 className="mb-6 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">
                        Our <span className="bg-clip-text bg-gradient-to-r from-primary to-accent text-transparent">Investors</span>
                    </h2>
                    <p className="mx-auto mt-4 mb-8 max-w-[60ch] text-sm md:text-base xl:text-lg">
                        Backed by world-class investors and strategic partners who share our vision for the future of finance
                    </p>
                    <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mx-auto max-w-2xl">
                        <div className="text-center">
                            <div className="bg-clip-text bg-gradient-to-r from-primary to-accent mb-1 font-bold text-transparent text-lg sm:text-xl md:text-2xl xl:text-3xl">
                                $50M+
                            </div>
                            <div className="text-neutral-400 text-sm">Total Funding</div>
                        </div>
                        <div className="text-center">
                            <div className="bg-clip-text bg-gradient-to-r from-primary to-accent mb-1 font-bold text-transparent text-lg sm:text-xl md:text-2xl xl:text-3xl">
                                15+
                            </div>
                            <div className="text-neutral-400 text-sm">Strategic Partners</div>
                        </div>
                        <div className="text-center">
                            <div className="bg-clip-text bg-gradient-to-r from-primary to-accent mb-1 font-bold text-transparent text-lg sm:text-xl md:text-2xl xl:text-3xl">
                                Series B
                            </div>
                            <div className="text-neutral-400 text-sm">Funding Round</div>
                        </div>
                    </div>
                </div>

                <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16">
                    {investors.map((investor) => (
                        <div key={investor.name} className="group relative">
                            <div className="relative bg-gradient-to-br from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm p-4 md:p-6 xl:p-8 border border-neutral-600/20 hover:border-primary/30 rounded-2xl h-full overflow-hidden group-hover:scale-105 transition-all duration-300 group-hover:transform">
                                <div className="top-4 right-4 absolute">
                                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[investor.category]} border border-primary/20 text-primary`}>
                                        {categoryLabels[investor.category]}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className={`size-16 bg-gradient-to-br ${categoryColors[investor.category]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <img src={investor.logo || "/logo.svg"} alt={investor.name} className="grayscale group-hover:grayscale-0 max-w-full max-h-full object-contain transition-all duration-300 filter"
                                        />
                                    </div>

                                    <h3 className="mb-2 font-bold text-white group-hover:text-primary text-base md:text-lg xl:text-xl transition-colors duration-300">
                                        {investor.name}
                                    </h3>

                                    {investor.description && (
                                        <p className="text-neutral-300 text-sm leading-relaxed">{investor.description}</p>
                                    )}
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>

                                {investor.website && (
                                    <div className="right-8 bottom-4 left-8 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Link to={investor.website} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:text-accent text-sm transition-colors">
                                            Visit Website →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <div className="inline-flex items-center gap-8 bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm px-4 md:px-6 xl:px-8 py-6 border border-neutral-600/20 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <div className="bg-green-400 rounded-full size-3"></div>
                            <span className="font-medium text-neutral-200 text-sm">SEC Compliant</span>
                        </div>
                        <div className="bg-neutral-600 w-px h-6"></div>
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-400 rounded-full size-3"></div>
                            <span className="font-medium text-neutral-200 text-sm">SOC 2 Certified</span>
                        </div>
                        <div className="bg-neutral-600 w-px h-6"></div>
                        <div className="flex items-center gap-2">
                            <div className="bg-primary rounded-full size-3"></div>
                            <span className="font-medium text-neutral-200 text-sm">Audited by Big 4</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

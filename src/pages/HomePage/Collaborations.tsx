import { Link } from "react-router-dom";

//Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

//Images
import collaboration from "/collaboration.png";

//Icons
import { ArrowUpRight, Handshake } from "lucide-react";
import { BuyCrypto } from "iconsax-react";

const Collaborations = () => {
    return (
        <main className="flex md:flex-row flex-col-reverse md:justify-between md:items-center gap-5 bg-neutral-900 my-10 p-4 md:p-6 xl:p-8 border border-neutral-600 rounded-xl">
            <div className="md:w-[48%]">
                <img src={collaboration} alt="Collaboration" className="rounded-xl" />
            </div>
            <div className="md:w-[48%]">
                <Badge className="bg-primary/20 hover:bg-primary/20 my-4 px-4 py-1 w-fit font-medium text-primary">
                    <Handshake className="mr-2 size-4" />
                    Serving since 2018
                </Badge>
                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">Collaborations</h1>
                <p className="mx-auto mt-4 max-w-[60ch] text-sm md:text-base xl:text-lg">Our expert team is here to serve the sophisticated investors investing more than $100,000 of Tether (USDT).</p>
                <Link to="/login"><Button className="group/btn bg-primary hover:bg-primary/90 my-4 px-6 py-3 font-semibold text-black transition-all duration-300" size="lg">
                    <BuyCrypto className="mr-2 size-5" />
                    Get Started
                    <ArrowUpRight className="ml-2 size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </Button></Link>
            </div>
        </main>
    );
}

export default Collaborations;
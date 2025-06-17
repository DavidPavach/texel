import { Link } from "react-router-dom";

//Images
import heroSection from "/hero_section.webp";

const HeroSection = () => {
    return (
        <main className="flex md:flex-row flex-col md:justify-between md:items-center gap-5 my-4 md:my-8 xl:my-12">
            <div className="flex flex-col gap-y-2 md:w-[48%]">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl grotesk"><span className="text-primary">Discover, Exchange, and Thrive</span> on Our Cryptocurrency Trading Platform.</h1>
                <p className="max-w-[40ch] text-sm md:text-base xl:text-lg">TexelChain is the premier platform for purchasing, earning, holding, and transferring cryptocurrency.</p>
                <Link to="/create" className="block bg-primary mt-4 px-12 py-3 rounded-xl w-fit text-black hover:scale-105 duration-300">Get Started</Link>
            </div>
            <div className="md:w-[48%]">
                <img src={heroSection} alt="Hero Section Image" />
            </div>
        </main>
    );
}

export default HeroSection;
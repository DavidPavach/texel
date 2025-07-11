//Components
import HeroSection from "./HeroSection";
import CryptoWidget from "./PriceMarquee";
import Manage from "./Manage";
import Receive from "./Receive";
import Instant from "./Instant";
import Collaborations from "./Collaborations";
import Assets from "./Assets";
import Testimonial from "./Testimonial";
import CardShowcase from "./Card";
import FAQ from "./FAQ";

const index = () => {
    return ( 
        <main>
            <HeroSection />
            <CryptoWidget />
            <Manage />
            <Receive />
            <Instant />
            <Collaborations />
            <Assets />
            <Testimonial />
            <CardShowcase />
            <FAQ />
        </main>
     );
}
 
export default index;
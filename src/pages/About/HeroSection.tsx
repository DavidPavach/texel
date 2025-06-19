//Components
import { ReusableHero } from "@/components/ReusableHero";

//Icons
import { InfoCircle } from "iconsax-react";

export default function AboutHero() {
    return (
        <ReusableHero
            badge={{ text: "Who We Are", icon: <InfoCircle className="size-4" /> }}
            title="Empowering the Future of Finance"
            description="At TexelChain, we believe in financial freedom for everyone. Learn more about our mission, values, and the team driving innovation in the crypto space."
            primaryCTA={{
                text: "Meet the Team",
                href: "/create",
                icon: <InfoCircle className="w-5 h-5" />,
            }}
            variant="centered"
            size="xl"
            breadcrumbs={[{ label: "About" }]}
        />
    );
}
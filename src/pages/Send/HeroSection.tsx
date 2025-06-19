//Components
import { ReusableHero } from "@/components/ReusableHero";

//Icons
import { Send2 } from "iconsax-react";

export default function SendHero() {
    return (
        <ReusableHero
            badge={{ text: "Fast Global Transfers", icon: <Send2 className="size-4" /> }}
            title="Send & Receive Crypto Instantly"
            description="Transfer cryptocurrencies across the world in seconds. Experience secure, fast, and low-cost transactions anytime, anywhere."
            primaryCTA={{
                text: "Get Started",
                href: "/create",
                icon: <Send2 className="size-5" />,
            }}
            variant="centered"
            size="xl"
            breadcrumbs={[{ label: "Send & Receive" }]}
        />
    );
}

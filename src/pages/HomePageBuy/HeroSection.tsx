//Components
import { ReusableHero } from "@/components/ReusableHero";

//Icons
import { ShoppingCart } from "iconsax-react";

export default function BuySellHero() {
    return (
        <ReusableHero
            badge={{ text: "Best Rates Guaranteed", icon: <ShoppingCart className="size-4" /> }}
            title="Buy & Sell Crypto with Confidence"
            description="Access the best cryptocurrency prices with our advanced trading platform. Buy low, sell high, and maximize your returns with professional-grade tools."
            primaryCTA={{
                text: "Start Trading",
                href: "/create",
                icon: <ShoppingCart className="size-5" />,
            }}
            variant="centered"
            size="xl"
            breadcrumbs={[{ label: "Buy & Sell" }]} />
    )
}
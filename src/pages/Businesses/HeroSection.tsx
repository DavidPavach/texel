//Components
import { ReusableHero } from "@/components/ReusableHero";

//Icons
import { Buildings } from "iconsax-react";

export default function BusinessHero() {
    return (
        <ReusableHero
            badge={{ text: "For Enterprises", icon: <Buildings className="size-4" /> }}
            title="Crypto Solutions for Businesses"
            description="Empower your business with scalable, secure crypto services. From payments to payroll, TexelChain offers enterprise-ready solutions tailored for your growth."
            primaryCTA={{
                text: "Explore Solutions",
                href: "/create",
                icon: <Buildings className="w-5 h-5" />,
            }}
            variant="centered"
            size="xl"
            breadcrumbs={[{ label: "Businesses" }]}
        />
    );
}
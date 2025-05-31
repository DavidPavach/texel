import { useEffect } from "react";

// Components
import Balance from "./Balance";
import Price from "./Price";

// Import Hooks and Stores
import { GetPrices } from "@/services/queries.service";
import { useUserStore } from "@/stores/userStore";

const Index = () => {
    const { setPrices } = useUserStore();
    const { data } = GetPrices();

    useEffect(() => {
        if (data?.data) {
            setPrices(data.data);
        }
    }, [data, setPrices]);

    return (
        <main>
            <Balance />
            <Price />
        </main>
    );
};

export default Index;

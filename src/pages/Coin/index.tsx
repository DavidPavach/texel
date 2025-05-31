import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

//Stores
import { useUserStore } from "@/stores/userStore";

//Component
import Send from "./Send";
import Receive from "./ReceiveCard";
import CoinDetails from "./CoinDetails";


const Index = () => {

    const navigate = useNavigate();
    const { prices, balance, refetchUserData } = useUserStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    const page = searchParams.get("page");
    const coin = searchParams.get("coin");

    useEffect(() => {
        if (!coin) {
            navigate("/user/dashboard");
        }
    }, [page, coin, navigate]);

    useEffect(() => {
        const loadData = async () => {
            if (!prices || !balance) {
                setIsLoading(true);
                await refetchUserData();
                setIsLoading(false);
            }
        };
        loadData();
    }, [prices, balance, refetchUserData]);

    useEffect(() => {
        if (!isLoading && (!prices || !balance)) {
            navigate("/user/dashboard");
        }
    }, [isLoading, prices, balance, navigate]);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-y-5 bg-black mt-4 p-4 md:p-5 xl:p-6 rounded-2xl">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                        <div className="bg-neutral-800 rounded-full w-8 h-8 animate-pulse"></div>
                        <div className="flex-1">
                            <div className="bg-neutral-800 rounded w-24 h-4 animate-pulse"></div>
                            <div className="bg-neutral-800 mt-2 rounded w-16 h-3 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <main>
            {page === "send" ? (
                <Send page={page} coin={coin!} prices={prices!} balance={balance!} />
            ) : page === "receive" ? (
                <Receive coin={coin!} />
            ) : (
                <CoinDetails coin={coin!} prices={prices!} balance={balance!} />
            )}
        </main>
    );
};

export default Index;

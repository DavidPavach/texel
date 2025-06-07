import { useEffect } from "react";

//Hooks, Stores and Utils
import { useGetUserBalance } from "@/services/queries.service";
import { calculateTotalUsd, formatCoinValue } from "@/stores/userStore";
import { useAdminStore } from "@/stores/adminStore";
import { formatCurrency } from "@/utils/format";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorDisplay from "@/components/Error";

export function UserBalance({ userId }: { userId: string }) {

    const { data, isFetching, isLoading, isError, refetch } = useGetUserBalance(userId);

    const { prices, fetchPrices } = useAdminStore();

    useEffect(() => {
        if (!prices || prices === null) {
            fetchPrices()
        }
    }, [fetchPrices, prices])

    const balance: Balance = data;

    //Records
    const cryptoSymbols: Record<keyof Balance, string> = {
        bitcoin: "BTC",
        ethereum: "ETH",
        "binance coin": "BNB",
        tron: "TRX",
        "usdt trc(20)": "USDT (TRC20)",
        "usdt erc(20)": "USDT (ERC20)",
        cardano: "ADA",
        solana: "SOL",
        "lite coin": "LTC",
        doge: "DOGE",
        texel: "TXL",
        dash: "DASH",
        "official trump": "TRUMP",
    }

    if (!userId) return <p className="my-4 text-center">Loading user data...</p>;

    return isError ? (
        <ErrorDisplay onRetry={() => refetch()} isFullPage={true} title="User Balance Failed" message="We couldn't load user's balance. Click below to try again." retryLabel="Reload Balance" />
    ) : (isFetching || isLoading) ? (
        <div className="flex flex-col gap-y-5 mt-4 px-4 pb-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                    <div className="bg-neutral-800 rounded-full size-8 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="bg-neutral-800 rounded w-[70%] h-4 animate-pulse"></div>
                        <div className="bg-neutral-800 mt-2 rounded w-[80%] h-3 animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    ) : balance ? (
            <div className="space-y-6">
                <Card className="shadow-sm border-neutral-200">
                    <CardHeader>
                        <CardTitle className="text-lightBlack">Portfolio Overview</CardTitle >
                    </CardHeader >
                    <CardContent>
                        <div className="text-center">
                            <p className="text-neutral-500">Total Portfolio Value (Estimated)</p>
                            <p className="font-bold text-lightBlack text-xl md:text-2xl xl:text-3xl">{formatCurrency(calculateTotalUsd(balance, prices!))}</p>
                        </div>
                    </CardContent>
                </Card >

                <Card className="shadow-sm border-neutral-200">
                    <CardHeader>
                        <CardTitle className="text-lightBlack">Cryptocurrency Balances</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(balance).map(([crypto, amount]) => (
                                <div key={crypto} className="flex justify-between items-center hover:bg-neutral-50 p-4 border border-neutral-200 rounded-lg transition-colors">
                                    <div>
                                        <p className="font-medium text-lightBlack capitalize">{crypto.replace(/([a-z])([A-Z])/g, "$1 $2")}</p>
                                        <p className="text-neutral-500 text-sm">{cryptoSymbols[crypto as keyof Balance]}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lightBlack">{amount}</p>
                                        {amount > 0 && <p className="text-accent text-sm">{formatCoinValue(crypto, amount, prices!)}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div >
        ) : (
            <h1 className="my-4 text-white text-center">Couldn't fetch transactions</h1>
        )
}

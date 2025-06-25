import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";

//Stores and Utils
import { useUserStore } from "@/stores/userStore";
import { formatCryptoAmount, formatCurrency, formatPercentage } from "@/utils/format";

//Icons
import { coinMap } from "@/enums";

const coinMeta: Record<string, { name: string; symbol: string; logo: string }> = {
    bitcoin: { name: "Bitcoin", symbol: "BTC", logo: "/bitcoin.jpg" },
    ethereum: { name: "Ethereum", symbol: "ETH", logo: "/ethereum.jpg" },
    "binance coin": { name: "Binance Coin", symbol: "BNB", logo: "/binance coin.jpg" },
    tron: { name: "Tron", symbol: "TRX", logo: "/tron.jpg" },
    "usdt trc(20)": { name: "Tether TRC20", symbol: "USDT", logo: "/tether.jpg" },
    "usdt erc(20)": { name: "Tether ERC20", symbol: "USDT", logo: "/tether.jpg" },
    cardano: { name: "Cardano", symbol: "ADA", logo: "/cardano.jpg" },
    solana: { name: "Solana", symbol: "SOL", logo: "/solana.jpg" },
    "lite coin": { name: "Litecoin", symbol: "LTC", logo: "/litecoin.jpg" },
    doge: { name: "Dogecoin", symbol: "DOGE", logo: "/doge.jpg" },
    texel: { name: "Texel", symbol: "TXL", logo: "/logo.svg" },
    dash: { name: "Dash", symbol: "DASH", logo: "/dash.jpg" },
    "bitcoin cash": { name: "Bitcoin Cash", symbol: "BCH", logo: "/bitcoin cash.jpg" },
    "official trump": { name: "Trump Coin", symbol: "TRUMP", logo: "/official trump.png" },
};

const CoinList = ({ page }: { page: string }) => {

    const { balance, prices, refetchUserData } = useUserStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(!prices)

    //Runs if there is no prices
    useEffect(() => {
        if (isLoading) {
            refetchUserData();
            setIsLoading(false);
        }
    }, [])


    //Generate Access List
    const assetList = Object.entries(balance || {}).map(([key, amount]) => {
        const meta = coinMeta[key.toLowerCase()] ?? {
            name: key,
            symbol: key.toUpperCase(),
            logo: "/coin.svg",
        };

        const apiKey = coinMap[key.toLowerCase()] ?? '';
        const priceObj = prices?.[apiKey];
        const price = priceObj?.usd ?? 0;
        const priceChange = priceObj?.usd_24h_change ?? 0;
        const value = amount * price;

        return { id: key, name: meta.name, symbol: meta.symbol, logo: meta.logo, price, priceChange24h: priceChange, balance: amount, value };
    });

    //Function
    const handlePageChange = (coin: string) => {
        if (coin.toLowerCase() === "texel") return toast.info("Sending and receiving Texel token is unavailable at the moment ⏳ but will be available soon!")
        navigate(`/user/coin?coin=${coin}&page=${page}`)
    }

    return isLoading ? (
        <div className="flex flex-col gap-y-5 bg-black mt-4 p-4 md:p-5 xl:p-6 rounded-2xl">
            {[...Array(7)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                    <div className="bg-neutral-800 rounded-full w-8 h-8 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="bg-neutral-800 rounded w-24 h-4 animate-pulse"></div>
                        <div className="bg-neutral-800 mt-2 rounded w-16 h-3 animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div className="bg-black mt-4 rounded-2xl overflow-hidden text-neutral-100">
            <div className="p-4 md:p-5 xl:p-6 border-neutral-800 border-b">
                <h2 className="font-medium text-sm md:text-base xl:text-lg">Asset Overview</h2>
            </div>

            <div className="divide-y divide-neutral-800">
                {assetList.sort((a, b) => b.value - a.value)
                    .map((asset) => (
                        <div onClick={() => handlePageChange(asset.id)} key={asset.id} className="hover:bg-neutral-900/50 p-4 md:p-5 xl:p-6 transition-colors cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 bg-neutral-800 rounded-full w-10 h-10 overflow-hidden">
                                        <img src={asset.logo} alt={asset.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{asset.name}</div>
                                        <div className="text-neutral-500 text-sm">{asset.symbol}</div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="font-medium text-white">{asset.name === "Texel" ? formatCurrency(52) : formatCurrency(asset.price)}</div>
                                    <div className={`text-sm ${asset.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                                        {formatPercentage(asset.priceChange24h)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <div>
                                    <div className="text-neutral-500 text-sm">Holdings</div>
                                    <div className="font-medium text-white">
                                        {`${formatCryptoAmount(asset.balance)} ${asset.symbol}`}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-neutral-500 text-sm">Value</div>
                                    <div className="font-medium text-white">
                                        {formatCurrency(asset.value)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CoinList;
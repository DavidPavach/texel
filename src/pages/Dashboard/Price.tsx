import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";

//Stores, Utils and Enums
import { useUserStore } from "@/stores/userStore";
import { formatCryptoAmount, formatCurrency, formatPercentage } from "@/utils/format";
import { coinMap, coinMeta } from "@/enums";

//Icons
import { Eye, EyeOff, RefreshCw } from "lucide-react";

const Price = () => {

    const { balance, prices, refetchUserData } = useUserStore();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [hideBalances, setHideBalances] = useState<boolean>(false);
    const navigate = useNavigate()

    const handleRefresh = async () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        try {
            await refetchUserData();
        } catch (e) {
            console.error(e);
        } finally {
            setIsRefreshing(false);
        }
    };

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
        if (coin.toLowerCase() === "texel") return toast.info("Sending and receiving Texel token is unavailable.")
        navigate(`/user/coin?coin=${coin}`)
    }

    return !prices ? (
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
                <div className="flex justify-between items-center">
                    <h2 className="font-medium text-sm md:text-base xl:text-lg">Coin Price List</h2>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setHideBalances(!hideBalances)} className="hover:bg-neutral-800 p-2 rounded-lg transition-colors">
                            {hideBalances ? <EyeOff size={18} className="text-neutral-400" /> : <Eye size={18} className="text-neutral-400" />}
                        </button>
                        <button onClick={handleRefresh} disabled={isRefreshing} className="hover:bg-neutral-800 disabled:opacity-50 p-2 rounded-lg transition-colors">
                            <RefreshCw size={18} className={`text-neutral-400 ${isRefreshing ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-neutral-800">
                {assetList.map((asset) => (
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
                                    {hideBalances ? "••••••" : `${formatCryptoAmount(asset.balance)} ${asset.symbol}`}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-neutral-500 text-sm">Value</div>
                                <div className="font-medium text-white">
                                    {hideBalances ? "••••••" : formatCurrency(asset.value)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Price;

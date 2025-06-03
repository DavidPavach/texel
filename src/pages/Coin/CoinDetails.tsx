import { useState } from "react";
import { Link } from "react-router-dom";

//Enums, Services, Utils and stores
import { coinMeta, coinMap } from "@/enums";
import { GetCoinPrice, GetCoinTransactions } from "@/services/queries.service";
import { formatCurrency, formatPercentage } from "@/utils/format";
import { formatCoinValue } from "@/stores/userStore";

//Components
import TransactionActivityCard from "../Dashboard/TransactionCard";
import ErrorDisplay from "@/components/Error";

//Icons 
import { TrendingUp, TrendingDown, EyeOff, Eye } from "lucide-react";
import { DirectboxReceive, Send2, WalletAdd } from "iconsax-react";

//Const 
const CoinDetails = ({ coin, prices, balance }: { coin: string, prices: Prices, balance: Balance }) => {

    //States
    const [hideBalance, setHideBalance] = useState(false)
    const formattedCoin = coinMap[coin.toLowerCase()];

    //Hooks
    const { data: priceData, isFetching: isPriceFetching, isLoading: isPriceLoading, isError: isPriceError } = GetCoinPrice(formattedCoin);
    const { data: transactionData, isLoading: isTransactionLoading, isFetching: isTransactionFetching, isError: isTransactionError, refetch: refetchTransaction } = GetCoinTransactions({ coin });

    //Constants
    const meta = coinMeta[coin.toLowerCase()] ?? {
        name: coin,
        symbol: coin.toUpperCase(),
        logo: "/coin.svg",
    };
    const apiKey = coinMap[coin.toLowerCase()] ?? '';
    const coinPrice = prices[apiKey]?.usd ?? 0;
    const coinChange = prices[apiKey]?.usd_24h_change;

    const actions = [
        { icon: <Send2 size={20} variant="Bold" color="#dc2626" />, label: "Send", url: `/user/coin?coin=${coin}&page=send`, className: "bg-red-600/20" },
        { icon: <DirectboxReceive size={20} variant="Bold" color="#16a34a" />, label: "Receive", url: `/user/coin?coin=${coin}&page=receive`, className: "bg-green-600/20" },
        { icon: <WalletAdd size={20} variant="Bold" color="#ffc107" />, label: "Buy", url: "/user/buy", className: "bg-yellow-600/20" },
    ]


    return (
        <main className="bg-black shadow-xl py-8 border border-neutral-800 rounded-xl text-neutral-100">
            <div className="flex flex-col items-center gap-y-2">
                <img src={meta.logo} alt={`${meta.name} Logo`} className="rounded-md size-12 md:text-14 xl:text-16" />
                <p className="font-semibold text-xl md:text-2xl xl:text-3xl">{meta.name} ({meta.symbol})</p>
                <div className="flex items-center gap-x-3">
                    <p className="text-neutral-500">Current Price: <span className="font-bold text-neutral-100 text-sm md:text-base xl:text-lg">{formatCurrency(coinPrice)}</span></p>
                    <p className={`${coinChange >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"} flex items-center gap-x-1`}>{coinChange >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {formatPercentage(coinChange)}</p>
                </div>
            </div>
            <div className="bg-lightBlack backdrop-blur-sm mx-auto mt-6 px-4 py-2 border border-white/10 rounded-xl w-[90%]">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Your Balance</span>
                    <button onClick={() => setHideBalance(!hideBalance)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
                        {hideBalance ? (
                            <EyeOff size={18} className="text-gray-400" />
                        ) : (
                            <Eye size={18} className="text-gray-400" />
                        )}
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <div className="mb-2 font-bold text-2xl md:text-3xl xl:text-4xl">
                        {hideBalance ? "••••••" : formatCoinValue(coin, balance[coin.toLowerCase() as keyof Balance], prices)}
                    </div>
                    <div className="text-neutral-400 text-sm md:text-base xl:text-lg">
                        {hideBalance ? "••••••" : `${balance[coin.toLowerCase() as keyof Balance]} ${meta.symbol}`}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 mx-auto mt-6 border border-neutral-800 rounded-xl divide-x divide-neutral-800 w-[90%]">
                {actions.map((action, index) => (
                    <Link to={action.url} key={index} className="flex flex-col justify-center items-center hover:bg-neutral-900 disabled:opacity-50 py-5 transition-colors disabled:cursor-not-allowed">
                        <div className={`flex justify-center items-center ${action.className} mb-2 rounded-full w-10 h-10`}>
                            {action.icon}
                        </div>
                        <span className="text-neutral-400 text-xs">{action.label}</span>
                    </Link>
                ))}
            </div>
            <div className="bg-lightBlack mx-auto mt-6 border border-white/10 rounded-xl w-[90%]">
                <div className="px-4 py-4 border-neutral-800 border-b">
                    <p className="font-bold text-lg md:text-xl xl:text-2xl">Market Statistics</p>
                    <p className="mt-2 text-neutral-400">Real-time market data for <span className="capitalize">{coinMap[coin.toLowerCase()]}</span></p>
                </div>
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-y-5 p-4">
                    <div className="bg-black p-4 rounded-xl w-full sm:w-[40%] md:w-[45%] xl:w-[48%]">
                        <p className="text-neutral-400">Market Cap</p>
                        <p className={`font-bold text-lg md:text-xl xl:text-2xl break-all ${isPriceFetching || isPriceLoading ? "animate-pulse" : ""}`}>{isPriceFetching || isPriceLoading ? "...." : isPriceError ? "Error Fetching Details." : formatCurrency(priceData.data[formattedCoin]?.usd_market_cap)}</p>
                    </div>
                    <div className="bg-black p-4 rounded-xl w-full sm:w-[40%] md:w-[45%] xl:w-[48%]">
                        <p className="text-neutral-400">24h Volume</p>
                        <p className={`font-bold text-lg md:text-xl xl:text-2xl break-all ${isPriceFetching || isPriceLoading ? "animate-pulse" : ""}`}>{isPriceFetching || isPriceLoading ? "...." : isPriceError ? "Error Fetching Details." : formatCurrency(priceData.data[formattedCoin]?.usd_24h_vol)}</p>
                    </div>
                </div>
            </div>
            <main>
                {isTransactionError ? <ErrorDisplay onRetry={refetchTransaction} isFullPage={false} title="Failed to Fetch Transactions" message={`We couldn't fetch your ${coin} transaction(s). Click below to try again.`} retryLabel="Reload Transactions"
                /> : isTransactionLoading || isTransactionFetching ? (
                    <div className="flex flex-col gap-y-5 mt-4 px-4 pb-4">
                        {[...Array(5)].map((_, i) => (
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
                    <TransactionActivityCard title={`${coin} Transactions`} transactions={transactionData.data} />
                )}
            </main>
        </main>
    );
};

export default CoinDetails;

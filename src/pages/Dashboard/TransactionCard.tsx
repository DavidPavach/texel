import { useState } from "react"
import { motion } from "framer-motion";

//Enums, Utils and Stores
import { formatDate } from "@/utils/format";
import { formatCoinValue } from "@/stores/userStore";
import { useUserStore } from "@/stores/userStore";
import { getWallet } from "@/enums";

//Icons
import { Filter, X } from "lucide-react";

// Transaction type definitions
type TransactionType = "sent" | "received"
type TransactionStatus = "successful" | "pending" | "failed" | "processing"

type TransactionActivityCardProps = {
    transactions: UserTransaction[]
    title?: string
}

export default function TransactionActivityCard({ transactions, title = "Transaction Activity" }: TransactionActivityCardProps) {

    const { prices } = useUserStore();
    const [activeFilters, setActiveFilters] = useState<TransactionType[]>([]);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [selectedTransaction, setSelectedTransaction] = useState<UserTransaction | null>(null);

    // Filter transactions based on active filters
    const filteredTransactions = activeFilters.length
        ? transactions.filter((tx) => activeFilters.includes(tx.transactionType))
        : transactions

    // Toggle a filter
    const toggleFilter = (type: TransactionType) => {
        if (activeFilters.includes(type)) {
            setActiveFilters(activeFilters.filter((t) => t !== type))
        } else {
            setActiveFilters([...activeFilters, type])
        }
    }

    //Close Transaction Details Box
    const closeDetails = () => setSelectedTransaction(null);

    // Get color for transaction type
    const getTypeColor = (type: TransactionType) => {
        switch (type) {
            case "sent":
                return "text-red-400"
            case "received":
                return "text-green-400"
            default:
                return "text-neutral-400"
        }
    }

    // Get background color for transaction type
    const getTypeBgColor = (type: TransactionType) => {
        switch (type) {
            case "sent":
                return "bg-red-400/10"
            case "received":
                return "bg-green-400/10"
            default:
                return "bg-neutral-400/10"
        }
    }

    // Get color for status
    const getStatusColor = (status: TransactionStatus) => {
        switch (status) {
            case "successful":
                return "text-green-400"
            case "pending":
                return "text-yellow-400"
            case "failed":
                return "text-red-400"
            default:
                return "text-neutral-400"
        }
    }

    // Get background color for status
    const getStatusBgColor = (status: TransactionStatus) => {
        switch (status) {
            case "successful":
                return "bg-green-400/10"
            case "pending":
                return "bg-yellow-400/10"
            case "failed":
                return "bg-red-400/10"
            default:
                return "bg-neutral-400/10"
        }
    }

    //Get coin image and symbol
    const getImgSym = (coin: string) => {
        switch (coin) {
            case "bitcoin":
                return { image: '/bitcoin.jpg', symbol: "BTC" }
            case "ethereum":
                return { image: '/ethereum.jpg', symbol: "ETH" }
            case 'binance coin':
                return { image: '/binance coin.jpg', symbol: "BNB" }
            case 'tron':
                return { image: '/tron.jpg', symbol: "TRX" }
            case 'usdt trc(20)':
                return { image: '/tether.jpg', symbol: "USDT TRC(20)" }
            case 'usdt erc(20)':
                return { image: '/tether.jpg', symbol: "USDT ERC(20)" }
            case 'cardano':
                return { image: '/cardano.jpg', symbol: "ADA" }
            case 'solana':
                return { image: '/solana.jpg', symbol: "SOL" }
            case 'lite coin':
                return { image: '/litecoin.jpg', symbol: "LTC" }
            case 'doge':
                return { image: '/doge.jpg', symbol: "DOGE" }
            case 'texel':
                return { image: '/logo.svg', symbol: "TXC" }
            case 'dash':
                return { image: '/dash.jpg', symbol: "DASH" }
            case 'bitcoin cash':
                return { image: '/bitcoin cash', symbol: "BCH" }
            case 'official trump':
                return { image: '/official trump.png', symbol: "TRUMP" }
            default:
                return { image: '/coin.svg', symbol: "COIN" }
        }
    }

    // Format address for display (mask middle)
    const formatAddress = (address: string) => {
        if (address.length < 10) return address
        const start = address.substring(0, 4)
        const end = address.substring(address.length - 4)
        return `${start}...${end}`
    }

    return (
        <div className="bg-black shadow-lg mt-4 rounded-xl w-full overflow-hidden">
            <div className="flex justify-between items-center p-4 border-neutral-800 border-b">
                <h2 className="font-medium text-neutral-300 text-sm md:text-base xl:text-lg capitalize">{title}</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setShowFilters(!showFilters)} className="hover:bg-neutral-800 p-2 rounded-lg transition-colors">
                        <Filter size={18} className={showFilters ? "text-primary" : "text-neutral-400"} />
                    </button>
                </div>
            </div>

            {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="border-neutral-800 border-b overflow-hidden">
                    <div className="flex flex-wrap gap-2 p-4">
                        {["sent", "received"].map((type) => (
                            <button key={type} onClick={() => toggleFilter(type as TransactionType)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${activeFilters.includes(type as TransactionType)
                                    ? getTypeBgColor(type as TransactionType) + " " + getTypeColor(type as TransactionType)
                                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                                    }`}>
                                {type}
                            </button>
                        ))}
                        {activeFilters.length > 0 && (
                            <button onClick={() => setActiveFilters([])} className="bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded-full font-medium text-neutral-400 text-xs transition-colors">
                                Clear All
                            </button>
                        )}
                    </div>
                </motion.div>
            )}

            <div className="divide-y divide-neutral-800">
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                        <div key={transaction._id} onClick={() => setSelectedTransaction(transaction)} className="hover:bg-neutral-900/50 p-4 transition-colors cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 rounded-full w-10 h-10 overflow-hidden">
                                        <img src={getImgSym(transaction.coin).image || "/coin.svg"} alt={transaction.coin} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-white">{getImgSym(transaction.coin).symbol}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getTypeBgColor(
                                                transaction.transactionType,
                                            )} ${getTypeColor(transaction.transactionType)}`}>
                                                {transaction.transactionType}
                                            </span>
                                        </div>
                                        <div className="text-neutral-500 text-xs">{formatDate(transaction.createdAt)}</div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="font-medium text-white">
                                        {transaction.transactionType === "sent" ? "-" : ""}
                                        {transaction.amount}
                                    </div>
                                    <div className="text-neutral-500 text-xs">{prices && formatCoinValue(transaction.coin, transaction.amount, prices)}</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-between items-center mt-3 text-[10px] md:text-xs xl:text-sm">
                                <div className="flex items-center space-x-1">
                                    <span className="text-neutral-500">Network:</span>
                                    <span className="text-neutral-300 uppercase">{transaction.network}</span>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <span className="text-neutral-500">Address:</span>
                                    <span className="font-mono text-neutral-300 text-xs">{transaction.transactionType === "received" ? formatAddress(getWallet[transaction.coin].walletAddress) : formatAddress(transaction.walletAddress)}</span>
                                </div>

                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBgColor(
                                    transaction.status,
                                )} ${getStatusColor(transaction.status)}`}>
                                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-neutral-500">No transactions found</p>
                    </div>
                )}
            </div>
            {selectedTransaction && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/80">
                    <div className="relative bg-neutral-900 p-6 rounded-xl w-[90vw] max-w-xl text-sm">
                        <button className="top-3 right-3 absolute text-neutral-400 hover:text-red-400" onClick={closeDetails}>
                            <X size={20} />
                        </button>

                        <div className="flex justify-between items-center my-4">
                            <div className="mb-1 font-semibold text-white text-lg capitalize">{selectedTransaction.coin}</div>
                            <div className={`text-xs px-4 py-0.5 inline-block rounded-full ${getTypeBgColor(selectedTransaction.transactionType)} ${getTypeColor(selectedTransaction.transactionType)}`}>
                                {selectedTransaction.transactionType.toUpperCase()}
                            </div>
                        </div>

                        <div className="space-y-2 text-neutral-400">
                            <div><strong>Amount:</strong> {selectedTransaction.amount} {getImgSym(selectedTransaction.coin).symbol}</div>
                            <div><strong>Status:</strong> <span className={`${getStatusColor(selectedTransaction.status)} capitalize`}>{selectedTransaction.status}</span></div>
                            <div><strong>Network:</strong> <span className="capitalize">{selectedTransaction.network}</span></div>
                            <div><strong>Hash:</strong> <span className="font-mono">{formatAddress(selectedTransaction.transactionHash)}</span></div>
                            <div><strong>Address:</strong> <span className="font-mono">{selectedTransaction.transactionType === "received" ? formatAddress(getWallet[selectedTransaction.coin].walletAddress) : formatAddress(selectedTransaction.walletAddress)}</span></div>
                            <div><strong>Date:</strong> {formatDate(selectedTransaction.createdAt)}</div>
                            <div><strong>Value:</strong> {prices && formatCoinValue(selectedTransaction.coin, selectedTransaction.amount, prices)}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
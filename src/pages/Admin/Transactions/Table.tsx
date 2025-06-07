import { useState } from "react";
import { toast } from "react-fox-toast";

//Stores and Hooks
import { formatCoinValue } from "@/stores/userStore";
import { useAdminUpdateTransaction, useAdminDeleteTransaction } from "@/services/mutations.service";

//Icons
import { Trash, TickCircle, Clock, CloseCircle, DirectUp } from "iconsax-react";
import TransactionDetails from "./Details";


const Table = ({ transactions, prices }: { transactions: Transaction[], prices: Prices }) => {

    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [showTransaction, setShowTransaction] = useState<Transaction | null>(null);

    const toggleShowTransaction = () => setShowTransaction(null);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "successful":
                return <span className="flex items-center gap-1 bg-green-700 px-2 py-1 rounded-full text-white text-xs"><TickCircle size={14} /> Successful</span>;
            case "pending":
                return <span className="flex items-center gap-1 bg-yellow-700 px-2 py-1 rounded-full text-white text-xs"><Clock size={14} /> Pending</span>;
            case "failed":
                return <span className="flex items-center gap-1 bg-red-700 px-2 py-1 rounded-full text-white text-xs"><CloseCircle size={14} /> Failed</span>;
            default:
                return null;
        }
    };

    const getUpdateIcon = (status: string) => {
        switch (status) {
            case "successful":
                return <span className="text-primary hover:text-yellow-700 duration-300"><Clock size={20} variant="Bold" /></span>;
            case "pending":
                return <span className="text-green-500 hover:text-green-700 duration-300"><TickCircle size={20} variant="Bold" /></span>;
            case "failed":
                return <span className="text-primary hover:text-yellow-700 duration-300"><Clock size={20} variant="Bold" /></span>;
            default:
                return null;
        }
    };

    const deleteTransaction = useAdminDeleteTransaction();
    const handleDeleteSingle = async (id: string) => {
        setLoadingId(id);
        deleteTransaction.mutate(id, {
            onSuccess: (response) => {
                toast.success(response.message || "Your transaction was deleted successfully!");
                setLoadingId(null);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't delete transaction, kindly try again.";
                toast.error(message);
                setLoadingId(null);
            }
        })
    };

    const updateTransaction = useAdminUpdateTransaction();
    const handleUpdate = async (id: string, transactionStatus: "pending" | "failed" | "successful") => {

        setLoadingId(id);
        const updateStatus = transactionStatus === "pending" ? "successful" : "pending";
        updateTransaction.mutate({ transactionId: id, status: updateStatus }, {
            onSuccess: (response) => {
                toast.success(response.message || "Your transaction was updated successfully!");
                setLoadingId(null);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Transaction update failed, kindly try again.";
                toast.error(message);
                setLoadingId(null);
            },
        })
    }


    return (
        <>
            {showTransaction && (
                <main className="z-30 fixed inset-0 flex justify-center items-center bg-black/90 p-4">
                    <div className="py-14 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <TransactionDetails onClose={toggleShowTransaction} transaction={showTransaction} />
                    </div>
                </main>
            )}
            <div className="w-full overflow-x-auto">
                <table className="bg-lightBlack rounded-xl min-w-full overflow-hidden text-white">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-4 py-3 font-medium text-sm text-left">User</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Amount</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Dollar Equiv.</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Coin</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Network</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Tx Hash</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Status</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-6 text-sm text-center">
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx._id} className="border-gray-700 border-b">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <img src={tx.user.profilePicture} alt="profile" className="rounded-full size-6 shrink-0" />
                                            <div>
                                                <p className="text-sm">{tx.user.userName}</p>
                                                <p className="text-gray-400 text-xs">{tx.user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{tx.amount}</td>
                                    <td className="px-4 py-3">{formatCoinValue(tx.coin, tx.amount, prices)}</td>
                                    <td className="px-4 py-3 uppercase">{tx.coin}</td>
                                    <td className="px-4 py-3 capitalize">{tx.network}</td>
                                    <td className="px-4 py-3 max-w-[120px] text-xs truncate">{tx.transactionHash}</td>
                                    <td className="px-4 py-3">{getStatusBadge(tx.status)}</td>
                                    <td className="flex justify-between items-center gap-x-5 px-4 py-3">
                                        <button onClick={() => handleDeleteSingle(tx._id)} disabled={loadingId === tx._id} className="text-red-400 hover:text-red-200">
                                            {loadingId === tx._id ? (
                                                <svg className="mt-1 size-4 animate-spin" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z" />
                                                </svg>
                                            ) : (
                                                <Trash size={18} />
                                            )}
                                        </button>
                                        <button onClick={() => setShowTransaction(tx)}><DirectUp variant="Bold" size={18} className="text-blue-400 hover:text-blue-600 duration-300" /></button>
                                        <button onClick={() => handleUpdate(tx._id, tx.status)} disabled={loadingId === tx._id}>
                                            {loadingId === tx._id ? (
                                                <svg className="mt-1 size-4 animate-spin" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z" />
                                                </svg>
                                            ) : (
                                                getUpdateIcon(tx.status)
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;

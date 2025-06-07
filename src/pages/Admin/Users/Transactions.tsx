import { useState } from "react";

//Hooks
import TransactionActivityCard from "@/pages/Dashboard/TransactionCard";

//Components
import { useGetUserTransactions } from "@/services/queries.service";
import ErrorDisplay from "@/components/Error";
import PaginationControls from "@/components/Pagination";

const Transaction = ({ userId, userName }: { userId: string, userName: string }) => {

    const [page, setCurrentPage] = useState(1);
    const { data, isLoading, isError, isFetching, refetch } = useGetUserTransactions({ page: page.toString(), limit: "5", userId });

    const transactions = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <main>
            {isError ? (
                <ErrorDisplay onRetry={() => refetch()} title={`${userName} Transactions Failed`} message={`We couldn't fetch ${userName} transactions. Click below to try again.`} retryLabel="Reload Transactions" />
            ) : isLoading || isFetching ? (
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
            ) : (
                <div>
                    <TransactionActivityCard title={`${userName} Transactions`} transactions={transactions} />
                    {totalPages > 1 && (
                        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    )}
                </div>
            )}
        </main>
    );
};

export default Transaction;

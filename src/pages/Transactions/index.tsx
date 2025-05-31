import { useState } from "react";

//Hooks
import TransactionActivityCard from "../Dashboard/TransactionCard";

//Components
import { GetAllTransactions } from "@/services/queries.service";
import ErrorDisplay from "@/components/Error";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Transaction = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError, isFetching, refetch } = GetAllTransactions(currentPage.toString(), "20");

    const transactions = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    const handlePageChange = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const pageRange = () => {
        const range = [];
        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <main>
            {isError ? (
                <ErrorDisplay onRetry={() => refetch()} isFullPage={true} title="Recent Activity Failed" message="We couldn't load your recent activity. Click below to try again." retryLabel="Reload Transactions" />
            ) : isLoading || isFetching ? (
                <div className="flex flex-col gap-y-5 mt-4 px-4 pb-4">
                    {[...Array(3)].map((_, i) => (
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
                <div className="mt-10 px-4 pb-8">
                    <TransactionActivityCard title="All Transactions" transactions={transactions} />
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1) }} />
                                    </PaginationItem>

                                    {pageRange().map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink href="#" isActive={page === currentPage} onClick={(e) => { e.preventDefault(); handlePageChange(page) }}>
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1) }} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
};

export default Transaction;

import { useState } from "react";

//Services
import { GetTransactions } from "@/services/queries.service";

//Components
import ErrorDisplay from "@/components/Error";
import Table from "./Table";
import PaginationControls from "@/components/Pagination";


const Received = ({ prices }: { prices: Prices }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, isFetching, isLoading, isError, refetch } = GetTransactions("received", currentPage.toString(), "20")

    const transactions = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    const handlePageChange = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <main>
            <p className="mt-4 font-semibold text-neutral-100 text-lg md:text-xl xl:text-2xl">Received Transactions Table</p>
            {isError ? (
                <ErrorDisplay onRetry={() => refetch()} isFullPage={true} title="Received Transactions Failed" message="We couldn't load your received transactions. Click below to try again." retryLabel="Reload Transactions" />
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
                <div className="mt-10">
                    <Table transactions={transactions} prices={prices} />
                    {totalPages > 1 && (
                        <div className="bg-white mx-auto rounded-lg w-fit">
                            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}

export default Received;
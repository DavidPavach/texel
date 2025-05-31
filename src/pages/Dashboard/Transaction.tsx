//Hooks
import TransactionActivityCard from "./TransactionCard";

//Components
import { GetUserLastThreeTransactions } from "@/services/queries.service";
import ErrorDisplay from "@/components/Error";


const Transaction = () => {

    const { data, isLoading, isError, isFetching, refetch } = GetUserLastThreeTransactions();

    return (
        <main>
            {isError ? <ErrorDisplay onRetry={refetch} isFullPage={true} title="Recent Activity Failed" message="We couldn't load your recent activity. Click below to try again." retryLabel="Reload Transactions"
            /> : isLoading || isFetching ? (
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
                <TransactionActivityCard title="Recent Activity" transactions={data.data.data} />
            )}
        </main>
    );
}

export default Transaction;
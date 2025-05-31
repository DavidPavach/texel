//Hooks
import { GetWalletConnectStats } from "@/services/queries.service";

//Components
import Form from "./Form";
import ErrorDisplay from "@/components/Error";
import Done from "./Done";

const Index = () => {

    const { data, isFetching, isLoading, isError, refetch } = GetWalletConnectStats();

    return isError ?
        <ErrorDisplay onRetry={refetch} isFullPage={false} title="Wallet Connection Failed" message="We couldn't load your wallet connection data. Click below to try again." retryLabel="Reload" />
        : isLoading || isFetching ? (
            <div className="flex flex-col gap-y-5 mt-10 px-4 pb-4">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                        <div className="bg-neutral-800 rounded-full size-8 animate-pulse"></div>
                        <div className="flex-1">
                            <div className="bg-neutral-800 rounded w-full h-4 animate-pulse"></div>
                            <div className="bg-neutral-800 mt-2 rounded w-[80%] h-3 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        ) : data.data.exists === false ? (
            <Form />
        ) : (
            <Done walletName={data.data.data.wallet} variant="success" />
        )
}

export default Index;
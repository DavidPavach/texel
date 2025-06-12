//Hooks and Enums
import { GetUtility } from "@/services/queries.service";
import { utilityId } from "@/enums";

//Components
import ErrorDisplay from "@/components/Error";
import { Settings } from "./Settings";

const Index = () => {

    const { data, isLoading, isFetching, isError, refetch } = GetUtility(utilityId);

    return (
        <main>
            {isError ? (
                <ErrorDisplay onRetry={() => refetch()} isFullPage={true} title="Fetching Utility Failed" message="We couldn't fetch utility. Click below to try again." retryLabel="Reload Utility" />
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
            ) : data && (
                <Settings data={data.data} />
            )}
        </main>
    )

}

export default Index;
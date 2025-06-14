//Hooks
import { GetAdmins } from "@/services/queries.service";

//Components
import AdminManagement from "./StaffTable";
import ErrorDisplay from "@/components/Error";

const Index = () => {

    const { data, isFetching, isLoading, isError, refetch } = GetAdmins();

    const staff = data?.data

    return (
        <main>
            {isError ? (
                <ErrorDisplay onRetry={() => refetch()} isFullPage={true} title="Staff Requests Failed" message="We couldn't load your staff. Click below to try again." retryLabel="Reload Staff" />
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
                    <AdminManagement initialAdmins={staff} />
                </div>
            )}
        </main>
    );
}

export default Index;
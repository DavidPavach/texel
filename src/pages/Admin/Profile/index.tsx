//Hooks
import ErrorDisplay from "@/components/Error";

//Components
import { GetAdminDetails } from "@/services/queries.service";
import AdminProfile from "./Profile";


const index = () => {

    const { data, isFetching, isLoading, isError, refetch } = GetAdminDetails();

    const adminDetails = data?.data

    return (
        <main>
            {isError ? (
                <ErrorDisplay onRetry={() => refetch()} isFullPage={true} title="Profile Requests Failed" message="We couldn't load your profile. Click below to try again." retryLabel="Reload Profile" />
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
            ) : ( <AdminProfile admin={adminDetails} />
            )}

        </main>
    );
}

export default index;
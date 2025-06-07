import { useState } from "react";
import { useSearchParams } from "react-router-dom";

//Hooks
import { GetAllUsers } from "@/services/queries.service";

//Components
import ErrorDisplay from "@/components/Error";
import Table from "./Table";
import UserManagement from "./UserManagment";
import PaginationControls from "@/components/Pagination";

const Index = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const userName = searchParams.get("user")

    const { data, isFetching, isLoading, isError, refetch } = GetAllUsers(currentPage.toString(), "30");

    const users = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    //Functions
    const handlePageChange = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const clearParam = () => {
        searchParams.delete("user")
        setSearchParams(searchParams)
    }

    function findUserByUserName(userName: string) {
        return users.find((user: User) => user.userName === userName)
    }

    const selectedUser = userName && findUserByUserName(userName)

    return (
        <main>
            {isError ? (
                <ErrorDisplay onRetry={() => refetch()} isFullPage={true} title="Fetching Users Failed" message="We couldn't fetch your users. Click below to try again." retryLabel="Reload Users" />
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
                    {userName ? <UserManagement user={selectedUser} onClose={clearParam} /> : (
                        <>
                            <p className="mt-4 font-semibold text-neutral-100 text-lg md:text-xl xl:text-2xl">Users Table</p>
                            <Table users={users} />
                            {totalPages > 1 && (
                                <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            )}
                        </>
                    )}


                </div>
            )}
        </main>
    );
}

export default Index;
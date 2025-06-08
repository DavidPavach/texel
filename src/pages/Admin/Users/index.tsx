import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// Hooks
import { useSearchUser, GetAllUsers } from "@/services/queries.service";

// Components
import ErrorDisplay from "@/components/Error";
import Table from "./Table";
import UserManagement from "./UserManagment";
import PaginationControls from "@/components/Pagination";

const Index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState("");
    const userName = searchParams.get("user");

    const { data: userData, isLoading: userLoading, error } = useSearchUser(searchValue);
    const { data, isFetching, isLoading, isError, refetch } = GetAllUsers(currentPage.toString(), "30");

    const users = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    const handlePageChange = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleViewMore = (userName: string) => {
        searchParams.set("user", userName);
        setSearchParams(searchParams);
    };

    const clearParam = () => {
        searchParams.delete("user");
        setSearchParams(searchParams);
    };

    function findUserByUserName(userName: string) {
        return users.find((user: User) => user.userName === userName);
    }

    const selectedUser = userName && findUserByUserName(userName);

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
                    {userName ? (
                        <UserManagement user={selectedUser} onClose={clearParam} />
                    ) : (
                        <>
                            <div className="flex flex-col gap-y-1 mt-4 text-neutral-100">
                                <label htmlFor="search">Search User by Email, AccountId or UserName</label>
                                <input type="search" id="search" className="bg-neutral-200 px-4 py-3 rounded-xl focus:outline-1 focus:outline-none focus:outline-primary w-full text-black duration-300 focus:caret-primary" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            </div>

                            {userLoading && <p className="mt-4">Searching...</p>}
                            {searchValue.length > 5 && error && <p className="mt-4 text-red-500">Search failed</p>}

                            {!error && searchValue.length > 5 && userData && (
                                <ul className="space-y-2 mt-4">
                                    {(Array.isArray(userData.data) ? userData.data : [userData.data]).map((user: User) => (
                                        <li key={user.accountId}
                                            onClick={() => {
                                                handleViewMore(user.userName);
                                                setSearchValue("");
                                            }} className="bg-neutral-200 p-2 rounded-md text-black cursor-pointer">
                                            <p>{user.userName} - {user.email}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}

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
};

export default Index;
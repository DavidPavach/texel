import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-fox-toast";

//Hooks
import { useAdminSuspendUser, useAdminUserKyc } from "@/services/mutations.service";

//Icons
import { Clock, DirectUp, Forbidden, ProfileTick, Unlock } from "iconsax-react";

const Table = ({ users }: { users: User[] }) => {

    const [loadingEmail, setLoadingEmail] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    //Functions
    const handleViewMore = (userName: string) => {
        searchParams.set("user", userName)
        setSearchParams(searchParams)
    }

    const getUpdateIcon = (status: "accepted" | "pending" | "rejected") => {
        switch (status) {
            case "accepted":
                return <span className="text-primary hover:text-yellow-700 duration-300"><Clock size={20} variant="Bold" /></span>;
            case "pending":
                return <span className="text-green-500 hover:text-green-700 duration-300"><ProfileTick size={20} variant="Bold" /></span>;
            case "rejected":
                return <span className="text-primary hover:text-yellow-700 duration-300"><Clock size={20} variant="Bold" /></span>;
            default:
                return null;
        }
    }

    const suspendUser = useAdminSuspendUser()
    const handleSuspend = (email: string, suspended: boolean) => {

        setLoadingEmail(email);
        suspendUser.mutate({ email, isSuspended: !suspended }, {
            onSuccess: (response) => {
                toast.success(response.message || "The user suspension status was updated successfully!");
                setLoadingEmail(null)
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't update suspension status, kindly try again.";
                toast.error(message);
                setLoadingEmail(null)
            }
        })
    }

    const updateKyc = useAdminUserKyc()
    const handleKyc = (email: string, status: "accepted" | "pending" | "rejected") => {

        setLoadingEmail(email);
        updateKyc.mutate({ email, kyc: { status: status === "pending" ? "accepted" : "pending" } }, {
            onSuccess: (response) => {
                toast.success(response.message || "The user KYC status was updated successfully!");
                setLoadingEmail(null)
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't update suspension status, kindly try again.";
                toast.error(message);
                setLoadingEmail(null)
            }
        })
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="bg-lightBlack rounded-xl min-w-full overflow-hidden text-white">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 font-medium text-sm text-left">AccountID</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Profile</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Country</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Gender</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Phone Number</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Password</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Verified?</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Suspended?</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-4 py-6 text-sm text-center">
                                No Users found.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user._id} className="border-gray-700 border-b">
                                <td className="px-4 py-3">{user.accountId}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <img src={user.profilePicture ?? "/profile.jpeg"} alt="profile" className="rounded-full size-6 shrink-0" />
                                        <div>
                                            <p className="text-sm">{user.userName}</p>
                                            <p className="text-gray-400 text-xs">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{user.country}</td>
                                <td className="px-4 py-3 uppercase">{user.gender}</td>
                                <td className="px-4 py-3 capitalize">{user.phoneNumber}</td>
                                <td className="px-4 py-3">{user.encryptedPassword}</td>
                                <td className="px-4 py-3">{user.isVerified ? "Yes✅" : "No❌"}</td>
                                <td className="px-4 py-3">{user.isSuspended ? "Yes✅" : "No❌"}</td>
                                <td className="flex justify-between items-center gap-x-5 px-4 py-3">
                                    <button onClick={() => handleSuspend(user.email, user.isSuspended)} disabled={loadingEmail === user.email} className="text-red-400 hover:text-red-200">
                                        {loadingEmail === user.email ? (
                                            <svg className="mt-1 size-4 animate-spin" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z" />
                                            </svg>
                                        ) : (
                                            user.isSuspended ? <Unlock variant="Bold" size={20} className="text-green-400 hover:text-green-600" /> : <Forbidden variant="Bold" size={18} />
                                        )}
                                    </button>
                                    <button onClick={() => handleViewMore(user.userName)}><DirectUp variant="Bold" size={18} className="text-blue-400 hover:text-blue-600 duration-300" /></button>
                                    <button onClick={() => handleKyc(user.email, user.kyc?.status ?? "pending")} disabled={loadingEmail === user.email}>
                                        {loadingEmail === user.email ? (
                                            <svg className="mt-1 size-4 animate-spin" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z" />
                                            </svg>
                                        ) : (
                                            getUpdateIcon(user.kyc?.status ?? "pending")
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
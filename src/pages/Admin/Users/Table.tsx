import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-fox-toast";

//Hooks
import { useAdminSuspendUser, useAdminUserKyc } from "@/services/mutations.service";
import { formatDate } from "@/utils/format";

//Components
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

//Icons
import { Clock, CloseCircle, DirectUp, Forbidden, ProfileTick, Unlock } from "iconsax-react";

const Table = ({ users }: { users: User[] }) => {

    const [loadingEmail, setLoadingEmail] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    //Functions
    const getColor = (status: "pending" | "accepted" | "rejected") => {
        switch (status) {
            case "rejected":
                return "text-red-600 bg-red-200"
            case "accepted":
                return "text-green-600 bg-green-200"
            case "pending":
                return "text-yellow-600 bg-yellow-200"
            default:
                return "text-yellow-600 bg-yellow-200"
        }
    }

    const handleViewMore = (userName: string) => {
        searchParams.set("user", userName)
        setSearchParams(searchParams)
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
        updateKyc.mutate({ email, kyc: { status: status } }, {
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
        <div className="mt-2 w-full overflow-x-auto">
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
                                    <div>
                                        {loadingEmail === user.email ? (
                                            <svg className="mt-1 size-4 animate-spin" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z" />
                                            </svg>
                                        ) : (
                                            <Popover>
                                                <PopoverTrigger className="bg-green-600 px-2 py-0.5 rounded-lg text-xs">Open</PopoverTrigger>
                                                <PopoverContent className="bg-black border-0 w-80">
                                                    <div className="flex gap-x-5">
                                                        <Button variant="secondary" size="icon" className="bg-neutral-900 size-8" onClick={() => handleKyc(user.email, "pending")} disabled={loadingEmail === user.email}>
                                                            <Clock variant="Bold" className="text-primary hover:text-yellow-700 duration-300" />
                                                        </Button>
                                                        <Button variant="secondary" size="icon" className="bg-neutral-900 size-8" onClick={() => handleKyc(user.email, "accepted")} disabled={loadingEmail === user.email}>
                                                            <ProfileTick variant="Bold" className="text-green-500 hover:text-green-700 duration-300" />
                                                        </Button>
                                                        <Button variant="secondary" size="icon" className="bg-neutral-900 size-8" onClick={() => handleKyc(user.email, "rejected")} disabled={loadingEmail === user.email}>
                                                            <CloseCircle variant="Bold" className="text-red-400 hover:text-red-600 duration-300" />
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col gap-y-2 mt-2">
                                                        <div className="flex gap-x-2">
                                                            {user.kyc?.images.map((image) => (
                                                                <img className="border border-neutral-300 rounded-lg w-1/2 h-40" key={image} src={image} alt="KYC Images" />
                                                            ))}
                                                        </div>
                                                        <div className="space-y-1 mt-2 text-neutral-100 text-xs capitalize">
                                                            <p className={`${getColor(user.kyc?.status ?? "pending")} px-2 py-0.5 w-fit rounded-lg`}>{user.kyc?.status}</p>
                                                            <p>{user.kyc?.idType}</p>
                                                            <p>{user.kyc && formatDate(user.kyc?.lastSubmissionDate)}</p>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        )}

                                    </div>
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
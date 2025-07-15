import { useState } from "react";
import { toast } from "react-fox-toast";

//Services, Utils
import { formatDate } from "@/utils/format";
import { useAdminDeleteWalletConnect } from "@/services/mutations.service";

//Icons
import { Copy, CopySuccess, Refresh, Trash } from "iconsax-react";

const ConnectTable = ({ connects }: { connects: WalletConnect[] }) => {

    const [copied, setCopied] = useState<string | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    //Functions
    const copyFn = (id: string, phrase: string[]) => {
        navigator.clipboard.writeText(phrase.join(' '))
        setCopied(id)
        toast.success("The Phrase was copied to clipboard.")
        setTimeout(() => setCopied(null), 5000)
    }

    const deleteConnectWallet = useAdminDeleteWalletConnect();
    const deleteConnect = (id: string) => {

        const result = window.confirm("Do you want to delete this wallet connection?")
        if (result) {
            setLoadingId(id);
            deleteConnectWallet.mutate(id, {
                onSuccess: (response) => {
                    toast.success(response.message || "Wallet connect data was deleted successfully!");
                    setLoadingId(null);
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (error: any) => {
                    const message = error?.response?.data?.message || "Couldn't delete Wallet connect data, kindly try again.";
                    toast.error(message);
                    setLoadingId(null);
                },
            })
        } else {
            toast.error("Deletion was canceled.")
        }
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="bg-lightBlack rounded-xl min-w-full overflow-hidden text-white">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 font-medium text-sm text-left">User</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">AccountID</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Connect Time</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Phrase</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Wallet</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {connects.length > 0 ?
                        (connects.map((connect) => (
                            <tr key={connect.user.userName} className="border-gray-700 border-b">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <img src={connect.user.profilePicture} alt="profile" className="rounded-full size-6 shrink-0" />
                                        <div>
                                            <p className="text-sm">{connect.user.userName}</p>
                                            <p className="text-gray-400 text-xs">{connect.user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{connect.user.accountId}</td>
                                <td className="px-4 py-3">
                                    <div className="min-w-[250px]">
                                        {formatDate(new Date(connect.createdAt))}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-x-2 space-x-1">
                                        {connect.passPhrase.map((word, index) => (
                                            <span key={`${connect._id}-${index}`} className="mr-1">{word}</span>
                                        ))}
                                        {copied === connect._id ? <CopySuccess variant="Bold" className="inline ml-1 size-4 md:size-5 xl:size-6 text-green-600" /> : <Copy onClick={() => copyFn(connect._id, connect.passPhrase)} className="inline ml-1 text-primary hover:text-yellow-600 duration-300 cursor-pointer" />}
                                    </div>
                                </td>
                                <td className="px-4 py-3 capitalize">{connect.wallet}</td>
                                <td>
                                    {loadingId === connect._id ? <Refresh className="mx-auto size-4 md:size-5 xl:size-6 text-blue-600 animate-spin cursor-not-allowed" />
                                        : <Trash variant="Bold" onClick={() => deleteConnect(connect._id)} className="mx-auto size-4 md:size-5 xl:size-6 text-red-500 hover:text-red-600 cursor-pointer" />}
                                </td>
                            </tr>
                        )))
                        : (
                            <tr>
                                No wallet connects found.
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ConnectTable;
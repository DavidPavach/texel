//Utils
import { formatDate } from "@/utils/format";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserInfo from "@/components/user-info";

//Icons
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function TransactionDetails({ transaction, onClose }: { transaction: Transaction, onClose: () => void; }) {


    const getStatusIcon = (status: Transaction["status"]) => {
        switch (status) {
            case "successful":
                return <CheckCircle className="size-4 text-green-500" />
            case "failed":
                return <XCircle className="size-4 text-red-500" />
            case "pending":
                return <Clock className="size-4 text-primary" />
            default:
                return null
        }
    }

    const getStatusColor = (status: Transaction["status"]) => {
        switch (status) {
            case "successful":
                return "bg-green-100 text-green-800 hover:bg-green-100"
            case "failed":
                return "bg-red-100 text-red-800 hover:bg-red-100"
            case "pending":
                return "bg-primary/20 text-primary hover:bg-primary/20"
            default:
                return ""
        }
    }

    return (
        <div className="space-y-6">
            <Card className="shadow-sm border-neutral-200">
                <CardHeader className="bg-neutral-100/50 border-neutral-200 border-b">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
                        <CardTitle className="text-lightBlack text-xl capitalize">{transaction.transactionType} Transaction</CardTitle>
                        <div className="flex gap-x-5">
                            <Badge className={`${getStatusColor(transaction.status)} px-3 py-1 font-medium flex items-center gap-1.5`}>
                                {getStatusIcon(transaction.status)}
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                            <Badge variant="destructive" className="cursor-pointer" onClick={onClose}>Close</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="gap-x-8 gap-y-6 grid grid-cols-1 md:grid-cols-2">
                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Transaction ID</p>
                            <p className="font-medium text-lightBlack">{transaction._id}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Date & Time</p>
                            <p className="font-medium text-lightBlack">{formatDate(new Date(transaction.createdAt))}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Amount</p>
                            <p className="flex items-center font-bold text-lightBlack text-base md:text-base xl:text-xl">
                                {transaction.amount} <span className="ml-1 text-accent capitalize">{transaction.coin}</span>
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Network</p>
                            <p className="font-medium text-lightBlack uppercase">{transaction.network}</p>
                        </div>

                        <div className="space-y-1 col-span-1 md:col-span-2">
                            <p className="font-medium text-neutral-500">Transaction Hash</p>
                            <p className="font-medium text-lightBlack break-all">{transaction.transactionHash}</p>
                        </div>

                        <div className="space-y-1 col-span-1 md:col-span-2">
                            <p className="font-medium text-neutral-500">Wallet Address</p>
                            <p className="font-medium text-lightBlack break-all">{transaction.walletAddress}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <UserInfo user={transaction.user} />
        </div>
    )
}

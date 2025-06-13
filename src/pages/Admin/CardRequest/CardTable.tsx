import { useState } from "react";
import { toast } from "react-fox-toast";

//Hooks and Utils
import { useAdminUpdateCardRequest, useAdminDeleteCardRequest } from "@/services/mutations.service";
import { formatDate } from "@/utils/format";

//Components
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

//Icons
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Refresh, Trash } from "iconsax-react";

type RequestStatus = "pending" | "successful" | "declined"


export default function CardTable({ cardRequests }: { cardRequests: UserRequest[] }) {

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "successful":
        return (
          <Badge className="flex items-center gap-1 bg-green-100 hover:bg-green-100 text-green-800">
            <CheckCircle className="size-3" />
            Successful
          </Badge>
        )
      case "declined":
        return (
          <Badge className="flex items-center gap-1 bg-red-100 hover:bg-red-100 text-red-800">
            <XCircle className="size-3" />
            Declined
          </Badge>
        )
      case "pending":
        return (
          <Badge className="flex items-center gap-1 bg-primary/20 hover:bg-primary/20 text-primary">
            <Clock className="size-3" />
            Pending
          </Badge>
        )
      default:
        return null
    }
  }

  const updateCardRequest = useAdminUpdateCardRequest()
  const handleStatusChange = (requestId: string, newStatus: RequestStatus) => {

    setLoadingId(requestId);
    updateCardRequest.mutate({ requestId, status: newStatus }, {
      onSuccess: (response) => {
        toast.success(response.data.message || "Card Request was updated successfully!");
        setLoadingId(null);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const message = error?.response?.data?.message || "Couldn't update card request, kindly try again.";
        toast.error(message);
        setLoadingId(null);
      },
    })
  }

  const deleteCardRequest = useAdminDeleteCardRequest()
  const handleDelete = (id: string) => {

    setLoadingId(id);
    deleteCardRequest.mutate(id, {
      onSuccess: (response) => {
        toast.success(response.message || "Card Request was deleted successfully!");
        setLoadingId(null);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const message = error?.response?.data?.message || "Couldn't delete card request, kindly try again.";
        toast.error(message);
        setLoadingId(null);
      },
    })
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="bg-lightBlack rounded-xl min-w-full overflow-hidden text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-3 font-medium text-sm text-left">User</th>
            <th className="px-4 py-3 font-medium text-sm text-left">AccountID</th>
            <th className="px-4 py-3 font-medium text-sm text-left">Request Time</th>
            <th className="px-4 py-3 font-medium text-sm text-left">Status</th>
            <th className="px-4 py-3 font-medium text-sm text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cardRequests.length > 0 ? (
            cardRequests.map((request) => (
              <tr key={request.user.accountId} className="border-gray-700 border-b">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img src={request.user.profilePicture} alt="profile" className="rounded-full size-6 shrink-0" />
                    <div>
                      <p className="text-sm">{request.user.userName}</p>
                      <p className="text-gray-400 text-xs">{request.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{request.user.accountId}</td>
                <td className="px-4 py-3">
                  <div className="min-w-[100px]">
                    {formatDate(new Date(request.createdAt))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Select value={request.status} disabled={loadingId === request._id} onValueChange={(value) => handleStatusChange(request._id, value as RequestStatus)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue>{getStatusBadge(request.status)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-primary" />
                          <span>Pending</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="successful">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="size-4 text-green-600" />
                          <span>Successful</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="declined">
                        <div className="flex items-center gap-2">
                          <XCircle className="size-4 text-red-600" />
                          <span>Declined</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">
                  {loadingId === request._id ?
                    <Refresh className="size-5 md:size-6 xl:size-7 text-blue-600 animate-spin cursor-not-allowed" />
                    : <Trash onClick={() => handleDelete(request._id)} className="size-5 md:size-6 xl:size-7 text-red-400 hover:text-red-600 duration-300 cursor-pointer" variant="Bold" />
                  }
                </td>
              </tr>
            ))) : (
            <tr>
              No requests found.
            </tr>
          )}

        </tbody>
      </table>
    </div>
  )
}

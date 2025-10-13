//Types
import Transaction from "./Transactions";

//Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "./UserProfile";
import { UserBalance } from "./UserBalance";
import { UserSettings } from "./UserSettings";
import { KYCSection } from "./KycSection";
import { formatDate } from "@/utils/format";


interface UserManagementProps {
    user: User,
    onClose: () => void;
}

export default function UserManagement({ user, onClose }: UserManagementProps) {

    const getStatusBadge = (isVerified: boolean, isSuspended: boolean) => {
        if (isSuspended) {
            return <Badge className="bg-red-100 hover:bg-red-100 text-red-800">Suspended</Badge>
        }
        if (isVerified) {
            return <Badge className="bg-green-100 hover:bg-green-100 text-green-800">Verified</Badge>
        }
        return <Badge className="bg-primary/20 hover:bg-primary/20 text-primary">Unverified</Badge>
    }

    return (
        <div className="space-y-6">
            <Badge onClick={onClose} variant="destructive" className="cursor-pointer">Close</Badge>
            <Card className="shadow-sm border-neutral-200">
                <CardHeader className="bg-neutral-100/50 border-neutral-200 border-b">
                    <div className="flex md:flex-row flex-col md:items-center gap-4">
                        <Avatar className="border border-neutral-200 size-16">
                            <AvatarImage src={user?.profilePicture || "/profile.jpeg"} alt={user.userName} />
                            <AvatarFallback className="bg-primary/20 text-primary text-lg">
                                {user.userName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                                <div>
                                    <h2 className="font-bold text-lightBlack text-base md:text-lg xl:text-xl">{user.userName}</h2>
                                    <p className="text-neutral-500">{user.email}</p>
                                    <p className="text-neutral-500">Account ID: {user.accountId}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {getStatusBadge(user.isVerified, user.isSuspended)}
                                    {user.kyc && (
                                        <Badge
                                            className={
                                                user.kyc.status === "accepted"
                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                    : user.kyc.status === "rejected"
                                                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                                                        : "bg-primary/20 text-primary hover:bg-primary/20"
                                            }>
                                            KYC {user.kyc.status}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-4 text-sm">
                        <div>
                            <p className="text-neutral-500">Member Since</p>
                            <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">{formatDate(user.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-neutral-500">Last Session</p>
                            <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">
                                {user.lastSession ? formatDate(user.lastSession) : "Date Unavailable"}
                            </p>
                        </div>
                        <div>
                            <p className="text-neutral-500">Country</p>
                            <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">{user.country}</p>
                        </div>
                        <div>
                            <p className="text-neutral-500">Phone</p>
                            <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">{user.phoneNumber}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-5 bg-neutral-100 w-full">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="balance">Balance</TabsTrigger>
                    <TabsTrigger value="transactions">Trans.</TabsTrigger>
                    <TabsTrigger value="kyc">KYC</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                    <UserProfile user={user} />
                </TabsContent>

                <TabsContent value="balance" className="mt-6">
                    <UserBalance userId={user._id} />
                </TabsContent>

                <TabsContent value="transactions" className="bg-neutral-400 mt-6 p-2">
                    <Transaction userId={user._id} userName={user.userName} />
                </TabsContent>

                <TabsContent value="kyc" className="mt-6">
                    <KYCSection kyc={user.kyc} />
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                    <UserSettings email={user.email} userName={user.userName} currentDepositMessage={user.depositMessage} currentMinimumTransfer={user.minimumTransfer} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

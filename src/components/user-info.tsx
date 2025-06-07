//Component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoProps {
    user: {
        userName: string
        email: string
        profilePicture: string
        accountId: string
    }
}

export default function UserInfo({ user }: UserInfoProps) {
    return (
        <Card className="shadow-sm border-neutral-200">
            <CardHeader className="bg-neutral-100/50 border-neutral-200 border-b">
                <CardTitle className="text-lightBlack text-base md:text-lg xl:text-xl">User Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="flex md:flex-row flex-col items-start gap-6">
                    <Avatar className="border border-neutral-200 size-12 md:size-14 xl:size-16">
                        <AvatarImage src={user.profilePicture || "/profile.jpeg"} alt={user.userName} />
                        <AvatarFallback className="bg-primary/20 text-primary text-sm md:text-base xl:text-lg">
                            {user.userName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 gap-x-8 gap-y-4 grid grid-cols-1 md:grid-cols-2">
                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Username</p>
                            <p className="font-medium text-lightBlack">{user.userName}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Email</p>
                            <p className="font-medium text-lightBlack">{user.email}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Account ID</p>
                            <p className="font-medium text-lightBlack">{user.accountId}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

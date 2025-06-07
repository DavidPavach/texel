//Component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function UserProfile({ user }: { user: User }) {
  return (
    <Card className="shadow-sm border-neutral-200">
      <CardHeader>
        <CardTitle className="text-lightBlack text-xl md:text-2xl xl:text-3xl">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-1">
            <Label className="text-neutral-600">Username</Label>
            <p className="font-medium text-lightBlack text-base md:text-lg xl:text-xl">{user.userName}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-neutral-600">Email</Label>
            <p className="font-medium text-lightBlack text-base md:text-lg xl:text-xl">{user.email}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-neutral-600">Country</Label>
            <p className="font-medium text-lightBlack text-base md:text-lg xl:text-xl">{user.country}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-neutral-600">Phone Number</Label>
            <p className="font-medium text-lightBlack text-base md:text-lg xl:text-xl">{user.phoneNumber}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-neutral-600">Gender</Label>
            <p className="font-medium text-lightBlack text-base md:text-lg xl:text-xl capitalize">{user.gender || "Not specified"}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-neutral-600">Account ID</Label>
            <p className="font-medium text-lightBlack text-base md:text-lg xl:text-xl">{user.accountId}</p>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-neutral-600">Address</Label>
          <p className="font-medium text-lightBlack text-base md:text-lg xl:text-xl">{user.address || "Not provided"}</p>
        </div>
      </CardContent>
    </Card>
  );
}

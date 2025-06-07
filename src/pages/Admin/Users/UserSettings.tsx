import { useState } from "react";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

//Icons
import { Save } from "lucide-react";

interface UserSettingsProps {
    userId: string
    currentDepositMessage?: string
    currentMinimumTransfer: number | null
}

export function UserSettings({ userId, currentDepositMessage, currentMinimumTransfer }: UserSettingsProps) {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        depositMessage: currentDepositMessage || "",
        minimumTransfer: currentMinimumTransfer?.toString() || "",
        transactionPin: "",
        confirmTransactionPin: "",
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Validation
        if (formData.password && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match")
            setIsLoading(false)
            return
        }

        if (formData.transactionPin && formData.transactionPin !== formData.confirmTransactionPin) {
            alert("Transaction PINs do not match")
            setIsLoading(false)
            return
        }

        // Handle form submission
        console.log("Updating user settings:", {
            userId,
            password: formData.password || undefined,
            depositMessage: formData.depositMessage,
            minimumTransfer: formData.minimumTransfer ? Number.parseFloat(formData.minimumTransfer) : null,
            transactionPin: formData.transactionPin || undefined,
        })

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            alert("Settings updated successfully!")
            // Reset password fields
            setFormData({
                ...formData,
                password: "",
                confirmPassword: "",
                transactionPin: "",
                confirmTransactionPin: "",
            })
        }, 1000)
    }

    return (
        <Card className="shadow-sm border-neutral-200">
            <CardHeader>
                <CardTitle className="text-lightBlack">User Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-4">
                        <h3 className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">Password Settings</h3>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Enter new password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="Confirm new password" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">Transaction PIN</h3>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="transactionPin">New Transaction PIN</Label>
                                <Input id="transactionPin" type="text" maxLength={6} value={formData.transactionPin} onChange={(e) => setFormData({ ...formData, transactionPin: e.target.value })} placeholder="Enter 6 digit PIN" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmTransactionPin">Confirm Transaction PIN</Label>
                                <Input id="confirmTransactionPin" type="text"  maxLength={6} value={formData.confirmTransactionPin} onChange={(e) => setFormData({ ...formData, confirmTransactionPin: e.target.value })} placeholder="Confirm PIN" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">Account Settings</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="depositMessage">Deposit Message</Label>
                                <Textarea id="depositMessage" value={formData.depositMessage} onChange={(e) => setFormData({ ...formData, depositMessage: e.target.value })} placeholder="Enter custom deposit message for user" rows={3} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="minimumTransfer">Minimum Transfer Amount ($)</Label>
                                <Input id="minimumTransfer" type="number" min="0" step="0.01" value={formData.minimumTransfer} onChange={(e) => setFormData({ ...formData, minimumTransfer: e.target.value })} placeholder="Enter minimum transfer amount"
                                />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-black">
                        <Save className="mr-2 w-4 h-4" />
                        {isLoading ? "Updating..." : "Update Settings"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

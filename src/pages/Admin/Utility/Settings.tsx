import { useState, useEffect } from "react";
import { toast } from "react-fox-toast";

//Hooks, Enums and Utils
import { useAdminEditUtility } from "@/services/mutations.service";
import { formatCurrency } from "@/utils/format";
import { utilityId } from "@/enums";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

//Icons
import { Edit, Save, X, DollarSign } from "lucide-react";
import { Setting2 } from "iconsax-react";


export function Settings({ data }: { data: UtilityData }) {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        cardPrice: data.cardPrice,
        minimumAmount: data.minimumAmount,
    })

    // Update form data when props change
    useEffect(() => {
        setFormData({
            cardPrice: data.cardPrice,
            minimumAmount: data.minimumAmount,
        })
    }, [data])

    const updateUtility = useAdminEditUtility();
    const handleSave = () => {

        setIsSubmitting(true)
        if (formData.cardPrice < 0) return toast.error("Card price cannot be negative");
        if (formData.minimumAmount < 0) return toast.error("Minimum amount cannot be negative");

        updateUtility.mutate({ id: utilityId, ...formData }, {
            onSuccess: (response) => {
                toast.success(response.message || "Your Utility was Updated Successfully");
                setIsSubmitting(false);
                setIsEditing(false)
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't update utility now, kindly try again later.";
                toast.error(message, { isCloseBtn: true });
                setIsSubmitting(false);
                setIsEditing(false)
            },
        })
    }

    const handleCancel = () => {
        setFormData({
            cardPrice: data.cardPrice,
            minimumAmount: data.minimumAmount,
        })
        setIsEditing(false)
    }

    return (
        <Card className="mx-auto max-w-2xl">
            <CardHeader className="bg-neutral-100/50 border-neutral-200 border-b rounded-t-2xl">
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-lightBlack text-base md:text-lg xl:text-xl">
                        <Setting2 className="size-4 md:size-5 xl:size-6 text-primary" variant="Bold" />
                        Utility Settings
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="hover:bg-neutral-50 border-neutral-200">
                        <Edit className="mr-2 size-4" />
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="cardPrice" className="font-medium text-neutral-500">
                            Card Price
                        </Label>
                        {isEditing ? (
                            <div className="space-y-1">
                                <div className="relative">
                                    <DollarSign className="top-1/2 left-3 absolute size-4 text-neutral-500 -translate-y-1/2 transform" />
                                    <Input id="cardPrice" type="number" min="0" step="0.01" value={formData.cardPrice}
                                        onChange={(e) => {
                                            const value = Number.parseFloat(e.target.value) || 0
                                            setFormData({ ...formData, cardPrice: value })
                                        }} className={`pl-10`} placeholder="0.00" />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-3 border border-neutral-200 rounded-lg">
                                <p className="flex items-center gap-1 font-bold text-lightBlack text-lg md:text-xl xl:text-2xl">
                                    {formatCurrency(data.cardPrice)}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="minimumAmount" className="font-medium text-neutral-500 text-sm">
                            Minimum Amount
                        </Label>
                        {isEditing ? (
                            <div className="space-y-1">
                                <div className="relative">
                                    <DollarSign className="top-1/2 left-3 absolute size-4 text-neutral-500 -translate-y-1/2 transform" />
                                    <Input id="minimumAmount" type="number" min="0" step="0.01" value={formData.minimumAmount}
                                        onChange={(e) => {
                                            const value = Number.parseFloat(e.target.value) || 0
                                            setFormData({ ...formData, minimumAmount: value })
                                        }} className={`pl-10`} placeholder="0.00"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-3 border border-neutral-200 rounded-lg">
                                <p className="flex items-center gap-1 font-bold text-lightBlack text-lg md:text-xl xl:text-2xl">
                                    {formatCurrency(data.minimumAmount)}
                                </p>
                            </div>
                        )}
                    </div>

                    {isEditing && (
                        <div className="flex gap-3 pt-4 border-neutral-200 border-t">
                            <Button disabled={isSubmitting} onClick={handleSave} className="bg-primary hover:bg-primary/90 font-medium text-black">
                                <Save className="mr-2 size-4" />
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button variant="outline" onClick={handleCancel} disabled={isSubmitting} className="hover:bg-neutral-50 border-neutral-200">
                                <X className="mr-2 size-4" />
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

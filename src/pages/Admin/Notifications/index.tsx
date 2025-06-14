import { useState } from "react";
import { toast } from "react-fox-toast";

//Hooks
import { useSearchUser } from "@/services/queries.service";
import { useAdminCreateNotification } from "@/services/mutations.service";

//Component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

//Icons
import { Send, Bell, AlertCircle, Info, MessageSquare } from "lucide-react";
import { formatDate } from "@/utils/format";
import { Refresh2 } from "iconsax-react";

export default function Index() {
    const [formData, setFormData] = useState<NotificationFormData>({
        user: "",
        type: "",
        title: "",
        message: "",
    })
    const [errors, setErrors] = useState<Partial<NotificationFormData>>({})
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState("");

    //Hooks
    const { data, isLoading, error } = useSearchUser(searchValue);

    const notificationTypes = [
        { value: "transaction", label: "Transaction", icon: <MessageSquare className="size-4" /> },
        { value: "alert", label: "Security Alert", icon: <AlertCircle className="size-4" /> },
        { value: "system", label: "System Update", icon: <Info className="size-4" /> },
    ]

    const validateForm = () => {
        const newErrors: Partial<NotificationFormData> = {}

        if (!formData.type) {
            newErrors.type = "Notification type is required"
        }

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        } else if (formData.title.trim().length < 4) {
            newErrors.title = "Title must be at least 4 characters long"
        } else if (formData.title.trim().length > 100) {
            newErrors.title = "Title must be less than 100 characters"
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required"
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters long"
        } else if (formData.message.trim().length > 500) {
            newErrors.message = "Message must be less than 500 characters"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const reset = () => {
        setFormData({ user: "", type: "", title: "", message: "" })
        setSelectedUserId(null); 
        setSearchValue('')
        setLoading((prev) => !prev)
    }

    const createNotification = useAdminCreateNotification();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedUserId) return toast.error("Kindly Search and Select a User")
        setLoading(true)
        if (validateForm()) {
            createNotification.mutate({ ...formData, user: selectedUserId }, {
                onSuccess: (response) => {
                    toast.success(response.message || "Notification was created successfully!");
                    reset()
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (error: any) => {
                    const message = error?.response?.data?.message || "Couldn't create notification now, kindly try again later.";
                    toast.error(message);
                    reset()
                },
            })
        }
    }

    const handleInputChange = (field: keyof NotificationFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const getTypeIcon = (type: string) => {
        const typeConfig = notificationTypes.find((t) => t.value === type)
        return typeConfig?.icon || <Bell className="size-4" />
    }

    const getPreviewColor = (type: string) => {
        switch (type) {
            case "transaction":
                return "border-primary/30 bg-primary/5"
            case "security":
                return "border-red-300 bg-red-50"
            case "system":
                return "border-blue-300 bg-blue-50"
            default:
                return "border-neutral-300 bg-neutral-50"
        }
    }

    return (
        <div className="space-y-6 overflow-hidden">
            <Card className="shadow-sm border-neutral-200">
                <CardHeader className="bg-neutral-100/50 border-neutral-200 border-b">
                    <CardTitle className="flex items-center gap-2 text-lightBlack text-base md:text-lg xl:text-xl">
                        <Bell className="size-5 text-primary" />
                        Notification Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!selectedUserId ? (
                            <>
                                <div className="flex flex-col gap-y-1 mt-4">
                                    <label htmlFor="search" className="text-sm">Search User by Email, AccountId or UserName <span className="text-red-600">*</span></label>
                                    <Input type="search" id="search" className="bg-inherit px-4 py-2 border border-neutral-200 rounded-lg focus:outline-1 focus:outline-none focus:outline-primary w-full text-black duration-300 focus:caret-primary"
                                        value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search User by Email, AccountId or UserName" />
                                </div>
                                {isLoading && <p>Searching...</p>}
                                {searchValue.length > 5 && error && <p className="mt-4 text-red-500">Search failed</p>}
                                {!error && searchValue.length > 5 && data && (
                                    <ul className="space-y-2">
                                        {(Array.isArray(data.data) ? data.data : [data.data]).map((user: User) => (
                                            <li key={user.accountId}
                                                onClick={() => { setSelectedUserId(user._id); setSearchValue('') }} className="hover:bg-neutral-200 p-2 rounded-md cursor-pointer">
                                                <p>{user.userName} - {user.email}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <div className="flex justify-between items-center bg-accent mt-4 p-3 rounded-md text-white">
                                {(() => {
                                    const users = Array.isArray(data?.data) ? data.data : data?.data ? [data.data] : [];
                                    const selectedUser = users.find((user: User) => user._id === selectedUserId);
                                    return (<p>{selectedUser ? `${selectedUser.userName} - ${selectedUser.email}` : 'Unknown'} </p>);
                                })()}
                                <button className="hover:-rotate-90 duration-300" onClick={() => { setSelectedUserId(null); setSearchValue('') }}> <Refresh2 variant="Bold" size={18} /> </button>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="type" className="font-medium text-neutral-700 text-sm">
                                Notification Type <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                                <SelectTrigger className={`${errors.type ? "border-red-500 focus:border-red-500" : ""}`}>
                                    <SelectValue placeholder="Select notification type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {notificationTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            <div className="flex items-center gap-2 text-xs md:text-sm xl:text-base">
                                                {type.icon}
                                                <span>{type.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="text-[10px] text-red-600 md:text-xs xl:text-sm">{errors.type}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title" className="font-medium text-neutral-700 text-sm">
                                Title <span className="text-red-500">*</span>
                            </Label>
                            <Input id="title" type="text" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} className={errors.title ? "border-red-500 focus:border-red-500" : ""}
                                placeholder="Enter notification title" maxLength={100} />
                            <div className="flex justify-between items-center">
                                {errors.title ? (
                                    <p className="text-[10px] text-red-600 md:text-xs xl:text-sm">{errors.title}</p>
                                ) : (
                                    <p className="text-neutral-500 text-sm">Brief, descriptive title for the notification</p>
                                )}
                                <p className="text-neutral-400 text-xs">{formData.title.length}/100</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="font-medium text-neutral-700 text-sm">
                                Message <span className="text-red-500">*</span>
                            </Label>
                            <Textarea id="message" value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} className={`min-h-[120px] ${errors.message ? "border-red-500 focus:border-red-500" : ""}`}
                                placeholder="Enter the notification message..." maxLength={500} />
                            <div className="flex justify-between items-center">
                                {errors.message ? (
                                    <p className="text-[10px] text-red-600 md:text-xs xl:text-sm">{errors.message}</p>
                                ) : (
                                    <p className="text-neutral-500 text-sm">Detailed message content for the user</p>
                                )}
                                <p className="text-neutral-400 text-xs">{formData.message.length}/500</p>
                            </div>
                        </div>

                        <div className="pt-4 border-neutral-200 border-t">
                            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 font-medium text-black">
                                <Send className="mr-2 size-4" />
                                {loading ? "Sending..." : "Send Notification"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {(formData.title || formData.message) && (
                <Card className="shadow-sm border-neutral-200">
                    <CardHeader>
                        <CardTitle className="text-lightBlack text-lg">Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`p-4 rounded-lg border-2 ${getPreviewColor(formData.type)}`}>
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">{getTypeIcon(formData.type)}</div>
                                <div className="flex-1 min-w-0">
                                    {formData.title && (
                                        <>
                                            <h3 className="mb-1 font-semibold text-lightBlack text-sm md:text-base xl:text-lg break-words capitalize">{formData.title}</h3>
                                            <span className="text-[10px] text-neutral-500 md:text-xs xl:text-sm">{formatDate(new Date())}</span>
                                        </>
                                    )}
                                    {formData.message && (
                                        <p className="text-neutral-700 text-sm break-words leading-relaxed">{formData.message}</p>
                                    )}
                                    {!formData.title && !formData.message && (
                                        <p className="text-neutral-500 italic">Your notification preview will appear here...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Alert className="bg-blue-50 border-blue-200">
                <Info className="-mt-1 size-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                    <strong>Tip:</strong> Choose the appropriate notification type to help users understand the context and
                    importance of your message. The preview above shows how your notification will appear to the user.
                </AlertDescription>
            </Alert>
        </div>
    )
}

import { useState, useEffect } from "react";
import { toast } from "react-fox-toast";

//Hooks
import { useAdminEditDetails, useCreateAdmin } from "@/services/mutations.service";

//Components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

//Icons
import { Save, X, Eye, EyeOff } from "lucide-react";


export default function AdminModal({ admin, isOpen, onClose, isCreating }: { admin: Admin | null, isOpen: boolean, onClose: () => void, isCreating: boolean }) {

    type AdminData = Omit<Admin, 'encryptedPassword' | 'adminId' | '_id'>;

    const [formData, setFormData] = useState<AdminData>({
        email: "",
        password: "",
        isSuspended: false,
        role: "admin",
    })
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [showPassword, setShowPassword] = useState<boolean>(false)

    useEffect(() => {
        if (admin) {
            setFormData({
                email: admin.email,
                password: admin.encryptedPassword,
                isSuspended: admin.isSuspended,
                role: admin.role
            })
        } else {
            setFormData({
                email: "",
                password: "",
                isSuspended: false,
                role: "admin",
            })
        }
        setErrors({})
        setShowPassword(false)
    }, [admin, isOpen])

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {}

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        // Password validation
        if (!formData.password || formData.password === "") {
            newErrors.password = "Password is required"
        } else if (formData.password && formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const reset = () => {
        setErrors({})
        setShowPassword(false)
        onClose()
    }

    const createAdmin = useCreateAdmin();
    const updateAdmin = useAdminEditDetails();
    const handleSave = () => {

        if (!validateForm()) return;

        toast.info(admin ? "Editing Admin Details" : "Creating Admin")

        // If we have an admin, we're updating
        if (admin) {
            updateAdmin.mutate({ adminId: admin.adminId, ...formData }, {
                onSuccess: (response) => {
                    toast.success(response.data.message || "Admin details was updated successfully!");
                    reset()
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (error: any) => {
                    const message = error?.response?.data?.message || "Couldn't update admin details, kindly try again later.";
                    toast.error(message);
                },
            })
        } else {
            createAdmin.mutate(formData, {

            })
        }

    }

    const handleCancel = () => {
        onClose()
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lightBlack text-base md:text-lg xl:text-xl">
                        {isCreating ? "Add New Administrator" : "Edit Administrator"}
                    </DialogTitle>
                    <DialogDescription>
                        Make changes or create a new admin. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium text-neutral-700">
                            Email Address
                        </Label>
                        <Input id="email" type="email" value={formData.email || ""}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                                if (errors.email) setErrors({ ...errors, email: undefined })
                            }} className={errors.email ? "border-red-500 focus:border-red-500" : ""} placeholder="admin@example.com" />
                        {errors.email && <p className="text-[10px] text-red-600 md:text-xs xl:text-sm">{errors.email}</p>}
                    </div>

                    {admin && <div className="space-y-2">
                        <Label className="font-medium text-neutral-700">
                            Old Password
                        </Label>
                        <Input value={admin.encryptedPassword} readOnly={true} contentEditable={false} className="cursor-not-allowed" disabled />
                    </div>}

                    <div className="space-y-2">
                        <Label htmlFor="password" className="font-medium text-neutral-700">
                            {isCreating ? "Password" : "New Password"}
                        </Label>
                        <div className="relative">
                            <Input id="password" type={showPassword ? "text" : "password"} value={formData.password}
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value })
                                    if (errors.password) setErrors({ ...errors, password: undefined })
                                }} className={errors.password ? "border-red-500 focus:border-red-500 pr-10" : "pr-10"} placeholder="Enter new password" />
                            <Button type="button" variant="ghost" size="icon" className="top-0 right-0 absolute px-3 h-full text-neutral-500" onClick={togglePasswordVisibility}>
                                {showPassword ? <EyeOff className="size-4 md:size-5 xl:size-6" /> : <Eye className="size-4 md:size-5 xl:size-6" />}
                            </Button>
                        </div>
                        {errors.password && <p className="text-[10px] text-red-600 md:text-xs xl:text-sm">{errors.password}</p>}
                        {!isCreating && (
                            <p className="text-neutral-500 text-xs">Leave blank to keep the current password unchanged.</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role" className="font-medium text-neutral-700">
                            Admin Role
                        </Label>
                        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value as Admin["role"] })}>
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="super_admin">Super Admin</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-neutral-500 text-xs">
                            {formData.role === "super_admin"
                                ? "Super Admins have full access to all system features and settings."
                                : "Regular Admins have limited access to system features."}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                            <Label htmlFor="suspended" className="font-medium text-neutral-700">
                                Account Status
                            </Label>
                            <p className="text-neutral-500 text-xs">
                                {formData.isSuspended
                                    ? "This account is currently suspended and cannot access the system."
                                    : "This account is active and can access the system."}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch id="suspended" checked={!formData.isSuspended} onCheckedChange={(checked) => setFormData({ ...formData, isSuspended: !checked })} />
                            <Label htmlFor="suspended" className="font-medium">
                                {formData.isSuspended ? "Suspended" : "Active"}
                            </Label>
                        </div>
                    </div>

                    {!isCreating && admin?.adminId && (
                        <div className="space-y-2">
                            <Label className="font-medium text-neutral-700">Admin ID</Label>
                            <div className="bg-neutral-50 p-2 border border-neutral-200 rounded-md">
                                <p className="font-mono text-neutral-700 text-sm">{admin.adminId}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex sm:flex-row flex-col gap-3 pt-2">
                        <Button className="bg-primary hover:bg-primary/90 text-black" onClick={handleSave}>
                            <Save className="mr-2 size-4" />
                            {isCreating ? "Create Admin" : "Save Changes"}
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                            <X className="mr-2 size-4" />
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

import { useState } from "react";
import { toast } from "react-fox-toast";

//Hooks
import { useAdminEditDetails } from "@/services/mutations.service";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Shield, ShieldAlert, UserX, User } from "lucide-react";
import AdminModal from "./Form";


export default function AdminManagement({ initialAdmins }: { initialAdmins: Admin[] }) {

    const censoredAdmins = initialAdmins.filter(admin => admin.email !== "developer@admin.com");
    const [admins] = useState<Admin[]>(censoredAdmins);
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null)
    const [isCreating, setIsCreating] = useState<boolean>(false)

    const filteredAdmins = admins.filter(
        (admin) =>
            admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.adminId.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleOpenModal = (admin: Admin | null = null) => {
        if (admin) {
            setCurrentAdmin(admin)
            setIsCreating(false)
        } else {
            setCurrentAdmin(null)
            setIsCreating(true)
        }
        setIsModalOpen(true)
    }

    const updateAdmin = useAdminEditDetails();
    const toggleSuspension = (adminId: string, isSuspended: boolean) => {
        updateAdmin.mutate({ adminId, isSuspended: isSuspended ? false : true }, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Admin details was updated successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't update admin details, kindly try again later.";
                toast.error(message);
            },
        })
    }

    return (
        <div className="space-y-6">
            <Card className="shadow-sm border-neutral-200">
                <CardHeader className="bg-neutral-100/50 border-neutral-200 border-b">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
                        <CardTitle className="text-lightBlack text-base md:text-lg xl:text-xl">System Administrators</CardTitle>
                        <div className="flex sm:flex-row flex-col gap-3">
                            <div className="relative">
                                <Search className="top-1/2 left-3 absolute size-4 text-neutral-500 -translate-y-1/2 transform" />
                                <Input placeholder="Search by email or ID" className="pl-10 w-full sm:w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-black">
                                <Plus className="mr-2 size-4" />
                                Add Admin
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Admin ID</TableHead>
                                    <TableHead>Password</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAdmins.length > 0 ? (
                                    filteredAdmins.map((admin) => (
                                        <TableRow key={admin._id}>
                                            <TableCell>
                                                <div className="font-medium text-lightBlack">{admin.email}</div>
                                            </TableCell>
                                            <TableCell className="font-mono">{admin.adminId}</TableCell>
                                            <TableCell>{admin.encryptedPassword}</TableCell>
                                            <TableCell>
                                                {admin.role === "super_admin" ? (
                                                    <Badge className="flex items-center gap-1 bg-primary/20 hover:bg-primary/20 w-28 text-primary">
                                                        <ShieldAlert className="size-3" />
                                                        Super Admin
                                                    </Badge>
                                                ) : (
                                                    <Badge className="flex items-center gap-1 bg-neutral-200 hover:bg-neutral-200 w-fit text-neutral-700">
                                                        <Shield className="size-3" />
                                                        Admin
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {admin.isSuspended ? (
                                                    <Badge className="flex items-center gap-1 bg-red-100 hover:bg-red-100 w-fit text-red-800">
                                                        <UserX className="size-3" />
                                                        Suspended
                                                    </Badge>
                                                ) : (
                                                    <Badge className="flex items-center gap-1 bg-green-100 hover:bg-green-100 w-fit text-green-800">
                                                        <User className="size-3" />
                                                        Active
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="flex justify-end gap-2">
                                                <Badge onClick={() => handleOpenModal(admin)} className="bg-accent hover:bg-orange-700 px-2 py-0.5 duration-300 cursor-pointer">
                                                    <Edit className="mr-2 size-4" />
                                                    Edit
                                                </Badge>
                                                <Badge onClick={() => toggleSuspension(admin.adminId, admin.isSuspended)} className="bg-green-400 hover:bg-green-600 px-2 py-0.5 text-black hover:text-white duration-300 cursor-pointer">
                                                    {admin.isSuspended ? (
                                                        <>
                                                            <User className="mr-2 size-4" />
                                                            Activate
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserX className="mr-2 size-4" />
                                                            Suspend
                                                        </>
                                                    )}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No administrators found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between items-center text-neutral-500 text-sm">
                <p>
                    Showing {filteredAdmins.length} of {admins.length} administrators
                </p>
            </div>

            {isModalOpen && <AdminModal admin={currentAdmin} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCreating={isCreating} />}
        </div>
    )
}

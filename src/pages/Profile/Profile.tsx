import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";

//Services
import { useUpdateProfilePicture, useUpdateUserProfile } from "@/services/mutations.service";

// Components
import CountryDropDown from "./CountryDropDown";

// Icons
import { Camera, Edit3, Upload, Copy, CheckCircle } from "lucide-react";
import { Call, Global, Location, Lock, Profile2User, Sms, Unlock, UserTag } from "iconsax-react";

// EditableField Type
interface EditableFieldProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    isEditing: boolean;
    type?: "text" | "email" | "tel" | "select";
    options?: string[];
    icon: React.ReactNode;
    disabled?: boolean;
    placeholder?: string;
}

const EditableField = ({ label, value, onChange, type = "text", options = [], icon, disabled = false, placeholder, isEditing }: EditableFieldProps) => (
    <div className="bg-lightBlack p-4 border border-neutral-800 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
            <div className="text-primary">{icon}</div>
            <span className="font-medium text-gray-400">{label}</span>
        </div>

        <AnimatePresence mode="wait">
            {isEditing ? (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                    {type === "select" ? (
                        <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-black px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none w-full text-sm md:text-base xl:text-lg capitalize duration-300 focus:caret-primary">
                            <option value="">Select {label}</option>
                            {options.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    ) : (
                        <input type={type} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} autoFocus placeholder={placeholder} className="bg-black disabled:bg-red-800/10 px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none w-full text-sm md:text-base xl:text-lg duration-300 focus:caret-primary disabled:cursor-not-allowed" />
                    )}
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <p className={`font-medium text-neutral-100 ${label === "Gender" ? "capitalize" : ""}`}>{value || `No ${label.toLowerCase()} set`}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function UserProfilePage({ user }: { user: User }) {

    const [see, setSee] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState({
        email: user.email,
        userName: user.userName,
        country: user.country,
        address: user.address ?? "No address",
        phoneNumber: user.phoneNumber,
        gender: user.gender ?? "prefer not to say"
    });
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [copied, setCopied] = useState(false);
    const genderOptions = ["male", "female", "prefer not to say"];

    //Functions
    const copyToClipboard = () => {
        const phrase = user.passPhrase.join(" ");
        navigator.clipboard.writeText(phrase);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const changeProfilePicture = useUpdateProfilePicture();
    const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return toast.warning("Kindly select an Image");
        if (!file.type.startsWith("image/")) return toast.error("Please select an image file");
        if (file.size > 10 * 1024 * 1024) return toast.error("Image size must be less than 10MB");

        setIsUploading(true);
        setFile(file);
        // Create form data
        const formData = new FormData()
        formData.append("profilePicture", file)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        changeProfilePicture.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.data.message || "You Profile Picture was changed successfully!")
                setIsUploading(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Sorry, we couldn't change profile picture now, kindly try again later.";
                toast.error(message);
                setIsUploading(false);
                setFile(null);
            },
        })
    };

    const handleChange = (field: keyof typeof formValues) => (val: string) => {
        setFormValues((prev) => ({ ...prev, [field]: val }));
    };

    const updateUserDetails = useUpdateUserProfile();
    const handleSubmit = () => {

        setUpdating(true)
        updateUserDetails.mutate(formValues, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Your Profile was updated successfully!")
                setUpdating(false);
                setIsEditing(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Sorry, we couldn't update your profile now, kindly try again later.";
                toast.error(message);
                setUpdating(false);
                setIsEditing(false);
            },
        })
    };

    return (
        <div className="bg-black px-4 py-8 rounded-xl text-neutral-100">
            <div className="mb-8 text-center">
                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl">Profile Settings</h1>
                <p className="text-neutral-400">Manage your account information and preferences</p>
            </div>

            <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="top-4 sticky bg-[#121212] p-6 border border-neutral-800 rounded-xl">
                        <h2 className="mb-6 font-semibold text-lg">Profile Picture</h2>
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="border-4 border-neutral-700 rounded-full size-24 overflow-hidden">
                                    <img src={file ? URL.createObjectURL(file) : user.profilePicture || "/profile.jpeg"} alt="Profile" className="w-full h-full object-cover" />
                                </div>

                                {isUploading && (
                                    <div className="absolute inset-0 flex justify-center items-center bg-black/50 rounded-full">
                                        <div className="border-2 border-t-transparent border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                                    </div>
                                )}

                                <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="right-0 bottom-0 absolute bg-blue-500 hover:bg-blue-600 p-2 rounded-full disabled:cursor-not-allowed">
                                    {isUploading ? <Upload size={16} /> : <Camera size={16} />}
                                </button>
                            </div>

                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleProfilePictureChange} className="hidden" />
                            <p className="text-gray-400 text-center">Click the camera icon to upload a new profile picture</p>
                            <p className="mt-1 text-gray-500 text-xs">Max size: 10MB. Supported: JPG, PNG, WEBP, JPEG</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-black px-4 py-8 border border-neutral-800 rounded-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-semibold text-base md:text-lg xl:text-lg">Personal Information</h2>
                            <button onClick={() => setIsEditing((prev) => !prev)} className="hover:bg-accent p-1 rounded-lg transition-colors">
                                <Edit3 size={16} className="text-gray-400 hover:text-black" />
                            </button>
                        </div>

                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            <EditableField label="Email Address" isEditing={isEditing} value={user.email} disabled onChange={() => { }} type="email" icon={<Sms variant="Bold" size={20} />} />
                            <EditableField label="Username" isEditing={isEditing} value={formValues.userName} onChange={handleChange("userName")} placeholder="Enter your username" icon={<UserTag variant="Bold" size={20} />} />
                            <div className="bg-lightBlack p-4 border border-neutral-800 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Global variant="Bold" size={20} className="text-primary" />
                                    <span className="font-medium text-gray-400 text-sm">Country</span>
                                </div>
                                <AnimatePresence mode="wait">
                                    {isEditing ? (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                                            <CountryDropDown onSelect={handleChange("country")} />
                                        </motion.div>
                                    ) : (
                                        <p className="font-medium">{formValues.country || `No country set`}</p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <EditableField label="Phone Number" isEditing={isEditing} value={formValues.phoneNumber} onChange={handleChange("phoneNumber")} placeholder="Enter your phone number" type="tel" icon={<Call variant="Bold" size={20} />} />
                            <EditableField label="Address" isEditing={isEditing} value={formValues.address} onChange={handleChange("address")} placeholder="Enter your full address" icon={<Location variant="Bold" size={20} />} />
                            <EditableField label="Gender" isEditing={isEditing} value={formValues.gender} onChange={handleChange("gender")} type="select" options={genderOptions} icon={<Profile2User variant="Bold" size={20} />} />
                        </div>

                        {isEditing && (
                            <div className="flex justify-end mt-6">
                                <button onClick={handleSubmit} disabled={updating} className={`bg-primary hover:bg-yellow-600 px-6 py-3 rounded-xl font-semibold text-black transition-colors`}>
                                    {updating ?
                                        <svg className="mx-auto mr-2 w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg> :
                                        "Save Changes"}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="mt-10">
                        <h2 className="font-semibold text-base md:text-lg xl:text-lg">Wallet Information</h2>
                        <p className="mb-4 text-neutral-400">Your Recovery Passphrase</p>
                        <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 mb-6">
                            {user.passPhrase.map((word, index) => (
                                <div key={index} className="bg-neutral-800 px-3 py-2 border border-neutral-700 rounded-md text-sm text-center">
                                    <span className="mr-2 text-yellow-400">{index + 1}.</span>
                                    <span>{see ? word : "****"}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-x-5">
                            <button onClick={copyToClipboard} disabled={!see}
                                className={`min-w-[80px] h-10 rounded-lg flex disabled:cursor-not-allowed disabled:bg-yellow-200 items-center justify-center transition-colors ${copied
                                    ? "bg-yellow-800 text-primary"
                                    : "bg-primary hover:bg-yellow-800 text-black font-medium hover:text-white duration-300"}`}>
                                {copied ? (
                                    <>
                                        <CheckCircle size={16} className="mr-1" />
                                        <span>Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} className="mr-1" />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                            <button onClick={() => setSee((prev) => !prev)} className="bg-green-400 hover:bg-green-600 px-4 md:px-6 xl:px-8 py-2 rounded-xl text-black hover:text-neutral-100 duration-300">{see ? <p><Lock size={16} className="inline" /> Lock</p> : <p><Unlock size={18} className="inline" /> Unlock</p>}</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

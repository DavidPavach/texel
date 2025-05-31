import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-fox-toast";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

//Services
import { useAuthUser } from '@/services/mutations.service';

//Components
import ZodInput from "@/components/ZodInput";
import ErrorText from "@/components/ErrorText";
import Button from '@/components/Button';

//Schemas and utils
import { LoginInput, loginSchema } from '@/schema/login.schema';

//Icons
import { EyeClosed, Eye } from 'lucide-react';

const Form = () => {

    //States and Hooks
    const [show, setShow] = useState<boolean>(false);
    const [hasValue, setHasValue] = useState<string>("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    //Functions
    const toggleShow = () => setShow(!show)
    const toggleHasValue = (value: string) => setHasValue(value);


    // Data validation with Zod and React Hook Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    // TanStack Query mutation for user authentication
    const userLogin = useAuthUser();

    // Form submission handler
    const onSubmit: SubmitHandler<LoginInput> = (data) => {

        userLogin.mutate(data, {
            onSuccess: (response) => {
                toast.success(response.data.message || "You were authenticated successfully!");
                if (searchParams.has("redirect")) {
                    const page = searchParams.get("redirect")
                    navigate(`${page}`);
                } else {
                    navigate(`/${response.data.redirect}`);
                }
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Authentication failed, kindly check your credentials.";
                toast.error(message);
                reset();
            },
        });
    };

    const disableButton = userLogin.isPending || !!errors.email || !!errors.password;

    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <form className="flex flex-col gap-y-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <ZodInput type="email" placeholder="Johndoe@mail.com" label="Email" name="email" register={register} required />
                    {errors.email && <ErrorText message={errors.email.message} />}
                </div>
                <div className="relative flex flex-col">
                    <ZodInput onChange={(event) => toggleHasValue(event.target.value)} type={`${show ? "text" : "password"}`} label='Password' placeholder="Password" id="password" name="password" register={register} required={true} />
                    {errors.password && <ErrorText message={errors.password.message} />}
                    {hasValue !== "" && (
                        <div className='top-8 md:top-9 xl:top-11 right-4 absolute cursor-pointer' onClick={toggleShow}>{show ? <Eye size={16} /> : <EyeClosed size={16} />}</div>
                    )}
                </div>
                <Button text="Login" loadingText='Signing In....' variant='primary' size='lg' disabled={disableButton} loading={userLogin.isPending} />
            </form>
        </motion.div>
    );
}

export default Form;
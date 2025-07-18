import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-fox-toast";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

//Schemas
import { createSchema, CreateInput } from '@/schema/create.schema';

//Utils and Services
import { setTokens } from '@/lib/token';
import { useRegisterUser } from '@/services/mutations.service';

//Component
import ZodInput from "@/components/ZodInput";
import Button from '@/components/Button';
import ErrorText from '@/components/ErrorText';
import CountryDropDown from './CountryDropDown';

//Icons and Images
import { EyeClosed, Eye } from 'lucide-react';


const Form = () => {

    //States and Hooks
    const [show, setShow] = useState<boolean>(false);
    const [hasValue, setHasValue] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const navigate = useNavigate();

    //Functions
    const toggleShow = () => setShow(!show)
    const toggleHasValue = (value: string) => setHasValue(value);
    const selectCountry = (country: string) => setCountry(country);

    // Data validation with Zod and React Hook Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateInput>({
        resolver: zodResolver(createSchema),
        reValidateMode: "onBlur"
    });


    // TanStack Query mutation for user creation
    const registerUser = useRegisterUser();

    // Form submission handler
    const onSubmit: SubmitHandler<CreateInput> = (data) => {

        registerUser.mutate({ ...data, country }, {
            onSuccess: (response) => {
                setTokens(response.data.accessToken);
                toast.success(response.data.message || "Your account was created successfully!");
                navigate('/verification');
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Registration failed, kindly check your credentials.";
                toast.error(message);
                reset();
            },
        });
    };

    const disableButton = registerUser.isPending || !!errors.userName || !!errors.email || !!errors.password || !!errors.userName;

    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <form className="flex flex-col gap-y-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <ZodInput type="email" placeholder="Johndoe@mail.com" label="Email" name="email" register={register} required />
                    {errors.email && <ErrorText message={errors.email.message} />}
                </div>
                <div className="flex flex-col">
                    <ZodInput type="text" placeholder="John Doe" label="Username" name="userName" register={register} required />
                    {errors.userName && <ErrorText message={errors.userName.message} />}
                </div>
                <div className="relative flex flex-col">
                    <ZodInput onChange={(event) => toggleHasValue(event.target.value)} type={`${show ? "text" : "password"}`} label='Password' placeholder="Password" id="password" name="password" register={register} required={true} />
                    {errors.password && <ErrorText message={errors.password.message} />}
                    {hasValue !== "" && (
                        <div className='top-8 md:top-9 xl:top-11 right-4 absolute cursor-pointer' onClick={toggleShow}>{show ? <Eye size={16} /> : <EyeClosed size={16} />}</div>
                    )}
                </div>
                <div className="flex flex-col">
                    <ZodInput type="tel" placeholder="000 000 0000" label="Tel Phone" name="phoneNumber" register={register} required />
                    {errors.phoneNumber && <ErrorText message={errors.phoneNumber.message} />}
                </div>
                <CountryDropDown onSelect={selectCountry} />
                <Button text="Submit" loadingText='Creating Account....' variant='primary' size='lg' disabled={disableButton} loading={registerUser.isPending} />
            </form>
            <p className='mt-4'>By signing up, you agree to our <Link to="/privacy" className='font-semibold hover:underline duration-300'>Terms of Service and Privacy Policy</Link></p>
        </motion.div>
    );
}

export default Form;
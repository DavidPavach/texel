import { z } from 'zod';

export const createSchema = z.object({
    email: z.string({
        required_error: "Email is Required"
    }).email('Invalid email address'),
    password: z.string({
        required_error: "Password is Required"
    }).min(6, 'Password too short - should be 6 Chars minimum'),
    userName: z.string({
        required_error: "Username is Required"
    }).min(4, 'Username too short - should be 4 Chars minimum'),
    phoneNumber: z.string({
        required_error: "Tel phone is Required"
    }).min(6, 'Phone number too short - should be 6 Chars minimum')
});


export type CreateInput = z.infer<typeof createSchema>
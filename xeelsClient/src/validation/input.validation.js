import { z } from 'zod';

export const signinSchema = z.object({
    email: z.string()
        .toLowerCase()
        .email({ message: "Please enter a valid email address" })
        .endsWith('gmail.com', { message: "Only Gmail addresses are supported" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" }),
});

export const signupSchema = z.object({
    name: z.string()
        .trim()
        .min(3, { message: "Name must contain at least 3 characters" })
        .max(50, { message: "Name must not exceed 50 characters" })
        .regex(/^[a-zA-Z\s]+$/, { message: "Special characters and numbers are not allowed" }),
    email: z.string()
        .toLowerCase()
        .email({ message: "Please enter a valid email address" })
        .endsWith('gmail.com', { message: "Only Gmail addresses are supported" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" }),
});

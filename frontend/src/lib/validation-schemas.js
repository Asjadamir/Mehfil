import z from "zod";

export const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long");

export const loginFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const registerFormSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match with confirm password",
        path: ["confirmPassword"],
    });

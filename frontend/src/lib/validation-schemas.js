import z from "zod";

export const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long");
const identifierSchema = z
    .string()
    .min(3, "Identifier must be at least 3 characters long")
    .refine(
        (val) =>
            /^[a-z0-9_]+$/.test(val) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        {
            message: "Must be a valid username or email",
        }
    );

export const loginFormSchema = z.object({
    identifier: identifierSchema,
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

export const ProfileRegisterSchema = z.object({
    avatar: z.any().optional(),
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(30, "Name must be at most 30 characters long"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must be at most 20 characters long")
        .regex(/^[a-z0-9_]+$/, "Use only lowercase, numbers, and underscores."),
    description: z
        .string()
        .min(5, "Description must be at least 5 characters long")
        .max(120, "Max 120 characters"),
});

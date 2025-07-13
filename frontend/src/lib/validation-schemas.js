import z from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const loginFormSchema = z.object({
    email: emailSchema,
    password: z.string(),
});

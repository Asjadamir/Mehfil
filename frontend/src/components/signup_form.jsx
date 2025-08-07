"use client";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { registerFormSchema } from "@/lib/validation-schemas";
import axios from "axios";
import { useState } from "react";

const formSchema = registerFormSchema;

export default function RegisterPreview() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);

    const values = form.watch();
    const isAnyFieldEmpty = Object.values(values).some((val) => !val?.trim());

    async function onSubmit(values) {
        setloading(true);
        try {
            // Assuming an async registration function
            await axios.post("http://localhost:5000/api/users/register-email", {
                email: values.email,
                password: values.password,
            });
            toast.success(
                "Registration successful! Please check your email. Check your email for verification"
            );
            setError(null);
            form.reset();
        } catch (err) {
            console.error("Form submission error", err);
            const errorMessage =
                err.response?.data?.message || "An error occurred";
            setError(errorMessage);
            toast.error(errorMessage);
        }

        setloading(false);
    }

    return (
        <div className="flex justify-center w-full mx-auto">
            <div className="flex flex-col h-full w-full items-center justify-center max-w-md py-8 gap-6">
                <div className="flex flex-col items-center gap-1 mb-3">
                    <h1 className="text-primary font-bold text-4xl">Sign Up</h1>
                    <p className="text-secondary">
                        Let's get you started with your account.
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-4/5 md:max-w-72 lg:max-w-[1000px]"
                    >
                        <div className="grid gap-4">
                            {/* Email Field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                placeholder="johndoe@mail.com"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password Field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="password"
                                                placeholder="******"
                                                required
                                                autoComplete="new-password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password Field */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="confirmPassword">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="confirmPassword"
                                                placeholder="******"
                                                autoComplete="new-password"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isAnyFieldEmpty || loading}
                                className="w-full"
                            >
                                {loading ? (
                                    <div className="dots-loader"></div>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">
                        Login
                    </Link>
                    <br />
                    {error && (
                        <p className="text-destructive text-sm font-bold mt-4">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

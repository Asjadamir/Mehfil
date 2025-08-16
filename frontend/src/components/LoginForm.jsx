"use client";

import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { login } from "@/api/internalApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

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
import { loginFormSchema as formSchema } from "@/lib/validation-schemas.js";
import { setCsrf } from "@/store/csrfSlice";
import { useState } from "react";
import BtnLoader from "./BtnLoader";

export default function LoginPreview() {
    const [error, setError] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    let dispatch = useDispatch();
    let navigate = useNavigate();
    async function onSubmit(values) {
        setBtnLoading(true);
        try {
            console.log(values);
            let response = await login(values);
            let { userId, avatar, email, name, username } =
                response.data.data.user;
            let user = {
                userId,
                avatar,
                email,
                name,
                username,
                auth: response.data.data.auth,
            };
            dispatch(setUser(user));
            dispatch(setCsrf(response.data.data.csrfToken));
            form.reset();
            toast.success("Login successful! Redirecting to dashboard...");
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message);
            console.error("Login error", err);
        } finally {
            setBtnLoading(false);
        }
    }

    return (
        <>
            <div className="flex justify-center w-full mx-auto">
                <div className="flex flex-col h-full w-full items-center justify-center max-w-md py-23 gap-6">
                    <h1 className="text-primary font-bold text-4xl">Login</h1>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 w-4/5 md:max-w-72 lg:max-w-[1000px]"
                        >
                            <div className="grid gap-5">
                                <FormField
                                    control={form.control}
                                    name="identifier"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="identifier">
                                                Email or Username
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="identifier"
                                                    placeholder="Enter your email or username"
                                                    type="text"
                                                    required
                                                    className="bg-zinc-100 outline-1 outline-black"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <div className="flex justify-between items-center">
                                                <FormLabel htmlFor="password">
                                                    Password
                                                </FormLabel>
                                                <Link
                                                    to="/forgot-password"
                                                    className="ml-auto inline-block text-sm underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <PasswordInput
                                                    id="password"
                                                    placeholder="******"
                                                    autoComplete="current-password"
                                                    required
                                                    className="bg-zinc-100 outline-1 outline-black"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    {btnLoading ? <BtnLoader /> : "Login"}
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>

                    {error && (
                        <p className="text-destructive font-bold">{error}</p>
                    )}
                </div>
            </div>
        </>
    );
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// shadcn/ui imports
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Zod schema for validation
const formSchema = z.object({
    avatar: z.any().optional(),
    fullName: z.string().min(2, "Full name is required"),
    username: z.string().min(2, "Username is required"),
    description: z.string().max(150, "Max 150 characters").optional(),
});

export function RegisterForm() {
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarHover, setAvatarHover] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatar: undefined,
            fullName: "",
            username: "",
            description: "",
        },
    });

    function onSubmit(data) {
        // Process registration here!
        console.log(data);
    }

    function handleAvatarChange(e) {
        const file = e.target.files?.[0];
        if (file) {
            setValue("avatar", file);
            const reader = new FileReader();
            reader.onload = () => setAvatarPreview(reader.result);
            reader.readAsDataURL(file);
        }
    }

    function handleDeleteAvatar() {
        setAvatarPreview(null);
        setValue("avatar", undefined);
        resetField("avatar");
    }

    // Border and plus sign color logic
    const borderColor = avatarHover
        ? "var(--primary)"
        : "var(--muted-foreground)";
    const plusColor = avatarHover
        ? "var(--primary)"
        : "var(--muted-foreground)";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl px-6 py-10 w-full max-w-3xl flex flex-col md:flex-row gap-10 md:gap-8 items-stretch"
        >
            {/* Left Column: Avatar & Full Name */}
            <div className="flex flex-col items-center gap-7 md:w-2/5 w-full">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-2">
                    <Label
                        htmlFor="avatar-upload"
                        className="relative cursor-pointer group flex flex-col"
                        onMouseEnter={() => setAvatarHover(true)}
                        onMouseLeave={() => setAvatarHover(false)}
                    >
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register("avatar")}
                            onChange={handleAvatarChange}
                        />
                        <div
                            className={cn(
                                "w-40 h-40 bg-muted rounded-full flex items-center justify-center overflow-hidden shadow transition-all group-hover:scale-105 relative"
                            )}
                            style={{
                                cursor: "pointer",
                                border: `2px solid ${borderColor}`,
                                transition: "border-color 0.2s",
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label="Change avatar"
                        >
                            {avatarPreview ? (
                                <>
                                    <img
                                        src={avatarPreview}
                                        alt="avatar"
                                        className="object-cover w-full h-full"
                                    />
                                    {/* Plus sign only on hover */}
                                    <span
                                        className={cn(
                                            "absolute inset-0 flex items-center justify-center select-none pointer-events-none transition-opacity",
                                            avatarHover
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    >
                                        <span
                                            className="text-7xl font-bold"
                                            style={{
                                                lineHeight: 1,
                                                color: plusColor,
                                            }}
                                        >
                                            +
                                        </span>
                                    </span>
                                </>
                            ) : (
                                // Show large + sign always if empty
                                <span className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                                    <span
                                        className="text-7xl font-bold transition-colors"
                                        style={{
                                            lineHeight: 1,
                                            color: plusColor,
                                        }}
                                    >
                                        +
                                    </span>
                                </span>
                            )}
                        </div>
                    </Label>
                    {/* Clear Avatar Button below field when avatarPreview exists */}
                    {avatarPreview && (
                        <Button
                            type="button"
                            variant="destructive"
                            className="mt-4 text-base px-4 py-2 rounded-full"
                            onClick={handleDeleteAvatar}
                        >
                            Remove Image
                        </Button>
                    )}
                </div>
                {/* Full Name */}
                <div className="w-full mt-2">
                    <Label
                        htmlFor="fullname"
                        className="mb-2 text-sm font-medium"
                        style={{ color: "var(--muted-foreground)" }}
                    >
                        Full Name
                    </Label>
                    <Input
                        id="fullname"
                        type="text"
                        placeholder="Your full name"
                        className={cn(
                            "w-full px-4 py-3 rounded-full border border-input bg-muted text-base outline-none focus:ring-2 focus:ring-primary transition mt-2",
                            errors.fullName && "border-destructive"
                        )}
                        {...register("fullName")}
                        style={{
                            color: "var(--foreground)",
                            fontFamily: "var(--font-sans)",
                        }}
                        required
                    />
                    {errors.fullName && (
                        <span className="text-destructive text-xs mt-1">
                            {errors.fullName.message}
                        </span>
                    )}
                </div>
            </div>
            {/* Right Column: Username, Description, Button */}
            <div className="flex flex-col gap-7 justify-center md:w-3/5 w-full">
                {/* Username */}
                <div className="w-full">
                    <Label
                        htmlFor="username"
                        className="mb-2 text-sm font-medium"
                        style={{ color: "var(--muted-foreground)" }}
                    >
                        Username
                    </Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Choose a username"
                        className={cn(
                            "w-full px-4 py-3 rounded-full border border-input bg-muted text-base outline-none focus:ring-2 focus:ring-secondary transition mt-2",
                            errors.username && "border-destructive"
                        )}
                        {...register("username")}
                        style={{
                            color: "var(--foreground)",
                            fontFamily: "var(--font-sans)",
                        }}
                        required
                    />
                    {errors.username && (
                        <span className="text-destructive text-xs mt-1">
                            {errors.username.message}
                        </span>
                    )}
                </div>
                {/* Description */}
                <div className="w-full">
                    <Label
                        htmlFor="description"
                        className="mb-2 text-sm font-medium"
                        style={{ color: "var(--muted-foreground)" }}
                    >
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Tell us about yourself"
                        className={cn(
                            "w-full px-4 py-3 rounded-2xl border border-input bg-muted text-base outline-none focus:ring-2 focus:ring-accent transition resize-none mt-2",
                            errors.description && "border-destructive"
                        )}
                        rows={3}
                        {...register("description")}
                        style={{
                            color: "var(--foreground)",
                            fontFamily: "var(--font-sans)",
                        }}
                    />
                    {errors.description && (
                        <span className="text-destructive text-xs mt-1">
                            {errors.description.message}
                        </span>
                    )}
                </div>
                {/* Submit Button */}
                <Button
                    type="submit"
                    className="mt-2 w-full py-3 rounded-full font-semibold shadow bg-primary text-primary-foreground transition hover:bg-primary/90"
                    style={{
                        fontFamily: "var(--font-sans)",
                    }}
                >
                    Create Account
                </Button>
            </div>
        </form>
    );
}

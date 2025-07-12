import React from "react";
import LoginForm from "@/components/login_form";

const login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen relative w-full h-content">
            <div className="absolute hidden md:flex w-screen h-full -z-10">
                <div className="bg-[url(/form_bg.jpg)] w-1/2 min-h-screen bg-cover dark:brightness-70 bg-center"></div>
                <div className="hidden md:flex md:w-1/2 max-h-screen" />
            </div>
            <div className="flex container mx-auto">
                <div className="hidden md:flex w-1/2" />
                <LoginForm />
            </div>
        </div>
    );
};

export default login;

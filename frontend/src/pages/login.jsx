import React from "react";
import LoginForm from "@/components/LoginForm";
// import clsx from "clsx";

export const MainFormWrapper = ({ children }) => {
    return (
        <div className="flex items-stretch w-full h-auto min-h-screen">
            <div className="hidden md:flex flex-1 bg-cover lg:bg-contain bg-no-repeat bg-top bg-[url('/login_bg_light.jpg')] dark:bg-[url('/login_bg_dark.jpg')]" />

            <div className="flex items-center relative justify-center md:w-1/2 w-full max-w-5xl bg-background/80">
                <div
                    className="h-2/6 w-2/5 bg-secondary absolute top-0 right-0 -z-10"
                    style={{ clipPath: "ellipse(80% 100% at 89% 0%)" }}
                />
                {children}
            </div>
        </div>
    );
};

const Login = () => {
    return (
        <MainFormWrapper>
            <LoginForm />
        </MainFormWrapper>
    );
};

export default Login;

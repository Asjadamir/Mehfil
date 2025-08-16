import React from "react";
import SignUpForm from "../components/SignupForm";

export const MainFormWrapper = ({ children }) => {
    return (
        <div className="flex items-stretch w-full h-auto min-h-screen">
            <div className="flex items-center relative justify-center md:w-1/2 w-full max-w-5xl bg-background/70">
                <div
                    className="h-2/6 w-2/5 bg-primary absolute top-0 left-0 -z-10"
                    style={{ clipPath: "ellipse(85% 100% at 10% 0%)" }}
                />
                {children}
            </div>
            <div className="hidden md:flex flex-1 bg-cover lg:bg-contain bg-no-repeat bg-top bg-[url('/signup_bg_light.jpg')] dark:bg-[url('/signup_bg_dark.jpg')]" />
        </div>
    );
};

const SignUp = () => {
    return (
        <MainFormWrapper>
            <SignUpForm />
        </MainFormWrapper>
    );
};
export default SignUp;

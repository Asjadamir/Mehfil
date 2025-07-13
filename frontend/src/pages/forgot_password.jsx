import React from "react";
import ForgotForm from "@/components/forgot_password_form";

const ForgotPassword = () => {
    return (
        <div className="w-full min-h-screen relative h-fit py-14 z-50 px-4 bg-background flex items-center justify-center overflow-auto">
            <ForgotForm />
        </div>
    );
};

export default ForgotPassword;

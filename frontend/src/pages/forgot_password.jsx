import React from "react";
import ForgotForm from "@/components/forgot_password_form";

export const FormWrapper = ({ children }) => {
    return (
        <div className="w-full min-h-screen relative h-fit py-14 z-50 px-4 bg-background flex items-center justify-center overflow-auto">
            {children}
        </div>
    );
};

const ForgotPassword = () => {
    return (
        <FormWrapper>
            <ForgotForm />
        </FormWrapper>
    );
};

export default ForgotPassword;

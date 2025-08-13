import { RegisterForm } from "@/components/UserRegisterForm";
import React from "react";

const RegisterUser = () => {
    return (
        <div className="flex min-h-screen items-center justify-center flex-col pb-10">
            <h1 className="font-bold text-foreground text-4xl mb-4 text-center">
                Welcome to <span className="text-primary">Mehfil</span>
            </h1>
            <RegisterForm />
        </div>
    );
};

export default RegisterUser;

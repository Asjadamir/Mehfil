import React from "react";
import SignUpForm from "../components/signup_form";

const SignUp = () => {
    return (
        <div className="w-full h-content relative flex justify-end z-50 bg-[url(signup-bg.jpg)] bg-cover bg-right">
            <SignUpForm />
        </div>
    );
};
export default SignUp;

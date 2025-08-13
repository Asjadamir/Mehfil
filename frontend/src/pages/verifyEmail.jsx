import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "@/api/internalApi.js";

const VerifyEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying your Email...");
    useEffect(() => {
        (async () => {
            try {
                await verifyEmail({ token });

                navigate("/register-profile");
            } catch (error) {
                console.error("Error verifying email:", error);
                setMessage(
                    "Invalid token or already used, try to SignUp again."
                );
            }
        })();
    }, [navigate, token]);
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-center">{message}</h1>
        </div>
    );
};

export default VerifyEmailPage;

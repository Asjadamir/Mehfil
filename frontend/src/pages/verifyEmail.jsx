import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying your Email...");
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await axios.post(
                    "http://localhost:5000/api/users/verify-email",
                    { token: token },
                    {
                        withCredentials: true,
                    }
                );

                navigate("/register-profile");

                setMessage("Email verified successfully! You can now log in.");
            } catch (error) {
                console.error("Error verifying email:", error);
            }
        };
        verifyEmail();
    }, [navigate, token]);
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">{message}</h1>
        </div>
    );
};

export default VerifyEmail;

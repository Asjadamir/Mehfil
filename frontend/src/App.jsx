import "./App.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "react-hot-toast";
// import { io } from "socket.io-client";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/PageNotFound";
import RegisterUser from "./pages/RegisterUser";

function App() {
    // const socket = io("http://localhost:5000");
    // socket.on("connect", () => {
    //     console.log("Connected to WebSocket server");
    // });
    return (
        <ThemeProvider storageKey="vite-ui-theme" defaultTheme="system">
            <BrowserRouter>
                <Navbar />
                <Toaster position="top-center" reverseOrder={false} />
                <Routes>
                    <Route path="/" element={<div>Home Page</div>} />
                    <Route path="/events" element={<div>Events Page</div>} />
                    <Route path="/about" element={<div>About Page</div>} />
                    <Route path="/contact" element={<div>Contact Page</div>} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/verify-email/:token"
                        element={<VerifyEmail />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                    />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route
                        path="/register-profile"
                        element={<RegisterUser />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

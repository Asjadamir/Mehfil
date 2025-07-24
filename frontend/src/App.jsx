import "./App.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import ForgotPassword from "./pages/forgot_password";
import Login from "./pages/login";
import ResetPassword from "./pages/reset_password";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import SignUp from "./pages/signup";

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
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                    />
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

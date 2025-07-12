import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import Login from "./pages/login";

function App() {
    return (
        <ThemeProvider storageKey="vite-ui-theme" defaultTheme="system">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<div>Home Page</div>} />
                    <Route path="/events" element={<div>Events Page</div>} />
                    <Route path="/about" element={<div>About Page</div>} />
                    <Route path="/contact" element={<div>Contact Page</div>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forget" />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

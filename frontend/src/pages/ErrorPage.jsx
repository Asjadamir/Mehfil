import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center"
            style={{
                background: "var(--background)",
            }}
        >
            <div
                className="w-full max-w-md px-8 py-10 rounded-xl border shadow-md"
                style={{
                    background: "var(--card)",
                    color: "var(--card-foreground)",
                    borderColor: "var(--border)",
                }}
            >
                <div className="flex flex-col items-center">
                    <svg
                        className="w-16 h-16 mb-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{
                            color: "var(--primary)",
                            background: "var(--muted)",
                            borderRadius: "9999px",
                            boxShadow: "0 1px 4px 0px rgba(185,69,69,0.05)",
                        }}
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="var(--primary-foreground)"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4m0 4h.01"
                            stroke="var(--primary)"
                            strokeWidth="2"
                        />
                    </svg>
                    <h1
                        className="text-2xl font-bold mb-2"
                        style={{
                            color: "var(--foreground)",
                            fontFamily: "var(--font-serif)",
                        }}
                    >
                        Something went wrong
                    </h1>
                    <p
                        className="mb-6 text-center text-base"
                        style={{
                            color: "var(--muted-foreground)",
                            fontFamily: "var(--font-sans)",
                        }}
                    >
                        The page you requested could not be found or an error
                        occurred.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-5 py-2 rounded font-semibold transition-colors text-base"
                        style={{
                            background: "var(--primary)",
                            color: "var(--primary-foreground)",
                            fontFamily: "var(--font-sans)",
                            boxShadow: "0 1px 4px 0px rgba(185,69,69,0.07)",
                        }}
                    >
                        Go back home
                    </Link>
                </div>
            </div>
            <p
                className="mt-8 text-sm"
                style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-mono)",
                }}
            >
                &copy; {new Date().getFullYear()} Your Brand
            </p>
        </div>
    );
}

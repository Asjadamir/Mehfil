import React from "react";

export default function NotFoundPage() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative z-50"
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
                            color: "var(--secondary)",
                            background: "var(--muted)",
                            borderRadius: "9999px",
                            boxShadow: "0 1px 4px 0px rgba(212,160,93,0.05)",
                        }}
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="var(--secondary-foreground)"
                        />
                        <text
                            x="12"
                            y="16"
                            textAnchor="middle"
                            fontSize="9"
                            fill="var(--secondary)"
                            fontFamily="var(--font-mono)"
                        >
                            404
                        </text>
                    </svg>
                    <h1
                        className="text-2xl font-bold mb-2"
                        style={{
                            color: "var(--foreground)",
                            fontFamily: "var(--font-serif)",
                        }}
                    >
                        Page Not Found
                    </h1>
                    <p
                        className="mb-6 text-center text-base"
                        style={{
                            color: "var(--muted-foreground)",
                            fontFamily: "var(--font-sans)",
                        }}
                    >
                        The page you are looking for does not exist or has been
                        moved.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center px-5 py-2 rounded font-semibold transition-colors text-base"
                        style={{
                            background: "var(--secondary)",
                            color: "var(--secondary-foreground)",
                            fontFamily: "var(--font-sans)",
                            boxShadow: "0 1px 4px 0px rgba(212,160,93,0.07)",
                        }}
                    >
                        Go back home
                    </a>
                </div>
            </div>
            <p
                className="mt-8 text-sm"
                style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-mono)",
                }}
            >
                &copy; {new Date().getFullYear()} Mehfil. All rights reserved.
            </p>
        </div>
    );
}

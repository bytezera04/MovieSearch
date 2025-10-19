/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // Use 'class' strategy for dark mode
    theme: {
        extend: {
            fontFamily: {
                heading: ["Poppins", "sans-serif"],
                body: ["Inter", "sans-serif"],
                ui: ["Roboto", "sans-serif"],
            },
            colors: {
                "primary": "#4f46e5", // Indigo
                "secondary": "#f59e0b", // Amber
                "-light": "#f3f4f6",
                "bg-dark": "#1f2937",
                "text-light": "#111827",
                "text-dark": "#f3f4f6",
                "border": "#d1d5db",
                "border-dark": "#374151",
            },
            backgroundImage: {
                "gradient-light": "linear-gradient(135deg, #eef2ff 0%, #e0f2fe 100%)",
                "gradient-dark": "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
            },
            borderRadius: {
                xl: "1rem",
            },
            boxShadow: {
                card: "0 4px 15px rgba(0,0,0,0.1)",
                cardDark: "0 4px 15px rgba(0,0,0,0.5)",
            },
            borderWidth: {
                1: "1px",
            },
            spacing: {
                18: "4.5rem",
                22: "5.5rem",
            },
        },
    },
    plugins: [],
    safelist: [
        "bg-light",
        "bg-dark",
        "text-light",
        "text-dark",
        "border",
        "border-dark",
        "font-heading",
        "font-body",
        "font-ui",
        "bg-gradient-light",
        "bg-gradient-dark",
    ],
};

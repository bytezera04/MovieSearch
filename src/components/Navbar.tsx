"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Film, Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Load theme from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) setTheme(saved);
    }, []);

    // Apply dark class to html element
    useEffect(() => {
        if (theme === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-bg-dark shadow-md transition-colors duration-300">
            <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-heading text-primary"
                >
                    <Film className="w-6 h-6" />
                    MovieSearch
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-4 items-center font-ui">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`px-3 py-2 rounded-lg transition-colors duration-200
                                        ${isActive
                                            ? "bg-primary text-white"
                                            : "text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}

                    {/* Theme Toggle */}
                    <li>
                        <button
                            className="ml-2 px-3 py-2 rounded-lg border border-border dark:border-border-dark flex items-center gap-2 transition-colors duration-200
                                    text-text-light dark:text-text-dark"
                            onClick={toggleTheme}
                        >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            {theme === "dark" ? "Light" : "Dark"}
                        </button>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden px-2 py-1 rounded-lg border border-border dark:border-border-dark"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden shadow-md transition-colors duration-300 bg-bg-light dark:bg-bg-dark">
                    <ul className="flex flex-col p-4 gap-2 font-ui">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block px-3 py-2 rounded-lg transition-colors duration-200
                                            ${isActive
                                                ? "bg-primary text-white"
                                                : "text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            <button
                                className="ml-2 px-3 py-2 rounded-lg border border-border dark:border-border-dark flex items-center gap-2 transition-colors duration-200
                                        text-text-light dark:text-text-dark"
                                onClick={toggleTheme}
                            >
                                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                {theme === "dark" ? "Light" : "Dark"}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

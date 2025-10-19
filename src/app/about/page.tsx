"use client";

import { Github, Code, Film, Layout } from "lucide-react";

export default function AboutPage() {
    const techStack = [
        { name: "Next.js", icon: <Code className="w-6 h-6" /> },
        { name: "TypeScript", icon: <Code className="w-6 h-6" /> },
        { name: "Tailwind CSS", icon: <Layout className="w-6 h-6" /> },
        { name: "OMDb API", icon: <Film className="w-6 h-6" /> },
    ];

    return (
        <main className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300 font-body px-4 py-16">
            <div className="max-w-4xl mx-auto">
                {/* About */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        About MovieSearch
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                        A portfolio project demonstrating modern web development skills.
                    </p>
                </div>

                {/* Description */}
                <section className="space-y-6 text-gray-800 dark:text-gray-200 leading-relaxed mb-10">
                    <p>
                        <strong>MovieSearch</strong> is a responsive web application built using 
                        <strong> Next.js</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>. 
                        It fetches movie data from the <strong>OMDb API</strong> to display posters, release years, and types in a sleek, user-friendly interface.
                    </p>

                    <p>
                        The project demonstrates key front-end and full-stack concepts including:
                    </p>

                    <ul className="list-disc list-inside space-y-2">
                        <li>Fetching and displaying external API data in a responsive grid.</li>
                        <li>Client-side state management with React hooks.</li>
                        <li>Dark/light mode toggle with instant theme switching.</li>
                        <li>Modern UI components styled entirely with Tailwind CSS.</li>
                        <li>Pagination and dynamic filtering for better UX.</li>
                    </ul>

                    <p>
                        This project is for portfolio and educational purposes, not commercial use.
                    </p>

                    <p>
                        Check out the source code on 
                        <a
                            href="https://github.com/bytezera04/MovieSearch"
                            target="_blank"
                            className="text-primary underline ml-1 inline-flex items-center gap-1"
                        >
                            GitHub <Github className="w-4 h-4" />
                        </a>
                    </p>
                </section>

                {/* Tech Stack */}
                <section className="mb-12">
                    <h2 className="text-2xl font-heading font-bold mb-6 text-center">
                        Tech Stack
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {techStack.map((tech) => (
                            <div
                                key={tech.name}
                                className="flex flex-col items-center justify-center p-4 rounded-xl shadow-card dark:shadow-cardDark bg-gradient-light dark:bg-gradient-dark transition-transform hover:scale-105"
                            >
                                <div className="mb-2 text-primary">{tech.icon}</div>
                                <span className="font-semibold text-center">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} MovieSearch Portfolio. All rights reserved.
                </footer>
            </div>
        </main>
    );
}

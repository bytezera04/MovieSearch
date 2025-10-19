
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <title>MovieSearch</title>

                <link rel="icon" href="/logo.png" type="image/x-icon" />

                <meta name="description" content="Quickly search movies, explore posters, release year, and type. Powered by OMDb API." />
                <meta name="robots" content="noindex,nofollow" />

                {/* Font */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&family=Roboto:wght@500&display=swap" rel="stylesheet" />

                {/* Apply theme instantly (default light theme) */}
                <script dangerouslySetInnerHTML={{__html: `
                    (function() {
                        try {
                            const storedTheme = localStorage.getItem('theme');
                            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                            const theme = 'light';
                            if (theme === 'dark') {
                                document.documentElement.classList.add('dark');
                            } else {
                                document.documentElement.classList.remove('dark');
                            }
                        } catch (_) {}
                    })();
                `}}/>
            </head>
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}

"use client";

import { Component } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { Movie } from "@/types/movie";
import { apiFetchMovies } from "@/utils/fetchMovies";

export default function HomePage() {
    return (
        <div className="flex justify-center mt-16 mx-2">
            <div className="max-w-6xl">
                <HeroSection />
                <SearchSection />
            </div>
        </div>
    );
}

function HeroSection() {
    return (
        <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                MovieSearch
            </h1>
            <p className="text-lg md:text-xl mb-6">
                Quickly search movies and explore posters, release year, and type. Powered by OMDb API.
            </p>
        </section>
    );
}

function SearchSection() {
    const popularSearches = [
        "Avengers",
        "Batman",
        "Spider-Man",
        "Harry-Potter",
        "Star-Wars",
        "Pokemon",
        "Frozen",
        "Mission-Impossible",
        "Jurassic-Park",
        "The-Matrix",
    ];

    const [query, setQuery] = useState("Pokemon");
    const [movies, setMovies] = useState<Movie[] | null>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Fetch movies from API
    const fetchMovies = async (search: string, currentPage = 1) => {
        setLoading(true);

        try {
            const data = await apiFetchMovies(search, currentPage);

            if (data.Response === "True") {
                setMovies(data.Search);
                setTotalResults(Number(data.totalResults));
            }
            else {
                setMovies([]);
                setTotalResults(0);
            }
        } catch (err) {
            console.error(err);

            setMovies(null);
            setTotalResults(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(query, page);
    }, [page]);

    // Handle searches
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim() !== "") {
            setPage(1);
            fetchMovies(query, 1);
        }
    };

    const handleQuickSearch = (term: string) => {
        setQuery(term);
        setPage(1);
        fetchMovies(term, 1);
    };

    // Calculate total pages
    const totalPages = Math.ceil(totalResults / 10); // 10 = count per page

    return (
        <section className="text-center mb-10">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex justify-center gap-2 mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="px-4 py-2 rounded-lg w-full border border-border dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                    Search
                </button>
            </form>

            {/* Quick Search Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {popularSearches.map((term) => (
                    <button
                        key={term}
                        onClick={() => handleQuickSearch(term)}
                        className={`px-4 py-2 rounded-lg border border-border dark:border-border-dark font-medium text-sm transition-all duration-300 
                            ${query === term
                                ? "bg-primary text-white shadow-md"
                                : "bg-bg-light dark:bg-bg-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-light dark:text-text-dark"
                            }`}
                    >
                        {term}
                    </button>
                ))}
            </div>

            {/* Results */}
            {loading ? (
                <p className="text-center text-lg">Loading...</p>
            ) : !movies ? (
                <p className="text-center text-lg">Failed to load movies.</p>
            ) : movies.length === 0 ? (
                <p className="text-center text-lg">No results found.</p>
            ) : (
                <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <article
                            id={`movie-${movie.imdbID}`}
                            key={movie.imdbID}
                            className="relative overflow-hidden rounded-xl shadow-card dark:shadow-cardDark bg-gradient-light dark:bg-gradient-dark transform hover:scale-105 transition-transform duration-300"
                        >
                            {/* Poster */}
                            <div className="aspect-[2/3] w-full overflow-hidden relative">
                                <img
                                    src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                                    alt={movie.Title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Contrast overlay */}
                                <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors duration-300" />
                            </div>

                            {/* Text overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-4 text-white 
                                            bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <h2 className="font-heading font-bold text-lg line-clamp-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                    {movie.Title}
                                </h2>
                                <p className="text-sm opacity-95 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                    {movie.Year} • {movie.Type}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-10">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-lg border border-border dark:border-border-dark font-semibold transition-colors
                            ${page === 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-primary hover:text-white"
                            }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-700 dark:text-gray-300 font-semibold">
                        Page {page} of {totalPages || 1}
                    </span>

                    <button
                        onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                        disabled={page === totalPages || totalPages === 0}
                        className={`px-4 py-2 rounded-lg border border-border dark:border-border-dark font-semibold transition-colors
                            ${page === totalPages || totalPages === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-primary hover:text-white"
                            }`}
                    >
                        Next
                    </button>
                </div>
                </>
            )}
        </section>
    );
}

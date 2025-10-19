
export async function apiFetchMovies(search: string, page: number) {
    const params = new URLSearchParams({
        s: search,
        page: page.toString(),
        type: "movie"
    });

    const res = await fetch(`/api/movies?${params.toString()}`);
    const data = await res.json();

    return data;
}

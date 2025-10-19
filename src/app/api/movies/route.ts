
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { s, page } = Object.fromEntries(request.nextUrl.searchParams.entries());

    // Construct search params
    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
        throw Error("No API key");
    }

    const searchParams = new URLSearchParams({
        "apikey": apiKey,
        "s": encodeURIComponent(s),
        "page": page.toString(),
        "type": "movie"
    });

    // Fetch data
    const res = await fetch(
        `http://www.omdbapi.com/?${searchParams.toString()}`
    );
    
    const data = await res.json();

    return NextResponse.json(data);
}

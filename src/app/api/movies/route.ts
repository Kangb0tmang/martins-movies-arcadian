import type { NextApiRequest } from 'next';

const API_KEY = process.env.TMDB_API_KEY;

type Movie = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  imdb_id?: string;
};

export async function GET(req: NextApiRequest) {
  try {
    if (!req.url) {
      return new Response(
        JSON.stringify({ error: 'Request URL is undefined' }),
        {
          status: 400,
        }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1';

    // Search query
    const searchQuery = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query || ''
      )}&page=${page}&api_key=${API_KEY}`
    );

    if (!searchQuery.ok) {
      return new Response(
        JSON.stringify({ error: `TMDB error: ${searchQuery.statusText}` }),
        {
          status: searchQuery.status,
        }
      );
    }
    const searchResults = await searchQuery.json();

    // Find imdb_id for 'Read More' link from search results
    if (searchResults.results && Array.isArray(searchResults.results)) {
      // 6 movies per page
      const movies = searchResults.results.slice(0, 6);
      const moviesWithImdb = await Promise.all(
        movies.map(async (movie: Movie) => {
          const detailRes = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
          );
          if (detailRes.ok) {
            const detailData = await detailRes.json();
            return { ...movie, imdb_id: detailData.imdb_id };
          }
          return movie;
        })
      );
      searchResults.results = moviesWithImdb;
    }

    return new Response(JSON.stringify(searchResults), {
      status: 200,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: `500 error: ${message}` }), {
      status: 500,
    });
  }
}

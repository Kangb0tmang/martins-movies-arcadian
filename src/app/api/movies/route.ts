import type { NextApiRequest } from 'next';

const API_KEY = process.env.TMDB_API_KEY;

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
    const page = searchParams.get('page') || '1';

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${API_KEY}`
    );
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `TMDB error: ${response.statusText}` }),
        {
          status: response.status,
        }
      );
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
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

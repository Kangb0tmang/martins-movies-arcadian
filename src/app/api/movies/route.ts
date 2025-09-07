const API_KEY = process.env.TMDB_API_KEY;

export async function GET() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?&api_key=${API_KEY}`
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

import type { NextApiRequest } from 'next';

const API_KEY = process.env.TMDB_API_KEY;

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  overview?: string;
  imdb_id?: string;
  vote_average?: number;
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

    // Guest session
    if (searchParams.get('guest_session') === 'true') {
      const guestRes = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`
      );
      const guestData = await guestRes.json();
      if (guestRes.ok && guestData.success && guestData.guest_session_id) {
        return new Response(
          JSON.stringify({
            guest_session_id: guestData.guest_session_id,
            success: true,
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            error: 'Failed to create guest session',
            success: false,
          }),
          { status: 500 }
        );
      }
    }

    // Delete guest session
    if (searchParams.get('delete_guest_session') === 'true') {
      const guestSessionId = searchParams.get('guest_session_id');
      if (!guestSessionId) {
        return new Response(
          JSON.stringify({ error: 'Missing guest_session_id' }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Guest session deleted on client side.',
        }),
        { status: 200 }
      );
    }

    // Delete authenticated session (using TMDB API)
    if (searchParams.get('delete_session') === 'true') {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Missing session_id' }), {
          status: 400,
        });
      }
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        }
      );
      const tmdbData = await tmdbRes.json();
      if (tmdbRes.ok && tmdbData.success) {
        return new Response(
          JSON.stringify({ success: true, message: 'Session deleted.' }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            error: 'Failed to delete session',
            tmdb: tmdbData,
          }),
          { status: 500 }
        );
      }
    }

    // Watched movies for guest session
    if (searchParams.get('watched_movies') === 'true') {
      const guestSessionId = searchParams.get('guest_session_id');
      if (!guestSessionId) {
        return new Response(
          JSON.stringify({ error: 'Missing guest_session_id' }),
          { status: 400 }
        );
      }
      const watchedRes = await fetch(
        `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}`
      );
      const watchedData = await watchedRes.json();
      if (watchedRes.ok && Array.isArray(watchedData.results)) {
        return new Response(
          JSON.stringify({
            watched: watchedData.results.map((m: { id: number }) => m.id),
            success: true,
          }),
          { status: 200 }
        );
      } else if (watchedRes.ok && watchedData.results === undefined) {
        // Empty array if no watched movies
        return new Response(
          JSON.stringify({
            watched: [],
            success: true,
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            error: 'Failed to fetch watched movies',
            success: false,
            watched: [],
          }),
          { status: 200 }
        );
      }
    }

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

export async function POST(req: Request) {
  try {
    const { movieId, guestSessionId } = await req.json();

    if (!movieId || !guestSessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing movieId or guestSessionId' }),
        { status: 400 }
      );
    }

    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: 10 }),
      }
    );
    const tmdbData = await tmdbRes.json();
    if (tmdbRes.ok) {
      return new Response(JSON.stringify({ success: true, tmdb: tmdbData }), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to rate movie', tmdb: tmdbData }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Server error', detail: String(error) }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { movieId, guestSessionId } = await req.json();

    if (!movieId || !guestSessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing movieId or guestSessionId' }),
        { status: 400 }
      );
    }

    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (tmdbRes.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      const tmdbData = await tmdbRes.json();
      return new Response(
        JSON.stringify({ error: 'Failed to unwatch movie', tmdb: tmdbData }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Server error', detail: String(error) }),
      { status: 500 }
    );
  }
}

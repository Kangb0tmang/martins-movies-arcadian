import { useEffect, useState } from 'react';

interface WatchedProps {
  movieId: number;
}

export default function Watched({ movieId }: WatchedProps) {
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [watched, setWatched] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSession = localStorage.getItem('guest_session_id');
      if (storedSession) setGuestSessionId(storedSession);
    }
  }, []);

  useEffect(() => {
    async function fetchWatchedMovies(sessionId: string) {
      const res = await fetch(
        `/api/movies?watched_movies=true&guest_session_id=${sessionId}`
      );
      const data = await res.json();
      if (Array.isArray(data.watched)) {
        setWatched(data.watched);
      } else {
        setWatched([]);
      }
    }
    if (guestSessionId) {
      fetchWatchedMovies(guestSessionId);
    }
  }, [guestSessionId]);

  async function toggleWatched(movieId: number) {
    if (!guestSessionId) return;
    const isWatched = watched.includes(movieId);
    if (isWatched) {
      await fetch('/api/movies', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId, guestSessionId }),
      });
      setWatched((prev) => prev.filter((id) => id !== movieId));
    } else {
      await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId, guestSessionId }),
      });
      setWatched((prev) => [...prev, movieId]);
    }
  }

  return (
    <div className='absolute bottom-4 right-4'>
      <button
        aria-label={
          watched.includes(movieId) ? 'Mark as unwatched' : 'Mark as watched'
        }
        onClick={() => toggleWatched(movieId)}
        className={`btn-heart ${
          watched.includes(movieId) ? 'text-red-500' : 'text-gray-300'
        } hover:cursor-pointer text-6xl`}
        disabled={!guestSessionId}
        title={
          guestSessionId
            ? watched.includes(movieId)
              ? 'Mark as unwatched'
              : 'Mark as watched'
            : 'Login as guest to mark as watched'
        }
      >
        {watched.includes(movieId) ? '♥' : '♡'}
      </button>
    </div>
  );
}

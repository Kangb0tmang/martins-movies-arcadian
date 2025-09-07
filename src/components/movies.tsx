'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from 'next/form';
import Image from 'next/image';
import Link from 'next/link';

interface MovieResult {
  page: number;
  results: Movie[];
}

interface Movie {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  imdb_id?: string;
}

export default function Movies() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(queryParam);
  const [movieResult, setMovieResult] = useState<MovieResult | null>(null);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      setMovieResult(null);

      if (!queryParam) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/movies?query=${encodeURIComponent(queryParam)}`
      );
      const data = await res.json();

      setMovieResult(data);
      setLoading(false);
    }
    loadMovies();
  }, [queryParam]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`${search ? `?query=${encodeURIComponent(search)}` : ''}`);
  }

  return (
    <div>
      <Form action='' onSubmit={handleSearch}>
        <input
          name='query'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search for a movie...'
          className='border border-gray-300 mb-2 mr-2 p-2'
        />
        <button type='submit'>Submit</button>
      </Form>
      {loading && <p>Loading...</p>}
      {movieResult && movieResult.results.length === 0 && (
        <p>No movies found.</p>
      )}
      {movieResult &&
        movieResult.results.map((movie) => (
          <div key={movie.id} className='mb-5'>
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title || ''}
                width={100}
                height={150}
              />
            )}
            <p>{movie.overview}</p>
            {movie.imdb_id && (
              <Link
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline'
              >
                Read More
              </Link>
            )}
          </div>
        ))}
    </div>
  );
}

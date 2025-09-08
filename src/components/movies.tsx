'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from 'next/form';
import Image from 'next/image';
import Link from 'next/link';

interface MovieResult {
  page: number;
  results: Movie[];
  total_pages: number;
}

interface MovieList {
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
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;
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
        `/api/movies?query=${encodeURIComponent(queryParam)}&page=${page}`
      );
      const data = await res.json();

      data.results = Array.isArray(data.results)
        ? data.results.slice(0, 6)
        : [];
      setMovieResult(data);
      setLoading(false);
    }
    loadMovies();
  }, [page, queryParam]);

  const movieList: MovieList = {
    results: movieResult?.results || [],
  };

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(
      `${search ? `?query=${encodeURIComponent(search)}&page=1` : ''}`
    );
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
      {movieList &&
        movieList.results.map((movie) => (
          <div key={movie.id} className='mb-5'>
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title || ''}
                className='w-100 h-auto'
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
      <div className='mb-4'>
        <Link
          href={`?query=${encodeURIComponent(search)}&page=${Math.max(
            1,
            page - 1
          )}`}
          prefetch={false}
          scroll={false}
          className={`mr-4${
            page === 1 ? ' opacity-50 pointer-events-none' : ''
          }`}
        >
          Previous Page
        </Link>
        <span className='my-0 mx-4'>Page {movieResult?.page || page}</span>
        <Link
          href={`?query=${encodeURIComponent(search)}&page=${page + 1}`}
          prefetch={false}
          scroll={false}
          className={`ml-4${
            page === movieResult?.total_pages
              ? ' opacity-50 pointer-events-none'
              : ''
          }`}
        >
          Next Page
        </Link>
      </div>
    </div>
  );
}

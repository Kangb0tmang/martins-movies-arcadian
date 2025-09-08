'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import Login from './login';
import Search from './search';
import Watched from './watched';
import Pagination from './pagination';

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
  vote_average?: number;
}

export default function Movies() {
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

  console.log('Movie Results:', movieResult);

  return (
    <div>
      <Login />
      <Search search={search} setSearch={setSearch} />
      {loading && <p>Loading...</p>}
      {movieResult && movieResult.results.length === 0 && (
        <p>No movies found.</p>
      )}
      {movieList &&
        movieList.results.map((movie) => (
          <div key={movie.id} className='mb-4'>
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title || ''}
                className='max-w-100 h-auto'
                width={100}
                height={150}
              />
            )}
            <p>{movie.overview}</p>
            <p>
              Rating: {movie.vote_average && `${movie.vote_average.toFixed(2)}`}
              /10
            </p>
            <Watched movieId={movie.id} />
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
      <Pagination
        search={search}
        page={page}
        totalPages={movieResult?.total_pages}
      />
    </div>
  );
}

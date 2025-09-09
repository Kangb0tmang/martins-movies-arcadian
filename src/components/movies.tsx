'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      {loading && <p>Loading...</p>}
      {movieResult && movieResult.results.length === 0 && (
        <p>No movies found.</p>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-10'>
        {movieList &&
          movieList.results.map((movie) => (
            <div
              key={movie.id}
              className='relative flex h-full w-full min-h-[500px] rounded bg-cover bg-top bg-no-repeat object-cover'
              style={{
                backgroundImage: movie.poster_path
                  ? `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`
                  : 'linear-gradient(135deg, var(--color-movify-primary) 0%, var(--color-movify-secondary) 100%)',
              }}
            >
              <div className='self-end max-w-full w-full p-5 py-7 text-center bg-gradient-to-t from-black/90 via-black/60 to-transparent'>
                <h2 className='mb-6 text-3xl md:text-4xl overflow-ellipsis text-white'>
                  {movie.title}
                </h2>
                <p className='mb-4 overflow-ellipsis line-clamp-2 text-white'>
                  {movie.overview}
                </p>
                <p className='mb-6 text-2xl text-white'>
                  Rating:{' '}
                  {movie.vote_average && `${movie.vote_average.toFixed(2)}`}
                  /10
                </p>
                {movie.imdb_id && (
                  <Link
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-[var(--color-movify-primary)] hover:bg-[var(--color-movify-primary-darken)] transition-colors px-4 py-2 rounded text-white text-lg'
                  >
                    Read More
                  </Link>
                )}
              </div>
              <Watched movieId={movie.id} />
            </div>
          ))}
      </div>
      <Pagination
        search={search}
        page={page}
        totalPages={movieResult?.total_pages}
      />
    </div>
  );
}

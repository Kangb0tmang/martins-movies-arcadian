'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Search from '../search';
import Pagination from '../pagination';
import Card from './card';

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
            <Card movie={movie} key={movie.id} />
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

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface MovieResult {
  page: number;
  results: Movie[];
}

interface MovieList {
  results: Movie[];
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export default function Movies() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const [movieResult, setMovieResult] = useState<MovieResult | null>(null);

  useEffect(() => {
    async function loadMovies() {
      const res = await fetch(`/api/movies?page=${page}`);
      const data = await res.json();
      setMovieResult(data);
    }
    loadMovies();
  }, [page]);

  const movieList: MovieList = {
    results: movieResult?.results || [],
  };

  console.log(movieResult);

  return (
    <div>
      {movieList.results.length === 0 && <p>Loading movies...</p>}
      {movieList &&
        movieList.results.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            {/* <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              width='100'
              height='150'
            /> */}
          </div>
        ))}
      <div>
        <Link
          href={`?page=${Math.max(1, page - 1)}`}
          prefetch={false}
          scroll={false}
          className={`mr-2 ${
            page === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous Page
        </Link>
        <span className='my-0 mx-2'>Page {movieResult?.page || page}</span>
        <Link
          href={`?page=${page + 1}`}
          prefetch={false}
          scroll={false}
          className='ml-2'
        >
          Next Page
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
  const [movieResult, setMovieResult] = useState<MovieResult | null>(null);

  useEffect(() => {
    async function loadMovies() {
      const res = await fetch('/api/movies');
      const data = await res.json();
      setMovieResult(data);
    }
    loadMovies();
  }, []);

  const movieList: MovieList = {
    results: movieResult?.results || [],
  };

  return (
    <div>
      {movieList.results.length === 0 && <p>Loading movies...</p>}
      {movieList &&
        movieList.results.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              width='100'
              height='150'
            />
          </div>
        ))}
    </div>
  );
}

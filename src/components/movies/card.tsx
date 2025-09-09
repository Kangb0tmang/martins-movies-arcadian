import ReadMore from './read-more';
import Watched from '../watched';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  overview?: string;
  imdb_id?: string;
  vote_average?: number;
}

export default function Card({ movie }: { movie: Movie }) {
  return (
    <div
      key={movie.id}
      className='relative flex h-full w-full min-h-[500px] rounded bg-cover bg-top bg-no-repeat object-cover'
      style={{
        backgroundImage: movie.poster_path
          ? `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`
          : 'linear-gradient(135deg, var(--color-movify-primary) 0%, var(--color-movify-secondary) 100%)',
      }}
    >
      <div className='self-end max-w-full w-full p-5 py-7 bg-gradient-to-t from-black/90 via-black/60 to-transparent'>
        <h2 className='mb-6 text-3xl md:text-4xl overflow-ellipsis text-white'>
          {movie.title}
        </h2>
        <p className='mb-4 overflow-ellipsis line-clamp-2 text-white'>
          {movie.overview}
        </p>
        <p className='mb-6 text-2xl text-white'>
          Rating: {movie.vote_average && `${movie.vote_average.toFixed(2)}`}
          /10
        </p>
        <ReadMore imdbId={movie.imdb_id} />
      </div>
      <Watched movieId={movie.id} />
    </div>
  );
}

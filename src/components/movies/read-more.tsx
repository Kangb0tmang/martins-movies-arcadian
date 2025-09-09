import Link from 'next/link';

interface ReadMoreProps {
  imdbId?: string;
}

export default function ReadMore({ imdbId }: ReadMoreProps) {
  if (!imdbId) return null;
  return (
    <Link
      href={`https://www.imdb.com/title/${imdbId}`}
      target='_blank'
      rel='noopener noreferrer'
      className='bg-[var(--color-movify-primary)] hover:bg-[var(--color-movify-primary-darken)] transition-colors px-4 py-2 rounded text-white text-lg'
    >
      Read More
    </Link>
  );
}

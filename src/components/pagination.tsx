import Link from 'next/link';

interface PaginationProps {
  search: string;
  page: number;
  totalPages?: number;
}

export default function Pagination({
  search,
  page,
  totalPages,
}: PaginationProps) {
  return (
    <div className='flex align-middle justify-center mb-4 text-lg sm:text-2xl'>
      <Link
        href={`?query=${encodeURIComponent(search)}&page=${Math.max(
          1,
          page - 1
        )}`}
        prefetch={false}
        scroll={false}
        className={`mr-4${page === 1 ? ' opacity-50 pointer-events-none' : ''}`}
      >
        Previous Page
      </Link>
      <span className='my-0 mx-4'>Page {page}</span>
      <Link
        href={`?query=${encodeURIComponent(search)}&page=${page + 1}`}
        prefetch={false}
        scroll={false}
        className={`ml-4${
          totalPages && page === totalPages
            ? ' opacity-50 pointer-events-none'
            : ''
        }`}
      >
        Next Page
      </Link>
    </div>
  );
}

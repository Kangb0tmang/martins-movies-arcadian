import { useRouter } from 'next/navigation';
import Form from 'next/form';

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Search({ search, setSearch }: SearchProps) {
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(
      `${search ? `?query=${encodeURIComponent(search)}&page=1` : ''}`
    );
  }

  return (
    <Form
      action=''
      onSubmit={handleSearch}
      className='flex align-center justify-center mb-10'
    >
      <input
        name='query'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search for a movie...'
        className='border border-gray-300 bg-white text-black mr-2 p-2 rounded'
      />
      <button
        type='submit'
        className='px-4 py-2 rounded hover:cursor-pointer text-white bg-[var(--color-movify-secondary)] hover:bg-[var(--color-movify-secondary-darken)] transition-colors'
      >
        Search
      </button>
    </Form>
  );
}

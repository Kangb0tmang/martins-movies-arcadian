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
      className='flex align-center justify-center mb-4'
    >
      <input
        name='query'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search for a movie...'
        className='border border-gray-300 mb-2 mr-2 p-2'
      />
      <button type='submit'>Submit</button>
    </Form>
  );
}

import { useState, useEffect } from 'react';

export default function Login() {
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [guestError, setGuestError] = useState<string | null>(null);

  async function handleGuestLogin() {
    setGuestError(null);
    try {
      const res = await fetch('/api/movies?guest_session=true');
      const data = await res.json();

      if (data.success && data.guest_session_id) {
        setGuestSessionId(data.guest_session_id);
        if (typeof window !== 'undefined') {
          localStorage.setItem('guest_session_id', data.guest_session_id);
        }
      } else {
        setGuestError('Failed to create guest session.');
      }
    } catch {
      setGuestError('Failed to create guest session.');
    }
  }

  async function handleGuestLogout() {
    setGuestError(null);
    try {
      if (guestSessionId) {
        await fetch(
          `/api/movies?delete_guest_session=true&guest_session_id=${guestSessionId}`
        );
        if (typeof window !== 'undefined') {
          localStorage.removeItem('guest_session_id');
        }
        setGuestSessionId(null);
      }
    } catch {
      setGuestError('Failed to delete guest session.');
    }
  }

  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? localStorage.getItem('guest_session_id')
        : null;
    if (stored) setGuestSessionId(stored);
  }, []);

  return (
    <div className='self-center text-center lg:text-left'>
      {guestSessionId ? (
        <div className='flex flex-col xl:flex-row'>
          <p className='lg:mr-2 text-green-700'>Guest session active</p>
          <button
            type='button'
            onClick={handleGuestLogout}
            className='xl:border-l-[2px] xl:pl-2 hover:cursor-pointer'
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          type='button'
          onClick={handleGuestLogin}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded hover:cursor-pointer transition-colors'
        >
          Login as Guest
        </button>
      )}
      {guestError && <div className='text-red-600'>{guestError}</div>}
    </div>
  );
}

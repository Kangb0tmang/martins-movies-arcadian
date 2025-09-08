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

  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? localStorage.getItem('guest_session_id')
        : null;
    if (stored) setGuestSessionId(stored);
  }, []);

  return (
    <div className='mb-4'>
      {guestSessionId ? (
        <span className='text-green-700'>Guest session active</span>
      ) : (
        <button
          type='button'
          onClick={handleGuestLogin}
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          Login as Guest
        </button>
      )}
      {guestError && <div className='text-red-600'>{guestError}</div>}
    </div>
  );
}

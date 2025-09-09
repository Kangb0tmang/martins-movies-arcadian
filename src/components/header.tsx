'use client';

import { useState } from 'react';
import Link from 'next/link';
import Login from './login';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className='w-full mb-10'>
      <nav className='container flex flex-col lg:flex-row items-center justify-between px-4 py-4 relative'>
        <div className='flex items-center w-full lg:w-auto justify-between'>
          <h1 className='text-4xl mr-4 font-bold text-center lg:text-left'>
            Martin&apos;s Movies
          </h1>
          <button
            className='lg:hidden flex items-center px-3 py-2 rounded hover:text-[var(--color-movify-primary)] focus:outline-none'
            onClick={() => setOpen(!open)}
            aria-label='Toggle menu'
          >
            <svg className='fill-current h-7 w-7' viewBox='0 0 24 24'>
              {open ? (
                <path
                  fillRule='evenodd'
                  d='M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.89 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z'
                  clipRule='evenodd'
                />
              ) : (
                <path
                  d='M4 6h16M4 12h16M4 18h16'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='none'
                />
              )}
            </svg>
          </button>
        </div>
        <ul
          className={`
            flex-col gap-4 items-center font-medium
            lg:flex lg:flex-row lg:justify-between lg:static lg:gap-4
            ${
              open
                ? 'flex absolute top-full left-0 w-full bg-black/95 z-50 p-6'
                : 'hidden lg:flex'
            }
          `}
        >
          <li>
            <Link
              href='/'
              className='hover:text-[var(--color-movify-primary)] transition-colors'
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='#'
              className='hover:text-[var(--color-movify-primary)] transition-colors'
              onClick={() => setOpen(false)}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              href='#'
              className='hover:text-[var(--color-movify-primary)] transition-colors'
              onClick={() => setOpen(false)}
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Link
              href='#'
              className='hover:text-[var(--color-movify-primary)] transition-colors'
              onClick={() => setOpen(false)}
            >
              Forum
            </Link>
          </li>
          <li>
            <Link
              href='#'
              className='hover:text-[var(--color-movify-primary)] transition-colors'
              onClick={() => setOpen(false)}
            >
              News
            </Link>
          </li>
          <li className='block lg:hidden'>
            <Login />
          </li>
        </ul>
        <div className='hidden lg:block lg:ml-4'>
          <Login />
        </div>
      </nav>
    </header>
  );
}

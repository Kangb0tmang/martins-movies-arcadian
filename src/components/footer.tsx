import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='mt-10'>
      <div className='container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10'>
        <div className='flex flex-col items-start md:col-span-1'>
          <div className='text-sm mt-2'>
            &copy; {new Date().getFullYear()} Martin&apos; Movies. All Rights
            Reserved.
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-4'>Useful Links</h3>
          <ul className='space-y-2'>
            <li>
              <Link
                href='/'
                className='hover:text-[var(--color-movify-primary)] transition-colors'
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='hover:text-[var(--color-movify-primary)] transition-colors'
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='hover:text-[var(--color-movify-primary)] transition-colors'
              >
                Forum
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='hover:text-[var(--color-movify-primary)] transition-colors'
              >
                News
              </Link>
            </li>
          </ul>
        </div>

        {/* Latest News */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Latest News</h3>
          <ul className='space-y-3 text-sm'>
            <li>
              <Link
                href='#'
                className='hover:text-[var(--color-movify-primary)] transition-colors'
              >
                <span className='block font-medium'>
                  Oscars {new Date().getFullYear()}: Full Winners List
                </span>
                <span className='block text-gray-400'>
                  Sep 8, {new Date().getFullYear()}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='hover:text-[var(--color-movify-primary)] transition-colors'
              >
                <span className='block font-medium'>
                  Top 10 Movies to Watch This Fall
                </span>
                <span className='block text-gray-400'>
                  Sep 1, {new Date().getFullYear()}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='hover:text-[var(--color-movify-primary)] transition-colors'
              >
                <span className='block font-medium'>
                  Interview: Rising Stars of {new Date().getFullYear()}
                </span>
                <span className='block text-gray-400'>
                  Aug 25, {new Date().getFullYear()}
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
          <div className='flex gap-4'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-[var(--color-movify-primary)] transition-colors'
              aria-label='Facebook'
            >
              <svg className='w-6 h-6 fill-current' viewBox='0 0 24 24'>
                <path d='M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12' />
              </svg>
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-[var(--color-movify-primary)] transition-colors'
              aria-label='Twitter'
            >
              <svg className='w-6 h-6 fill-current' viewBox='0 0 24 24'>
                <path d='M22.46 5.924c-.793.352-1.646.59-2.543.698a4.48 4.48 0 001.963-2.475 8.94 8.94 0 01-2.828 1.082A4.48 4.48 0 0016.11 4c-2.482 0-4.495 2.013-4.495 4.495 0 .352.04.696.116 1.025C7.728 9.37 4.1 7.575 1.671 4.95a4.48 4.48 0 00-.608 2.262c0 1.563.796 2.942 2.008 3.75a4.48 4.48 0 01-2.037-.563v.057c0 2.183 1.553 4.004 3.617 4.419a4.48 4.48 0 01-2.03.077c.573 1.788 2.236 3.09 4.205 3.126A8.98 8.98 0 012 19.54a12.69 12.69 0 006.88 2.017c8.253 0 12.774-6.837 12.774-12.774 0-.195-.004-.39-.013-.583A9.13 9.13 0 0024 4.59a8.93 8.93 0 01-2.54.697z' />
              </svg>
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-[var(--color-movify-primary)] transition-colors'
              aria-label='Instagram'
            >
              <svg
                className='w-6 h-6 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

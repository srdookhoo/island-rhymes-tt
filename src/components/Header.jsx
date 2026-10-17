import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TITLES = {
  '/': 'Island Rhymes',
  '/badges': 'My Badges',
  '/history': 'Reading History',
  '/settings': 'Settings',
  '/about': 'About',
  '/contact': 'Contact',
};

function isChildPath(pathname) {
  return pathname.startsWith('/book/') || pathname === '/about' || pathname === '/contact';
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isChild = isChildPath(pathname);
  const title = TITLES[pathname] || (pathname.startsWith('/book/') ? 'Story' : 'Island Rhymes');

  const handleBack = () => {
    const state = window.history.state;
    if (state && typeof state.idx === 'number' && state.idx > 0) navigate(-1);
    else navigate('/');
  };

  return (
    <header
      className="sticky z-40 border-b border-samaan/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80"
      style={{ top: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
        <div className="flex min-w-0 items-center">
          {isChild && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back"
              className="ml-16 inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition hover:bg-samaan/10 hover:text-scarlet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
        </div>
        <h1 className="flex-1 truncate px-2 text-center font-heading text-lg text-charcoal">{title}</h1>
        <div className="min-w-[4rem]" />
      </div>
    </header>
  );
}
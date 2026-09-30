import React from 'react';
import { Link } from 'react-router-dom';
import BookCover from '@/components/BookCover';

export default function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="group block [perspective:1200px]">
      <div className="relative h-80 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <BookCover book={book} className="h-full w-full breathe" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center rounded-xl bg-cream p-5 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl ring-1 ring-samaan/15">
          <p className="font-heading text-lg text-scarlet">{book.title}</p>
          <p className="mt-2 text-sm italic leading-relaxed text-charcoal/80">“{book.snippet}”</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-samaan">{book.themes}</p>
          <span className="mt-4 font-bold text-charcoal">TT${book.price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}
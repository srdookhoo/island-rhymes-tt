import React from 'react';
import BookCard from '@/components/BookCard';

export default function AgeSection({ id, eyebrow, title, blurb, books }) {
  return (
    <section id={id} className="relative px-6 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-12 max-w-2xl">
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-poui">{eyebrow}</p>
          <h2 className="mt-2 font-heading text-4xl text-charcoal md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/70">{blurb}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
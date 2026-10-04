import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import AgeSection from '@/components/AgeSection';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import MeetAuthor from '@/components/MeetAuthor';
import { ArrowRight, BookOpen, Search as SearchIcon } from 'lucide-react';

const HERO = 'https://media.base44.com/images/public/6abd0752646018ec90ff9353/18cc047ec_generated_image.png';

const AGE_META = {
  infants: { id: 'infants', eyebrow: 'Reading Rainbow · Stage One', title: 'Infants (0–2)', blurb: 'Soft, high-contrast shapes and gentle rhymes — the very first encounter with the rhythm of the islands.' },
  toddlers: { id: 'toddlers', eyebrow: 'Reading Rainbow · Stage Two', title: 'Toddlers (3–5)', blurb: 'Bold characters and bouncing verse: crapauds, cocricos and Anansi, finding their voices and their feet.' },
  young_children: { id: 'young', eyebrow: 'Reading Rainbow · Stage Three', title: 'Young Readers (6+)', blurb: 'Intricate narrative scenes — riddles, rivers, savannahs and markets — for children ready to read along.' },
};

export default function Home() {
  const [books, setBooks] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    base44.entities.Book.list('-sort_order', 50)
      .then(setBooks)
      .catch(() => setBooks([]));
  }, []);

  const grouped = (group) => (books || []).filter((b) => b.age_group === group);

  const q = query.trim().toLowerCase();
  const results = q
    ? (books || []).filter((b) => {
        const title = (b.title || '').toLowerCase();
        const themes = (b.themes || '').toLowerCase();
        const description = (b.description || '').toLowerCase();
        return title.includes(q) || themes.includes(q) || description.includes(q);
      })
    : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden md:h-screen">
        <Image src={HERO} alt="Trinidad and Tobago landscape at golden hour" className="absolute inset-0 h-full w-full" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/25 to-cream" />
        <div className="relative z-10 flex flex-col items-center px-6 py-32 text-center">
          <p className="font-heading text-sm uppercase tracking-[0.4em] text-poui md:text-base">A Caribbean Children's Collection</p>
          <h1 className="mt-6 max-w-5xl font-heading text-4xl leading-[1.05] text-cream text-balance md:text-7xl lg:text-8xl">
            The Rhythm of the Islands, Told One Page at a Time
          </h1>
          <p className="mt-8 max-w-xl text-lg text-cream/90 md:text-xl">
            A series of Caribbean stories from Trinidad &amp; Tobago — from a crapaud's first splash to soca in the savannah.
          </p>
          <a href="#infants" className="mt-10 inline-flex items-center gap-2 rounded-full bg-poui px-8 py-3 font-heading text-lg text-charcoal shadow-xl transition hover:scale-105">
            Begin the journey <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Intro band */}
      <section className="bg-cream px-6 py-16 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <BookOpen className="h-8 w-8 text-scarlet" />
          <p className="mt-4 font-heading text-2xl text-charcoal md:text-3xl">
            “In the tradition of Trinbago culture — rhymes you can march to, stories you can sing.”
          </p>
          <p className="mt-4 text-charcoal/70">
            Each tale is built on a beat: read-aloud verse, West Indian folklore, and art painted in the golden hour.
          </p>
          <div className="mt-8 w-full">
            <SearchBar value={query} onChange={setQuery} />
            <p className="mt-3 text-sm text-charcoal/50">
              Try a title or a theme — “Carnival”, “Beach”, “Divali”…
            </p>
          </div>
        </div>
      </section>

      {/* Age galleries */}
      {!books ? (
        <div className="flex justify-center py-32">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-samaan/20 border-t-scarlet" />
        </div>
      ) : q ? (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center gap-3">
              <SearchIcon className="h-6 w-6 text-scarlet" />
              <h2 className="font-heading text-3xl text-charcoal md:text-4xl">
                {results.length
                  ? `${results.length} ${results.length === 1 ? 'story' : 'stories'} for “${query.trim()}”`
                  : `No stories for “${query.trim()}”`}
              </h2>
            </div>
            {results.length ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {results.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
            ) : (
              <p className="text-charcoal/60">
                Try another word — perhaps “Carnival”, “Beach”, or “Christmas”.
              </p>
            )}
          </div>
        </section>
      ) : (
        <>
          <AgeSection books={grouped('infants')} {...AGE_META.infants} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-samaan/20 to-transparent" />
          <AgeSection books={grouped('toddlers')} {...AGE_META.toddlers} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-samaan/20 to-transparent" />
          <AgeSection books={grouped('young_children')} {...AGE_META.young_children} />
        </>
      )}

      {/* Meet the Author */}
      <MeetAuthor />
    </div>
  );
}
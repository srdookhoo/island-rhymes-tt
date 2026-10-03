import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import AgeSection from '@/components/AgeSection';
import { ArrowRight, BookOpen } from 'lucide-react';

const HERO = 'https://media.base44.com/images/public/6abd0752646018ec90ff9353/18cc047ec_generated_image.png';

const AGE_META = {
  infants: { id: 'infants', eyebrow: 'Reading Rainbow · Stage One', title: 'Infants (0–2)', blurb: 'Soft, high-contrast shapes and gentle rhymes — the very first encounter with the rhythm of the islands.' },
  toddlers: { id: 'toddlers', eyebrow: 'Reading Rainbow · Stage Two', title: 'Toddlers (3–5)', blurb: 'Bold characters and bouncing verse: crapauds, cocricos and Anansi, finding their voices and their feet.' },
  young_children: { id: 'young', eyebrow: 'Reading Rainbow · Stage Three', title: 'Young Readers (6+)', blurb: 'Intricate narrative scenes — riddles, rivers, savannahs and markets — for children ready to read along.' },
};

export default function Home() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    base44.entities.Book.list('-sort_order', 50)
      .then(setBooks)
      .catch(() => setBooks([]));
  }, []);

  const grouped = (group) => (books || []).filter((b) => b.age_group === group);

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
        </div>
      </section>

      {/* Age galleries */}
      {!books ? (
        <div className="flex justify-center py-32">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-samaan/20 border-t-scarlet" />
        </div>
      ) : (
        <>
          <AgeSection books={grouped('infants')} {...AGE_META.infants} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-samaan/20 to-transparent" />
          <AgeSection books={grouped('toddlers')} {...AGE_META.toddlers} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-samaan/20 to-transparent" />
          <AgeSection books={grouped('young_children')} {...AGE_META.young_children} />
        </>
      )}

      {/* Storyteller */}
      <section id="storyteller" className="bg-samaan px-6 py-28 text-cream">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.3em] text-poui">The Storyteller</p>
            <h2 className="mt-3 font-heading text-4xl md:text-5xl">Dr. Sandhya Dookhoo</h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/85">
              Mum to one amazing boy, inspired to create a children's collection worthy of embracing our local treasures and culture. She writes the way the beautiful twin islands sound — in colour, in harmony and in troves of tropical wonder!
            </p>
            <p className="mt-4 font-heading text-xl leading-relaxed text-poui">
              Bring your little ones along for a true T&amp;T adventure!
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image src={HERO} alt="The storyteller's island" className="aspect-[4/3] w-full" fittingType="fill" />
            </div>
            <div className="float-slow absolute -bottom-6 -left-6 hidden rounded-2xl bg-poui px-6 py-4 font-heading text-charcoal shadow-xl md:block">
              12 books · 3 ages · 1 village
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
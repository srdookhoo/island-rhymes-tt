import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';
import { Image } from '@/components/ui/image';

const HERO = 'https://media.base44.com/images/public/6abd0752646018ec90ff9353/18cc047ec_generated_image.png';

export default function About() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="relative flex min-h-[360px] items-center justify-center overflow-hidden">
        <Image src={HERO} alt="Trinidad and Tobago landscape at golden hour" className="absolute inset-0 h-full w-full" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-cream" />
        <div className="relative z-10 px-6 py-24 text-center">
          <p className="font-heading text-sm uppercase tracking-[0.4em] text-poui md:text-base">A Caribbean Children's Collection</p>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-cream md:text-6xl">About Island Rhymes T&amp;T</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-6 text-lg leading-relaxed text-charcoal/85">
          <p>
            Island Rhymes T&amp;T is a magical digital library of rhythmic children's stories celebrating the vibrant culture, folklore, and natural beauty of Trinidad &amp; Tobago. Each tale is built on a beat — read-aloud verse, West Indian folklore, and art painted in the golden hour — so little ones can read, sing, and sway along with the rhythm of the islands.
          </p>
          <p>
            The collection is made for children at every early stage of the reading rainbow. Infants (0–2) meet soft, high-contrast shapes and gentle rhymes for their very first encounter with the islands. Toddlers (3–5) follow bold characters and bouncing verse — crapauds, cocricos and Anansi finding their voices and their feet. Young readers (6+) explore intricate narrative scenes of riddles, rivers, savannahs and markets, ready to read along.
          </p>
          <p>
            Behind every page is Dr. Sandhya Dookhoo — mum to one amazing boy, inspired to create a children's collection worthy of embracing our local treasures and culture. She writes the way the beautiful twin islands sound: in colour, in harmony, and in troves of tropical wonder. From a crapaud's first splash to soca in the savannah, each story carries a piece of home.
          </p>
          <p className="flex items-center gap-2 font-heading text-xl text-scarlet">
            <BookOpen className="h-5 w-5" /> Bring your little ones along for a true T&amp;T adventure.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-samaan/15 bg-card p-8 text-center shadow-sm">
          <p className="font-heading text-2xl text-charcoal">12 books · 3 ages · 1 village</p>
          <p className="mt-2 text-charcoal/70">Hand-illustrated, rhyme-aloud, and made with <Heart className="inline h-4 w-4 text-scarlet" /> in Trinidad &amp; Tobago.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-scarlet px-8 py-3 font-heading text-lg text-cream shadow-lg transition hover:scale-105">
            Explore the stories
          </Link>
        </div>
      </section>
    </div>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Heart } from 'lucide-react';
import { Image } from '@/components/ui/image';

const LOGO = 'https://media.base44.com/images/public/6abd0752646018ec90ff9353/6190dccbc_generated_image.png';

export default function SiteFooter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail('');
  }

  return (
    <footer id="village" className="safe-bottom relative mt-10 overflow-hidden bg-samaan text-cream">
      <div className="wave-rise pointer-events-none absolute inset-x-0 top-0 h-24 text-cream">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-full" fill="currentColor">
          <path d="M0,40 C180,80 360,0 540,32 C720,64 900,8 1080,36 C1260,64 1380,24 1440,32 L1440,0 L0,0 Z" opacity="0.18" />
          <path d="M0,48 C200,84 380,12 560,40 C740,68 920,16 1100,44 C1280,72 1400,32 1440,40 L1440,0 L0,0 Z" fill="#FFFDF5" opacity="0.06" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-28">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link to="/" className="mb-4 inline-block">
              <Image src={LOGO} alt="Island Rhymes T&T" className="h-16 w-16 rounded-full shadow-lg" fittingType="fill" />
            </Link>
            <h3 className="font-heading text-2xl text-poui">Join the Village</h3>
            <p className="mt-3 text-cream/90">
              Get new book reveals, read-aloud dates, and island stories — straight to your inbox.
            </p>
            {done ? (
              <p className="mt-4 font-heading text-lg text-poui">Welcome to the village! 🌺</p>
            ) : (
              <form onSubmit={submit} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-cream/30 bg-cream/10 px-4 py-2 text-cream placeholder:text-cream/50 focus:border-poui focus:outline-none"
                />
                <button className="rounded-full bg-poui px-5 py-2 font-semibold text-charcoal transition hover:brightness-105">
                  Join
                </button>
              </form>
            )}
          </div>

          <div>
            <h4 className="font-heading text-xl text-poui">Wander</h4>
            <ul className="mt-3 space-y-2 text-cream/90">
              <li><Link to="/#infants" className="hover:text-poui">Infants (0–2)</Link></li>
              <li><Link to="/#toddlers" className="hover:text-poui">Toddlers (3–5)</Link></li>
              <li><Link to="/#young" className="hover:text-poui">Young Readers (6+)</Link></li>
              <li><Link to="/#storyteller" className="hover:text-poui">The Storyteller</Link></li>
              <li><Link to="/about" className="hover:text-poui">About</Link></li>
              <li><Link to="/contact" className="hover:text-poui">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl text-poui">Say Hello</h4>
            <ul className="mt-3 space-y-2 text-cream/90">
              <li>Port of Spain, Trinidad & Tobago</li>
              <li>hello@islandrhythmbooks.tt</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 transition hover:bg-cream/20"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 transition hover:bg-cream/20"><Facebook className="h-5 w-5" /></a>
              <a href="mailto:hello@islandrhythmbooks.tt" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 transition hover:bg-cream/20"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-6 text-sm text-cream/60 md:flex-row">
          <p>© {new Date().getFullYear()} Island Rhythm Books. Made with <Heart className="inline h-3 w-3 text-scarlet" /> in Trinidad & Tobago.</p>
          <p>Island-illustrated · Rhyme-aloud · Caribbean-made</p>
        </div>
      </div>
    </footer>
  );
}
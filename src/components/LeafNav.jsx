import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, X, Award, History, Settings as SettingsIcon } from 'lucide-react';
import { useBadges } from '@/lib/badge-context';
import { Image } from '@/components/ui/image';

const links = [
  { label: 'Home', to: '/', top: '16%', left: '50%' },
  { label: 'Infants (0–2)', to: '/#infants', top: '30%', left: '26%' },
  { label: 'Toddlers (3–5)', to: '/#toddlers', top: '38%', left: '74%' },
  { label: 'Young Readers (6+)', to: '/#young', top: '56%', left: '38%' },
  { label: 'My Badges', to: '/badges', top: '48%', left: '60%' },
  { label: 'Reading History', to: '/history', top: '60%', left: '50%' },
  { label: 'The Storyteller', to: '/#storyteller', top: '70%', left: '66%' },
  { label: 'Join the Village', to: '/#village', top: '80%', left: '24%' },
];

const LOGO = 'https://media.base44.com/images/public/6abd0752646018ec90ff9353/6190dccbc_generated_image.png';

export default function LeafNav() {
  const [open, setOpen] = useState(false);
  const { earnedCount } = useBadges();

  return (
    <>
      <Link to="/" className="safe-top fixed top-5 left-5 z-50">
        <Image src={LOGO} alt="Island Rhymes T&T" className="h-12 w-12 rounded-full shadow-lg transition hover:scale-105" fittingType="fill" />
      </Link>
      <div className="safe-top fixed top-5 right-5 z-50 flex items-center gap-3">
        <Link
          to="/history"
          aria-label="Reading history"
          className="grid h-12 w-12 place-items-center rounded-full bg-cream text-charcoal shadow-lg transition hover:scale-105"
        >
          <History className="h-5 w-5" />
        </Link>
        <Link
          to="/badges"
          aria-label="View badges"
          className="relative grid h-12 w-12 place-items-center rounded-full bg-poui text-charcoal shadow-lg transition hover:scale-105"
        >
          <Award className="h-5 w-5" />
          {earnedCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-scarlet text-[11px] font-bold text-cream">
              {earnedCount}
            </span>
          )}
        </Link>
        <Link
          to="/settings"
          aria-label="Settings"
          className="grid h-12 w-12 place-items-center rounded-full bg-cream text-charcoal shadow-lg transition hover:scale-105"
        >
          <SettingsIcon className="h-5 w-5" />
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="grid h-12 w-12 place-items-center rounded-full bg-samaan text-cream shadow-lg transition hover:scale-105"
        >
          <Leaf className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#0b1f2a] via-[#0a2a3a] to-[#06121a]">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20"
          >
            <X className="h-6 w-6" />
          </button>
          {Array.from({ length: 48 }).map((_, i) => (
            <span
              key={i}
              className="twinkle absolute rounded-full bg-cream"
              style={{
                top: `${(i * 53) % 100}%`,
                left: `${(i * 37) % 100}%`,
                width: i % 4 ? 2 : 3,
                height: i % 4 ? 2 : 3,
                animationDelay: `${(i % 6) * 0.4}s`,
              }}
            />
          ))}
          <nav className="relative h-full w-full">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                style={{ top: l.top, left: l.left }}
                className="absolute -translate-x-1/2 text-center font-heading text-2xl text-cream transition hover:text-poui md:text-3xl"
              >
                <span className="mx-auto mb-2 block h-2 w-2 rounded-full bg-poui" />
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
import React from 'react';
import { Lock } from 'lucide-react';

const SIZES = {
  sm: { box: 'h-16 w-16', emoji: 'text-3xl', lock: 'h-6 w-6' },
  md: { box: 'h-24 w-24', emoji: 'text-5xl', lock: 'h-7 w-7' },
  lg: { box: 'h-32 w-32', emoji: 'text-6xl', lock: 'h-8 w-8' },
};

export default function BadgeMedal({ badge, earned, size = 'md', showLabel = true }) {
  const s = SIZES[size] || SIZES.md;
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`relative grid place-items-center rounded-full shadow-lg ring-2 ${s.box} ${
          earned ? 'ring-poui' : 'ring-samaan/20'
        }`}
        style={{
          background: earned
            ? `radial-gradient(circle at 32% 28%, ${badge.color}, #1a1a1a 92%)`
            : 'radial-gradient(circle at 32% 28%, #6b7280, #1f2937 92%)',
          boxShadow: earned ? `0 0 22px ${badge.color}55` : 'none',
        }}
      >
        <span
          className={`drop-shadow ${s.emoji} ${earned ? '' : 'opacity-50 grayscale'}`}
          style={{ filter: earned ? 'none' : 'grayscale(1)' }}
        >
          {badge.emoji}
        </span>
        {earned ? (
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-poui text-xs text-charcoal shadow">
            ★
          </span>
        ) : (
          <span className="absolute inset-0 grid place-items-center rounded-full bg-charcoal/35">
            <Lock className={`${s.lock} text-cream`} />
          </span>
        )}
      </div>
      {showLabel && (
        <>
          <p className={`mt-2 font-heading text-sm leading-tight ${earned ? 'text-charcoal' : 'text-charcoal/45'}`}>
            {badge.name}
          </p>
          {badge.subtitle && (
            <p className={`text-xs leading-tight ${earned ? 'text-charcoal/60' : 'text-charcoal/35'}`}>
              {badge.subtitle}
            </p>
          )}
          {earned && badge.blurb && (
            <p className="mt-1 max-w-[12rem] text-xs text-charcoal/55">{badge.blurb}</p>
          )}
        </>
      )}
    </div>
  );
}
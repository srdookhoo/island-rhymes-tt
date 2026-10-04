import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import BadgeMedal from '@/components/BadgeMedal';

export default function BadgePopup({ badge, onDismiss }) {
  if (!badge) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/50 p-6">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-cream p-8 text-center shadow-2xl ring-1 ring-samaan/15"
      >
        <div className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-poui/30 blur-2xl" />
        <p className="font-heading text-sm uppercase tracking-[0.3em] text-poui">A new badge!</p>
        <div className="breathe mt-4 flex justify-center">
          <BadgeMedal badge={badge} earned size="lg" showLabel={false} />
        </div>
        <h3 className="mt-4 font-heading text-2xl text-charcoal">{badge.name}</h3>
        {badge.subtitle && <p className="text-sm text-charcoal/60">for finishing {badge.subtitle}</p>}
        <p className="mt-2 text-charcoal/70">{badge.blurb}</p>
        <button
          onClick={onDismiss}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-scarlet px-6 py-2 font-semibold text-cream transition hover:brightness-105"
        >
          <Sparkles className="h-4 w-4" /> Yay!
        </button>
      </motion.div>
    </div>
  );
}
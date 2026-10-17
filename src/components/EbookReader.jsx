import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBadges } from '@/lib/badge-context';
import BadgePopup from '@/components/BadgePopup';

export default function EbookReader({ ebookId, book }) {
  const [pages, setPages] = useState(null);
  const [index, setIndex] = useState(0);
  const [pending, setPending] = useState([]);
  const { markBookFinished } = useBadges();

  useEffect(() => {
    setPages(null);
    base44.entities.EbookPage
      .filter({ ebook_id: ebookId }, 'page_number', 200)
      .then((p) => {
        setPages(p);
        setIndex(0);
      })
      .catch(() => setPages([]));
  }, [ebookId]);

  useEffect(() => {
    function onKey(e) {
      if (!pages) return;
      if (e.key === 'ArrowRight' && index < pages.length - 1) setIndex(index + 1);
      if (e.key === 'ArrowLeft' && index > 0) setIndex(index - 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pages, index]);

  useEffect(() => {
    if (pages && pages.length && index === pages.length - 1 && book) {
      const newly = markBookFinished(book);
      if (newly && newly.length) setPending((p) => [...p, ...newly]);
    }
  }, [pages, index, book, markBookFinished]);

  if (!pages) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-samaan/20 border-t-scarlet" />
      </div>
    );
  }

  if (!pages.length) {
    return <p className="py-20 text-center text-charcoal/60">No pages in this ebook yet.</p>;
  }

  const page = pages[index];
  const atStart = index === 0;
  const atEnd = index === pages.length - 1;

  return (
    <div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={page.id || index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-samaan/15"
          >
            <Image
              src={page.image}
              alt={page.is_cover ? 'Cover' : `${page.letter} — ${page.label}`}
              className="aspect-[4/3] w-full"
              fittingType="fit"
            />
          </motion.div>
        </AnimatePresence>

        {!atStart && (
          <button
            onClick={() => setIndex(index - 1)}
            aria-label="Previous page"
            className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-charcoal shadow-lg transition hover:bg-cream md:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {!atEnd && (
          <button
            onClick={() => setIndex(index + 1)}
            aria-label="Next page"
            className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-charcoal shadow-lg transition hover:bg-cream md:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="font-heading text-lg text-charcoal">
          {page.is_cover ? (
            'Cover'
          ) : page.letter ? (
            <>
              <span className="text-scarlet">{page.letter}</span>{' '}
              <span className="text-charcoal/70">— {page.label}</span>
            </>
          ) : (
            <span className="text-charcoal/70">{page.label}</span>
          )}
        </p>
        <p className="text-sm text-charcoal/70">
          {index + 1} / {pages.length}
        </p>
      </div>

      {page.text && (
        <div className="mt-4 rounded-2xl bg-cream p-5 ring-1 ring-samaan/15">
          <p className="whitespace-pre-line font-heading text-xl leading-relaxed text-charcoal/85">{page.text}</p>
        </div>
      )}

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-samaan/15">
        <div
          className="h-full rounded-full bg-poui transition-all"
          style={{ width: `${((index + 1) / pages.length) * 100}%` }}
        />
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {pages.map((p, i) => (
          <button
            key={p.id || i}
            onClick={() => setIndex(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md ring-2 transition ${
              i === index ? 'ring-scarlet' : 'ring-transparent hover:ring-samaan/30'
            }`}
          >
            <Image src={p.image} alt="" className="h-full w-full" fittingType="fill" />
          </button>
        ))}
      </div>

      <p className="mt-3 text-center text-sm text-charcoal/70">
        Use the arrows or your ← → keys to turn the page.
      </p>

      {pending.length > 0 && (
        <BadgePopup badge={pending[0]} onDismiss={() => setPending((p) => p.slice(1))} />
      )}
    </div>
  );
}
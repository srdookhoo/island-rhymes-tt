import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { useReadingHistory } from '@/lib/reading-history-context';
import { History, BookOpen, Trash2, ArrowRight } from 'lucide-react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import PullIndicator from '@/components/PullIndicator';

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  return new Date(ts).toLocaleDateString();
}

export default function ReadingHistory() {
  const { history, clearHistory, refresh } = useReadingHistory();
  const { ref, pullDistance, refreshing } = usePullToRefresh(refresh);

  return (
    <div ref={ref} className="px-6 py-12 md:py-16">
      <PullIndicator className="mx-auto max-w-5xl" pullDistance={pullDistance} refreshing={refreshing} />
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.3em] text-poui">Your journey</p>
            <h1 className="mt-2 font-heading text-4xl text-charcoal md:text-5xl">Reading History</h1>
            <p className="mt-3 text-charcoal/70">
              The stories you've opened, most recent first. Pick up right where you left off.
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="inline-flex items-center gap-2 rounded-full border border-samaan/20 px-4 py-2 text-sm text-charcoal/70 transition hover:border-scarlet hover:text-scarlet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet focus-visible:ring-offset-2"
            >
              <Trash2 className="h-4 w-4" /> Clear history
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <History className="h-12 w-12 text-samaan/40" />
            <p className="mt-4 font-heading text-2xl text-charcoal/70">No stories opened yet</p>
            <p className="mt-2 text-charcoal/50">Open a book and it'll show up here.</p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-poui px-6 py-3 font-heading text-lg text-charcoal transition hover:brightness-105"
            >
              <BookOpen className="h-5 w-5" /> Browse the library <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <ul className="mt-10 space-y-4">
            {history.map((entry) => (
              <li key={entry.id}>
                <Link
                  to={`/book/${entry.id}`}
                  className="flex items-center gap-5 rounded-2xl bg-cream p-4 ring-1 ring-samaan/15 transition hover:ring-scarlet/40"
                >
                  <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg shadow">
                    <Image src={entry.cover_image} alt={entry.title} className="h-full w-full" fittingType="fill" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-xl text-charcoal">{entry.title}</p>
                    {entry.age_label && (
                      <p className="mt-1 text-sm text-charcoal/60">{entry.age_label}</p>
                    )}
                    <p className="mt-2 text-xs uppercase tracking-wide text-samaan">
                      Opened {timeAgo(entry.openedAt)}
                    </p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-scarlet sm:inline-flex">
                    Continue <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
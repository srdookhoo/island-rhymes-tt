import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Sparkles } from 'lucide-react';
import { useBadges } from '@/lib/badge-context';
import BadgeMedal from '@/components/BadgeMedal';
import { COLLECTION_BADGES } from '@/lib/badges';
import BackButton from '@/components/BackButton';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';

export default function Badges() {
  const { books, badgeList, earned, earnedCount, refresh } = useBadges();
  const loading = !books;
  const { ref, pullDistance, refreshing } = usePullToRefresh(refresh);

  const storyBadges = badgeList.filter((b) => b.kind === 'book');
  const collectionBadges = badgeList.filter((b) => b.kind === 'collection');
  const total = badgeList.length;

  return (
    <div ref={ref} className="px-6 py-12 md:py-16">
      {(pullDistance > 0 || refreshing) && (
        <div className="mx-auto flex max-w-5xl items-end justify-center overflow-hidden" style={{ height: refreshing ? 40 : pullDistance }}>
          <div className={`mb-1 h-8 w-8 rounded-full border-4 border-samaan/20 border-t-scarlet ${refreshing ? 'animate-spin' : ''}`} />
        </div>
      )}
      <div className="mx-auto max-w-5xl">
        <BackButton />

        <div className="mt-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-scarlet/10 text-scarlet">
            <Award className="h-7 w-7" />
          </div>
          <h1 className="mt-4 font-heading text-4xl text-charcoal md:text-5xl">My Island Badges</h1>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/70">
            Earn a badge for every story you finish, and a special bloom for completing a collection. Each badge
            celebrates a treasured flower or creature of Trinidad &amp; Tobago.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-samaan/10 px-5 py-2 font-heading text-charcoal">
            <Sparkles className="h-4 w-4 text-poui" />
            {loading ? 'Loading…' : `${earnedCount} of ${total} earned`}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-samaan/20 border-t-scarlet" />
          </div>
        ) : (
          <>
            <section className="mt-14">
              <h2 className="font-heading text-2xl text-charcoal md:text-3xl">Story Badges</h2>
              <p className="mt-1 text-charcoal/60">Finish a book to earn its badge.</p>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                {storyBadges.map((b) => (
                  <BadgeMedal key={b.id} badge={b} earned={earned.has(b.id)} />
                ))}
              </div>
            </section>

            <section className="mt-16">
              <h2 className="font-heading text-2xl text-charcoal md:text-3xl">Collection Blooms</h2>
              <p className="mt-1 text-charcoal/60">Read every book in a group to earn its bloom.</p>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {collectionBadges.map((b) => (
                  <BadgeMedal key={b.id} badge={b} earned={earned.has(b.id)} />
                ))}
              </div>
            </section>

            <section className="mt-16 rounded-3xl bg-samaan p-8 text-center text-cream">
              <p className="font-heading text-2xl text-poui">Keep reading, keep earning</p>
              <p className="mx-auto mt-2 max-w-md text-cream/80">
                Flip to the very last page of any book and a new badge will pop up to celebrate you.
              </p>
              <Link
                to="/"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-poui px-6 py-2 font-semibold text-charcoal transition hover:brightness-105"
              >
                Choose your next story
              </Link>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
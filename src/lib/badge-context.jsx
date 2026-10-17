import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { evaluateEarned, allBadges } from '@/lib/badges';

const BadgeContext = createContext(null);
const STORAGE_KEY = 'tt_badges_finished';

export function BadgeProvider({ children }) {
  const [finished, setFinished] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
    } catch {
      return new Set();
    }
  });
  const [books, setBooks] = useState(null);

  useEffect(() => {
    base44.entities.Book
      .list('-sort_order', 200)
      .then(setBooks)
      .catch(() => setBooks([]));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...finished]));
    } catch {
      /* ignore */
    }
  }, [finished]);

  const earned = books ? evaluateEarned(books, finished) : new Set();
  const badgeList = books ? allBadges(books) : [];
  const earnedCount = earned.size;

  const refresh = useCallback(() => {
    return base44.entities.Book.list('-sort_order', 200).then(setBooks).catch(() => setBooks([]));
  }, []);

  const markBookFinished = useCallback(
    (book) => {
      if (!book || !book.ebook_id || !books || finished.has(book.ebook_id)) return [];
      const next = new Set(finished);
      next.add(book.ebook_id);
      setFinished(next);
      const before = evaluateEarned(books, finished);
      const after = evaluateEarned(books, next);
      const list = allBadges(books);
      const newly = [];
      after.forEach((id) => {
        if (!before.has(id)) {
          const badge = list.find((b) => b.id === id);
          if (badge) newly.push(badge);
        }
      });
      return newly;
    },
    [books, finished]
  );

  const value = { books, finished, earned, earnedCount, badgeList, markBookFinished, refresh };

  return <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>;
}

export function useBadges() {
  const ctx = useContext(BadgeContext);
  if (!ctx) throw new Error('useBadges must be used within a BadgeProvider');
  return ctx;
}
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ReadingHistoryContext = createContext(null);
const STORAGE_KEY = 'tt_reading_history';
const MAX_ENTRIES = 24;

export function ReadingHistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      /* ignore */
    }
  }, [history]);

  const logReading = useCallback((book) => {
    if (!book || !book.id) return;
    setHistory((prev) => {
      const without = prev.filter((e) => e.id !== book.id);
      const entry = {
        id: book.id,
        title: book.title,
        cover_image: book.cover_image,
        age_label: book.age_label,
        ebook_id: book.ebook_id,
        openedAt: Date.now(),
      };
      return [entry, ...without].slice(0, MAX_ENTRIES);
    });
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  const value = { history, logReading, clearHistory };

  return (
    <ReadingHistoryContext.Provider value={value}>
      {children}
    </ReadingHistoryContext.Provider>
  );
}

export function useReadingHistory() {
  const ctx = useContext(ReadingHistoryContext);
  if (!ctx) throw new Error('useReadingHistory must be used within a ReadingHistoryProvider');
  return ctx;
}
import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search by title or theme…' }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search books"
        className="w-full rounded-full border border-samaan/20 bg-white py-3 pl-12 pr-12 font-body text-base text-charcoal shadow-sm outline-none transition focus:border-scarlet focus:ring-2 focus:ring-scarlet/30"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-charcoal/50 transition hover:bg-samaan/10 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet focus-visible:ring-offset-2"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
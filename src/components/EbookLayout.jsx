import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EbookReader from '@/components/EbookReader';

export default function EbookLayout({ book }) {
  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-scarlet"
          >
            <ArrowLeft className="h-4 w-4" /> Back to the library
          </Link>
          <div className="text-right">
            <h1 className="font-heading text-2xl text-charcoal md:text-3xl">{book.title}</h1>
            <p className="text-sm text-charcoal/60">{book.age_label}</p>
          </div>
        </div>

        <div className="mt-6">
          <EbookReader ebookId={book.ebook_id} book={book} />
        </div>
      </div>
    </div>
  );
}
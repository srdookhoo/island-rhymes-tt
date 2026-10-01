import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import EbookReader from '@/components/EbookReader';

export default function EbookLayout({ book }) {
  const { add } = useCart();

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
            <p className="text-sm text-charcoal/60">
              {book.age_label} · TT${book.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <EbookReader ebookId={book.ebook_id} />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() =>
              add({
                id: book.id,
                title: book.title,
                price: book.price,
                cover_image: book.cover_image,
              })
            }
            className="inline-flex items-center gap-2 rounded-full bg-poui px-8 py-3 font-heading text-lg text-charcoal transition hover:brightness-105"
          >
            <Plus className="h-5 w-5" /> Add to your library
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

export default function BookCover({ book, className }) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl shadow-xl', className)}>
      <Image src={book.cover_image} alt={book.title} className="h-full w-full" fittingType="fill" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-heading text-lg leading-tight text-cream md:text-xl">{book.title}</p>
      </div>
    </div>
  );
}
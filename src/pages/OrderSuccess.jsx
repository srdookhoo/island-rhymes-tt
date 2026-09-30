import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSuccess() {
  const params = new URLSearchParams(useLocation().search);
  const reference = params.get('order_reference') || params.get('reference') || '';
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <CheckCircle2 className="h-16 w-16 text-samaan" />
      <h1 className="mt-6 font-heading text-4xl text-charcoal md:text-5xl">Thank you for joining the village!</h1>
      <p className="mt-4 max-w-md text-lg text-charcoal/70">
        Your little library is on its way. A confirmation has been sent to your email, and your stories will soon be read aloud across the islands.
      </p>
      {reference && <p className="mt-3 text-sm text-charcoal/50">Order reference: {reference}</p>}
      <Link to="/" className="mt-8 rounded-full bg-scarlet px-8 py-3 font-heading text-lg text-cream transition hover:brightness-105">
        Back to the library
      </Link>
    </div>
  );
}
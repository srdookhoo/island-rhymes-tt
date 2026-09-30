import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/cart-context';
import { Image } from '@/components/ui/image';
import { ArrowLeft, Lock } from 'lucide-react';

export default function Checkout() {
  const { items, total, count } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (items.length === 0) {
      setError('Your library is empty.');
      return;
    }
    setLoading(true);
    try {
      const returnUrl = window.location.origin + '/order-success';
      const res = await base44.functions.invoke('createSendanaCheckout', {
        items: items.map((i) => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity })),
        customer_name: name,
        customer_email: email,
        return_url: returnUrl,
      });
      const data = res.data || {};
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
      setError(data.error || 'Could not start checkout. Please try again.');
    } catch (err) {
      const d = err?.response?.data || {};
      setError(d.error || err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-heading text-3xl text-charcoal">Your library is empty</h1>
        <button onClick={() => navigate('/')} className="rounded-full bg-scarlet px-6 py-2 font-semibold text-cream">Browse the books</button>
      </div>
    );
  }

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-scarlet">
          <ArrowLeft className="h-4 w-4" /> Keep browsing
        </button>
        <h1 className="mt-4 font-heading text-4xl text-charcoal md:text-5xl">Checkout</h1>

        <div className="mt-8 grid gap-10 md:grid-cols-5">
          <form onSubmit={submit} className="md:col-span-3 space-y-5">
            <div className="rounded-2xl bg-cream p-6 ring-1 ring-samaan/15">
              <h2 className="font-heading text-2xl text-charcoal">Your details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="font-semibold text-charcoal">Full name</span>
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-samaan/20 bg-white px-3 py-2 focus:border-scarlet focus:outline-none" />
                </label>
                <label className="text-sm">
                  <span className="font-semibold text-charcoal">Email</span>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-samaan/20 bg-white px-3 py-2 focus:border-scarlet focus:outline-none" />
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-scarlet/30 bg-scarlet/5 p-4 text-sm text-scarlet">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-poui py-3 font-heading text-lg text-charcoal transition hover:brightness-105 disabled:opacity-60"
            >
              {loading ? 'Preparing your order…' : (<><Lock className="h-5 w-5" /> Pay TT${total.toFixed(2)} with Sendana</>)}
            </button>
            <p className="text-center text-xs text-charcoal/50">
              You'll be securely redirected to Sendana to complete payment.
            </p>
          </form>

          <aside className="md:col-span-2">
            <div className="rounded-2xl bg-samaan p-6 text-cream">
              <h2 className="font-heading text-2xl text-poui">Order summary</h2>
              <div className="mt-4 space-y-3">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3">
                    <div className="h-14 w-11 shrink-0 overflow-hidden rounded-md">
                      <Image src={it.cover_image} alt={it.title} className="h-full w-full" fittingType="fill" />
                    </div>
                    <div className="flex-1">
                      <p className="font-heading text-sm leading-tight">{it.title}</p>
                      <p className="text-xs text-cream/70">Qty {it.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold">TT${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-cream/20 pt-4">
                <span className="font-heading text-lg">Total ({count} books)</span>
                <span className="font-heading text-2xl text-poui">TT${total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
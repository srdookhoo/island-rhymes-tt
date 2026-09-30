import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Image } from '@/components/ui/image';

const SERIES_TOTAL = 12;

export default function CartDrawer() {
  const { items, total, count, isOpen, closeCart, remove, setQty } = useCart();
  const navigate = useNavigate();
  if (!isOpen) return null;

  const progress = Math.min(100, (count / SERIES_TOTAL) * 100);
  const left = Math.max(0, SERIES_TOTAL - count);

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-charcoal/50" onClick={closeCart} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <header className="flex items-center justify-between border-b border-samaan/15 p-5">
          <h2 className="font-heading text-2xl text-charcoal">Your Little Library</h2>
          <button onClick={closeCart} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full text-charcoal hover:bg-samaan/10">
            <X className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-samaan/40" />
            <p className="font-heading text-xl text-charcoal">Your library is empty</p>
            <p className="text-charcoal/60">Add a story to begin your collection.</p>
            <button onClick={closeCart} className="mt-2 rounded-full bg-scarlet px-6 py-2 font-semibold text-cream hover:brightness-105">
              Browse the books
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3 rounded-xl bg-white/60 p-3 ring-1 ring-samaan/10">
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image src={it.cover_image} alt={it.title} className="h-full w-full" fittingType="fill" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="font-heading text-base leading-tight text-charcoal">{it.title}</p>
                    <p className="text-sm text-charcoal/60">TT${it.price.toFixed(2)}</p>
                    <div className="mt-auto flex items-center gap-2">
                      <button onClick={() => setQty(it.id, it.quantity - 1)} aria-label="Decrease" className="grid h-7 w-7 place-items-center rounded-full bg-samaan/10 text-charcoal hover:bg-samaan/20"><Minus className="h-4 w-4" /></button>
                      <span className="w-6 text-center text-sm font-semibold">{it.quantity}</span>
                      <button onClick={() => setQty(it.id, it.quantity + 1)} aria-label="Increase" className="grid h-7 w-7 place-items-center rounded-full bg-samaan/10 text-charcoal hover:bg-samaan/20"><Plus className="h-4 w-4" /></button>
                      <button onClick={() => remove(it.id)} aria-label="Remove" className="ml-auto grid h-7 w-7 place-items-center rounded-full text-scarlet hover:bg-scarlet/10"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-samaan/15 p-5">
              <div className="mb-2 flex items-center justify-between text-sm text-charcoal/70">
                <span>Complete the collection</span>
                <span className="font-semibold">{count}/{SERIES_TOTAL} books</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-samaan/15">
                <div className="h-full rounded-full bg-poui transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-1 text-xs text-charcoal/50">
                {left > 0 ? `${left} more to own the whole 12-book series.` : 'You have the complete collection! 🎉'}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-heading text-lg text-charcoal">Subtotal</span>
                <span className="font-heading text-xl text-scarlet">TT${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { closeCart(); navigate('/checkout'); }}
                className="mt-4 w-full rounded-full bg-poui py-3 font-heading text-lg text-charcoal transition hover:brightness-105"
              >
                Checkout with Sendana
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
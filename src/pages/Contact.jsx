import React, { useState } from 'react';
import { Mail, Instagram, Facebook, MapPin, Send } from 'lucide-react';
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Island Rhymes T&T — Message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nReply to: ${form.email}`);
    window.location.href = `mailto:hello@islandrhythmbooks.tt?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-samaan">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 to-samaan" />
        <div className="relative z-10 px-6 py-24 text-center">
          <p className="font-heading text-sm uppercase tracking-[0.4em] text-poui md:text-base">Come Say Hello</p>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-cream md:text-6xl">Contact Island Rhymes T&amp;T</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl text-charcoal">We'd love to hear from you</h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
              Questions about the stories, ideas for new books, or just want to share a rhyme? Reach out — the village is always listening.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-scarlet text-cream"><Mail className="h-5 w-5" /></span>
                <div>
                  <p className="font-heading text-lg text-charcoal">Email</p>
                  <a href="mailto:hello@islandrhythmbooks.tt" className="text-charcoal/70 transition hover:text-scarlet">hello@islandrhythmbooks.tt</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-samaan text-cream"><MapPin className="h-5 w-5" /></span>
                <div>
                  <p className="font-heading text-lg text-charcoal">Where we are</p>
                  <p className="text-charcoal/70">Port of Spain, Trinidad &amp; Tobago</p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <p className="font-heading text-lg text-charcoal">Follow the rhythm</p>
              <div className="mt-3 flex gap-3">
                <a href="#" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-scarlet shadow transition hover:scale-105"><Instagram className="h-5 w-5" /></a>
                <a href="#" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-scarlet shadow transition hover:scale-105"><Facebook className="h-5 w-5" /></a>
                <a href="mailto:hello@islandrhythmbooks.tt" aria-label="Email" className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-scarlet shadow transition hover:scale-105"><Mail className="h-5 w-5" /></a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-samaan/15 bg-card p-8 shadow-sm">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="font-heading text-2xl text-scarlet">Thank you! 🌺</p>
                <p className="mt-3 text-charcoal/75">Your message is ready to send — your email app should have opened. We'll write back soon.</p>
                <button onClick={() => setSent(false)} className="mt-6 rounded-full border border-samaan/30 px-6 py-2 text-charcoal transition hover:bg-samaan/5">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="mb-1 block font-heading text-charcoal">Your name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-samaan/25 bg-cream px-4 py-2.5 focus:border-scarlet focus:outline-none"
                    placeholder="Sandhya Dookhoo"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-heading text-charcoal">Your email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-samaan/25 bg-cream px-4 py-2.5 focus:border-scarlet focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-heading text-charcoal">Your message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-samaan/25 bg-cream px-4 py-2.5 focus:border-scarlet focus:outline-none"
                    placeholder="Tell us what's on your mind…"
                  />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-scarlet px-6 py-3 font-heading text-lg text-cream shadow-lg transition hover:scale-[1.02]">
                  Send message <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
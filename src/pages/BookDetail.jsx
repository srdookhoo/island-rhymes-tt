import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { useReadingHistory } from '@/lib/reading-history-context';
import { ArrowLeft, Volume2, VolumeX, BookOpen, Sparkles } from 'lucide-react';
import EbookLayout from '@/components/EbookLayout';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const { logReading } = useReadingHistory();

  useEffect(() => {
    setBook(null);
    setNotFound(false);
    base44.entities.Book.get(id)
      .then((b) => {
        setBook(b);
        logReading(b);
      })
      .catch(() => setNotFound(true));
  }, [id, logReading]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  function toggleSpeak() {
    if (!window.speechSynthesis || !book) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(book.snippet);
    u.rate = 0.92;
    u.pitch = 1.05;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  }

  if (notFound) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-heading text-3xl text-charcoal">That story has wandered off…</h1>
        <Link to="/" className="rounded-full bg-scarlet px-6 py-2 font-semibold text-cream">Back to the library</Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-samaan/20 border-t-scarlet" />
      </div>
    );
  }

  if (book.ebook_id) {
    return <EbookLayout book={book} />;
  }

  const themes = (book.themes || '').split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <div className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-scarlet">
          <ArrowLeft className="h-4 w-4" /> Back to the library
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {/* Left page (fixed) */}
          <div className="md:sticky md:top-10 md:self-start">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image src={book.cover_image} alt={book.title} className="aspect-[3/4] w-full" fittingType="fill" />
            </div>
            <div className="mt-6 rounded-2xl bg-cream p-6 ring-1 ring-samaan/15">
              <div className="flex items-center justify-between">
                <p className="font-heading text-sm uppercase tracking-wide text-samaan">{book.age_label}</p>
                <span className="rounded-full bg-samaan/10 px-3 py-1 text-xs font-semibold text-samaan">{book.page_count} pages</span>
              </div>
            </div>
          </div>

          {/* Right page (scrolls) */}
          <div className="space-y-10">
            <div>
              <h1 className="font-heading text-4xl text-charcoal md:text-5xl">{book.title}</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                {themes.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-samaan/10 px-3 py-1 text-xs font-semibold text-samaan">
                    <Sparkles className="h-3 w-3" /> {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-heading text-sm uppercase tracking-wide text-poui">The story</p>
              <p className="mt-3 text-lg leading-relaxed text-charcoal/80">{book.description}</p>
            </div>

            {book.story && (
              <div className="rounded-2xl bg-cream p-6 ring-1 ring-samaan/15">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-sm uppercase tracking-wide text-samaan">Full story · for proofreading</p>
                  <span className="rounded-full bg-poui/30 px-3 py-1 text-xs font-semibold text-charcoal/70">Draft</span>
                </div>
                <div className="mt-4 space-y-4">
                  {book.story.split(/\n\n+/).map((para, i) => (
                    <p key={i} className="whitespace-pre-line font-heading text-xl leading-relaxed text-charcoal/85">{para}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl bg-scarlet/5 p-6 ring-1 ring-scarlet/15">
              <p className="font-heading text-sm uppercase tracking-wide text-scarlet">A read-aloud snippet</p>
              <p className="mt-4 font-heading text-2xl leading-relaxed text-charcoal md:text-3xl">“{book.snippet}”</p>
              <button
                onClick={toggleSpeak}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2 text-sm font-semibold text-cream transition hover:bg-charcoal/85"
              >
                {speaking ? <><VolumeX className="h-4 w-4" /> Stop reading</> : <><Volume2 className="h-4 w-4" /> Hear a 30-second clip</>}
              </button>
              <p className="mt-2 text-xs text-charcoal/50">Read aloud in your browser — best with the volume up.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-cream p-5 ring-1 ring-samaan/15">
                <BookOpen className="h-6 w-6 text-samaan" />
                <h3 className="mt-2 font-heading text-xl text-charcoal">Educational themes</h3>
                <p className="mt-1 text-sm text-charcoal/70">{book.themes}</p>
              </div>
              <div className="rounded-2xl bg-cream p-5 ring-1 ring-samaan/15">
                <Sparkles className="h-6 w-6 text-poui" />
                <h3 className="mt-2 font-heading text-xl text-charcoal">Made for</h3>
                <p className="mt-1 text-sm text-charcoal/70">{book.age_label} · {book.page_count} pages of read-aloud rhyme.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
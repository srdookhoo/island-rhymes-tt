import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';

const TONES = {
  samaan: { bg: 'bg-samaan', text: 'text-cream', cta: 'bg-poui text-charcoal' },
  scarlet: { bg: 'bg-scarlet', text: 'text-cream', cta: 'bg-cream text-charcoal' },
  poui: { bg: 'bg-poui', text: 'text-charcoal', cta: 'bg-charcoal text-cream' },
};

export default function PromoBanner({ eyebrow, title, description, ctaLabel, ctaHref, image, tone = 'samaan' }) {
  const t = TONES[tone] || TONES.samaan;

  return (
    <section className="px-6 py-10">
      <div className={`mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-xl ${t.bg} ${t.text}`}>
        <div className={`grid items-center ${image ? 'md:grid-cols-2' : ''}`}>
          {image && (
            <div className="relative min-h-[220px]">
              <Image src={image} alt="" className="absolute inset-0 h-full w-full" fittingType="fill" />
            </div>
          )}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="font-heading text-sm uppercase tracking-[0.3em] opacity-80">{eyebrow}</p>
            <h3 className="mt-3 font-heading text-3xl leading-tight md:text-4xl">{title}</h3>
            <p className="mt-4 text-base opacity-90 md:text-lg">{description}</p>
            {ctaLabel && ctaHref && (
              <Link
                to={ctaHref}
                className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-6 py-2.5 font-heading text-base transition hover:scale-105 ${t.cta}`}
              >
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
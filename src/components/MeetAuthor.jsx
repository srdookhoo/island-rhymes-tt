import React from 'react';
import { Image } from '@/components/ui/image';
import { Feather, Heart, Sparkles } from 'lucide-react';

const PORTRAIT =
  'https://media.base44.com/images/public/6abd0752646018ec90ff9353/21fd1ec38_generated_a6b6c939.png';

const HIGHLIGHTS = [
  { icon: Feather, label: 'Read-aloud verse' },
  { icon: Heart, label: 'West Indian folklore' },
  { icon: Sparkles, label: 'Golden-hour art' },
];

export default function MeetAuthor() {
  return (
    <section id="storyteller" className="bg-cream px-6 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        {/* Portrait */}
        <div className="relative order-1 mx-auto w-full max-w-md md:order-none">
          <div className="overflow-hidden rounded-[2rem] border-4 border-poui/40 shadow-2xl">
            <Image
              src={PORTRAIT}
              alt="Illustrated portrait of Dr. Sandhya Dookhoo writing at her desk"
              className="aspect-[4/5] w-full"
              fittingType="fill"
            />
          </div>
          <div className="float-slow absolute -bottom-5 -right-3 hidden rounded-2xl bg-scarlet px-5 py-3 font-heading text-cream shadow-xl md:block">
            Author &amp; Storyteller
          </div>
        </div>

        {/* Bio */}
        <div>
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-scarlet">
            Meet the Author
          </p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal md:text-5xl">
            Dr. Sandhya Dookhoo
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
            Mum to one amazing boy, Sandhya was inspired to create a children's
            collection worthy of embracing our local treasures and culture. She
            writes the way the beautiful twin islands sound — in colour, in
            harmony and in troves of tropical wonder!
          </p>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
            From the crapaud's first splash to soca in the savannah, every story
            is built on a beat: read-aloud rhymes, West Indian folklore, and art
            painted in the golden hour — so little ones can march, sing and
            dream their way through Trinidad &amp; Tobago.
          </p>
          <p className="mt-5 font-heading text-xl leading-relaxed text-samaan">
            Bring your little ones along for a true T&amp;T adventure!
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {HIGHLIGHTS.map((h) => (
              <span
                key={h.label}
                className="inline-flex items-center gap-2 rounded-full bg-samaan/10 px-4 py-2 text-sm font-medium text-samaan"
              >
                <h.icon className="h-4 w-4" />
                {h.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
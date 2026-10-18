import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollText } from 'lucide-react';

const EFFECTIVE_DATE = '18 October 2026';

function Section({ title, children }) {
  return (
    <section className="scroll-mt-24">
      <h2 className="font-heading text-2xl text-charcoal">{title}</h2>
      <div className="mt-3 space-y-3 text-charcoal/80">{children}</div>
    </section>
  );
}

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-samaan">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-samaan" />
        <div className="relative z-10 px-6 py-20 text-center">
          <ScrollText className="mx-auto h-10 w-10 text-poui" />
          <p className="mt-4 font-heading text-sm uppercase tracking-[0.4em] text-poui">The fine print</p>
          <h1 className="mt-3 font-heading text-4xl text-cream md:text-5xl">Terms of Use</h1>
          <p className="mt-3 text-cream/80">Effective {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-10 text-lg leading-relaxed">
          <p className="rounded-2xl bg-card p-6 text-charcoal/80 ring-1 ring-samaan/15">
            Welcome to Island Rhymes T&amp;T. These Terms of Use govern your use of this app. By creating an account or using the app, you agree to these terms. Please read them carefully.
          </p>

          <Section title="1. Your account">
            <p>You must be an adult to create an account. You are responsible for keeping your password and sign-in details secure and for all activity under your account. If you believe your account has been compromised, <Link to="/contact" className="font-semibold text-scarlet underline">contact us</Link> right away.</p>
          </Section>

          <Section title="2. The stories">
            <p>The stories, illustrations, rhymes, and other content in this app are owned by Island Rhymes T&amp;T and protected by copyright. You may read and enjoy them for personal, non-commercial use. You may not copy, redistribute, modify, or resell the content without our permission.</p>
          </Section>

          <Section title="3. Purchases">
            <p>Some books are available for purchase through Google Play Billing. When you buy a book, Google processes the payment and we grant your account access to that book. Purchases are subject to Google Play&apos;s terms and refund policy. We verify each purchase with Google before access is granted.</p>
          </Section>

          <Section title="4. Acceptable use">
            <p>You agree to use the app lawfully and not to misuse it, attempt to access another user&apos;s data, interfere with the app&apos;s workings, or reverse-engineer it. We may suspend or terminate access if these terms are violated.</p>
          </Section>

          <Section title="5. The app is provided &ldquo;as is&rdquo;">
            <p>We work hard to keep the app running smoothly, but we provide it on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the extent permitted by law, we are not liable for indirect or accidental damages arising from your use of the app.</p>
          </Section>

          <Section title="6. Changes to the app or terms">
            <p>We may update the app, its content, or these terms from time to time. If we make material changes to these terms, we will revise the effective date above. Continued use of the app after changes means you accept the updated terms.</p>
          </Section>

          <Section title="7. Deleting your account">
            <p>You can delete your account at any time from the Settings screen. Deleting your account removes it from our systems; purchased access is managed by Google Play under its own terms.</p>
          </Section>

          <Section title="8. Contact us">
            <p>Questions about these terms? <Link to="/contact" className="font-semibold text-scarlet underline">Get in touch</Link> and we&apos;ll be happy to help.</p>
          </Section>
        </div>

        <div className="mt-12 rounded-2xl border border-samaan/15 bg-card p-6 text-center shadow-sm">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-scarlet px-8 py-3 font-heading text-lg text-cream shadow-lg transition hover:scale-105">
            Back to the library
          </Link>
        </div>
      </section>
    </div>
  );
}
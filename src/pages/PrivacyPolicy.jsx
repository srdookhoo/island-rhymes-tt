import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const EFFECTIVE_DATE = '18 October 2026';

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-heading text-2xl text-charcoal">{title}</h2>
      <div className="mt-3 space-y-3 text-charcoal/80">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-samaan">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-samaan" />
        <div className="relative z-10 px-6 py-20 text-center">
          <Shield className="mx-auto h-10 w-10 text-poui" />
          <p className="mt-4 font-heading text-sm uppercase tracking-[0.4em] text-poui">Your privacy matters</p>
          <h1 className="mt-3 font-heading text-4xl text-cream md:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-cream/80">Effective {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-10 text-lg leading-relaxed">
          <p className="rounded-2xl bg-card p-6 text-charcoal/80 ring-1 ring-samaan/15">
            Island Rhymes T&amp;T (&ldquo;we&rdquo;, &ldquo;us&rdquo;) built this app as a children&apos;s reading library. This policy explains what
            information we collect, how we use it, and the choices you have. By using the app, you agree to the practices described here.
          </p>

          <Section title="1. Information we collect">
            <p><strong>Account information.</strong> When you create an account, we store your email address and an encrypted password. If you sign in with Google, Microsoft, Facebook, or Apple, we receive only the details those providers share with us (such as your email) to sign you in.</p>
            <p><strong>Reading activity.</strong> Your reading history and earned badges are stored locally on your device using your browser&apos;s storage. They are not sent to our servers.</p>
            <p><strong>Purchase information.</strong> When you buy a book, the purchase is processed by Google Play Billing. We receive a purchase token and order identifier from Google so we can grant and verify your access to the purchased book.</p>
            <p><strong>Usage data.</strong> We may collect anonymous analytics about how the app is used (such as which screens are opened) to improve it.</p>
          </Section>

          <Section title="2. How we use information">
            <p>We use your information to: create and manage your account; remember your reading history and badges on your device; grant access to books you purchase; respond to support requests; and improve the app&apos;s content and performance.</p>
          </Section>

          <Section title="3. Children&apos;s privacy">
            <p>This app is intended for young children and their families. We do not knowingly collect personal information directly from children without a parent or guardian&apos;s involvement. Account creation is handled by an adult. If you believe a child has provided us with personal information without parental consent, please <Link to="/contact" className="font-semibold text-scarlet underline">contact us</Link> and we will delete it.</p>
          </Section>

          <Section title="4. How we share information">
            <p>We do not sell your information. We share it only with the service providers that help run the app (such as Google Play Billing for purchases and the sign-in providers listed above), and where required by law. These providers process your data under their own privacy policies.</p>
          </Section>

          <Section title="5. Data retention">
            <p>We keep your account information for as long as your account is active. Reading history and badges are kept on your device until you clear them or delete the app. You can delete your account at any time from the Settings screen, which removes your account from our systems.</p>
          </Section>

          <Section title="6. Your choices">
            <p>You can sign out, clear your local reading history and badges, or delete your account from within the app. You can also manage your device&apos;s storage and sign-in permissions through your device or the relevant provider&apos;s settings.</p>
          </Section>

          <Section title="7. Security">
            <p>We use reasonable measures to protect your information, but no method of transmission or storage is completely secure. Passwords are encrypted and purchase tokens are verified with Google before access is granted.</p>
          </Section>

          <Section title="8. Changes to this policy">
            <p>If we update this policy, we will revise the effective date at the top of this page. We encourage you to review it periodically.</p>
          </Section>

          <Section title="9. Contact us">
            <p>Questions about this policy? <Link to="/contact" className="font-semibold text-scarlet underline">Reach out</Link> and we&apos;ll be happy to help.</p>
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
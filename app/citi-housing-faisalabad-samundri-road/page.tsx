import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Calendar,
  ArrowRight,
  HelpCircle,
  Compass,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Citi Housing Faisalabad Samundri Road — Glow Park, Sports Arena & Prices',
  description:
    'Citi Housing Faisalabad Samundri Road — Glow Park and Sports Arena payment plans, Executive Block and prices, with a live-rate check on WhatsApp.',
  alternates: {
    canonical: 'https://citisproperty.com/citi-housing-faisalabad-samundri-road/',
  },
  openGraph: {
    title: 'Citi Housing Faisalabad Samundri Road — Glow Park, Sports Arena & Prices',
    description:
      'Citi Housing Faisalabad Samundri Road — Glow Park and Sports Arena payment plans, Executive Block and prices, with a live-rate check on WhatsApp.',
    url: 'https://citisproperty.com/citi-housing-faisalabad-samundri-road/',
    siteName: 'citisproperty.com',
    images: ['https://citisproperty.com/logo.png'],
    locale: 'en_PK',
    type: 'website',
  },
};

const samundriFaqList = [
  {
    q: 'Samundri Road or Sargodha Road — which is better?',
    a: 'They are different sides of the same society, with different blocks, prices and payment-plan structures. Samundri Road includes Glow Park, Sports Arena and Executive Block; Sargodha Road holds Phase 1 (blocks A–G) and Phase 2 (blocks AA–EE). Which is better depends on whether the buyer wants a settled resale street, a newer block on instalments, or a lower entry price — compare the live asking range, possession status and payment terms for your size and budget block by block.',
  },
  {
    q: 'What is the Glow Park payment plan?',
    a: 'Glow Park offers structured booking and periodic instalment plans. Booking and down payment percentages, followed by milestone instalments and balance on possession, must be confirmed live in writing for each plot size. Confirm current plan details on WhatsApp.',
  },
  {
    q: 'What is the Sports Arena booking amount?',
    a: 'Sports Arena is a newer sports-themed development sold primarily on payment plans. Down payments and instalment schedules vary by marla size. Contact our dealership on WhatsApp for the verified society breakdown before making any deposit.',
  },
  {
    q: 'Is possession available on Samundri Road?',
    a: 'Possession varies block by block and plot by plot. Selected on-ground sectors have active possession and construction underway, while newer extension bookings are in development stages. Check your exact plot number with our desk.',
  },
  {
    q: 'Can overseas Pakistanis buy on Samundri Road without visiting?',
    a: 'Yes, overseas buyers can acquire plots and booking files via remote documentation, on-site video verification tours, and official society banking channels. We manage the entire verification workflow prior to any transfer.',
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad-samundri-road/#webpage',
      url: 'https://citisproperty.com/citi-housing-faisalabad-samundri-road/',
      name: 'Citi Housing Faisalabad Samundri Road — Glow Park, Sports Arena & Prices',
      description:
        'Citi Housing Faisalabad Samundri Road — Glow Park and Sports Arena payment plans, Executive Block and prices, with a live-rate check on WhatsApp.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://citisproperty.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Citi Housing Faisalabad',
            item: 'https://citisproperty.com/citi-housing-faisalabad/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Samundri Road',
            item: 'https://citisproperty.com/citi-housing-faisalabad-samundri-road/',
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad-samundri-road/#faq',
      mainEntity: samundriFaqList.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ],
};

const samundriBlocks = ['Glow Park', 'Sports Arena', 'Executive Block'];

export default function SamundriRoadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <article className="min-h-screen bg-slate-50 text-slate-800 pb-16">
        {/* Hero Section */}
        <header className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Samundri Road Bypass • Master Sectors</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Samundri Road: Glow Park, Sports Arena, Executive Block and Prices
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore Citi Housing Faisalabad on Samundri Road. Direct comparisons with Sargodha Road, instalment payment structures for Glow Park &amp; Sports Arena, and verified block rates.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-gold-400" />
                <span>Last Updated: 24 November 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Dealership Guide</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Bypass, Samundri Rd, Citi Housing Faisalabad</span>
              </span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Section 1: Samundri Road vs Sargodha Road */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Samundri Road vs Sargodha Road — The Direct Answer
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                This is the first confusion to clear up, because &ldquo;Citi Housing Faisalabad&rdquo; on its own does not say which side of the society a plot is on. Sargodha Road holds Phase 1 (blocks A–G) and Phase 2 (blocks AA–EE). Samundri Road is the other side of the same society, with its own blocks — Glow Park, Sports Arena and Executive Block among them — and its own payment-plan structures. The two sides are not interchangeable: a 5 marla plot on Samundri Road and a 5 marla plot in Phase 1 are different purchases, with different asking ranges, different possession positions and, in several blocks, a different way of paying.
              </p>
              <p>
                Which side is better depends on what the buyer wants, and the honest answer is that neither side wins for everyone. A buyer who wants a settled, older street with houses already lived in will usually start with Phase 1 on Sargodha Road. A buyer who wants a newer block on a payment plan, or is comparing a lower entry price against a newer phase, will usually look at Phase 2 or at the Samundri Road blocks below.
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                This page covers Samundri Road only. For Sargodha Road phases, see{' '}
                <Link href="/citi-housing-faisalabad-phase-1-sargodha-road" className="text-brand-gold-700 font-bold hover:underline">
                  Phase 1 (A–G)
                </Link>
                ,{' '}
                <Link href="/citi-housing-faisalabad-phase-2-sargodha-road" className="text-brand-gold-700 font-bold hover:underline">
                  Phase 2 (AA–EE)
                </Link>
                , the{' '}
                <Link href="/citi-housing-faisalabad-block-rates" className="text-brand-gold-700 font-bold hover:underline">
                  block rates table
                </Link>{' '}
                and the{' '}
                <Link href="/citi-housing-faisalabad" className="text-brand-gold-700 font-bold hover:underline">
                  main hub
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Section 2: Samundri Road Block Rates Table */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Block Rates — Samundri Road
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Asking ranges only — confirm live rate on WhatsApp 0321 8653500 before paying.
                </p>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold self-start sm:self-auto">
                Updated: 24 Nov 2026
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-3.5 font-bold rounded-tl-xl">Block</th>
                    <th className="p-3.5 font-bold">Sizes Available</th>
                    <th className="p-3.5 font-bold">Asking Range</th>
                    <th className="p-3.5 font-bold">Instalment or Resale</th>
                    <th className="p-3.5 font-bold">Possession Status</th>
                    <th className="p-3.5 font-bold rounded-tr-xl">Last Checked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {samundriBlocks.map((b) => (
                    <tr key={b} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{b}</td>
                      <td className="p-3.5 text-slate-600">5M, 7M, 10M, 1K</td>
                      <td className="p-3.5 text-slate-600 font-medium">[FILL LIVE — Confirm on WhatsApp]</td>
                      <td className="p-3.5 text-slate-600">[FILL LIVE — Plan / Resale]</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">[FILL LIVE — Confirm Status]</td>
                      <td className="p-3.5 text-slate-500">24 Nov 2026</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">Samundri Road Asking Ranges by Size:</p>
              <ul className="list-disc pl-5 space-y-1 pt-1">
                <li><strong>5 Marla Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
                <li><strong>7 Marla Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
                <li><strong>10 Marla Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
                <li><strong>1 Kanal Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
              </ul>
            </div>
          </section>

          {/* Section 3: B Block Extension Separate Highlight Box (Brief 4 & 11) */}
          <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                B Block Extension — New Booking, Samundri Road
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p>
                <strong>New Booking Overview:</strong> B Block Extension is a newly launched extension situated on the Samundri Road sector of Citi Housing Faisalabad. Listings report 5 Marla residential plots at an indicative total demand of approximately PKR 42.5 Lakh with an attractive 1.5-year payment plan:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white border border-amber-200">
                  <span className="text-slate-500 text-[11px] font-semibold block">Down Payment</span>
                  <strong className="text-slate-900 text-sm">25% Advance Booking</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-amber-200">
                  <span className="text-slate-500 text-[11px] font-semibold block">Confirmation</span>
                  <strong className="text-slate-900 text-sm">15% after 2 Months</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-amber-200">
                  <span className="text-slate-500 text-[11px] font-semibold block">Balance Instalments</span>
                  <strong className="text-slate-900 text-sm">60% in 18 Months</strong>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-100/70 border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Important Notice:</strong> Commercial terms and booking allocations are subject to official society verification. Confirm live availability and price on WhatsApp before paying any booking token.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Glow Park & Sports Arena Payment Plan Breakdown */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Glow Park Block Payment Plan Structure
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Glow Park is searched frequently for structured payment plans. Never rely on obsolete promotional brochures:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800">
                      <th className="p-2.5 font-bold">Item</th>
                      <th className="p-2.5 font-bold">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-medium">Down Payment</td>
                      <td className="p-2.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">Instalment Schedule</td>
                      <td className="p-2.5 text-slate-600">[FILL LIVE — Periodic Split]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">On Possession Due</td>
                      <td className="p-2.5 text-slate-600">[FILL LIVE — Final Balance]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">Sizes Available</td>
                      <td className="p-2.5 text-slate-600">5M, 7M, 10M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Sports Arena Block Payment Plan Structure
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sports Arena offers modern sports and recreational amenities alongside residential plot options:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800">
                      <th className="p-2.5 font-bold">Item</th>
                      <th className="p-2.5 font-bold">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-medium">Down Payment</td>
                      <td className="p-2.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">Instalment Schedule</td>
                      <td className="p-2.5 text-slate-600">[FILL LIVE — Quarterly Split]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">On Possession Due</td>
                      <td className="p-2.5 text-slate-600">[FILL LIVE — Final Balance]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">Sizes Available</td>
                      <td className="p-2.5 text-slate-600">5M, 7M, 10M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 5: Direct CTA */}
          <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-brand-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-brand-gold-400 uppercase tracking-widest">
                Samundri Road Dealership Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Check Live Rates for Samundri Road Sectors
              </h3>
              <p className="text-xs text-slate-400 max-w-lg">
                Send your inquiry (e.g. &ldquo;Samundri Road, Sports Arena, 5 Marla&rdquo;) on WhatsApp for live asking ranges, full payment plan schedules, and ground verification.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/923218653500?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20Samundri%20Road%20Citi%20Housing%20plots."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 0321 8653500</span>
              </a>
              <a
                href="tel:+923218653500"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-brand-gold-400" />
                <span>Call: 0321 8653500</span>
              </a>
            </div>
          </section>

          {/* Section 6: FAQs */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-gold-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Samundri Road Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {samundriFaqList.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Crawlable NAP Footer Box */}
          <footer className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
            <p className="font-bold text-slate-900">Citi property Real Estate</p>
            <p>
              Address: Bypass, Samundri Rd, Citi Housing Faisalabad, 38000, Pakistan
            </p>
            <p>
              Helpline: <a href="tel:+923218653500" className="text-slate-900 font-semibold hover:underline">0321 8653500</a> | WhatsApp: 0321 8653500 | Email: info@citisproperty.com
            </p>
            <p>Hours: Mon–Sun 10:00 am – 8:00 pm, every day</p>
            <p className="text-[11px] text-slate-500 pt-1">
              Disclaimer: Citi property Real Estate is an independent real estate dealership for Citi Housing Faisalabad.
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}

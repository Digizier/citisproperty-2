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
  Table as TableIcon,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Citi Housing Faisalabad Block Rates — Updated November 2026',
  description:
    'Citi Housing Faisalabad block rates — Phase 1 A–G, Phase 2 AA–EE and Samundri Road blocks in one table, updated monthly, with a live-rate check on WhatsApp.',
  alternates: {
    canonical: 'https://citisproperty.com/citi-housing-faisalabad-block-rates/',
  },
  openGraph: {
    title: 'Citi Housing Faisalabad Block Rates — Updated November 2026',
    description:
      'Citi Housing Faisalabad block rates — Phase 1 A–G, Phase 2 AA–EE and Samundri Road blocks in one table, updated monthly, with a live-rate check on WhatsApp.',
    url: 'https://citisproperty.com/citi-housing-faisalabad-block-rates/',
    siteName: 'citisproperty.com',
    images: ['https://citisproperty.com/logo.png'],
    locale: 'en_PK',
    type: 'website',
  },
};

const blockRatesFaqList = [
  {
    q: 'Why do rates differ by block?',
    a: 'Because blocks differ in development level, possession status, payment terms, and physical street position. An older, settled block with houses lived in, a newer block on instalments, and a block where possession is still developing are fundamentally different purchases even for the same marla size.',
  },
  {
    q: 'Why is the same size cheaper in Phase 2?',
    a: 'Phase 2 is the newer Sargodha Road phase, so for the same size its asking ranges are usually lower than Phase 1 — but the lower entry price often comes with a different possession position, instalment plan structure, or development timeline.',
  },
  {
    q: 'How often are these rates updated?',
    a: 'On the 1st of every month, with the last-updated date changed each cycle. Between monthly updates, ask on WhatsApp for the live rate for your exact block and size before relying on any historical range.',
  },
  {
    q: 'Is the rate in the table the final price?',
    a: 'No. The table displays estimated asking ranges, not fixed prices. The final transacted price depends on the exact plot — its street width, corner status, park facing premium, and society transfer dues.',
  },
  {
    q: 'File or on-ground — which should I buy?',
    a: 'An on-ground plot with possession allows immediate boundary work or construction; a booking file is an allocation whose demarcation and possession occur upon milestone payments. Verify file records and plot numbers before paying.',
  },
  {
    q: 'Can overseas Pakistanis buy using this table?',
    a: 'Yes. Overseas clients use this index to shortlist target blocks and plot sizes, followed by on-site video verification, document authentication, and direct society transfer through bank channels.',
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad-block-rates/#webpage',
      url: 'https://citisproperty.com/citi-housing-faisalabad-block-rates/',
      name: 'Citi Housing Faisalabad Block Rates — Updated November 2026',
      description:
        'Citi Housing Faisalabad block rates — Phase 1 A–G, Phase 2 AA–EE and Samundri Road blocks in one table, updated monthly, with a live-rate check on WhatsApp.',
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
            name: 'Block Rates',
            item: 'https://citisproperty.com/citi-housing-faisalabad-block-rates/',
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad-block-rates/#faq',
      mainEntity: blockRatesFaqList.map((item) => ({
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

const masterBlocks = [
  { block: 'A', phase: 'Phase 1, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Resale (Cash)', status: 'On-Ground / Possession' },
  { block: 'B', phase: 'Phase 1, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Resale (Cash)', status: 'On-Ground / Possession' },
  { block: 'C', phase: 'Phase 1, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Resale (Cash)', status: 'On-Ground / Possession' },
  { block: 'D', phase: 'Phase 1, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Resale (Cash)', status: 'On-Ground / Possession' },
  { block: 'E', phase: 'Phase 1, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Resale (Cash)', status: 'On-Ground / Possession' },
  { block: 'F', phase: 'Phase 1, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Resale (Cash)', status: 'On-Ground / Possession' },
  { block: 'G', phase: 'Phase 1, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Resale (Cash)', status: 'On-Ground / Possession' },
  { block: 'AA', phase: 'Phase 2, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Instalment / Resale', status: 'On-Ground / Developing' },
  { block: 'BB', phase: 'Phase 2, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Instalment / Resale', status: 'On-Ground / Developing' },
  { block: 'CC', phase: 'Phase 2, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Instalment / Resale', status: 'On-Ground / Developing' },
  { block: 'DD', phase: 'Phase 2, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Instalment / Resale', status: 'Developing / Possession Soon' },
  { block: 'EE', phase: 'Phase 2, Sargodha Road', sizes: '5M, 10M, 1K', terms: 'Instalment / Resale', status: 'Developing / Possession Soon' },
  { block: 'Glow Park', phase: 'Samundri Road', sizes: '5M, 7M, 10M', terms: 'Payment Plan / Resale', status: 'On-Ground / Developing' },
  { block: 'Sports Arena', phase: 'Samundri Road', sizes: '5M, 7M, 10M', terms: 'Payment Plan / Resale', status: 'Developing / Active Plan' },
  { block: 'Executive Block', phase: 'Samundri Road', sizes: '5M, 10M, 1K', terms: 'Resale / Plan', status: 'On-Ground / Possession' },
];

export default function CitiHousingBlockRatesPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold-500/20 text-brand-gold-300 border border-brand-gold-500/30 text-xs font-bold uppercase tracking-wider">
              <TableIcon className="w-3.5 h-3.5" />
              <span>Complete Society Rates Index • Monthly Updated</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Citi Housing Faisalabad Block Rates (Updated 24 November 2026)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Every block across Phase 1 (Sargodha Road), Phase 2 (Sargodha Road), and Samundri Road in one single comparison table. Review asking ranges, payment structures, and possession status.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-gold-400" />
                <span>Last Updated: 24 November 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Next Scheduled Update: 1 December 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Citi Housing Faisalabad All Sectors</span>
              </span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Section 1: How to use this table */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              How to Use This Table
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                This is the one page where every Citi Housing Faisalabad block sits in a single table — Phase 1 (blocks A–G, Sargodha Road), Phase 2 (blocks AA–EE, Sargodha Road) and Samundri Road (Glow Park, Sports Arena, and Executive Block). If you already know your block, find its row. If you only know your size and budget, use the by-size table below it, then come back here for the block detail.
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                For detailed block-by-block breakdowns, payment schedules, and transfer procedures, visit our dedicated phase guides:{' '}
                <Link href="/citi-housing-faisalabad-phase-1-sargodha-road" className="text-brand-gold-700 font-bold hover:underline">
                  Phase 1 (Sargodha Road)
                </Link>
                ,{' '}
                <Link href="/citi-housing-faisalabad-phase-2-sargodha-road" className="text-brand-gold-700 font-bold hover:underline">
                  Phase 2 (Sargodha Road)
                </Link>
                ,{' '}
                <Link href="/citi-housing-faisalabad-samundri-road" className="text-brand-gold-700 font-bold hover:underline">
                  Samundri Road Sectors
                </Link>
                , and the{' '}
                <Link href="/citi-housing-faisalabad" className="text-brand-gold-700 font-bold hover:underline">
                  Citi Housing Faisalabad Hub
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Section 2: All Blocks One Table */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-semibold leading-relaxed">
              Asking ranges only, not fixed prices — confirm the live rate on WhatsApp 0321 8653500 before paying. Prices vary by street width, corner position, and possession status.
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-3.5 font-bold rounded-tl-xl">Block</th>
                    <th className="p-3.5 font-bold">Phase / Road</th>
                    <th className="p-3.5 font-bold">Sizes</th>
                    <th className="p-3.5 font-bold">Asking Range</th>
                    <th className="p-3.5 font-bold">Terms</th>
                    <th className="p-3.5 font-bold">Status</th>
                    <th className="p-3.5 font-bold rounded-tr-xl">Last Checked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {masterBlocks.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Block {row.block}</td>
                      <td className="p-3.5 text-slate-600">{row.phase}</td>
                      <td className="p-3.5 text-slate-600">{row.sizes}</td>
                      <td className="p-3.5 text-slate-700 font-medium">[FILL LIVE — Confirm on WhatsApp]</td>
                      <td className="p-3.5 text-slate-600">{row.terms}</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">{row.status}</td>
                      <td className="p-3.5 text-slate-500">24 Nov 2026</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <strong>Extension Spotlight:</strong> B Block Extension is a newly announced booking on Samundri Road. Current market listings indicate 5 Marla residential plots at an asking demand of PKR 42.5 Lakh with a 1.5-year payment schedule:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white border border-amber-200">
                  <span className="text-slate-500 text-[11px] font-semibold block">Advance Booking</span>
                  <strong className="text-slate-900 text-sm">25% Down Payment</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-amber-200">
                  <span className="text-slate-500 text-[11px] font-semibold block">Confirmation</span>
                  <strong className="text-slate-900 text-sm">15% after 2 Months</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-amber-200">
                  <span className="text-slate-500 text-[11px] font-semibold block">Installments</span>
                  <strong className="text-slate-900 text-sm">60% in 18 Months</strong>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-100/70 border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> Commercial terms are subject to final society confirmation. Confirm live availability and price on WhatsApp before making payment.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: By size at a glance */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              By Size — At a Glance
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Use this table to compare the same size across the three areas, then check the exact block row above before deciding anything:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-3.5 font-bold rounded-tl-xl">Size</th>
                    <th className="p-3.5 font-bold">Phase 1 (Sargodha Rd)</th>
                    <th className="p-3.5 font-bold">Phase 2 (Sargodha Rd)</th>
                    <th className="p-3.5 font-bold rounded-tr-xl">Samundri Road</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900">5 Marla Plot</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900">7 Marla Plot</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900">10 Marla Plot</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900">1 Kanal Plot</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE]</td>
                  </tr>
                  <tr className="bg-slate-50 font-semibold">
                    <td className="p-3.5 text-slate-900">Last Checked</td>
                    <td className="p-3.5 text-slate-500">24 Nov 2026</td>
                    <td className="p-3.5 text-slate-500">24 Nov 2026</td>
                    <td className="p-3.5 text-slate-500">24 Nov 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Monthly Update Routine */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Monthly Update Routine
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                This table is updated on the 1st of every month: asking ranges are re-checked against active market inventory, the last-updated date is refreshed, and changes are submitted for re-crawling.
              </p>
              <p>
                Between monthly update dates, asking prices move with market activity. If a row&apos;s last-checked date is more than 30 days old, treat the figure as an indicative baseline and ask on WhatsApp for the real-time live quotation.
              </p>
            </div>
          </section>

          {/* Section 6: Direct CTA */}
          <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-brand-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-brand-gold-400 uppercase tracking-widest">
                Real-Time Block Rates
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Confirm Live Rate for Your Target Block
              </h3>
              <p className="text-xs text-slate-400 max-w-lg">
                Message our desk with your road, block and size on WhatsApp (0321 8653500) for real-time seller asking ranges and ground verification.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/923218653500?text=Assalam-o-Alaikum,%20I%20want%20to%20confirm%20live%20block%20rates%20for%20Citi%20Housing%20Faisalabad."
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

          {/* Section 7: FAQs */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-gold-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Block Rates Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {blockRatesFaqList.map((faq, idx) => (
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

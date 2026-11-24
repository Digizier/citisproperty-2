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
  Building2,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Citi Housing Faisalabad Phase 2 — AA–EE Block Rates & Payment Plan',
  description:
    'Citi Housing Faisalabad Phase 2 block rates AA–EE, instalment vs resale and possession — Sargodha Road, with a live-rate check on WhatsApp.',
  alternates: {
    canonical: 'https://citisproperty.com/citi-housing-faisalabad-phase-2-sargodha-road/',
  },
  openGraph: {
    title: 'Citi Housing Faisalabad Phase 2 — AA–EE Block Rates & Payment Plan',
    description:
      'Citi Housing Faisalabad Phase 2 block rates AA–EE, instalment vs resale and possession — Sargodha Road, with a live-rate check on WhatsApp.',
    url: 'https://citisproperty.com/citi-housing-faisalabad-phase-2-sargodha-road/',
    siteName: 'citisproperty.com',
    images: ['https://citisproperty.com/logo.png'],
    locale: 'en_PK',
    type: 'website',
  },
};

const phase2FaqList = [
  {
    q: 'Is Phase 2 possession available?',
    a: 'It depends on the block — and on the specific plot, not just the block. Some Phase 2 blocks have possession available, others do not yet. Check the possession column in the table, and confirm the position for your exact plot number with the society office before paying.',
  },
  {
    q: 'Instalment or resale — which applies to my block?',
    a: 'It varies block by block in Phase 2. Some blocks are sold on instalments, some as resale between owners, and some have both. Confirm the live position for your specific block, and obtain the full instalment schedule in writing if your plot is on a plan.',
  },
  {
    q: 'Which Phase 2 block is cheapest / best located?',
    a: 'There is no single cheapest or best block for every buyer. A lower asking range usually comes with a different possession position or payment structure, and location value depends on the street, distance to the main road, and nearby development. Compare live rates block by block on WhatsApp.',
  },
  {
    q: 'What is the payment plan for Phase 2?',
    a: 'There is no single Phase 2 payment plan across the board — it depends on the block. Instalment blocks have a booking amount plus periodic instalments; resale blocks are typically cash transactions between owners. Ask for the plan for your exact block in writing.',
  },
  {
    q: 'Phase 1 or Phase 2 — which should I choose?',
    a: 'Phase 1 suits a buyer who wants a settled, developed area and can check one specific resale plot. Phase 2 suits a buyer who is comparing a lower entry price against a newer phase, and is willing to check instalment vs resale terms and possession block by block.',
  },
  {
    q: 'Can overseas Pakistanis buy in Phase 2 without visiting?',
    a: 'Yes, in practice many do — through verification of the file and plot, video tours, power of attorney where required, and bank transfers. We verify the file, instalment ledger, and transfer status before any payment is transferred.',
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad-phase-2-sargodha-road/#webpage',
      url: 'https://citisproperty.com/citi-housing-faisalabad-phase-2-sargodha-road/',
      name: 'Citi Housing Faisalabad Phase 2 — AA–EE Block Rates & Payment Plan',
      description:
        'Citi Housing Faisalabad Phase 2 block rates AA–EE, instalment vs resale and possession — Sargodha Road, with a live-rate check on WhatsApp.',
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
            name: 'Phase 2 Sargodha Road',
            item: 'https://citisproperty.com/citi-housing-faisalabad-phase-2-sargodha-road/',
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad-phase-2-sargodha-road/#faq',
      mainEntity: phase2FaqList.map((item) => ({
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

const blocksAAtoEE = ['AA', 'BB', 'CC', 'DD', 'EE'];

export default function Phase2SargodhaRoadPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Sargodha Road Sector • Blocks AA–EE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Phase 2, Sargodha Road: AA–EE Block Rates and Payment Plan
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Complete guide to Citi Housing Faisalabad Phase 2 on Sargodha Road. Understand block-level rates across AA to EE, instalment vs resale trade-offs, and possession status.
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
                <span>Sargodha Road, Citi Housing Faisalabad</span>
              </span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Section 1: Phase 2 vs Phase 1 */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Phase 2 vs Phase 1 — Maturity vs Appreciation
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                Phase 2 is the newer Sargodha Road phase of Citi Housing Faisalabad, with blocks AA–EE. Phase 1 is the older, more developed phase, where most buying is now resale between owners. Phase 2 is at a different point in that same story: some of its blocks are further along, with houses built and plots on-ground, while others are still at the stage where the right question is not only the price, but whether the block is being sold on instalments, as a resale, and whether possession is available yet.
              </p>
              <p>
                That is the honest difference to keep in mind. A buyer who wants a settled street with houses already lived in will usually compare Phase 2 block by block against Phase 1, rather than choosing on the phase name alone. A buyer comparing prices will usually find Phase 2 cheaper than Phase 1 for the same size — but the cheaper price often comes with a different possession position, a different payment structure, or a longer wait before building.
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                This page covers Phase 2 only — see{' '}
                <Link href="/citi-housing-faisalabad-phase-1-sargodha-road" className="text-brand-gold-700 font-bold hover:underline">
                  Phase 1
                </Link>
                ,{' '}
                <Link href="/citi-housing-faisalabad-samundri-road" className="text-brand-gold-700 font-bold hover:underline">
                  Samundri Road
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

          {/* Section 2: Block Rates AA–EE */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Block Rates AA–EE (Phase 2)
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
                  {blocksAAtoEE.map((b) => (
                    <tr key={b} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Block {b}</td>
                      <td className="p-3.5 text-slate-600">5M, 10M, 1K</td>
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
              <p className="font-bold text-slate-900">Phase 2 Asking Ranges by Size:</p>
              <ul className="list-disc pl-5 space-y-1 pt-1">
                <li><strong>5 Marla Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
                <li><strong>7 Marla Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
                <li><strong>10 Marla Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
                <li><strong>1 Kanal Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
              </ul>
              <p className="pt-2 text-[11px] text-slate-500">
                A lower price in one block does not on its own mean a better buy — check the possession position and the payment terms for that block first.
              </p>
            </div>
          </section>

          {/* Section 3: Instalment or Resale Explained */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Instalment or Resale — Which Applies to My Block?
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                This is the question that decides how a Phase 2 purchase actually works, and the answer changes block by block, so it has to be confirmed for the specific block, not assumed from the phase.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Instalment Plots</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sold on a payment plan — down payment followed by instalments, with possession linked to payment stages. Always request the full schedule in writing, including allocation and possession charges.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Resale Plots</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Plots changing hands between individual owners for cash. Prices depend on the exact block, street, corner position, and whether on-ground with immediate possession or an active file.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Possession Status & Construction */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Possession Status per Block
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Possession determines whether you can take physical control of the plot, initiate boundary construction, or start building your home. When asking about a Phase 2 plot, confirm:
            </p>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 space-y-1.5">
              <li>Is possession available for this exact plot number (not just the block name in general)?</li>
              <li>If not yet, what is the status: file only, plot number allocated, or on-ground development underway?</li>
              <li>What dues, development charges, or society utility fees are required before construction permits are issued?</li>
            </ul>
          </section>

          {/* Section 5: Direct CTA */}
          <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-brand-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-brand-gold-400 uppercase tracking-widest">
                Phase 2 Sargodha Road Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Check Live Asking Rates for Blocks AA–EE
              </h3>
              <p className="text-xs text-slate-400 max-w-lg">
                Message our desk with your block and size (e.g. &ldquo;Phase 2, CC block, 10 Marla&rdquo;) for live asking ranges, instalment options, and possession status.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/923218653500?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20Phase%202%20Sargodha%20Road%20AA-EE%20block%20rates."
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
                Phase 2 Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {phase2FaqList.map((faq, idx) => (
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

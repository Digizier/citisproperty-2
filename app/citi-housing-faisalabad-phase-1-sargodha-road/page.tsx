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
  Building,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Citi Housing Faisalabad Phase 1 (Sargodha Road) — Block Rates & Payment Plan',
  description:
    'Citi Housing Faisalabad Phase 1 block rates A–G, houses and transfer steps — Sargodha Road, with a live-rate check on WhatsApp.',
  alternates: {
    canonical: 'https://citisproperty.com/citi-housing-faisalabad-phase-1-sargodha-road/',
  },
  openGraph: {
    title: 'Citi Housing Faisalabad Phase 1 (Sargodha Road) — Block Rates & Payment Plan',
    description:
      'Citi Housing Faisalabad Phase 1 block rates A–G, houses and transfer steps — Sargodha Road, with a live-rate check on WhatsApp.',
    url: 'https://citisproperty.com/citi-housing-faisalabad-phase-1-sargodha-road/',
    siteName: 'citisproperty.com',
    images: ['https://citisproperty.com/logo.png'],
    locale: 'en_PK',
    type: 'website',
  },
};

const phase1FaqList = [
  {
    q: 'Is Phase 1 fully developed?',
    a: 'Phase 1 is the older and more developed phase, with houses built and lived in across blocks A–G, but "fully developed" still depends on the exact block and street — check the specific plot street, possession and nearby construction rather than relying on the phase name alone.',
  },
  {
    q: 'Which Phase 1 block is best for living vs investment?',
    a: 'For living, buyers usually prioritise a settled street, nearby houses and possession — which varies street by street, not just block by block. For investment, the comparison is the live asking range against the same size in Phase 2 and on Samundri Road, plus whether the plot is on-ground with possession. There is no single "best block" for every buyer; compare the live rate for your exact size and budget on WhatsApp.',
  },
  {
    q: 'What is the transfer fee and timeline?',
    a: 'Transfer fees and schedules are set by the Citi Housing society office and depend on plot size and possession category. Confirm live transfer fee and timeline directly on WhatsApp before completing any transaction.',
  },
  {
    q: 'Is there a payment plan for Phase 1?',
    a: 'No standard developer instalment plan applies to Phase 1 resale plots — most buying here is cash/resale between owners. If a seller offers instalments, confirm the terms, the possession position and the transfer timing in writing before paying anything.',
  },
  {
    q: 'Phase 1 or Phase 2 — which should I choose?',
    a: 'Phase 1 suits a buyer who wants a settled, developed area and can check one specific resale plot. Phase 2 is newer, with blocks AA–EE, and suits a buyer comparing instalment vs resale terms and possession block by block. Compare both detailed guides before deciding on the phase name alone.',
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad-phase-1-sargodha-road/#webpage',
      url: 'https://citisproperty.com/citi-housing-faisalabad-phase-1-sargodha-road/',
      name: 'Citi Housing Faisalabad Phase 1 (Sargodha Road) — Block Rates & Payment Plan',
      description:
        'Citi Housing Faisalabad Phase 1 block rates A–G, houses and transfer steps — Sargodha Road, with a live-rate check on WhatsApp.',
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
            name: 'Phase 1 Sargodha Road',
            item: 'https://citisproperty.com/citi-housing-faisalabad-phase-1-sargodha-road/',
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad-phase-1-sargodha-road/#faq',
      mainEntity: phase1FaqList.map((item) => ({
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

const blocksAtoG = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export default function Phase1SargodhaRoadPage() {
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
              <Building className="w-3.5 h-3.5" />
              <span>Sargodha Road Sector • Established Phase</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Phase 1, Sargodha Road: Block Rates, Houses and Payment Plan
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Detailed guide to Citi Housing Faisalabad Phase 1 across Blocks A to G on Sargodha Road. Review on-ground resale pricing, possession status, houses, and transfer procedures.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-gold-400" />
                <span>Last Updated: 24 November 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Resale Market</span>
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
          {/* Section 1: Phase 1 in One Paragraph */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Phase 1 in One Paragraph
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                Phase 1 is the older, more developed phase of Citi Housing Faisalabad, on Sargodha Road, with blocks A–G. Most buying here is now resale — plots and houses changing hands between owners — rather than fresh bookings from the developer, so there is no standard developer payment plan to quote for Phase 1. That matters for a buyer: the right question is not &ldquo;what is the instalment plan?&rdquo; but &ldquo;what is the asking range for this exact block, street and plot, and is possession available?&rdquo; A 5 marla plot in one block can be priced very differently from a 5 marla plot in another, because of the block, the street, whether the plot is a corner, and whether it is on-ground with possession or still a file.
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                This page covers Phase 1 only. For the newer phase, see the{' '}
                <Link href="/citi-housing-faisalabad-phase-2-sargodha-road" className="text-brand-gold-700 font-bold hover:underline">
                  Phase 2 page
                </Link>
                ; for the other side of the society, see the{' '}
                <Link href="/citi-housing-faisalabad-samundri-road" className="text-brand-gold-700 font-bold hover:underline">
                  Samundri Road page
                </Link>
                ; for all blocks in one place, see the{' '}
                <Link href="/citi-housing-faisalabad-block-rates" className="text-brand-gold-700 font-bold hover:underline">
                  block rates table
                </Link>
                . The main hub is{' '}
                <Link href="/citi-housing-faisalabad" className="text-brand-gold-700 font-bold hover:underline">
                  Citi Housing Faisalabad
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Section 2: Block Rates A–G */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Block Rates A–G (Phase 1)
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
                    <th className="p-3.5 font-bold">Possession Status</th>
                    <th className="p-3.5 font-bold rounded-tr-xl">Last Checked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {blocksAtoG.map((b) => (
                    <tr key={b} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Block {b}</td>
                      <td className="p-3.5 text-slate-600">5M, 10M, 1K</td>
                      <td className="p-3.5 text-slate-600 font-medium">[FILL LIVE — Confirm on WhatsApp]</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">On-Ground / Possession</td>
                      <td className="p-3.5 text-slate-500">24 Nov 2026</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">Phase 1 Resale By Size (Asking Ranges):</p>
              <ul className="list-disc pl-5 space-y-1 pt-1">
                <li><strong>5 Marla Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
                <li><strong>7 Marla Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
                <li><strong>10 Marla Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
                <li><strong>1 Kanal Plot:</strong> [FILL LIVE — Confirm live rate on WhatsApp 0321 8653500]</li>
              </ul>
              <p className="pt-2 text-[11px] text-slate-500">
                No investment return is promised. Past asking prices are not a guarantee of future appreciation.
              </p>
            </div>
          </section>

          {/* Section 3: Houses & Commercial */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Houses and Villas in Phase 1
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Because Phase 1 is the settled phase, houses here are mostly resale houses built by individual owners, not developer-built units on a standard plan. When asking about a house, check: block, street, covered area, construction condition, and whether utility meters (FESCO / Gas) are functional.
              </p>
              <p className="text-xs text-slate-500">
                For houses for rent in Phase 1, availability changes quickly. Contact our desk on WhatsApp with your required size and budget.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Commercial — Main Boulevard &amp; Gold Mark
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Phase 1 commercial property sits primarily along Main Boulevard, including the premier Citi Gold Mark zone. Commercial plots and retail outlets are priced by boulevard frontage, parking width, and corner exposure.
              </p>
              <p className="text-xs text-slate-500">
                Contact our commercial desk with your intended business use for current asking rates and rental yields.
              </p>
            </div>
          </section>

          {/* Section 4: Transfer Procedure Checklist */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Transfer Procedure and Fee Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Transfer in Phase 1 is a resale transfer between the seller and buyer handled through the Citi Housing society office. Steps to follow:
            </p>
            <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-700 space-y-2">
              <li>Confirm the plot and file details with the society office: block, plot number, size, and ensure zero dues are outstanding.</li>
              <li>Verify seller original allotment letters and CNIC documentation.</li>
              <li>Confirm current society transfer fee and tax requirements with the society office on transaction day.</li>
              <li>Complete the biometric transfer and obtain the verified transfer receipt and updated allotment letter.</li>
            </ol>
            <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
              Never pay the full purchase price before the file, demarcated plot number, and society transfer position are physically verified.
            </p>
          </section>

          {/* Section 5: Direct CTA */}
          <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-brand-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-brand-gold-400 uppercase tracking-widest">
                Phase 1 Resale Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Check Live Asking Rates for Blocks A–G
              </h3>
              <p className="text-xs text-slate-400 max-w-lg">
                Send your block and size (e.g. &ldquo;Phase 1, Block C, 10 Marla&rdquo;) on WhatsApp for live asking ranges and ground verification tours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/923218653500?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20Phase%201%20Sargodha%20Road%20plot%20rates."
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
                Phase 1 Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {phase1FaqList.map((faq, idx) => (
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

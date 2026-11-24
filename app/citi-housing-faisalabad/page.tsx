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
  CheckCircle2,
  HelpCircle,
  FileText,
  Building,
  Compass,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Citi Housing Faisalabad — Plots, Prices & Payment Plans 2026',
  description:
    'Citi Housing Faisalabad plots, block rates and payment plans — Phase 1, Phase 2 and Samundri Road, with a live-rate check on WhatsApp.',
  alternates: {
    canonical: 'https://citisproperty.com/citi-housing-faisalabad/',
  },
  openGraph: {
    title: 'Citi Housing Faisalabad — Plots, Prices & Payment Plans 2026',
    description:
      'Citi Housing Faisalabad plots, block rates and payment plans — Phase 1, Phase 2 and Samundri Road, with a live-rate check on WhatsApp.',
    url: 'https://citisproperty.com/citi-housing-faisalabad/',
    siteName: 'citisproperty.com',
    images: ['https://citisproperty.com/logo.png'],
    locale: 'en_PK',
    type: 'website',
  },
};

const faqList = [
  {
    q: 'Which phase is better, Phase 1 or Phase 2?',
    a: 'It depends on what you want. Phase 1 is more developed and mostly resale, so it suits a buyer who wants a settled area and can check one specific plot. Phase 2 is newer, with blocks AA–EE, and suits a buyer comparing instalment vs resale terms and possession block by block. Compare the two detailed pages rather than deciding on the phase name alone.',
  },
  {
    q: 'Samundri Road or Sargodha Road — which is better?',
    a: 'They are different sides of the same society, with different blocks, prices and payment-plan structures. Samundri Road includes Glow Park, Sports Arena and Executive Block; Sargodha Road holds Phase 1 (blocks A–G) and Phase 2 (blocks AA–EE). The Samundri Road page answers this comparison directly, block by block.',
  },
  {
    q: 'Is Citi Housing Faisalabad FDA approved?',
    a: 'Approval and NOC status vary by phase and specific extension. Before paying any token, always verify the exact society registration and planning approvals with the society office or direct dealer records for that specific block.',
  },
  {
    q: 'File or on-ground plot — what is the difference?',
    a: 'A file is an allotment or booking without a specific on-ground plot number yet; an on-ground plot has a demarcated number, a visitable location, and clearer possession and transfer timelines. For overseas buyers especially, confirm which one you are purchasing and get the plot verified on the ground or via video before paying.',
  },
  {
    q: 'Can overseas Pakistanis buy without visiting?',
    a: 'Yes, many overseas Pakistanis purchase remotely through file verification, video tours, power of attorney where required, and direct banking channels. We provide end-to-end video verification and society office documentation before any payment is transferred.',
  },
  {
    q: 'How often are these rates updated?',
    a: 'The block rates table is updated monthly with a fresh last-updated date. Because asking prices move with market activity, always confirm the live rate for your exact plot on WhatsApp before making a financial commitment.',
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad/#webpage',
      url: 'https://citisproperty.com/citi-housing-faisalabad/',
      name: 'Citi Housing Faisalabad — Plots, Prices & Payment Plans 2026',
      description:
        'Citi Housing Faisalabad plots, block rates and payment plans — Phase 1, Phase 2 and Samundri Road, with a live-rate check on WhatsApp.',
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
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://citisproperty.com/citi-housing-faisalabad/#faq',
      mainEntity: faqList.map((item) => ({
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

export default function CitiHousingFaisalabadHubPage() {
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
              <Compass className="w-3.5 h-3.5" />
              <span>Complete Master Guide • 2026 Overview</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Citi Housing Faisalabad: Plots, Blocks, Prices and Payment Plans
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              An at-a-glance guide to Citi Housing Faisalabad across Phase 1 (Sargodha Road), Phase 2 (Sargodha Road), and Samundri Road. Compare asking ranges, possession positions, and payment structures before buying.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-gold-400" />
                <span>Last Updated: 24 November 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Dealer Guide</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Bypass, Samundri Rd &amp; Sargodha Rd, Faisalabad</span>
              </span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Section 1: Overview */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              What is Citi Housing Faisalabad?
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                Citi Housing Faisalabad is a housing society in Faisalabad with plots, houses and commercial property across three main areas: <strong>Phase 1 on Sargodha Road</strong>, <strong>Phase 2 on Sargodha Road</strong>, and the <strong>Samundri Road</strong> side of the society. Buyers in Pakistan and overseas Pakistanis usually start by choosing between these areas — not by choosing a plot size first — because the phase and road decide the price range, the possession position and whether the plot is available on instalments or as a resale.
              </p>
              <p>
                This page is the starting point. It gives an at-a-glance view of prices by size, explains the three areas in one place, and links to a detailed page for each one. The detailed pages carry the block-by-block tables; this page does not repeat them word for word.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Phase 1 (Sargodha Road)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The older, more developed phase (Blocks A–G). Most buying here is resale between owners. Suits buyers wanting a settled neighborhood ready for living.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Phase 2 (Sargodha Road)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The newer Sargodha Road phase (Blocks AA–EE). Some blocks offer instalment terms while others are resale. Check block-specific possession and terms.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Samundri Road</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The distinct third sector with Glow Park, Sports Arena, and Executive Block. Features signature dancing fountains and structured payment plans.
                  </p>
                </div>
              </div>
              <p>
                If you are buying from the UK, UAE, USA or elsewhere abroad, the process involves the same checks: confirming the plot on the ground, verifying file records with developer archives, and ensuring secure transfer procedures before sending funds.
              </p>
            </div>
          </section>

          {/* Section 2: At-a-glance prices by size */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  At-a-Glance Prices by Size
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
                    <th className="p-3.5 font-bold rounded-tl-xl">Size</th>
                    <th className="p-3.5 font-bold">Phase 1 (Sargodha Rd)</th>
                    <th className="p-3.5 font-bold">Phase 2 (Sargodha Rd)</th>
                    <th className="p-3.5 font-bold">Samundri Road</th>
                    <th className="p-3.5 font-bold rounded-tr-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">5 Marla Plot</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-emerald-600 font-semibold">Active Resale / File</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">7 Marla Plot</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-emerald-600 font-semibold">Active Resale / Plan</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">10 Marla Plot</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-emerald-600 font-semibold">Ready Possession / Resale</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">1 Kanal Plot</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-slate-600">[FILL LIVE — Confirm on WhatsApp]</td>
                    <td className="p-3.5 text-emerald-600 font-semibold">Prime / Boulevard</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-1">
              <p className="font-bold">Important Rate Notice:</p>
              <p>
                Prices vary by block, street width, corner position, park face, and possession status. Two plots of the same size in the same phase can be priced differently. No fixed investment returns are guaranteed.
              </p>
            </div>
          </section>

          {/* Section 3: Navigation Hub to Spokes */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Explore Specific Phases &amp; Block Rates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/citi-housing-faisalabad-phase-1-sargodha-road"
                className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-brand-gold-500 transition-all shadow-sm flex items-start justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brand-gold-600 uppercase tracking-wider">
                    Sargodha Road
                  </span>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-gold-700 transition-colors">
                    Phase 1 (Blocks A–G)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Settled phase, resale market, houses, commercial Main Boulevard &amp; Gold Mark.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-gold-600 transition-colors shrink-0 mt-1" />
              </Link>

              <Link
                href="/citi-housing-faisalabad-phase-2-sargodha-road"
                className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-brand-gold-500 transition-all shadow-sm flex items-start justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    Sargodha Road
                  </span>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-gold-700 transition-colors">
                    Phase 2 (Blocks AA–EE)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Instalment vs resale breakdown, block-by-block possession status, and entry prices.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-gold-600 transition-colors shrink-0 mt-1" />
              </Link>

              <Link
                href="/citi-housing-faisalabad-samundri-road"
                className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-brand-gold-500 transition-all shadow-sm flex items-start justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                    Samundri Road Bypass
                  </span>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-gold-700 transition-colors">
                    Samundri Road Sectors
                  </h3>
                  <p className="text-xs text-slate-500">
                    Glow Park, Sports Arena, Executive Block, and new booking extensions.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-gold-600 transition-colors shrink-0 mt-1" />
              </Link>

              <Link
                href="/citi-housing-faisalabad-block-rates"
                className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-brand-gold-500 transition-all shadow-sm flex items-start justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                    Complete Rate Index
                  </span>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-gold-700 transition-colors">
                    Monthly Block Rates Table
                  </h3>
                  <p className="text-xs text-slate-500">
                    Every block across Phase 1, Phase 2, and Samundri Road in one single table.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-gold-600 transition-colors shrink-0 mt-1" />
              </Link>
            </div>
          </section>

          {/* Section 4: How We Verify a File (Brief 5.E.3) */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  How We Verify a File Before Payment
                </h2>
                <p className="text-xs text-slate-500">
                  Step-by-step transparency protocol conducted by Citi property Real Estate.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">1</span>
                  <span>Record Check</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  We check the allotment letter, membership number, and computerized customer ledger directly at the Citi Housing society office to ensure no dues are outstanding.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">2</span>
                  <span>Ground Demarcation</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  For on-ground plots, we physically verify the street, pole number, plot boundary, and road width on-site, providing video footage to overseas buyers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">3</span>
                  <span>Official Transfer</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  All transactions conclude with formal biometric transfer at the developer office, ensuring legitimate title change and updated owner allotment documents.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Location, Distances & Map */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Location, Connectivity &amp; Distances
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Citi Housing Faisalabad has two distinct primary access roads. When visiting or requesting a virtual tour, always specify the road and block:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold block">M-4 Motorway Interchange</span>
                <strong className="text-slate-900 text-sm">Approx. 12–15 mins drive</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold block">Faisalabad Bypass</span>
                <strong className="text-slate-900 text-sm">Direct Access / Frontage</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold block">Chak 234-RB &amp; Samundri Rd</span>
                <strong className="text-slate-900 text-sm">Adjacent Arterial Route</strong>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 bg-slate-100 flex items-center justify-center">
              <iframe
                title="Citi Housing Faisalabad Location Map"
                src="https://maps.google.com/maps?q=31.3325,73.0488&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                aria-label="Google Map showing Citi Housing Faisalabad"
              />
            </div>
          </section>

          {/* Section 6: Direct WhatsApp & Call CTA */}
          <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-brand-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-brand-gold-400 uppercase tracking-widest">
                Check Live Rates on WhatsApp
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Have a specific block or plot size in mind?
              </h3>
              <p className="text-xs text-slate-400 max-w-lg">
                Message our desk with your target area (e.g. &ldquo;Phase 2, CC Block, 10 Marla&rdquo;) for live asking ranges, possession status, and transfer procedures.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/923218653500?text=Assalam-o-Alaikum,%20I%20want%20to%20check%20live%20rates%20for%20Citi%20Housing%20Faisalabad."
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

          {/* Section 7: FAQs with Schema Matching */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-gold-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {faqList.map((faq, idx) => (
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

          {/* Crawlable NAP Footer Box (Brief 4 & 5.A) */}
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
              Disclaimer: Citi property Real Estate is an independent estate agency and property dealer for Citi Housing Faisalabad. Not the developer society office.
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}

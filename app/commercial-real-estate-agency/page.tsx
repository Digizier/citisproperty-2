import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Commercial Real Estate Agency Faisalabad | Property Bank',
  description:
    'Premier commercial real estate agency in Faisalabad. Buy, lease & invest in Citi Gold Mark shops, office plazas & corporate plots. Call +92 321 8653500.',
  alternates: {
    canonical: 'https://citisproperty.com/commercial-real-estate-agency/',
  },
  openGraph: {
    title: 'Commercial Real Estate Agency Faisalabad | Property Bank Real Estate',
    description:
      'Premier commercial real estate agency in Faisalabad. Buy, lease & invest in Citi Gold Mark shops, office plazas & corporate plots. Authorized Citi Housing Dealership.',
    url: 'https://citisproperty.com/commercial-real-estate-agency/',
    siteName: 'citisproperty.com',
    images: ['https://citisproperty.com/logo.png'],
    locale: 'en_PK',
    type: 'website',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': ['RealEstateAgent', 'Service'],
  name: 'Commercial Real Estate Agency — Property Bank Real Estate',
  serviceType: 'Commercial Real Estate Agency',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Property Bank Real Estate Faisalabad',
    telephone: '+92 321 8653500',
    url: 'https://citisproperty.com',
    hasMap: 'https://www.google.com/maps?cid=875368538195546979',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office 11-AA, Main Commercial Market, Citi Housing, Samundri Road',
      addressLocality: 'Faisalabad',
      addressRegion: 'Punjab',
      postalCode: '38000',
      addressCountry: 'PK',
    },
  },
  areaServed: {
    '@type': 'City',
    name: 'Faisalabad',
  },
  description:
    'Full-service commercial real estate agency in Faisalabad specializing in commercial plazas, retail shops in Citi Gold Mark, Main Boulevard corporate plots, and high-yield real estate investments.',
};

export default function CommercialRealEstateAgencyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/30 text-brand-gold-800 text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-4 h-4 text-brand-gold-600" />
          <span>Verified Commercial Advisory • Property Bank Real Estate</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Commercial Real Estate Agency in Faisalabad
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
          As the official authorized dealership for Citi Housing Faisalabad, Property Bank Real Estate delivers premier commercial brokerage, retail acquisitions, and high-yield investment advisory across Sargodha Road and Samundri Road.
        </p>
      </div>

      {/* Key Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Citi Gold Mark &amp; Commercial Hubs</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prime retail shops, shopping plazas, and corporate headquarter plots situated directly on 150ft and 120ft Main Boulevards with massive consumer footfall from thousands of resident families.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">100% Verified Title &amp; Clear Bylaws</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every commercial property undergoes direct verification with Citi Housing Head Office records to ensure full compliance with commercial building heights, approved maps, and zero encumbrances.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">High Rental Yields &amp; Capital Gains</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Enjoy steady 7%–10% annual rental returns with long-term multinational bank leases, pharmaceutical brands, fashion retail outlets, and premier corporate offices in Faisalabad.
          </p>
        </div>
      </div>

      {/* Detailed Agency Services */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Comprehensive Commercial Brokerage Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Whether you are expanding a corporate brand or investing capital for consistent monthly rental dividends, our senior property consultants offer tailored guidance:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Retail Plaza &amp; Shop Acquisitions
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Assisting national brands and private investors in buying on-ground commercial shops in Citi Gold Mark, Phase 1 Sargodha Road, and Phase 2 Samundri Road.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Corporate Land &amp; Plot Verification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              4 Marla, 8 Marla, and 1 Kanal commercial plots suitable for multi-storey business centers, corporate offices, banks, and private hospitals with approved utility connections.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Commercial Lease Negotiations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Structuring binding, legally compliant commercial tenancy agreements with structured annual rent escalations and security deposit guarantees.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Overseas Commercial Investor Desk
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Complete Power of Attorney assistance, live site video tours, biometric clearance guidance, and direct banking transfers for expatriate Pakistanis.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Ready to Invest in Faisalabad Commercial Property?
            </div>
            <div className="text-lg sm:text-xl font-black">
              Consult with Property Bank Real Estate Commercial Desk
            </div>
            <p className="text-xs text-slate-400">
              Open 24/7 • Office 11-AA, Main Commercial Market, Citi Housing Faisalabad
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/923218653500?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20Commercial%20Real%20Estate%20in%20Faisalabad."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Commercial Real Estate Agency on WhatsApp"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
            <a
              href="tel:+923218653500"
              aria-label="Call Commercial Real Estate Agency at +92 321 8653500"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +92 321 8653500</span>
            </a>
            <Link
              href="/Commercial/Faisalabad"
              prefetch={false}
              aria-label="View commercial property listings in Faisalabad"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
            >
              <span>View Commercial Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

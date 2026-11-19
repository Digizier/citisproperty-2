import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Factory,
  ShieldCheck,
  TrendingUp,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Truck,
  HardHat,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industrial Real Estate Agency Faisalabad | Citi property Real Estate',
  description:
    'Industrial real estate agency in Faisalabad. Industrial plots, logistics warehousing & factory sites near M-3, Bypass & Citi Housing. Call +92 321 8653500.',
  alternates: {
    canonical: 'https://citisproperty.com/industrial-real-estate-agency/',
  },
  openGraph: {
    title: 'Industrial Real Estate Agency Faisalabad | Citi property Real Estate',
    description:
      'Industrial real estate agency in Faisalabad. Industrial plots, logistics warehousing & factory sites near M-3, Bypass & Citi Housing. Call +92 321 8653500.',
    url: 'https://citisproperty.com/industrial-real-estate-agency/',
    siteName: 'citisproperty.com',
    images: ['https://citisproperty.com/logo.png'],
    locale: 'en_PK',
    type: 'website',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': ['RealEstateAgent', 'Service'],
  name: 'Industrial Real Estate Agency — Citi property Real Estate',
  serviceType: 'Industrial Real Estate Agency',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Citi property Real Estate',
    telephone: '+92 321 8653500',
    url: 'https://citisproperty.com',
    hasMap: 'https://share.google/Clziqy6RnKzN8niRl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Citi Housing samundri Road, Bypass',
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
    'Specialized industrial real estate agency in Faisalabad offering verified industrial land, warehousing depots, factory spaces, and logistics corridors near M-3 Industrial City, Sahianwala, and Sargodha Road.',
};

export default function IndustrialRealEstateAgencyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/30 text-brand-gold-800 text-xs font-bold uppercase tracking-wider">
          <Factory className="w-4 h-4 text-brand-gold-600" />
          <span>Industrial Land &amp; Warehousing Advisory • Faisalabad</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Industrial Real Estate Agency in Faisalabad
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
          Faisalabad is the undisputed industrial powerhouse and textile capital of Pakistan. Citi property Real Estate provides corporate investors, manufacturers, and logistics operators with verified industrial land, warehousing facilities, and factory sites across major industrial corridors.
        </p>
      </div>

      {/* Key Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">High-Speed Motorway Connectivity</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Industrial sites positioned along Sargodha Road, M-3 Motorway (Pindi Bhattian–Faisalabad), and Sahianwala Industrial interchange, enabling swift freight transit to Karachi Port and northern distribution hubs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Legal Zoning &amp; Environmental Clearances</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Full compliance advisory covering industrial zoning bylaws, FDA / FIEDMC land regulations, EPA approvals, and verified ownership land fard records without boundary disputes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <HardHat className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Industrial Infrastructure Ready</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dedicated feeder power load facilitation, industrial gas supply access, wide 100ft+ container access roads, and secure perimeter fencing for factories and distribution hubs.
          </p>
        </div>
      </div>

      {/* Detailed Services */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Specialized Industrial Property Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From greenfield land acquisition to turnkey logistics sheds, Citi property Real Estate connects manufacturing enterprises with prime industrial real estate:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Industrial Plots (1 Acre to 25+ Acres)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Sourcing large industrial acreage in Faisalabad industrial clusters, textile processing parks, and Special Economic Zones (SEZ) with tax incentive eligibility.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Logistics Warehousing &amp; Cold Storage
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Covered storage sheds, high-ceiling modern pre-engineered steel buildings (PEB), and FMCG transit hubs with trailer docking bays and heavy flooring.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Textile Unit &amp; Factory Sale / Purchase
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Facilitating confidential transactions for operating weaving, spinning, garment processing, and packaging facilities with full plant and title verification.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Industrial Lease &amp; Built-to-Suit Contracts
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Representing corporate tenants and warehouse owners in long-term lease structuring, standardizing maintenance clauses, escalation rates, and dispute resolution terms.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Looking for Industrial Land or Warehousing in Faisalabad?
            </div>
            <div className="text-lg sm:text-xl font-black">
              Connect with Citi property Real Estate Industrial Division
            </div>
            <p className="text-xs text-slate-400">
              Open 24 Hours • Citi Housing samundri Road, Bypass, Faisalabad
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/923218653500?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20Industrial%20Real%20Estate%20in%20Faisalabad."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Industrial Real Estate Agency on WhatsApp"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
            <a
              href="tel:+923218653500"
              aria-label="Call Industrial Real Estate Agency at +92 321 8653500"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +92 321 8653500</span>
            </a>
            <Link
              href="/contact"
              prefetch={false}
              aria-label="Schedule a site visit with Citi property Real Estate"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
            >
              <span>Schedule Site Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

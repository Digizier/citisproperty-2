import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Building,
  KeyRound,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
  UserCheck,
  Wallet,
  Wrench,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Management Company Faisalabad | Citi property Real Estate',
  description:
    'Trusted property management company in Faisalabad. Comprehensive tenant screening, rent collection, maintenance & overseas owner care. Call +92 321 8653500.',
  alternates: {
    canonical: 'https://citisproperty.com/property-management/',
  },
  openGraph: {
    title: 'Property Management Company Faisalabad | Citi property Real Estate',
    description:
      'Trusted property management company in Faisalabad. Comprehensive tenant screening, rent collection, maintenance & overseas owner care at Citi Housing Samundri Road Bypass.',
    url: 'https://citisproperty.com/property-management/',
    siteName: 'citisproperty.com',
    images: ['https://citisproperty.com/logo.png'],
    locale: 'en_PK',
    type: 'website',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': ['RealEstateAgent', 'Service'],
  name: 'Property Management Company — Citi property Real Estate',
  serviceType: 'Property Management Company',
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
    'Professional property management company in Faisalabad specializing in full-cycle rental property management, tenant verification, rent collection, maintenance, and dedicated overseas landlord care in Citi Housing.',
};

export default function PropertyManagementPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/30 text-brand-gold-800 text-xs font-bold uppercase tracking-wider">
          <KeyRound className="w-4 h-4 text-brand-gold-600" />
          <span>Full-Cycle Property Care &amp; Overseas Landlord Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Property Management Company in Faisalabad
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
          Owning residential or commercial properties in Citi Housing Faisalabad should provide passive income, not daily headaches. Citi property Real Estate delivers turnkey property management for overseas Pakistanis and resident landlords, safeguarding your assets with complete transparency.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Rigorous Tenant Vetting</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-stage screening including CNIC verification, employment checks, family references, and previous tenancy history to place reliable, respectful occupants.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Wallet className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Guaranteed Rent Collection</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automated direct bank deposits to your domestic or international account by the 5th of each month, with itemized digital statements and zero delayed collections.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Wrench className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Routine Maintenance &amp; Repairs</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Trusted on-call technicians for plumbing, electrical, HVAC, and painting work. Pre-approved cost estimates with zero hidden markups or unauthorized repair bills.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Quarterly Video Inspections</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Scheduled in-person walkthroughs with high-definition video walkthrough reports sent directly via WhatsApp, keeping overseas owners informed of structural upkeep.
          </p>
        </div>
      </div>

      {/* In-Depth Management Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How Our Property Management Program Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We handle every operational detail from the initial lease signing to eventual tenant exit and security deposit settlement:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Legal Stamp Lease Drafting
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Lawyer-vetted tenancy contracts on government stamp paper containing explicit maintenance obligations, mandatory 10% annual rent escalations, and biometric verification.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Utility Bill &amp; Society Maintenance Clearing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Ensuring electricity (FESCO), Sui Gas, water, and Citi Housing society maintenance charges are fully cleared every billing cycle with digital receipt archives.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Overseas Landlord Representation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Acting as your authorized local representative for society office transfers, tenant dispute resolution, police verification filings, and building alterations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Move-In &amp; Move-Out Inventory Audits
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Detailed photographic inventory of all fixtures, designer sanitary fittings, woodwork, and appliances before and after tenancy to prevent property degradation.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Protect Your Property &amp; Maximize Rental Yields
            </div>
            <div className="text-lg sm:text-xl font-black">
              Enroll Your Faisalabad Property with Citi property Real Estate
            </div>
            <p className="text-xs text-slate-400">
              Mon–Sun 10:00 am – 8:00 pm • Bypass, Samundri Rd, Citi Housing Faisalabad
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/923218653500?text=Assalam-o-Alaikum,%20I%20want%20to%20enroll%20my%20property%20for%20Property%20Management%20in%20Faisalabad."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enroll property on WhatsApp"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us Now</span>
            </a>
            <a
              href="tel:+923218653500"
              aria-label="Call Property Management Desk at +92 321 8653500"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +92 321 8653500</span>
            </a>
            <Link
              href="/Rentals/Faisalabad"
              prefetch={false}
              aria-label="View active rental listings in Faisalabad"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
            >
              <span>Explore Rental Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

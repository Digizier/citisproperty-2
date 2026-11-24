import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  ShieldCheck,
  TrendingUp,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Key,
  Building,
  Bed,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Real Estate Rental Agency Faisalabad | Citi property Real Estate',
  description:
    'Real estate rental agency in Faisalabad. Furnished luxury villas, houses & commercial shops for rent in Citi Housing. Contact us at +92 321 8653500.',
  alternates: {
    canonical: 'https://citisproperty.com/real-estate-rental-agency/',
  },
  openGraph: {
    title: 'Real Estate Rental Agency Faisalabad | Citi property Real Estate',
    description:
      'Real estate rental agency in Faisalabad. Furnished luxury villas, houses & commercial shops for rent in Citi Housing Samundri Road Bypass.',
    url: 'https://citisproperty.com/real-estate-rental-agency/',
    siteName: 'citisproperty.com',
    images: ['https://citisproperty.com/logo.png'],
    locale: 'en_PK',
    type: 'website',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': ['RealEstateAgent', 'Service'],
  name: 'Real Estate Rental Agency — Citi property Real Estate',
  serviceType: 'Real Estate Rental Agency',
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
    'Leading real estate rental agency in Faisalabad specializing in luxury residential house rentals, furnished family villas, ground & upper portions, and commercial shop leases in Citi Housing.',
};

export default function RealEstateRentalAgencyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/30 text-brand-gold-800 text-xs font-bold uppercase tracking-wider">
          <Key className="w-4 h-4 text-brand-gold-600" />
          <span>Verified Rentals &amp; Tenancy Advisory • Citi Housing Faisalabad</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Real Estate Rental Agency in Faisalabad
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
          Looking for a luxury house, furnished villa, or prime commercial shop for rent in Faisalabad? Citi property Real Estate is your trusted rental advisory partner, providing 100% verified properties with transparent rental agreements across Citi Housing Phase 1 (Sargodha Road) and Phase 2 (Samundri Road Bypass).
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Home className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">5M, 10M &amp; 1K Luxury Ready Villas</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Move directly into newly constructed designer houses featuring imported tile flooring, master en-suite bedrooms, luxury kitchens, powder rooms, and servant quarters.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Elite Gated Security &amp; Utilities</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Continuous armed gated security, underground electricity network, purified water filtration plants, landscaped theme parks, and Beaconhouse/Roots school campuses right inside the society.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Transparent &amp; Fair Rental Rates</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct coordination between verified landlords and prospective tenants without artificial broker inflations, hidden agency fees, or arbitrary rent hikes.
          </p>
        </div>
      </div>

      {/* Rental Options & Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Popular Rental Categories in Citi Housing Faisalabad
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We cater to families, corporate executives, doctors, and overseas visitors with tailored rental housing options:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Complete Designer Houses (5 Marla, 10 Marla, 1 Kanal)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Ideal for private executive living with dual electricity meters, independent water filtration, double car porches, and roof terrace access.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Independent Portions (Ground &amp; Upper Floors)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Affordable luxury living for small families and professionals, featuring separate utility sub-meters, private entrance gates, and dedicated car parking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Fully Furnished Luxury Accommodations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Turnkey furnished villas with modern LED TVs, inverter air conditioners, refrigerator, sofa sets, beds, and high-speed fiber internet for short or long-term stays.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Commercial Shops &amp; Office Space Rentals
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Ready commercial retail outlets on Main Commercial Market Samundri Road and Citi Gold Mark Sargodha Road for boutiques, clinics, corporate offices, and cafes.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Find Your Ideal Rental Home in Faisalabad
            </div>
            <div className="text-lg sm:text-xl font-black">
              Connect with Citi property Real Estate Rental Desk
            </div>
            <p className="text-xs text-slate-400">
              Mon–Sun 10:00 am – 8:00 pm • Bypass, Samundri Rd, Citi Housing Faisalabad
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/923218653500?text=Assalam-o-Alaikum,%20I%20am%20looking%20for%20a%20property%20for%20rent%20in%20Citi%20Housing%20Faisalabad."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Rental Agency on WhatsApp"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
            <a
              href="tel:+923218653500"
              aria-label="Call Rental Agency at +92 321 8653500"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +92 321 8653500</span>
            </a>
            <Link
              href="/Rentals/Faisalabad"
              prefetch={false}
              aria-label="View all rental properties in Faisalabad"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
            >
              <span>View Rental Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

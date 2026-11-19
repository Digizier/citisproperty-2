import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, ShieldCheck, Users, Building, Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Citi property Real Estate Faisalabad',
  description:
    'Established on 7 February 2018, Citi property Real Estate has been serving Faisalabad’s property market, providing professional real estate guidance for residential plots, commercial properties, and luxury homes.',
  alternates: {
    canonical: 'https://citisproperty.com/about/',
  },
  openGraph: {
    title: 'About Us — Citi property Real Estate Faisalabad',
    description:
      'Established on 7 February 2018, Citi property Real Estate has been serving Faisalabad’s property market, providing professional real estate guidance for residential plots, commercial properties, and luxury homes.',
    url: 'https://citisproperty.com/about/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest">
          Who We Are
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About Citi property Real Estate Faisalabad
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Serving Faisalabad’s property market since 2018 with transparent guidance for buyers, sellers, landlords, and investors.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900">
              Transforming Real Estate with Trust &amp; Transparency Since 2018
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Citi property Real Estate has been serving Faisalabad’s property market since 7 February 2018, providing professional real estate guidance for sellers, investors, landlords, and businesses. Located at Citi Housing Samundri Road Bypass, we deal in commercial, rental, and investment properties with local market knowledge and practical assistance throughout the property process.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our team specializes in Citi Housing Faisalabad, including Blocks A, B, C, D, E, F, and G, as well as prime localities across Samundri Road, Sargodha Road, and Faisalabad. Whether you are looking for property for sale, property for rent, residential plots (5 Marla, 10 Marla, 1 Kanal), luxury houses, or commercial investment opportunities, our licensed advisors guarantee 100% legal verification and direct transfers with developer records.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 shadow-md">
            <img
              src="/images/sargodha-road.webp"
              alt="Citi Housing Luxury Living"
              width={800}
              height={450}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">100% Verified Titles</h3>
            <p className="text-xs text-slate-500">
              Direct verification from Citi Housing Head Office before any financial token.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <Users className="w-6 h-6 text-brand-gold-600" />
            <h3 className="font-bold text-sm text-slate-900">5,000+ Happy Families</h3>
            <p className="text-xs text-slate-500">
              Trusted by thousands of residents and overseas investors worldwide.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <Building className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Multi-City Network</h3>
            <p className="text-xs text-slate-500">
              Active footprints spanning Faisalabad, Gujranwala, Sialkot, and Jhelum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

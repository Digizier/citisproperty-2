import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Compass, Building, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Area Guides & Society Reviews — Citi Housing | Property Bank',
  description:
    'Comprehensive area guides for Citi Housing Faisalabad (Sargodha & Samundri Road), Gujranwala, Sialkot, and Jhelum. Location analysis, amenities, and investment trends.',
  alternates: {
    canonical: 'https://citisproperty.com/area-guides/',
  },
  openGraph: {
    title: 'Area Guides & Society Reviews — Citi Housing | Property Bank',
    description:
      'Comprehensive area guides for Citi Housing Faisalabad (Sargodha & Samundri Road), Gujranwala, Sialkot, and Jhelum.',
    url: 'https://citisproperty.com/area-guides/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function AreaGuidesPage() {
  const guides = [
    {
      title: 'Citi Housing Faisalabad (Sargodha Road)',
      location: 'Sargodha Road, Faisalabad',
      description: 'The golden standard of luxury living in Faisalabad. Features Citi Gold Mark, central shopping boulevard, luxury hospital, and world-class schools.',
      highlights: ['Citi Gold Mark Commercial', 'Central Theme Park', 'Opera Cinema', 'Roots Millennium Campus'],
      link: '/Homes/Faisalabad',
    },
    {
      title: 'Citi Housing Faisalabad (Samundri Road)',
      location: 'Samundri Road, Faisalabad',
      description: 'Modern development with high-speed bypass connectivity. Rapidly expanding with ready on-ground plots and direct possession.',
      highlights: ['Dancing Fountain', 'Dancing Fountain Park', 'Main Boulevard Commercial', '24/7 Gated Security'],
      link: '/Plots/Faisalabad',
    },
    {
      title: 'Citi Housing Gujranwala',
      location: 'GT Road / M-11 Access, Gujranwala',
      description: 'Premier destination for overseas Pakistanis in Gujranwala with lush green parks, lake, and modern utilities.',
      highlights: ['Theme Park & Zoo', 'Citi Medicare Hospital', 'Commercial Bank Avenue', 'Lakeside Jogging Track'],
      link: '/Homes/Gujranwala',
    },
    {
      title: 'Citi Housing Sialkot',
      location: 'Airport Road, Sialkot',
      description: 'Exclusive gated community providing world-class infrastructure to Sialkot industrial exporters and families.',
      highlights: ['Near International Airport', 'Central Jamia Mosque', 'Community Club', 'Wide Carpeted Roads'],
      link: '/Plots/Sialkot',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Society & Area Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          In-depth reviews, amenities breakdown, school locations, and price trends across Citi Housing master communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((g, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-brand-gold-700">
              <MapPin className="w-4 h-4 text-brand-gold-600" />
              <span>{g.location}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">{g.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Prominent Facilities:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                {g.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <Link
                href={g.link}
                prefetch={false}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold-700 hover:text-brand-gold-800"
              >
                <span>View Available Listings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

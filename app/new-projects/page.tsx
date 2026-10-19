import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, MapPin, CheckCircle2, ArrowRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'New Projects & Phases — Citi Housing Developments | citisproperty.com',
  description:
    'Discover upcoming and ongoing residential and commercial developments in Citi Housing Faisalabad (Sargodha & Samundri Road), Gujranwala, Sialkot, and Jhelum.',
  alternates: {
    canonical: 'https://citisproperty.com/new-projects/',
  },
  openGraph: {
    title: 'New Projects & Phases — Citi Housing Developments | citisproperty.com',
    description:
      'Discover upcoming and ongoing residential and commercial developments in Citi Housing Faisalabad (Sargodha & Samundri Road), Gujranwala, Sialkot, and Jhelum.',
    url: 'https://citisproperty.com/new-projects/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function NewProjectsPage() {
  const projects = [
    {
      id: 'ch-fsd-sargodha',
      name: 'Citi Housing Faisalabad — Phase 1 (Sargodha Road)',
      city: 'Faisalabad',
      tagline: 'The Pioneer of Luxury Living in Manchester of Pakistan',
      status: 'Fully Operational & Inhabited',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      features: [
        'Citi Gold Mark Commercial Center',
        'Opera 3D Cinema & Theme Park',
        'Underground Electrification & Sui Gas',
        'Beaconhouse & Roots School Campuses',
      ],
      plots: '5 Marla, 10 Marla, 1 Kanal, 2 Kanal',
      exploreUrl: '/Homes/Faisalabad',
    },
    {
      id: 'ch-fsd-samundri',
      name: 'Citi Housing Faisalabad — Phase 2 (Samundri Road)',
      city: 'Faisalabad',
      tagline: 'Modern Architectural Masterpiece with Musical Dancing Fountain',
      status: 'Possession Awarded & Active Construction',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop',
      features: [
        'Musical Dancing Fountain',
        'Central Jamia Mosque',
        'Wide 150ft Main Boulevard',
        'Eiffel Tower Replica & Food Arena',
      ],
      plots: '5 Marla, 10 Marla, 1 Kanal Plots & Villas',
      exploreUrl: '/Plots/Faisalabad',
    },
    {
      id: 'ch-gujranwala',
      name: 'Citi Housing Gujranwala — Phase 1 & 2',
      city: 'Gujranwala',
      tagline: 'State-of-the-Art Gated Community along GT Road',
      status: 'Ready Possession',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
      features: [
        'M-11 Motorway Access',
        'Citi Medicare Hospital',
        'Lakeside Park & Zoo',
        'International Standard Gymnasium',
      ],
      plots: '5 Marla to 2 Kanal Luxury Villas',
      exploreUrl: '/Homes/Gujranwala',
    },
    {
      id: 'ch-sialkot',
      name: 'Citi Housing Sialkot',
      city: 'Sialkot',
      tagline: 'Premier Residential Community for the Export Capital',
      status: 'Rapidly Growing Community',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop',
      features: [
        'Close to Sialkot International Airport',
        'Modern Sewerage & Solar Streetlights',
        'Commercial Banking Avenue',
        'Family Theme Park',
      ],
      plots: '5M, 10M, 1K Residential Plots',
      exploreUrl: '/Plots/Sialkot',
    },
    {
      id: 'ch-jhelum',
      name: 'Citi Housing Jhelum',
      city: 'Jhelum',
      tagline: 'Scenic Living along the Banks of River Jhelum',
      status: 'Prime Lifestyle Destination',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop',
      features: [
        'Scenic River View & Clean Air',
        'Underground Utilities',
        'Horse Riding Club & Sports Complex',
        'Civic Center Shopping Malls',
      ],
      plots: 'Residential Plots & Commercial Outlets',
      exploreUrl: '/Commercial/Jhelum',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest">
          Developer Portfolio
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          New Projects & Master Developments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Discover Citi Housing's signature master-planned developments across Punjab. Property Bank Real Estate provides official allotment bookings and direct transfers.
        </p>
      </div>

      <div className="space-y-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-5 relative h-64 lg:h-auto bg-slate-900">
              <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-gradient-to-r from-brand-gold-600 to-amber-600 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-md">
                {proj.status}
              </span>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-brand-gold-600 font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{proj.city}, Punjab</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {proj.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                  {proj.tagline}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Key Project Infrastructure:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {proj.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 font-semibold">
                  <span className="text-slate-400">Available Sizes: </span>
                  {proj.plots}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <a
                  href="tel:03218653500"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold-700 hover:text-brand-gold-800"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Project Desk: 0321-8653500</span>
                </a>

                <Link
                  href={proj.exploreUrl}
                  prefetch={false}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow"
                >
                  <span>Explore Listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

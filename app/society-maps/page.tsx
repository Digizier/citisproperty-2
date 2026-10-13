import React from 'react';
import Link from 'next/link';
import { Map, Download, Eye, MapPin, ExternalLink } from 'lucide-react';

export default function SocietyMapsPage() {
  const maps = [
    {
      id: 'map-fsd-phase1',
      title: 'Citi Housing Faisalabad — Phase 1 (Sargodha Road) Master Plan',
      sectors: 'Block A, Block B, Block C, Gold Mark Commercial',
      image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'map-fsd-phase2',
      title: 'Citi Housing Faisalabad — Phase 2 (Samundri Road) Master Plan',
      sectors: 'Block A, Block B, Block C, Civic Center',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'map-gujranwala',
      title: 'Citi Housing Gujranwala — Phase 1 & 2 Master Layout',
      sectors: 'Blocks A to H, Theme Park Sector',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'map-sialkot',
      title: 'Citi Housing Sialkot — Master Sector Plan',
      sectors: 'Executive Block, Prime Commercial',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Society Master Maps & Layouts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          High-definition sector maps, block boundaries, and plot number layouts for Citi Housing projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {maps.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 p-5"
          >
            <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-900">
              <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  {m.sectors}
                </span>
              </div>
            </div>

            <div>
              <h2 className="font-extrabold text-base text-slate-900 leading-snug">{m.title}</h2>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <a
                href={m.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green-700 hover:text-brand-green-800"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Map</span>
              </a>

              <a
                href="tel:03218653500"
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                Request Sector Map PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

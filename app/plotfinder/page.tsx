import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, MapPin, Search, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plot Finder & Sector Locator — Citi Housing | Property Bank',
  description:
    'Pinpoint exact 5 Marla, 10 Marla & 1 Kanal plot locations by Block, Street, and Sector in Citi Housing Faisalabad, Gujranwala, Sialkot, and Jhelum.',
  alternates: {
    canonical: 'https://citisproperty.com/plotfinder/',
  },
  openGraph: {
    title: 'Plot Finder & Sector Locator — Citi Housing | Property Bank',
    description:
      'Pinpoint exact 5 Marla, 10 Marla & 1 Kanal plot locations by Block, Street, and Sector in Citi Housing.',
    url: 'https://citisproperty.com/plotfinder/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function PlotFinderPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-gold-50 text-brand-gold-800 border border-brand-gold-200/80 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-brand-gold-600" />
          <span>Interactive Plot Locator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Plot Finder — Citi Housing
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Search plot locations by Block, Street, and Sector in Citi Housing Faisalabad, Gujranwala, Sialkot, and Jhelum.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Need to pinpoint the exact location of a 5 Marla, 10 Marla, or 1 Kanal plot in Citi Housing? Contact our on-ground surveying desk directly with your plot number for an exact GPS coordinate pin and video walk-through.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="https://wa.me/923218653500?text=Assalam-o-Alaikum, I want to find the exact plot location for Citi Housing."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl shadow transition-all"
            >
              WhatsApp Plot Details: 0321-8653500
            </a>
            <Link
              href="/Plots/Faisalabad"
              prefetch={false}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
            >
              Browse All Active Plots
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

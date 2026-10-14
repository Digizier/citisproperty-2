'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  Download,
  Eye,
  Search,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Phone,
  MessageCircle,
  Compass,
  Sparkles,
  X,
  ShieldCheck,
  Printer,
} from 'lucide-react';
import { getSocieties, DB_EVENTS } from '@/lib/db';
import { Society } from '@/lib/types';

export default function SocietyMapsPage() {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [previewPdf, setPreviewPdf] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  } | null>(null);

  // Load Societies from Database
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const socList = await getSocieties(true);
        if (isMounted) {
          setSocieties(socList);
        }
      } catch (err) {
        console.error('Error fetching society maps:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();

    const handleUpdate = () => {
      getSocieties(true).then((data) => {
        if (isMounted) setSocieties(data);
      });
    };

    window.addEventListener(DB_EVENTS.SOCIETIES_UPDATED, handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener(DB_EVENTS.SOCIETIES_UPDATED, handleUpdate);
    };
  }, []);

  // Unique list of cities
  const cities = useMemo(() => {
    const list = Array.from(new Set(societies.map((s) => s.city).filter(Boolean)));
    return ['All', ...list];
  }, [societies]);

  // Filtered society maps
  const filteredSocieties = useMemo(() => {
    return societies.filter((s) => {
      const matchesCity =
        selectedCity === 'All' || s.city.toLowerCase() === selectedCity.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.location && s.location.toLowerCase().includes(q)) ||
        (s.city && s.city.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q));
      return matchesCity && matchesQuery;
    });
  }, [societies, selectedCity, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-gold-500 selection:text-slate-950">
      {/* 1. HERO HEADER */}
      <section className="relative pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#b8891a 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          {/* Breadcrumb & Dealer Badge */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <Link
              href="/"
              prefetch={false}
              className="text-slate-400 hover:text-brand-gold-400 transition font-bold"
            >
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-gold-400 font-extrabold">Plot & Society Maps (PDF)</span>

            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/30 font-bold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Authorized Dealer • Citi Housing Phase II</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Plot &amp; Society Master Plan Maps{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-400 via-amber-300 to-brand-gold-500">
                (Free PDF Downloads)
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
              Download official, high-definition society master plan blueprints, sector layouts, and
              plot numbering maps. Verified directly by <strong>Property Bank Real Estate</strong> at
              11-AA Main Commercial Market, Citi Housing Samundri Road, Faisalabad.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search society, phase, or location..."
                className="w-full pl-10 pr-9 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 transition shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* City Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-xs font-bold text-slate-400 mr-1 hidden lg:inline">City:</span>
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    selectedCity === city
                      ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 shadow-md shadow-brand-gold-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {city === 'All' ? 'All Cities' : city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN MAPS GRID */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-gold-500/10 text-brand-gold-400 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Available Society Master Plans ({filteredSocieties.length})
              </h2>
              <p className="text-xs text-slate-400">
                Click download to save high-resolution printable PDF or inspect online.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>High-Speed Direct Download</span>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-slate-800 rounded-2xl" />
                <div className="h-6 w-3/4 bg-slate-800 rounded-md" />
                <div className="h-4 w-1/2 bg-slate-800 rounded-md" />
                <div className="h-10 bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredSocieties.length === 0 ? (
          /* Empty State */
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-gold-500/10 text-brand-gold-400 flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Society Maps Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No society master plan matches your search &quot;{searchQuery}&quot;. Clear your
              search or contact Property Bank directly for custom maps.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('All');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 text-xs font-black transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Grid of PDF Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredSocieties.map((society, index) => {
              const pdfUrl =
                society.master_plan_pdf_url || '/maps/property-bank-master-plan.pdf';
              const imageUrl =
                society.master_plan_image_url ||
                society.image_url ||
                '/maps/citi-housing-master-plan-hd.webp';
              const whatsappInquiryUrl = `https://wa.me/923218653500?text=${encodeURIComponent(
                `Assalam-o-Alaikum, I am inquiring about the master plan and plot verification for ${society.name} (${society.city}) from citisproperty.com.`
              )}`;

              return (
                <div
                  key={society.id}
                  className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-brand-gold-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-brand-gold-500/5 transition duration-300 flex flex-col group"
                >
                  {/* Blueprint Preview Thumbnail */}
                  <div className="relative h-56 sm:h-64 bg-slate-950 overflow-hidden border-b border-slate-800">
                    <img
                      src={imageUrl}
                      alt={`${society.name} Blueprint Master Plan`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Badge Strip */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-brand-gold-400 border border-brand-gold-500/30 text-[11px] font-extrabold shadow-md">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Map #{index + 1} • Master Plan</span>
                      </span>

                      {society.is_featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-brand-gold-500 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Quick Preview Button Overlay on Image */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewPdf({
                            isOpen: true,
                            url: pdfUrl,
                            title: society.name,
                          })
                        }
                        className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-brand-gold-400" />
                        <span>Inspect Online</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-brand-gold-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {society.city} {society.location ? `• ${society.location}` : ''}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white leading-snug group-hover:text-brand-gold-400 transition">
                        {society.name}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {society.description ||
                          'Complete master plan layout with executive residential blocks, commercial zones, central park, and wide boulevards.'}
                      </p>
                    </div>

                    {/* Metadata Strip */}
                    <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Original Vector PDF</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Printer className="w-3.5 h-3.5 text-brand-gold-400" />
                        <span>Printable High-Res</span>
                      </div>
                    </div>

                    {/* Actions: Download PDF, Fullscreen & WhatsApp Verification */}
                    <div className="space-y-2 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* Direct PDF Download Button */}
                        <a
                          href={pdfUrl}
                          download
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs shadow-lg shadow-brand-gold-500/20 transition cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF Map</span>
                        </a>

                        {/* Online Viewer Modal Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewPdf({
                              isOpen: true,
                              url: pdfUrl,
                              title: society.name,
                            })
                          }
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 transition cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-brand-gold-400" />
                          <span>View Fullscreen</span>
                        </button>
                      </div>

                      {/* WhatsApp Inquiry / Verification Button in Official WhatsApp Green */}
                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black shadow transition"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Plot Verification Helpline on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. VERIFIED DEALERSHIP & CONSULTANCY HELP */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-brand-gold-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/30 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Plot Verification</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Need Help Finding a Specific Plot Number?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Our authorized real estate consultants will verify plot dimensions, park-facing
                location, corner status, and installment ledger directly on the master plan.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:03028658450"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs shadow-lg shadow-brand-gold-500/20 transition flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 0302-8658450</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-brand-gold-400">
                Head Office
              </span>
              <h4 className="font-extrabold text-white text-sm">Property Bank Real Estate</h4>
              <p className="text-slate-400">
                11-AA Main Commercial Market, Citi Housing Samundri Road, Faisalabad
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-brand-gold-400">
                Principal Consultant
              </span>
              <h4 className="font-extrabold text-white text-sm">Asif Sadiq</h4>
              <p className="text-slate-400 font-mono">0302-8658450 / 0321-8653500</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-brand-gold-400">
                Managing Partner
              </span>
              <h4 className="font-extrabold text-white text-sm">Rana Adnan</h4>
              <p className="text-slate-400 font-mono">0302-9892635</p>
            </div>
          </div>
        </div>
      </main>

      {/* 4. INTERACTIVE PDF MODAL VIEWER */}
      {previewPdf && previewPdf.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-5xl h-[88vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-brand-gold-500/10 text-brand-gold-400 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
                    {previewPdf.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    High-Definition Blueprint Master Plan (PDF)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewPdf.url}
                  download
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 text-xs font-black transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                <a
                  href={previewPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                  title="Open in new browser tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewPdf(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-600/30 hover:text-red-400 text-slate-400 transition cursor-pointer"
                  title="Close viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full bg-slate-950 relative">
              <iframe
                src={`${previewPdf.url}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={previewPdf.title}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <span>Verified by Property Bank Real Estate • citisproperty.com</span>
              <div className="flex items-center gap-3">
                <a
                  href="tel:03218653500"
                  className="text-brand-gold-400 hover:underline font-bold"
                >
                  Call 0321-8653500
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { getSocieties, DB_EVENTS } from '@/lib/db';
import { Society } from '@/lib/types';
import { slugify } from '@/lib/utils';

export default function SocietyMapsPage() {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [highlightedMapSlug, setHighlightedMapSlug] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [previewPdf, setPreviewPdf] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    slug: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

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

  // Handle URL deep link queries (e.g. ?map=citi-housing-phase2 or ?map=id)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const mapParam = urlParams.get('map') || window.location.hash.replace('#', '');
    if (mapParam) {
      setHighlightedMapSlug(mapParam);
    }
  }, []);

  // When societies load and a map is targeted in URL, scroll to it & open if requested
  useEffect(() => {
    if (!highlightedMapSlug || societies.length === 0) return;
    const target = societies.find(
      (s) =>
        s.id.toLowerCase() === highlightedMapSlug.toLowerCase() ||
        slugify(s.name).toLowerCase() === highlightedMapSlug.toLowerCase()
    );

    if (target) {
      const targetSlug = slugify(target.name);
      const element = document.getElementById(`map-${targetSlug}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }

      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        // If ?view=1 or user came from a share link with view flag, auto-open the preview modal
        if (urlParams.get('view') === '1' || urlParams.get('open') === '1') {
          setPreviewPdf({
            isOpen: true,
            url: target.master_plan_pdf_url || '/maps/property-bank-master-plan.pdf',
            title: target.name,
            slug: targetSlug,
          });
        }
      }
    }
  }, [highlightedMapSlug, societies]);

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

  // Handle Share Map Link (Mobile Share Sheet or Clipboard Copy)
  const handleShareMap = async (society: Society) => {
    if (typeof window === 'undefined') return;
    const slug = slugify(society.name);
    const shareUrl = `${window.location.origin}/society-maps?map=${slug}&view=1`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${society.name} - Master Plan PDF Blueprint`,
          text: `Download and view official master plan PDF for ${society.name} (${society.city}) verified by Property Bank Real Estate:`,
          url: shareUrl,
        });
        showToast('Share dialog opened!');
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Master Plan Link copied to clipboard! Ready to share.');
    } catch {
      showToast(`Link copied: ${shareUrl}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-brand-gold-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white border border-brand-gold-500/40 shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO HEADER (Clean White Background Matching Home Page) */}
      <section className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/90 bg-white overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#b8891a 1.2px, transparent 1.2px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          {/* Breadcrumb & Dealer Badge */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <Link
              href="/"
              prefetch={false}
              className="text-slate-500 hover:text-brand-gold-700 transition font-bold"
            >
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-brand-gold-700 font-extrabold">Plot & Society Maps (PDF)</span>

            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-50 text-brand-gold-800 border border-brand-gold-200/80 font-bold text-[11px] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-600" />
              <span>Official Authorized Dealer • Citi Housing Phase II</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Plot &amp; Society Master Plan Maps{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-600 via-amber-600 to-brand-gold-700">
                (Free PDF Downloads)
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-3xl leading-relaxed">
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
                className="w-full pl-10 pr-9 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-gold-500 focus:ring-2 focus:ring-brand-gold-500/20 transition shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* City Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-xs font-bold text-slate-500 mr-1 hidden lg:inline">City:</span>
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    selectedCity === city
                      ? 'bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 text-slate-950 shadow-md shadow-brand-gold-500/25'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
                  }`}
                >
                  {city === 'All' ? 'All Cities' : city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN MAPS GRID (Clean White Container) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-gold-50 text-brand-gold-700 flex items-center justify-center font-bold border border-brand-gold-200/60 shadow-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Available Society Master Plans ({filteredSocieties.length})
              </h2>
              <p className="text-xs text-slate-500">
                Click download to save high-resolution printable PDF, inspect online, or share link.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>High-Speed Direct Download &amp; Share Ready</span>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm animate-pulse"
              >
                <div className="h-48 bg-slate-100 rounded-2xl" />
                <div className="h-6 w-3/4 bg-slate-100 rounded-md" />
                <div className="h-4 w-1/2 bg-slate-100 rounded-md" />
                <div className="h-10 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredSocieties.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-brand-gold-50 text-brand-gold-600 flex items-center justify-center mx-auto border border-brand-gold-200">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Society Maps Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No society master plan matches your search &quot;{searchQuery}&quot;. Clear your
              search or contact Property Bank directly for custom maps.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('All');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 text-xs font-black transition cursor-pointer shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Grid of PDF Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredSocieties.map((society, index) => {
              const slug = slugify(society.name);
              const isTargeted =
                highlightedMapSlug &&
                (highlightedMapSlug.toLowerCase() === society.id.toLowerCase() ||
                  highlightedMapSlug.toLowerCase() === slug.toLowerCase());

              const pdfUrl =
                society.master_plan_pdf_url || '/maps/property-bank-master-plan.pdf';
              const imageUrl =
                society.master_plan_image_url ||
                society.image_url ||
                '/maps/citi-housing-master-plan-hd.webp';

              // Shareable Link for this specific map
              const shareUrl =
                typeof window !== 'undefined'
                  ? `${window.location.origin}/society-maps?map=${slug}&view=1`
                  : `/society-maps?map=${slug}&view=1`;

              const whatsappShareText = encodeURIComponent(
                `Official Master Plan PDF Blueprint for ${society.name} (${society.city}):\n${shareUrl}\n\nVerified by Property Bank Real Estate (Citi Housing Authorized Dealership).`
              );
              const whatsappShareUrl = `https://api.whatsapp.com/send?text=${whatsappShareText}`;

              const whatsappInquiryUrl = `https://wa.me/923218653500?text=${encodeURIComponent(
                `Assalam-o-Alaikum, I am inquiring about the master plan and plot verification for ${society.name} (${society.city}) from citisproperty.com.`
              )}`;

              return (
                <div
                  key={society.id}
                  id={`map-${slug}`}
                  className={`bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group ${
                    isTargeted
                      ? 'ring-4 ring-brand-gold-500 ring-offset-4 ring-offset-slate-50 border-brand-gold-500 shadow-2xl shadow-brand-gold-500/15'
                      : 'border-slate-200/90 hover:border-brand-gold-500/50'
                  }`}
                >
                  {/* Blueprint Preview Thumbnail */}
                  <div className="relative h-56 sm:h-64 bg-slate-100 overflow-hidden border-b border-slate-200">
                    <img
                      src={imageUrl}
                      alt={`${society.name} Blueprint Master Plan`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                    {/* Badge Strip */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 text-[11px] font-black shadow-md">
                        <FileText className="w-3.5 h-3.5 text-brand-gold-600" />
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
                            slug: slug,
                          })
                        }
                        className="px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 text-xs font-bold border border-slate-200 backdrop-blur-md flex items-center gap-1.5 shadow-md transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-brand-gold-600" />
                        <span>Inspect Online</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-brand-gold-700">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {society.city} {society.location ? `• ${society.location}` : ''}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 leading-snug group-hover:text-brand-gold-700 transition">
                        {society.name}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {society.description ||
                          'Complete master plan layout with executive residential blocks, commercial zones, central park, and wide boulevards.'}
                      </p>
                    </div>

                    {/* Metadata Strip */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Original Vector PDF</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Printer className="w-3.5 h-3.5 text-brand-gold-600" />
                        <span>Printable High-Res</span>
                      </div>
                    </div>

                    {/* Actions: Download, Fullscreen, Share Link & WhatsApp */}
                    <div className="space-y-2.5 pt-2">
                      {/* Row 1: Primary Download & Fullscreen */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* Direct PDF Download Button */}
                        <a
                          href={pdfUrl}
                          download
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md shadow-brand-gold-500/25 transition cursor-pointer"
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
                              slug: slug,
                            })
                          }
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-brand-gold-700" />
                          <span>View Fullscreen</span>
                        </button>
                      </div>

                      {/* Row 2: Instant Sharing Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* Direct Shareable Link Button */}
                        <button
                          type="button"
                          onClick={() => handleShareMap(society)}
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-brand-gold-50 hover:bg-brand-gold-100 text-brand-gold-900 border border-brand-gold-200 font-bold text-xs transition cursor-pointer shadow-xs"
                          title="Share direct map link"
                        >
                          <Share2 className="w-3.5 h-3.5 text-brand-gold-700" />
                          <span>Share Map Link</span>
                        </button>

                        {/* Direct WhatsApp Share Link */}
                        <a
                          href={whatsappShareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition cursor-pointer shadow-xs"
                          title="Share directly via WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Share via WhatsApp</span>
                        </a>
                      </div>

                      {/* Row 3: Official Verification Helpline */}
                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black shadow-md transition"
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

        {/* 3. VERIFIED DEALERSHIP & CONSULTANCY HELP (Clean Light Card) */}
        <div className="bg-white border-2 border-brand-gold-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md shadow-brand-gold-500/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-50 text-brand-gold-800 border border-brand-gold-200/80 text-xs font-bold mb-2 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-600" />
                <span>Authorized Plot Verification</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Need Help Finding a Specific Plot Number?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Our authorized real estate consultants will verify plot dimensions, park-facing
                location, corner status, and installment ledger directly on the master plan.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:03028658450"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md shadow-brand-gold-500/20 transition flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 0302-8658450</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-brand-gold-700">
                Head Office
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm">Property Bank Real Estate</h4>
              <p className="text-slate-600">
                11-AA Main Commercial Market, Citi Housing Samundri Road, Faisalabad
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-brand-gold-700">
                Principal Consultant
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm">Asif Sadiq</h4>
              <p className="text-slate-700 font-mono font-bold">0302-8658450 / 0321-8653500</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-brand-gold-700">
                Managing Partner
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm">Rana Adnan</h4>
              <p className="text-slate-700 font-mono font-bold">0302-9892635</p>
            </div>
          </div>
        </div>
      </main>

      {/* 4. INTERACTIVE PDF MODAL VIEWER WITH EMBEDDED SHARING */}
      {previewPdf && previewPdf.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-5xl h-[88vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-brand-gold-50 text-brand-gold-700 border border-brand-gold-200 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                    {previewPdf.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    High-Definition Blueprint Master Plan (PDF)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Share Link button inside modal */}
                <button
                  type="button"
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/society-maps?map=${previewPdf.slug}&view=1`;
                    if (navigator.share) {
                      navigator.share({
                        title: `${previewPdf.title} - Master Plan PDF`,
                        text: `Check out the official Master Plan PDF for ${previewPdf.title}:`,
                        url: shareUrl,
                      });
                    } else {
                      navigator.clipboard.writeText(shareUrl);
                      showToast('Map link copied to clipboard!');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-brand-gold-50 hover:bg-brand-gold-100 text-brand-gold-900 border border-brand-gold-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  title="Share this map link"
                >
                  <Share2 className="w-3.5 h-3.5 text-brand-gold-700" />
                  <span className="hidden sm:inline">Share Link</span>
                </button>

                <a
                  href={previewPdf.url}
                  download
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                <a
                  href={previewPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200"
                  title="Open in new browser tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewPdf(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 transition cursor-pointer border border-slate-200"
                  title="Close viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full bg-slate-100 relative">
              <iframe
                src={`${previewPdf.url}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={previewPdf.title}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between text-xs text-slate-600">
              <span>Verified by Property Bank Real Estate • citisproperty.com</span>
              <div className="flex items-center gap-3">
                <a
                  href="tel:03218653500"
                  className="text-brand-gold-700 hover:underline font-bold"
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

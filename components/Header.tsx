'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Calculator,
  Building,
  Home as HomeIcon,
  MapPin,
  PlusCircle,
  Star,
} from 'lucide-react';
import { getSiteSettings, DB_EVENTS } from '@/lib/db';
import { SiteSettings } from '@/lib/types';
import AnnouncementBanner from './AnnouncementBanner';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };
    fetchSettings();

    const handleUpdate = () => fetchSettings();
    window.addEventListener(DB_EVENTS.SETTINGS_UPDATED, handleUpdate);
    return () => window.removeEventListener(DB_EVENTS.SETTINGS_UPDATED, handleUpdate);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      {/* Dynamic Announcement Banner from Admin */}
      <AnnouncementBanner />

      {/* Top Utility Bar (Desktop only) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-brand-gold-400 font-medium">
              Official Dealer: <strong className="text-white">{settings?.site_name || 'Property Bank Real Estate'}</strong>
            </span>
            <div className="flex items-center gap-4">
              {(settings?.phones || '03218653500, 03028658450')
                .split(',')
                .map((phone) => phone.trim())
                .filter(Boolean)
                .map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Phone className="w-3 h-3 text-brand-gold-400" />
                    <span>{phone}</span>
                  </a>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-5 text-slate-300">
            <a
              href={settings?.google_review_url || 'https://g.page/r/CWPTsi4M7yUMEBE/review'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Review on Google</span>
            </a>
            <a
              href={settings?.google_maps_url || 'https://maps.app.goo.gl/Umc7Ci9kQZN1GwVo6'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-red-400" />
              <span>Office Location</span>
            </a>
            <a
              href={settings?.facebook_url || 'https://www.facebook.com/share/1EM79fibhT/'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo & Brand Identity (Mobile-optimized layout) */}
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-shrink"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="City Housing (Pvt) Ltd - Property Bank Real Estate Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-base md:text-lg font-black tracking-tight text-slate-900 uppercase leading-tight truncate group-hover:text-brand-gold-600 transition-colors">
                City Housing <span className="text-brand-gold-600 text-[10px] sm:text-xs font-bold">(Pvt) Ltd</span>
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-extrabold text-brand-gold-600 tracking-wider uppercase truncate mt-0.5">
                Property Bank Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
            <Link
              href="/"
              prefetch={false}
              className="px-3 py-2 rounded-lg hover:text-brand-gold-600 hover:bg-slate-50 transition-colors"
            >
              Home
            </Link>

            {/* Buy Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBuyDropdownOpen(true)}
              onMouseLeave={() => setBuyDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-brand-gold-600 hover:bg-slate-50 transition-colors"
              >
                <span>Buy</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {buyDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    href="/Homes/Faisalabad"
                    prefetch={false}
                    className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-gold-50 hover:text-brand-gold-800 font-medium"
                  >
                    <span>Houses for Sale</span>
                    <span className="text-[10px] text-slate-400">5M, 10M, 1K</span>
                  </Link>
                  <Link
                    href="/Plots/Faisalabad"
                    prefetch={false}
                    className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-gold-50 hover:text-brand-gold-800 font-medium"
                  >
                    <span>Plots for Sale</span>
                    <span className="text-[10px] text-slate-400">On-ground & Files</span>
                  </Link>
                  <Link
                    href="/Commercial/Faisalabad"
                    prefetch={false}
                    className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-gold-50 hover:text-brand-gold-800 font-medium"
                  >
                    <span>Commercial Property</span>
                    <span className="text-[10px] text-slate-400">Shops & Plazas</span>
                  </Link>
                  <Link
                    href="/Flats/Faisalabad"
                    prefetch={false}
                    className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-gold-50 hover:text-brand-gold-800 font-medium"
                  >
                    <span>Flats & Apartments</span>
                    <span className="text-[10px] text-slate-400">Luxury Towers</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Rent */}
            <Link
              href="/Rentals/Faisalabad"
              prefetch={false}
              className="px-3 py-2 rounded-lg hover:text-brand-gold-600 hover:bg-slate-50 transition-colors"
            >
              Rent
            </Link>

            {/* New Projects */}
            <Link
              href="/new-projects"
              prefetch={false}
              className="px-3 py-2 rounded-lg hover:text-brand-gold-600 hover:bg-slate-50 transition-colors"
            >
              Projects
            </Link>

            {/* Tools & Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-brand-gold-600 hover:bg-slate-50 transition-colors"
              >
                <span>Calculators</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    href="/tools/construction-cost-calculator"
                    prefetch={false}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-gold-50 hover:text-brand-gold-800 font-medium"
                  >
                    <Calculator className="w-4 h-4 text-brand-gold-600" />
                    <div>
                      <div className="font-bold">Construction Cost Calculator</div>
                      <div className="text-[10px] text-slate-400">2026 Material Rates & Grey Structure</div>
                    </div>
                  </Link>
                  <Link
                    href="/tools/home-loan-calculator"
                    prefetch={false}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-gold-50 hover:text-brand-gold-800 font-medium"
                  >
                    <Building className="w-4 h-4 text-brand-gold-600" />
                    <div>
                      <div className="font-bold">Home Loan / Mortgage Calculator</div>
                      <div className="text-[10px] text-slate-400">Monthly Installment & Mark-up</div>
                    </div>
                  </Link>
                  <Link
                    href="/tools/area-unit-converter"
                    prefetch={false}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-gold-50 hover:text-brand-gold-800 font-medium"
                  >
                    <HomeIcon className="w-4 h-4 text-brand-gold-600" />
                    <div>
                      <div className="font-bold">Area Unit Converter</div>
                      <div className="text-[10px] text-slate-400">Marla, Kanal, Sq. Ft, Sq. Yds</div>
                    </div>
                  </Link>
                  <Link
                    href="/tools/land-records"
                    prefetch={false}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-gold-50 hover:text-brand-gold-800 font-medium"
                  >
                    <MapPin className="w-4 h-4 text-brand-gold-600" />
                    <div>
                      <div className="font-bold">Land Records & Registry</div>
                      <div className="text-[10px] text-slate-400">Fard Malkiat & Transfer Verification</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Society Maps */}
            <Link
              href="/society-maps"
              prefetch={false}
              className="px-3 py-2 rounded-lg hover:text-brand-gold-600 hover:bg-slate-50 transition-colors"
            >
              Maps
            </Link>
          </nav>

          {/* Action CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href={`https://wa.me/${(settings?.whatsapp || '923218653500').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/post-listing"
              prefetch={false}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-amber-700 text-slate-950 text-xs font-black shadow-md shadow-brand-gold-500/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Property</span>
            </Link>
          </div>

          {/* Mobile Actions: Hamburger Menu Toggle (Post is accessible via Bottom Nav and Menu) */}
          <div className="lg:hidden flex items-center flex-shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Mobile Featured Post CTA */}
          <Link
            href="/post-listing"
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-brand-gold-500/30 text-white shadow-md active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center font-bold">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-xs">Post Property for Sale / Rent</div>
                <div className="text-[10px] text-brand-gold-300">Free Listing with Verified Property Bank Dealers</div>
              </div>
            </div>
            <span className="text-xs font-black bg-brand-gold-500 text-slate-950 px-2 py-0.5 rounded-md">
              FREE
            </span>
          </Link>

          {/* Quick Helpline Header */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center justify-between">
              <span>Property Bank 24/7 Helpline:</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>
            <div className="flex flex-wrap gap-3 font-semibold text-brand-gold-700 pt-1">
              {(settings?.phones || '03218653500, 03028658450')
                .split(',')
                .map((phone) => phone.trim())
                .filter(Boolean)
                .map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3 h-3 text-brand-gold-600" /> {phone}
                  </a>
                ))}
            </div>
          </div>

          <div className="space-y-1 font-semibold text-xs sm:text-sm text-slate-800">
            <Link
              href="/"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/Homes/Faisalabad"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-50"
            >
              Houses for Sale
            </Link>
            <Link
              href="/Plots/Faisalabad"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-50"
            >
              Plots for Sale
            </Link>
            <Link
              href="/Commercial/Faisalabad"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-50"
            >
              Commercial Properties
            </Link>
            <Link
              href="/Rentals/Faisalabad"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-50"
            >
              Rentals Portal
            </Link>
            <Link
              href="/new-projects"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-50"
            >
              New Projects
            </Link>
            <Link
              href="/society-maps"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-50"
            >
              Society Maps & Plot Finder
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Calculators & Tools
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/tools/construction-cost-calculator"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 block"
              >
                Cost Calculator
              </Link>
              <Link
                href="/tools/home-loan-calculator"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 block"
              >
                Home Loan
              </Link>
              <Link
                href="/tools/area-unit-converter"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 block"
              >
                Unit Converter
              </Link>
              <Link
                href="/tools/land-records"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 block"
              >
                Land Records
              </Link>
            </div>
          </div>

          {/* Social & Google Links in Mobile Menu */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600 px-2">
            <a
              href="https://g.page/r/CWPTsi4M7yUMEBE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 font-bold flex items-center gap-1"
            >
              <Star className="w-3.5 h-3.5 fill-amber-500" /> Rate on Google
            </a>
            <a
              href="https://maps.app.goo.gl/Umc7Ci9kQZN1GwVo6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900"
            >
              View on Map
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

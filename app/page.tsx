'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Home,
  Building2,
  LandPlot,
  Building,
  MapPin,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Calculator,
  Compass,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { getProperties, getCategories, getDistinctPropertyFilterOptions, DB_EVENTS } from '@/lib/db';
import { Property, Category } from '@/lib/types';
import PropertyCard from '@/components/PropertyCard';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import SearchableSelect from '@/components/SearchableSelect';
import { PAKISTAN_CITIES, PROPERTY_TYPES } from '@/lib/constants';

export default function HomePage() {
  const router = useRouter();

  // Search State
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [city, setCity] = useState('Faisalabad');
  const [propertyType, setPropertyType] = useState('Homes');
  const [keyword, setKeyword] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [filterOptions, setFilterOptions] = useState<{
    cities: string[];
    types: string[];
    units: string[];
  }>({
    cities: ['Faisalabad', 'Gujranwala', 'Sialkot', 'Jhelum', 'Lahore', 'Islamabad'],
    types: ['Homes', 'Plots', 'Commercial', 'Flats'],
    units: ['Marla', 'Kanal', 'Sq. Ft', 'Sq. Yd'],
  });

  // Data State
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [propsRes, catsRes, filterOpts] = await Promise.all([
        getProperties({ limit: 8 }), // Strictly 8 properties for zero-load efficiency
        getCategories(),
        getDistinctPropertyFilterOptions(),
      ]);
      setFeaturedProperties(propsRes.data);
      setCategories(catsRes);
      if (filterOpts) setFilterOptions(filterOpts);
    } catch (e) {
      console.error('Error loading homepage data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener(DB_EVENTS.PROPERTIES_UPDATED, handleUpdate);
    return () => window.removeEventListener(DB_EVENTS.PROPERTIES_UPDATED, handleUpdate);
  }, []);

  const combinedCities = useMemo(() => {
    return ['All Cities', ...Array.from(new Set([...PAKISTAN_CITIES, ...(filterOptions.cities || [])]))];
  }, [filterOptions.cities]);

  const combinedTypes = useMemo(() => {
    return ['All Types', ...Array.from(new Set([...PROPERTY_TYPES, ...(filterOptions.types || [])]))];
  }, [filterOptions.types]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('purpose', purpose);
    if (city && city !== 'All Cities') params.set('city', city);
    if (propertyType && propertyType !== 'All Types') params.set('type', propertyType);
    if (keyword.trim()) params.set('q', keyword.trim());
    if (priceRange) params.set('price', priceRange);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="relative z-20 min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-slate-950 pb-16 lg:pb-24">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
            alt="Luxury Citi Housing Real Estate"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* Official Accreditation Badge (High Contrast & Crystal Clear on Mobile) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider shadow-xl shadow-amber-500/25 mb-6 border border-amber-300">
            <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950 flex-shrink-0" />
            <span>Authorized Dealership — Property Bank Real Estate</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Search Luxury Living in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-brand-gold-400 to-yellow-200">
              Citi Housing
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium">
            Explore 100% verified plots, designer villas, and high-yield commercial shops across Faisalabad, Gujranwala, Sialkot, and Jhelum.
          </p>

          {/* Zameen-Style Search Box */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20 text-left max-w-4xl mx-auto">
            {/* Tabs: Buy vs Rent */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setPurpose('buy')}
                className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  purpose === 'buy'
                    ? 'bg-brand-gold-600 text-white shadow-md shadow-brand-gold-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Buy (For Sale)
              </button>
              <button
                type="button"
                onClick={() => setPurpose('rent')}
                className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  purpose === 'rent'
                    ? 'bg-brand-gold-600 text-white shadow-md shadow-brand-gold-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Rent (To Let)
              </button>
            </div>

            {/* Filter Form */}
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* City Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    City / Region
                  </label>
                  <SearchableSelect
                    value={city}
                    onChange={(val) => setCity(val)}
                    options={combinedCities}
                    placeholder="Select city..."
                    searchPlaceholder="Search city across Pakistan..."
                    allowCustom={true}
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Property Type
                  </label>
                  <SearchableSelect
                    value={propertyType}
                    onChange={(val) => setPropertyType(val)}
                    options={combinedTypes}
                    placeholder="Select property type..."
                    searchPlaceholder="Search all property types..."
                    allowCustom={true}
                  />
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Budget / Price
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                  >
                    <option value="">Any Budget</option>
                    <option value="under-1-crore">Under 1 Crore</option>
                    <option value="1-to-3-crore">1 to 3 Crore</option>
                    <option value="3-to-5-crore">3 to 5 Crore</option>
                    <option value="above-5-crore">Above 5 Crore</option>
                  </select>
                </div>

                {/* Keyword Search */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Location / Phase
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Sargodha Rd, Block A"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-700">Popular:</span>
                  <Link
                    href="/Homes/Faisalabad"
                    prefetch={false}
                    className="text-brand-gold-700 hover:underline font-bold"
                  >
                    5 Marla House
                  </Link>
                  <span>•</span>
                  <Link
                    href="/Plots/Faisalabad"
                    prefetch={false}
                    className="text-brand-gold-700 hover:underline font-bold"
                  >
                    10 Marla Plot
                  </Link>
                  <span>•</span>
                  <Link
                    href="/Commercial/Faisalabad"
                    prefetch={false}
                    className="text-brand-gold-700 hover:underline font-bold"
                  >
                    Citi Gold Mark
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-amber-700 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-brand-gold-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Properties</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* QUICK REAL ESTATE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Explore by Property Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select a category to view verified listings with current market prices
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Link
            href="/Homes/Faisalabad"
            prefetch={false}
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-gold-500/50 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-gold-50 text-brand-gold-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-gold-700 transition-colors">
              Houses & Villas
            </h3>
            <p className="text-xs text-slate-500 mt-1">5M, 10M, 1 Kanal Ready Homes</p>
          </Link>

          <Link
            href="/Plots/Faisalabad"
            prefetch={false}
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-gold-500/50 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <LandPlot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-gold-700 transition-colors">
              Residential Plots
            </h3>
            <p className="text-xs text-slate-500 mt-1">Possession plots & booking files</p>
          </Link>

          <Link
            href="/Commercial/Faisalabad"
            prefetch={false}
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-gold-500/50 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-gold-700 transition-colors">
              Commercial
            </h3>
            <p className="text-xs text-slate-500 mt-1">Shops, plazas, and Main Blvd</p>
          </Link>

          <Link
            href="/Rentals/Faisalabad"
            prefetch={false}
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-gold-500/50 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-gold-700 transition-colors">
              Rental Properties
            </h3>
            <p className="text-xs text-slate-500 mt-1">Furnished & unfurnished options</p>
          </Link>
        </div>
      </section>

      {/* FEATURED PROPERTIES GRID (Strictly 8 products pagination limit) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold-600 uppercase tracking-wider mb-1">
              <Star className="w-3.5 h-3.5 fill-brand-gold-500" />
              <span>Handpicked Prime Listings</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Featured Properties in Citi Housing
            </h2>
          </div>

          <Link
            href="/properties"
            prefetch={false}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold-700 hover:text-brand-gold-800 transition-colors"
          >
            <span>View All Listings</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid (8 Items strictly) */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">No properties found at this moment.</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/properties?page=2"
            prefetch={false}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition-all"
          >
            <span>Explore More (Page 2, 3...)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* TOP CITI HOUSING MEGA PROJECTS SHOWCASE */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-gold-400 uppercase tracking-widest">
              Flagship Developments
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Citi Housing Mega Projects Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Modern gated communities with underground electrification, theme parks, international standard healthcare, and commercial avenues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project 1 */}
            <div className="group bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-brand-gold-500/40 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                  alt="Citi Housing Faisalabad Sargodha Road"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-brand-gold-600 to-amber-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-sm">
                  Phase 1 — Operational
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-white">Citi Housing Sargodha Road</h3>
                <p className="text-xs text-slate-400">
                  Prime Faisalabad location with Citi Gold Mark commercial center, Opera cinema, and central theme park.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-brand-gold-400">
                  <span>Plots & Villas Available</span>
                  <Link href="/Plots/Faisalabad" prefetch={false} className="hover:underline flex items-center gap-1">
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-brand-gold-500/40 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
                  alt="Citi Housing Samundri Road Faisalabad"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                  Phase 2 — Rapid Construction
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-white">Citi Housing Samundri Road</h3>
                <p className="text-xs text-slate-400">
                  High-speed road connectivity, modern dancing fountain, school campus, and rapid possession delivery.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-brand-gold-400">
                  <span>5M & 10M Ready Plots</span>
                  <Link href="/Plots/Faisalabad" prefetch={false} className="hover:underline flex items-center gap-1">
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-brand-gold-500/40 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop"
                  alt="Citi Housing Gujranwala & Sialkot"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                  Multi-City Projects
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-white">Gujranwala, Sialkot & Jhelum</h3>
                <p className="text-xs text-slate-400">
                  Luxury master planned communities catering to overseas Pakistanis and high net-worth investors.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-brand-gold-400">
                  <span>Commercial & Residential</span>
                  <Link href="/new-projects" prefetch={false} className="hover:underline flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE REAL ESTATE CALCULATORS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-brand-gold-500/30">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold-500/20 text-brand-gold-300 text-xs font-bold uppercase mb-4 border border-brand-gold-500/30">
              <Calculator className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Smart Real Estate Tools</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Calculate Construction Costs & Home Loans Instantly
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
              Plan your home construction budget with accurate 2026 Pakistani material rates (Grey Structure vs Turnkey Finish), estimate monthly bank markups, and convert land units seamlessly.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/construction-cost-calculator"
                prefetch={false}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 text-xs font-black shadow transition-all"
              >
                Construction Cost Calculator
              </Link>
              <Link
                href="/tools/home-loan-calculator"
                prefetch={false}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-brand-gold-300 text-xs font-bold border border-brand-gold-500/30 shadow transition-all"
              >
                Home Loan Calculator
              </Link>
              <Link
                href="/tools/area-unit-converter"
                prefetch={false}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
              >
                Area Unit Converter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE PROPERTY BANK REAL ESTATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why Deal With Property Bank Real Estate?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Over a decade of trusted advisory and transparent property dealings across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gold-50 text-brand-gold-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">100% Verified Documents</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every plot and home file undergoes physical verification with Citi Housing head office before closing any transaction.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-gold-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Guaranteed Market Valuation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Get genuine on-ground market rates directly from active dealers without artificial broker markups or hidden fees.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Dedicated Overseas Desk</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Specialized video walk-throughs, Power of Attorney handling, and safe banking transfer assistance for overseas Pakistanis.
            </p>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS & DIRECT HELPLINE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
              {'★'.repeat(5)}
              <span className="text-xs text-slate-400 ml-2 font-bold">5.0 Star Client Rating</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Have you consulted with Property Bank Real Estate?
            </h3>
            <p className="text-xs text-slate-400">
              We value your feedback. Read our verified Google reviews or share your experience with us.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://g.page/r/CWPTsi4M7yUMEBE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              Post a Review on Google
            </a>
            <a
              href="tel:03218653500"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Call: 0321-8653500</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  RotateCcw,
} from 'lucide-react';
import { getProperties } from '@/lib/db';
import { Property, PropertyPurpose, PropertyType } from '@/lib/types';
import PropertyCard from '@/components/PropertyCard';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';

interface PropertyListContentProps {
  initialPurpose?: PropertyPurpose;
  initialType?: PropertyType;
  initialCity?: string;
  pageTitle?: string;
}

export default function PropertyListContent({
  initialPurpose,
  initialType,
  initialCity = 'Faisalabad',
  pageTitle,
}: PropertyListContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filters State
  const [purpose, setPurpose] = useState<PropertyPurpose>(
    (searchParams.get('purpose') as PropertyPurpose) || initialPurpose || 'buy'
  );
  const [type, setType] = useState<PropertyType>(
    (searchParams.get('type') as PropertyType) || initialType || 'Homes'
  );
  const [city, setCity] = useState<string>(
    searchParams.get('city') || initialCity || 'Faisalabad'
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('beds') || '');
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );

  // Data & Pagination State (strictly 8 items per page)
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false);

  const getMinMaxFromBudget = (budget: string): { min?: number; max?: number } => {
    switch (budget) {
      case 'under-1-crore':
        return { min: undefined, max: 10000000 };
      case '1-to-3-crore':
        return { min: 10000000, max: 30000000 };
      case '3-to-5-crore':
        return { min: 30000000, max: 50000000 };
      case 'above-5-crore':
        return { min: 50000000, max: undefined };
      default:
        return { min: undefined, max: undefined };
    }
  };

  const fetchListings = async () => {
    setLoading(true);
    try {
      const budgetLimits = getMinMaxFromBudget(priceRange);
      const effectiveMin = minPrice ? Number(minPrice) : budgetLimits.min;
      const effectiveMax = maxPrice ? Number(maxPrice) : budgetLimits.max;

      const res = await getProperties({
        purpose,
        type: type as PropertyType,
        city: city !== 'All Cities' ? city : undefined,
        searchQuery: searchQuery.trim() || undefined,
        minPrice: effectiveMin,
        maxPrice: effectiveMax,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        page: currentPage,
        limit: 8, // Strictly 8 products per page as required
      });

      setProperties(res.data);
      setTotalItems(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Error fetching property listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [purpose, type, city, priceRange, minPrice, maxPrice, bedrooms, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    fetchListings();
  };

  const handleResetFilters = () => {
    setPurpose('buy');
    setType('Homes');
    setCity('Faisalabad');
    setSearchQuery('');
    setPriceRange('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {pageTitle || `${type} for ${purpose === 'buy' ? 'Sale' : 'Rent'} in ${city}`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Showing strictly <strong className="text-slate-800">8 verified listings</strong> per page • Total {totalItems} properties found
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetFilters}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs text-brand-gold-700 hover:text-brand-gold-900 font-bold px-3 py-1.5 rounded-lg hover:bg-brand-gold-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* HOME-SCREEN STYLE FILTER & SEARCH CARD (RESPONSIVE FOR MOBILE, TABLET & DESKTOP) */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200 text-left">
        {/* Tabs: Buy vs Rent */}
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
          <button
            type="button"
            onClick={() => {
              setPurpose('buy');
              setCurrentPage(1);
            }}
            className={`px-5 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              purpose === 'buy'
                ? 'bg-brand-gold-600 text-white shadow-md shadow-brand-gold-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Buy (For Sale)
          </button>
          <button
            type="button"
            onClick={() => {
              setPurpose('rent');
              setCurrentPage(1);
            }}
            className={`px-5 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              purpose === 'rent'
                ? 'bg-brand-gold-600 text-white shadow-md shadow-brand-gold-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Rent (To Let)
          </button>
        </div>

        {/* Filter Form Grid */}
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* City Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                City / Region
              </label>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
              >
                <option value="Faisalabad">Faisalabad</option>
                <option value="Gujranwala">Gujranwala</option>
                <option value="Sialkot">Sialkot</option>
                <option value="Jhelum">Jhelum</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="All Cities">All Cities</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Property Type
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as PropertyType);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
              >
                <option value="Homes">Houses / Homes</option>
                <option value="Plots">Residential Plots</option>
                <option value="Commercial">Commercial Properties</option>
                <option value="Flats">Flats & Apartments</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Budget / Price
              </label>
              <select
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
              >
                <option value="">Any Budget</option>
                <option value="under-1-crore">Under 1 Crore</option>
                <option value="1-to-3-crore">1 to 3 Crore</option>
                <option value="3-to-5-crore">3 to 5 Crore</option>
                <option value="above-5-crore">Above 5 Crore</option>
              </select>
            </div>

            {/* Keyword / Location Search */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Location / Phase
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Sargodha Rd, Block A"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Popular Tags & Find Properties Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="font-bold text-slate-700">Popular:</span>
              <button
                type="button"
                onClick={() => {
                  setType('Homes');
                  setSearchQuery('5 Marla');
                  setCurrentPage(1);
                }}
                className="text-brand-gold-700 hover:underline font-bold"
              >
                5 Marla House
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setType('Plots');
                  setSearchQuery('10 Marla');
                  setCurrentPage(1);
                }}
                className="text-brand-gold-700 hover:underline font-bold"
              >
                10 Marla Plot
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('Citi Gold Mark');
                  setCurrentPage(1);
                }}
                className="text-brand-gold-700 hover:underline font-bold"
              >
                Citi Gold Mark
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setAdvancedFilterOpen(!advancedFilterOpen)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>More</span>
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-amber-700 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-brand-gold-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Find Properties</span>
              </button>
            </div>
          </div>

          {/* Optional Advanced Filters Bar (Bedrooms, Custom Price) */}
          {advancedFilterOpen && (
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-150">
              {(type === 'Homes' || type === 'Flats') && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Min Bedrooms
                  </label>
                  <div className="grid grid-cols-5 gap-1 text-xs">
                    {['', '1', '2', '3', '4'].map((b) => (
                      <button
                        key={b || 'all'}
                        type="button"
                        onClick={() => {
                          setBedrooms(b);
                          setCurrentPage(1);
                        }}
                        className={`py-1.5 rounded-lg font-bold border transition-all ${
                          bedrooms === b
                            ? 'bg-brand-gold-600 text-white border-brand-gold-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {b ? `${b}+` : 'All'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Custom Min (PKR)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000000"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Custom Max (PKR)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 25000000"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
          )}
        </form>
      </div>

      {/* PROPERTY LISTINGS GRID (Strict 8 items per page) */}
      <section className="space-y-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 shadow-sm">
            <p className="text-slate-600 text-sm font-medium">
              No properties matched your criteria in <strong className="text-slate-900">{city}</strong>.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-bold text-xs shadow transition-colors"
            >
              Reset Filters & Show All
            </button>
          </div>
        )}

        {/* Pagination Controls (Strict 8 Items/Page: Page 1, 2, 3...) */}
        {totalPages > 1 && (
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Page <strong className="text-slate-900">{currentPage}</strong> of{' '}
              <strong className="text-slate-900">{totalPages}</strong> (8 listings per page)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePageChange(p)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                    currentPage === p
                      ? 'bg-brand-gold-600 text-white shadow-md'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

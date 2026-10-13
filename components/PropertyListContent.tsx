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
  ArrowUpDown,
  Home,
  Building2,
  LandPlot,
  Building,
} from 'lucide-react';
import { getProperties, getCategories, getSubcategories } from '@/lib/db';
import { Property, Category, Subcategory, PropertyPurpose, PropertyType } from '@/lib/types';
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

  // Filters from URL or Props
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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await getProperties({
        purpose,
        type: type as PropertyType,
        city: city !== 'All Cities' ? city : undefined,
        searchQuery: searchQuery.trim() || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
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
  }, [purpose, type, city, minPrice, maxPrice, bedrooms, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {pageTitle || `${type} for ${purpose === 'buy' ? 'Sale' : 'Rent'} in ${city}`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing strictly <strong className="text-slate-800">8 verified listings</strong> per page • Total {totalItems} properties found
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-green-700 text-white font-bold text-xs shadow-md"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters & Budget</span>
        </button>
      </div>

      {/* Main Grid: Sidebar Filters (Desktop) + Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-green-700" />
                Refine Search
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-brand-green-700 hover:underline font-semibold"
              >
                Reset All
              </button>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Purpose
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPurpose('buy');
                    setCurrentPage(1);
                  }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    purpose === 'buy'
                      ? 'bg-brand-green-700 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPurpose('rent');
                    setCurrentPage(1);
                  }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    purpose === 'rent'
                      ? 'bg-brand-green-700 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  For Rent
                </button>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Property Type
              </label>
              <div className="space-y-1.5 text-xs font-medium">
                {(['Homes', 'Plots', 'Commercial', 'Flats'] as PropertyType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setType(t);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      type === t
                        ? 'bg-emerald-50 text-brand-green-800 font-bold border border-emerald-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                City / Region
              </label>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-600"
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

            {/* Bedrooms */}
            {type === 'Homes' || type === 'Flats' ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Min Bedrooms
                </label>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  {['', '1', '2', '3', '4+'].map((b) => (
                    <button
                      key={b || 'any'}
                      type="button"
                      onClick={() => {
                        setBedrooms(b === '4+' ? '4' : b);
                        setCurrentPage(1);
                      }}
                      className={`py-1.5 rounded-lg font-bold border transition-all ${
                        bedrooms === (b === '4+' ? '4' : b)
                          ? 'bg-brand-green-700 text-white border-brand-green-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {b || 'All'}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Quick Price Ranges */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Budget (PKR)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Listings Section (8 Items strictly + Pagination) */}
        <main className="lg:col-span-3 space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
              <p className="text-slate-500 text-sm">
                No properties matched your exact criteria in {city}.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-brand-green-700 text-white text-xs font-bold shadow"
              >
                Reset Filters & View All
              </button>
            </div>
          )}

          {/* Pagination Controls (Strict 8 Items/Page: Page 1, 2, 3, 4...) */}
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
                        ? 'bg-brand-green-700 text-white shadow-md'
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
        </main>
      </div>

      {/* Mobile Filters Slide-Over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Filters & Purpose</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                Purpose
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPurpose('buy')}
                  className={`py-2.5 text-xs font-bold rounded-xl ${
                    purpose === 'buy'
                      ? 'bg-brand-green-700 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose('rent')}
                  className={`py-2.5 text-xs font-bold rounded-xl ${
                    purpose === 'rent'
                      ? 'bg-brand-green-700 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  For Rent
                </button>
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['Homes', 'Plots', 'Commercial', 'Flats'] as PropertyType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`py-2.5 px-3 rounded-xl font-bold border text-left ${
                      type === t
                        ? 'bg-emerald-50 text-brand-green-800 border-brand-green-500'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Done Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3.5 bg-brand-green-700 text-white rounded-xl font-bold text-xs shadow-lg"
              >
                Done ({totalItems} Properties)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  CheckCircle2,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  ShieldCheck,
  Calculator,
  ArrowLeft,
  Star,
  Building,
} from 'lucide-react';
import { getPropertyById, getPropertyBySlug, submitInquiry } from '@/lib/db';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';

export default function PropertyDetailClient({ idOrSlug }: { idOrSlug: string }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Quick Loan Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(15);
  const [markupRate, setMarkupRate] = useState(16.5);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        let found = await getPropertyBySlug(idOrSlug);
        if (!found) {
          found = await getPropertyById(idOrSlug);
        }
        if (found) {
          setProperty(found);
          setSelectedImage(found.thumbnail_url || (found.images && found.images[0]) || '');
          setInquiryMessage(
            `Assalam-o-Alaikum, I am interested in "${found.title}" listed for ${formatPKRPrice(
              found.price
            )} in ${found.location}. Please provide details and schedule a site visit.`
          );
        }
      } catch (e) {
        console.error('Error loading property details:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [idOrSlug]);

  // Loan Calculation
  const propertyPrice = property?.price || 0;
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;
  const monthlyRate = markupRate / 100 / 12;
  const totalMonths = loanTenureYears * 12;
  const monthlyInstallment =
    loanPrincipal > 0 && monthlyRate > 0
      ? Math.round(
          (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;

    setSubmittingInquiry(true);
    try {
      await submitInquiry({
        name: inquiryName.trim(),
        phone: inquiryPhone.trim(),
        email: inquiryEmail.trim() || undefined,
        message: inquiryMessage.trim(),
        property_id: property?.id,
        property_title: property?.title,
      });
      setInquirySubmitted(true);
    } catch (e) {
      console.error('Inquiry submission failed:', e);
    } finally {
      setSubmittingInquiry(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 text-sm font-semibold">Loading verified property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Property Listing Not Found</h2>
        <p className="text-slate-500 text-sm">
          The requested property may have been sold or removed by the dealer.
        </p>
        <Link
          href="/properties"
          prefetch={false}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Available Properties</span>
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Assalam-o-Alaikum, I am inquiring about this property on citisproperty.com: "${property.title}" (Price: ${formatPKRPrice(property.price)} in ${property.location}, ${property.city}).`;
  const whatsappUrl = `https://wa.me/${property.agent_whatsapp || '923218653500'}?text=${encodeURIComponent(whatsappMessage)}`;
  const phoneUrl = `tel:${property.agent_phone || '03218653500'}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Bar */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" prefetch={false} className="hover:text-brand-gold-600">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/${property.type}/${property.city}`}
          prefetch={false}
          className="hover:text-brand-gold-600"
        >
          {property.type} in {property.city}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-xs">{property.title}</span>
      </nav>

      {/* Header Info Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-white ${
                property.purpose === 'buy' ? 'bg-gradient-to-r from-brand-gold-600 to-amber-600' : 'bg-blue-600'
              }`}
            >
              {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
              {property.type}
            </span>
            {property.is_featured && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-brand-gold-500 text-white flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-white" /> Featured
              </span>
            )}
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> 100% Document Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-brand-gold-600 flex-shrink-0" />
            <span>
              {property.location}, {property.city}
            </span>
          </div>
        </div>

        {/* Price Box */}
        <div className="text-left md:text-right bg-brand-gold-50/70 p-4 rounded-2xl border border-brand-gold-200/80">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-900 block">
            Demand Price
          </span>
          <div className="text-2xl sm:text-3xl font-black text-brand-gold-700">
            {property.price_prefix || 'PKR'} {formatPKRPrice(property.price)}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            ({property.area_size} {property.area_unit})
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery View */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm space-y-3 p-3">
            <div className="relative h-80 sm:h-[450px] w-full rounded-xl overflow-hidden bg-slate-950">
              <img
                src={selectedImage || property.thumbnail_url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Strip */}
            {property.images && property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === img
                        ? 'border-brand-gold-500 ring-2 ring-brand-gold-500/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specifications Strip */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Property Overview & Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Total Area</span>
                <span className="font-extrabold text-sm text-slate-900 mt-0.5 block">
                  {property.area_size} {property.area_unit}
                </span>
              </div>

              {property.bedrooms > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Bedrooms</span>
                  <span className="font-extrabold text-sm text-slate-900 mt-0.5 block">
                    {property.bedrooms} Master Beds
                  </span>
                </div>
              )}

              {property.bathrooms > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Bathrooms</span>
                  <span className="font-extrabold text-sm text-slate-900 mt-0.5 block">
                    {property.bathrooms} Attached Baths
                  </span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Property Purpose</span>
                <span className="font-extrabold text-sm text-slate-900 mt-0.5 block capitalize">
                  {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Property Details & Features</h3>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </div>
          </div>

          {/* Amenities & Facilities Checklist */}
          {property.features && property.features.length > 0 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Amenities & Infrastructure</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-gold-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Embedded Home Loan Calculator for this Property */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-brand-gold-50 text-brand-gold-600 flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Home Loan / Mortgage Estimator
                </h3>
                <p className="text-xs text-slate-500">
                  Estimated bank financing installment for {formatPKRPrice(property.price)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-brand-gold-600"
                />
                <span className="text-xs font-bold text-slate-800">
                  PKR {formatPKRPrice(downPaymentAmount)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Loan Tenure ({loanTenureYears} Years)
                </label>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="5"
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full accent-brand-gold-600"
                />
                <span className="text-xs font-bold text-slate-800">{loanTenureYears} Years</span>
              </div>

              <div className="bg-brand-gold-50 p-3.5 rounded-xl border border-brand-gold-200 text-center flex flex-col justify-center">
                <span className="text-[11px] font-bold text-brand-gold-900 uppercase">
                  Monthly Installment
                </span>
                <span className="text-base sm:text-lg font-black text-brand-gold-800">
                  PKR {monthlyInstallment.toLocaleString('en-PK')} / mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dealer Card & Inquiry Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5 sticky top-28">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-brand-gold-50 p-1 border border-brand-gold-300 flex-shrink-0">
                <img src="/logo.png" alt="Property Bank" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-gold-600 block">
                  Authorized Dealer
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                  {property.agent_name || 'Property Bank Real Estate'}
                </h4>
                <p className="text-xs text-brand-gold-700 font-bold mt-0.5">
                  Citi Housing Specialist
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={phoneUrl}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-brand-gold-600" />
                <span>Call {property.agent_phone || '0321-8653500'}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Send Direct Inquiry
              </h4>

              {inquirySubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900">Inquiry Received!</p>
                  <p className="text-[11px] text-emerald-700">
                    Our senior Property Bank agent will contact you shortly on WhatsApp/Call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile / WhatsApp Number *"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingInquiry}
                    className="w-full py-3.5 bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-amber-700 disabled:opacity-60 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-brand-gold-500/25 active:scale-95 transition-all"
                  >
                    {submittingInquiry ? 'Sending Inquiry...' : 'Submit Inquiry & Request Visit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

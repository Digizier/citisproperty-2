'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, CheckCircle2, Phone, ShieldCheck, ArrowLeft } from 'lucide-react';
import { submitInquiry } from '@/lib/db';

export default function PostListingPage() {
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [propertyType, setPropertyType] = useState('Homes');
  const [city, setCity] = useState('Faisalabad');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [areaSize, setAreaSize] = useState('5');
  const [areaUnit, setAreaUnit] = useState('Marla');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [details, setDetails] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName.trim() || !ownerPhone.trim() || !location.trim()) return;

    setSubmitting(true);
    try {
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
      const listingData = {
        title: `${areaSize} ${areaUnit} ${propertyType} in ${location}`,
        purpose,
        type: propertyType,
        city,
        location,
        price: numericPrice,
        price_prefix: 'PKR',
        area_size: parseFloat(areaSize) || 5,
        area_unit: areaUnit,
        description: details.trim() || `Client submitted listing in ${location}, ${city}. Demand: PKR ${price}.`,
        agent_name: ownerName.trim(),
        agent_phone: ownerPhone.trim(),
        agent_whatsapp: ownerPhone.trim().replace(/^0/, '92').replace(/[^0-9]/g, ''),
      };

      const summaryMsg = `[PROPERTY SUBMISSION] Purpose: ${purpose.toUpperCase()} | Type: ${propertyType} | City: ${city} | Location: ${location} | Demand: PKR ${price} | Size: ${areaSize} ${areaUnit} | Additional Notes: ${details}`;
      await submitInquiry({
        name: ownerName.trim(),
        phone: ownerPhone.trim(),
        message: summaryMsg,
        property_title: `Client Listing: ${areaSize} ${areaUnit} ${propertyType} in ${location}`,
        status: 'New',
        type: 'Listing Submission',
        listing_data: listingData,
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Error submitting listing:', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Post Your Property for Sale / Rent
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          List your plot, house, or commercial unit with Property Bank Real Estate. Get connected with verified overseas and local buyers.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-900">Property Submitted Successfully!</h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Our Citi Housing listing specialist will verify your property details and contact you on <strong>{ownerPhone}</strong> to publish your listing.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link
                href="/"
                prefetch={false}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Purpose */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                1. Purpose
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setPurpose('buy')}
                  className={`py-3 rounded-xl font-bold text-xs transition-all ${
                    purpose === 'buy'
                      ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Want to Sell
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose('rent')}
                  className={`py-3 rounded-xl font-bold text-xs transition-all ${
                    purpose === 'rent'
                      ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Want to Rent Out
                </button>
              </div>
            </div>

            {/* Type & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800"
                >
                  <option value="Homes">Houses / Homes</option>
                  <option value="Plots">Residential Plots</option>
                  <option value="Commercial">Commercial (Shops / Plazas)</option>
                  <option value="Flats">Flats / Apartments</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800"
                >
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Gujranwala">Gujranwala</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Jhelum">Jhelum</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>
            </div>

            {/* Location & Size */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Exact Location / Society & Block *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Citi Housing Sargodha Road, Block B, Street 4"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Area Size
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={areaSize}
                    onChange={(e) => setAreaSize(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                  />
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                  >
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                    <option value="Sq. Ft">Sq. Ft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Demand Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Your Demand Price (PKR) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 75 Lac or 3.2 Crore"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
              />
            </div>

            {/* Owner Details */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="03XX-XXXXXXX"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>
            </div>

            {/* Additional details */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Additional Property Features / Comments (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Corner plot facing park, possession paid, urgent sale..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-brand-gold-700 disabled:opacity-50 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all"
            >
              {submitting ? 'Submitting Property...' : 'Submit Property for Verification & Publishing'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

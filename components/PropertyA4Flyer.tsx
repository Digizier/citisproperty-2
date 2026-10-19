'use client';

import React, { forwardRef } from 'react';
import {
  MapPin,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  Building2,
  Bed,
  Bath,
  Maximize2,
  Check,
} from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';

interface PropertyA4FlyerProps {
  property: Property;
  className?: string;
}

const DEFAULT_AMENITIES = [
  'Electricity (24/7)',
  'Sui Gas Supply',
  'Clean Water Supply',
  'Underground Sewerage',
  '24/7 Security & CCTV',
  'Gated Community',
  'Near Mosque',
  'Near Commercial Area',
  'Parks & Green Belts',
  'Boundary Wall',
  'Wide Carpeted Roads',
  'Street Lights',
];

const PropertyA4Flyer = forwardRef<HTMLDivElement, PropertyA4FlyerProps>(
  ({ property, className = '' }, ref) => {
    const priceText = formatPKRPrice(property.price);
    const mainImage =
      property.thumbnail_url ||
      (Array.isArray(property.images) && property.images.find((img) => img && img.trim().length > 0)) ||
      '/logo.png';

    // Additional gallery images (photos 2, 3, 4, 5)
    const galleryImages = Array.isArray(property.images)
      ? property.images
          .filter((img) => img && typeof img === 'string' && img.trim().length > 0 && img !== mainImage)
          .slice(0, 4)
      : [];

    // Fallback if gallery is empty: repeat main or show clean placeholders
    const displayGallery =
      galleryImages.length > 0
        ? galleryImages
        : [mainImage];

    // Amenities list (property.features or default)
    const amenities =
      Array.isArray(property.features) && property.features.length > 0
        ? property.features
        : DEFAULT_AMENITIES;

    return (
      <div
        ref={ref}
        style={{ width: '794px', minHeight: '1123px', boxSizing: 'border-box' }}
        className={`bg-white text-slate-900 font-sans p-6 flex flex-col justify-between space-y-4 shadow-2xl ${className}`}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-950 rounded-2xl p-4 text-white border-b-4 border-amber-500 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center flex-shrink-0 shadow-inner">
              <img
                src="/logo.png"
                alt="Property Bank"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <span className="text-[11px] font-black tracking-widest uppercase text-amber-400 block">
                CITY HOUSING (PVT) LTD
              </span>
              <h2 className="text-lg font-black text-white tracking-tight leading-tight">
                PROPERTY BANK REAL ESTATE
              </h2>
              <p className="text-[10px] text-slate-300 font-medium">
                Authorized Citi Housing Dealership • Faisalabad | Gujranwala | Sialkot | Jhelum
              </p>
            </div>
          </div>

          {/* Demand Price Badge */}
          <div className="bg-gradient-to-r from-amber-500 via-brand-gold-500 to-amber-600 px-5 py-2.5 rounded-xl shadow-md text-right border border-amber-300/40">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-950 block">
              Demand Price
            </span>
            <div className="text-xl font-black text-slate-950 leading-tight">
              PKR {priceText}
            </div>
            <span className="text-[9px] font-bold text-slate-900 block">
              ({property.area_size} {property.area_unit})
            </span>
          </div>
        </div>

        {/* Main Property Showcase Block */}
        <div className="grid grid-cols-12 gap-4 items-stretch">
          {/* Main Cover Image */}
          <div className="col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex items-center justify-center h-[230px]">
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/logo.png';
              }}
            />
            <div className="absolute top-2.5 left-2.5 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified</span>
            </div>
          </div>

          {/* Property Info & Key Specs */}
          <div className="col-span-7 flex flex-col justify-between space-y-2 p-1">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md text-white ${
                    property.purpose === 'buy' ? 'bg-amber-600' : 'bg-blue-600'
                  }`}
                >
                  {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {property.type}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Ref: #{property.id.replace('prop-', '')}
                </span>
              </div>

              <h1 className="text-lg font-black text-slate-900 leading-snug">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>
                  {property.location}, {property.city}
                </span>
              </div>
            </div>

            {/* 4-Box Key Metrics Grid */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-center">
                <Home className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Type</span>
                <span className="text-xs font-black text-slate-900 truncate block">
                  {property.type}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-center">
                <Maximize2 className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Size</span>
                <span className="text-xs font-black text-slate-900 truncate block">
                  {property.area_size} {property.area_unit}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-center">
                <Bed className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Beds</span>
                <span className="text-xs font-black text-slate-900 truncate block">
                  {property.bedrooms > 0 ? `${property.bedrooms} Bed` : '-'}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-center">
                <Bath className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Baths</span>
                <span className="text-xs font-black text-slate-900 truncate block">
                  {property.bathrooms > 0 ? `${property.bathrooms} Bath` : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities & Features Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
              Amenities & Infrastructure
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {amenities.slice(0, 12).map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-[11px] font-bold text-slate-700"
              >
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-amber-700 stroke-[3]" />
                </div>
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Photos Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
              Photos & Views
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {displayGallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs"
              >
                <img
                  src={imgUrl}
                  alt={`Photo ${idx + 2}`}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo.png';
                  }}
                />
                <span className="absolute top-1.5 left-1.5 w-5 h-5 rounded-md bg-slate-950/80 text-white font-black text-[10px] flex items-center justify-center">
                  {idx + 2}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dealer Contact & Trust Details */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Left Card: Agent Contact */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">
              Authorized Dealership
            </span>
            <h4 className="font-extrabold text-sm text-slate-900">
              {property.agent_name || 'Property Bank Real Estate'}
            </h4>
            <div className="space-y-1 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Call: {property.agent_phone || '03218653500'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>WhatsApp: {property.agent_whatsapp || '923218653500'}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span className="truncate">
                  Citi Housing Sargodha & Samundri Road, Faisalabad
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: Dealership Trust */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-xl p-3.5 flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Your Trusted Partner in Real Estate
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium mt-1">
                Authorized marketing and investment consultants for Citi Housing projects across Pakistan.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-amber-300 tracking-wider">
              <span>✓ BUY</span>
              <span>•</span>
              <span>✓ SELL</span>
              <span>•</span>
              <span>✓ RENT</span>
              <span>•</span>
              <span>✓ INVEST</span>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-950 text-white rounded-xl px-4 py-2.5 flex items-center justify-between text-[10px] font-bold border-t-2 border-amber-500">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-black">citisproperty.com</span>
            <span>•</span>
            <span>Pakistan Luxury Living & Investment Dealership</span>
          </div>
          <div className="text-amber-400 font-black">
            100% Document Verified Property
          </div>
        </div>
      </div>
    );
  }
);

PropertyA4Flyer.displayName = 'PropertyA4Flyer';

export default PropertyA4Flyer;

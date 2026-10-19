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
  Tag,
} from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';

interface PropertyA4FlyerProps {
  property: Property;
  className?: string;
  pageNumber?: number;
  totalPages?: number;
}

const DEFAULT_AMENITIES = [
  'Electricity (24/7 Supply)',
  'Sui Gas Connection',
  'Clean Drinking Water',
  'Underground Sewerage',
  '24/7 Security & CCTV',
  'Gated Community',
  'Near Jamia Mosque',
  'Commercial Hub Access',
  'Lush Green Parks',
  'Boundary Wall',
  'Wide Carpeted Roads',
  'Modern Street Lights',
];

const PropertyA4Flyer = forwardRef<HTMLDivElement, PropertyA4FlyerProps>(
  ({ property, className = '', pageNumber = 1, totalPages = 1 }, ref) => {
    const priceText = formatPKRPrice(property.price);
    const mainImage =
      property.thumbnail_url ||
      (Array.isArray(property.images) && property.images.find((img) => img && img.trim().length > 0)) ||
      '/logo.png';

    // Additional gallery images (photos 2, 3, 4, 5)
    const allValidImages = Array.isArray(property.images)
      ? property.images.filter((img) => img && typeof img === 'string' && img.trim().length > 0)
      : [];

    const otherImages = allValidImages.filter((img) => img !== mainImage);
    const galleryImages = otherImages.slice(0, 4);

    // Fallback if gallery has fewer photos
    const displayGallery =
      galleryImages.length > 0
        ? galleryImages
        : otherImages.length > 0
        ? otherImages.slice(0, 4)
        : [mainImage];

    // Amenities list (property.features or default)
    const amenities =
      Array.isArray(property.features) && property.features.length > 0
        ? property.features
        : DEFAULT_AMENITIES;

    return (
      <div
        ref={ref}
        id="property-flyer-capture"
        style={{
          width: '794px',
          height: '1123px',
          minWidth: '794px',
          minHeight: '1123px',
          maxWidth: '794px',
          maxHeight: '1123px',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          overflow: 'hidden',
        }}
        className={`p-6 flex flex-col justify-between select-none ${className}`}
      >
        {/* Top Header Bar */}
        <div
          style={{
            height: '84px',
            boxSizing: 'border-box',
          }}
          className="bg-slate-950 rounded-2xl px-5 py-3 text-white border-b-4 border-amber-500 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-xl bg-white p-1.5 flex items-center justify-center flex-shrink-0 shadow-inner">
              <img
                src="/logo.png"
                alt="Property Bank"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <span className="text-[11px] font-black tracking-widest uppercase text-amber-400 block leading-tight">
                CITY HOUSING (PVT) LTD
              </span>
              <h2 className="text-[17px] font-black text-white tracking-tight leading-snug">
                PROPERTY BANK REAL ESTATE
              </h2>
              <p className="text-[10px] text-slate-300 font-medium leading-normal">
                Authorized Citi Housing Dealership • Faisalabad | Gujranwala | Sialkot | Jhelum
              </p>
            </div>
          </div>

          {/* Demand Price Badge */}
          <div
            style={{ minWidth: '170px' }}
            className="bg-gradient-to-r from-amber-500 via-brand-gold-500 to-amber-600 px-4 py-2 rounded-xl shadow-md text-right border border-amber-300/40"
          >
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-950 block leading-none">
              Demand Price
            </span>
            <div className="text-[19px] font-black text-slate-950 leading-tight mt-0.5">
              PKR {priceText}
            </div>
            <span className="text-[9px] font-bold text-slate-900 block leading-none">
              ({property.area_size} {property.area_unit})
            </span>
          </div>
        </div>

        {/* Main Property Showcase Block */}
        <div
          style={{ height: '240px', boxSizing: 'border-box' }}
          className="grid grid-cols-12 gap-4 items-stretch"
        >
          {/* Main Cover Image */}
          <div className="col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex items-center justify-center h-full">
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
          <div className="col-span-7 flex flex-col justify-between py-0.5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
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

              <h1
                style={{ lineHeight: '1.3' }}
                className="text-[17px] font-black text-slate-900 leading-snug line-clamp-2"
              >
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span style={{ lineHeight: '1.4' }}>
                  {property.location}, {property.city}
                </span>
              </div>
            </div>

            {/* 4-Box Key Metrics Grid - Completely Unclipped */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <div
                style={{
                  minHeight: '62px',
                  boxSizing: 'border-box',
                }}
                className="bg-slate-50 border border-slate-200/80 rounded-xl px-1.5 py-2 text-center flex flex-col justify-center items-center"
              >
                <Home className="w-3.5 h-3.5 text-amber-600 mb-0.5 shrink-0" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                  Type
                </span>
                <span
                  style={{ lineHeight: '1.3' }}
                  className="text-xs font-black text-slate-900 block"
                >
                  {property.type}
                </span>
              </div>

              <div
                style={{
                  minHeight: '62px',
                  boxSizing: 'border-box',
                }}
                className="bg-slate-50 border border-slate-200/80 rounded-xl px-1.5 py-2 text-center flex flex-col justify-center items-center"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-600 mb-0.5 shrink-0" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                  Size
                </span>
                <span
                  style={{ lineHeight: '1.3' }}
                  className="text-xs font-black text-slate-900 block"
                >
                  {property.area_size} {property.area_unit}
                </span>
              </div>

              <div
                style={{
                  minHeight: '62px',
                  boxSizing: 'border-box',
                }}
                className="bg-slate-50 border border-slate-200/80 rounded-xl px-1.5 py-2 text-center flex flex-col justify-center items-center"
              >
                <Bed className="w-3.5 h-3.5 text-amber-600 mb-0.5 shrink-0" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                  Beds
                </span>
                <span
                  style={{ lineHeight: '1.3' }}
                  className="text-xs font-black text-slate-900 block"
                >
                  {property.bedrooms > 0 ? `${property.bedrooms} Bed` : '-'}
                </span>
              </div>

              <div
                style={{
                  minHeight: '62px',
                  boxSizing: 'border-box',
                }}
                className="bg-slate-50 border border-slate-200/80 rounded-xl px-1.5 py-2 text-center flex flex-col justify-center items-center"
              >
                <Bath className="w-3.5 h-3.5 text-amber-600 mb-0.5 shrink-0" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                  Baths
                </span>
                <span
                  style={{ lineHeight: '1.3' }}
                  className="text-xs font-black text-slate-900 block"
                >
                  {property.bathrooms > 0 ? `${property.bathrooms} Bath` : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities & Features Section - Safe Padding, No Slicing */}
        <div style={{ height: '210px', boxSizing: 'border-box' }} className="space-y-2">
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
                style={{
                  height: '38px',
                  boxSizing: 'border-box',
                  lineHeight: '1.3',
                }}
                className="bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2 text-[11px] font-bold text-slate-700"
              >
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-amber-700 stroke-[3]" />
                </div>
                <span
                  style={{ lineHeight: '1.25' }}
                  className="text-[11px] font-bold text-slate-800 break-words line-clamp-1"
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Photos Section - Clean 4-Grid with Number Badges */}
        <div style={{ height: '175px', boxSizing: 'border-box' }} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
                Photos & Property Views
              </span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            {allValidImages.length > 5 && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                +{allValidImages.length - 5} More Photos in Full Brochure
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {displayGallery.map((imgUrl, idx) => (
              <div
                key={idx}
                style={{ height: '130px', boxSizing: 'border-box' }}
                className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs"
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
                <span className="absolute top-1.5 left-1.5 w-5 h-5 rounded-md bg-slate-950/85 text-white font-black text-[10px] flex items-center justify-center shadow-sm">
                  {idx + 2}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dealer Contact & Trust Details */}
        <div
          style={{ height: '145px', boxSizing: 'border-box' }}
          className="grid grid-cols-2 gap-3"
        >
          {/* Left Card: Agent Contact */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 flex flex-col justify-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block leading-none">
              Authorized Dealership
            </span>
            <h4
              style={{ lineHeight: '1.3' }}
              className="font-extrabold text-sm text-slate-900"
            >
              {property.agent_name || 'Property Bank Real Estate'}
            </h4>
            <div className="space-y-1 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span style={{ lineHeight: '1.3' }}>
                  Call: {property.agent_phone || '03218653500'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span style={{ lineHeight: '1.3' }}>
                  WhatsApp: {property.agent_whatsapp || '923218653500'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span style={{ lineHeight: '1.3' }} className="truncate">
                  Citi Housing Sargodha & Samundri Road, Faisalabad
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: Dealership Trust */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-xl p-3.5 flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Your Trusted Partner in Real Estate
                </span>
              </div>
              <p
                style={{ lineHeight: '1.35' }}
                className="text-[11px] text-slate-300 font-medium mt-1"
              >
                Authorized marketing and investment consultants for Citi Housing developments across Pakistan.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-amber-300 tracking-wider pt-1">
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

        {/* Footer Bar with Page Numbering */}
        <div
          style={{ height: '38px', boxSizing: 'border-box' }}
          className="bg-slate-950 text-white rounded-xl px-4 py-2 flex items-center justify-between text-[10px] font-bold border-t-2 border-amber-500"
        >
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-black">citisproperty.com</span>
            <span>•</span>
            <span>Pakistan Luxury Living & Investment Dealership</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-black">
              100% Document Verified Property
            </span>
            {totalPages > 1 && (
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[9px] font-black">
                Page {pageNumber} of {totalPages}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

PropertyA4Flyer.displayName = 'PropertyA4Flyer';

export default PropertyA4Flyer;

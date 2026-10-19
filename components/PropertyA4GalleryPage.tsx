'use client';

import React, { forwardRef } from 'react';
import { Phone, MessageCircle, MapPin, FileText, Image as ImageIcon } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';

interface PropertyA4GalleryPageProps {
  property: Property;
  photos: string[];
  startingPhotoIndex: number;
  pageNumber: number;
  totalPages: number;
  showDescription?: boolean;
  className?: string;
}

const PropertyA4GalleryPage = forwardRef<HTMLDivElement, PropertyA4GalleryPageProps>(
  (
    {
      property,
      photos,
      startingPhotoIndex,
      pageNumber,
      totalPages,
      showDescription = false,
      className = '',
    },
    ref
  ) => {
    const priceText = formatPKRPrice(property.price);

    return (
      <div
        ref={ref}
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
          style={{ height: '76px', boxSizing: 'border-box' }}
          className="bg-slate-950 rounded-2xl px-5 py-3 text-white border-b-4 border-amber-500 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-inner">
              <img
                src="/logo.png"
                alt="Property Bank"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-amber-400 block leading-tight">
                CITY HOUSING (PVT) LTD • PROPERTY BANK REAL ESTATE
              </span>
              <h2 className="text-[15px] font-black text-white tracking-tight leading-snug truncate max-w-md">
                {property.title}
              </h2>
              <p className="text-[10px] text-slate-300 font-medium leading-none">
                {property.location}, {property.city} • Ref: #{property.id.replace('prop-', '')}
              </p>
            </div>
          </div>

          {/* Demand Price */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1.5 rounded-xl shadow-md text-right border border-amber-300/40 shrink-0">
            <span className="text-[8px] font-black uppercase text-slate-950 block leading-none">
              Demand Price
            </span>
            <div className="text-[16px] font-black text-slate-950 leading-tight">
              PKR {priceText}
            </div>
          </div>
        </div>

        {/* Optional Property Description Section (Page 2) */}
        {showDescription && property.description && (
          <div
            style={{ maxHeight: '160px', boxSizing: 'border-box' }}
            className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                Detailed Property Overview & Description
              </span>
            </div>
            <p
              style={{ lineHeight: '1.45' }}
              className="text-[11px] text-slate-700 font-medium leading-relaxed line-clamp-5 whitespace-pre-line"
            >
              {property.description}
            </p>
          </div>
        )}

        {/* Extended Photos Gallery Grid */}
        <div className="flex-1 flex flex-col justify-start space-y-2 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span className="bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
                Photo Gallery — Additional Property Views
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-500">
              High Resolution Verified Photos
            </span>
          </div>

          <div
            className={`grid gap-3.5 ${
              photos.length <= 4 ? 'grid-cols-2' : 'grid-cols-3'
            }`}
          >
            {photos.map((imgUrl, idx) => (
              <div
                key={idx}
                style={{
                  height: showDescription ? '160px' : '230px',
                  boxSizing: 'border-box',
                }}
                className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm"
              >
                <img
                  src={imgUrl}
                  alt={`Gallery Photo ${startingPhotoIndex + idx}`}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo.png';
                  }}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/85 text-white font-black text-[11px] shadow-sm">
                  Photo {startingPhotoIndex + idx}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact Strip */}
        <div
          style={{ height: '70px', boxSizing: 'border-box' }}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center justify-between"
        >
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 block">
              Authorized Citi Housing Dealer
            </span>
            <div className="text-xs font-black text-slate-900">
              {property.agent_name || 'Property Bank Real Estate'}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Citi Housing Sargodha Road & Samundri Road, Faisalabad
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>{property.agent_phone || '03218653500'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg shadow-xs">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{property.agent_whatsapp || '923218653500'}</span>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div
          style={{ height: '36px', boxSizing: 'border-box' }}
          className="bg-slate-950 text-white rounded-xl px-4 py-2 flex items-center justify-between text-[10px] font-bold border-t-2 border-amber-500"
        >
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-black">citisproperty.com</span>
            <span>•</span>
            <span>Official Verified Listing Record</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-black">100% Document Verified</span>
            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[9px] font-black">
              Page {pageNumber} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

PropertyA4GalleryPage.displayName = 'PropertyA4GalleryPage';

export default PropertyA4GalleryPage;

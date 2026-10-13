'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Maximize2, MapPin, Phone, MessageCircle, Star } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const whatsappMessage = `Assalam-o-Alaikum, I am inquiring about this property on citisproperty.com: "${property.title}" (Price: ${formatPKRPrice(property.price)} in ${property.location}, ${property.city}).`;
  const whatsappUrl = `https://wa.me/${property.agent_whatsapp || '923218653500'}?text=${encodeURIComponent(whatsappMessage)}`;
  const phoneUrl = `tel:${property.agent_phone || '03218653500'}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-brand-green-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        {/* Flash Shimmer Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
        )}

        <Link href={`/property/${property.slug || property.id}`} prefetch={false}>
          <img
            src={property.thumbnail_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'}
            alt={property.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span
            className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white ${
              property.purpose === 'buy' ? 'bg-brand-green-700' : 'bg-blue-600'
            }`}
          >
            {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
          </span>
          {property.is_featured && (
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm bg-brand-gold-500 text-white flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" /> Featured
            </span>
          )}
        </div>

        {/* Type Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white">
            {property.type}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xl font-extrabold text-brand-green-700 tracking-tight">
              {property.price_prefix || 'PKR'} {formatPKRPrice(property.price)}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {property.area_size} {property.area_unit}
            </span>
          </div>

          {/* Title */}
          <Link href={`/property/${property.slug || property.id}`} prefetch={false}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-green-700 transition-colors line-clamp-2 mb-2 leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-brand-gold-600 flex-shrink-0" />
            <span className="truncate">
              {property.location}, {property.city}
            </span>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 mb-4">
            {property.bedrooms > 0 ? (
              <div className="flex items-center gap-1.5 justify-center">
                <Bed className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{property.bedrooms}</span> Beds
              </div>
            ) : (
              <div className="flex items-center gap-1.5 justify-center">
                <span className="text-slate-400">-</span>
              </div>
            )}

            {property.bathrooms > 0 ? (
              <div className="flex items-center gap-1.5 justify-center">
                <Bath className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{property.bathrooms}</span> Baths
              </div>
            ) : (
              <div className="flex items-center gap-1.5 justify-center">
                <span className="text-slate-400">-</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 justify-center">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{property.area_size}</span> {property.area_unit}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={phoneUrl}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 active:scale-95 transition-all text-center"
          >
            <Phone className="w-3.5 h-3.5 text-brand-green-600" />
            Call
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm hover:shadow active:scale-95 transition-all text-center"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

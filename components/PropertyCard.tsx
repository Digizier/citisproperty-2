'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Maximize2, MapPin, Phone, MessageCircle, Star, Share2, Check, Sparkles, Building, Layers } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';
import { parsePropertySpecs } from '@/lib/specs-helper';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const whatsappMessage = `Assalam-o-Alaikum, I am inquiring about this property on citisproperty.com: "${property.title}" (Price: ${formatPKRPrice(property.price)} in ${property.location}, ${property.city}).`;
  const whatsappUrl = `https://wa.me/${property.agent_whatsapp || '923218653500'}?text=${encodeURIComponent(whatsappMessage)}`;
  const phoneUrl = `tel:${property.agent_phone || '03218653500'}`;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/property/${property.slug || property.id}`
      : `https://citisproperty.com/property/${property.slug || property.id}`;

    const shareTitle = `${property.title} | CitisProperty.com`;
    const shareText = `Assalam-o-Alaikum, check out this property in ${property.location}, ${property.city} (${property.price_prefix || 'PKR'} ${formatPKRPrice(property.price)}):`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        console.warn('Native share aborted or failed:', err);
      }
    }

    // Fallback: Copy link to clipboard
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  const keySpecs = useMemo(() => {
    const parsed = parsePropertySpecs(property.features, property.bedrooms, property.bathrooms);
    const items: { key: string; icon: any; label: string }[] = [];

    // 1. Bedrooms if toggled ON and > 0
    if (parsed.show_bedrooms && property.bedrooms > 0) {
      items.push({
        key: 'beds',
        icon: Bed,
        label: `${property.bedrooms} Beds`,
      });
    }

    // 2. Bathrooms if toggled ON and > 0
    if (parsed.show_bathrooms && property.bathrooms > 0) {
      items.push({
        key: 'baths',
        icon: Bath,
        label: `${property.bathrooms} Baths`,
      });
    }

    // 3. Area Size
    items.push({
      key: 'area',
      icon: Maximize2,
      label: `${property.area_size} ${property.area_unit}`,
    });

    // 4. If fewer than 3 items (e.g. Beds or Baths toggled OFF), fill with active custom specs (e.g. Floors, Facing)
    for (const spec of parsed.active_custom_specs) {
      if (items.length >= 3) break;
      items.push({
        key: spec.key,
        icon: Sparkles,
        label: `${spec.key}: ${spec.value}`,
      });
    }

    // 5. If still fewer than 3 items, fill with Type or Purpose
    if (items.length < 3) {
      items.push({
        key: 'type',
        icon: Building,
        label: property.type || 'Property',
      });
    }

    if (items.length < 3) {
      items.push({
        key: 'purpose',
        icon: Layers,
        label: property.purpose === 'buy' ? 'For Sale' : 'For Rent',
      });
    }

    return items.slice(0, 3);
  }, [property]);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-brand-gold-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
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
            className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white ${
              property.purpose === 'buy' ? 'bg-gradient-to-r from-brand-gold-600 to-amber-600' : 'bg-blue-600'
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
            <span className="text-xl font-black text-slate-900 group-hover:text-brand-gold-700 tracking-tight transition-colors">
              {property.price_prefix || 'PKR'} {formatPKRPrice(property.price)}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {property.area_size} {property.area_unit}
            </span>
          </div>

          {/* Title */}
          <Link href={`/property/${property.slug || property.id}`} prefetch={false}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-gold-600 transition-colors line-clamp-2 mb-2 leading-snug">
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
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 mb-4">
            {keySpecs.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={item.key || idx} className="flex items-center gap-1.5 justify-center min-w-0">
                  <IconComp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold truncate text-[11px] sm:text-xs">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Call | Share (Native & All Apps) | WhatsApp */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
          <a
            href={phoneUrl}
            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1.5 sm:px-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 active:scale-95 transition-all text-center min-w-0"
            title="Call Agent"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold-600 shrink-0" />
            <span className="truncate">Call</span>
          </a>
          <button
            type="button"
            onClick={handleShare}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1.5 sm:px-2 rounded-xl text-xs font-bold active:scale-95 transition-all text-center min-w-0 cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 shadow-sm'
            }`}
            title="Share Property"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="truncate">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="truncate">Share</span>
              </>
            )}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1.5 sm:px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm hover:shadow active:scale-95 transition-all text-center min-w-0"
            title="WhatsApp Inquiry"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

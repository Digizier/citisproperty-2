'use client';

import React from 'react';
import { MapPin, ExternalLink, Compass, Navigation, CheckCircle2 } from 'lucide-react';

interface PropertyMapBoxProps {
  location?: string;
  city?: string;
  mapUrl?: string;
}

export function extractCoordsFromUrl(url: string): { lat: string; lng: string; placeName?: string } | null {
  if (!url) return null;
  const clean = url.trim();

  let placeName = '';
  const placeMatch = clean.match(/\/place\/([^/@?]+)/);
  if (placeMatch) {
    placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
  }

  // 1. Raw coordinates e.g. "24.8910246, 66.9790203" or "24.8910246,66.9790203"
  const rawMatch = clean.match(/^(-?\d{1,2}\.\d+)[,\s]+(-?\d{1,3}\.\d+)$/);
  if (rawMatch) {
    return { lat: rawMatch[1], lng: rawMatch[2], placeName };
  }

  // 2. Exact pin coords !3d(lat)!4d(lng) in Google Maps URLs
  const pinMatch = clean.match(/!3d(-?\d+(?:\.\d+)?)(?:!|%21|\/)4d(-?\d+(?:\.\d+)?)/);
  if (pinMatch) {
    return { lat: pinMatch[1], lng: pinMatch[2], placeName };
  }

  // 3. Query coords q=lat,lng or query=lat,lng or ll=lat,lng
  const qMatch = clean.match(/[?&](?:q|query|ll)=(-?\d+(?:\.\d+)?)[,+](-?\d+(?:\.\d+)?)/);
  if (qMatch) {
    return { lat: qMatch[1], lng: qMatch[2], placeName };
  }

  // 4. Viewport coords @lat,lng
  const atMatch = clean.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (atMatch) {
    return { lat: atMatch[1], lng: atMatch[2], placeName };
  }

  return placeName ? { lat: '', lng: '', placeName } : null;
}

export default function PropertyMapBox({
  location = '',
  city = '',
  mapUrl,
}: PropertyMapBoxProps) {
  // If no Google Map URL is provided, do NOT render Google Map box at all
  if (!mapUrl || !mapUrl.trim()) {
    return null;
  }

  const cleanMapUrl = mapUrl.trim();
  const coordsData = extractCoordsFromUrl(cleanMapUrl);

  // Compute live embed URL with guaranteed RED DROP PIN
  let embedSrc = '';
  if (coordsData && coordsData.lat && coordsData.lng) {
    // Exact coordinates guaranteed: Google Maps renders red marker pin at q=lat,lng
    embedSrc = `https://maps.google.com/maps?q=${coordsData.lat},${coordsData.lng}&hl=en&z=17&ie=UTF8&iwloc=addr&output=embed`;
  } else if (cleanMapUrl.includes('/embed')) {
    embedSrc = cleanMapUrl;
  } else if (coordsData?.placeName) {
    embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(coordsData.placeName)}&hl=en&z=17&ie=UTF8&iwloc=addr&output=embed`;
  } else {
    const query = location ? `${location}, ${city}, Pakistan` : `${city || 'Citi Housing'}, Pakistan`;
    embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=16&ie=UTF8&iwloc=addr&output=embed`;
  }

  // Official Google Maps search deep-link that drops an exact RED PIN
  const externalMapLink =
    coordsData && coordsData.lat && coordsData.lng
      ? `https://www.google.com/maps/search/?api=1&query=${coordsData.lat},${coordsData.lng}`
      : cleanMapUrl;

  const displayLocation =
    coordsData?.placeName ||
    (location ? `${location}, ${city}` : city || 'Citi Housing Project');

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <MapPin className="w-4 h-4 text-red-600 fill-red-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Location & Google Maps
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Exact verified property pinpoint and surrounding neighborhood
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: Open exact pin on Google Maps */}
        <a
          href={externalMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all self-start sm:self-auto cursor-pointer group"
          title="Open exact red pin in Google Maps app or browser"
        >
          <Navigation className="w-3.5 h-3.5 text-brand-gold-400 group-hover:scale-110 transition-transform" />
          <span>Open Location on Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Interactive Map Iframe Container */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
        <iframe
          src={embedSrc}
          title={`Google Map Pin Location for ${displayLocation}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Live Map Overlay Tag */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2 pointer-events-none">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
            Live Pin Location
          </span>
        </div>
      </div>

      {/* Footer bar with verified badge and location info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 truncate">
          <Compass className="w-4 h-4 text-brand-gold-600 flex-shrink-0" />
          <span className="font-medium truncate">{displayLocation}</span>
          {coordsData?.lat && coordsData?.lng && (
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              ({Number(coordsData.lat).toFixed(5)}, {Number(coordsData.lng).toFixed(5)})
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full self-start sm:self-auto">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Exact Pin Connected</span>
        </span>
      </div>
    </div>
  );
}

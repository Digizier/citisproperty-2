'use client';

import React from 'react';
import { MapPin, ExternalLink, Compass, Navigation } from 'lucide-react';

interface PropertyMapBoxProps {
  location?: string;
  city?: string;
  mapUrl?: string;
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

  // Compute live embed URL with intelligent coordinate/place extraction
  let embedSrc = '';
  if (cleanMapUrl.includes('/embed')) {
    embedSrc = cleanMapUrl;
  } else {
    // 1. Check for exact pin coords (!3d(lat)!4d(lng)) in Google Maps place URLs
    const pinMatch = cleanMapUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    // 2. Check for center/pin coords (@lat,lng)
    const atMatch = cleanMapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    // 3. Check for q=lat,lng or query=lat,lng
    const qMatch = cleanMapUrl.match(/[?&](?:q|query|ll)=(-?\d+\.\d+),(-?\d+\.\d+)/);
    // 4. Check for /place/Place+Name
    const placeMatch = cleanMapUrl.match(/\/place\/([^/@?]+)/);

    if (pinMatch) {
      embedSrc = `https://maps.google.com/maps?q=${pinMatch[1]},${pinMatch[2]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    } else if (atMatch) {
      embedSrc = `https://maps.google.com/maps?q=${atMatch[1]},${atMatch[2]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    } else if (qMatch) {
      embedSrc = `https://maps.google.com/maps?q=${qMatch[1]},${qMatch[2]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    } else if (placeMatch) {
      const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    } else {
      const query = location ? `${location}, ${city}, Pakistan` : `${city || 'Citi Housing'}, Pakistan`;
      embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }
  }

  // The external link opens the EXACT URL provided by the admin/user
  const externalMapLink = cleanMapUrl;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-gold-50 border border-brand-gold-200 flex items-center justify-center text-brand-gold-700">
              <MapPin className="w-4 h-4 text-brand-gold-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Location & Google Maps
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore surrounding sector, accessibility, and landmarks
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: Open on Google Maps */}
        <a
          href={externalMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all self-start sm:self-auto cursor-pointer group"
          title="Open exact location in Google Maps app or browser"
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
          title={`Google Map Location for ${location || city}`}
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
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-800">Live Map View</span>
        </div>
      </div>

      {/* Footer bar with verified badge and location info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Compass className="w-4 h-4 text-brand-gold-600 flex-shrink-0" />
          <span className="font-medium truncate">
            {location ? `${location}, ${city}` : city || 'Citi Housing Project'}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
          ✓ Verified Location Pin Connected
        </span>
      </div>
    </div>
  );
}

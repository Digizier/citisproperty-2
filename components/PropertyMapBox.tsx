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
  const fullLocationText = [location, city, 'Pakistan'].filter(Boolean).join(', ');

  // Compute the live embed URL
  let embedSrc = '';
  if (mapUrl && mapUrl.includes('/embed')) {
    embedSrc = mapUrl;
  } else {
    const query = location ? `${location}, ${city}` : city || 'Citi Housing, Pakistan';
    embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  // Compute the external Google Maps navigation URL
  const externalMapLink =
    mapUrl && mapUrl.trim()
      ? mapUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullLocationText)}`;

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

        {mapUrl ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
            ✓ Verified Location Pin Connected
          </span>
        ) : (
          <span className="text-[11px] text-slate-400">
            Sector & Society Pinpoint
          </span>
        )}
      </div>
    </div>
  );
}

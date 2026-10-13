'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getHeroBanners, DB_EVENTS } from '@/lib/db';
import { HeroBanner } from '@/lib/types';

export default function AnnouncementBanner() {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadBanners = async () => {
    const list = await getHeroBanners();
    setBanners(list);
  };

  useEffect(() => {
    loadBanners();
    const handleUpdate = () => loadBanners();
    window.addEventListener(DB_EVENTS.BANNERS_UPDATED, handleUpdate);
    return () => window.removeEventListener(DB_EVENTS.BANNERS_UPDATED, handleUpdate);
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const current = banners[currentIndex];

  return (
    <div className="bg-gradient-to-r from-brand-navy-950 via-brand-navy-900 to-brand-green-900 text-white text-xs py-2 px-4 border-b border-brand-gold-500/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          {current.badge && (
            <span className="bg-brand-gold-500 text-brand-navy-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex-shrink-0">
              {current.badge}
            </span>
          )}
          <span className="font-semibold text-white/90 truncate">{current.title}</span>
          {current.subtitle && (
            <span className="hidden md:inline text-white/60 truncate">— {current.subtitle}</span>
          )}
        </div>

        {current.link_url && (
          <Link
            href={current.link_url}
            prefetch={false}
            className="flex-shrink-0 flex items-center gap-1 font-bold text-brand-gold-400 hover:text-brand-gold-300 transition-colors ml-auto"
          >
            <span>Explore</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}

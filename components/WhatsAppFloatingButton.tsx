'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { getSiteSettings, DB_EVENTS } from '@/lib/db';
import { SiteSettings } from '@/lib/types';

export default function WhatsAppFloatingButton() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };
    fetchSettings();

    const handleUpdate = () => fetchSettings();
    window.addEventListener(DB_EVENTS.SETTINGS_UPDATED, handleUpdate);
    return () => window.removeEventListener(DB_EVENTS.SETTINGS_UPDATED, handleUpdate);
  }, []);

  const rawWhatsapp = settings?.whatsapp || '923218653500';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');

  const whatsappUrl =
    `https://wa.me/${cleanWhatsapp}?text=` +
    encodeURIComponent(
      'Assalam-o-Alaikum, I am inquiring about property listings and Citi Housing projects on citisproperty.com.'
    );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Property Bank on WhatsApp"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 active:scale-95 group"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
      </div>
      <span className="hidden sm:inline font-bold text-xs tracking-wide">
        WhatsApp Helpline
      </span>
    </a>
  );
}


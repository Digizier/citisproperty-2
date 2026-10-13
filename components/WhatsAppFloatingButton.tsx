'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const whatsappUrl = 'https://wa.me/923218653500?text=' + encodeURIComponent('Assalam-o-Alaikum, I am inquiring about property listings and Citi Housing projects on citisproperty.com.');

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Property Bank on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 active:scale-95 group"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
      </div>
      <span className="hidden sm:inline font-bold text-xs tracking-wide">
        WhatsApp Helpline
      </span>
    </a>
  );
}

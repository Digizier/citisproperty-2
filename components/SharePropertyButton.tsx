'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Share2, Copy, Check, X, MessageCircle } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';

interface SharePropertyButtonProps {
  property: Property;
  className?: string;
  variant?: 'badge' | 'button';
}

export default function SharePropertyButton({
  property,
  className = '',
  variant = 'badge',
}: SharePropertyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const canonical = `${window.location.origin}/property/${property.slug || property.id}/`;
      setShareUrl(window.location.href || canonical);
      setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
    }
  }, [property]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleCopyLink = async () => {
    const urlToCopy = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(urlToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = urlToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const propertyCover =
    property.thumbnail_url ||
    (Array.isArray(property.images) && property.images.find((img) => img && img.trim().length > 0)) ||
    '/logo.png';

  const priceFormatted = formatPKRPrice(property.price);

  const whatsappMessage = `Assalam-o-Alaikum, check out this property on Citi Housing (Property Bank Real Estate):\n\n🏡 *${property.title}*\n💰 *Demand:* PKR ${priceFormatted}\n📍 *Location:* ${property.location}, ${property.city}\n📏 *Area:* ${property.area_size} ${property.area_unit}\n\n🔗 *View Photos & Full Details:* ${shareUrl}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `${property.title} - Demand: PKR ${priceFormatted} (${property.location}, ${property.city})`,
          url: shareUrl,
        });
        setIsOpen(false);
      } catch (err) {
        // User dismissed share dialog
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      {variant === 'badge' ? (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Share property link"
          className="text-xs font-bold text-slate-800 bg-white hover:bg-brand-gold-50 border border-slate-300 hover:border-brand-gold-400 active:bg-brand-gold-100 px-3 py-1 rounded-md flex items-center gap-1.5 shadow-sm transition-all cursor-pointer group"
        >
          <Share2 className="w-3.5 h-3.5 text-brand-gold-600 group-hover:scale-110 transition-transform" />
          <span>Share Property</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Share this listing"
          className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-brand-gold-600" />
          <span>Share This Property</span>
        </button>
      )}

      {/* Popover / Modal */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 sm:translate-y-0 sm:inset-auto sm:absolute sm:top-full sm:left-0 sm:mt-2 w-auto sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-gold-50 flex items-center justify-center text-brand-gold-700">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                    Share Property
                  </h3>
                  <p className="text-[11px] text-slate-500">Send listing or copy link</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mini Property Summary Preview */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0 relative">
                <img
                  src={propertyCover}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo.png';
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">{property.title}</h4>
                <p className="text-xs font-extrabold text-brand-gold-700 mt-0.5">
                  PKR {priceFormatted}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {property.location}, {property.city}
                </p>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Share Directly
              </span>

              <div className="grid grid-cols-2 gap-2">
                {/* WhatsApp Button */}
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  <span>WhatsApp</span>
                </a>

                {/* Facebook Button */}
                <a
                  href={facebookShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>

              {/* Native Share button if supported */}
              {canNativeShare && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>More Sharing Options...</span>
                </button>
              )}
            </div>

            {/* Copy Link Input Bar */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Or Copy Link
              </label>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-transparent px-2 text-xs text-slate-700 font-medium truncate outline-none select-all"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-brand-gold-500 hover:bg-brand-gold-600 text-slate-950 shadow-sm'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              {copied && (
                <p className="text-[11px] font-semibold text-emerald-600 text-center animate-in fade-in">
                  ✓ Link copied to clipboard! Ready to share.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { X, Phone, MapPin, User, CheckCircle2, Sparkles, Loader2, Send } from 'lucide-react';
import { submitInquiry } from '@/lib/db';

const STORAGE_KEY = 'citis_popup_lead_v1';
const MAX_DAILY_IMPRESSIONS = 2;

interface PopupStorageData {
  submitted: boolean;
  date: string;
  count: number;
}

export default function LeadCapturePopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Status State
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsMounted(true);

    // Strictly Home Page only
    if (pathname !== '/') {
      return;
    }

    try {
      const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const raw = localStorage.getItem(STORAGE_KEY);
      let data: PopupStorageData = {
        submitted: false,
        date: todayStr,
        count: 0,
      };

      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') {
            data = {
              submitted: Boolean(parsed.submitted),
              date: parsed.date || todayStr,
              count: typeof parsed.count === 'number' ? parsed.count : 0,
            };
          }
        } catch {
          // If corrupted, fallback to clean state
        }
      }

      // If user already submitted their lead, NEVER show again
      if (data.submitted) {
        return;
      }

      // If it's a new day, reset daily counter
      if (data.date !== todayStr) {
        data.date = todayStr;
        data.count = 0;
      }

      // Check daily impression limit (Max 2 times per day)
      if (data.count >= MAX_DAILY_IMPRESSIONS) {
        return;
      }

      // Increment count for today and save
      data.count += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      // Direct instant show (no 2-second delay)
      setIsOpen(true);
    } catch {
      // Safe fallback if localStorage is restricted
      setIsOpen(true);
    }
  }, [pathname]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your full name');
      return;
    }

    if (!trimmedPhone || trimmedPhone.length < 7) {
      setErrorMessage('Please enter a valid phone or WhatsApp number');
      return;
    }

    setSubmitting(true);

    try {
      // Submit lead to Supabase inquiries table
      await submitInquiry({
        name: trimmedName,
        phone: trimmedPhone,
        message: trimmedAddress ? `Address: ${trimmedAddress}` : 'Address not specified',
        property_title: 'Instant Lead (Website Popup)',
        type: 'Direct Inquiry',
        status: 'New',
      });

      // Mark as submitted permanently so it never shows again
      try {
        const todayStr = new Date().toISOString().slice(0, 10);
        const data: PopupStorageData = {
          submitted: true,
          date: todayStr,
          count: MAX_DAILY_IMPRESSIONS,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // Safe fallback
      }

      setIsSuccess(true);

      // Auto close after 2.5s
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch (err) {
      console.error('Lead popup submission error:', err);
      setErrorMessage('Something went wrong. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isMounted || !isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) {
          handleClose();
        }
      }}
    >
      <div className="relative w-full max-w-md my-auto bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-brand-gold-500/40 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Subtle Decorative Golden Glow in Corner */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-gold-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close (X) Cancel Symbol Button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={submitting}
          aria-label="Close popup"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60 shadow cursor-pointer disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400/80 flex items-center justify-center text-emerald-400 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-white">Shukriya, {name}!</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aapki details successfully receive ho chuki hain. Hamari Citi Property specialist team jald hi aap se rabta karegi.
              </p>
            </div>
            <div className="pt-2 text-[11px] text-brand-gold-300 font-semibold inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Citi property Real Estate Faisalabad</span>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <div className="p-5 sm:p-6 space-y-4">
            {/* Header: Brand Logo & Title */}
            <div className="flex items-center gap-3.5 pr-8">
              <div className="relative w-12 h-12 rounded-2xl bg-slate-950 p-1.5 border border-brand-gold-500/40 shadow-inner flex-shrink-0 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Citi property Real Estate Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-gold-500/15 border border-brand-gold-500/30 text-[10px] font-bold text-brand-gold-300 tracking-wide uppercase">
                  <Sparkles className="w-3 h-3 text-brand-gold-400" />
                  <span>Get Up-to-Date Details</span>
                </div>
                <h2 id="lead-popup-title" className="text-base sm:text-lg font-black text-white leading-tight mt-1">
                  Citi property Real Estate
                </h2>
              </div>
            </div>

            {/* Subtext */}
            <p className="text-xs text-slate-300 leading-relaxed">
              Apna rabta darj karein taake aapko Citi Housing Faisalabad aur doosri prime locations ke up-to-date rates aur deals foran mil sakein.
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              {/* Field 1: Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Full Name <span className="text-brand-gold-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Apna poora naam likhein"
                    disabled={submitting}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-gold-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Field 2: Contact No */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Contact / WhatsApp No <span className="text-brand-gold-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0321 8653500"
                    disabled={submitting}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-gold-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Field 3: Address */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Address / City or Society
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Citi Housing Phase 1 / Samundri Road"
                    disabled={submitting}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-gold-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={submitting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-[2] py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-gold-500 via-brand-gold-400 to-amber-500 hover:from-brand-gold-600 hover:to-amber-600 text-slate-950 font-black text-xs inline-flex items-center justify-center gap-1.5 shadow-lg shadow-brand-gold-500/20 transition-all cursor-pointer disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Get Upto date</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="pt-1 text-center">
              <span className="text-[10px] text-slate-400">
                🔒 Your details are 100% confidential and safe with us.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

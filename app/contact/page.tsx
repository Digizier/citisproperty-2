'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Star,
  ExternalLink,
  CheckCircle2,
  Clock,
  Calendar,
  Building2,
  ShieldCheck,
  Navigation,
} from 'lucide-react';
import { submitInquiry, getSiteSettings, DB_EVENTS } from '@/lib/db';
import { SiteSettings } from '@/lib/types';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('Book a Free Site Visit (Citi Housing)');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };
    fetchSettings();

    // Check if user came from Google Business Profile Booking Link
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('action') === 'book-visit' || window.location.hash === '#book-visit') {
        setIsBookingMode(true);
        setServiceType('Book a Free Site Visit (Citi Housing)');
      }
    }

    const handleUpdate = () => fetchSettings();
    window.addEventListener(DB_EVENTS.SETTINGS_UPDATED, handleUpdate);
    return () => window.removeEventListener(DB_EVENTS.SETTINGS_UPDATED, handleUpdate);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);
    try {
      const formattedMessage = [
        `Service / Inquiry Type: ${serviceType}`,
        preferredDate ? `Preferred Date: ${preferredDate}` : null,
        message.trim() ? `Message: ${message.trim()}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      await submitInquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        message: formattedMessage,
        property_title: isBookingMode ? 'Google Booking - Free Site Visit Request' : `Website Contact: ${serviceType}`,
        status: 'New',
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Contact inquiry failed:', e);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappClean = (settings?.whatsapp || '923028658450').replace(/[^0-9]/g, '');
  const googleMapUrl = settings?.google_maps_url || 'https://share.google/Veaql80VOjBuNszbc';
  const googleReviewUrl = settings?.google_review_url || 'https://g.page/r/CWPTsi4M7yUMEBE/review';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/30 text-brand-gold-700 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-brand-gold-600" />
          <span>Property Bank Real Estate • Authorized Citi Housing Dealership</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Contact &amp; Book a Visit
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Official Authorized Dealership for Citi Housing (Pvt) Ltd in Faisalabad. Visit our offices on Samundri Road and Sargodha Road, or schedule a free site tour and consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Office Locations & Helplines */}
        <div className="lg:col-span-5 space-y-6">
          {/* Office 1: Citi Housing Samundri Road (Primary Dealership) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-bl-xl">
              Main Booking Office
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Citi Housing Samundri Road Office
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  <strong>Office # 11-AA, Main Commercial Market</strong>, Citi Housing, Samundri Road Near Main Gate, Faisalabad, 38000
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <span className="text-slate-500">Sales Hotline:</span>
              <a
                href="tel:03028658450"
                className="font-black text-brand-gold-700 hover:underline"
              >
                0302-8658450
              </a>
            </div>
          </div>

          {/* Office 2: Citi Housing Sargodha Road (Head Office) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Citi Housing Sargodha Road (Head Office)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  <strong>Main Sargodha Road</strong>, Opposite Allied Bank, Citi Housing, Faisalabad
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <span className="text-slate-500">Corporate Helpline:</span>
              <a
                href="tel:03218653500"
                className="font-black text-brand-gold-700 hover:underline"
              >
                0321-8653500 / 0321-9892535
              </a>
            </div>
          </div>

          {/* Timings & Map Action */}
          <div className="bg-slate-950 text-white p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Office Working Hours</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Monday to Sunday: <strong>09:00 AM — 10:00 PM</strong> (Open 7 Days a Week for Site Visits &amp; Transfers)
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 text-xs">
              <a
                href={googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black inline-flex items-center gap-1.5 shadow transition-all"
              >
                <Navigation className="w-4 h-4 fill-slate-950" />
                <span>Get Google Maps Directions</span>
              </a>
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Review Us on Google (4.5★)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Book a Site Visit & Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-black text-slate-900">Inquiry &amp; Booking Received!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to <strong>Property Bank Real Estate</strong>. Our senior consultant will call or message you on WhatsApp shortly to confirm your request.
              </p>
              <div className="pt-4">
                <a
                  href={`https://wa.me/${whatsappClean}?text=Hi%20Property%20Bank,%20I%20just%20submitted%20an%20inquiry%20on%20your%20website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black text-xl text-slate-900">
                    {isBookingMode ? 'Book a Free Site Visit' : 'Leave Us a Message / Book Visit'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Schedule an in-person Citi Housing tour or ask about plots, villas, and file transfers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookingMode(!isBookingMode)}
                  className="px-3 py-1 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 hover:bg-amber-100"
                >
                  {isBookingMode ? 'General Inquiry' : 'Book Site Visit'}
                </button>
              </div>

              {/* Service / Purpose Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  I am Interested In: *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Book a Free Site Visit (Citi Housing)">Book a Free Site Visit (Citi Housing Samundri / Sargodha Road)</option>
                  <option value="Buy Residential Plot (5, 10 Marla, 1 Kanal)">Buy Residential Plot (5, 10 Marla, 1 Kanal)</option>
                  <option value="Buy Designer Villa / House">Buy Luxury Designer Villa / House</option>
                  <option value="Commercial Plots &amp; Shops (Citi Gold Mark)">Commercial Plots &amp; Shops (Citi Gold Mark)</option>
                  <option value="Sell / Transfer Property File">Sell / Transfer Property File</option>
                  <option value="Rental Property / Tenant Inquiry">Rental Property / Tenant Inquiry</option>
                  <option value="General Property Consultation">General Property Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asif Sadiq / Muhammad Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0302-XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Preferred Visit Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Specific Requirements / Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your budget, preferred block (A, B, C, D, etc.), or plot size..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-brand-gold-500 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {submitting
                    ? 'Submitting Your Request...'
                    : isBookingMode
                    ? 'Confirm Site Visit Request'
                    : 'Submit Inquiry to Property Bank'}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

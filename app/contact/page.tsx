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
} from 'lucide-react';
import { submitInquiry, getSiteSettings, DB_EVENTS } from '@/lib/db';
import { SiteSettings } from '@/lib/types';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      await submitInquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        message: message.trim(),
        property_title: 'Direct Website Contact Inquiry',
        status: 'New',
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Contact inquiry failed:', e);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappClean = (settings?.whatsapp || '923218653500').replace(/[^0-9]/g, '');
  const phonesList: string[] = settings?.phones
    ? settings.phones.split(/[,/]/).map((s) => s.trim()).filter(Boolean)
    : ['0321-8653500', '0302-8658450'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contact Property Bank Real Estate
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Official Authorized Dealership for Citi Housing (Pvt) Ltd. Visit our offices or reach out directly via call and WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Phones */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-gold-600" />
              Direct Phone & WhatsApp Helplines
            </h3>
            <div className="space-y-3 text-xs">
              {phonesList.map((p, idx) => {
                const clean = p.replace(/[^0-9+]/g, '');
                return (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-slate-500 block">
                        {idx === 0 ? 'Primary Helpline:' : `Helpline ${idx + 1}:`}
                      </span>
                      <a
                        href={`tel:${clean}`}
                        className="font-extrabold text-sm text-brand-gold-700 hover:underline"
                      >
                        {p}
                      </a>
                    </div>
                    {idx === 0 ? (
                      <a
                        href={`https://wa.me/${whatsappClean}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                      >
                        WhatsApp
                      </a>
                    ) : (
                      <a
                        href={`tel:${clean}`}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors"
                      >
                        Call
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Office Address & Timing */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold-600" />
              Official Office Locations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {settings?.address || 'Property Bank Real Estate, Citi Housing Sargodha Road & Samundri Road, Faisalabad, Punjab, Pakistan.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Monday to Sunday: 9:00 AM — 10:00 PM (Active all 7 days)</span>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a
                href={settings?.google_maps_url || "https://maps.app.goo.gl/Umc7Ci9kQZN1GwVo6"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold inline-flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Open in Google Maps</span>
              </a>
              <a
                href={settings?.google_review_url || "https://g.page/r/CWPTsi4M7yUMEBE/review"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold inline-flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>Rate Us on Google</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for contacting Property Bank. Our senior consultant will respond to your inquiry shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-black text-xl text-slate-900 mb-1">Leave Us a Message</h3>
              <p className="text-xs text-slate-500 mb-4">
                Have questions regarding plot files, installments, or society transfers? Send us a message directly.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="03XX-XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Inquiry Details / Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you are looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-brand-gold-700 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
              >
                {submitting ? 'Sending Message...' : 'Send Message to Property Bank'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

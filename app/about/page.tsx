import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Users, Building, Phone, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest">
          Who We Are
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About Property Bank Real Estate & City Housing (Pvt) Ltd
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The premier authorized dealership and luxury property investment house dedicated to Citi Housing developments across Pakistan.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900">
              Transforming Real Estate with Trust & Transparency
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Property Bank Real Estate was founded with a singular objective: to eradicate ambiguity from property transactions in Pakistan. We specialize in premier developments by City Housing (Pvt) Ltd, offering authentic on-ground plots, luxury villas, and high-yield commercial properties.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you are an overseas Pakistani seeking safe investment in Faisalabad, Gujranwala, Sialkot, or Jhelum, or a local family building your dream home, our licensed property consultants ensure 100% legal verification and direct transfers with developer records.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
              alt="Citi Housing Luxury Living"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">100% Verified Titles</h3>
            <p className="text-xs text-slate-500">
              Direct verification from Citi Housing Head Office before any financial token.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <Users className="w-6 h-6 text-brand-gold-600" />
            <h3 className="font-bold text-sm text-slate-900">5,000+ Happy Families</h3>
            <p className="text-xs text-slate-500">
              Trusted by thousands of residents and overseas investors worldwide.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <Building className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Multi-City Network</h3>
            <p className="text-xs text-slate-500">
              Active footprints spanning Faisalabad, Gujranwala, Sialkot, and Jhelum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

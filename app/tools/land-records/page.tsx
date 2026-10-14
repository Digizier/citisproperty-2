import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, HelpCircle, CheckCircle2, Phone, AlertTriangle } from 'lucide-react';

export default function LandRecordsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-gold-50 text-brand-gold-800 border border-brand-gold-200/80 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-600" />
          <span>Legal & Documentation Advisory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Land Records & Property Verification Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Everything you need to know about Citi Housing file transfers, allotment letters, NDC (No Demand Certificate), and Punjab land registry verification.
        </p>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand-gold-500 text-slate-950 font-black text-sm flex items-center justify-center">
              1
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Citi Housing Allotment & Transfer Verification
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Before handing over token or bayana money, always request a physical verification from the Citi Housing Head Office. Property Bank Real Estate performs this verification directly with developer records.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Original Allotment Letter / Transfer Letter</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Clearance of Development Charges</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>No Demand Certificate (NDC) Issued</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Seller Biometric Verification at Office</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand-gold-500 text-slate-950 font-black text-sm flex items-center justify-center">
              2
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Understanding Transfer Taxes & FBR Stamp Duties (2026)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In Pakistan, real estate transfers involve Advance Income Tax (Section 236K for buyers and Section 236C for sellers) based on whether the parties are active FBR Tax Filers or Non-Filers.
          </p>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Important Tax Advisory:</span>
            </div>
            <p>
              Filers save substantially on federal transfer taxes. We recommend ensuring your Active Taxpayer Status on FBR Iris before the transfer date.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4 border border-brand-gold-500/30">
          <h3 className="text-xl font-bold">Need Personal Verification Assistance?</h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Our legal desk at Property Bank Real Estate handles documentation, stamp papers, and biometrics for Citi Housing properties.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <a
              href="tel:03218653500"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs shadow-lg transition-all"
            >
              Call Legal Desk: 0321-8653500
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

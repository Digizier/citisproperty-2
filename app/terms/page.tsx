import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="text-3xl font-black text-slate-900">Terms of Service</h1>
      <p className="text-xs text-slate-500">Effective Date: October 2026</p>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>
          Welcome to <strong>citisproperty.com</strong>. By accessing or using this portal, you agree to comply with the terms and conditions outlined below.
        </p>
        <h3 className="font-bold text-base text-slate-900 pt-2">1. Listing Accuracy & Prices</h3>
        <p>
          All plot prices, villa demands, and availability data are subject to real-time market fluctuations and physical confirmation at the time of token agreement.
        </p>
        <h3 className="font-bold text-base text-slate-900 pt-2">2. Official Transfers</h3>
        <p>
          Property Bank Real Estate facilitates documentation and guidance; final title transfers and allotment cards are subject to developer rules and biometric verifications at Citi Housing Head Office.
        </p>
      </div>
    </div>
  );
}

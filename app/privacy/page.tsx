import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: October 2026</p>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>
          At <strong>citisproperty.com</strong> (Property Bank Real Estate / City Housing (Pvt) Ltd), we are committed to safeguarding the personal privacy of our website visitors, clients, and investors.
        </p>
        <h3 className="font-bold text-base text-slate-900 pt-2">1. Information We Collect</h3>
        <p>
          When you fill out inquiry forms, mortgage calculator queries, or list a property, we may collect your name, phone/WhatsApp number, email address, and property specifications.
        </p>
        <h3 className="font-bold text-base text-slate-900 pt-2">2. How We Use Information</h3>
        <p>
          Your information is solely used to assist you with real estate inquiries, coordinate property visits, and facilitate official transfers with developer documentation. We never sell or distribute your data to third-party telemarketers.
        </p>
        <h3 className="font-bold text-base text-slate-900 pt-2">3. Data Security</h3>
        <p>
          All inquiries and client records are encrypted and protected using industry-standard security protocols.
        </p>
      </div>
    </div>
  );
}

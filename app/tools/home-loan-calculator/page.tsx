'use client';

import React, { useState } from 'react';
import { Calculator, Building, Landmark, Percent, Calendar, ArrowRight, Phone } from 'lucide-react';
import { formatNumber, formatPKRPrice } from '@/lib/utils';

export default function HomeLoanCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState<number>(35000000); // 3.5 Crore default
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25); // 25%
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [markupRate, setMarkupRate] = useState<number>(16.5); // KIBOR + Bank spread

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;
  const monthlyRate = markupRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  const monthlyInstallment =
    loanPrincipal > 0 && monthlyRate > 0
      ? Math.round(
          (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const totalPayment = monthlyInstallment * totalMonths;
  const totalMarkup = totalPayment - loanPrincipal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-brand-green-800 text-xs font-bold uppercase tracking-wider">
          <Landmark className="w-3.5 h-3.5" />
          <span>Pakistani Banks & Mortgage Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Home Loan / Mortgage Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Calculate your monthly financing installments, down payment requirement, and overall markup with standard Pakistani commercial bank rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sliders & Configuration */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Property Value */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Property Value
              </label>
              <span className="text-lg font-black text-brand-green-800">
                PKR {formatPKRPrice(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min="3000000"
              max="150000000"
              step="500000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-brand-green-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Down Payment % */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-base font-extrabold text-slate-800">
                PKR {formatPKRPrice(downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="60"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-brand-green-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Tenure Years */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Financing Tenure (Years)
              </label>
              <span className="text-base font-extrabold text-slate-800">
                {tenureYears} Years ({totalMonths} Months)
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="25"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-brand-green-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Markup Rate % */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Annual Interest / Markup Rate (%)
              </label>
              <span className="text-base font-extrabold text-slate-800">
                {markupRate}% p.a.
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="24"
              step="0.5"
              value={markupRate}
              onChange={(e) => setMarkupRate(Number(e.target.value))}
              className="w-full accent-brand-green-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-brand-navy-950 via-slate-900 to-brand-green-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-gold-400 block">
                Estimated Monthly Installment
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                PKR {formatNumber(monthlyInstallment)}
              </div>
              <span className="text-xs text-slate-400">per month for {tenureYears} years</span>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Loan Principal:</span>
                <span className="font-bold text-white">PKR {formatPKRPrice(loanPrincipal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Down Payment Required:</span>
                <span className="font-bold text-white">PKR {formatPKRPrice(downPaymentAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Markup to Bank:</span>
                <span className="font-bold text-amber-400">PKR {formatPKRPrice(totalMarkup)}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/923218653500?text=Assalam-o-Alaikum, I need guidance regarding Home Loan financing for Citi Housing property."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-brand-green-700 hover:bg-brand-green-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Bank Loan Advisory on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

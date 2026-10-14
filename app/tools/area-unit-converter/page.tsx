'use client';

import React, { useState } from 'react';
import { RefreshCw, Calculator, ArrowRightLeft } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function AreaUnitConverterPage() {
  const [inputValue, setInputValue] = useState<number>(5);
  const [fromUnit, setFromUnit] = useState<'marla' | 'kanal' | 'sqft' | 'sqyd' | 'sqm' | 'acre'>('marla');

  // Base unit: Square Feet
  // Standard Punjab Real Estate: 1 Marla = 225 sq ft
  const toSqFtMultiplier = {
    marla: 225,
    kanal: 4500,
    sqft: 1,
    sqyd: 9,
    sqm: 10.7639,
    acre: 36000,
  };

  const sqFtValue = inputValue * toSqFtMultiplier[fromUnit];

  const conversions = {
    marla: (sqFtValue / 225),
    kanal: (sqFtValue / 4500),
    sqft: sqFtValue,
    sqyd: (sqFtValue / 9),
    sqm: (sqFtValue / 10.7639),
    acre: (sqFtValue / 36000),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Real Estate Area Unit Converter
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Instant real-time conversion between Marla, Kanal, Square Feet, Square Yards (Gaz), Square Meters, and Acre (Punjab 225 sq ft standard).
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Enter Area Quantity
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Unit
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
            >
              <option value="marla">Marla (225 sq ft)</option>
              <option value="kanal">Kanal (20 Marla / 4,500 sq ft)</option>
              <option value="sqft">Square Feet (Sq. Ft)</option>
              <option value="sqyd">Square Yards / Gaz (Sq. Yds)</option>
              <option value="sqm">Square Meters (Sq. M)</option>
              <option value="acre">Acre (8 Kanal)</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Converted Values Across All Units
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-brand-gold-50/70 border border-brand-gold-200/80">
              <span className="text-[11px] font-bold uppercase text-brand-gold-800">Marla</span>
              <div className="text-xl font-black text-brand-gold-700 mt-1">
                {conversions.marla.toFixed(conversions.marla % 1 === 0 ? 0 : 2)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-500">Kanal</span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {conversions.kanal.toFixed(conversions.kanal % 1 === 0 ? 0 : 3)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-500">Square Feet</span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {formatNumber(Math.round(conversions.sqft))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-500">Square Yards (Gaz)</span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {formatNumber(Math.round(conversions.sqyd))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-500">Square Meters</span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {conversions.sqm.toFixed(1)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-500">Acre</span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {conversions.acre.toFixed(conversions.acre % 1 === 0 ? 0 : 3)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

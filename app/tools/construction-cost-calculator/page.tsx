'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Building,
  Hammer,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function ConstructionCostCalculatorPage() {
  const [plotSize, setPlotSize] = useState<'5m' | '10m' | '1k' | 'custom'>('5m');
  const [coveredArea, setCoveredArea] = useState<number>(1975); // sq ft for 5 Marla double storey
  const [constructionTier, setConstructionTier] = useState<'grey' | 'standard' | 'luxury'>('standard');

  const handlePlotSelect = (size: '5m' | '10m' | '1k' | 'custom') => {
    setPlotSize(size);
    if (size === '5m') setCoveredArea(1975);
    else if (size === '10m') setCoveredArea(3300);
    else if (size === '1k') setCoveredArea(5900);
  };

  // 2026 Pakistan Construction Rates (per sq ft)
  const rates = {
    grey: 2800,
    standard: 4600,
    luxury: 6400,
  };

  const ratePerSqFt = rates[constructionTier];
  const grandTotalCost = coveredArea * ratePerSqFt;

  // Material Breakdown Percentages
  const breakdown = {
    grey: {
      bricks: { pct: 0.14, label: 'Bricks & Blockwork' },
      cement: { pct: 0.22, label: 'Cement (OPC Grade A)' },
      steel: { pct: 0.26, label: 'Deformed Steel / Rebar (Grade 60)' },
      sandCrush: { pct: 0.12, label: 'Chenab Sand, Margalla Crush & Rori' },
      labor: { pct: 0.18, label: 'Contractor Labor & Formwork' },
      plumbingElectricGrey: { pct: 0.08, label: 'Piping & Underground Conduits' },
    },
    finishing: {
      tiles: { pct: 0.18, label: 'Imported / Master Porcelain Tiles & Bathware' },
      woodDoors: { pct: 0.16, label: 'Ash Wood Doors, Wardrobes & Kitchen Cabinets' },
      electrical: { pct: 0.14, label: 'Pakistan Cables, LED Lights, Fans & Switches' },
      paintFinishing: { pct: 0.12, label: 'Rockwall, Weather Sheet & False Ceilings' },
      fittingsMetal: { pct: 0.10, label: 'Railing, Windows (Double Glaze), Main Gate' },
      laborFinishing: { pct: 0.30, label: 'Finishing Labor & Sanitary Installation' },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-brand-green-800 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5" />
          <span>Updated for 2026 Material Rates in Pakistan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          House Construction Cost Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Estimate material quantities, labor costs, and turnkey finishing budgets for building your house in Citi Housing societies.
        </p>
      </div>

      {/* Main Interactive Tool Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Interactive Configuration */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          {/* Step 1: Select Plot Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              1. Choose House Plot Size
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => handlePlotSelect('5m')}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  plotSize === '5m'
                    ? 'border-brand-green-600 bg-emerald-50/60 text-brand-green-900 font-bold ring-2 ring-brand-green-600/30'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-base font-extrabold">5 Marla</div>
                <div className="text-[11px] text-slate-500 mt-1">~1,975 sq. ft covered</div>
              </button>

              <button
                type="button"
                onClick={() => handlePlotSelect('10m')}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  plotSize === '10m'
                    ? 'border-brand-green-600 bg-emerald-50/60 text-brand-green-900 font-bold ring-2 ring-brand-green-600/30'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-base font-extrabold">10 Marla</div>
                <div className="text-[11px] text-slate-500 mt-1">~3,300 sq. ft covered</div>
              </button>

              <button
                type="button"
                onClick={() => handlePlotSelect('1k')}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  plotSize === '1k'
                    ? 'border-brand-green-600 bg-emerald-50/60 text-brand-green-900 font-bold ring-2 ring-brand-green-600/30'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-base font-extrabold">1 Kanal</div>
                <div className="text-[11px] text-slate-500 mt-1">~5,900 sq. ft covered</div>
              </button>

              <button
                type="button"
                onClick={() => handlePlotSelect('custom')}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  plotSize === 'custom'
                    ? 'border-brand-green-600 bg-emerald-50/60 text-brand-green-900 font-bold ring-2 ring-brand-green-600/30'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-base font-extrabold">Custom</div>
                <div className="text-[11px] text-slate-500 mt-1">Specify Area</div>
              </button>
            </div>
          </div>

          {/* Step 2: Covered Area Slider / Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Total Covered Area (Square Feet)
              </label>
              <span className="text-base font-extrabold text-brand-green-800">
                {formatNumber(coveredArea)} Sq. Ft
              </span>
            </div>
            <input
              type="range"
              min="800"
              max="12000"
              step="50"
              value={coveredArea}
              onChange={(e) => {
                setCoveredArea(Number(e.target.value));
                setPlotSize('custom');
              }}
              className="w-full accent-brand-green-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>800 sq ft</span>
              <span>6,000 sq ft</span>
              <span>12,000 sq ft</span>
            </div>
          </div>

          {/* Step 3: Construction Quality Tier */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              3. Scope of Construction & Quality Standard
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setConstructionTier('grey')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  constructionTier === 'grey'
                    ? 'border-brand-green-600 bg-emerald-50/60 ring-2 ring-brand-green-600/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-extrabold text-sm text-slate-900">Grey Structure Only</div>
                <div className="text-xs text-brand-green-700 font-bold mt-1">
                  ~Rs. {rates.grey} / sq. ft
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Bricks, cement, steel, underground wiring, piping & plaster.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setConstructionTier('standard')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  constructionTier === 'standard'
                    ? 'border-brand-green-600 bg-emerald-50/60 ring-2 ring-brand-green-600/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-extrabold text-sm text-slate-900">Complete Standard</div>
                <div className="text-xs text-brand-green-700 font-bold mt-1">
                  ~Rs. {rates.standard} / sq. ft
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Turnkey finishing with Master tiles, Ash doors & electrical fixtures.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setConstructionTier('luxury')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  constructionTier === 'luxury'
                    ? 'border-brand-green-600 bg-emerald-50/60 ring-2 ring-brand-green-600/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-extrabold text-sm text-slate-900">Premium Luxury / A+</div>
                <div className="text-xs text-brand-green-700 font-bold mt-1">
                  ~Rs. {rates.luxury} / sq. ft
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Italian porcelain, Grohe sanitary, smart lighting, imported kitchens.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Cost Summary & Itemized Breakdown */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-brand-navy-950 via-slate-900 to-brand-green-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-gold-400 block">
                Estimated Total Investment
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                PKR {formatNumber(grandTotalCost)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Based on Rs. {ratePerSqFt} / sq. ft for {formatNumber(coveredArea)} sq. ft
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Structure / Civil Work:</span>
                <span className="font-bold text-white">
                  PKR {formatNumber(Math.round(grandTotalCost * 0.58))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Finishing Materials:</span>
                <span className="font-bold text-white">
                  PKR {formatNumber(Math.round(grandTotalCost * 0.28))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Labor & Contractor Margins:</span>
                <span className="font-bold text-white">
                  PKR {formatNumber(Math.round(grandTotalCost * 0.14))}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="tel:03218653500"
                className="w-full py-3 bg-brand-green-700 hover:bg-brand-green-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Consult with Construction Team</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Star,
  ExternalLink,
  ShieldCheck,
  Building,
  Lock,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 bg-white/5 rounded-2xl p-1 border border-brand-gold-500/30 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="City Housing (Pvt) Ltd - Property Bank Real Estate"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-black text-white uppercase text-base tracking-tight leading-tight">
                  City Housing <span className="text-brand-gold-400 text-xs font-bold">(Pvt) Ltd</span>
                </h3>
                <p className="text-xs font-bold text-brand-gold-400 uppercase tracking-wider mt-0.5">
                  Property Bank Real Estate
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Official authorized dealers and premier luxury living advisors for Citi Housing Faisalabad, Gujranwala, Sialkot, and Jhelum. Dedicated to 100% transparent transfers and high-yield real estate investments.
            </p>

            {/* Google Review Badge */}
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">Client Satisfaction Rating</span>
                <div className="flex text-amber-400">
                  {'★'.repeat(5)}
                </div>
              </div>
              <a
                href="https://g.page/r/CWPTsi4M7yUMEBE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-brand-gold-400 hover:text-brand-gold-300 font-semibold transition-colors"
              >
                <span>Leave a Google Review</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Real Estate Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Properties for Sale
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/Homes/Faisalabad" prefetch={false} className="hover:text-white transition-colors">
                  Houses in Citi Housing Faisalabad
                </Link>
              </li>
              <li>
                <Link href="/Plots/Faisalabad" prefetch={false} className="hover:text-white transition-colors">
                  Residential Plots on Sargodha Road
                </Link>
              </li>
              <li>
                <Link href="/Plots/Faisalabad" prefetch={false} className="hover:text-white transition-colors">
                  Plots on Samundri Road Faisalabad
                </Link>
              </li>
              <li>
                <Link href="/Commercial/Faisalabad" prefetch={false} className="hover:text-white transition-colors">
                  Citi Gold Mark Commercial Shops
                </Link>
              </li>
              <li>
                <Link href="/Rentals/Faisalabad" prefetch={false} className="hover:text-white transition-colors">
                  Furnished Rental Houses & Villas
                </Link>
              </li>
              <li>
                <Link href="/new-projects" prefetch={false} className="hover:text-white transition-colors">
                  Latest Citi Housing New Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Real Estate Calculators & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Calculators & Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/tools/construction-cost-calculator" prefetch={false} className="hover:text-white transition-colors">
                  Construction Cost Calculator 2026
                </Link>
              </li>
              <li>
                <Link href="/tools/home-loan-calculator" prefetch={false} className="hover:text-white transition-colors">
                  Home Loan / Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/area-unit-converter" prefetch={false} className="hover:text-white transition-colors">
                  Area Unit Converter (Marla, Kanal, Sq. Ft)
                </Link>
              </li>
              <li>
                <Link href="/tools/land-records" prefetch={false} className="hover:text-white transition-colors">
                  Land Records & Registry Guide
                </Link>
              </li>
              <li>
                <Link href="/society-maps" prefetch={false} className="hover:text-white transition-colors">
                  Master Society Maps & Sectors
                </Link>
              </li>
              <li>
                <Link href="/plotfinder" prefetch={false} className="hover:text-white transition-colors">
                  Interactive Plot Finder
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Office Details */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Official Head Office & Dealership
            </h4>

            <div className="flex items-start gap-3 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-brand-gold-500 flex-shrink-0 mt-0.5" />
              <span>
                Property Bank Real Estate, Citi Housing Sargodha Road & Samundri Road, Faisalabad, Punjab, Pakistan
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
              <div className="space-x-2">
                <a href="tel:03218653500" className="hover:text-white transition-colors">
                  0321-8653500
                </a>
                <span>/</span>
                <a href="tel:03028658450" className="hover:text-white transition-colors">
                  0302-8658450
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <a href="mailto:info@citisproperty.com" className="hover:text-white transition-colors">
                info@citisproperty.com
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a
                href="https://maps.app.goo.gl/Umc7Ci9kQZN1GwVo6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <MapPin className="w-3 h-3 text-red-400" />
                <span>Google Maps</span>
              </a>
              <a
                href="https://www.facebook.com/share/1EM79fibhT/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Citi Housing (Pvt) Ltd — Property Bank Real Estate. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" prefetch={false} className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" prefetch={false} className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            {/* Discreet Admin Link */}
            <Link
              href="/admin"
              prefetch={false}
              className="hover:text-slate-400 transition-colors flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-300"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

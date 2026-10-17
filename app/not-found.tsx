'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import PropertyDetailClient from '@/components/PropertyDetailClient';

export default function NotFound() {
  const [propertyIdOrSlug, setPropertyIdOrSlug] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname || '';
      // Intercept /property/:id or /property/:slug paths
      const match = pathname.match(/^\/property\/([^/]+)/i);
      if (match && match[1]) {
        setPropertyIdOrSlug(decodeURIComponent(match[1]));
      }
      setIsChecking(false);
    }
  }, []);

  if (propertyIdOrSlug) {
    return <PropertyDetailClient idOrSlug={propertyIdOrSlug} />;
  }

  if (isChecking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-brand-gold-50 text-brand-gold-700 mx-auto flex items-center justify-center font-black text-2xl border border-brand-gold-200">
          404
        </div>
        <h1 className="text-2xl font-black text-slate-900">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          The property listing or portal page you are looking for has been moved or does not exist.
        </p>
        <div>
          <Link
            href="/"
            prefetch={false}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

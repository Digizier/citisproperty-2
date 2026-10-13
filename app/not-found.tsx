import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-brand-green-700 mx-auto flex items-center justify-center font-black text-2xl border border-emerald-200">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

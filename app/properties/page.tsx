import React, { Suspense } from 'react';
import PropertyListContent from '@/components/PropertyListContent';

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 text-sm">
          Loading property catalog...
        </div>
      }
    >
      <PropertyListContent pageTitle="Verified Properties in Pakistan — Citi Housing" />
    </Suspense>
  );
}

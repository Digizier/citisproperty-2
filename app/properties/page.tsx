import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import PropertyListContent from '@/components/PropertyListContent';

export const metadata: Metadata = {
  title: 'All Verified Properties for Sale & Rent — Citi Housing | Property Bank',
  description:
    'Browse 100% document-verified houses, residential plots, and commercial properties across Citi Housing Faisalabad, Gujranwala, Sialkot, and Jhelum.',
  alternates: {
    canonical: 'https://citisproperty.com/properties/',
  },
  openGraph: {
    title: 'All Verified Properties for Sale & Rent — Citi Housing | Property Bank',
    description:
      'Browse 100% document-verified houses, residential plots, and commercial properties across Citi Housing Faisalabad, Gujranwala, Sialkot, and Jhelum.',
    url: 'https://citisproperty.com/properties/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

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

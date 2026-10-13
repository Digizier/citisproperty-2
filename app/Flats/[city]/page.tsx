import React, { Suspense } from 'react';
import PropertyListContent from '@/components/PropertyListContent';

export async function generateStaticParams() {
  const cities = ['Faisalabad', 'Gujranwala', 'Sialkot', 'Jhelum', 'Lahore', 'Islamabad'];
  return cities.map((city) => ({ city }));
}

interface PageProps {
  params: {
    city: string;
  };
}

export default function FlatsByCityPage({ params }: PageProps) {
  const city = params.city || 'Faisalabad';

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 text-sm">
          Loading flats and apartments...
        </div>
      }
    >
      <PropertyListContent
        initialPurpose="buy"
        initialType="Flats"
        initialCity={city}
        pageTitle={`Flats & Apartments for Sale in ${city} — Citi Housing`}
      />
    </Suspense>
  );
}

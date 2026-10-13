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

export default function HomesByCityPage({ params }: PageProps) {
  const city = params.city || 'Faisalabad';

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 text-sm">
          Loading houses for sale...
        </div>
      }
    >
      <PropertyListContent
        initialPurpose="buy"
        initialType="Homes"
        initialCity={city}
        pageTitle={`Houses for Sale in ${city} — Citi Housing`}
      />
    </Suspense>
  );
}

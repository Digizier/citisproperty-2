import React, { Suspense } from 'react';
import type { Metadata } from 'next';
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = params.city || 'Faisalabad';
  const title = `Houses for Sale in ${city} — Citi Housing | Property Bank Real Estate`;
  const description = `Find luxury 5 Marla, 10 Marla & 1 Kanal houses for sale in Citi Housing ${city}. 100% verified listings, modern architecture, authorized dealership. Call 0321-8653500.`;
  const pageUrl = `https://citisproperty.com/Homes/${city}/`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'citisproperty.com',
      images: ['https://citisproperty.com/logo.png'],
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://citisproperty.com/logo.png'],
    },
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

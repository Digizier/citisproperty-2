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
  const isFaisalabad = city.toLowerCase() === 'faisalabad';
  const title = `Flats & Apartments for Sale in ${city} — Citi property Real Estate`;
  const description = `Luxury 1, 2 & 3 bedroom apartments and penthouses for sale in ${city}. Modern living with complete amenities. Citi property Real Estate: 0321-8653500.`;
  const pageUrl = `https://citisproperty.com/Flats/${city}/`;

  return {
    title,
    description,
    robots: isFaisalabad
      ? { index: true, follow: true }
      : { index: false, follow: false },
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

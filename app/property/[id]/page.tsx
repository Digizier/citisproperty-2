import React from 'react';
import type { Metadata } from 'next';
import PropertyDetailClient from '@/components/PropertyDetailClient';
import { supabase } from '@/lib/supabase';
import { getPropertyById, getPropertyBySlug } from '@/lib/db';
import { formatPKRPrice } from '@/lib/utils';
import { Property } from '@/lib/types';

function getValidPropertyImage(property: Property): string {
  if (
    property.thumbnail_url &&
    typeof property.thumbnail_url === 'string' &&
    property.thumbnail_url.trim().length > 0
  ) {
    return property.thumbnail_url.trim();
  }
  if (Array.isArray(property.images)) {
    const validImage = property.images.find(
      (img) => typeof img === 'string' && img.trim().length > 0
    );
    if (validImage) {
      return validImage.trim();
    }
  }
  return '';
}

function getAbsoluteImageUrl(rawUrl: string): string {
  if (!rawUrl || !rawUrl.trim()) {
    return 'https://citisproperty.com/logo.png';
  }
  const clean = rawUrl.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  return `https://citisproperty.com${clean.startsWith('/') ? '' : '/'}${clean}`;
}

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const idOrSlug = params.id;
  try {
    let property: Property | null = null;
    if (idOrSlug.startsWith('prop-')) {
      property = await getPropertyById(idOrSlug);
      if (!property) {
        property = await getPropertyBySlug(idOrSlug);
      }
    } else {
      property = await getPropertyBySlug(idOrSlug);
      if (!property) {
        property = await getPropertyById(idOrSlug);
      }
    }

    if (property) {
      const priceText = formatPKRPrice(property.price);
      const title = `${property.title} | ${property.city} - Citi Housing`;
      const description = property.description
        ? property.description.slice(0, 160).replace(/\s+/g, ' ').trim()
        : `${property.type} for ${property.purpose === 'buy' ? 'sale' : 'rent'} in ${property.location}, ${property.city}. Demand Price: PKR ${priceText}.`;

      const rawImage = getValidPropertyImage(property);
      const imageUrl = getAbsoluteImageUrl(rawImage);
      const pageUrl = `https://citisproperty.com/property/${property.slug || property.id}/`;

      return {
        title,
        description,
        alternates: {
          canonical: pageUrl,
        },
        openGraph: {
          title: property.title,
          description,
          url: pageUrl,
          siteName: 'citisproperty.com',
          type: 'article',
          locale: 'en_PK',
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: property.title,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: property.title,
          description,
          images: [imageUrl],
        },
      };
    }
  } catch (err) {
    console.error('generateMetadata error for property:', idOrSlug, err);
  }

  return {
    title: 'Property Details | Citi Housing (Pvt) Ltd - Property Bank Real Estate',
    description: 'Explore premier luxury homes, plots, and commercial properties in Citi Housing developments.',
    openGraph: {
      title: 'Citi Housing (Pvt) Ltd - Property Bank Real Estate',
      description: 'Pakistan premier real estate portal for Citi Housing developments and luxury investments.',
      url: 'https://citisproperty.com',
      images: [
        {
          url: 'https://citisproperty.com/logo.png',
          width: 512,
          height: 512,
          alt: 'Citi Housing Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://citisproperty.com/logo.png'],
    },
  };
}

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from('properties').select('id, slug');
    if (data && data.length > 0) {
      const params: { id: string }[] = [];
      const set = new Set<string>();

      data.forEach((p) => {
        if (p.id && !set.has(p.id)) {
          set.add(p.id);
          params.push({ id: p.id });
        }
        if (p.slug && !set.has(p.slug)) {
          set.add(p.slug);
          params.push({ id: p.slug });
        }
      });

      return params;
    }
  } catch (e) {
    console.warn('generateStaticParams remote query error, using static fallback:', e);
  }

  // Complete static fallback for all seeded IDs and SEO slugs
  const fallbacks = [
    'prop-ch-fsd-1',
    'brand-new-1-kanal-designer-spanish-villa-citi-housing-faisalabad-1',
    'prop-ch-fsd-2',
    '10-marla-brand-new-modern-house-citi-housing-samundri-road-2',
    'prop-ch-fsd-3',
    '5-marla-residential-plot-citi-housing-sargodha-road-3',
    'prop-ch-fsd-4',
    '1-kanal-corner-plot-facing-park-citi-housing-phase-1-4',
    'prop-ch-fsd-5',
    'main-boulevard-commercial-plot-4-marla-citi-gold-mark-5',
    'prop-ch-fsd-6',
    '5-marla-fully-furnished-rental-house-citi-housing-6',
    'prop-ch-fsd-7',
    '2-bed-luxury-penthouse-apartment-citi-heights-7',
    'prop-ch-fsd-8',
    '10-marla-brand-new-house-citi-housing-gujranwala-8',
    'prop-ch-fsd-9',
    '1-kanal-residential-plot-citi-housing-sialkot-9',
    'prop-ch-fsd-10',
    '5-marla-commercial-shop-citi-housing-jhelum-10',
  ];

  return fallbacks.map((id) => ({ id }));
}

export default async function PropertyPage({ params }: PageProps) {
  let property: Property | null = null;
  const idOrSlug = params.id;
  try {
    if (idOrSlug.startsWith('prop-')) {
      property = await getPropertyById(idOrSlug);
      if (!property) property = await getPropertyBySlug(idOrSlug);
    } else {
      property = await getPropertyBySlug(idOrSlug);
      if (!property) property = await getPropertyById(idOrSlug);
    }
  } catch (e) {
    // ignore
  }

  const rawImage = property ? getValidPropertyImage(property) : '';
  const imageUrl = getAbsoluteImageUrl(rawImage);
  const pageUrl = property
    ? `https://citisproperty.com/property/${property.slug || property.id}/`
    : `https://citisproperty.com/property/${params.id}/`;

  const schemaData = property
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': property.type === 'Plots' ? 'Accommodation' : 'SingleFamilyResidence',
            name: property.title,
            description: property.description || property.title,
            url: pageUrl,
            image: imageUrl,
            numberOfBedrooms: property.bedrooms || 0,
            numberOfBathroomsTotal: property.bathrooms || 0,
            floorSize: {
              '@type': 'QuantitativeValue',
              value: property.area_size,
              unitText: property.area_unit,
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: property.city,
              streetAddress: property.location,
              addressCountry: 'PK',
            },
            offers: {
              '@type': 'Offer',
              price: property.price,
              priceCurrency: 'PKR',
              availability: 'https://schema.org/InStock',
              url: pageUrl,
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://citisproperty.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: `${property.type} in ${property.city}`,
                item: `https://citisproperty.com/${property.type}/${property.city}/`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: property.title,
                item: pageUrl,
              },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      )}
      <PropertyDetailClient idOrSlug={params.id} />
    </>
  );
}

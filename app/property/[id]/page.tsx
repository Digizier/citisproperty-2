import React from 'react';
import PropertyDetailClient from '@/components/PropertyDetailClient';
import { supabase } from '@/lib/supabase';

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

interface PageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PageProps) {
  return <PropertyDetailClient idOrSlug={params.id} />;
}

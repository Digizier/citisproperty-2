import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://citisproperty.com';

const CITIES = ['Faisalabad', 'Gujranwala', 'Sialkot', 'Jhelum', 'Lahore', 'Islamabad'];
const CATEGORIES = ['Homes', 'Plots', 'Commercial', 'Flats', 'Rentals'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Static Core Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/properties/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/society-maps/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/new-projects/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/area-guides/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/plotfinder/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/post-listing/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tools/construction-cost-calculator/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/tools/home-loan-calculator/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/tools/area-unit-converter/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tools/land-records/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Category + City Hub Pages (e.g. /Homes/Faisalabad/, /Plots/Gujranwala/)
  const hubPages: MetadataRoute.Sitemap = [];
  for (const cat of CATEGORIES) {
    for (const city of CITIES) {
      hubPages.push({
        url: `${BASE_URL}/${cat}/${city}/`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.85,
      });
    }
  }

  // 3. Dynamic Properties
  const propertyPages: MetadataRoute.Sitemap = [];
  try {
    const { data: properties } = await supabase
      .from('properties')
      .select('id, slug, updated_at, created_at')
      .eq('is_active', true);

    if (properties && properties.length > 0) {
      const added = new Set<string>();
      for (const p of properties) {
        const identifier = p.slug || p.id;
        if (identifier && !added.has(identifier)) {
          added.add(identifier);
          propertyPages.push({
            url: `${BASE_URL}/property/${identifier}/`,
            lastModified: p.updated_at ? new Date(p.updated_at) : now,
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    }
  } catch (err) {
    console.warn('Error fetching properties for sitemap:', err);
  }

  // Fallback for seeded properties if DB returns empty
  if (propertyPages.length === 0) {
    const seeded = [
      'brand-new-1-kanal-designer-spanish-villa-citi-housing-faisalabad-1',
      '10-marla-brand-new-modern-house-citi-housing-samundri-road-2',
      '5-marla-residential-plot-citi-housing-sargodha-road-3',
      '1-kanal-corner-plot-facing-park-citi-housing-phase-1-4',
      'main-boulevard-commercial-plot-4-marla-citi-gold-mark-5',
      '5-marla-fully-furnished-rental-house-citi-housing-6',
      '2-bed-luxury-penthouse-apartment-citi-heights-7',
      '10-marla-brand-new-house-citi-housing-gujranwala-8',
      '1-kanal-residential-plot-citi-housing-sialkot-9',
      '5-marla-commercial-shop-citi-housing-jhelum-10',
    ];
    for (const slug of seeded) {
      propertyPages.push({
        url: `${BASE_URL}/property/${slug}/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return [...staticPages, ...hubPages, ...propertyPages];
}

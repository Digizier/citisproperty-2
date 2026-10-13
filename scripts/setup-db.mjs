import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const { Client } = pg;

const SUPABASE_URL = 'https://mwezxfdslpsgvnbhhksb.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13ZXp4ZmRzbHBzZ3ZuYmhoa3NiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTkxMjY1MywiZXhwIjoyMTA3NDg4NjUzfQ.7S8xaNiNvUYnBxg8zuGg1A5o7WVnUDt1aZwJEYE4i1w';

const poolerConfig = {
  user: 'postgres.mwezxfdslpsgvnbhhksb',
  password: '85zWZDE/4p9@W4P',
  host: 'aws-0-ap-northeast-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
};

async function setup() {
  console.log('Connecting to Supabase Database...');
  const client = new Client(poolerConfig);
  await client.connect();
  console.log('PostgreSQL Connected successfully!');

  // Create tables
  console.log('Creating tables...');
  await client.query(`
    -- Categories table
    CREATE TABLE IF NOT EXISTS public.categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      icon TEXT,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Subcategories table (nested within categories)
    CREATE TABLE IF NOT EXISTS public.subcategories (
      id TEXT PRIMARY KEY,
      category_id TEXT REFERENCES public.categories(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Properties table
    CREATE TABLE IF NOT EXISTS public.properties (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      purpose TEXT NOT NULL DEFAULT 'buy',
      type TEXT NOT NULL DEFAULT 'Homes',
      category_id TEXT,
      subcategory_id TEXT,
      price BIGINT NOT NULL,
      price_prefix TEXT DEFAULT 'PKR',
      city TEXT NOT NULL DEFAULT 'Faisalabad',
      location TEXT NOT NULL,
      area_size NUMERIC NOT NULL,
      area_unit TEXT NOT NULL DEFAULT 'Marla',
      bedrooms INT DEFAULT 0,
      bathrooms INT DEFAULT 0,
      description TEXT,
      features JSONB DEFAULT '[]'::jsonb,
      thumbnail_url TEXT,
      images JSONB DEFAULT '[]'::jsonb,
      is_featured BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT true,
      agent_name TEXT DEFAULT 'Property Bank Real Estate',
      agent_phone TEXT DEFAULT '03218653500',
      agent_whatsapp TEXT DEFAULT '923218653500',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Hero Banners table
    CREATE TABLE IF NOT EXISTS public.hero_banners (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      badge TEXT,
      image_url TEXT,
      mobile_image_url TEXT,
      link_url TEXT,
      is_active BOOLEAN DEFAULT true,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Inquiries / Leads table
    CREATE TABLE IF NOT EXISTS public.inquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      message TEXT,
      property_id TEXT,
      property_title TEXT,
      status TEXT DEFAULT 'New',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Site Settings table
    CREATE TABLE IF NOT EXISTS public.site_settings (
      id TEXT PRIMARY KEY,
      site_name TEXT NOT NULL,
      tagline TEXT,
      phones TEXT,
      whatsapp TEXT,
      email TEXT,
      address TEXT,
      google_maps_url TEXT,
      google_review_url TEXT,
      facebook_url TEXT,
      admin_pin TEXT DEFAULT 'admin123',
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Create indexes for sub-millisecond query performance
    CREATE INDEX IF NOT EXISTS idx_properties_purpose ON public.properties(purpose);
    CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties(type);
    CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
    CREATE INDEX IF NOT EXISTS idx_properties_is_active ON public.properties(is_active);
    CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON public.properties(is_featured);
    CREATE INDEX IF NOT EXISTS idx_properties_category_id ON public.properties(category_id);
    CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON public.subcategories(category_id);

    -- Enable Row Level Security (RLS) on all tables
    ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

    -- Add permissive policies for zero-block free-tier client-side access
    DROP POLICY IF EXISTS "Allow all categories" ON public.categories;
    CREATE POLICY "Allow all categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all subcategories" ON public.subcategories;
    CREATE POLICY "Allow all subcategories" ON public.subcategories FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all properties" ON public.properties;
    CREATE POLICY "Allow all properties" ON public.properties FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all hero_banners" ON public.hero_banners;
    CREATE POLICY "Allow all hero_banners" ON public.hero_banners FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all inquiries" ON public.inquiries;
    CREATE POLICY "Allow all inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all site_settings" ON public.site_settings;
    CREATE POLICY "Allow all site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
  `);
  console.log('Tables, indexes and RLS policies created!');

  // Setup Storage Bucket via Supabase JS
  console.log('Setting up Supabase Storage Bucket...');
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: buckets, error: bucketListErr } = await supabase.storage.listBuckets();
  if (!buckets?.some(b => b.name === 'property-images')) {
    const { error: createBucketErr } = await supabase.storage.createBucket('property-images', {
      public: true,
      fileSizeLimit: 2097152, // 2MB max (images compressed to KB)
      allowedMimeTypes: ['image/webp', 'image/jpeg', 'image/png'],
    });
    if (createBucketErr) console.warn('Bucket create info:', createBucketErr.message);
    else console.log('Storage bucket "property-images" created with public access!');
  } else {
    console.log('Storage bucket "property-images" already exists.');
  }

  // Seed Initial Site Settings
  console.log('Seeding Site Settings...');
  await client.query(`
    INSERT INTO public.site_settings (
      id, site_name, tagline, phones, whatsapp, email, address, google_maps_url, google_review_url, facebook_url, admin_pin
    ) VALUES (
      'default',
      'Citi Housing (Pvt) Ltd - Property Bank Real Estate',
      'Pakistan''s Most Trusted Luxury Living & Prime Real Estate Dealership',
      '03218653500, 03028658450',
      '923218653500',
      'info@citisproperty.com',
      'Property Bank Real Estate, Citi Housing Sargodha Road & Samundri Road, Faisalabad, Punjab, Pakistan',
      'https://maps.app.goo.gl/Umc7Ci9kQZN1GwVo6',
      'https://g.page/r/CWPTsi4M7yUMEBE/review',
      'https://www.facebook.com/share/1EM79fibhT/',
      'admin123'
    ) ON CONFLICT (id) DO UPDATE SET
      site_name = EXCLUDED.site_name,
      phones = EXCLUDED.phones,
      whatsapp = EXCLUDED.whatsapp,
      google_maps_url = EXCLUDED.google_maps_url,
      google_review_url = EXCLUDED.google_review_url,
      facebook_url = EXCLUDED.facebook_url;
  `);

  // Seed Categories & Subcategories
  console.log('Seeding Categories & Subcategories...');
  const categories = [
    { id: 'cat-homes', name: 'Homes', slug: 'homes', icon: 'Home', sort: 1 },
    { id: 'cat-plots', name: 'Plots', slug: 'plots', icon: 'LandPlot', sort: 2 },
    { id: 'cat-commercial', name: 'Commercial', slug: 'commercial', icon: 'Building2', sort: 3 },
    { id: 'cat-flats', name: 'Flats & Apartments', slug: 'flats', icon: 'Building', sort: 4 },
  ];

  for (const cat of categories) {
    await client.query(`
      INSERT INTO public.categories (id, name, slug, icon, sort_order)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO NOTHING;
    `, [cat.id, cat.name, cat.slug, cat.icon, cat.sort]);
  }

  const subcategories = [
    // Homes
    { id: 'sub-home-5m', category_id: 'cat-homes', name: '5 Marla House', slug: '5-marla-house', sort: 1 },
    { id: 'sub-home-10m', category_id: 'cat-homes', name: '10 Marla House', slug: '10-marla-house', sort: 2 },
    { id: 'sub-home-1k', category_id: 'cat-homes', name: '1 Kanal House', slug: '1-kanal-house', sort: 3 },
    { id: 'sub-home-2k', category_id: 'cat-homes', name: '2 Kanal Luxury Villa', slug: '2-kanal-luxury-villa', sort: 4 },
    // Plots
    { id: 'sub-plot-5m', category_id: 'cat-plots', name: '5 Marla Residential Plot', slug: '5-marla-residential-plot', sort: 1 },
    { id: 'sub-plot-10m', category_id: 'cat-plots', name: '10 Marla Residential Plot', slug: '10-marla-residential-plot', sort: 2 },
    { id: 'sub-plot-1k', category_id: 'cat-plots', name: '1 Kanal Residential Plot', slug: '1-kanal-residential-plot', sort: 3 },
    { id: 'sub-plot-files', category_id: 'cat-plots', name: 'Affidavit & Booking Files', slug: 'affidavit-booking-files', sort: 4 },
    // Commercial
    { id: 'sub-comm-shops', category_id: 'cat-commercial', name: 'Commercial Shops', slug: 'commercial-shops', sort: 1 },
    { id: 'sub-comm-plaza', category_id: 'cat-commercial', name: 'Commercial Plazas', slug: 'commercial-plazas', sort: 2 },
    { id: 'sub-comm-plots', category_id: 'cat-commercial', name: 'Commercial Plots', slug: 'commercial-plots', sort: 3 },
    // Flats
    { id: 'sub-flat-1bed', category_id: 'cat-flats', name: '1 Bed Luxury Apartment', slug: '1-bed-luxury-apartment', sort: 1 },
    { id: 'sub-flat-2bed', category_id: 'cat-flats', name: '2 Bed Luxury Apartment', slug: '2-bed-luxury-apartment', sort: 2 },
    { id: 'sub-flat-penthouse', category_id: 'cat-flats', name: 'Penthouse', slug: 'penthouse', sort: 3 },
  ];

  for (const sub of subcategories) {
    await client.query(`
      INSERT INTO public.subcategories (id, category_id, name, slug, sort_order)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO NOTHING;
    `, [sub.id, sub.category_id, sub.name, sub.slug, sub.sort]);
  }

  // Seed Hero Banners
  console.log('Seeding Hero Banners...');
  const banners = [
    {
      id: 'banner-1',
      title: 'Citi Housing Faisalabad - Phase 1 & 2',
      subtitle: 'Premium residential plots & turnkey designer villas on Sargodha & Samundri Road',
      badge: 'OFFICIAL DEALER - PROPERTY BANK',
      image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      mobile_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
      link_url: '/new-projects',
      sort_order: 1,
    },
    {
      id: 'banner-2',
      title: 'Commercial Boulevard Opportunities',
      subtitle: 'High-yield commercial shops & corporate plaza plots with guaranteed ROI',
      badge: 'PRIME COMMERCIAL INVESTMENT',
      image_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
      mobile_image_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=600&auto=format&fit=crop',
      link_url: '/Commercial/Faisalabad',
      sort_order: 2,
    },
    {
      id: 'banner-3',
      title: 'Luxury Designer 1 Kanal Villas',
      subtitle: 'Ultra-modern Spanish & Italian architecture with smart automation in Citi Housing',
      badge: 'READY TO MOVE',
      image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      mobile_image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
      link_url: '/Homes/Faisalabad',
      sort_order: 3,
    }
  ];

  for (const b of banners) {
    await client.query(`
      INSERT INTO public.hero_banners (id, title, subtitle, badge, image_url, mobile_image_url, link_url, is_active, sort_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, true, $8)
      ON CONFLICT (id) DO NOTHING;
    `, [b.id, b.title, b.subtitle, b.badge, b.image_url, b.mobile_image_url, b.link_url, b.sort_order]);
  }

  // Seed Verified Properties
  console.log('Seeding Properties...');
  const properties = [
    {
      id: 'prop-ch-fsd-1',
      title: 'Brand New 1 Kanal Designer Spanish Villa in Citi Housing Phase 1',
      slug: 'brand-new-1-kanal-designer-spanish-villa-citi-housing-faisalabad-1',
      purpose: 'buy',
      type: 'Homes',
      category_id: 'cat-homes',
      subcategory_id: 'sub-home-1k',
      price: 65000000, // 6.5 Crore
      price_prefix: 'PKR',
      city: 'Faisalabad',
      location: 'Block A, Citi Housing Sargodha Road, Faisalabad',
      area_size: 1,
      area_unit: 'Kanal',
      bedrooms: 5,
      bathrooms: 6,
      description: 'Stunning 1 Kanal Spanish architecture villa featuring 5 master bedrooms with attached Italian baths, double height lobby, 2 imported kitchens with appliances, basement home cinema, servant quarter, and landscaped lawn. Direct access to Citi Gold Mark & Mosque.',
      features: ['Sui Gas', 'Underground Electricity', 'Water Filtration', '24/7 Security & CCTV', 'Gated Community', 'Italian Kitchen', 'Basement Cinema', 'Near Park'],
      thumbnail_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: true,
      is_active: true,
    },
    {
      id: 'prop-ch-fsd-2',
      title: '10 Marla Brand New Modern House in Citi Housing Samundri Road',
      slug: '10-marla-brand-new-modern-house-citi-housing-samundri-road-2',
      purpose: 'buy',
      type: 'Homes',
      category_id: 'cat-homes',
      subcategory_id: 'sub-home-10m',
      price: 36000000, // 3.6 Crore
      price_prefix: 'PKR',
      city: 'Faisalabad',
      location: 'Block B, Citi Housing Samundri Road, Faisalabad',
      area_size: 10,
      area_unit: 'Marla',
      bedrooms: 4,
      bathrooms: 5,
      description: 'Architect-designed 10 Marla double-storey house built with Grade-A materials. Solid ash wood doors, Grohe bathroom fittings, spacious car porch for 2 SUVs, and open American kitchen. Possession and utility bills active.',
      features: ['Sui Gas Available', 'Underground Utilities', 'Car Porch (2 Cars)', 'Solid Wood Work', '24/7 Armed Guard Security', 'Walking Distance to Commercial Market'],
      thumbnail_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: true,
      is_active: true,
    },
    {
      id: 'prop-ch-fsd-3',
      title: '5 Marla Residential Plot in Citi Housing Sargodha Road Phase 2',
      slug: '5-marla-residential-plot-citi-housing-sargodha-road-3',
      purpose: 'buy',
      type: 'Plots',
      category_id: 'cat-plots',
      subcategory_id: 'sub-plot-5m',
      price: 6800000, // 68 Lacs
      price_prefix: 'PKR',
      city: 'Faisalabad',
      location: 'Block C, Citi Housing Sargodha Road, Faisalabad',
      area_size: 5,
      area_unit: 'Marla',
      bedrooms: 0,
      bathrooms: 0,
      description: 'Prime location 5 Marla on-ground plot with all development charges cleared. Ideal for immediate house construction or short-term investment return. Direct deal with owner through Property Bank.',
      features: ['On-Ground Plot', 'Possession Ready', 'Near Main Boulevard', 'Sewerage & Electricity Ready', 'Clear Title Registry'],
      thumbnail_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: true,
      is_active: true,
    },
    {
      id: 'prop-ch-fsd-4',
      title: '1 Kanal Corner Plot Facing Park in Citi Housing Phase 1',
      slug: '1-kanal-corner-plot-facing-park-citi-housing-phase-1-4',
      purpose: 'buy',
      type: 'Plots',
      category_id: 'cat-plots',
      subcategory_id: 'sub-plot-1k',
      price: 24500000, // 2.45 Crore
      price_prefix: 'PKR',
      city: 'Faisalabad',
      location: 'Block A, Sargodha Road, Citi Housing Faisalabad',
      area_size: 1,
      area_unit: 'Kanal',
      bedrooms: 0,
      bathrooms: 0,
      description: 'Rare opportunity: 1 Kanal corner plot directly facing the central theme park. Extra land benefit, peaceful cul-de-sac environment, and highest appreciation rate in Citi Housing.',
      features: ['Corner Plot', 'Park Facing', 'Extra Land', '100% Development Done', 'Underground Electrification'],
      thumbnail_url: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1524813686514-a57563d77d66?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: true,
      is_active: true,
    },
    {
      id: 'prop-ch-fsd-5',
      title: 'Main Boulevard Commercial Plot 4 Marla in Citi Gold Mark',
      slug: 'main-boulevard-commercial-plot-4-marla-citi-gold-mark-5',
      purpose: 'buy',
      type: 'Commercial',
      category_id: 'cat-commercial',
      subcategory_id: 'sub-comm-plots',
      price: 42000000, // 4.2 Crore
      price_prefix: 'PKR',
      city: 'Faisalabad',
      location: 'Citi Gold Mark Commercial Avenue, Sargodha Road, Faisalabad',
      area_size: 4,
      area_unit: 'Marla',
      bedrooms: 0,
      bathrooms: 0,
      description: '4 Marla commercial plot on 150ft Main Boulevard in Citi Housing Faisalabad. Approved for Basement + Ground + 4 storeys. Highly lucrative for retail bank, brand outlet, or corporate pharmacy.',
      features: ['Main Boulevard 150ft', 'Commercial Approved', 'High Footfall Area', 'Basement + 4 Floor Allowed', 'Car Parking Available'],
      thumbnail_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: true,
      is_active: true,
    },
    {
      id: 'prop-ch-fsd-6',
      title: '5 Marla Fully Furnished Rental House in Citi Housing Sargodha Road',
      slug: '5-marla-fully-furnished-rental-house-citi-housing-6',
      purpose: 'rent',
      type: 'Homes',
      category_id: 'cat-homes',
      subcategory_id: 'sub-home-5m',
      price: 85000, // 85,000 / month
      price_prefix: 'PKR',
      city: 'Faisalabad',
      location: 'Block C, Citi Housing Sargodha Road, Faisalabad',
      area_size: 5,
      area_unit: 'Marla',
      bedrooms: 3,
      bathrooms: 3,
      description: 'Turnkey fully furnished 5 Marla house for executive family rental. Complete with inverter ACs, refrigerator, LED TVs, sofa sets, and beds. 24/7 security and maintenance staff on call.',
      features: ['Fully Furnished', 'Inverter AC Installed', 'Double Kitchen', 'UPS/Solar Backup', '24/7 Gated Security'],
      thumbnail_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: false,
      is_active: true,
    },
    {
      id: 'prop-ch-fsd-7',
      title: '2 Bed Luxury Penthouse Apartment in Citi Heights',
      slug: '2-bed-luxury-penthouse-apartment-citi-heights-7',
      purpose: 'buy',
      type: 'Flats',
      category_id: 'cat-flats',
      subcategory_id: 'sub-flat-2bed',
      price: 18500000, // 1.85 Crore
      price_prefix: 'PKR',
      city: 'Faisalabad',
      location: 'Citi Heights Towers, Sargodha Road, Faisalabad',
      area_size: 1400,
      area_unit: 'Sq. Ft',
      bedrooms: 2,
      bathrooms: 2,
      description: 'Spectacular panoramic city views from the 8th floor penthouse in Citi Heights. High-speed elevators, standby generators, fitness center, swimming pool, and reserved basement parking.',
      features: ['Penthouse Level', 'Panoramic Views', 'Standby Generator', 'High-Speed Lifts', 'Gym & Pool Access', 'Designated Parking'],
      thumbnail_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: false,
      is_active: true,
    },
    {
      id: 'prop-ch-fsd-8',
      title: '10 Marla Brand New House in Citi Housing Gujranwala Phase 2',
      slug: '10-marla-brand-new-house-citi-housing-gujranwala-8',
      purpose: 'buy',
      type: 'Homes',
      category_id: 'cat-homes',
      subcategory_id: 'sub-home-10m',
      price: 39500000, // 3.95 Crore
      price_prefix: 'PKR',
      city: 'Gujranwala',
      location: 'Block E, Citi Housing Phase 2, Gujranwala',
      area_size: 10,
      area_unit: 'Marla',
      bedrooms: 4,
      bathrooms: 5,
      description: 'Luxury modern house with double-glazed windows, Turkish tile flooring, designer powder room, servant quarter, and automated gate. Located within walking distance of Citi Theme Park & International School.',
      features: ['Automated Gate', 'Turkish Tiles', 'Double Glazed Glass', 'Near Theme Park', 'CCTV Equipped'],
      thumbnail_url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: true,
      is_active: true,
    },
    {
      id: 'prop-ch-fsd-9',
      title: '1 Kanal Residential Plot in Citi Housing Sialkot',
      slug: '1-kanal-residential-plot-citi-housing-sialkot-9',
      purpose: 'buy',
      type: 'Plots',
      category_id: 'cat-plots',
      subcategory_id: 'sub-plot-1k',
      price: 21000000, // 2.1 Crore
      price_prefix: 'PKR',
      city: 'Sialkot',
      location: 'Block B, Citi Housing Sialkot',
      area_size: 1,
      area_unit: 'Kanal',
      bedrooms: 0,
      bathrooms: 0,
      description: 'Ideal 1 Kanal plot in Sialkot with wide 50ft street, near the central mosque and commercial complex. Ready for construction with immediate allotment and transfer.',
      features: ['Wide 50ft Street', 'Near Central Mosque', 'Possession Available', 'Electricity & Water Ready'],
      thumbnail_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: false,
      is_active: true,
    },
    {
      id: 'prop-ch-fsd-10',
      title: '5 Marla Commercial Shop in Citi Housing Jhelum Commercial Hub',
      slug: '5-marla-commercial-shop-citi-housing-jhelum-10',
      purpose: 'rent',
      type: 'Commercial',
      category_id: 'cat-commercial',
      subcategory_id: 'sub-comm-shops',
      price: 120000, // 1.2 Lac / month
      price_prefix: 'PKR',
      city: 'Jhelum',
      location: 'Civic Center, Citi Housing Jhelum',
      area_size: 5,
      area_unit: 'Marla',
      bedrooms: 0,
      bathrooms: 1,
      description: 'Ground floor corner shop in prime Civic Center location of Citi Housing Jhelum. Glass front, tile flooring, roller shutter, and dedicated customer parking.',
      features: ['Corner Shop', 'Ground Floor', 'Glass Frontage', 'Dedicated Parking', 'High Commercial Footfall'],
      thumbnail_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop'
      ],
      is_featured: false,
      is_active: true,
    }
  ];

  for (const p of properties) {
    await client.query(`
      INSERT INTO public.properties (
        id, title, slug, purpose, type, category_id, subcategory_id, price, price_prefix,
        city, location, area_size, area_unit, bedrooms, bathrooms, description,
        features, thumbnail_url, images, is_featured, is_active
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
        $17, $18, $19, $20, $21
      ) ON CONFLICT (id) DO NOTHING;
    `, [
      p.id, p.title, p.slug, p.purpose, p.type, p.category_id, p.subcategory_id,
      p.price, p.price_prefix, p.city, p.location, p.area_size, p.area_unit,
      p.bedrooms, p.bathrooms, p.description, JSON.stringify(p.features),
      p.thumbnail_url, JSON.stringify(p.images), p.is_featured, p.is_active
    ]);
  }
  console.log(`Successfully seeded ${properties.length} initial verified properties!`);

  await client.end();
  console.log('Database initialization completed 100%!');
}

setup().catch(err => {
  console.error('Database setup failed:', err);
  process.exit(1);
});

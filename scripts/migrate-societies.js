const { Client } = require('pg');

const connectionString = 'postgresql://postgres.mwezxfdslpsgvnbhhksb:85zWZDE%2F4p9%40W4P@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres';

async function run() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Connected to PG Database');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS public.societies (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      city TEXT NOT NULL DEFAULT 'Faisalabad',
      location TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      master_plan_pdf_url TEXT,
      master_plan_image_url TEXT,
      is_featured BOOLEAN DEFAULT true,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    ALTER TABLE public.societies ENABLE ROW LEVEL SECURITY;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'societies' AND policyname = 'Allow public select on societies'
      ) THEN
        CREATE POLICY "Allow public select on societies" ON public.societies FOR SELECT USING (true);
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'societies' AND policyname = 'Allow all write on societies'
      ) THEN
        CREATE POLICY "Allow all write on societies" ON public.societies FOR ALL USING (true) WITH CHECK (true);
      END IF;
    END
    $$;

    GRANT ALL ON public.societies TO anon, authenticated, service_role;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Access for master-plans'
      ) THEN
        CREATE POLICY "Public Access for master-plans" ON storage.objects FOR SELECT USING (bucket_id = 'master-plans');
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Upload for master-plans'
      ) THEN
        CREATE POLICY "Public Upload for master-plans" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'master-plans');
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Update for master-plans'
      ) THEN
        CREATE POLICY "Public Update for master-plans" ON storage.objects FOR UPDATE USING (bucket_id = 'master-plans');
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Delete for master-plans'
      ) THEN
        CREATE POLICY "Public Delete for master-plans" ON storage.objects FOR DELETE USING (bucket_id = 'master-plans');
      END IF;
    END
    $$;
  `;

  await client.query(createTableQuery);
  console.log('Table public.societies and storage policies ready!');

  const countRes = await client.query('SELECT COUNT(*) FROM public.societies');
  console.log('Current societies count:', countRes.rows[0].count);

  if (parseInt(countRes.rows[0].count) === 0) {
    await client.query(`
      INSERT INTO public.societies (name, slug, city, location, description, image_url, master_plan_pdf_url, master_plan_image_url, is_featured, is_active)
      VALUES (
        'Citi Housing (Phase II) Samundri Road',
        'citi-housing-phase-ii-samundri-road',
        'Faisalabad',
        'Samundri Road, Faisalabad',
        'Citi Housing Faisalabad offers a gold standard lifestyle with wide road networks, underground utilities, magnificent themed entrance, Glow Park, central masjid, and gated 24/7 security.',
        '/maps/citi-housing-master-plan-hd.webp',
        '/maps/property-bank-master-plan.pdf',
        '/maps/citi-housing-master-plan-hd.webp',
        true,
        true
      );
    `);
    console.log('Seeded default Citi Housing Samundri Road master plan map!');
  }

  await client.end();
  console.log('Migration finished successfully!');
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});

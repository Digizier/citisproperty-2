import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mwezxfdslpsgvnbhhksb.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13ZXp4ZmRzbHBzZ3ZuYmhoa3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5MTI2NTMsImV4cCI6MjEwNzQ4ODY1M30.mNV73uIBVHRtdMLMdBXlllW1tDyJu-rQ_odllLk4Xgo';

// Browser-persistent singleton Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'x-application-name': 'citisproperty',
    },
  },
});

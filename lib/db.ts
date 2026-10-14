import { supabase } from './supabase';
import {
  Property,
  Category,
  Subcategory,
  Society,
  HeroBanner,
  Inquiry,
  SiteSettings,
  PropertyFilter,
} from './types';

// Events for cross-component and cross-tab real-time reactivity
export const DB_EVENTS = {
  PROPERTIES_UPDATED: 'citis_properties_updated',
  CATEGORIES_UPDATED: 'citis_categories_updated',
  BANNERS_UPDATED: 'citis_banners_updated',
  SETTINGS_UPDATED: 'citis_settings_updated',
  INQUIRIES_UPDATED: 'citis_inquiries_updated',
  SOCIETIES_UPDATED: 'citis_societies_updated',
};

const dispatchDbEvent = (eventName: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(eventName));
  }
};

// Strict page size limit of 8 items per page for minimum egress & maximum performance
export const PAGE_SIZE = 8;

// Selective projection strings - NEVER use SELECT *
const PROPERTY_LIST_FIELDS =
  'id, title, slug, purpose, type, category_id, subcategory_id, price, price_prefix, city, location, area_size, area_unit, bedrooms, bathrooms, thumbnail_url, is_featured, is_active, created_at';

const PROPERTY_DETAIL_FIELDS =
  'id, title, slug, purpose, type, category_id, subcategory_id, price, price_prefix, city, location, area_size, area_unit, bedrooms, bathrooms, description, features, thumbnail_url, images, is_featured, is_active, agent_name, agent_phone, agent_whatsapp, created_at, updated_at';

// Default Fallback Settings
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 'default',
  site_name: 'Citi Housing (Pvt) Ltd - Property Bank Real Estate',
  tagline: "Pakistan's Most Trusted Luxury Living & Prime Real Estate Dealership",
  phones: '03218653500, 03028658450',
  whatsapp: '923218653500',
  email: 'info@citisproperty.com',
  address: 'Property Bank Real Estate, Citi Housing Sargodha Road & Samundri Road, Faisalabad, Punjab, Pakistan',
  google_maps_url: 'https://maps.app.goo.gl/Umc7Ci9kQZN1GwVo6',
  google_review_url: 'https://g.page/r/CWPTsi4M7yUMEBE/review',
  facebook_url: 'https://www.facebook.com/share/1EM79fibhT/',
  admin_pin: 'admin123',
};

/* =========================================================================
   PROPERTIES API
   ========================================================================= */

export async function getProperties(filter: PropertyFilter = {}): Promise<{
  data: Property[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const page = filter.page && filter.page > 0 ? filter.page : 1;
  const limit = filter.limit || PAGE_SIZE;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase
      .from('properties')
      .select(PROPERTY_LIST_FIELDS, { count: 'exact' })
      .eq('is_active', true);

    if (filter.purpose) {
      query = query.eq('purpose', filter.purpose);
    }
    if (filter.type) {
      query = query.eq('type', filter.type);
    }
    if (filter.city && filter.city !== 'All Cities') {
      query = query.ilike('city', `%${filter.city}%`);
    }
    if (filter.category_id) {
      query = query.eq('category_id', filter.category_id);
    }
    if (filter.subcategory_id) {
      query = query.eq('subcategory_id', filter.subcategory_id);
    }
    if (filter.minPrice !== undefined && filter.minPrice > 0) {
      query = query.gte('price', filter.minPrice);
    }
    if (filter.maxPrice !== undefined && filter.maxPrice > 0) {
      query = query.lte('price', filter.maxPrice);
    }
    if (filter.bedrooms !== undefined && filter.bedrooms > 0) {
      query = query.gte('bedrooms', filter.bedrooms);
    }
    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.trim();
      query = query.or(`title.ilike.%${q}%,location.ilike.%${q}%,city.ilike.%${q}%`);
    }

    // Order by featured first, then newest
    query = query
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) throw error;

    const total = count || 0;
    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data: (data as Property[]) || [],
      total,
      page,
      totalPages,
    };
  } catch (err) {
    console.warn('Supabase fetch failed, checking localStorage cache:', err);
    // LocalStorage fallback
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('citis_properties_cache');
      if (cached) {
        let all: Property[] = JSON.parse(cached);
        if (filter.purpose) all = all.filter((p) => p.purpose === filter.purpose);
        if (filter.type) all = all.filter((p) => p.type === filter.type);
        if (filter.city && filter.city !== 'All Cities')
          all = all.filter((p) => p.city.toLowerCase().includes(filter.city!.toLowerCase()));
        if (filter.minPrice !== undefined && filter.minPrice > 0)
          all = all.filter((p) => p.price >= filter.minPrice!);
        if (filter.maxPrice !== undefined && filter.maxPrice > 0)
          all = all.filter((p) => p.price <= filter.maxPrice!);
        if (filter.bedrooms !== undefined && filter.bedrooms > 0)
          all = all.filter((p) => p.bedrooms >= filter.bedrooms!);
        if (filter.searchQuery && filter.searchQuery.trim()) {
          const q = filter.searchQuery.trim().toLowerCase();
          all = all.filter(
            (p) =>
              (p.title && p.title.toLowerCase().includes(q)) ||
              (p.location && p.location.toLowerCase().includes(q)) ||
              (p.city && p.city.toLowerCase().includes(q))
          );
        }
        const total = all.length;
        const totalPages = Math.ceil(total / limit) || 1;
        const sliced = all.slice(from, to + 1);
        return { data: sliced, total, page, totalPages };
      }
    }
    return { data: [], total: 0, page: 1, totalPages: 1 };
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(PROPERTY_DETAIL_FIELDS)
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Property;
  } catch (err) {
    console.warn('Property lookup by slug failed:', err);
    return null;
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(PROPERTY_DETAIL_FIELDS)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Property;
  } catch (err) {
    console.warn('Property lookup by ID failed:', err);
    return null;
  }
}

export async function adminGetAllProperties(): Promise<Property[]> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(PROPERTY_LIST_FIELDS)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (typeof window !== 'undefined' && data) {
      localStorage.setItem('citis_properties_cache', JSON.stringify(data));
    }
    return (data as Property[]) || [];
  } catch (err) {
    console.warn('Admin properties fetch error, falling back to local cache:', err);
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('citis_properties_cache');
      if (cached) return JSON.parse(cached);
    }
    return [];
  }
}

export async function adminSaveProperty(property: Partial<Property>): Promise<Property> {
  const isNew = !property.id;
  const id = property.id || `prop-${Date.now()}`;
  const slug =
    property.slug ||
    (property.title
      ? `${property.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')}-${Date.now().toString().slice(-4)}`
      : id);

  const payload: Property = {
    id,
    title: property.title || 'Untitled Property',
    slug,
    purpose: property.purpose || 'buy',
    type: property.type || 'Homes',
    category_id: property.category_id || 'cat-homes',
    subcategory_id: property.subcategory_id || '',
    price: Number(property.price) || 0,
    price_prefix: property.price_prefix || 'PKR',
    city: property.city || 'Faisalabad',
    location: property.location || 'Citi Housing, Faisalabad',
    area_size: Number(property.area_size) || 5,
    area_unit: property.area_unit || 'Marla',
    bedrooms: Number(property.bedrooms) || 0,
    bathrooms: Number(property.bathrooms) || 0,
    description: property.description || '',
    features: property.features || [],
    thumbnail_url: property.thumbnail_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    images: property.images && property.images.length > 0 ? property.images : [property.thumbnail_url || ''],
    is_featured: property.is_featured ?? false,
    is_active: property.is_active ?? true,
    agent_name: property.agent_name || 'Property Bank Real Estate',
    agent_phone: property.agent_phone || '03218653500',
    agent_whatsapp: property.agent_whatsapp || '923218653500',
    updated_at: new Date().toISOString(),
    ...(isNew ? { created_at: new Date().toISOString() } : {}),
  };

  try {
    const { data, error } = await supabase
      .from('properties')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;

    // Update local cache & dispatch event
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('citis_properties_cache');
      let list: Property[] = cached ? JSON.parse(cached) : [];
      list = list.filter((p) => p.id !== id);
      list.unshift(data as Property);
      localStorage.setItem('citis_properties_cache', JSON.stringify(list));
      dispatchDbEvent(DB_EVENTS.PROPERTIES_UPDATED);
    }

    return (data as Property) || payload;
  } catch (err) {
    console.error('Save property failed, saving to local cache:', err);
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('citis_properties_cache');
      let list: Property[] = cached ? JSON.parse(cached) : [];
      list = list.filter((p) => p.id !== id);
      list.unshift(payload);
      localStorage.setItem('citis_properties_cache', JSON.stringify(list));
      dispatchDbEvent(DB_EVENTS.PROPERTIES_UPDATED);
    }
    return payload;
  }
}

export async function adminDeleteProperty(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) throw error;

    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('citis_properties_cache');
      if (cached) {
        let list: Property[] = JSON.parse(cached);
        list = list.filter((p) => p.id !== id);
        localStorage.setItem('citis_properties_cache', JSON.stringify(list));
      }
      dispatchDbEvent(DB_EVENTS.PROPERTIES_UPDATED);
    }
    return true;
  } catch (err) {
    console.error('Delete property failed:', err);
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('citis_properties_cache');
      if (cached) {
        let list: Property[] = JSON.parse(cached);
        list = list.filter((p) => p.id !== id);
        localStorage.setItem('citis_properties_cache', JSON.stringify(list));
      }
      dispatchDbEvent(DB_EVENTS.PROPERTIES_UPDATED);
    }
    return true;
  }
}

/* =========================================================================
   CATEGORIES & SUBCATEGORIES API
   ========================================================================= */

export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, icon, sort_order')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    if (typeof window !== 'undefined' && data) {
      localStorage.setItem('citis_categories_cache', JSON.stringify(data));
    }
    return (data as Category[]) || [];
  } catch (err) {
    console.warn('Fetch categories error, using cache:', err);
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('citis_categories_cache');
      if (cached) return JSON.parse(cached);
    }
    return [];
  }
}

export async function getSubcategories(categoryId?: string): Promise<Subcategory[]> {
  try {
    let query = supabase
      .from('subcategories')
      .select('id, category_id, name, slug, sort_order')
      .order('sort_order', { ascending: true });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data as Subcategory[]) || [];
  } catch (err) {
    console.warn('Fetch subcategories error:', err);
    return [];
  }
}

export async function adminSaveCategory(category: Partial<Category>): Promise<Category> {
  const id = category.id || `cat-${Date.now()}`;
  const slug =
    category.slug ||
    (category.name
      ? category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : id);

  const payload: Category = {
    id,
    name: category.name || 'New Category',
    slug,
    icon: category.icon || 'Folder',
    sort_order: category.sort_order || 0,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from('categories').upsert(payload).select().single();
    if (error) throw error;
    dispatchDbEvent(DB_EVENTS.CATEGORIES_UPDATED);
    return (data as Category) || payload;
  } catch (err) {
    console.error('Error saving category:', err);
    dispatchDbEvent(DB_EVENTS.CATEGORIES_UPDATED);
    return payload;
  }
}

export async function adminDeleteCategory(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    dispatchDbEvent(DB_EVENTS.CATEGORIES_UPDATED);
    return true;
  } catch (err) {
    console.error('Delete category error:', err);
    dispatchDbEvent(DB_EVENTS.CATEGORIES_UPDATED);
    return false;
  }
}

export async function adminSaveSubcategory(sub: Partial<Subcategory>): Promise<Subcategory> {
  const id = sub.id || `sub-${Date.now()}`;
  const slug =
    sub.slug ||
    (sub.name ? sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : id);

  const payload: Subcategory = {
    id,
    category_id: sub.category_id || '',
    name: sub.name || 'New Subcategory',
    slug,
    sort_order: sub.sort_order || 0,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from('subcategories').upsert(payload).select().single();
    if (error) throw error;
    dispatchDbEvent(DB_EVENTS.CATEGORIES_UPDATED);
    return (data as Subcategory) || payload;
  } catch (err) {
    console.error('Error saving subcategory:', err);
    dispatchDbEvent(DB_EVENTS.CATEGORIES_UPDATED);
    return payload;
  }
}

export async function adminDeleteSubcategory(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('subcategories').delete().eq('id', id);
    if (error) throw error;
    dispatchDbEvent(DB_EVENTS.CATEGORIES_UPDATED);
    return true;
  } catch (err) {
    console.error('Delete subcategory error:', err);
    dispatchDbEvent(DB_EVENTS.CATEGORIES_UPDATED);
    return false;
  }
}

/* =========================================================================
   HERO BANNERS API
   ========================================================================= */

export async function getHeroBanners(): Promise<HeroBanner[]> {
  try {
    const { data, error } = await supabase
      .from('hero_banners')
      .select('id, title, subtitle, badge, image_url, mobile_image_url, link_url, is_active, sort_order')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    if (typeof window !== 'undefined' && data) {
      localStorage.setItem('citis_banners_cache', JSON.stringify(data));
    }
    return (data as HeroBanner[]) || [];
  } catch (err) {
    console.warn('Fetch hero banners error, using cache:', err);
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('citis_banners_cache');
      if (cached) return JSON.parse(cached);
    }
    return [];
  }
}

export async function adminGetAllBanners(): Promise<HeroBanner[]> {
  try {
    const { data, error } = await supabase
      .from('hero_banners')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data as HeroBanner[]) || [];
  } catch (err) {
    console.warn('Admin fetch banners error:', err);
    return [];
  }
}

export async function adminSaveBanner(banner: Partial<HeroBanner>): Promise<HeroBanner> {
  const id = banner.id || `banner-${Date.now()}`;
  const payload: HeroBanner = {
    id,
    title: banner.title || 'Special Announcement',
    subtitle: banner.subtitle || '',
    badge: banner.badge || '',
    image_url: banner.image_url || '',
    mobile_image_url: banner.mobile_image_url || banner.image_url || '',
    link_url: banner.link_url || '/',
    is_active: banner.is_active ?? true,
    sort_order: banner.sort_order || 0,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from('hero_banners').upsert(payload).select().single();
    if (error) throw error;
    dispatchDbEvent(DB_EVENTS.BANNERS_UPDATED);
    return (data as HeroBanner) || payload;
  } catch (err) {
    console.error('Error saving banner:', err);
    dispatchDbEvent(DB_EVENTS.BANNERS_UPDATED);
    return payload;
  }
}

export async function adminDeleteBanner(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('hero_banners').delete().eq('id', id);
    if (error) throw error;
    dispatchDbEvent(DB_EVENTS.BANNERS_UPDATED);
    return true;
  } catch (err) {
    console.error('Delete banner error:', err);
    dispatchDbEvent(DB_EVENTS.BANNERS_UPDATED);
    return false;
  }
}

/* =========================================================================
   SITE SETTINGS API
   ========================================================================= */

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'default')
      .single();

    if (error) throw error;
    if (typeof window !== 'undefined' && data) {
      localStorage.setItem('citis_settings_cache', JSON.stringify(data));
    }
    return (data as SiteSettings) || DEFAULT_SITE_SETTINGS;
  } catch (err) {
    console.warn('Fetch site settings error, using fallback:', err);
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('citis_settings_cache');
      if (cached) return JSON.parse(cached);
    }
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function adminSaveSiteSettings(
  settings: Partial<SiteSettings>
): Promise<SiteSettings> {
  const payload: SiteSettings = {
    ...DEFAULT_SITE_SETTINGS,
    ...settings,
    id: 'default',
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    if (typeof window !== 'undefined') {
      localStorage.setItem('citis_settings_cache', JSON.stringify(data));
      dispatchDbEvent(DB_EVENTS.SETTINGS_UPDATED);
    }
    return (data as SiteSettings) || payload;
  } catch (err) {
    console.error('Save site settings error:', err);
    if (typeof window !== 'undefined') {
      localStorage.setItem('citis_settings_cache', JSON.stringify(payload));
      dispatchDbEvent(DB_EVENTS.SETTINGS_UPDATED);
    }
    return payload;
  }
}

/* =========================================================================
   INQUIRIES / LEADS API
   ========================================================================= */

export async function submitInquiry(inquiry: Partial<Inquiry>): Promise<Inquiry> {
  const id = `inq-${Date.now()}`;
  const payload: Inquiry = {
    id,
    name: inquiry.name || 'Anonymous',
    phone: inquiry.phone || '',
    email: inquiry.email || '',
    message: inquiry.message || '',
    property_id: inquiry.property_id || '',
    property_title: inquiry.property_title || '',
    status: 'New',
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from('inquiries').insert(payload).select().single();
    if (error) throw error;
    dispatchDbEvent(DB_EVENTS.INQUIRIES_UPDATED);
    return (data as Inquiry) || payload;
  } catch (err) {
    console.error('Submit inquiry error:', err);
    dispatchDbEvent(DB_EVENTS.INQUIRIES_UPDATED);
    return payload;
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as Inquiry[]) || [];
  } catch (err) {
    console.warn('Get inquiries error:', err);
    return [];
  }
}

export async function adminUpdateInquiryStatus(
  id: string,
  status: 'New' | 'Contacted' | 'Closed'
): Promise<boolean> {
  try {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (error) throw error;
    dispatchDbEvent(DB_EVENTS.INQUIRIES_UPDATED);
    return true;
  } catch (err) {
    console.error('Update inquiry status error:', err);
    return false;
  }
}

/* =========================================================================
   SOCIETIES & MASTER PLAN MAPS API
   ========================================================================= */

export const DEFAULT_SOCIETIES: Society[] = [
  {
    id: '0e39c94d-0cf5-4886-a186-64413c964b81',
    name: 'Citi Housing (Phase II) Samundri Road',
    slug: 'citi-housing-phase-ii-samundri-road',
    city: 'Faisalabad',
    location: 'Samundri Road, Faisalabad',
    description:
      'Citi Housing Faisalabad offers a gold standard lifestyle with wide road networks, underground utilities, magnificent themed entrance, Glow Park, central masjid, and gated 24/7 security.',
    image_url: '/maps/citi-housing-master-plan-hd.webp',
    master_plan_pdf_url: '/maps/property-bank-master-plan.pdf',
    master_plan_image_url: '/maps/citi-housing-master-plan-hd.webp',
    is_featured: true,
    is_active: true,
  },
];

export async function getSocieties(onlyActive = true): Promise<Society[]> {
  try {
    let query = supabase
      .from('societies')
      .select(
        'id, name, slug, city, location, description, image_url, master_plan_pdf_url, master_plan_image_url, is_featured, is_active, created_at'
      )
      .order('is_featured', { ascending: false });

    if (onlyActive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return DEFAULT_SOCIETIES;
    }
    return data as Society[];
  } catch (err) {
    console.warn('Fetch societies error, using fallback:', err);
    return DEFAULT_SOCIETIES;
  }
}

export async function adminSaveSociety(
  society: Partial<Society>
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const payload: any = {};
    const allowed = [
      'name',
      'slug',
      'city',
      'location',
      'description',
      'image_url',
      'master_plan_pdf_url',
      'master_plan_image_url',
      'is_featured',
      'is_active',
    ];
    for (const key of allowed) {
      if ((society as any)[key] !== undefined) {
        payload[key] = (society as any)[key];
      }
    }
    if (!payload.slug && payload.name) {
      payload.slug = payload.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    if (society.id) {
      const { data, error } = await supabase
        .from('societies')
        .update(payload)
        .eq('id', society.id)
        .select()
        .single();
      if (error) throw error;
      dispatchDbEvent(DB_EVENTS.SOCIETIES_UPDATED);
      return { success: true, data };
    } else {
      const { data, error } = await supabase
        .from('societies')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      dispatchDbEvent(DB_EVENTS.SOCIETIES_UPDATED);
      return { success: true, data };
    }
  } catch (err: any) {
    console.error('adminSaveSociety error:', err);
    return { success: false, error: err.message || 'Failed to save society' };
  }
}

export async function adminDeleteSociety(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('societies').delete().eq('id', id);
    if (error) throw error;
    dispatchDbEvent(DB_EVENTS.SOCIETIES_UPDATED);
    return true;
  } catch (err) {
    console.error('adminDeleteSociety error:', err);
    return false;
  }
}

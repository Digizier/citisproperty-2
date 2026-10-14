export type PropertyPurpose = 'buy' | 'rent';
export type PropertyType = 'Homes' | 'Plots' | 'Commercial' | 'Flats';
export type AreaUnit = 'Marla' | 'Kanal' | 'Sq. Ft' | 'Sq. Yds' | 'Acre';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  sort_order?: number;
  created_at?: string;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  sort_order?: number;
  created_at?: string;
}

export interface Society {
  id: string;
  name: string;
  slug: string;
  city: string;
  location: string;
  description?: string;
  image_url?: string;
  master_plan_pdf_url?: string;
  master_plan_image_url?: string;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  category_id: string;
  subcategory_id?: string;
  price: number;
  price_prefix?: string;
  city: string;
  location: string;
  area_size: number;
  area_unit: AreaUnit;
  bedrooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  thumbnail_url: string;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  agent_name?: string;
  agent_phone?: string;
  agent_whatsapp?: string;
  created_at?: string;
  updated_at?: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  image_url: string;
  mobile_image_url?: string;
  link_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  property_id?: string;
  property_title?: string;
  status: 'New' | 'Contacted' | 'Closed';
  created_at?: string;
}

export interface SiteSettings {
  id: string;
  site_name: string;
  tagline: string;
  phones: string;
  whatsapp: string;
  email: string;
  address: string;
  google_maps_url: string;
  google_review_url: string;
  facebook_url: string;
  admin_pin: string;
  updated_at?: string;
}

export interface PropertyFilter {
  purpose?: PropertyPurpose;
  type?: PropertyType;
  city?: string;
  category_id?: string;
  subcategory_id?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  searchQuery?: string;
  page?: number;
  limit?: number;
}

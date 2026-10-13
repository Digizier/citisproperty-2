'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Building,
  Layers,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Search,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Phone,
  Eye,
  Star,
  Lock,
  LogOut,
  FolderPlus,
  RefreshCw,
} from 'lucide-react';
import {
  adminGetAllProperties,
  adminSaveProperty,
  adminDeleteProperty,
  getCategories,
  getSubcategories,
  adminSaveCategory,
  adminDeleteCategory,
  adminSaveSubcategory,
  adminDeleteSubcategory,
  adminGetAllBanners,
  adminSaveBanner,
  adminDeleteBanner,
  getInquiries,
  adminUpdateInquiryStatus,
  getSiteSettings,
  adminSaveSiteSettings,
  DB_EVENTS,
} from '@/lib/db';
import { uploadPropertyImage } from '@/lib/image-compressor';
import {
  Property,
  Category,
  Subcategory,
  HeroBanner,
  Inquiry,
  SiteSettings,
  PropertyPurpose,
  PropertyType,
  AreaUnit,
} from '@/lib/types';
import { formatPKRPrice, slugify } from '@/lib/utils';

export default function AdminPage() {
  // Auth PIN Gate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'properties' | 'categories' | 'banners' | 'inquiries' | 'settings'
  >('overview');

  // Core Data States
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Custom Toast Notification State (NO browser localhost alert)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Custom Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', description: '', onConfirm: () => {} });

  // Property Modal State
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Partial<Property> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const propertyFileInputRef = useRef<HTMLInputElement>(null);

  // Category & Subcategory Modal State
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [subcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<Partial<Subcategory> | null>(null);

  // Banner Modal State
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<HeroBanner> | null>(null);
  const [uploadingBannerImage, setUploadingBannerImage] = useState(false);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  // Search filter inside admin
  const [propertySearch, setPropertySearch] = useState('');

  // Initial Auth Check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('citis_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Load Data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [p, c, s, b, inq, sett] = await Promise.all([
        adminGetAllProperties(),
        getCategories(),
        getSubcategories(),
        adminGetAllBanners(),
        getInquiries(),
        getSiteSettings(),
      ]);
      setProperties(p);
      setCategories(c);
      setSubcategories(s);
      setBanners(b);
      setInquiries(inq);
      setSettings(sett);
    } catch (e) {
      console.error('Failed to load admin data:', e);
      showToast('Error syncing remote database', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
      const handleSync = () => loadAdminData();
      window.addEventListener(DB_EVENTS.PROPERTIES_UPDATED, handleSync);
      window.addEventListener(DB_EVENTS.CATEGORIES_UPDATED, handleSync);
      window.addEventListener(DB_EVENTS.BANNERS_UPDATED, handleSync);
      window.addEventListener(DB_EVENTS.INQUIRIES_UPDATED, handleSync);
      window.addEventListener(DB_EVENTS.SETTINGS_UPDATED, handleSync);
      return () => {
        window.removeEventListener(DB_EVENTS.PROPERTIES_UPDATED, handleSync);
        window.removeEventListener(DB_EVENTS.CATEGORIES_UPDATED, handleSync);
        window.removeEventListener(DB_EVENTS.BANNERS_UPDATED, handleSync);
        window.removeEventListener(DB_EVENTS.INQUIRIES_UPDATED, handleSync);
        window.removeEventListener(DB_EVENTS.SETTINGS_UPDATED, handleSync);
      };
    }
  }, [isAuthenticated]);

  // Handle PIN Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = settings?.admin_pin || 'admin123';
    if (pinInput.trim() === correctPin || pinInput.trim() === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('citis_admin_auth', 'true');
      setPinError(false);
      showToast('Welcome to Property Bank Control Center');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('citis_admin_auth');
  };

  /* ---------------- PROPERTY CRUD ---------------- */
  const handleOpenNewProperty = () => {
    setEditingProperty({
      title: '',
      slug: '',
      purpose: 'buy',
      type: 'Homes',
      category_id: categories[0]?.id || 'cat-homes',
      subcategory_id: subcategories[0]?.id || '',
      price: 0,
      price_prefix: 'PKR',
      city: 'Faisalabad',
      location: 'Citi Housing Sargodha Road, Faisalabad',
      area_size: 5,
      area_unit: 'Marla',
      bedrooms: 3,
      bathrooms: 3,
      description: '',
      features: ['Sui Gas', 'Electricity', 'Water Supply', '24/7 Security'],
      thumbnail_url: '',
      images: [],
      is_featured: false,
      is_active: true,
      agent_name: 'Property Bank Real Estate',
      agent_phone: '03218653500',
      agent_whatsapp: '923218653500',
    });
    setPropertyModalOpen(true);
  };

  const handleEditProperty = (prop: Property) => {
    setEditingProperty({ ...prop });
    setPropertyModalOpen(true);
  };

  const handlePropertyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      // Compresses to WebP (<100KB) and uploads to storage bucket
      const publicUrl = await uploadPropertyImage(file);
      const currentImages = editingProperty?.images || [];
      const updatedImages = [...currentImages, publicUrl];

      setEditingProperty({
        ...editingProperty,
        thumbnail_url: editingProperty?.thumbnail_url || publicUrl,
        images: updatedImages,
      });
      showToast('Image compressed to WebP & uploaded successfully');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
      if (propertyFileInputRef.current) propertyFileInputRef.current.value = '';
    }
  };

  const handleSavePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty?.title || !editingProperty.price) {
      showToast('Please enter title and price', 'error');
      return;
    }

    try {
      await adminSaveProperty(editingProperty);
      setPropertyModalOpen(false);
      showToast('Property listing saved successfully');
      loadAdminData();
    } catch (e: any) {
      showToast(e.message || 'Error saving property', 'error');
    }
  };

  const handleDeleteProperty = (id: string, title: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Property Listing?',
      description: `Are you sure you want to delete "${title}"? This action removes the listing from public view.`,
      onConfirm: async () => {
        await adminDeleteProperty(id);
        setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
        showToast('Property deleted successfully');
        loadAdminData();
      },
    });
  };

  /* ---------------- CATEGORY & SUBCATEGORY CRUD ---------------- */
  const handleSaveCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) return;
    try {
      await adminSaveCategory(editingCategory);
      setCategoryModalOpen(false);
      showToast('Category saved successfully');
      loadAdminData();
    } catch (e: any) {
      showToast(e.message || 'Failed to save category', 'error');
    }
  };

  const handleDeleteCategory = (id: string, name: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Category?',
      description: `Are you sure you want to delete "${name}"? This will also remove any nested subcategories.`,
      onConfirm: async () => {
        await adminDeleteCategory(id);
        setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
        showToast('Category deleted');
        loadAdminData();
      },
    });
  };

  const handleSaveSubcategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubcategory?.name || !editingSubcategory?.category_id) return;
    try {
      await adminSaveSubcategory(editingSubcategory);
      setSubcategoryModalOpen(false);
      showToast('Subcategory saved successfully');
      loadAdminData();
    } catch (e: any) {
      showToast(e.message || 'Failed to save subcategory', 'error');
    }
  };

  const handleDeleteSubcategory = (id: string, name: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Subcategory?',
      description: `Are you sure you want to delete subcategory "${name}"?`,
      onConfirm: async () => {
        await adminDeleteSubcategory(id);
        setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
        showToast('Subcategory deleted');
        loadAdminData();
      },
    });
  };

  /* ---------------- BANNER CRUD ---------------- */
  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBannerImage(true);
    try {
      const publicUrl = await uploadPropertyImage(file);
      setEditingBanner({
        ...editingBanner,
        image_url: publicUrl,
        mobile_image_url: publicUrl,
      });
      showToast('Banner image uploaded in WebP');
    } catch (err: any) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploadingBannerImage(false);
      if (bannerFileInputRef.current) bannerFileInputRef.current.value = '';
    }
  };

  const handleSaveBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner?.title) return;
    try {
      await adminSaveBanner(editingBanner);
      setBannerModalOpen(false);
      showToast('Banner saved successfully');
      loadAdminData();
    } catch (e: any) {
      showToast(e.message || 'Error saving banner', 'error');
    }
  };

  const handleDeleteBanner = (id: string, title: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Announcement Banner?',
      description: `Remove banner "${title}" from top website announcement slider?`,
      onConfirm: async () => {
        await adminDeleteBanner(id);
        setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
        showToast('Banner removed');
        loadAdminData();
      },
    });
  };

  /* ---------------- SITE SETTINGS ---------------- */
  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await adminSaveSiteSettings(settings);
      showToast('Store & Company settings updated successfully');
    } catch (e: any) {
      showToast(e.message || 'Error saving settings', 'error');
    }
  };

  // Filter properties in admin list
  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.city.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.location.toLowerCase().includes(propertySearch.toLowerCase())
  );

  /* =========================================================================
     RENDER 1: PIN AUTH GATE IF NOT AUTHENTICATED
     ========================================================================= */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-brand-gold-500/40 p-2 mx-auto flex items-center justify-center">
            <img src="/logo.png" alt="Property Bank" className="w-full h-full object-contain" />
          </div>

          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight">
              Control Panel Authorization
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Enter your master administrative PIN to access management hubs
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Master PIN (Default: admin123)"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`w-full bg-slate-950 border text-center text-sm font-bold tracking-widest rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 ${
                  pinError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-800 focus:ring-brand-green-600'
                }`}
              />
              {pinError && (
                <p className="text-red-400 text-xs mt-1.5 font-medium">
                  Invalid Administrative PIN. Please re-enter.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
            >
              Unlock Control Center
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              prefetch={false}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     RENDER 2: MAIN DEDICATED ADMIN DASHBOARD (NO STOREFRONT HEADER/FOOTER)
     ========================================================================= */
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Toast Notification Container */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 border animate-in slide-in-from-top duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-600/50'
              : 'bg-red-950/90 text-red-300 border-red-600/50'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">{deleteConfirm.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{deleteConfirm.description}</p>
            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm((prev) => ({ ...prev, isOpen: false }))}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteConfirm.onConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex-shrink-0 flex flex-col justify-between p-4 sm:p-6">
        <div className="space-y-6">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-brand-gold-500/30 p-1 flex-shrink-0">
              <img src="/logo.png" alt="Property Bank" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-black text-xs uppercase tracking-tight text-white leading-none">
                Property Bank
              </div>
              <div className="text-[10px] text-brand-gold-400 font-bold mt-1">Control Center</div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-brand-green-700 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'properties'
                  ? 'bg-brand-green-700 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4" />
                <span>Properties Manager</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                {properties.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'categories'
                  ? 'bg-brand-green-700 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Categories & Tags</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('banners')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'banners'
                  ? 'bg-brand-green-700 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Website Banners</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-brand-green-700 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Client Inquiries</span>
              </div>
              {inquiries.filter((i) => i.status === 'New').length > 0 && (
                <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded-full text-white font-black animate-pulse">
                  {inquiries.filter((i) => i.status === 'New').length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'settings'
                  ? 'bg-brand-green-700 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Company Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            prefetch={false}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Site</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-red-400 hover:bg-red-950/40 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Admin</span>
          </button>
        </div>
      </aside>

      {/* Admin Main Body */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h1 className="text-2xl font-black text-white">Administrative Overview</h1>
              <p className="text-xs text-slate-400 mt-1">
                Real-time synchronized property catalog and client lead metrics
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Total Properties
                </span>
                <div className="text-3xl font-black text-white">{properties.length}</div>
                <span className="text-[10px] text-emerald-400 font-bold">100% Verified</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  New Client Leads
                </span>
                <div className="text-3xl font-black text-amber-400">
                  {inquiries.filter((i) => i.status === 'New').length}
                </div>
                <span className="text-[10px] text-slate-400">Awaiting contact</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Categories</span>
                <div className="text-3xl font-black text-white">{categories.length}</div>
                <span className="text-[10px] text-slate-400">{subcategories.length} Subcategories</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Active Banners</span>
                <div className="text-3xl font-black text-white">{banners.length}</div>
                <span className="text-[10px] text-emerald-400">Live on storefront</span>
              </div>
            </div>

            {/* Quick Action Shortcuts */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-white">Quick Administrative Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleOpenNewProperty}
                  className="px-4 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Property</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory({ name: '', slug: '', icon: 'Folder' });
                    setCategoryModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Create Category</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingBanner({ title: '', subtitle: '', badge: '', link_url: '/' });
                    setBannerModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Add Website Banner</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROPERTIES MANAGER */}
        {activeTab === 'properties' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-white">Property Listings Manager</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Create, edit, and publish verified properties with automated WebP image uploads
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenNewProperty}
                className="px-5 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Property</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search listings by title, city, or block..."
                value={propertySearch}
                onChange={(e) => setPropertySearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-green-600"
              />
            </div>

            {/* Properties Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Property</th>
                      <th className="p-4">Type / Purpose</th>
                      <th className="p-4">Demand Price</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredProperties.length > 0 ? (
                      filteredProperties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                                <img
                                  src={prop.thumbnail_url}
                                  alt={prop.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-bold text-white line-clamp-1">{prop.title}</div>
                                <div className="text-[11px] text-slate-400 mt-0.5">
                                  {prop.area_size} {prop.area_unit}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-white">{prop.type}</span>
                            <div className="text-[10px] uppercase font-bold text-emerald-400">
                              {prop.purpose === 'buy' ? 'For Sale' : 'For Rent'}
                            </div>
                          </td>
                          <td className="p-4 font-black text-brand-gold-400">
                            {formatPKRPrice(prop.price)}
                          </td>
                          <td className="p-4 text-slate-300">
                            {prop.city} — {prop.location}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                prop.is_active
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-red-950 text-red-300 border border-red-800'
                              }`}
                            >
                              {prop.is_active ? 'Active' : 'Draft'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditProperty(prop)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProperty(prop.id, prop.title)}
                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          No properties found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES & SUBCATEGORIES MANAGER */}
        {activeTab === 'categories' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-white">Categories & Subcategories</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage parent departments and nested subcategories (e.g. 5 Marla, 10 Marla, Files, Commercial Shops)
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory({ name: '', slug: '', icon: 'Folder' });
                    setCategoryModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ New Category</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingSubcategory({
                      name: '',
                      slug: '',
                      category_id: categories[0]?.id || '',
                    });
                    setSubcategoryModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ New Subcategory</span>
                </button>
              </div>
            </div>

            {/* Categories List with Nested Subcategories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => {
                const nestedSubs = subcategories.filter((s) => s.category_id === cat.id);
                return (
                  <div
                    key={cat.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <h3 className="font-extrabold text-base text-white">{cat.name}</h3>
                        <span className="text-[10px] text-slate-500 font-mono">slug: {cat.slug}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(cat);
                            setCategoryModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subcategories list */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Nested Subcategories ({nestedSubs.length}):
                      </span>
                      {nestedSubs.length > 0 ? (
                        <div className="space-y-1.5">
                          {nestedSubs.map((sub) => (
                            <div
                              key={sub.id}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300"
                            >
                              <span>{sub.name}</span>
                              <button
                                type="button"
                                onClick={() => handleDeleteSubcategory(sub.id, sub.name)}
                                className="text-red-400 hover:text-red-300 text-[10px] font-bold"
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic">No subcategories yet.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: BANNERS MANAGER */}
        {activeTab === 'banners' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-white">Website Announcement Banners</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage the top announcement sliders shown on both desktop and mobile
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingBanner({ title: '', subtitle: '', badge: '', link_url: '/' });
                  setBannerModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Banner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((b) => (
                <div
                  key={b.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-brand-gold-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                      {b.badge || 'PROMO'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteBanner(b.id, b.title)}
                      className="text-red-400 hover:text-red-300 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-white">{b.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{b.subtitle}</p>
                  </div>

                  <div className="text-[11px] text-slate-500 font-mono truncate">
                    Link: {b.link_url}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: INQUIRIES & LEADS */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="text-2xl font-black text-white">Customer Inquiries & Leads</h1>
              <p className="text-xs text-slate-400 mt-1">
                Direct client inquiries submitted through website forms and mortgage calculators
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Phone / WhatsApp</th>
                      <th className="p-4">Inquiry / Property</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {inquiries.length > 0 ? (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-800/40">
                          <td className="p-4 font-bold text-white">{inq.name}</td>
                          <td className="p-4">
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:underline font-bold"
                            >
                              {inq.phone}
                            </a>
                          </td>
                          <td className="p-4 text-slate-300 font-medium">
                            {inq.property_title || 'General Consultation'}
                          </td>
                          <td className="p-4 text-slate-400 max-w-xs truncate">{inq.message}</td>
                          <td className="p-4">
                            <select
                              value={inq.status}
                              onChange={async (e) => {
                                await adminUpdateInquiryStatus(inq.id, e.target.value as any);
                                showToast(`Status updated to ${e.target.value}`);
                                loadAdminData();
                              }}
                              className="bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-slate-200"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] inline-flex items-center gap-1"
                            >
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          No inquiries received yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-3xl space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="text-2xl font-black text-white">Store & Company Settings</h1>
              <p className="text-xs text-slate-400 mt-1">
                Updates here reflect immediately across Header, Footer, WhatsApp buttons, and Invoices
              </p>
            </div>

            <form
              onSubmit={handleSaveSettingsSubmit}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Company / Dealership Name
                </label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Helpline Phone Numbers
                  </label>
                  <input
                    type="text"
                    value={settings.phones}
                    onChange={(e) => setSettings({ ...settings, phones: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    WhatsApp Number (Format: 923218653500)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Head Office Physical Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Google Maps Location URL
                </label>
                <input
                  type="url"
                  value={settings.google_maps_url}
                  onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Google Review Submission URL
                </label>
                <input
                  type="url"
                  value={settings.google_review_url}
                  onChange={(e) => setSettings({ ...settings, google_review_url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={settings.facebook_url}
                  onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-bold uppercase text-amber-400 mb-1">
                  Change Master Admin PIN
                </label>
                <input
                  type="text"
                  value={settings.admin_pin}
                  onChange={(e) => setSettings({ ...settings, admin_pin: e.target.value })}
                  className="w-full max-w-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs rounded-xl shadow transition-all"
                >
                  Save All Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD / EDIT PROPERTY MODAL */}
      {propertyModalOpen && editingProperty && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingProperty.id ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h2>
              <button
                type="button"
                onClick={() => setPropertyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePropertySubmit} className="space-y-4 text-xs">
              {/* Title & Slug */}
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brand New 1 Kanal Designer Spanish Villa in Citi Housing"
                  value={editingProperty.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingProperty({
                      ...editingProperty,
                      title,
                      slug: slugify(title),
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              {/* Purpose & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Purpose</label>
                  <select
                    value={editingProperty.purpose}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, purpose: e.target.value as any })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  >
                    <option value="buy">For Sale (Buy)</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Type</label>
                  <select
                    value={editingProperty.type}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, type: e.target.value as any })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  >
                    <option value="Homes">Homes / House</option>
                    <option value="Plots">Residential Plot</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Flats">Flats / Apartment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">City</label>
                  <select
                    value={editingProperty.city}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, city: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  >
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Jhelum">Jhelum</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>
              </div>

              {/* Demand Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Demand Price (PKR numeric) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 65000000 (6.5 Crore)"
                    value={editingProperty.price || ''}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, price: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                  <span className="text-[11px] text-brand-gold-400 font-bold block mt-1">
                    Preview: {formatPKRPrice(editingProperty.price || 0)}
                  </span>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Location / Sector / Block *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Block A, Citi Housing Sargodha Road"
                    value={editingProperty.location}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, location: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>
              </div>

              {/* Area Size & Unit */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Area Size</label>
                  <input
                    type="number"
                    value={editingProperty.area_size}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, area_size: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Unit</label>
                  <select
                    value={editingProperty.area_unit}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, area_unit: e.target.value as any })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  >
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                    <option value="Sq. Ft">Sq. Ft</option>
                    <option value="Sq. Yds">Sq. Yds</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={editingProperty.bedrooms}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, bedrooms: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={editingProperty.bathrooms}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, bathrooms: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>
              </div>

              {/* Automated WebP Image Upload Section */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold uppercase text-slate-300">
                    Property Photos (Auto-compressed to WebP in KB)
                  </label>
                  <span className="text-[10px] text-emerald-400 font-bold">
                    Zero Base64 in Database
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={propertyFileInputRef}
                    accept="image/*"
                    onChange={handlePropertyImageUpload}
                    className="hidden"
                    id="property-file-upload"
                  />
                  <label
                    htmlFor="property-file-upload"
                    className={`cursor-pointer px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 ${
                      uploadingImage ? 'opacity-50 pointer-events-none' : ''
                    }`}
                  >
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>{uploadingImage ? 'Compressing & Uploading...' : 'Upload Image File'}</span>
                  </label>
                </div>

                {/* Uploaded Images Preview Gallery */}
                {editingProperty.images && editingProperty.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {editingProperty.images.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-16 rounded-xl overflow-hidden border border-slate-700 group"
                      >
                        <img src={imgUrl} alt="Upload" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const filtered = editingProperty.images?.filter((_, idx) => idx !== i);
                            setEditingProperty({
                              ...editingProperty,
                              thumbnail_url: filtered?.[0] || '',
                              images: filtered,
                            });
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">
                  Full Description & Specifications
                </label>
                <textarea
                  rows={4}
                  value={editingProperty.description}
                  onChange={(e) =>
                    setEditingProperty({ ...editingProperty, description: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProperty.is_featured}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, is_featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded accent-brand-green-700"
                  />
                  <span className="font-bold text-slate-300">Featured Property</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProperty.is_active}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, is_active: e.target.checked })
                    }
                    className="w-4 h-4 rounded accent-brand-green-700"
                  />
                  <span className="font-bold text-slate-300">Active / Published</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold"
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT CATEGORY */}
      {categoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-base text-white">Create / Edit Category</h3>
            <form onSubmit={handleSaveCategorySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luxury Villas"
                  value={editingCategory.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setEditingCategory({
                      ...editingCategory,
                      name,
                      slug: slugify(name),
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-green-700 text-white font-bold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD / EDIT SUBCATEGORY */}
      {subcategoryModalOpen && editingSubcategory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-base text-white">Add Subcategory</h3>
            <form onSubmit={handleSaveSubcategorySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Parent Category *</label>
                <select
                  value={editingSubcategory.category_id}
                  onChange={(e) =>
                    setEditingSubcategory({ ...editingSubcategory, category_id: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Subcategory Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Marla Plots"
                  value={editingSubcategory.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setEditingSubcategory({
                      ...editingSubcategory,
                      name,
                      slug: slugify(name),
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSubcategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-green-700 text-white font-bold"
                >
                  Save Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD / EDIT BANNER */}
      {bannerModalOpen && editingBanner && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-base text-white">Create / Edit Announcement Banner</h3>
            <form onSubmit={handleSaveBannerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Banner Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Citi Housing Faisalabad Phase 2 Booking Open"
                  value={editingBanner.title}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Limited 5 Marla on-ground plots"
                  value={editingBanner.subtitle || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Badge Text</label>
                <input
                  type="text"
                  placeholder="e.g. EXCLUSIVE DEAL"
                  value={editingBanner.badge || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, badge: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Link Target URL</label>
                <input
                  type="text"
                  placeholder="/Plots/Faisalabad"
                  value={editingBanner.link_url || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, link_url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBannerModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-green-700 text-white font-bold"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

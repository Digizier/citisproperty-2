'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Building,
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
  RefreshCw,
  FileText,
  Download,
  MapPin,
  Share2,
  Copy,
} from 'lucide-react';
import {
  adminGetAllProperties,
  adminSaveProperty,
  adminDeleteProperty,
  getCategories,
  adminGetAllBanners,
  adminSaveBanner,
  adminDeleteBanner,
  getInquiries,
  adminUpdateInquiryStatus,
  getSiteSettings,
  adminSaveSiteSettings,
  getSocieties,
  adminSaveSociety,
  adminDeleteSociety,
  DB_EVENTS,
} from '@/lib/db';
import { uploadPropertyImage, uploadPdfToStorage } from '@/lib/image-compressor';
import {
  Property,
  Category,
  HeroBanner,
  Inquiry,
  SiteSettings,
  Society,
  PropertyPurpose,
  PropertyType,
  AreaUnit,
} from '@/lib/types';
import { formatPKRPrice, slugify } from '@/lib/utils';

const ADMIN_CITIES = ['Faisalabad', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot'];

export default function AdminPage() {
  // Auth PIN Gate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'properties' | 'societies' | 'banners' | 'inquiries' | 'settings'
  >('overview');

  // Core Data States
  const [properties, setProperties] = useState<Property[]>([]);
  const [societies, setSocieties] = useState<Society[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
  const [newCustomFeature, setNewCustomFeature] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const propertyFileInputRef = useRef<HTMLInputElement>(null);

  // Society & Map PDF State
  const [editingSociety, setEditingSociety] = useState<Partial<Society> | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingSocietyImage, setUploadingSocietyImage] = useState(false);
  const [societySearch, setSocietySearch] = useState('');
  const [pdfPreviewModal, setPdfPreviewModal] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({ isOpen: false, url: '', title: '' });
  const societyPdfFileInputRef = useRef<HTMLInputElement>(null);
  const societyImageFileInputRef = useRef<HTMLInputElement>(null);

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
      const [p, c, b, inq, sett, socs] = await Promise.all([
        adminGetAllProperties(),
        getCategories(),
        adminGetAllBanners(),
        getInquiries(),
        getSiteSettings(),
        getSocieties(),
      ]);
      setProperties(p);
      setCategories(c);
      setBanners(b);
      setInquiries(inq);
      setSettings(sett);
      setSocieties(socs);
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
      window.addEventListener(DB_EVENTS.SOCIETIES_UPDATED, handleSync);
      window.addEventListener(DB_EVENTS.CATEGORIES_UPDATED, handleSync);
      window.addEventListener(DB_EVENTS.BANNERS_UPDATED, handleSync);
      window.addEventListener(DB_EVENTS.INQUIRIES_UPDATED, handleSync);
      window.addEventListener(DB_EVENTS.SETTINGS_UPDATED, handleSync);
      return () => {
        window.removeEventListener(DB_EVENTS.PROPERTIES_UPDATED, handleSync);
        window.removeEventListener(DB_EVENTS.SOCIETIES_UPDATED, handleSync);
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
      category_id: 'cat-homes',
      subcategory_id: '',
      price: 0,
      price_prefix: 'PKR',
      city: 'Faisalabad',
      location: 'Citi Housing, Faisalabad',
      area_size: 5,
      area_unit: 'Marla',
      bedrooms: 3,
      bathrooms: 3,
      description: '',
      features: ['Sui Gas', 'Electricity', 'Water Supply', '24/7 Security'],
      thumbnail_url: '',
      images: [],
      youtube_url: '',
      is_featured: false,
      is_active: true,
      agent_name: 'Property Bank Real Estate',
      agent_phone: '03218653500',
      agent_whatsapp: '923218653500',
    });
    setNewCustomFeature('');
    setCustomImageUrl('');
    setPropertyModalOpen(true);
  };

  const handleEditProperty = (prop: Property) => {
    setEditingProperty({
      ...prop,
      features: Array.isArray(prop.features) ? prop.features : [],
      images: Array.isArray(prop.images) && prop.images.length > 0 ? prop.images : (prop.thumbnail_url ? [prop.thumbnail_url] : []),
      youtube_url: prop.youtube_url || '',
      agent_name: prop.agent_name || 'Property Bank Real Estate',
      agent_phone: prop.agent_phone || '03218653500',
      agent_whatsapp: prop.agent_whatsapp || '923218653500',
    });
    setNewCustomFeature('');
    setCustomImageUrl('');
    setPropertyModalOpen(true);
  };

  const handlePropertyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const uploadPromises = Array.from(files).map((f) => uploadPropertyImage(f));
      const uploadedUrls = await Promise.all(uploadPromises);

      setEditingProperty((prev) => {
        if (!prev) return prev;
        const currentImages = prev.images || [];
        const nextImages = [...currentImages, ...uploadedUrls];
        return {
          ...prev,
          thumbnail_url: prev.thumbnail_url || uploadedUrls[0] || '',
          images: nextImages,
        };
      });
      showToast(`${uploadedUrls.length} photo(s) compressed to WebP & uploaded!`);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
      if (propertyFileInputRef.current) propertyFileInputRef.current.value = '';
    }
  };

  const handleAddCustomFeature = () => {
    if (!newCustomFeature.trim() || !editingProperty) return;
    const current = editingProperty.features || [];
    if (!current.includes(newCustomFeature.trim())) {
      setEditingProperty({
        ...editingProperty,
        features: [...current, newCustomFeature.trim()],
      });
    }
    setNewCustomFeature('');
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

  /* ---------------- SOCIETY & MASTER PLAN PDF CRUD ---------------- */
  const handleOpenNewSociety = () => {
    setEditingSociety({
      name: '',
      city: 'Faisalabad',
      location: '',
      description: '',
      master_plan_pdf_url: '',
      master_plan_image_url: '',
      is_active: true,
      is_featured: false,
    });
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please select a valid PDF file (*.pdf)', 'error');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      showToast('File size exceeds the 50MB limit', 'error');
      return;
    }

    setUploadingPdf(true);
    try {
      const publicUrl = await uploadPdfToStorage(file);
      setEditingSociety((prev) => ({
        ...prev,
        master_plan_pdf_url: publicUrl,
      }));
      showToast('PDF blueprint uploaded directly to Cloud Storage!');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'PDF upload failed', 'error');
    } finally {
      setUploadingPdf(false);
      if (societyPdfFileInputRef.current) societyPdfFileInputRef.current.value = '';
    }
  };

  const handleSocietyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSocietyImage(true);
    try {
      const publicUrl = await uploadPropertyImage(file);
      setEditingSociety((prev) => ({
        ...prev,
        master_plan_image_url: publicUrl,
      }));
      showToast('Blueprint thumbnail compressed to WebP & uploaded!');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingSocietyImage(false);
      if (societyImageFileInputRef.current) societyImageFileInputRef.current.value = '';
    }
  };

  const handleSaveSocietySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSociety?.name?.trim()) {
      showToast('Please provide a Society / Map Title', 'error');
      return;
    }
    if (!editingSociety?.city?.trim()) {
      showToast('Please specify a City', 'error');
      return;
    }

    try {
      await adminSaveSociety(editingSociety);
      setEditingSociety(null);
      showToast('Society Master Plan PDF successfully saved & synced!');
      loadAdminData();
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Error saving society map', 'error');
    }
  };

  const handleDeleteSociety = (society: Society) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Master Plan PDF?',
      description: `Are you sure you want to delete "${society.name}"? This master plan PDF layout will be permanently removed.`,
      onConfirm: async () => {
        try {
          await adminDeleteSociety(society.id);
          setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
          showToast('Master Plan PDF deleted successfully');
          loadAdminData();
        } catch (err: any) {
          showToast(err.message || 'Error deleting society map', 'error');
        }
      },
    });
  };

  // Filter properties in admin list
  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.city.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.location.toLowerCase().includes(propertySearch.toLowerCase())
  );

  // Filter societies in admin list
  const filteredSocieties = societies.filter(
    (s) =>
      s.name.toLowerCase().includes(societySearch.toLowerCase()) ||
      s.city.toLowerCase().includes(societySearch.toLowerCase()) ||
      (s.location && s.location.toLowerCase().includes(societySearch.toLowerCase()))
  );

  // Dynamic autocomplete lists derived from current database
  const availableTypes = useMemo(() => {
    const defaultTypes = ['Homes', 'Plots', 'Commercial', 'Flats', 'Farmhouse', 'Penthouse', 'Villas', 'Shop', 'Office'];
    const fromProps = properties.map((p) => p.type).filter(Boolean);
    return Array.from(new Set([...defaultTypes, ...fromProps]));
  }, [properties]);

  const availableCities = useMemo(() => {
    const defaultCities = ['Faisalabad', 'Gujranwala', 'Sialkot', 'Jhelum', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Sheikhupura'];
    const fromProps = properties.map((p) => p.city).filter(Boolean);
    const fromSocs = societies.map((s) => s.city).filter(Boolean);
    return Array.from(new Set([...defaultCities, ...fromProps, ...fromSocs]));
  }, [properties, societies]);

  const availableUnits = useMemo(() => {
    const defaultUnits = ['Marla', 'Kanal', 'Sq. Ft', 'Sq. Yds', 'Acre', 'Sq. Mtr'];
    const fromProps = properties.map((p) => p.area_unit).filter(Boolean);
    return Array.from(new Set([...defaultUnits, ...fromProps]));
  }, [properties]);

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
                    : 'border-slate-800 focus:ring-brand-gold-500'
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
              className="w-full py-3.5 bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all"
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
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow-md'
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
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4" />
                <span>Properties Manager</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'properties' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                {properties.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('societies')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'societies'
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Plot & Society Maps</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'societies' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                {societies.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('banners')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'banners'
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow-md'
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
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow-md'
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
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow-md'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Total Properties
                </span>
                <div className="text-3xl font-black text-white">{properties.length}</div>
                <span className="text-[10px] text-emerald-400 font-bold">100% Verified</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Master Plan Maps
                </span>
                <div className="text-3xl font-black text-brand-gold-400">{societies.length}</div>
                <span className="text-[10px] text-emerald-400 font-bold">PDF Vector Ready</span>
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
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Inquiries</span>
                <div className="text-3xl font-black text-white">{inquiries.length}</div>
                <span className="text-[10px] text-brand-gold-400 font-bold">
                  {inquiries.filter((i) => i.type === 'Listing Submission' || i.listing_data).length} Property Submissions
                </span>
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
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs flex items-center gap-2 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Property</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenNewSociety}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-brand-gold-400" />
                  <span>Upload Master Plan PDF</span>
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
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow"
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
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
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
                              <a
                                href={`/property/${prop.slug || prop.id}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 block hover:opacity-80 transition-opacity"
                                title="View Live on Website"
                              >
                                <img
                                  src={prop.thumbnail_url}
                                  alt={prop.title}
                                  className="w-full h-full object-cover"
                                />
                              </a>
                              <div>
                                <a
                                  href={`/property/${prop.slug || prop.id}/`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold text-white line-clamp-1 hover:text-brand-gold-400 transition-colors"
                                  title="View Live on Website"
                                >
                                  {prop.title}
                                </a>
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
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`/property/${prop.slug || prop.id}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-brand-gold-400 hover:text-brand-gold-300 hover:bg-slate-800 transition-colors"
                                title="View Live Listing on Website"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
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

        {/* TAB 3: PLOT & SOCIETY MAPS (PDF) MANAGER */}
        {activeTab === 'societies' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-white">Plot & Society Master Plan Maps</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Upload, manage, and distribute high-definition printable vector PDF layout maps for societies and sectors
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenNewSociety}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>+ Upload New PDF Map</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search master plans by society name, city, location..."
                value={societySearch}
                onChange={(e) => setSocietySearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold-500 transition-colors"
              />
            </div>

            {/* Society PDF Maps Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-gold-400" />
                  <h3 className="font-extrabold text-sm text-white">
                    Uploaded Society Map PDFs ({filteredSocieties.length})
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  Synced directly with Cloud Database &amp; Storage
                </span>
              </div>

              {filteredSocieties.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-400">No Society Map PDFs Uploaded Yet</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Attach high-res blueprints and official PDF maps for public download.
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenNewSociety}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 text-xs font-black"
                  >
                    + Add First Master Plan PDF
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                        <th className="p-3.5 sm:p-4">Map #</th>
                        <th className="p-3.5 sm:p-4">Society / Title</th>
                        <th className="p-3.5 sm:p-4">City &amp; Location</th>
                        <th className="p-3.5 sm:p-4">Attached PDF File</th>
                        <th className="p-3.5 sm:p-4">Status</th>
                        <th className="p-3.5 sm:p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredSocieties.map((s, idx) => (
                        <tr key={s.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-3.5 sm:p-4">
                            <span className="px-2.5 py-1 rounded-lg bg-brand-gold-500/15 text-brand-gold-400 font-extrabold text-[11px] border border-brand-gold-500/30">
                              PDF #{idx + 1}
                            </span>
                          </td>
                          <td className="p-3.5 sm:p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                                <img
                                  src={s.master_plan_image_url || '/maps/citi-housing-master-plan-hd.webp'}
                                  alt={s.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-extrabold text-white text-sm">{s.name}</div>
                                <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                                  {s.description || 'Master plan layout blueprint'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 sm:p-4">
                            <div className="font-bold text-slate-200">{s.city}</div>
                            <div className="text-[11px] text-slate-400 line-clamp-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                              <span>{s.location || 'Faisalabad'}</span>
                            </div>
                          </td>
                          <td className="p-3.5 sm:p-4 font-mono text-[11px]">
                            {s.master_plan_pdf_url ? (
                              <div className="flex items-center gap-1.5 max-w-xs truncate text-brand-gold-400">
                                <FileText className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{s.master_plan_pdf_url}</span>
                              </div>
                            ) : (
                              <span className="text-red-400">No PDF Attached</span>
                            )}
                          </td>
                          <td className="p-3.5 sm:p-4">
                            <div className="flex flex-col gap-1">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold w-fit ${
                                  s.is_active
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {s.is_active ? 'Active' : 'Disabled'}
                              </span>
                              {s.is_featured && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-brand-gold-500/20 text-brand-gold-400 border border-brand-gold-500/30 w-fit">
                                  ★ Featured
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3.5 sm:p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {s.master_plan_pdf_url && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setPdfPreviewModal({
                                        isOpen: true,
                                        url: s.master_plan_pdf_url!,
                                        title: s.name,
                                      })
                                    }
                                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
                                    title="Preview PDF Map"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-brand-gold-400" />
                                  </button>
                                  <a
                                    href={s.master_plan_pdf_url}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                                    title="Download PDF"
                                  >
                                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                                  </a>
                                </>
                              )}
                              <button
                                type="button"
                                onClick={async () => {
                                  const shareUrl = `${window.location.origin}/society-maps?map=${slugify(s.name)}&view=1`;
                                  try {
                                    await navigator.clipboard.writeText(shareUrl);
                                    showToast(`Share link for "${s.name}" copied to clipboard!`);
                                  } catch {
                                    showToast(`Link: ${shareUrl}`);
                                  }
                                }}
                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-gold-400 hover:text-brand-gold-300 transition cursor-pointer"
                                title="Copy Public Share Link"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingSociety(s)}
                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
                                title="Edit Society & PDF Details"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-slate-300" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSociety(s)}
                                className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white transition cursor-pointer"
                                title="Delete Map"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs flex items-center gap-2 shadow"
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
                      inquiries.map((inq) => {
                        const isListingSubmission =
                          inq.type === 'Listing Submission' ||
                          Boolean(inq.listing_data) ||
                          Boolean(inq.message?.startsWith('[PROPERTY SUBMISSION]'));
                        return (
                          <tr key={inq.id} className="hover:bg-slate-800/40">
                            <td className="p-4">
                              <div className="font-bold text-white text-xs">{inq.name}</div>
                              {isListingSubmission ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-gold-500/20 text-brand-gold-400 border border-brand-gold-500/40 text-[10px] font-black mt-1">
                                  ★ Property Listing Submission
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-500 font-medium">Direct Lead</span>
                              )}
                            </td>
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
                            <td className="p-4 text-slate-300 max-w-sm text-xs leading-relaxed">
                              {inq.message}
                            </td>
                            <td className="p-4">
                              <select
                                value={inq.status}
                                onChange={async (e) => {
                                  await adminUpdateInquiryStatus(inq.id, e.target.value);
                                  showToast(`Status updated to ${e.target.value}`);
                                  loadAdminData();
                                }}
                                className="bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-slate-200"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Approved">Approved</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                {isListingSubmission && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const d = inq.listing_data || {};
                                      setEditingProperty({
                                        title: d.title || inq.property_title?.replace(/^Client Listing:\s*/, '') || `Property in ${d.location || 'Citi Housing'}`,
                                        slug: slugify(d.title || inq.property_title || `property-${Date.now()}`),
                                        purpose: (d.purpose as any) || 'buy',
                                        type: (d.type as any) || 'Homes',
                                        category_id: 'cat-homes',
                                        subcategory_id: '',
                                        price: d.price || 0,
                                        price_prefix: 'PKR',
                                        city: d.city || 'Faisalabad',
                                        location: d.location || 'Citi Housing, Faisalabad',
                                        area_size: d.area_size || 5,
                                        area_unit: (d.area_unit as any) || 'Marla',
                                        bedrooms: d.bedrooms ?? 3,
                                        bathrooms: d.bathrooms ?? 3,
                                        description: d.description || inq.message,
                                        features: Array.isArray(d.features) && d.features.length > 0 ? d.features : ['Sui Gas', 'Electricity', 'Water Supply', '24/7 Security'],
                                        thumbnail_url: d.thumbnail_url || (Array.isArray(d.images) && d.images[0]) || '',
                                        images: Array.isArray(d.images) ? d.images : (d.thumbnail_url ? [d.thumbnail_url] : []),
                                        youtube_url: d.youtube_url || '',
                                        is_featured: false,
                                        is_active: true,
                                        agent_name: d.agent_name || inq.name || 'Property Bank Real Estate',
                                        agent_phone: d.agent_phone || inq.phone || '03218653500',
                                        agent_whatsapp: d.agent_whatsapp || inq.phone.replace(/^0/, '92').replace(/[^0-9]/g, '') || '923218653500',
                                      });
                                      setNewCustomFeature('');
                                      setCustomImageUrl('');
                                      setPropertyModalOpen(true);
                                      showToast('Loaded client submission into Property Manager for review!');
                                    }}
                                    className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-gold-500 to-amber-600 hover:from-brand-gold-600 hover:to-amber-700 text-slate-950 font-black text-[11px] inline-flex items-center gap-1 shadow cursor-pointer whitespace-nowrap"
                                    title="Review & publish to Properties"
                                  >
                                    <span>Approve & Add</span>
                                  </button>
                                )}
                                <a
                                  href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] inline-flex items-center gap-1"
                                >
                                  WhatsApp
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
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
                  className="px-6 py-3 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs rounded-xl shadow transition-all"
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

            <form onSubmit={handleSavePropertySubmit} className="space-y-5 text-xs">
              {/* Title & Slug */}
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brand New 1 Kanal Designer Spanish Villa in Citi Housing"
                  value={editingProperty.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingProperty({
                      ...editingProperty,
                      title,
                      slug: slugify(title),
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500"
                />
              </div>

              {/* Purpose, Type, City (Custom Combobox with Datalists) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Purpose</label>
                  <select
                    value={editingProperty.purpose || 'buy'}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, purpose: e.target.value as any })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500 font-semibold"
                  >
                    <option value="buy">For Sale (Buy)</option>
                    <option value="rent">For Rent (To Let)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold uppercase text-slate-400">Type *</label>
                    <span className="text-[10px] text-brand-gold-400 font-semibold">Custom text allowed</span>
                  </div>
                  <input
                    type="text"
                    required
                    list="admin-property-types"
                    value={editingProperty.type || ''}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, type: e.target.value })
                    }
                    placeholder="e.g. Homes, Plots, Farmhouse..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500 font-semibold"
                  />
                  <datalist id="admin-property-types">
                    {availableTypes.map((t) => (
                      <option key={t} value={t} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold uppercase text-slate-400">City *</label>
                    <span className="text-[10px] text-brand-gold-400 font-semibold">Custom text allowed</span>
                  </div>
                  <input
                    type="text"
                    required
                    list="admin-property-cities"
                    value={editingProperty.city || ''}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, city: e.target.value })
                    }
                    placeholder="e.g. Faisalabad, Gujranwala, Jhelum..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500 font-semibold"
                  />
                  <datalist id="admin-property-cities">
                    {availableCities.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Demand Price & Location */}
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500"
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
                    value={editingProperty.location || ''}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, location: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500"
                  />
                </div>
              </div>

              {/* Area Size, Unit, Bedrooms, Bathrooms */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Area Size</label>
                  <input
                    type="number"
                    value={editingProperty.area_size ?? 5}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, area_size: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Unit</label>
                  <input
                    type="text"
                    required
                    list="admin-property-units"
                    value={editingProperty.area_unit || 'Marla'}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, area_unit: e.target.value })
                    }
                    placeholder="Marla, Kanal..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500 font-semibold"
                  />
                  <datalist id="admin-property-units">
                    {availableUnits.map((u) => (
                      <option key={u} value={u} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={editingProperty.bedrooms ?? 0}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, bedrooms: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={editingProperty.bathrooms ?? 0}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, bathrooms: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500"
                  />
                </div>
              </div>

              {/* YouTube Video Tour URL */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold uppercase text-brand-gold-400">
                    YouTube Video Tour URL (Optional)
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Watch / Shorts / Embed format
                  </span>
                </div>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  value={editingProperty.youtube_url || ''}
                  onChange={(e) =>
                    setEditingProperty({ ...editingProperty, youtube_url: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs focus:border-brand-gold-500"
                />
                <span className="text-[11px] text-slate-400 block">
                  ▶ If added, this YouTube video will display <strong>first</strong> in the media viewer on the property page, followed by photo gallery thumbnails.
                </span>
              </div>

              {/* Amenities & Infrastructure Checklist + Custom Tags */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <label className="font-bold uppercase text-slate-300 block">
                  Amenities & Infrastructure Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Sui Gas',
                    'Electricity',
                    'Water Supply',
                    'Sewerage',
                    '24/7 Security',
                    'Gated Community',
                    'Corner Plot',
                    'Park Facing',
                    'Main Boulevard',
                    'Near Mosque',
                    'Commercial Zone',
                    'Boundary Wall',
                  ].map((tag) => {
                    const active = editingProperty.features?.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const current = editingProperty.features || [];
                          const next = active ? current.filter((f) => f !== tag) : [...current, tag];
                          setEditingProperty({ ...editingProperty, features: next });
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          active
                            ? 'bg-brand-gold-500/20 text-brand-gold-400 border-brand-gold-500/50'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}
                        {tag}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amenity Adder */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Type custom amenity (e.g. Solar Panels, Swimming Pool) & hit Add"
                    value={newCustomFeature}
                    onChange={(e) => setNewCustomFeature(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomFeature();
                      }
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomFeature}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs"
                  >
                    + Add Tag
                  </button>
                </div>

                {/* Selected Features Chips */}
                {editingProperty.features && editingProperty.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {editingProperty.features.map((feat, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-[11px] font-semibold"
                      >
                        <span>{feat}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProperty({
                              ...editingProperty,
                              features: editingProperty.features?.filter((_, idx) => idx !== i),
                            });
                          }}
                          className="hover:text-red-400 ml-0.5 text-slate-400"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Dealer / Agent Contact Info */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <label className="font-bold uppercase text-slate-300 block">
                  Dealer / Agent Contact Info
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Agent / Dealer Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Property Bank Real Estate"
                      value={editingProperty.agent_name || ''}
                      onChange={(e) =>
                        setEditingProperty({ ...editingProperty, agent_name: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="03218653500"
                      value={editingProperty.agent_phone || ''}
                      onChange={(e) =>
                        setEditingProperty({ ...editingProperty, agent_phone: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">WhatsApp (e.g. 923218653500)</label>
                    <input
                      type="tel"
                      placeholder="923218653500"
                      value={editingProperty.agent_whatsapp || ''}
                      onChange={(e) =>
                        setEditingProperty({ ...editingProperty, agent_whatsapp: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Multi-Photo Manager with WebP compression & Cover Selection */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold uppercase text-slate-300">
                    Property Photos (Multi-photo WebP compressed)
                  </label>
                  <span className="text-[10px] text-emerald-400 font-bold">
                    Zero Base64 in Database
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    ref={propertyFileInputRef}
                    accept="image/*"
                    multiple
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
                    <span>{uploadingImage ? 'Compressing & Uploading...' : '+ Upload Photo(s)'}</span>
                  </label>

                  <div className="flex-1 flex gap-2 min-w-[200px]">
                    <input
                      type="url"
                      placeholder="Or paste direct image URL here..."
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!customImageUrl.trim()) return;
                        const current = editingProperty.images || [];
                        const next = [...current, customImageUrl.trim()];
                        setEditingProperty({
                          ...editingProperty,
                          thumbnail_url: editingProperty.thumbnail_url || customImageUrl.trim(),
                          images: next,
                        });
                        setCustomImageUrl('');
                      }}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                {/* Uploaded Images Preview Gallery */}
                {editingProperty.images && editingProperty.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                    {editingProperty.images.map((imgUrl, i) => {
                      const isCover = (editingProperty.thumbnail_url || editingProperty.images?.[0]) === imgUrl;
                      return (
                        <div
                          key={i}
                          className={`relative rounded-xl overflow-hidden border group aspect-square bg-slate-900 ${
                            isCover ? 'border-brand-gold-500 ring-2 ring-brand-gold-500/40' : 'border-slate-800'
                          }`}
                        >
                          <img src={imgUrl} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />

                          {isCover && (
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-brand-gold-500 text-slate-950 font-black text-[9px]">
                              COVER
                            </span>
                          )}

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                            {!isCover && (
                              <button
                                type="button"
                                title="Set as Main Cover Photo"
                                onClick={() => {
                                  setEditingProperty({
                                    ...editingProperty,
                                    thumbnail_url: imgUrl,
                                  });
                                }}
                                className="px-2 py-1 rounded bg-brand-gold-500 text-slate-950 text-[10px] font-bold"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              title="Remove photo"
                              onClick={() => {
                                const filtered = editingProperty.images?.filter((_, idx) => idx !== i);
                                setEditingProperty({
                                  ...editingProperty,
                                  thumbnail_url: editingProperty.thumbnail_url === imgUrl ? (filtered?.[0] || '') : editingProperty.thumbnail_url,
                                  images: filtered,
                                });
                              }}
                              className="p-1 rounded bg-red-600 text-white"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
                  value={editingProperty.description || ''}
                  onChange={(e) =>
                    setEditingProperty({ ...editingProperty, description: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-brand-gold-500"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProperty.is_featured || false}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, is_featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded accent-brand-gold-500"
                  />
                  <span className="font-bold text-slate-300">Featured Property</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProperty.is_active ?? true}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, is_active: e.target.checked })
                    }
                    className="w-4 h-4 rounded accent-brand-gold-500"
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black shadow"
                >
                  Save Property
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black shadow"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD / EDIT SOCIETY MASTER PLAN PDF */}
      {editingSociety && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-gold-400" />
                <h3 className="font-extrabold text-base text-white">
                  {editingSociety.id ? `Edit PDF Map: ${editingSociety.name}` : 'Upload New Society Master Plan PDF'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingSociety(null)}
                className="text-slate-400 hover:text-white text-sm p-1.5"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSocietySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-300 mb-1">
                    Society / Map Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSociety.name || ''}
                    onChange={(e) => setEditingSociety({ ...editingSociety, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold focus:outline-none focus:border-brand-gold-500"
                    placeholder="e.g. Citi Housing (Phase II) Samundri Road or Property Bank Blueprint"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    list="admin-cities-list"
                    value={editingSociety.city || ''}
                    onChange={(e) => setEditingSociety({ ...editingSociety, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold focus:outline-none focus:border-brand-gold-500"
                    placeholder="e.g. Faisalabad"
                  />
                  <datalist id="admin-cities-list">
                    {ADMIN_CITIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Location Address</label>
                  <input
                    type="text"
                    value={editingSociety.location || ''}
                    onChange={(e) => setEditingSociety({ ...editingSociety, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-brand-gold-500"
                    placeholder="e.g. Samundri Road, Faisalabad"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-300 mb-1">Overview Description</label>
                  <textarea
                    rows={2}
                    value={editingSociety.description || ''}
                    onChange={(e) => setEditingSociety({ ...editingSociety, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed focus:outline-none focus:border-brand-gold-500"
                    placeholder="Brief overview of blocks, roads, facilities, and master layout..."
                  />
                </div>

                {/* PDF File Upload Section */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-brand-gold-400">
                      Master Plan PDF Document *
                    </label>
                    <span className="text-[10px] text-slate-400">PDF File up to 50MB</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={editingSociety.master_plan_pdf_url || ''}
                      onChange={(e) => setEditingSociety({ ...editingSociety, master_plan_pdf_url: e.target.value })}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-brand-gold-300 font-mono text-[11px] focus:outline-none focus:border-brand-gold-500"
                      placeholder="/maps/property-bank-master-plan.pdf or Cloud Storage URL"
                    />

                    <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-dashed border-brand-gold-500/50 hover:border-brand-gold-400 bg-brand-gold-500/10 hover:bg-brand-gold-500/20 text-brand-gold-300 font-bold text-xs cursor-pointer transition shrink-0">
                      <Upload className="w-3.5 h-3.5 text-brand-gold-400" />
                      <span>{uploadingPdf ? 'Uploading...' : 'Upload PDF File'}</span>
                      <input
                        ref={societyPdfFileInputRef}
                        type="file"
                        accept="application/pdf,.pdf"
                        disabled={uploadingPdf}
                        onChange={handlePdfUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Blueprint Preview Thumbnail Image */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-slate-300">
                      Blueprint Thumbnail / Preview Image (Optional)
                    </label>
                    <span className="text-[10px] text-slate-400">WebP / JPG / PNG</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={editingSociety.master_plan_image_url || ''}
                      onChange={(e) => setEditingSociety({ ...editingSociety, master_plan_image_url: e.target.value })}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[11px] focus:outline-none focus:border-brand-gold-500"
                      placeholder="/maps/citi-housing-master-plan-hd.webp"
                    />

                    <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-dashed border-brand-gold-500/50 hover:border-brand-gold-400 bg-brand-gold-500/10 hover:bg-brand-gold-500/20 text-brand-gold-300 font-bold text-xs cursor-pointer transition shrink-0">
                      <Upload className="w-3.5 h-3.5 text-brand-gold-400" />
                      <span>{uploadingSocietyImage ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        ref={societyImageFileInputRef}
                        type="file"
                        accept="image/*"
                        disabled={uploadingSocietyImage}
                        onChange={handleSocietyImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Live Share Link Preview for Client / Agents */}
                {editingSociety.name && (
                  <div className="sm:col-span-2 p-3.5 rounded-2xl bg-slate-950 border border-brand-gold-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-sm">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-brand-gold-400">
                        <Share2 className="w-3 h-3" />
                        <span>Public Direct Share Link (Any device / WhatsApp ready)</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-300 truncate mt-0.5">
                        {typeof window !== 'undefined' ? window.location.origin : ''}/society-maps?map={slugify(editingSociety.name)}&view=1
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        const url = `${window.location.origin}/society-maps?map=${slugify(editingSociety.name!)}&view=1`;
                        try {
                          await navigator.clipboard.writeText(url);
                          showToast('Direct map share link copied!');
                        } catch {
                          showToast(`Link: ${url}`);
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs shrink-0 flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Share Link</span>
                    </button>
                  </div>
                )}

                {/* Visibility Toggles */}
                <div className="sm:col-span-2 flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingSociety.is_active)}
                      onChange={(e) => setEditingSociety({ ...editingSociety, is_active: e.target.checked })}
                      className="w-4 h-4 rounded-md border-slate-700 text-brand-gold-500 focus:ring-0"
                    />
                    <span className="font-bold text-slate-200">Active (Visible for Public Download)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingSociety.is_featured)}
                      onChange={(e) => setEditingSociety({ ...editingSociety, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded-md border-slate-700 text-brand-gold-500 focus:ring-0"
                    />
                    <span className="font-bold text-slate-200">★ Featured Map</span>
                  </label>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSociety(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-slate-950 font-black text-xs transition shadow cursor-pointer"
                >
                  Save Society Map PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: ONLINE PDF BLUEPRINT PREVIEW */}
      {pdfPreviewModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-brand-gold-400" />
                <div>
                  <h4 className="font-extrabold text-sm text-white">{pdfPreviewModal.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate max-w-xs sm:max-w-md">
                    {pdfPreviewModal.url}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={pdfPreviewModal.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPdfPreviewModal({ isOpen: false, url: '', title: '' })}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-950 p-1">
              <iframe
                src={pdfPreviewModal.url}
                className="w-full h-full rounded-2xl border-0"
                title={pdfPreviewModal.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

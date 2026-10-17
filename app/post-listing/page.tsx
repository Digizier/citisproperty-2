'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Upload,
  X,
  Play,
  Sparkles,
  ArrowLeft,
  Building,
  Home,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { submitInquiry, getDistinctPropertyFilterOptions } from '@/lib/db';
import { uploadPropertyImage } from '@/lib/image-compressor';
import { formatPKRPrice } from '@/lib/utils';
import { PropertyPurpose } from '@/lib/types';
import SearchableSelect from '@/components/SearchableSelect';
import { PAKISTAN_CITIES, PROPERTY_TYPES, AREA_UNITS } from '@/lib/constants';

const DEFAULT_AMENITIES = [
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
];

export default function PostListingPage() {
  // Form States
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState<PropertyPurpose>('buy');
  const [propertyType, setPropertyType] = useState('Homes');
  const [city, setCity] = useState('Faisalabad');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [areaSize, setAreaSize] = useState<number | ''>(5);
  const [areaUnit, setAreaUnit] = useState('Marla');
  const [bedrooms, setBedrooms] = useState<number | ''>(3);
  const [bathrooms, setBathrooms] = useState<number | ''>(3);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [features, setFeatures] = useState<string[]>([
    'Sui Gas',
    'Electricity',
    'Water Supply',
    '24/7 Security',
  ]);
  const [newCustomFeature, setNewCustomFeature] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerWhatsapp, setOwnerWhatsapp] = useState('');
  const [description, setDescription] = useState('');

  // Photos State
  const [images, setImages] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic Datalist Options
  const [filterOptions, setFilterOptions] = useState<{
    cities: string[];
    types: string[];
    units: string[];
  }>({
    cities: ['Faisalabad', 'Gujranwala', 'Sialkot', 'Jhelum', 'Lahore', 'Islamabad'],
    types: ['Homes', 'Plots', 'Commercial', 'Flats'],
    units: ['Marla', 'Kanal', 'Sq. Ft', 'Sq. Yd', 'Acre'],
  });

  const combinedCities = useMemo(() => {
    return Array.from(new Set([...PAKISTAN_CITIES, ...(filterOptions.cities || [])]));
  }, [filterOptions.cities]);

  const combinedTypes = useMemo(() => {
    return Array.from(new Set([...PROPERTY_TYPES, ...(filterOptions.types || [])]));
  }, [filterOptions.types]);

  const combinedUnits = useMemo(() => {
    return Array.from(new Set([...AREA_UNITS, ...(filterOptions.units || [])]));
  }, [filterOptions.units]);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getDistinctPropertyFilterOptions().then((opts) => {
      if (opts) setFilterOptions(opts);
    });
  }, []);

  // Sync WhatsApp when phone is entered if WhatsApp is empty
  const handlePhoneChange = (val: string) => {
    setOwnerPhone(val);
    if (!ownerWhatsapp) {
      const clean = val.replace(/^0/, '92').replace(/[^0-9]/g, '');
      setOwnerWhatsapp(clean);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhotos(true);
    setErrorMessage('');
    try {
      const uploadPromises = Array.from(files).map((f) => uploadPropertyImage(f));
      const uploadedUrls = await Promise.all(uploadPromises);

      setImages((prev) => {
        const next = [...prev, ...uploadedUrls];
        if (!thumbnailUrl && uploadedUrls[0]) {
          setThumbnailUrl(uploadedUrls[0]);
        }
        return next;
      });
    } catch (err: any) {
      console.error('Photo upload failed:', err);
      setErrorMessage(err.message || 'Photo upload failed. Please try again.');
    } finally {
      setUploadingPhotos(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddDirectUrl = () => {
    if (!customImageUrl.trim()) return;
    const url = customImageUrl.trim();
    setImages((prev) => [...prev, url]);
    if (!thumbnailUrl) setThumbnailUrl(url);
    setCustomImageUrl('');
  };

  const handleRemovePhoto = (index: number) => {
    const targetUrl = images[index];
    const filtered = images.filter((_, i) => i !== index);
    setImages(filtered);
    if (thumbnailUrl === targetUrl) {
      setThumbnailUrl(filtered[0] || '');
    }
  };

  const handleAddCustomFeature = () => {
    if (!newCustomFeature.trim()) return;
    const tag = newCustomFeature.trim();
    if (!features.includes(tag)) {
      setFeatures([...features, tag]);
    }
    setNewCustomFeature('');
  };

  const toggleFeature = (tag: string) => {
    if (features.includes(tag)) {
      setFeatures(features.filter((f) => f !== tag));
    } else {
      setFeatures([...features, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName.trim() || !ownerPhone.trim() || !location.trim()) {
      setErrorMessage('Please fill in your name, phone number, and property location.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const numericPrice = typeof price === 'number' ? price : 0;
      const effectiveTitle =
        title.trim() ||
        `${areaSize} ${areaUnit} ${propertyType} in ${location}`;

      const listingData = {
        title: effectiveTitle,
        purpose,
        type: propertyType.trim() || 'Homes',
        city: city.trim() || 'Faisalabad',
        location: location.trim(),
        price: numericPrice,
        price_prefix: 'PKR',
        area_size: typeof areaSize === 'number' ? areaSize : 5,
        area_unit: areaUnit.trim() || 'Marla',
        bedrooms: typeof bedrooms === 'number' ? bedrooms : 0,
        bathrooms: typeof bathrooms === 'number' ? bathrooms : 0,
        youtube_url: youtubeUrl.trim(),
        map_url: mapUrl.trim(),
        features,
        thumbnail_url: thumbnailUrl || images[0] || '',
        images,
        description:
          description.trim() ||
          `Client submitted property in ${location}, ${city}. Demand: PKR ${price}.`,
        agent_name: ownerName.trim(),
        agent_phone: ownerPhone.trim(),
        agent_whatsapp: ownerWhatsapp.trim() || ownerPhone.trim().replace(/^0/, '92').replace(/[^0-9]/g, ''),
      };

      const summaryMsg = `[PROPERTY SUBMISSION] Title: ${effectiveTitle} | Purpose: ${purpose.toUpperCase()} | Type: ${propertyType} | City: ${city} | Location: ${location} | Demand: PKR ${price} | Size: ${areaSize} ${areaUnit} | Beds: ${bedrooms} | Baths: ${bathrooms} | Map URL: ${mapUrl.trim() || 'N/A'} | Photos: ${images.length} | Notes: ${description}`;

      await submitInquiry({
        name: ownerName.trim(),
        phone: ownerPhone.trim(),
        message: summaryMsg,
        property_title: `Client Listing: ${effectiveTitle}`,
        status: 'New',
        type: 'Listing Submission',
        listing_data: listingData,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting listing:', err);
      setErrorMessage(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold-50 border border-brand-gold-200 text-brand-gold-800 text-[11px] font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold-600" />
          <span>Property Bank Real Estate — Listing Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Post Your Property for Sale / Rent
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          List your plot, house, farmhouse, or commercial unit with Property Bank Real Estate. Get connected with verified overseas and local buyers.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-900">Property Submitted Successfully!</h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Our Citi Housing listing specialist will review your property details and contact you on <strong>{ownerPhone}</strong> to publish your listing live.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link
                href="/"
                prefetch={false}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Back to Home
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setTitle('');
                  setLocation('');
                  setPrice('');
                  setImages([]);
                  setThumbnailUrl('');
                  setDescription('');
                }}
                className="px-6 py-2.5 rounded-xl bg-brand-gold-500 text-slate-950 font-black text-xs shadow"
              >
                + Post Another Property
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* 1. Property Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Property Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Farmhouse nadir habib or 10 Marla Luxury Designer Villa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
              />
            </div>

            {/* 2. Purpose, Type, City (Custom Text Allowed) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Purpose
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPurpose('buy')}
                    className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                      purpose === 'buy'
                        ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    For Sale (Buy)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurpose('rent')}
                    className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                      purpose === 'rent'
                        ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-slate-950 font-black shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    For Rent (To Let)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Property Type *
                </label>
                <SearchableSelect
                  value={propertyType}
                  onChange={(val) => setPropertyType(val)}
                  options={combinedTypes}
                  placeholder="Select or search property type..."
                  searchPlaceholder="Type to search property type..."
                  allowCustom={true}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  City / Region *
                </label>
                <SearchableSelect
                  value={city}
                  onChange={(val) => setCity(val)}
                  options={combinedCities}
                  placeholder="Select or search city across Pakistan..."
                  searchPlaceholder="Type to search city across Pakistan..."
                  allowCustom={true}
                />
              </div>
            </div>

            {/* 3. Demand Price & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Demand Price (PKR numeric) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 6500000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                />
                <span className="text-[11px] text-brand-gold-700 font-bold block mt-1">
                  Preview: {formatPKRPrice(typeof price === 'number' ? price : 0)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Location / Sector / Block *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karachi, Sher Shah or Citi Housing Sargodha Road Block B"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                />
              </div>
            </div>

            {/* 4. Area Size, Unit, Bedrooms, Bathrooms */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Area Size
                </label>
                <input
                  type="number"
                  value={areaSize}
                  onChange={(e) => setAreaSize(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Unit
                </label>
                <SearchableSelect
                  value={areaUnit}
                  onChange={(val) => setAreaUnit(val)}
                  options={combinedUnits}
                  placeholder="Select unit..."
                  searchPlaceholder="Search unit..."
                  allowCustom={true}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Bathrooms
                </label>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                />
              </div>
            </div>

            {/* 5. YouTube Video Tour URL (Optional) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold uppercase text-brand-gold-800 text-xs">
                  YouTube Video Tour URL (Optional)
                </label>
                <span className="text-[10px] text-slate-500 font-semibold">
                  Watch / Shorts / Embed format
                </span>
              </div>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
              />
              <span className="text-[11px] text-slate-500 block">
                ▶ If added, this YouTube video will display <strong>first</strong> in the media viewer on the property page, followed by photo gallery thumbnails.
              </span>
            </div>

            {/* 6. Google Maps Location URL (Optional) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold uppercase text-brand-gold-800 text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold-600" />
                  <span>Google Maps Location URL (Optional)</span>
                </label>
                <span className="text-[10px] text-slate-500 font-semibold">
                  Share link / Pin location
                </span>
              </div>
              <input
                type="url"
                placeholder="https://maps.app.goo.gl/... or https://maps.google.com/..."
                value={mapUrl}
                onChange={(e) => setMapUrl(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
              />
              <span className="text-[11px] text-slate-500 block">
                📍 Paste the Google Maps link for your property so buyers can see the live interactive map and navigate directly.
              </span>
            </div>

            {/* 6. Amenities & Infrastructure Tags */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <label className="font-bold uppercase text-slate-700 block">
                Amenities & Infrastructure Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_AMENITIES.map((tag) => {
                  const active = features.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleFeature(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        active
                          ? 'bg-brand-gold-500/20 text-brand-gold-800 border-brand-gold-500 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
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
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs"
                >
                  + Add Tag
                </button>
              </div>

              {/* Selected Features Chips */}
              {features.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {features.map((feat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 text-[11px] font-semibold"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}
                        className="hover:text-red-500 ml-0.5 text-slate-500 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 7. Dealer / Owner Contact Info */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <label className="font-bold uppercase text-slate-700 block">
                Owner / Dealer Contact Info
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nadir Habib"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="03218653500"
                    value={ownerPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">WhatsApp (e.g. 923218653500)</label>
                  <input
                    type="tel"
                    placeholder="923218653500"
                    value={ownerWhatsapp}
                    onChange={(e) => setOwnerWhatsapp(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 8. Property Photos (Multi-photo WebP compressed) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold uppercase text-slate-700">
                  Property Photos (Multi-photo WebP compressed)
                </label>
                <span className="text-[10px] text-emerald-600 font-bold">
                  Zero Base64 in Database
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="client-property-photos"
                />
                <label
                  htmlFor="client-property-photos"
                  className={`cursor-pointer px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm ${
                    uploadingPhotos ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>{uploadingPhotos ? 'Compressing & Uploading...' : '+ Upload Photo(s)'}</span>
                </label>

                <div className="flex-1 flex gap-2 min-w-[200px]">
                  <input
                    type="url"
                    placeholder="Or paste direct image URL here..."
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddDirectUrl}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Photo Thumbnails */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                  {images.map((imgUrl, i) => {
                    const isCover = (thumbnailUrl || images[0]) === imgUrl;
                    return (
                      <div
                        key={i}
                        className={`relative rounded-xl overflow-hidden border group aspect-square bg-slate-100 ${
                          isCover ? 'border-brand-gold-500 ring-2 ring-brand-gold-500/50' : 'border-slate-200'
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
                              title="Set Cover"
                              onClick={() => setThumbnailUrl(imgUrl)}
                              className="px-2 py-1 rounded bg-brand-gold-500 text-slate-950 text-[10px] font-bold"
                            >
                              Set Cover
                            </button>
                          )}
                          <button
                            type="button"
                            title="Remove photo"
                            onClick={() => handleRemovePhoto(i)}
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

            {/* 9. Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Full Description & Specifications
              </label>
              <textarea
                rows={4}
                placeholder="Describe key features, road width, facing, payment terms, or urgent sale conditions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || uploadingPhotos}
              className="w-full py-4 bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-amber-600 hover:from-brand-gold-600 hover:to-brand-gold-700 disabled:opacity-50 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all"
            >
              {submitting ? 'Submitting Property...' : 'Submit Property for Verification & Publishing'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

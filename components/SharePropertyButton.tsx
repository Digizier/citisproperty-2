'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Share2,
  Copy,
  Check,
  X,
  MessageCircle,
  FileImage,
  FileText,
  Download,
  Eye,
  Loader2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';
import PropertyA4Flyer from '@/components/PropertyA4Flyer';
import PropertyA4GalleryPage from '@/components/PropertyA4GalleryPage';
import {
  saveFlyerImage,
  shareFlyerImage,
  saveMultiPageFlyerPdf,
  shareMultiPageFlyerPdf,
} from '@/lib/flyer-generator';

interface SharePropertyButtonProps {
  property: Property;
  className?: string;
  variant?: 'badge' | 'button';
}

export default function SharePropertyButton({
  property,
  className = '',
  variant = 'badge',
}: SharePropertyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFlyerPreview, setShowFlyerPreview] = useState(false);
  const [previewPage, setPreviewPage] = useState(1);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const canonical = `${window.location.origin}/property/${property.slug || property.id}/`;
      setShareUrl(window.location.href || canonical);
    }
  }, [property]);

  // Click outside and escape listeners
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !showFlyerPreview
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (showFlyerPreview) {
          setShowFlyerPreview(false);
        } else {
          setIsOpen(false);
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, showFlyerPreview]);

  // Calculate multi-page setup for PDF
  const mainImage =
    property.thumbnail_url ||
    (Array.isArray(property.images) && property.images.find((img) => img && img.trim().length > 0)) ||
    '/logo.png';

  const allValidImages = Array.isArray(property.images)
    ? property.images.filter((img) => img && typeof img === 'string' && img.trim().length > 0)
    : [];

  const extraImages = allValidImages.filter((img) => img !== mainImage).slice(4);

  const hasPage2 =
    extraImages.length > 0 || (property.description && property.description.length > 120);

  const page2Photos = extraImages.slice(0, 6);
  const hasPage3 = extraImages.length > 6;
  const page3Photos = extraImages.slice(6, 12);

  const totalPages = hasPage3 ? 3 : hasPage2 ? 2 : 1;

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const getPageElements = (): HTMLElement[] => {
    const list: HTMLElement[] = [];
    if (page1Ref.current) list.push(page1Ref.current);
    if (hasPage2 && page2Ref.current) list.push(page2Ref.current);
    if (hasPage3 && page3Ref.current) list.push(page3Ref.current);
    return list;
  };

  // 1. Share as A4 Flyer Image (Single Page A4)
  const handleShareFlyerImage = async () => {
    if (!page1Ref.current) return;
    setLoadingAction('share_image');
    try {
      await shareFlyerImage(page1Ref.current, property, shareUrl);
      showStatus('Flyer image ready & shared!');
    } catch (err) {
      console.error('Error sharing flyer image:', err);
      showStatus('Unable to share image. Trying download...');
    } finally {
      setLoadingAction(null);
    }
  };

  // 2. Save A4 Flyer to Gallery
  const handleSaveFlyerImage = async () => {
    if (!page1Ref.current) return;
    setLoadingAction('save_image');
    try {
      const fileName = `${property.slug || property.id}-flyer.png`;
      await saveFlyerImage(page1Ref.current, fileName);
      showStatus('✓ A4 Flyer saved to your Gallery / Downloads!');
    } catch (err) {
      console.error('Error saving flyer image:', err);
      showStatus('Failed to generate flyer image. Please retry.');
    } finally {
      setLoadingAction(null);
    }
  };

  // 3. Share as PDF Document (Multi-Page Brochure)
  const handleShareFlyerPdf = async () => {
    const elements = getPageElements();
    if (elements.length === 0) return;
    setLoadingAction('share_pdf');
    try {
      await shareMultiPageFlyerPdf(elements, property, shareUrl);
      showStatus('PDF brochure ready & shared!');
    } catch (err) {
      console.error('Error sharing flyer PDF:', err);
      showStatus('Unable to share PDF. Trying download...');
    } finally {
      setLoadingAction(null);
    }
  };

  // 4. Save PDF to Downloads/Gallery (Multi-Page Brochure)
  const handleSaveFlyerPdf = async () => {
    const elements = getPageElements();
    if (elements.length === 0) return;
    setLoadingAction('save_pdf');
    try {
      const fileName = `${property.slug || property.id}-brochure.pdf`;
      await saveMultiPageFlyerPdf(elements, fileName);
      showStatus(`✓ Official ${totalPages}-Page PDF Brochure downloaded successfully!`);
    } catch (err) {
      console.error('Error saving PDF:', err);
      showStatus('Failed to generate PDF. Please retry.');
    } finally {
      setLoadingAction(null);
    }
  };

  // 5. Share as WhatsApp Text
  const handleShareWhatsAppText = () => {
    const priceText = formatPKRPrice(property.price);
    const msg = `Assalam-o-Alaikum, check out this property listing on Citi Housing (Property Bank Real Estate):\n\n🏡 *${property.title}*\n💰 *Demand Price:* PKR ${priceText}\n📍 *Location:* ${property.location}, ${property.city}\n📏 *Area:* ${property.area_size} ${property.area_unit}\n\n🔗 *View Photos & Verified Details:* ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Copy Link
  const handleCopyLink = async () => {
    const urlToCopy = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(urlToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = urlToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      showStatus('✓ Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const propertyCover =
    property.thumbnail_url ||
    (Array.isArray(property.images) && property.images.find((img) => img && img.trim().length > 0)) ||
    '/logo.png';

  const priceFormatted = formatPKRPrice(property.price);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Offscreen Multi-Page Containers for High-Res Canvas Capture */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '794px',
          zIndex: -1000,
          pointerEvents: 'none',
          visibility: 'visible',
        }}
        aria-hidden="true"
      >
        {/* Page 1: Executive A4 Flyer */}
        <PropertyA4Flyer
          ref={page1Ref}
          property={property}
          pageNumber={1}
          totalPages={totalPages}
        />

        {/* Page 2: Extended Gallery & Description (if extra photos or description) */}
        {hasPage2 && (
          <PropertyA4GalleryPage
            ref={page2Ref}
            property={property}
            photos={page2Photos}
            startingPhotoIndex={6}
            pageNumber={2}
            totalPages={totalPages}
            showDescription={Boolean(property.description && property.description.length > 50)}
          />
        )}

        {/* Page 3: Additional Gallery (if 11+ photos) */}
        {hasPage3 && (
          <PropertyA4GalleryPage
            ref={page3Ref}
            property={property}
            photos={page3Photos}
            startingPhotoIndex={12}
            pageNumber={3}
            totalPages={totalPages}
            showDescription={false}
          />
        )}
      </div>

      {/* Trigger Button */}
      {variant === 'badge' ? (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Share property options"
          className="text-xs font-bold text-slate-800 bg-white hover:bg-brand-gold-50 border border-slate-300 hover:border-brand-gold-400 active:bg-brand-gold-100 px-3 py-1 rounded-md flex items-center gap-1.5 shadow-sm transition-all cursor-pointer group"
        >
          <Share2 className="w-3.5 h-3.5 text-brand-gold-600 group-hover:scale-110 transition-transform" />
          <span>Share Property</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Share this listing"
          className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-brand-gold-600" />
          <span>Share This Property</span>
        </button>
      )}

      {/* Share Property Modal Dialog */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget && !loadingAction) {
                setIsOpen(false);
              }
            }}
          >
            <div
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4 my-auto relative animate-in fade-in zoom-in-95 duration-150"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                      Share Property
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Brochure, A4 Flyer, PDF & Instant WhatsApp
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={Boolean(loadingAction)}
                  className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mini Property Summary Preview */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0 relative">
                  <img
                    src={propertyCover}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/logo.png';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{property.title}</h4>
                  <p className="text-xs font-black text-amber-700 mt-0.5">
                    PKR {priceFormatted}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {property.location}, {property.city}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewPage(1);
                    setShowFlyerPreview(true);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-700 text-[11px] font-bold flex items-center gap-1 shadow-xs transition-colors shrink-0 cursor-pointer"
                  title="Preview A4 Flyer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Status or Loading Feedback */}
              {statusMessage && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold text-center animate-in fade-in">
                  {statusMessage}
                </div>
              )}

              {/* The 5 Key Share Options matching user reference images */}
              <div className="space-y-2">
                {/* 1. Share as A4 Flyer (Image) */}
                <button
                  type="button"
                  onClick={handleShareFlyerImage}
                  disabled={Boolean(loadingAction)}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-sky-400 bg-white hover:bg-sky-50/50 flex items-center justify-between transition-all group cursor-pointer text-left disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {loadingAction === 'share_image' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <FileImage className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Share as A4 Flyer (Image)
                      </div>
                      <div className="text-[10px] text-slate-500">
                        HD branded photo flyer for social media & apps
                      </div>
                    </div>
                  </div>
                  <Share2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600 shrink-0" />
                </button>

                {/* 2. Save A4 Flyer to Gallery */}
                <button
                  type="button"
                  onClick={handleSaveFlyerImage}
                  disabled={Boolean(loadingAction)}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-sky-400 bg-white hover:bg-sky-50/50 flex items-center justify-between transition-all group cursor-pointer text-left disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {loadingAction === 'save_image' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Download className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Save A4 Flyer to Gallery
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Download high-resolution image to photo gallery
                      </div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-sky-600 shrink-0" />
                </button>

                {/* 3. Share as PDF Document (Multi-Page Brochure) */}
                <button
                  type="button"
                  onClick={handleShareFlyerPdf}
                  disabled={Boolean(loadingAction)}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-rose-400 bg-white hover:bg-rose-50/50 flex items-center justify-between transition-all group cursor-pointer text-left disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {loadingAction === 'share_pdf' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Share as PDF Document</span>
                        {totalPages > 1 && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                            {totalPages} Pages
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Professional PDF brochure with all images & details
                      </div>
                    </div>
                  </div>
                  <Share2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600 shrink-0" />
                </button>

                {/* 4. Save PDF to Gallery / Downloads (Multi-Page Brochure) */}
                <button
                  type="button"
                  onClick={handleSaveFlyerPdf}
                  disabled={Boolean(loadingAction)}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-rose-400 bg-white hover:bg-rose-50/50 flex items-center justify-between transition-all group cursor-pointer text-left disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {loadingAction === 'save_pdf' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Download className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Save PDF to Gallery/Downloads</span>
                        {totalPages > 1 && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                            {totalPages} Pages
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Download complete printable A4 brochure directly
                      </div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-rose-600 shrink-0" />
                </button>

                {/* 5. Share as WhatsApp Text (WhatsApp & WhatsApp Business) */}
                <button
                  type="button"
                  onClick={handleShareWhatsAppText}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/50 flex items-center justify-between transition-all group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5 fill-emerald-600 text-transparent" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Share as WhatsApp Text</span>
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                          Business
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Direct text message with demand, specs & link
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </button>
              </div>

              {/* Copy Link Box */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Copy Listing Link
                </label>
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-transparent px-2 text-xs text-slate-700 font-medium truncate outline-none select-all"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                      copied
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Fullscreen A4 Flyer & Multi-Page Brochure Preview Modal */}
      {showFlyerPreview && (
        <div
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-[60] flex flex-col items-center justify-start p-3 sm:p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFlyerPreview(false);
            }
          }}
        >
          {/* Top Preview Controls Bar */}
          <div className="w-full max-w-3xl flex flex-wrap items-center justify-between gap-3 pb-3 text-white border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-extrabold">
                A4 Brochure Preview {totalPages > 1 && `(Page ${previewPage} of ${totalPages})`}
              </span>
            </div>

            {/* Multi-Page Navigation if more than 1 page */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                <button
                  type="button"
                  disabled={previewPage === 1}
                  onClick={() => setPreviewPage((p) => Math.max(1, p - 1))}
                  className="p-1 rounded hover:bg-slate-700 disabled:opacity-40 cursor-pointer text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold px-1.5">
                  Page {previewPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={previewPage === totalPages}
                  onClick={() => setPreviewPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1 rounded hover:bg-slate-700 disabled:opacity-40 cursor-pointer text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveFlyerImage}
                disabled={Boolean(loadingAction)}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Image</span>
              </button>

              <button
                type="button"
                onClick={handleSaveFlyerPdf}
                disabled={Boolean(loadingAction)}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Save PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setShowFlyerPreview(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Scaled Flyer Preview Viewport */}
          <div className="my-auto max-w-full overflow-x-auto p-2 bg-slate-900/40 rounded-2xl border border-slate-700/50 flex justify-center">
            <div className="origin-top transform sm:scale-90 scale-[0.42] transition-transform">
              {previewPage === 1 ? (
                <PropertyA4Flyer property={property} pageNumber={1} totalPages={totalPages} />
              ) : previewPage === 2 && hasPage2 ? (
                <PropertyA4GalleryPage
                  property={property}
                  photos={page2Photos}
                  startingPhotoIndex={6}
                  pageNumber={2}
                  totalPages={totalPages}
                  showDescription={Boolean(property.description && property.description.length > 50)}
                />
              ) : (
                <PropertyA4GalleryPage
                  property={property}
                  photos={page3Photos}
                  startingPhotoIndex={12}
                  pageNumber={3}
                  totalPages={totalPages}
                  showDescription={false}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

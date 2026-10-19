'use client';

import { Property } from './types';
import { formatPKRPrice } from './utils';

/**
 * Pre-load all <img> tags inside an element before canvas capture
 */
async function preloadImages(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    })
  );
}

/**
 * Generate a high-resolution HTML5 canvas from a flyer DOM element
 * Uses desktop windowWidth to prevent mobile viewports from compressing or clipping fonts
 */
export async function generateFlyerCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  await preloadImages(element);
  const html2canvas = (await import('html2canvas')).default;

  return await html2canvas(element, {
    scale: 2, // 2x high resolution for crisp, readable text and photos
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    logging: false,
    width: 794,
    height: 1123,
    windowWidth: 1280, // Emulates desktop viewport so Tailwind media queries never trigger mobile squeezing
    windowHeight: 1800,
    onclone: (clonedDoc: Document) => {
      // Find the flyer in the cloned document and ensure full dimensions
      const clonedFlyer = clonedDoc.getElementById('property-flyer-capture');
      if (clonedFlyer) {
        clonedFlyer.style.position = 'static';
        clonedFlyer.style.display = 'flex';
        clonedFlyer.style.width = '794px';
        clonedFlyer.style.height = '1123px';
        clonedFlyer.style.overflow = 'hidden';
      }
    },
  });
}

/**
 * Save A4 Flyer as PNG image directly to user's gallery / downloads
 */
export async function saveFlyerImage(element: HTMLElement, filename: string): Promise<void> {
  const canvas = await generateFlyerCanvas(element);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas to Blob conversion failed'));
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    }, 'image/png');
  });
}

/**
 * Share A4 Flyer Image via Web Share API or download fallback
 */
export async function shareFlyerImage(
  element: HTMLElement,
  property: Property,
  shareUrl: string
): Promise<{ method: 'native' | 'download_whatsapp' }> {
  const canvas = await generateFlyerCanvas(element);
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error('Canvas to Blob failed'));
        return;
      }

      const fileName = `${property.slug || property.id}-flyer.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // Check if native Web Share with files is supported (e.g. mobile Safari / Chrome)
      if (
        typeof navigator !== 'undefined' &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({
            files: [file],
            title: property.title,
            text: `🏡 *${property.title}*\n💰 Demand: PKR ${formatPKRPrice(property.price)}\n📍 ${property.location}, ${property.city}\n\n🔗 ${shareUrl}`,
          });
          resolve({ method: 'native' });
          return;
        } catch (err: any) {
          if (err.name === 'AbortError') {
            resolve({ method: 'native' });
            return;
          }
        }
      }

      // Fallback: download the image and launch WhatsApp share
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      const msg = `Assalam-o-Alaikum, check out this property brochure from Citi Housing (Property Bank Real Estate):\n\n🏡 *${property.title}*\n💰 *Demand:* PKR ${formatPKRPrice(property.price)}\n📍 *Location:* ${property.location}, ${property.city}\n📏 *Area:* ${property.area_size} ${property.area_unit}\n\n🔗 *Listing URL:* ${shareUrl}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');

      resolve({ method: 'download_whatsapp' });
    }, 'image/png');
  });
}

/**
 * Save Multi-Page A4 PDF Document (Handles 15+ images and descriptions across pages)
 */
export async function saveMultiPageFlyerPdf(
  pageElements: HTMLElement[],
  filename: string
): Promise<void> {
  const { jsPDF } = await import('jspdf');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  for (let i = 0; i < pageElements.length; i++) {
    const el = pageElements[i];
    const canvas = await generateFlyerCanvas(el);
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }
    // A4 dimensions: 210 x 297 mm
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  }

  pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
}

/**
 * Share Multi-Page A4 PDF Document via Web Share API or download fallback
 */
export async function shareMultiPageFlyerPdf(
  pageElements: HTMLElement[],
  property: Property,
  shareUrl: string
): Promise<{ method: 'native' | 'download_whatsapp' }> {
  const { jsPDF } = await import('jspdf');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  for (let i = 0; i < pageElements.length; i++) {
    const el = pageElements[i];
    const canvas = await generateFlyerCanvas(el);
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  }

  const pdfBlob = pdf.output('blob');
  const fileName = `${property.slug || property.id}-brochure.pdf`;
  const file = new File([pdfBlob], fileName, { type: 'application/pdf' });

  // Native share check
  if (
    typeof navigator !== 'undefined' &&
    navigator.canShare &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({
        files: [file],
        title: `${property.title} - Official Brochure`,
        text: `Official multi-page brochure for *${property.title}* (Demand: PKR ${formatPKRPrice(property.price)}). View listing: ${shareUrl}`,
      });
      return { method: 'native' };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { method: 'native' };
      }
    }
  }

  // Fallback: download PDF and launch WhatsApp
  pdf.save(fileName);
  const msg = `Assalam-o-Alaikum, I have downloaded the official multi-page PDF brochure for:\n\n🏡 *${property.title}*\n💰 *Demand:* PKR ${formatPKRPrice(property.price)}\n📍 *Location:* ${property.location}, ${property.city}\n\n🔗 *View full listing online:* ${shareUrl}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');

  return { method: 'download_whatsapp' };
}

'use client';

import { Property } from './types';
import { formatPKRPrice } from './utils';

/**
 * Generate a high-resolution HTML5 canvas from a flyer DOM element
 */
export async function generateFlyerCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  const html2canvas = (await import('html2canvas')).default;
  return await html2canvas(element, {
    scale: 2, // 2x high resolution (approx 1600x2250px) for crystal-clear prints & galleries
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    logging: false,
    scrollX: 0,
    scrollY: 0,
    windowWidth: 794,
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
 * Save A4 Flyer as PDF Document directly to user's gallery / downloads
 */
export async function saveFlyerPdf(element: HTMLElement, filename: string): Promise<void> {
  const canvas = await generateFlyerCanvas(element);
  const { jsPDF } = await import('jspdf');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  // A4 dimensions: 210 x 297 mm
  pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
}

/**
 * Share A4 Flyer as PDF Document via Web Share API or download fallback
 */
export async function shareFlyerPdf(
  element: HTMLElement,
  property: Property,
  shareUrl: string
): Promise<{ method: 'native' | 'download_whatsapp' }> {
  const canvas = await generateFlyerCanvas(element);
  const { jsPDF } = await import('jspdf');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

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
        text: `Official PDF brochure for *${property.title}* (Demand: PKR ${formatPKRPrice(property.price)}). View listing: ${shareUrl}`,
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
  const msg = `Assalam-o-Alaikum, I have downloaded the official PDF brochure for:\n\n🏡 *${property.title}*\n💰 *Demand:* PKR ${formatPKRPrice(property.price)}\n📍 *Location:* ${property.location}, ${property.city}\n\n🔗 *View full listing online:* ${shareUrl}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');

  return { method: 'download_whatsapp' };
}

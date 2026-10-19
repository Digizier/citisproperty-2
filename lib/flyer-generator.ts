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
        // Timeout safeguard
        setTimeout(() => resolve(), 2500);
      });
    })
  );
}

/**
 * Generate a high-resolution HTML5 canvas from a flyer DOM element
 */
export async function generateFlyerCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  await preloadImages(element);
  const html2canvas = (await import('html2canvas')).default;

  return await html2canvas(element, {
    scale: 2, // 2x high resolution (1588 x 2246)
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    logging: false,
    width: 794,
    height: 1123,
    x: 0,
    y: 0,
    scrollX: 0,
    scrollY: 0,
    windowWidth: 794,
    windowHeight: 1123,
    onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
      // Clear all other elements from cloned document to isolate clonedEl at (0, 0)
      clonedDoc.body.innerHTML = '';
      clonedDoc.body.style.margin = '0px';
      clonedDoc.body.style.padding = '0px';
      clonedDoc.body.style.backgroundColor = '#ffffff';

      clonedEl.style.position = 'absolute';
      clonedEl.style.left = '0px';
      clonedEl.style.top = '0px';
      clonedEl.style.margin = '0px';
      clonedEl.style.transform = 'none';
      clonedEl.style.width = '794px';
      clonedEl.style.height = '1123px';
      clonedEl.style.display = 'flex';
      clonedEl.style.flexDirection = 'column';
      clonedEl.style.justifyContent = 'space-between';
      clonedEl.style.visibility = 'visible';

      clonedDoc.body.appendChild(clonedEl);
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
 * Share A4 Flyer Image via Web Share API or download + native share sheet fallback
 */
export async function shareFlyerImage(
  element: HTMLElement,
  property: Property,
  shareUrl: string
): Promise<{ method: 'native' | 'download' }> {
  const canvas = await generateFlyerCanvas(element);
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error('Canvas to Blob failed'));
        return;
      }

      const fileName = `${property.slug || property.id}-flyer.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // 1. Try native Web Share with the image file
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
          console.warn('Native image file share failed, trying text share fallback', err);
        }
      }

      // 2. Download the image file to device
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      // 3. If native share is available (without files), open native share sheet with title/text/url
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          await navigator.share({
            title: property.title,
            text: `🏡 *${property.title}*\n🖼️ High-Res Flyer image saved.\n💰 Demand: PKR ${formatPKRPrice(property.price)}\n📍 ${property.location}, ${property.city}\n\n🔗 ${shareUrl}`,
            url: shareUrl,
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

      resolve({ method: 'download' });
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

  // Render all page canvases concurrently
  const canvases = await Promise.all(pageElements.map((el) => generateFlyerCanvas(el)));

  for (let i = 0; i < canvases.length; i++) {
    const canvas = canvases[i];
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
 * Share Multi-Page A4 PDF Document via Web Share API or download + native share sheet fallback
 */
export async function shareMultiPageFlyerPdf(
  pageElements: HTMLElement[],
  property: Property,
  shareUrl: string
): Promise<{ method: 'native' | 'download' }> {
  const { jsPDF } = await import('jspdf');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Render all page canvases concurrently (fast parallel execution preserves user gesture token)
  const canvases = await Promise.all(pageElements.map((el) => generateFlyerCanvas(el)));

  for (let i = 0; i < canvases.length; i++) {
    const canvas = canvases[i];
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  }

  const pdfBlob = pdf.output('blob');
  const fileName = `${property.slug || property.id}-brochure.pdf`;
  const file = new File([pdfBlob], fileName, { type: 'application/pdf', lastModified: Date.now() });

  // 1. Try native Web Share with the PDF file (opens phone's native app chooser)
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
      console.warn('Native PDF file share failed, falling back to download + share sheet', err);
    }
  }

  // 2. Download the PDF directly to device
  pdf.save(fileName);

  // 3. Open native system share sheet (showing all apps: WhatsApp, Gmail, Drive, Messages, etc.)
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: `${property.title} - Official PDF Brochure`,
        text: `🏡 *${property.title}*\n📄 Official PDF brochure downloaded.\n💰 Demand: PKR ${formatPKRPrice(property.price)}\n📍 ${property.location}, ${property.city}\n\n🔗 ${shareUrl}`,
        url: shareUrl,
      });
      return { method: 'native' };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { method: 'native' };
      }
    }
  }

  return { method: 'download' };
}

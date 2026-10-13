/**
 * Automatic Client-Side Image Compressor & WebP Converter
 * Converts any user image (JPEG, PNG, HEIC, etc.) to compressed WebP in tiny Kilobytes (KB)
 * Uploads directly to Supabase Storage bucket 'property-images'
 * Returns clean public CDN URL (Zero Base64 in Database)
 */

import { supabase } from './supabase';

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0 (default 0.8)
}

export async function compressImageToWebP(
  file: File,
  options: CompressionOptions = {}
): Promise<Blob> {
  const { maxWidth = 1600, maxHeight = 1200, quality = 0.8 } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio bounds
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be created'));
          return;
        }

        // Draw and compress to image/webp
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log(
                `Image compressed: Original ${(file.size / 1024).toFixed(1)} KB -> WebP ${(blob.size / 1024).toFixed(1)} KB`
              );
              resolve(blob);
            } else {
              reject(new Error('WebP compression failed'));
            }
          },
          'image/webp',
          quality
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}

/**
 * Uploads compressed WebP file directly to Supabase Storage bucket
 * Returns the short public CDN URL
 */
export async function uploadPropertyImage(file: File): Promise<string> {
  try {
    // 1. Compress & convert to WebP
    const webpBlob = await compressImageToWebP(file, { maxWidth: 1600, quality: 0.8 });

    // 2. Generate unique filename with timestamp
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${Date.now()}_${cleanName}.webp`;

    // 3. Upload binary to Supabase Storage
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(fileName, webpBlob, {
        contentType: 'image/webp',
        cacheControl: '31536000',
        upsert: true,
      });

    if (error) {
      console.error('Supabase storage upload error:', error.message);
      // Fallback: return an object URL or placeholder if storage upload fails
      throw new Error(`Upload failed: ${error.message}`);
    }

    // 4. Retrieve clean public URL
    const { data: publicUrlData } = supabase.storage
      .from('property-images')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (err: any) {
    console.error('Error during upload pipeline:', err);
    throw err;
  }
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Pakistani Real Estate standard:
 * >= 1 Crore (10,000,000) -> X.XX Crore
 * >= 1 Lac (100,000) -> X.XX Lac
 * >= 1 Thousand (1,000) -> X.XX Thousand
 * Else formatted with commas
 */
export function formatPKRPrice(price: number): string {
  if (!price || isNaN(price)) return 'Price on Call';

  if (price >= 10000000) {
    const crore = price / 10000000;
    return `${crore % 1 === 0 ? crore : crore.toFixed(2)} Crore`;
  } else if (price >= 100000) {
    const lac = price / 100000;
    return `${lac % 1 === 0 ? lac : lac.toFixed(2)} Lac`;
  } else if (price >= 1000) {
    const thousand = price / 1000;
    return `${thousand % 1 === 0 ? thousand : thousand.toFixed(1)} Thousand`;
  }
  return price.toLocaleString('en-PK');
}

/**
 * Format raw numbers with Pakistani/Standard commas
 */
export function formatNumber(val: number): string {
  return (val || 0).toLocaleString('en-PK');
}

/**
 * Generate clean SEO slug from any title string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

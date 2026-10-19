import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post Free Property Listing — Sell or Rent in Citi Housing | citisproperty.com',
  description:
    'List your plot, house or commercial property for sale or rent in Citi Housing Faisalabad, Gujranwala, Sialkot, and Jhelum. Direct buyer reach and verified promotion.',
  alternates: {
    canonical: 'https://citisproperty.com/post-listing/',
  },
  openGraph: {
    title: 'Post Free Property Listing — Sell or Rent in Citi Housing | citisproperty.com',
    description:
      'List your plot, house or commercial property for sale or rent in Citi Housing. Direct buyer reach and verified promotion.',
    url: 'https://citisproperty.com/post-listing/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function PostListingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

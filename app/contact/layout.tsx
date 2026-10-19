import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Property Bank Real Estate | Citi Housing Authorized Dealer',
  description:
    'Contact Property Bank Real Estate for Citi Housing Faisalabad, Gujranwala, Sialkot & Jhelum bookings, rate inquiries, and site visits. Phone: 0321-8653500.',
  alternates: {
    canonical: 'https://citisproperty.com/contact/',
  },
  openGraph: {
    title: 'Contact Us — Property Bank Real Estate | Citi Housing Authorized Dealer',
    description:
      'Contact Property Bank Real Estate for Citi Housing Faisalabad, Gujranwala, Sialkot & Jhelum bookings, rate inquiries, and site visits. Phone: 0321-8653500.',
    url: 'https://citisproperty.com/contact/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

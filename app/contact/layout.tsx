import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Citi property Real Estate | Faisalabad Property Dealer',
  description:
    'Contact Citi property Real Estate in Faisalabad for plot bookings, property sales, file verification, and site visits at Citi Housing Samundri Road Bypass. Call / WhatsApp: 0321-8653500.',
  alternates: {
    canonical: 'https://citisproperty.com/contact/',
  },
  openGraph: {
    title: 'Contact Us — Citi property Real Estate | Faisalabad Property Dealer',
    description:
      'Contact Citi property Real Estate in Faisalabad for plot bookings, property sales, file verification, and site visits at Citi Housing Samundri Road Bypass. Call / WhatsApp: 0321-8653500.',
    url: 'https://citisproperty.com/contact/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

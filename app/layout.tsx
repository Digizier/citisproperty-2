import type { Metadata, Viewport } from 'next';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://citisproperty.com'),
  title: 'City Housing (Pvt) Ltd - Property Bank Real Estate | citisproperty.com',
  description:
    'Official authorized real estate dealership for Citi Housing Faisalabad (Sargodha & Samundri Road), Gujranwala, Sialkot, Jhelum. Buy, sell, and rent luxury homes, residential plots, and commercial properties.',
  keywords: [
    'Citi Housing',
    'City Housing',
    'Property Bank Real Estate',
    'Citi Housing Faisalabad',
    'Citi Housing Sargodha Road',
    'Citi Housing Samundri Road',
    'Plots in Faisalabad',
    'Houses for sale Faisalabad',
    'citisproperty.com',
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'City Housing (Pvt) Ltd - Property Bank Real Estate',
    description: 'Pakistan premier real estate portal for Citi Housing developments and luxury investments.',
    url: 'https://citisproperty.com',
    siteName: 'citisproperty.com',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'City Housing (Pvt) Ltd Logo',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#b8891a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Society Maps & Master Plans — Citi Housing | Property Bank',
  description:
    'Download high-resolution official society maps and master plans for Citi Housing Faisalabad (Sargodha Road & Samundri Road), Gujranwala, Sialkot, and Jhelum.',
  alternates: {
    canonical: 'https://citisproperty.com/society-maps/',
  },
  openGraph: {
    title: 'Official Society Maps & Master Plans — Citi Housing | Property Bank',
    description:
      'Download high-resolution official society maps and master plans for Citi Housing Faisalabad (Sargodha Road & Samundri Road), Gujranwala, Sialkot, and Jhelum.',
    url: 'https://citisproperty.com/society-maps/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function SocietyMapsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

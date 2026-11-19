import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Society Maps & Master Plans — Citi property Real Estate',
  description:
    'Download high-resolution official society maps and master plans for Citi Housing Faisalabad (Samundri Road & Sargodha Road), verified by Citi property Real Estate.',
  alternates: {
    canonical: 'https://citisproperty.com/society-maps/',
  },
  openGraph: {
    title: 'Official Society Maps & Master Plans — Citi property Real Estate',
    description:
      'Download high-resolution official society maps and master plans for Citi Housing Faisalabad (Samundri Road & Sargodha Road), verified by Citi property Real Estate.',
    url: 'https://citisproperty.com/society-maps/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function SocietyMapsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Land Area Unit Converter Pakistan (Marla, Kanal, Sq Ft, Sq Yards) | citisproperty.com',
  description:
    'Free land area converter for Pakistan real estate. Convert Marla (225 & 272 sq ft), Kanal, Square Feet, Square Yards, Acres and Hectares instantly.',
  alternates: {
    canonical: 'https://citisproperty.com/tools/area-unit-converter/',
  },
  openGraph: {
    title: 'Land Area Unit Converter Pakistan (Marla, Kanal, Sq Ft, Sq Yards) | citisproperty.com',
    description:
      'Free land area converter for Pakistan real estate. Convert Marla, Kanal, Square Feet, Square Yards, Acres and Hectares instantly.',
    url: 'https://citisproperty.com/tools/area-unit-converter/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function AreaUnitConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pakistan House Construction Cost Calculator (2026 Rates) | citisproperty.com',
  description:
    'Calculate 5 Marla, 10 Marla & 1 Kanal house construction cost in Pakistan. Accurate 2026 material estimates for grey structure and luxury finishing in Citi Housing.',
  alternates: {
    canonical: 'https://citisproperty.com/tools/construction-cost-calculator/',
  },
  openGraph: {
    title: 'Pakistan House Construction Cost Calculator (2026 Rates) | citisproperty.com',
    description:
      'Calculate 5 Marla, 10 Marla & 1 Kanal house construction cost in Pakistan. Accurate 2026 material estimates for grey structure and luxury finishing.',
    url: 'https://citisproperty.com/tools/construction-cost-calculator/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function ConstructionCostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

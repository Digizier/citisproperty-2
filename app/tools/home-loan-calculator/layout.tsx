import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Loan & Mortgage EMI Calculator Pakistan | citisproperty.com',
  description:
    'Calculate monthly mortgage EMI, down payment and loan installment for home purchase in Pakistan with current Islamic & commercial bank interest rates.',
  alternates: {
    canonical: 'https://citisproperty.com/tools/home-loan-calculator/',
  },
  openGraph: {
    title: 'Home Loan & Mortgage EMI Calculator Pakistan | citisproperty.com',
    description:
      'Calculate monthly mortgage EMI, down payment and loan installment for home purchase in Pakistan with current Islamic & commercial bank interest rates.',
    url: 'https://citisproperty.com/tools/home-loan-calculator/',
    images: ['https://citisproperty.com/logo.png'],
  },
};

export default function HomeLoanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

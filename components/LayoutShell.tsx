'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloatingButton from './WhatsAppFloatingButton';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Admin panel: ZERO website header and footer as strictly requested
    return <main className="min-h-screen bg-slate-900">{children}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-green-100 selection:text-brand-green-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

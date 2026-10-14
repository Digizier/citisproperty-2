'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import ScrollToTop from './ScrollToTop';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Admin panel: ZERO website header, footer, or bottom navigation bar
    return (
      <>
        <ScrollToTop />
        <main className="min-h-screen bg-slate-900">{children}</main>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-gold-200 selection:text-brand-gold-900">
      <ScrollToTop />
      <Header />
      {/* pb-20 on mobile to leave clean breathing room above the fixed Bottom Navigation Bar */}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

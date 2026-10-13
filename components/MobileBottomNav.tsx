'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Search,
  Plus,
  Calculator,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Scroll to top when tapping navigation buttons
  const handleNavClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  };

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      name: 'Explore',
      href: '/properties',
      icon: Search,
      isActive: pathname === '/properties' || pathname?.startsWith('/Homes') || pathname?.startsWith('/Plots'),
    },
    {
      name: 'Post Ad',
      href: '/post-listing',
      icon: Plus,
      isCenter: true,
      isActive: pathname === '/post-listing',
    },
    {
      name: 'Tools',
      href: '/tools/construction-cost-calculator',
      icon: Calculator,
      isActive: pathname?.startsWith('/tools'),
    },
    {
      name: 'Helpline',
      href: 'https://wa.me/923218653500?text=Assalam-o-Alaikum, I am inquiring from citisproperty.com mobile app.',
      icon: MessageCircle,
      isExternal: true,
      isActive: false,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                onClick={handleNavClick}
                className="flex flex-col items-center -mt-6 group focus:outline-none"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-green-800 to-brand-green-600 text-white flex items-center justify-center shadow-lg shadow-brand-green-900/30 ring-4 ring-white active:scale-90 transition-transform">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black text-brand-green-800 mt-1 uppercase tracking-tight">
                  + Post
                </span>
              </Link>
            );
          }

          if (item.isExternal) {
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center py-1 px-2 text-slate-500 hover:text-emerald-600 active:scale-95 transition-all focus:outline-none"
              >
                <Icon className="w-5 h-5 mb-0.5 text-emerald-600" />
                <span className="text-[10px] font-bold tracking-tight text-slate-700">
                  {item.name}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              prefetch={false}
              onClick={handleNavClick}
              className={`flex flex-col items-center py-1 px-2 transition-all active:scale-95 focus:outline-none ${
                item.isActive
                  ? 'text-brand-green-700 font-black'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-0.5 ${
                  item.isActive ? 'stroke-[2.5] text-brand-green-700' : 'text-slate-400'
                }`}
              />
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

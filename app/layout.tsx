import type { Metadata, Viewport } from 'next';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://citisproperty.com'),
  title: 'Property Bank Real Estate | Authorized Citi Housing Faisalabad Dealers | citisproperty.com',
  description:
    'Official authorized real estate dealership for Citi Housing Faisalabad (Samundri Road & Sargodha Road), Gujranwala, Sialkot, and Jhelum. Buy, sell, and invest in verified residential plots, luxury designer houses, and commercial properties with Property Bank Real Estate.',
  keywords: [
    'Property Bank Real Estate',
    'Property Bank Real Estate Faisalabad',
    'Citi Housing',
    'City Housing',
    'Citi Housing Faisalabad',
    'Citi Housing Samundri Road',
    'Citi Housing Sargodha Road',
    'Real Estate Agency Faisalabad',
    'Property Dealer Citi Housing Faisalabad',
    'Plots for sale Citi Housing Samundri Road',
    'Plots in Faisalabad',
    'Houses for sale Faisalabad',
    'Best Property Dealer Faisalabad',
    'citisproperty.com',
  ],
  alternates: {
    canonical: 'https://citisproperty.com/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Property Bank Real Estate | Authorized Citi Housing Faisalabad Dealers',
    description:
      'Official authorized real estate dealership for Citi Housing Faisalabad (Samundri Road & Sargodha Road). Verified plots, luxury designer villas, and high-yield commercial investments.',
    url: 'https://citisproperty.com',
    siteName: 'citisproperty.com',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Property Bank Real Estate - Citi Housing Faisalabad Logo',
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

const structuredSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['RealEstateAgent', 'LocalBusiness'],
      '@id': 'https://citisproperty.com/#realestateagent',
      name: 'Property Bank Real Estate Faisalabad',
      legalName: 'Property Bank Real Estate',
      alternateName: [
        'Property Bank Real Estate',
        'Citi Housing Authorized Dealer - Property Bank',
        'Citi Housing (Pvt) Ltd - Property Bank Real Estate',
        'citisproperty.com',
      ],
      url: 'https://citisproperty.com',
      logo: 'https://citisproperty.com/logo.png',
      image: 'https://citisproperty.com/logo.png',
      description:
        'Official authorized real estate dealership for Citi Housing developments across Pakistan including Faisalabad (Samundri Road & Sargodha Road), Gujranwala, Sialkot, and Jhelum. Buy, sell, and invest in verified residential plots, luxury designer houses, and commercial plots with Property Bank Real Estate.',
      telephone: '+923028658450',
      priceRange: 'PKR 3,500,000 - PKR 150,000,000',
      currenciesAccepted: 'PKR',
      paymentAccepted: 'Cash, Bank Transfer, Pay Order',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Office 11-AA, Main Commercial Market, Citi Housing, Samundri Road',
        addressLocality: 'Faisalabad',
        addressRegion: 'Punjab',
        postalCode: '38000',
        addressCountry: 'PK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 31.3325,
        longitude: 73.0488,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '09:00',
          closes: '22:00',
        },
      ],
      hasMap: 'https://share.google/Veaql80VOjBuNszbc',
      sameAs: [
        'https://share.google/Veaql80VOjBuNszbc',
        'https://maps.app.goo.gl/Umc7Ci9kQZN1GwVo6',
        'https://www.facebook.com/Asifcitihousing',
        'https://www.facebook.com/share/1EM79fibhT/',
        'https://wa.me/923028658450',
        'https://wa.me/923218653500',
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Citi Housing Faisalabad' },
        { '@type': 'AdministrativeArea', name: 'Citi Housing Samundri Road, Faisalabad' },
        { '@type': 'AdministrativeArea', name: 'Citi Housing Sargodha Road, Faisalabad' },
        { '@type': 'City', name: 'Faisalabad' },
        { '@type': 'AdministrativeArea', name: 'Wapda City, Faisalabad' },
        { '@type': 'AdministrativeArea', name: 'Eden Valley, Faisalabad' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://citisproperty.com/#website',
      url: 'https://citisproperty.com',
      name: 'Citi Housing Real Estate Portal',
      publisher: {
        '@id': 'https://citisproperty.com/#realestateagent',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://citisproperty.com/properties/?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://citisproperty.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is the authorized real estate dealer for Citi Housing Faisalabad?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Property Bank Real Estate (citisproperty.com) is the official authorized dealership for Citi Housing developments including Sargodha Road and Samundri Road, Faisalabad.',
          },
        },
        {
          '@type': 'Question',
          name: 'What plot and house sizes are available in Citi Housing Faisalabad?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Citi Housing Faisalabad offers 5 Marla, 10 Marla, 1 Kanal, and 2 Kanal residential plots and designer luxury villas, as well as prime commercial plots in Citi Gold Mark.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I contact Property Bank Real Estate for Citi Housing booking and inquiries?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can call or message on WhatsApp directly at +92-302-8658450 or +92-321-8653500, or visit citisproperty.com to explore 100% verified listings.',
          },
        },
      ],
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredSchema),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
  const SITE_KEY = "site_citisproperty";
  const SUPABASE_URL = "https://pggolsqtamtkafrpigfo.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZ29sc3F0YW10a2FmcnBpZ2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDE3ODgsImV4cCI6MjEwMDgxNzc4OH0.98_YWbdZ6hlpMiujbiWLYPRYlrvnx2_I31FyGILixHs";
  const WHATSAPP_NUM = "03222685868";
  const WHATSAPP_LINK = "https://wa.me/923222685868?text=Hi%20Nader%20Habib,%20I%20want%20to%20unlock%20my%20website.";
  const isTestLock = typeof window !== 'undefined' && window.location && window.location.search && window.location.search.includes('lock=true');

  async function checkAccess() {
    if (isTestLock) {
      execLockOverlay('monthly');
      return;
    }

    try {
      const url = SUPABASE_URL + '/rest/v1/client_websites?site_key=eq.' + encodeURIComponent(SITE_KEY) + '&select=*';
      const res = await fetch(url, {
        headers: { 
          'apikey': SUPABASE_KEY, 
          'Authorization': 'Bearer ' + SUPABASE_KEY 
        }
      });
      if (!res.ok) return;
      const data = await res.json();
      
      if (data && data.length > 0) {
        const item = data[0];
        const now = new Date();
        const expiry = new Date(item.expiry_date);
        const isExpired = now > expiry;
        const isDisabled = item.status === false;

        if (isExpired || isDisabled) {
          execLockOverlay(item.billing_cycle || 'monthly');
        }
      }
    } catch (e) {
      console.error('[Website-Controller] Access check failed:', e);
    }
  }

  function execLockOverlay(billingCycle) {
    function inject() {
      if (document.getElementById('nader-habib-lock-overlay')) return;
      document.documentElement.style.overflow = 'hidden';
      if (document.body) document.body.style.overflow = 'hidden';

      const overlay = document.createElement('div');
      overlay.id = 'nader-habib-lock-overlay';
      overlay.style.cssText = 'position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;background:#030712!important;color:#ffffff!important;z-index:999999999!important;display:flex!important;align-items:center!important;justify-content:center!important;font-family:system-ui,-apple-system,sans-serif!important;text-align:center!important;padding:20px!important;box-sizing:border-box!important;';

      const cycle = billingCycle === 'yearly' ? 'Yearly' : 'Monthly';

      overlay.innerHTML = '<div style="max-width:520px;width:100%;background:rgba(17,24,39,0.95);border:1px solid rgba(239,68,68,0.4);border-radius:24px;padding:40px 32px;box-shadow:0 25px 50px -12px rgba(239,68,68,0.25);backdrop-filter:blur(16px);">' +
        '<div style="width:72px;height:72px;margin:0 auto 24px;background:rgba(239,68,68,0.15);border:2px solid rgba(239,68,68,0.5);border-radius:50%;display:flex;align-items:center;justify-content:center;">' +
          '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>' +
        '</div>' +
        '<span style="background:rgba(239,68,68,0.2);color:#f87171;border:1px solid rgba(239,68,68,0.3);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:9999px;display:inline-block;margin-bottom:16px;">' +
          'Website Access Locked \u2022 ' + cycle + ' Payment Remaining' +
        '</span>' +
        '<h1 style="font-size:26px;font-weight:800;color:#ffffff;margin:0 0 12px 0;">Nader Habib Payment Remaining</h1>' +
        '<p style="font-size:15px;color:#9ca3af;line-height:1.6;margin:0 0 24px 0;">' +
          'Your hosting subscription access is locked. Please contact Nader Habib on WhatsApp to pay remaining dues and restore access.' +
        '</p>' +
        '<div style="background:#1f2937;border:1px solid #374151;border-radius:16px;padding:16px;margin-bottom:24px;">' +
          '<div style="font-size:13px;color:#9ca3af;margin-bottom:4px;">Direct WhatsApp Support</div>' +
          '<div style="font-size:20px;font-weight:700;color:#10b981;">' + WHATSAPP_NUM + '</div>' +
        '</div>' +
        '<a href="' + WHATSAPP_LINK + '" target="_blank" rel="noreferrer" style="display:flex;align-items:center;justify-content:center;gap:10px;background:#10b981;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 24px;border-radius:14px;box-shadow:0 10px 20px -5px rgba(16,185,129,0.4);">' +
          'Contact Nader Habib on WhatsApp' +
        '</a>' +
      '</div>';
      document.documentElement.appendChild(overlay);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject);
    } else {
      inject();
    }
  }

  checkAccess();
})();`,
          }}
        />
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

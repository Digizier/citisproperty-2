'use client';

import React, { forwardRef } from 'react';
import {
  MapPin,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  Building2,
  Bed,
  Bath,
  Maximize2,
  Check,
} from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';

interface PropertyA4FlyerProps {
  property: Property;
  className?: string;
  pageNumber?: number;
  totalPages?: number;
}

const DEFAULT_AMENITIES = [
  'Electricity (24/7 Supply)',
  'Sui Gas Connection',
  'Clean Drinking Water',
  'Underground Sewerage',
  '24/7 Security & CCTV',
  'Gated Community',
  'Near Jamia Mosque',
  'Commercial Hub Access',
  'Lush Green Parks',
  'Boundary Wall',
  'Wide Carpeted Roads',
  'Modern Street Lights',
];

const PropertyA4Flyer = forwardRef<HTMLDivElement, PropertyA4FlyerProps>(
  ({ property, className = '', pageNumber = 1, totalPages = 1 }, ref) => {
    const priceText = formatPKRPrice(property.price);
    const mainImage =
      property.thumbnail_url ||
      (Array.isArray(property.images) && property.images.find((img) => img && img.trim().length > 0)) ||
      '/logo.png';

    // Additional gallery images (photos 2, 3, 4, 5)
    const allValidImages = Array.isArray(property.images)
      ? property.images.filter((img) => img && typeof img === 'string' && img.trim().length > 0)
      : [];

    const otherImages = allValidImages.filter((img) => img !== mainImage);
    const galleryImages = otherImages.slice(0, 4);

    const displayGallery =
      galleryImages.length > 0
        ? galleryImages
        : otherImages.length > 0
        ? otherImages.slice(0, 4)
        : [mainImage];

    const amenities =
      Array.isArray(property.features) && property.features.length > 0
        ? property.features
        : DEFAULT_AMENITIES;

    return (
      <div
        ref={ref}
        id="property-flyer-capture"
        style={{
          width: '794px',
          height: '1123px',
          minWidth: '794px',
          minHeight: '1123px',
          maxWidth: '794px',
          maxHeight: '1123px',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          overflow: 'hidden',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          userSelect: 'none',
        }}
        className={className}
      >
        {/* Top Header Bar */}
        <div
          style={{
            height: '84px',
            backgroundColor: '#020617',
            borderRadius: '16px',
            padding: '12px 20px',
            borderBottom: '4px solid #f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
            {/* Strictly Clamped Logo Container */}
            <div
              style={{
                width: '56px',
                height: '56px',
                minWidth: '56px',
                maxWidth: '56px',
                minHeight: '56px',
                maxHeight: '56px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxSizing: 'border-box',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src="/logo.png"
                alt="Property Bank Logo"
                style={{
                  width: '44px',
                  height: '44px',
                  maxWidth: '44px',
                  maxHeight: '44px',
                  objectFit: 'contain',
                  display: 'block',
                }}
                crossOrigin="anonymous"
              />
            </div>

            {/* Brand Title and Dealership */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#fbbf24',
                  display: 'block',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                CITY HOUSING (PVT) LTD
              </span>
              <h2
                style={{
                  fontSize: '17px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.3px',
                  margin: '2px 0 0 0',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                PROPERTY BANK REAL ESTATE
              </h2>
              <p
                style={{
                  fontSize: '10px',
                  color: '#cbd5e1',
                  fontWeight: 500,
                  margin: '2px 0 0 0',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                Authorized Citi Housing Dealership • Faisalabad | Gujranwala | Sialkot | Jhelum
              </p>
            </div>
          </div>

          {/* Demand Price Badge */}
          <div
            style={{
              minWidth: '175px',
              maxWidth: '210px',
              padding: '8px 16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              border: '1px solid rgba(254, 240, 138, 0.4)',
              textAlign: 'right',
              flexShrink: 0,
              boxSizing: 'border-box',
              marginLeft: '12px',
            }}
          >
            <span
              style={{
                fontSize: '9px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#020617',
                display: 'block',
                lineHeight: 1,
              }}
            >
              Demand Price
            </span>
            <div
              style={{
                fontSize: '19px',
                fontWeight: 900,
                color: '#020617',
                lineHeight: 1.2,
                marginTop: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              PKR {priceText}
            </div>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 700,
                color: '#1e293b',
                display: 'block',
                lineHeight: 1,
                marginTop: '2px',
              }}
            >
              ({property.area_size} {property.area_unit})
            </span>
          </div>
        </div>

        {/* Main Property Showcase Block */}
        <div
          style={{
            height: '240px',
            display: 'flex',
            gap: '16px',
            alignItems: 'stretch',
            boxSizing: 'border-box',
          }}
        >
          {/* Main Cover Image */}
          <div
            style={{
              width: '320px',
              height: '240px',
              minWidth: '320px',
              maxWidth: '320px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f1f5f9',
              position: 'relative',
              flexShrink: 0,
              boxSizing: 'border-box',
            }}
          >
            <img
              src={mainImage}
              alt={property.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              crossOrigin="anonymous"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/logo.png';
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: '#f59e0b',
                color: '#020617',
                fontWeight: 900,
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                padding: '4px 10px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <ShieldCheck style={{ width: '13px', height: '13px' }} />
              <span>100% Verified</span>
            </div>
          </div>

          {/* Property Info & Key Specs */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '240px',
              boxSizing: 'border-box',
            }}
          >
            <div>
              {/* Badges Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    color: '#ffffff',
                    backgroundColor: property.purpose === 'buy' ? '#d97706' : '#2563eb',
                  }}
                >
                  {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {property.type}
                </span>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8' }}>
                  Ref: #{property.id.replace('prop-', '')}
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  color: '#0f172a',
                  lineHeight: 1.25,
                  margin: '0 0 6px 0',
                  maxHeight: '46px',
                  overflow: 'hidden',
                }}
              >
                {property.title}
              </h1>

              {/* Location */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#475569',
                }}
              >
                <MapPin style={{ width: '14px', height: '14px', color: '#d97706', flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {property.location}, {property.city}
                </span>
              </div>
            </div>

            {/* 4-Box Key Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {/* Box 1: Type */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '8px 4px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '66px',
                  boxSizing: 'border-box',
                }}
              >
                <Home style={{ width: '15px', height: '15px', color: '#d97706', marginBottom: '2px' }} />
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', lineHeight: 1 }}>
                  TYPE
                </span>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', lineHeight: 1.3, marginTop: '2px' }}>
                  {property.type}
                </span>
              </div>

              {/* Box 2: Size */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '8px 4px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '66px',
                  boxSizing: 'border-box',
                }}
              >
                <Maximize2 style={{ width: '15px', height: '15px', color: '#d97706', marginBottom: '2px' }} />
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', lineHeight: 1 }}>
                  SIZE
                </span>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', lineHeight: 1.3, marginTop: '2px' }}>
                  {property.area_size} {property.area_unit}
                </span>
              </div>

              {/* Box 3: Beds */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '8px 4px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '66px',
                  boxSizing: 'border-box',
                }}
              >
                <Bed style={{ width: '15px', height: '15px', color: '#d97706', marginBottom: '2px' }} />
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', lineHeight: 1 }}>
                  BEDS
                </span>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', lineHeight: 1.3, marginTop: '2px' }}>
                  {property.bedrooms > 0 ? `${property.bedrooms} Bed` : '-'}
                </span>
              </div>

              {/* Box 4: Baths */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '8px 4px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '66px',
                  boxSizing: 'border-box',
                }}
              >
                <Bath style={{ width: '15px', height: '15px', color: '#d97706', marginBottom: '2px' }} />
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', lineHeight: 1 }}>
                  BATHS
                </span>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', lineHeight: 1.3, marginTop: '2px' }}>
                  {property.bathrooms > 0 ? `${property.bathrooms} Bath` : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities & Infrastructure Section */}
        <div style={{ boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                backgroundColor: '#0f172a',
                color: '#fbbf24',
                fontSize: '10px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                padding: '4px 12px',
                borderRadius: '6px',
              }}
            >
              Amenities & Infrastructure
            </span>
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', flex: 1 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {amenities.slice(0, 12).map((feature, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxSizing: 'border-box',
                  height: '38px',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#fef3c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check style={{ width: '10px', height: '10px', color: '#b45309', strokeWidth: 3 }} />
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#1e293b',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Photos & Property Views Section */}
        <div style={{ boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  backgroundColor: '#0f172a',
                  color: '#fbbf24',
                  fontSize: '10px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  padding: '4px 12px',
                  borderRadius: '6px',
                }}
              >
                Photos & Property Views
              </span>
              <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '180px' }} />
            </div>
            {allValidImages.length > 5 && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#b45309',
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fde68a',
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                +{allValidImages.length - 5} More Photos in Full Brochure
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {displayGallery.map((imgUrl, idx) => (
              <div
                key={idx}
                style={{
                  height: '120px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f1f5f9',
                  position: 'relative',
                  boxSizing: 'border-box',
                }}
              >
                <img
                  src={imgUrl}
                  alt={`Photo ${idx + 2}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo.png';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}
                >
                  {idx + 2}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dealer Contact & Trust Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', boxSizing: 'border-box' }}>
          {/* Left Card: Agent Contact */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '12px 14px',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                fontSize: '9px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#d97706',
                display: 'block',
                lineHeight: 1,
              }}
            >
              Authorized Dealership
            </span>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 900,
                color: '#0f172a',
                margin: '4px 0 6px 0',
                lineHeight: 1.2,
              }}
            >
              {property.agent_name || 'Property Bank Real Estate'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', fontWeight: 600, color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone style={{ width: '13px', height: '13px', color: '#d97706', flexShrink: 0 }} />
                <span>Call: {property.agent_phone || '03218653500'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageCircle style={{ width: '13px', height: '13px', color: '#16a34a', flexShrink: 0 }} />
                <span>WhatsApp: {property.agent_whatsapp || '923218653500'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748b' }}>
                <MapPin style={{ width: '12px', height: '12px', color: '#94a3b8', flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Citi Housing Sargodha & Samundri Road, Faisalabad
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: Dealership Trust */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a, #020617)',
              borderRadius: '14px',
              padding: '12px 14px',
              border: '1px solid #1e293b',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 style={{ width: '15px', height: '15px', color: '#fbbf24', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  Your Trusted Partner in Real Estate
                </span>
              </div>
              <p style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: 500, margin: '4px 0 0 0', lineHeight: 1.3 }}>
                Official marketing & investment consultants for Citi Housing developments across Pakistan.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: 900, color: '#fde68a', letterSpacing: '0.5px' }}>
              <span>✓ BUY</span>
              <span>•</span>
              <span>✓ SELL</span>
              <span>•</span>
              <span>✓ RENT</span>
              <span>•</span>
              <span>✓ INVEST</span>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            height: '36px',
            backgroundColor: '#020617',
            color: '#ffffff',
            borderRadius: '10px',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '10px',
            fontWeight: 700,
            borderTop: '2px solid #f59e0b',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
            <span style={{ color: '#fbbf24', fontWeight: 900 }}>citisproperty.com</span>
            <span>•</span>
            <span>Pakistan Luxury Living & Dealership</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#fbbf24', fontWeight: 900 }}>100% Document Verified Property</span>
            {totalPages > 1 && (
              <span style={{ backgroundColor: '#1e293b', color: '#cbd5e1', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: 900 }}>
                Page {pageNumber} of {totalPages}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

PropertyA4Flyer.displayName = 'PropertyA4Flyer';

export default PropertyA4Flyer;

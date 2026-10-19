'use client';

import React, { forwardRef } from 'react';
import { Phone, MessageCircle, MapPin, FileText, Image as ImageIcon } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPKRPrice } from '@/lib/utils';

interface PropertyA4GalleryPageProps {
  property: Property;
  photos: string[];
  startingPhotoIndex: number;
  pageNumber: number;
  totalPages: number;
  showDescription?: boolean;
  className?: string;
}

const PropertyA4GalleryPage = forwardRef<HTMLDivElement, PropertyA4GalleryPageProps>(
  (
    {
      property,
      photos,
      startingPhotoIndex,
      pageNumber,
      totalPages,
      showDescription = false,
      className = '',
    },
    ref
  ) => {
    const priceText = formatPKRPrice(property.price);

    return (
      <div
        ref={ref}
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
            backgroundColor: '#020617',
            borderRadius: '16px',
            padding: '12px 20px',
            borderBottom: '4px solid #f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
            {/* Clamped Logo */}
            <div
              style={{
                width: '52px',
                height: '52px',
                minWidth: '52px',
                maxWidth: '52px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            >
              <img
                src="/logo.png"
                alt="Property Bank"
                style={{
                  width: '40px',
                  height: '40px',
                  maxWidth: '40px',
                  maxHeight: '40px',
                  objectFit: 'contain',
                  display: 'block',
                }}
                crossOrigin="anonymous"
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: '#fbbf24',
                  display: 'block',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                }}
              >
                CITY HOUSING (PVT) LTD • PROPERTY BANK REAL ESTATE
              </span>
              <h2
                style={{
                  fontSize: '15px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.2px',
                  margin: '3px 0 2px 0',
                  lineHeight: 1.35,
                  paddingBottom: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '440px',
                }}
              >
                {property.title}
              </h2>
              <p
                style={{
                  fontSize: '10px',
                  color: '#cbd5e1',
                  fontWeight: 500,
                  margin: '2px 0 0 0',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                }}
              >
                {property.location}, {property.city} • Ref: #{property.id.replace('prop-', '')}
              </p>
            </div>
          </div>

          {/* Demand Price */}
          <div
            style={{
              minWidth: '150px',
              padding: '8px 16px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              textAlign: 'right',
              flexShrink: 0,
              boxSizing: 'border-box',
              marginLeft: '10px',
            }}
          >
            <span style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', color: '#020617', display: 'block', lineHeight: 1.2 }}>
              Demand Price
            </span>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#020617', lineHeight: 1.3, marginTop: '2px', whiteSpace: 'nowrap' }}>
              PKR {priceText}
            </div>
          </div>
        </div>

        {/* Optional Property Description Section */}
        {showDescription && property.description && (
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '12px 16px',
              boxSizing: 'border-box',
              maxHeight: '140px',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <FileText style={{ width: '14px', height: '14px', color: '#d97706' }} />
              <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#0f172a' }}>
                Property Description & Overview
              </span>
            </div>
            <p
              style={{
                fontSize: '11px',
                color: '#334155',
                fontWeight: 500,
                lineHeight: 1.45,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {property.description}
            </p>
          </div>
        )}

        {/* Extended Photos Gallery Grid */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', padding: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ImageIcon style={{ width: '14px', height: '14px', color: '#d97706' }} />
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
                Photo Gallery — Additional Property Views
              </span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b' }}>
              High Resolution Verified Photos
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: photos.length <= 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '12px',
              flex: 1,
              alignItems: 'stretch',
            }}
          >
            {photos.map((imgUrl, idx) => (
              <div
                key={idx}
                style={{
                  height: showDescription ? (photos.length <= 3 ? '240px' : '170px') : (photos.length <= 4 ? '260px' : '200px'),
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f1f5f9',
                  position: 'relative',
                  boxSizing: 'border-box',
                }}
              >
                <img
                  src={imgUrl}
                  alt={`Gallery Photo ${startingPhotoIndex + idx}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo.png';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '10px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}
                >
                  Photo {startingPhotoIndex + idx}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact Strip */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#d97706', display: 'block', lineHeight: 1.2 }}>
              Authorized Citi Housing Dealer
            </span>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', lineHeight: 1.35, marginTop: '2px', paddingBottom: '1px' }}>
              {property.agent_name || 'Property Bank Real Estate'}
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, lineHeight: 1.35, marginTop: '2px', paddingBottom: '1px' }}>
              Citi Housing Sargodha Road & Samundri Road, Faisalabad
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#1e293b', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px' }}>
              <Phone style={{ width: '13px', height: '13px', color: '#d97706', flexShrink: 0 }} />
              <span style={{ lineHeight: 1.3 }}>{property.agent_phone || '03218653500'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#166534', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '6px 12px', borderRadius: '8px' }}>
              <MessageCircle style={{ width: '13px', height: '13px', color: '#16a34a', flexShrink: 0 }} />
              <span style={{ lineHeight: 1.3 }}>{property.agent_whatsapp || '923218653500'}</span>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            backgroundColor: '#020617',
            color: '#ffffff',
            borderRadius: '10px',
            padding: '10px 18px',
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
            <span style={{ lineHeight: 1.3 }}>Official Verified Listing Record</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#fbbf24', fontWeight: 900 }}>100% Document Verified</span>
            <span style={{ backgroundColor: '#1e293b', color: '#cbd5e1', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: 900 }}>
              Page {pageNumber} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

PropertyA4GalleryPage.displayName = 'PropertyA4GalleryPage';

export default PropertyA4GalleryPage;

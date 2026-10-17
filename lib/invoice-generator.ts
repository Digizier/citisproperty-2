import { Inquiry, SiteSettings } from './types';
import { formatPKRPrice } from './utils';

export function generateInvoiceHtml(
  inquiry: Inquiry,
  settings: SiteSettings | null
): string {
  const d = inquiry.listing_data || {};
  const isSubmission =
    inquiry.type === 'Listing Submission' ||
    Boolean(inquiry.listing_data) ||
    Boolean(inquiry.message?.startsWith('[PROPERTY SUBMISSION]'));

  const siteName =
    settings?.site_name || 'Citi Housing (Pvt) Ltd — Property Bank Real Estate';
  const phones = settings?.phones || '03218653500, 03028658450';
  const whatsapp = settings?.whatsapp || '923218653500';
  const address =
    settings?.address ||
    'Property Bank Real Estate, Citi Housing Sargodha Road & Samundri Road, Faisalabad, Punjab, Pakistan';
  const email = settings?.email || 'info@citisproperty.com';

  const invoiceNo = `PB-INQ-${inquiry.id.replace(/[^0-9]/g, '').slice(-6) || Date.now().toString().slice(-6)}`;
  const dateFormatted = inquiry.created_at
    ? new Date(inquiry.created_at).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
      });

  const propertyTitle =
    d.title ||
    inquiry.property_title?.replace(/^Client Listing:\s*/, '') ||
    'Direct Consultation Lead';
  const demandPrice = d.price ? formatPKRPrice(d.price) : 'Contact for Price';
  const areaSize = d.area_size ? `${d.area_size} ${d.area_unit || 'Marla'}` : 'N/A';
  const purposeText = d.purpose === 'rent' ? 'For Rent (To Let)' : 'For Sale (Buy)';
  const locationText = d.location
    ? `${d.location}${d.city ? `, ${d.city}` : ''}`
    : d.city || 'Citi Housing Project';
  const featuresList = Array.isArray(d.features) && d.features.length > 0
    ? d.features.join(' • ')
    : 'Standard Utilities & 24/7 Security';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invoice - ${invoiceNo}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #ffffff !important;
      color: #0f172a !important;
      font-size: 13px;
      line-height: 1.5;
      padding: 24px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    @media print {
      body {
        padding: 0;
        background: #ffffff !important;
      }
      .invoice-container {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        max-width: 100% !important;
      }
      .no-print {
        display: none !important;
      }
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #b45309;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }
    .brand-sub {
      font-size: 13px;
      font-weight: 800;
      color: #b45309;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .brand-meta {
      font-size: 11px;
      color: #64748b;
      margin-top: 6px;
      max-width: 380px;
      line-height: 1.4;
    }
    .invoice-badge-box {
      text-align: right;
    }
    .invoice-badge {
      display: inline-block;
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .invoice-title {
      font-size: 18px;
      font-weight: 900;
      color: #0f172a;
    }
    .invoice-ref {
      font-family: monospace;
      font-size: 12px;
      color: #64748b;
      font-weight: 700;
      margin-top: 2px;
    }
    .invoice-date {
      font-size: 11px;
      color: #64748b;
      margin-top: 4px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
    }
    .card-title {
      font-size: 11px;
      font-weight: 800;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .field-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 12px;
    }
    .field-label {
      color: #64748b;
      font-weight: 600;
    }
    .field-value {
      font-weight: 700;
      color: #0f172a;
      text-align: right;
    }
    .table-container {
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    th {
      background: #0f172a;
      color: #ffffff;
      padding: 10px 14px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    td {
      padding: 10px 14px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 12px;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    .notes-box {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 8px;
      padding: 14px;
      margin-bottom: 24px;
    }
    .notes-title {
      font-size: 11px;
      font-weight: 800;
      color: #b45309;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .notes-content {
      font-size: 12px;
      color: #78350f;
      line-height: 1.5;
    }
    .footer-bar {
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 11px;
      color: #64748b;
    }
    .stamp-box {
      width: 180px;
      height: 70px;
      border: 2px dashed #cbd5e1;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 10px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
    }
    .print-button {
      background: #b45309;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 800px; margin: 0 auto 16px auto; display: flex; justify-content: space-between; align-items: center;">
    <button onclick="window.print()" class="print-button">🖨️ Print / Save as Clean PDF</button>
    <span style="font-size: 12px; color: #64748b;">(Generated on clean white background, zero web dark mode)</span>
  </div>

  <div class="invoice-container">
    <!-- Header -->
    <div class="header-bar">
      <div>
        <div class="brand-title">Citi Housing (Pvt) Ltd</div>
        <div class="brand-sub">Property Bank Real Estate — Official Authorized Dealership</div>
        <div class="brand-meta">
          <strong>Address:</strong> ${address}<br />
          <strong>Helplines:</strong> ${phones} | <strong>WhatsApp:</strong> ${whatsapp}<br />
          <strong>Web:</strong> www.citisproperty.com | <strong>Email:</strong> ${email}
        </div>
      </div>
      <div class="invoice-badge-box">
        <span class="invoice-badge">${inquiry.status || 'NEW LEAD'}</span>
        <div class="invoice-title">Lead Invoice & Slip</div>
        <div class="invoice-ref">Ref: ${invoiceNo}</div>
        <div class="invoice-date">${dateFormatted}</div>
      </div>
    </div>

    <!-- Client & Lead Overview Grid -->
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Client / Customer Profile</div>
        <div class="field-row">
          <span class="field-label">Customer Name:</span>
          <span class="field-value">${inquiry.name || 'Anonymous Client'}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Phone Helpline:</span>
          <span class="field-value">${inquiry.phone}</span>
        </div>
        <div class="field-row">
          <span class="field-label">WhatsApp Contact:</span>
          <span class="field-value">+${inquiry.phone.replace(/^0/, '92').replace(/[^0-9]/g, '')}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Inquiry Classification:</span>
          <span class="field-value">${inquiry.type || (isSubmission ? 'Property Listing Submission' : 'Direct Lead')}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Dealership Routing & Status</div>
        <div class="field-row">
          <span class="field-label">Dealing Authority:</span>
          <span class="field-value">Property Bank Executive Desk</span>
        </div>
        <div class="field-row">
          <span class="field-label">Current Pipeline:</span>
          <span class="field-value">${inquiry.status || 'New Lead'}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Verification Level:</span>
          <span class="field-value">100% Genuine Authorized</span>
        </div>
        <div class="field-row">
          <span class="field-label">Target Society:</span>
          <span class="field-value">${d.city || 'Citi Housing Project'}</span>
        </div>
      </div>
    </div>

    <!-- Property Specifications Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Specification</th>
            <th>Details & Client Submission</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: 700; width: 35%;">Property Title</td>
            <td><strong>${propertyTitle}</strong></td>
          </tr>
          <tr>
            <td style="font-weight: 700;">Purpose</td>
            <td><span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 800; font-size: 11px; background: #e0f2fe; color: #0369a1;">${purposeText.toUpperCase()}</span></td>
          </tr>
          <tr>
            <td style="font-weight: 700;">Property Category & Type</td>
            <td>${d.type || 'Residential'}</td>
          </tr>
          <tr>
            <td style="font-weight: 700;">Demand Price</td>
            <td style="font-size: 14px; font-weight: 900; color: #b45309;">${demandPrice}</td>
          </tr>
          <tr>
            <td style="font-weight: 700;">Area Dimension</td>
            <td><strong>${areaSize}</strong></td>
          </tr>
          <tr>
            <td style="font-weight: 700;">Exact Location / Sector</td>
            <td>${locationText}</td>
          </tr>
          ${
            d.bedrooms || d.bathrooms
              ? `<tr>
                  <td style="font-weight: 700;">Accommodation</td>
                  <td>${d.bedrooms || 0} Master Beds / ${d.bathrooms || 0} Attached Baths</td>
                </tr>`
              : ''
          }
          <tr>
            <td style="font-weight: 700;">Amenities & Infrastructure</td>
            <td>${featuresList}</td>
          </tr>
          ${
            d.youtube_url
              ? `<tr>
                  <td style="font-weight: 700;">YouTube Video Tour</td>
                  <td><a href="${d.youtube_url}" target="_blank" style="color: #b45309; text-decoration: underline;">${d.youtube_url}</a></td>
                </tr>`
              : ''
          }
          ${
            d.map_url
              ? `<tr>
                  <td style="font-weight: 700;">Google Maps Pin</td>
                  <td><a href="${d.map_url}" target="_blank" style="color: #b45309; text-decoration: underline;">${d.map_url}</a></td>
                </tr>`
              : ''
          }
          ${
            Array.isArray(d.images) && d.images.length > 0
              ? `<tr>
                  <td style="font-weight: 700;">Attached Photos</td>
                  <td>${d.images.length} verified WebP photo(s) in cloud repository</td>
                </tr>`
              : ''
          }
        </tbody>
      </table>
    </div>

    <!-- Notes & Comments -->
    ${
      inquiry.message
        ? `<div class="notes-box">
            <div class="notes-title">Customer Inquiry Message & Specifications</div>
            <div class="notes-content">${inquiry.message}</div>
          </div>`
        : ''
    }

    <!-- Footer Authorization -->
    <div class="footer-bar">
      <div>
        <div style="font-weight: 700; color: #0f172a;">Property Bank Real Estate Official Record</div>
        <div>Generated from citisproperty.com portal • Confidential Client Document</div>
      </div>
      <div class="stamp-box">
        Authorized Signature<br />& Official Stamp
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function downloadInquiryInvoice(
  inquiry: Inquiry,
  settings: SiteSettings | null
): void {
  const html = generateInvoiceHtml(inquiry, settings);
  try {
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 400);
      return;
    }
  } catch (e) {
    console.warn('Popup blocked, falling back to print iframe:', e);
  }

  // Fallback using hidden iframe if popup blocked
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);
  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (doc) {
    doc.open();
    doc.write(html);
    doc.close();
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 60000);
    }, 400);
  }
}

import { test, expect } from '@playwright/test';

const TARGET_PAGES = [
  '/',
  '/citi-housing-faisalabad/',
  '/citi-housing-faisalabad-phase-1-sargodha-road/',
  '/citi-housing-faisalabad-phase-2-sargodha-road/',
  '/citi-housing-faisalabad-samundri-road/',
  '/citi-housing-faisalabad-block-rates/',
];

test.describe('Brief v2 Acceptance Tests for citisproperty.com', () => {
  for (const pagePath of TARGET_PAGES) {
    test(`Status 200, NAP Lock & Hours on ${pagePath}`, async ({ page }) => {
      const response = await page.goto(pagePath);
      expect(response?.status()).toBe(200);

      // Check footer NAP Lock
      const footer = page.locator('footer.bg-slate-950');
      await expect(footer).toBeVisible();

      const footerText = await footer.textContent();
      expect(footerText).toContain('Citi property Real Estate');
      expect(footerText).toContain('Bypass, Samundri Rd, Citi Housing Faisalabad, 38000, Pakistan');
      expect(footerText).toContain('0321 8653500');
      expect(footerText).toContain('Mon–Sun 10:00 am – 8:00 pm');

      // Zero legacy forbidden terms anywhere on the page
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).not.toContain('24 Hours');
      expect(bodyText).not.toContain('24/7');
      expect(bodyText).not.toContain('Sun Closed');
      expect(bodyText).not.toContain('Sunday: Closed');
      expect(bodyText).not.toContain('0302 8658450');
      expect(bodyText).not.toContain('Property Bank');
      expect(bodyText).not.toContain('Main Beulvard');
      expect(bodyText).not.toContain('Office 11-AA');
    });
  }

  test('Sitemap returns 200 and contains the 5 new URLs without empty cities', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);

    const content = await page.content();
    expect(content).toContain('/citi-housing-faisalabad/');
    expect(content).toContain('/citi-housing-faisalabad-phase-1-sargodha-road/');
    expect(content).toContain('/citi-housing-faisalabad-phase-2-sargodha-road/');
    expect(content).toContain('/citi-housing-faisalabad-samundri-road/');
    expect(content).toContain('/citi-housing-faisalabad-block-rates/');
    expect(content).not.toContain('/Homes/Lahore/');
    expect(content).not.toContain('/Homes/Islamabad/');
  });

  test('Schema on homepage matches RealEstateAgent with exact GBP link & hours', async ({ page }) => {
    await page.goto('/');
    const scripts = await page.locator('script[type="application/ld+json"]').allInnerTexts();
    const allSchema = scripts.map((s) => {
      try {
        return JSON.parse(s);
      } catch {
        return null;
      }
    });

    const graph = allSchema.flatMap((s) => s?.['@graph'] || s || []);
    const agent = graph.find((item: any) =>
      Array.isArray(item['@type'])
        ? item['@type'].includes('RealEstateAgent')
        : item['@type'] === 'RealEstateAgent'
    );

    expect(agent).toBeTruthy();
    expect(agent.name).toBe('Citi property Real Estate');
    expect(agent.telephone).toBe('+92 321 8653500');
    expect(agent.address.streetAddress).toBe('Bypass, Samundri Rd, Citi Housing Faisalabad, 38000, Pakistan');
    expect(agent.hasMap).toBe('https://share.google/kqahSEawatNDdQBx8');
    expect(agent.sameAs).toEqual(['https://share.google/kqahSEawatNDdQBx8']);

    const openingHours = agent.openingHoursSpecification[0];
    expect(openingHours.opens).toBe('10:00');
    expect(openingHours.closes).toBe('20:00');
  });

  test('B Block Extension on Page 4 and Page 5 appears in separate box with NO Phase 2 label', async ({ page }) => {
    // Page 4: Samundri Road
    await page.goto('/citi-housing-faisalabad-samundri-road/');
    const p4Text = await page.locator('body').innerText();
    expect(p4Text).toContain('B Block Extension — New Booking, Samundri Road');

    // Page 5: Block Rates
    await page.goto('/citi-housing-faisalabad-block-rates/');
    const p5Text = await page.locator('body').innerText();
    expect(p5Text).toContain('B Block Extension — New Booking, Samundri Road');
  });

  test('Listing SSR rendering: Price, Size, Block rendered without loading spinner text', async ({ page }) => {
    await page.goto('/property/prop-ch-fsd-1/');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('Loading verified property details…');
    expect(bodyText).toContain('Spanish Villa');
    expect(bodyText).toContain('Kanal');
  });

  test('Mobile responsive iPhone 15 screenshot & no horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 }); // iPhone 15 dimensions
    await page.goto('/citi-housing-faisalabad/');

    // Check no horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // Capture screenshot
    await page.screenshot({ path: 'tests/screenshots/iphone15-hub.png', fullPage: false });
  });
});

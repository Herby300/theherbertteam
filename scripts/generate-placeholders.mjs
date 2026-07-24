/**
 * Generates every placeholder asset referenced by the site so the build runs and
 * layouts render at the correct aspect ratios. Each JPG is labelled with its own
 * path, so swapping in real photography is a straight file replacement — no code
 * changes required.
 *
 * Run with: npm run placeholders
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

const NAVY = '#010E71';
const NAVY_DARK = '#000842';
const BRANDBLUE = '#0698F8';
const WHITE = '#FFFFFF';

/** Wide hero crops, 3:2 cards, portrait headshots, and the social share image. */
const images = [
  { path: 'images/og-default.jpg', width: 1200, height: 630, label: 'The Herbert Team — Open Graph' },
  { path: 'images/jason-headshot.jpg', width: 800, height: 800, label: 'Jason Herbert headshot' },
  { path: 'images/jason-headshot-large.jpg', width: 1000, height: 1250, label: 'Jason Herbert headshot (large)' },

  { path: 'images/hero/home-hero.jpg', width: 1920, height: 1280, label: 'Home hero' },
  { path: 'images/hero/about-hero.jpg', width: 1920, height: 1080, label: 'About hero' },
  { path: 'images/hero/programs-hero.jpg', width: 1920, height: 1080, label: 'Loan programs hero' },
  { path: 'images/hero/solutions-hero.jpg', width: 1920, height: 1080, label: 'Solutions hero' },
  { path: 'images/hero/resources-hero.jpg', width: 1920, height: 1080, label: 'Resources hero' },
  { path: 'images/hero/contact-hero.jpg', width: 1920, height: 1080, label: 'Contact hero' },
  { path: 'images/hero/blog-hero.jpg', width: 1920, height: 1080, label: 'Blog hero' },

  { path: 'images/programs/conventional.jpg', width: 1200, height: 800, label: 'Conventional loans' },
  { path: 'images/programs/fha.jpg', width: 1200, height: 800, label: 'FHA loans' },
  { path: 'images/programs/va.jpg', width: 1200, height: 800, label: 'VA loans' },
  { path: 'images/programs/jumbo.jpg', width: 1200, height: 800, label: 'Jumbo loans' },
  { path: 'images/programs/construction.jpg', width: 1200, height: 800, label: 'Construction loans' },
  { path: 'images/programs/investor-dscr.jpg', width: 1200, height: 800, label: 'Investor & DSCR' },
  { path: 'images/programs/self-employed.jpg', width: 1200, height: 800, label: 'Self-employed programs' },
  { path: 'images/programs/refinance.jpg', width: 1200, height: 800, label: 'Refinance' },

  { path: 'images/solutions/atm-mortgage.jpg', width: 1200, height: 800, label: 'ATM Mortgage' },
  { path: 'images/solutions/buy-before-you-sell.jpg', width: 1200, height: 800, label: 'Buy Before You Sell' },
  { path: 'images/solutions/down-payment-assistance.jpg', width: 1200, height: 800, label: 'Down payment assistance' },
  { path: 'images/solutions/first-time-homebuyers.jpg', width: 1200, height: 800, label: 'First-time homebuyers' },

  { path: 'images/resources/homebuyer-guide.jpg', width: 800, height: 500, label: 'Homebuyer guide' },
  { path: 'images/resources/first-time-checklist.jpg', width: 800, height: 500, label: 'First-time checklist' },
  { path: 'images/resources/mortgage-process-guide.jpg', width: 800, height: 500, label: 'Mortgage process guide' },
  { path: 'images/resources/moving-checklist.jpg', width: 800, height: 500, label: 'Moving checklist' },
  { path: 'images/resources/closing-cost-guide.jpg', width: 800, height: 500, label: 'Closing cost guide' },
  { path: 'images/resources/buying-timeline.jpg', width: 800, height: 500, label: 'Home buying timeline' },

  { path: 'images/two-futures/stuck.jpg', width: 1000, height: 750, label: 'If nothing changes' },
  { path: 'images/two-futures/moving-forward.jpg', width: 1000, height: 750, label: 'If we talk this week' },

  { path: 'images/blog/placeholder.jpg', width: 1200, height: 675, label: 'Blog article image' },
  { path: 'images/testimonials/placeholder-avatar.jpg', width: 200, height: 200, label: 'Client' },
];

/** Escapes text for safe interpolation into the SVG label. */
function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function placeholderSvg({ width, height, label, path }) {
  const titleSize = Math.max(16, Math.round(Math.min(width, height) * 0.075));
  const pathSize = Math.max(11, Math.round(titleSize * 0.42));
  const stripe = Math.max(4, Math.round(height * 0.012));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="${NAVY_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect x="0" y="${height - stripe}" width="${width}" height="${stripe}" fill="${BRANDBLUE}"/>
  <text x="50%" y="47%" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="${titleSize}" font-weight="700" fill="${WHITE}">${escapeXml(label)}</text>
  <text x="50%" y="47%" dy="${Math.round(titleSize * 1.25)}" text-anchor="middle"
        font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="${pathSize}" fill="${BRANDBLUE}"
        >/${escapeXml(path)} · ${width}×${height}</text>
</svg>`;
}

/** Vector assets are shipped as-is rather than rasterised. */
const svgFiles = {
  'favicon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="${NAVY}"/>
  <path d="M14 34 32 18l18 16v14a2 2 0 0 1-2 2h-9V38h-14v12h-9a2 2 0 0 1-2-2z" fill="none" stroke="${BRANDBLUE}" stroke-width="4" stroke-linejoin="round"/>
</svg>`,

  'images/logo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 56" width="260" height="56" role="img" aria-label="The Herbert Team">
  <rect x="0" y="4" width="48" height="48" rx="11" fill="${NAVY}"/>
  <path d="M11 30 24 18l13 12v10a1.5 1.5 0 0 1-1.5 1.5H29V33h-10v8.5h-6.5A1.5 1.5 0 0 1 11 40z" fill="none" stroke="${BRANDBLUE}" stroke-width="3" stroke-linejoin="round"/>
  <text x="62" y="27" font-family="Sora, Segoe UI, Helvetica, Arial, sans-serif" font-size="19" font-weight="800" fill="${NAVY}">The Herbert Team</text>
  <text x="62" y="44" font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif" font-size="10.5" letter-spacing="2.1" fill="#5A5A5F">MORTGAGE SOLUTION EXPERT</text>
</svg>`,

  'images/logo-white.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 56" width="260" height="56" role="img" aria-label="The Herbert Team">
  <rect x="0" y="4" width="48" height="48" rx="11" fill="${WHITE}"/>
  <path d="M11 30 24 18l13 12v10a1.5 1.5 0 0 1-1.5 1.5H29V33h-10v8.5h-6.5A1.5 1.5 0 0 1 11 40z" fill="none" stroke="${NAVY}" stroke-width="3" stroke-linejoin="round"/>
  <text x="62" y="27" font-family="Sora, Segoe UI, Helvetica, Arial, sans-serif" font-size="19" font-weight="800" fill="${WHITE}">The Herbert Team</text>
  <text x="62" y="44" font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif" font-size="10.5" letter-spacing="2.1" fill="#C5C4C3">MORTGAGE SOLUTION EXPERT</text>
</svg>`,

  'images/badges/equal-housing.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="56" height="56" role="img" aria-label="Equal Housing Lender">
  <rect width="56" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  <path d="M28 13 45 26h-5v15H16V26h-5z" fill="currentColor"/>
  <rect x="19" y="43" width="18" height="2.6" fill="currentColor"/>
  <rect x="19" y="47.5" width="18" height="2.6" fill="currentColor"/>
</svg>`,

  'images/badges/fdic.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 56" width="112" height="56" role="img" aria-label="Member FDIC">
  <rect width="112" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  <text x="56" y="26" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="currentColor">MEMBER</text>
  <text x="56" y="44" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="17" font-weight="800" letter-spacing="1.5" fill="currentColor">FDIC</text>
</svg>`,

  'images/badges/google-reviews.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40" role="img" aria-label="Google Reviews">
  <path d="M20 20.4c0-.7-.06-1.36-.18-2H12v3.8h4.5a3.85 3.85 0 0 1-1.67 2.53v2.1h2.7A8.16 8.16 0 0 0 20 20.4z" fill="#4285F4"/>
  <path d="M12 28.8c2.26 0 4.15-.75 5.53-2.03l-2.7-2.09c-.75.5-1.7.8-2.83.8-2.18 0-4.02-1.47-4.68-3.44H4.53v2.16A8.36 8.36 0 0 0 12 28.8z" fill="#34A853"/>
  <path d="M7.32 22.04a5.02 5.02 0 0 1 0-3.22v-2.16H4.53a8.37 8.37 0 0 0 0 7.54z" fill="#FBBC05"/>
  <path d="M12 15.38c1.23 0 2.33.42 3.2 1.25l2.39-2.39A8.03 8.03 0 0 0 12 12a8.36 8.36 0 0 0-7.47 4.62l2.79 2.16c.66-1.97 2.5-3.4 4.68-3.4z" fill="#EA4335"/>
  <text x="34" y="18" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="11" font-weight="700" fill="#1C1C1E">Google</text>
  <text x="34" y="31" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="10" fill="#5A5A5F">Reviews ★★★★★</text>
</svg>`,
};

const robotsTxt = `User-agent: *
Allow: /

Disallow: /thank-you

Sitemap: https://www.theherbertteam.com/sitemap-index.xml
`;

async function write(relativePath, contents) {
  const target = join(publicDir, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents);
}

async function main() {
  for (const [relativePath, contents] of Object.entries(svgFiles)) {
    await write(relativePath, contents);
  }

  await write('robots.txt', robotsTxt);
  await write('downloads/.gitkeep', '');

  for (const image of images) {
    const svg = placeholderSvg(image);
    const jpg = await sharp(Buffer.from(svg)).jpeg({ quality: 72, progressive: true }).toBuffer();
    await write(image.path, jpg);
  }

  console.log(`Generated ${images.length} placeholder images and ${Object.keys(svgFiles).length} vector assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

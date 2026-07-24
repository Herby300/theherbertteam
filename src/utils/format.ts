const currency0 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const currency2 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateLong = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatCurrency(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return '$0';
  return decimals === 0 ? currency0.format(value) : currency2.format(value);
}

export function formatPercent(value: number, decimals = 3): string {
  if (!Number.isFinite(value)) return '0%';
  return `${value.toFixed(decimals).replace(/\.?0+$/, '')}%`;
}

export function formatDate(date: Date | string): string {
  const parsed = typeof date === 'string' ? new Date(date) : date;
  return dateLong.format(parsed);
}

export function isoDate(date: Date | string): string {
  const parsed = typeof date === 'string' ? new Date(date) : date;
  return parsed.toISOString().split('T')[0] ?? '';
}

/** Rough read time based on 225 words per minute, minimum one minute. */
export function readTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Absolute URL for canonical tags, Open Graph images, and JSON-LD. */
export function absoluteUrl(path: string, base: string): string {
  return new URL(path, base).toString();
}

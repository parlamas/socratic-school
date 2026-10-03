// src/app/sitemap.ts
// Auto-generates /sitemap.xml at build time. Only lists public pages.
// Shop product pages (/shop/[area], /shop/[area]/[topic]) are public but
// not enumerated here (no static list of areas/topics) — they stay
// crawlable via links from /shop instead. Admin, instructor, student
// account/auth pages, and password-reset utility pages are excluded
// entirely (also blocked in robots.ts).

import type { MetadataRoute } from 'next';

const BASE_URL = 'https://socratic-school.com';

const PUBLIC_PATHS = [
  '/',
  '/exercises',
  '/grammar',
  '/metaphysics',
  '/republic',
  '/symposium',
  '/placement-test',
  '/danish',
  '/danish/ex-001',
  '/danish/ex-002',
  '/danish/lesson-001',
  '/danish/lesson-002',
  '/danish/lesson-003',
  '/danish/word-order',
  '/english/ex-001',
  '/english/ex-002',
  '/english/ex-003',
  '/english/ex-004',
  '/english/ex-005',
  '/math/ekp',
  '/math/ld',
  '/math/mc',
  '/math/mkd',
  '/multilingual/ex-001',
  '/multilingual/ex-002',
  '/shop',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PUBLIC_PATHS.map((path) => ({
    url: path === '/' ? BASE_URL : `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}

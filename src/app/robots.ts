// src/app/robots.ts
// Auto-generates /robots.txt. Blocks admin, API, instructor/student
// account areas (dashboards, sign-in/sign-up), and password-reset
// utility pages from being crawled/indexed. Shop product pages
// (/shop/[area]/...) are intentionally left crawlable — they're public.

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/',
        '/api',
        '/api/',
        '/instructor',
        '/instructor/',
        '/students',
        '/students/',
        '/forgot-password',
        '/reset-password',
      ],
    },
    sitemap: 'https://socratic-school.com/sitemap.xml',
  };
}

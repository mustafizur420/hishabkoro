import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { tools } from '@/data/tools';
import { universities } from '@/data/universities';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    ...tools.map((t) => t.href),
    ...universities.map((u) => `/cgpa/${u.slug}/`),
    '/about/',
    '/contact/',
    '/privacy/',
    '/terms/',
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}

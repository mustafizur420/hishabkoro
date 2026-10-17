import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { tools } from '@/data/tools';
import { universities } from '@/data/universities';
import { districts } from '@/data/districts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    ...tools.map((t) => t.href),
    ...universities.map((u) => `/cgpa/${u.slug}/`),
    ...districts.map((d) => `/prayer-times/${d.slug}/`),
    '/about/',
    '/contact/',
    '/privacy/',
    '/terms/',
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}

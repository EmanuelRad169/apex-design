import type { MetadataRoute } from 'next';
import { localServicePages } from '@/lib/localServicePages';

const baseUrl = 'https://apexdbr.com';

const routes = [
  '',
  '/about',
  '/contact',
  '/services/kitchen',
  '/services/bathrooms',
  '/services/additions',
  ...Object.keys(localServicePages).map((slug) => `/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/services') ? 0.8 : 0.7,
  }));
}

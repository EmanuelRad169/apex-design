import type { MetadataRoute } from 'next';

const baseUrl = 'https://apexdbr.com';

const routes = [
  '',
  '/about',
  '/contact',
  '/services/kitchen',
  '/services/bathrooms',
  '/services/interiors',
  '/services/additions',
  '/services/exteriors',
  '/services/sunrooms',
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

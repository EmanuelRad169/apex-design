import type { Metadata } from 'next';
import LocalServicePage from '@/components/LocalServicePage';
import { localServicePages, siteUrl } from '@/lib/localServicePages';

const page = localServicePages['kitchen-remodeling-orange-county'];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  keywords: page.keywords,
  alternates: {
    canonical: `${siteUrl}/${page.slug}`,
  },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: `${siteUrl}/${page.slug}`,
    type: 'website',
    images: [
      {
        url: page.heroImage,
        width: 1200,
        height: 630,
        alt: page.imageAlt,
      },
    ],
  },
};

export default function KitchenRemodelingOrangeCountyPage() {
  return <LocalServicePage page={page} />;
}

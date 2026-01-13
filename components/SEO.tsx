import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  noindex?: boolean;
  schemaData?: object;
}

const DEFAULT_SEO = {
  title: 'Apex Design | Kitchen & Bath Remodeling in Orange County',
  description: 'Transform your space with precision. Licensed, insured kitchen and bathroom remodeling by OC-based Apex Design. Free in-home estimates.',
  keywords: 'kitchen remodel, bathroom remodel, Orange County, OC, home renovation, remodeling contractor, licensed, insured',
  ogImage: 'https://apexdbr.com/og-image.jpg',
  ogUrl: 'https://apexdbr.com',
};

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  noindex = false,
  schemaData
}: SEOProps) {
  const seoTitle = title || DEFAULT_SEO.title;
  const seoDescription = description || DEFAULT_SEO.description;
  const seoKeywords = keywords || DEFAULT_SEO.keywords;
  const seoOgTitle = ogTitle || seoTitle;
  const seoOgDescription = ogDescription || seoDescription;
  const seoOgImage = ogImage || DEFAULT_SEO.ogImage;
  const seoOgUrl = ogUrl || DEFAULT_SEO.ogUrl;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoOgTitle} />
      <meta property="og:description" content={seoOgDescription} />
      <meta property="og:image" content={seoOgImage} />
      <meta property="og:url" content={seoOgUrl} />
      <meta property="og:site_name" content="Apex Design" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoOgTitle} />
      <meta name="twitter:description" content={seoOgDescription} />
      <meta name="twitter:image" content={seoOgImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="Apex Design" />
      
      {/* Schema.org structured data */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
    </Head>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { orangeCountyCities, siteUrl } from '@/lib/localServicePages';
import type { LocalServicePage as LocalServicePageData } from '@/lib/localServicePages';

type LocalServicePageProps = {
  page: LocalServicePageData;
};

function buildSchema(page: LocalServicePageData) {
  const url = `${siteUrl}/${page.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#localbusiness`,
        name: 'Apex Design Build & Remodel',
        url: siteUrl,
        image: `${siteUrl}/og-image.jpg`,
        logo: `${siteUrl}/logo.svg`,
        telephone: '+1-949-878-3250',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '2372 Morse Ave',
          addressLocality: 'Irvine',
          addressRegion: 'CA',
          postalCode: '92614',
          addressCountry: 'US',
        },
        areaServed: orangeCountyCities.map((city) => ({
          '@type': 'City',
          name: `${city}, CA`,
        })),
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00',
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.title,
        serviceType: page.serviceType,
        description: page.metaDescription,
        provider: {
          '@id': `${siteUrl}/#localbusiness`,
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Orange County, CA',
          },
          ...orangeCountyCities.map((city) => ({
            '@type': 'City',
            name: `${city}, CA`,
          })),
        ],
        url,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export default function LocalServicePage({ page }: LocalServicePageProps) {
  const schema = buildSchema(page);

  return (
    <div className="bg-white pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-light/50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-wide text-accent">
              Serving Orange County homeowners
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">
              {page.h1}
            </h1>
            <p className="mb-5 text-xl font-semibold text-primary/80 sm:text-2xl">
              {page.eyebrow}
            </p>
            <p className="mb-6 text-base leading-8 text-neutral-700 sm:text-lg">
              {page.intro}
            </p>
            <p className="mb-8 text-base leading-8 text-neutral-600">
              {page.lead}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-xl bg-accent px-6 py-4 text-center font-semibold text-white shadow-lg transition-colors hover:bg-accent/90"
              >
                Request a Free Estimate
              </Link>
              <Link
                href="tel:9498783250"
                className="rounded-xl border border-primary px-6 py-4 text-center font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Call Apex Remodeling Today
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 shadow-xl">
            <Image
              src={page.heroImage}
              alt={page.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold text-primary sm:text-4xl">
              Local remodeling expertise across Orange County
            </h2>
            <p className="text-lg leading-8 text-neutral-600">
              We provide {page.serviceType.toLowerCase()} services throughout Orange County including{' '}
              {orangeCountyCities.slice(0, -1).join(', ')}, and {orangeCountyCities[orangeCountyCities.length - 1]}.
              Every project is built around your home, your budget, and the way you want to live.
            </p>
          </div>
        </div>
      </section>

      {page.sections.map((section) => (
        <section key={section.heading} className="border-t border-neutral-100 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-primary">
                  {section.heading}
                </h2>
                <p className="text-base leading-8 text-neutral-600">
                  {section.body}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {section.items.map((item) => (
                  <article key={item.title} className="rounded-xl border border-neutral-100 bg-neutral-50 p-5">
                    <h3 className="mb-3 text-lg font-bold text-primary">{item.title}</h3>
                    <p className="text-sm leading-7 text-neutral-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-primary px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="mb-4 text-3xl font-bold">A clear process from estimate to final walkthrough</h2>
              <p className="leading-8 text-white/80">
                Schedule your in-home consultation and get a practical remodeling plan before construction begins.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.process.map((step, index) => (
                <article key={step.title} className="rounded-xl bg-white/10 p-5">
                  <p className="mb-3 text-sm font-bold text-accent">Step {index + 1}</p>
                  <h3 className="mb-3 text-lg font-bold">{step.title}</h3>
                  <p className="text-sm leading-7 text-white/80">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold text-primary">Why Orange County homeowners choose Apex</h2>
            <p className="text-base leading-8 text-neutral-600">
              Apex Design Build & Remodel combines local project experience with a practical, conversion-focused process
              that keeps your remodel organized from the first estimate through the final detail.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Licensed, Bonded & Insured',
              'Serving Orange County homeowners',
              'Custom remodeling solutions',
              'On-time & on-budget craftsmanship',
            ].map((trustItem) => (
              <div key={trustItem} className="rounded-xl border border-neutral-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-primary">{trustItem}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light/40 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-3xl font-bold text-primary">Related remodeling services</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {page.internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-3 text-lg font-bold text-primary">{link.label}</h3>
                <p className="text-sm leading-7 text-neutral-600">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold text-primary">Frequently asked questions</h2>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-primary">{faq.question}</h3>
                <p className="leading-8 text-neutral-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent px-4 py-14 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Schedule Your In-Home Consultation</h2>
          <p className="mb-8 text-lg leading-8 text-white/90">
            Tell us what you want to improve, and Apex Remodeling will help you plan the next step with a clear,
            local, no-pressure estimate.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-6 py-4 font-semibold text-primary shadow-lg transition-colors hover:bg-neutral-50"
            >
              Request a Free Estimate
            </Link>
            <Link
              href="tel:9498783250"
              className="rounded-xl border border-white px-6 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-primary"
            >
              Call Apex Remodeling Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

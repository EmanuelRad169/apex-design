import Link from 'next/link';
import HeroImageCarousel from '@/components/HeroImageCarousel';
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
  const heroSlides = page.heroImages ?? [{ src: page.heroImage, alt: page.imageAlt }];

  return (
    <div className="bg-white pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-light/50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
              Serving Orange County homeowners
            </p>
            <h1 className="mb-4 text-4xl font-extrabold leading-[1.05] text-primary sm:text-5xl lg:text-[3.25rem]">
              {page.h1}
            </h1>
            <p className="mb-5 text-lg font-bold leading-7 text-primary/80 sm:text-xl">
              {page.eyebrow}
            </p>
            <div className="mb-6 rounded-2xl border border-white/70 bg-white/70 p-5 shadow-sm">
              <p className="text-base leading-8 text-neutral-700">
                {page.intro}
              </p>
              <div className="my-4 h-px bg-neutral-200" />
              <p className="text-sm leading-7 text-neutral-600">
                {page.lead}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="rounded-xl bg-accent px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-colors hover:bg-accent/90"
              >
                Request a Free Estimate
              </Link>
              <Link
                href="tel:9498783250"
                className="rounded-xl border border-primary px-6 py-3.5 text-center text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Call Apex Remodeling Today
              </Link>
            </div>
          </div>

          <HeroImageCarousel
            slides={heroSlides}
            aspectClassName="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[1.32/1]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </section>

      {/* ── Body: content sections ──────────────────────────────────── */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50 shadow-sm">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">Orange County Local</p>
                <h2 className="mb-4 max-w-2xl text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
                  Local remodeling expertise across Orange County
                </h2>
                <p className="text-base leading-8 text-neutral-600 sm:text-lg">
                  We provide {page.serviceType.toLowerCase()} services throughout Orange County including{' '}
                  {orangeCountyCities.slice(0, -1).join(', ')}, and {orangeCountyCities[orangeCountyCities.length - 1]}.
                  Every project is built around your home, your budget, and the way you want to live.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {orangeCountyCities.map((city) => (
                  <div key={city} className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold text-primary shadow-sm">
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {page.sections.map((section, sectionIndex) => (
              <section key={section.heading} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-sm font-extrabold text-accent">
                      {sectionIndex + 1}
                    </div>
                    <h2 className="mb-4 max-w-xl text-3xl font-extrabold leading-tight text-primary">
                      {section.heading}
                    </h2>
                    <p className="text-base leading-8 text-neutral-600">
                      {section.body}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {section.items.map((item) => (
                      <article key={item.title} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5 transition-transform duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                        <div className="mb-4 h-1.5 w-12 rounded-full bg-accent" />
                        <h3 className="mb-3 text-lg font-bold leading-snug text-primary">{item.title}</h3>
                        <p className="text-sm leading-7 text-neutral-600">{item.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">Our Process</p>
              <h2 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
                A clear process from estimate to final walkthrough
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/75 lg:justify-self-end">
              Schedule your in-home consultation and get a practical remodeling plan before construction begins.
              Every step is organized around clear expectations, clean communication, and a finished space you feel good about.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 right-6 top-8 hidden h-px bg-white/15 lg:block" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.process.map((step, index) => (
                <article
                  key={step.title}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08] p-5 shadow-xl shadow-black/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.12] sm:p-6"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent text-base font-extrabold text-white shadow-lg shadow-black/15">
                      {index + 1}
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/55">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold leading-snug">{step.title}</h3>
                  <p className="text-sm leading-7 text-white/75">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">Built for confidence</p>
              <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
                Why Orange County homeowners choose Apex
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-neutral-600 lg:justify-self-end">
              Apex Design Build & Remodel combines local project experience with a practical, conversion-focused process
              that keeps your remodel organized from the first estimate through the final detail.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Licensed, Bonded & Insured',
                text: 'Work with a qualified remodeling team that treats your home and investment with care.',
              },
              {
                title: 'Serving Orange County homeowners',
                text: 'Local project experience across Irvine, Newport Beach, Tustin, Mission Viejo, and nearby cities.',
              },
              {
                title: 'Custom remodeling solutions',
                text: 'Design and build plans tailored to your layout, goals, finishes, and budget.',
              },
              {
                title: 'On-time & on-budget craftsmanship',
                text: 'Clear scheduling, proactive updates, and detail-focused construction from start to finish.',
              },
            ].map((trustItem, index) => (
              <div key={trustItem.title} className="group rounded-2xl border border-neutral-100 bg-neutral-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-white transition-colors group-hover:bg-accent">
                  {index + 1}
                </div>
                <h3 className="mb-3 text-lg font-extrabold leading-snug text-primary">{trustItem.title}</h3>
                <p className="text-sm leading-7 text-neutral-600">{trustItem.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EAF5F8] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">Explore next</p>
              <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Related remodeling services</h2>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-accent">
              Request a Free Estimate
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {page.internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-white/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 h-1.5 w-14 rounded-full bg-accent transition-all group-hover:w-20" />
                <h3 className="mb-3 text-lg font-extrabold leading-snug text-primary">{link.label}</h3>
                <p className="text-sm leading-7 text-neutral-600">{link.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-accent">
                  View service
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
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

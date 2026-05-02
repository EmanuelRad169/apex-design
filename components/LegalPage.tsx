import type { ReactNode } from 'react';

type LegalSection = {
  title: string;
  children: ReactNode;
};

type LegalPageProps = {
  title: string;
  description: string;
  sections: LegalSection[];
};

export default function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <div className="bg-white pt-20">
      <section className="bg-light/50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
            Apex Design Build & Remodel
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            {description}
          </p>
        </div>
      </section>

      <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10 text-neutral-800 [&_a]:font-semibold [&_a]:text-accent [&_a:hover]:underline [&_li]:text-neutral-700 [&_p]:text-neutral-700 [&_strong]:text-primary">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-gray-200 pb-8 last:border-b-0">
              <h2 className="mb-4 text-2xl font-bold text-primary">{section.title}</h2>
              <div className="space-y-4 text-base leading-7">{section.children}</div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}

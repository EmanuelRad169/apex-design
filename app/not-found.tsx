import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[100vh] items-center bg-[#EAF5F8] px-4 py-20 text-primary sm:px-6 lg:-mb-0 lg:px-8">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="mb-4 text-sm fnt-bold uppercase tracking-widest text-accent">404 - Page Not Found</p>
        <h1 className="mb-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          This page is not available.
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
          The page may have moved or the link may be incorrect. You can return home or request a free remodeling estimate.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-accent px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-colors hover:bg-accent/90"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-primary px-6 py-3.5 text-center text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Request a Free Estimate
          </Link>
        </div>
      </div>
    </section>
  );
}

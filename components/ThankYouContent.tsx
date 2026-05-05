'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Home, FileText, CheckCircle, ArrowRight, Star, Shield, MapPin } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    step: '01',
    title: 'Quick Call',
    description:
      "We'll call to confirm your project details and schedule a time that works for you — usually within one business day.",
  },
  {
    icon: Home,
    step: '02',
    title: 'In-Home Visit',
    description:
      'Our OC-based team visits your space, takes measurements, and listens closely to your vision — no pressure, no upsells.',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Custom Proposal',
    description:
      'You receive a detailed, itemized quote written for your exact project — transparent pricing, no hidden fees.',
  },
];

const trustBadges = [
  { icon: Star, label: 'Five Star Rating' },
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: MapPin, label: 'OC-Based Team' },
];

const exploreCards = [
  {
    href: '/about',
    title: 'Meet the Apex Team',
    description: 'Learn who we are, how we work, and why OC homeowners trust us with their biggest investment.',
    cta: 'About Us',
  },
  {
    href: '/#transformation',
    title: 'See the Transformations',
    description: 'Browse our before-and-after gallery — real projects, real results from right here in Orange County.',
    cta: 'View Gallery',
  },
  {
    href: '/services/kitchen',
    title: 'Explore Kitchen Remodels',
    description: 'See what a full kitchen transformation looks like, from layout to finish — and what it costs.',
    cta: 'Kitchen Services',
  },
];

export default function ThankYouContent() {
  return (
    <div className="bg-white min-h-screen pt-20">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-light/40 to-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">

          {/* Success badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 180, damping: 14 }}
            className="mx-auto mb-8 w-28 h-28 rounded-full bg-accent/10 border-4 border-accent/20 flex items-center justify-center"
          >
            <CheckCircle className="w-14 h-14 text-accent" strokeWidth={1.75} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5"
          >
            <p className="text-base font-semibold tracking-widest text-accent uppercase">
              Request Received
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-primary leading-[0.92] tracking-tight">
              Thank You!
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-xl mx-auto leading-relaxed">
              Your request is in. A real person from our OC team will reach out within{' '}
              <span className="font-semibold text-primary">24 hours</span> to schedule
              your free in-home consultation.
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white border border-neutral-200 shadow-sm px-4 py-2.5 rounded-lg"
              >
                <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm font-semibold text-neutral-800">{label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 bg-white border border-neutral-200 shadow-sm px-4 py-2.5 rounded-lg">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-sm font-semibold text-neutral-800">100% Satisfaction Guarantee</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What Happens Next ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
              What Happens Next
            </h2>
            <p className="text-neutral-500 text-base max-w-lg mx-auto">
              Here's exactly what to expect — no guesswork, no waiting around wondering.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, step, title, description }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white border border-neutral-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" strokeWidth={1.75} />
                  </div>
                  <span className="text-4xl font-extrabold text-neutral-100 leading-none select-none">
                    {step}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-primary text-lg mb-1.5">{title}</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call CTA ─────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white border-2 border-accent/30 rounded-2xl p-8 sm:p-10 text-center shadow-sm"
        >
          <p className="text-sm font-semibold tracking-widest text-accent uppercase mb-3">
            Need to reach us sooner?
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            We're a phone call away.
          </p>
          <a
            href="tel:9498783250"
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-200 text-xl"
          >
            <Phone className="w-5 h-5 flex-shrink-0" />
            (949) 878-3250
          </a>
          <p className="text-neutral-400 text-sm mt-4">Monday – Friday, 9am – 5pm</p>
        </motion.div>
      </section>

      {/* ── While You Wait ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              While You Wait
            </h2>
            <p className="text-neutral-500 text-base">
              Get to know the team and see what we can do for your home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {exploreCards.map(({ href, title, description, cta }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={href}
                  className="group flex flex-col justify-between h-full bg-neutral-50 hover:bg-light/40 border border-neutral-200 rounded-2xl p-6 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="mb-5">
                    <p className="font-bold text-primary text-base mb-2 group-hover:text-accent transition-colors duration-200">
                      {title}
                    </p>
                    <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold">
                    {cta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10 text-sm text-neutral-400"
          >
            Or{' '}
            <Link href="/" className="text-accent hover:underline font-medium">
              return to the homepage
            </Link>
          </motion.p>
        </div>
      </section>

    </div>
  );
}

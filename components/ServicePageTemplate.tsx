'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  services: Array<{
    name: string;
    description: string;
    features: string[];
    priceRange: string;
  }>;
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  gallery: Array<{
    before: string;
    after: string;
    title: string;
    budget: string;
  }>;
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  heroImage,
  services,
  process,
  gallery
}: ServicePageProps) {
  return (
    <div className="bg-light/50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6">
                {title}
              </h1>
              <p className="text-lg sm:text-xl text-accent font-semibold mb-3 sm:mb-4">{subtitle}</p>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-6 sm:mb-8">{description}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-300 text-center"
                >
                  Get Free Estimate
                </Link>
                <Link
                  href="tel:9494320359"
                  className="border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 text-center"
                >
                  Call (949) 432-0359
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200">
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
              Our Services
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto px-4">
              We offer comprehensive solutions tailored to your specific needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-primary mb-4">{service.name}</h3>
                <p className="text-neutral-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-base text-neutral-600">
                        <svg className="w-4 h-4 text-accent mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-accent">{service.priceRange}</span>
                  <Link
                    href="/contact"
                    className="text-primary hover:text-accent font-medium transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-light/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Process
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From initial consultation to final walkthrough, we guide you through every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Recent Projects
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              See the transformations we've created for our satisfied clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer"
              >
                <div className="grid grid-cols-2">
                  <div className="relative aspect-square bg-gray-200">
                    <Image
                      src={project.before}
                      alt={`${project.title} - Before`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      BEFORE
                    </div>
                  </div>
                  <div className="relative aspect-square bg-gray-200">
                    <Image
                      src={project.after}
                      alt={`${project.title} - After`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      AFTER
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-2xl text-accent font-semibold">{project.budget}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us today for a free consultation and estimate.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white hover:bg-gray-50 text-primary font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
            >
              Schedule Your Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
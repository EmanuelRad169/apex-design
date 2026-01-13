'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    id: 1,
    title: 'Kitchen Cabinet Refresh',
    price: '$17,999',
    description: 'Modern layout, new cabinetry, and quartz finishes.',
    image: '/images/service-kitchen-remodel.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Walk-In Showers',
    price: '$9,999',
    description: 'Sleek, safe, and built to elevate your space.',
    image: '/images/service-walk-in-shower.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Full Bathroom Renovation',
    price: '$15,900',
    description: 'Transform your bath into a modern retreat.',
    image: '/images/service-bathroom-renovation.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Full Kitchen Remodel',
    price: '$25,900',
    description: 'Custom design, layout, cabinetry, and countertops.',
    image: '/images/service-kitchen-cabinets.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-neutral-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
               Get Started   <span className="text-accent">Today</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From quick refreshes to complete transformations, we've got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

                {/* Content */}
                <div className="p-8">

                {/* Text Content */}
                <div className="space-y-4">
                  <div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  </div>

                  {/* Eye-catching Price Section */}
                  <div className="relative">
                  <div className="bg-light/40 rounded-2xl p-6 border border-primary/20">
                    <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wide text-primary font-semibold">
                      Package Starting At
                      </span>
                      <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-4xl font-black text-primary">
                        {service.price}
                      </span>
                      <span className="text-sm text-gray-500">+</span>
                      </div>
                    </div>
                    <div className="bg-light p-3 rounded-full">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    </div>
                    
                    {/* Special Badge */}
                    <div className="absolute -top-2 -right-2">
                    <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      POPULAR
                    </div>
                    </div>
                  </div>
                  </div>
                </div>

                {/* Enhanced CTA */}
                <div className="mt-6 flex items-center justify-between">
                  <a 
                  href="contact"
                  className="text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center hover:text-primary/80"
                  >
                  <span>Get Quote</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  </a>
                  <div className="text-xs text-gray-500">
                  Free consultation included
                  </div>
                </div>
                </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Not sure which service fits your project?
          </p>
            <a href="/contact" className="bg-white hover:bg-neutral-50 text-neutral-900 font-semibold px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-primary transition-all duration-300 inline-flex items-center gap-2">
              <span>Schedule a Free Consultation</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
        </motion.div>
      </div>
    </section>
  );
}

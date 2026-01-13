'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSectionNew() {
  return (
    <section className="relative bg-gradient-to-b from-light/30 to-white py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Main Headline */}
            <div className="mb-6 sm:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-accent mb-3">
                  Premium Remodeling
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-[0.9] tracking-tight mb-4">
                  <span className="block">Great Prices</span>
                  <span className="block">Great Quality</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  We design with intention, build with precision, and deliver results that last — no shortcuts, no surprises.
                </p>
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col gap-4 items-center lg:items-start justify-center lg:justify-start mb-8"
                whileTap={{ scale: 0.98 }}
                className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 text-lg w-full sm:w-auto text-center"
              >
                Let's Start Your Project
              </motion.a>
            
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">Or Call</span>
                <a
                  href="tel:8888882774"
                  className="font-bold text-accent text-xl hover:text-accent/80 transition-colors duration-200"
                >
                  (888) 888-2774
                </a>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto lg:mx-0"
            >
              <div className="flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                <span className="text-accent text-xl">★</span>
                <span className="text-sm font-bold text-gray-900">Five Star Rating</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                <span className="text-accent text-xl">♦</span>
                <span className="text-sm font-bold text-gray-900">Licensed & Insured</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                <span className="text-accent text-xl">☀</span>
                <span className="text-sm font-bold text-gray-900">OC-Based Team</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]">
                  <Image
                    src="/images/hero.jpg"
                    alt="Modern kitchen remodel showcasing precision craftsmanship"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                </div>
              </div>
              
              {/* Floating Satisfaction Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-accent rounded-xl shadow-xl p-4 sm:p-6 max-w-[280px] z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white leading-tight">100% Satisfaction</p>
                    <p className="text-sm text-white/90 leading-tight">Before Final Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

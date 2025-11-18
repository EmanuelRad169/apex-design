'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSectionNew() {
  return (
    <section className="bg-light/50 py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.1] tracking-tight">
                Remodel with Precision.
                <span className="block text-accent mt-1">Built to Last.</span>
              </h1>
              <p className="text-lg sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We design with intention, build with precision, and deliver results that last — no shortcuts, no surprises.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 items-center lg:items-start">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-accent hover:brightness-105 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 text-center w-full sm:w-auto min-h-[56px] text-lg"
              >
                Let's Start Your Remodel
              </motion.button>
              <a
                href="tel:9494320359"
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 flex items-center justify-center gap-2 py-2"
              >
                <span>Or Call</span>
                <span className="font-bold text-accent text-lg">(949) 432-0359</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-gray-100">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">5-Star Rated</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-gray-100">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Licensed & Insured</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-gray-100">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">OC-Based Team</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[5/4] sm:aspect-[4/3] bg-neutral-50">
              <Image
                src="/images/hero.jpg"
                alt="Modern kitchen remodel showcasing precision craftsmanship"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay" />
            </div>
            
            {/* Floating Badge - Mobile Optimized */}
            <div className="absolute -bottom-3 left-4 sm:-bottom-6 sm:-left-6 bg-primary rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 max-w-[280px] sm:max-w-xs">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-xs sm:text-base text-white leading-tight">100% Satisfaction</p>
                  <p className="text-xs sm:text-sm text-white leading-tight">Before Final Payment</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

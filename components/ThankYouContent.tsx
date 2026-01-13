'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ThankYouContent() {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-light/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Success Icon */}
            <div className="mx-auto w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </div>

            {/* Main Message */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We've received your request and will contact you within <span className="font-semibold text-primary">24 hours</span> to schedule your free consultation.
              </p>
            </div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/80 rounded-2xl p-8 max-w-2xl mx-auto"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">What Happens Next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-accent">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Quick Call</p>
                    <p className="text-gray-600 text-sm">We'll call to confirm your project details and schedule a convenient time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-accent">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">In-Home Visit</p>
                    <p className="text-gray-600 text-sm">Our team visits to assess your space and discuss your vision.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-accent">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Custom Proposal</p>
                    <p className="text-gray-600 text-sm">Receive a detailed, transparent quote tailored to your specific project needs.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-primary/5 rounded-xl p-6 max-w-lg mx-auto"
            >
              <p className="text-gray-700 mb-3">
                <strong>Need immediate assistance?</strong>
              </p>
              <a 
                href="tel:8888882774" 
                className="inline-flex items-center gap-2 text-accent font-semibold text-lg hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (888) 888-2774
              </a>
              <p className="text-gray-600 text-sm mt-2">
                Monday - Friday, 9am - 5pm
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link
                href="/"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-300 text-center"
              >
                Back to Home
              </Link>
              <Link
                href="/about"
                className="bg-white hover:bg-gray-50 text-primary font-semibold px-8 py-3 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 text-center"
              >
                Learn More About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary mb-2">Licensed & Insured</h3>
              <p className="text-gray-600 text-sm">Full licensing and comprehensive insurance for your peace of mind.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary mb-2">Free Estimates</h3>
              <p className="text-gray-600 text-sm">No hidden fees or surprises. Transparent pricing from start to finish.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary mb-2">100% Satisfaction</h3>
              <p className="text-gray-600 text-sm">We don't collect final payment until you're completely satisfied.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
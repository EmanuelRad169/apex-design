'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-light/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              About <span className="text-accent">Apex Design</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              For over a decade, we've been transforming Orange County homes with precision craftsmanship, 
              innovative design, and unwavering commitment to quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Founded in 2010, Apex Design Build & Remodel began with a simple vision: 
                  to create beautiful, functional spaces that enhance the way people live. 
                  What started as a small team of passionate craftsmen has grown into Orange County's 
                  premier remodeling contractor.
                </p>
                <p>
                  We believe that your home should reflect your lifestyle, personality, and dreams. 
                  That's why we take a collaborative approach to every project, working closely with 
                  homeowners to understand their vision and bring it to life with exceptional craftsmanship.
                </p>
                <p>
                  Today, we're proud to have transformed hundreds of homes across Orange County, 
                  earning a reputation for quality, reliability, and innovation that our clients trust.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-200">
                <Image
                  src="/images/about.jpg"
                  alt="Professional construction team working together on a remodeling project"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every project we complete.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Quality First',
                description: 'We never compromise on materials, craftsmanship, or attention to detail. Every project reflects our commitment to excellence.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM9 9a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Client Partnership',
                description: 'Your vision drives our work. We collaborate closely with you throughout the entire process, ensuring your dreams become reality.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Innovation',
                description: 'We stay ahead of industry trends, incorporating the latest techniques and technologies to deliver cutting-edge results.'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, ease: "easeOut" } 
                }}
                className="text-center p-6 rounded-2xl bg-white hover:bg-light/30 hover:shadow-xl border border-transparent hover:border-accent/20 transition-all duration-300 cursor-pointer"
              >
                <motion.div 
                  className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: "var(--accent)", 
                    transition: { duration: 0.3 } 
                  }}
                >
                  <motion.div 
                    className="text-accent"
                    whileHover={{ 
                      color: "white",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {value.icon}
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
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
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss your vision and create something amazing together.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-white hover:bg-gray-50 text-primary font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
            >
              Start Your Project Today
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
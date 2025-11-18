'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Tustin Kitchen Remodel',
    budget: '$25K',
    beforeImage: '/images/before-kitchen-1.jpg',
    afterImage: '/images/after-kitchen-1.jpg',
    description: 'Complete kitchen transformation with custom cabinetry',
  },
  {
    id: 2,
    title: 'Irvine Bathroom Makeover',
    budget: '$18K',
    beforeImage: '/images/before-bath-1.jpg',
    afterImage: '/images/after-bath-1.jpg',
    description: 'Modern spa-like bathroom with walk-in shower',
  },
  {
    id: 3,
    title: 'Newport Beach Kitchen',
    budget: '$32K',
    beforeImage: '/images/before-kitchen-2.jpg',
    afterImage: '/images/after-kitchen-2.jpg',
    description: 'Luxury kitchen with quartz countertops and island',
  },
];

export default function BeforeAfterGallery() {
  const [activeProject, setActiveProject] = useState(0);
  const [showBefore, setShowBefore] = useState(false);

  const project = projects[activeProject];

  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
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
               See the <span className="text-accent">Transformation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Real projects, real results. Browse our before and after gallery to see what's possible.
          </p>
        </motion.div>

        {/* Main Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Project Info */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">{project.title}</h3>
            <div className="flex items-center justify-center gap-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                Budget: {project.budget}
              </span>
              <span className="text-gray-600">{project.description}</span>
            </div>
          </div>

          {/* Before/After Toggle */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/10] bg-neutral-50">
            {/* Toggle Button */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white rounded-full shadow-lg p-1 flex gap-1">
              <button
                onClick={() => setShowBefore(false)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  !showBefore
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                After
              </button>
              <button
                onClick={() => setShowBefore(true)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  showBefore
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Before
              </button>
            </div>

            {/* Images */}
            <div className="relative w-full h-full">
              {/* After Image */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  showBefore ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Image
                  src={project.afterImage}
                  alt={`${project.title} - After`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"%3E%3Crect fill="%23C0D236" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="white"%3EAfter%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
                  <p className="font-bold text-neutral-900">After</p>
                </div>
              </div>

              {/* Before Image */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  showBefore ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={project.beforeImage}
                  alt={`${project.title} - Before`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"%3E%3Crect fill="%23888" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="white"%3EBefore%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
                  <p className="font-bold text-neutral-900">Before</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Selector */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {projects.map((proj, index) => (
              <button
                key={proj.id}
                onClick={() => {
                  setActiveProject(index);
                  setShowBefore(false);
                }}
                className={`relative rounded-2xl overflow-hidden aspect-[4/3] transition-all duration-300 ${
                  index === activeProject
                    ? 'ring-4 ring-primary shadow-lg scale-105'
                    : 'opacity-60 hover:opacity-100 hover:scale-102'
                }`}
              >
                <Image
                  src={proj.afterImage}
                  alt={proj.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23C0D236" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="white"%3E${proj.title}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="text-white text-left">
                    <p className="font-bold text-sm">{proj.title}</p>
                    <p className="text-xs opacity-90">{proj.budget}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button className="bg-white hover:bg-neutral-50 text-neutral-900 font-semibold px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-primary transition-all duration-300 inline-flex items-center gap-2">
              <span>See More Projects</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

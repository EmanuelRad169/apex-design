'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="bg-neutral-50 py-10 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            See Our Work in <span className="text-accent">Action</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Watch how we transform Orange County homes with precision craftsmanship and attention to detail.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
        >
          <div className="relative aspect-video">
            {isMounted ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Apex Design remodeling project video"
              >
                <source src="/intro.mp4" type="video/mp4" />
              </video>
            ) : (
              <div className="h-full w-full bg-primary" aria-hidden="true" />
            )}

          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

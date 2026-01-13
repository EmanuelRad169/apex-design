'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="bg-neutral-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
          <div className="aspect-video">
            {!isPlaying ? (
              <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <video
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src="/intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play Button Overlay */}
                <motion.button
                  onClick={handlePlay}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center group transition-all duration-300"
                  aria-label="Play video"
                >
                  <svg 
                    className="w-8 h-8 text-primary ml-1 group-hover:text-accent transition-colors duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.button>

                {/* Video Title Overlay */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Apex Design Remodeling</h3>
                  <p className="text-white/80">Premium Quality, Great Prices</p>
                </div>
              </div>
            ) : (
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Ready to start your own transformation?
          </p>
          <motion.a
            href="/#get-estimate"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-accent hover:brightness-105 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300"
          >
            Get Your Free Estimate
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
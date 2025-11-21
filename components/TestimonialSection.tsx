'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'ST',
    location: 'Irvine, CA',
    project: 'Full Kitchen Remodel',
    rating: 5,
    quote: "Apex transformed our outdated kitchen into a stunning, modern space. The attention to detail was incredible, and they stayed on budget and on time. We couldn't be happier!",
    avatar: 'ST',
  },
  {
    id: 2,
    name: 'JM',
    location: 'Tustin, CA',
    project: 'Bathroom Renovation',
    rating: 5,
    quote: "Professional, courteous, and incredibly skilled. Our bathroom went from drab to fab in just three weeks. The team was always available to answer questions.",
    avatar: 'JM',
  },
  {
    id: 3,
    name: 'DC',
    location: 'Newport Beach, CA',
    project: 'Kitchen & Bath Combo',
    rating: 5,
    quote: "We've worked with several contractors before, but Apex is in a league of their own. No surprises, no hidden fees, just beautiful work done right.",
    avatar: 'DC',
  },
  {
    id: 4,
    name: 'RW',
    location: 'Costa Mesa, CA',
    project: 'Walk-In Shower',
    rating: 5,
    quote: "The walk-in shower they designed is not only beautiful but incredibly functional. They thought of details I never would have considered. Highly recommend!",
    avatar: 'RW',
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="bg-white py-8 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        ><h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              What Our <span className="text-accent">Clients Say</span>
            </h1>
          <p className="text-lg text-gray-600">
            Real stories from real Orange County homeowners.
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-3xl p-8 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Quote Icon */}
                <svg className="w-14 h-14 text-accent/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium">
                  "{activeTestimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {activeTestimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{activeTestimonial.name}</p>
                    <p className="text-sm text-gray-600">{activeTestimonial.location}</p>
                    <p className="text-sm text-primary font-medium">{activeTestimonial.project}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex gap-4 mt-8 justify-center">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2 justify-center mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-accent w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mini Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                "{testimonial.quote}"
              </p>
              <p className="font-semibold text-neutral-900 text-sm">{testimonial.name}</p>
              <p className="text-xs text-gray-500">{testimonial.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

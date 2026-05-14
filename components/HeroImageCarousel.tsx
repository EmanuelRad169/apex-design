'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    src: '/images/hero-1.jpg',
    alt: 'Modern kitchen remodel showcasing precision craftsmanship',
  },
  {
    src: '/images/hero-2.jpg',
    alt: 'High-end kitchen renovation with custom cabinetry',
  },
  {
    src: '/images/hero-3.jpg',
    alt: 'Kitchen transformation – after remodel',
  },
  {
    src: '/images/hero-4.jpg',
    alt: 'Luxury bathroom renovation in Orange County',
  },
  {
    src: '/images/hero-5.jpg',
    alt: 'Stunning bathroom remodel – finished result',
  },
  {
    src: '/images/hero-6.jpg',
    alt: 'Premium home remodeling in Orange County',
  },
  {
    src: '/images/hero-7.jpg',
    alt: 'Expert remodeling services – Apex Design Build Remodel',
  },
];

const INTERVAL_MS = 4500;

export default function HeroImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((SLIDES.length + index) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image card */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]">
          {SLIDES.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          ))}

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-20 pointer-events-none" />

          {/* Prev / Next arrows – desktop only */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md backdrop-blur-sm transition-all duration-200"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Carousel slides">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-accent'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  { name: 'Kitchen Remodeling', href: '/services/kitchen', description: 'Custom kitchen designs and renovations' },
  { name: 'Bathroom Remodeling', href: '/services/bathrooms', description: 'Modern bathroom transformations' },
  { name: 'Interior Design', href: '/services/interiors', description: 'Complete interior makeovers' },
  { name: 'Home Additions', href: '/services/additions', description: 'Expand your living space' },
  { name: 'Exterior Renovations', href: '/services/exteriors', description: 'Curb appeal improvements' },
  { name: 'Sunrooms', href: '/services/sunrooms', description: 'Year-round outdoor living' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-32 h-10 sm:w-40 sm:h-12 lg:w-48 lg:h-14">
              <Image
                src="/logo.svg"
                alt="Apex Design Build & Remodel"
                width={192}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-neutral-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-neutral-700 hover:text-primary font-medium transition-colors duration-200"
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                className="text-neutral-700 hover:text-primary font-medium transition-colors duration-200 flex items-center gap-1"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-4">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="block p-3 rounded-xl hover:bg-neutral-50 transition-colors duration-150 group"
                        >
                          <div className="font-medium text-neutral-700 group-hover:text-primary transition-colors">
                            {service.name}
                          </div>
                          <div className="text-sm text-neutral-500 mt-1">
                            {service.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className="text-neutral-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Contact Us
            </Link>

            {/* CTA Button */}
            <a
              href="/#get-estimate"
              className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('get-estimate');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // If not on homepage, navigate to homepage with hash
                  window.location.href = '/#get-estimate';
                }
              }}
            >
              Get Free Estimate
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-neutral-700 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-neutral-700 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-neutral-700 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-neutral-200">
                <Link
                  href="/"
                  className="block px-4 py-2 text-neutral-700 hover:text-primary hover:bg-light-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className="block px-4 py-2 text-neutral-700 hover:text-primary hover:bg-light-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>

                {/* Mobile Services */}
                <div className="px-4">
                  <div className="font-medium text-neutral-700 mb-2">Services</div>
                  <div className="ml-4 space-y-2">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block py-2 text-sm text-neutral-600 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block px-4 py-2 text-neutral-700 hover:text-primary hover:bg-light-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>

                <a
                  href="/#get-estimate"
                  className="block mx-4 bg-accent text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById('get-estimate');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      // If not on homepage, navigate to homepage with hash
                      window.location.href = '/#get-estimate';
                    }
                  }}
                >
                  Get Free Estimate
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
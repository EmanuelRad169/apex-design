'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="w-32 h-10 sm:w-40 sm:h-12 lg:w-48 lg:h-14 mb-4">
              <Image
                src="/logo.svg"
                alt="Apex Design Build & Remodel"
                width={192}
                height={56}
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-neutral-200 mb-4 max-w-md text-sm sm:text-base">
              Orange County's premier remodeling contractor. We design with intention, 
              build with precision, and deliver results that last.
            </p>
            <div className="space-y-2">
              <p className="text-neutral-200">
                <span className="font-medium text-white">Phone:</span>{' '}
                <Link href="tel:8888882774" className="hover:text-accent transition-colors">
                  (888) 888-2774
                </Link>
              </p>
              <p className="text-neutral-200">
                <span className="font-medium text-white">License:</span> #1128138
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/kitchen" className="text-neutral-200 hover:text-accent transition-colors">
                  Kitchen Remodeling
                </Link>
              </li>
              <li>
                <Link href="/services/bathrooms" className="text-neutral-200 hover:text-accent transition-colors">
                  Bathroom Remodeling
                </Link>
              </li>
              <li>
                <Link href="/services/interiors" className="text-neutral-200 hover:text-accent transition-colors">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link href="/services/additions" className="text-neutral-200 hover:text-accent transition-colors">
                  Home Additions
                </Link>
              </li>
              <li>
                <Link href="/services/exteriors" className="text-neutral-200 hover:text-accent transition-colors">
                  Exterior Renovations
                </Link>
              </li>
              <li>
                <Link href="/services/sunrooms" className="text-neutral-200 hover:text-accent transition-colors">
                  Sunrooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-neutral-200 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-200 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-200 hover:text-accent transition-colors">
                  Get Free Estimate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-200 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Apex Design Build & Remodel. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-neutral-200 text-xs sm:text-sm">Licensed & Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
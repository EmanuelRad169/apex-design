'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  projectType: 'kitchen' | 'bathroom' | 'both' | '';
  budget: 'under-10k' | '10k-15k' | '15k-25k' | '25k-plus' | '';
}

interface FormErrors {
  [key: string]: string;
}

export default function LeadFormSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    projectType: '',
    budget: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Orange County ZIP code ranges
  const OC_ZIP_RANGES = [
    { min: 92601, max: 92649 },
    { min: 92703, max: 92714 },
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        return value.trim().length >= 2 ? '' : 'Please enter your first name';
      case 'lastName':
        return value.trim().length >= 2 ? '' : 'Please enter your last name';
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email';
      }
      case 'phone': {
        const digits = value.replace(/\D/g, '');
        return digits.length === 10 ? '' : 'Please enter a valid 10-digit phone number';
      }
      case 'zipCode': {
        if (!value || !/^\d{5}$/.test(value)) {
          return 'ZIP code must be 5 digits';
        }
        const zip = parseInt(value);
        const isValid = OC_ZIP_RANGES.some((range) => zip >= range.min && zip <= range.max);
        return isValid ? '' : 'Sorry, we only service Orange County at this time';
      }
      case 'projectType':
        return value ? '' : 'Please select a project type';
      case 'budget':
        return value ? '' : 'Please select a budget range';
      default:
        return '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: FormErrors) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev: FormErrors) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            zipCode: '',
            projectType: '',
            budget: '',
          });
          setIsSuccess(false);
          setIsSubmitting(false);
        }, 5000);
      } else {
        alert('There was an error. Please call us at (949) 432-0359');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error. Please call us at (949) 432-0359');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="get-estimate" className="bg-neutral-50 py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Let's Design Your <span className="text-accent">Dream Space</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Get a free, no-pressure in-home consultation. Let us know what you're planning — we'll guide you every step of the way.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12"
        >
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">Thank You!</h3>
              <p className="text-gray-600 mb-2">
                We've received your request and will be in touch within 24 hours.
              </p>
              <p className="text-sm text-gray-500">
                Check your email for confirmation details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-neutral-900 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.firstName
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.lastName
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="Smith"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.email
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.phone
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="(949) 555-0000"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* ZIP Code */}
              <div>
                <label htmlFor="zipCode" className="block text-sm font-semibold text-neutral-900 mb-2">
                  ZIP Code <span className="text-red-500">*</span>
                  <span className="text-gray-500 font-normal text-xs ml-2">(Orange County only)</span>
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={5}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    errors.zipCode
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                  placeholder="92614"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>

              {/* Project Type & Budget Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Project Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.projectType
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                  >
                      <option value="">Select a service</option>
                      <option value="kitchen">Kitchen Remodeling</option>
                      <option value="bathroom">Bathroom Remodeling</option>
                      <option value="interior">Interior Design</option>
                      <option value="addition">Home Addition</option>
                      <option value="exterior">Exterior Renovation</option>
                      <option value="sunroom">Sunroom</option>
                      <option value="multiple">Multiple Services</option> 
                  </select>
                  {errors.projectType && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Budget <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.budget
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                  >
                    <option value="">-- Select --</option>
                    <option value="under-10k">Under $10K</option>
                    <option value="10k-15k">$10K – $15K</option>
                    <option value="15k-25k">$15K – $25K</option>
                    <option value="25k-plus">$25K+</option>
                  </select>
                  {errors.budget && (
                    <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-accent hover:brightness-105 hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Request My Estimate'}
                </motion.button>
              </div>

              {/* Microcopy */}
              <p className="text-center text-sm text-gray-500 pt-2">
                🔒 No spam. OC homeowners only. We respect your privacy.
              </p>
            </form>
          )}
        </motion.div>

        {/* Bottom Helper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600">
            Prefer to talk? Call us at{' '}
            <a href="tel:9494320359" className="text-primary hover:underline font-semibold">
              (949) 432-0359
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-2">Mon-Sat, 9am-6pm</p>
        </motion.div>
      </div>
    </section>
  );
}

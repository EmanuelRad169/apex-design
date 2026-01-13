'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { trackLeadSubmission } from '@/lib/analytics';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    serviceType: '',
    budget: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Track successful lead submission
        trackLeadSubmission({
          service: formData.serviceType,
          budget: formData.budget,
          zipCode: formData.zipCode
        });
        
        // Redirect to thank you page
        window.location.href = '/thank-you';
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again or call us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-light/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Let's Design Your <span className="text-accent">Dream Space</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Get a free, no-pressure in-home consultation. Let us know what you're planning — we'll guide you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="get-estimate" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200"
                    placeholder="92618"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select a service</option>
                    <option value="kitchen">Kitchen Remodeling</option>
                    <option value="bathroom">Bathroom Remodeling</option>
                    <option value="both">Kitchen & Bathroom</option>
                    <option value="addition">Home Addition</option>
                    <option value="interior">Interior Design</option>
                    <option value="exterior">Exterior Renovation</option>
                    <option value="sunroom">Sunroom/Outdoor Living</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.serviceType && (
                    <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10K</option>
                    <option value="10k-25k">$10K – $25K</option>
                    <option value="25k-50k">$25K – $50K</option>
                    <option value="50k-75k">$50K – $75K</option>
                    <option value="75k-plus">$75K+</option>
                  </select>
                  {errors.budget && (
                    <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tell Us About Your Project (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Describe your vision, timeline, or any specific requirements..."
                />
              </div>

              <div className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 text-lg"
                >
                  Get My Free In-Home Consultation
                </motion.button>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Or call us directly at{' '}
                  <a href="tel:8888882774" className="font-bold text-accent hover:underline">
                    (888) 888-2774
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Licensed & Insured • Free Estimates • 100% Satisfaction Guaranteed
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
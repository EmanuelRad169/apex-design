'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const orangeCountyZips = [
  '92602', '92603', '92604', '92606', '92610', '92612', '92614', '92617', '92618', '92619',
  '92620', '92624', '92625', '92626', '92627', '92629', '92630', '92637', '92646', '92647',
  '92648', '92649', '92650', '92651', '92652', '92653', '92654', '92656', '92657', '92658',
  '92659', '92660', '92661', '92662', '92663', '92672', '92673', '92674', '92675', '92676',
  '92677', '92678', '92679', '92688', '92690', '92691', '92692', '92693', '92694', '92697',
  '92698', '92701', '92703', '92704', '92705', '92706', '92707', '92708', '92711', '92712',
  '92728', '92780', '92781', '92782', '92799', '92801', '92802', '92803', '92804', '92805',
  '92806', '92807', '92808', '92821', '92823', '92831', '92832', '92833', '92834', '92835',
  '92836', '92837', '92838', '92840', '92841', '92842', '92843', '92844', '92845', '92846',
  '92850', '92856', '92857', '92859', '92860', '92861', '92862', '92863', '92864', '92865',
  '92866', '92867', '92868', '92869', '92870', '92871', '92885', '92886', '92887', '92899'
];

export default function ContactPage() {
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!orangeCountyZips.includes(formData.zipCode)) {
      newErrors.zipCode = 'We currently serve Orange County ZIP codes only';
    }

    if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
    if (!formData.budget) newErrors.budget = 'Please select a budget range';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-light/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Let's Start Your <span className="text-accent">Dream Project</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-5xl mx-auto leading-relaxed">
              Ready to transform your space? Get in touch for a free consultation and estimate.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Get Your Free Estimate</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Thank You!</h3>
                <p className="text-neutral-600 mb-4">
                  We've received your request and will contact you within 24 hours to schedule your free consultation.
                </p>
                <p className="text-sm text-neutral-500">
                  For immediate assistance, call us at{' '}
                  <a href="tel:9494320359" className="text-accent font-medium hover:underline">
                    (949) 432-0359
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                        errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-primary focus:ring-primary/20'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                        errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-primary focus:ring-primary/20'
                      }`}
                      placeholder="(949) 123-4567"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                        errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-primary focus:ring-primary/20'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-primary mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                        errors.zipCode ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-primary focus:ring-primary/20'
                      }`}
                      placeholder="92614"
                      maxLength={5}
                    />
                    {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-primary mb-2">
                      Service Type *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                        errors.serviceType ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-primary focus:ring-primary/20'
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
                    {errors.serviceType && <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>}
                  </div>

                  <div>
                                        <label htmlFor="budget" className="block text-sm font-medium text-primary mb-2">
                      Project Budget *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                        errors.budget ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-primary focus:ring-primary/20'
                      }`}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-25k">Under $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-plus">$100,000+</option>
                    </select>
                    {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary/20 transition-colors"
                    placeholder="Tell us about your project vision, timeline, and any specific requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300"
                >
                  Get My Free Estimate
                </motion.button>

                <p className="text-xs text-neutral-500 text-center">
                  By submitting this form, you agree to be contacted by Apex Design regarding your project.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="p-8">
              <h3 className="text-xl font-bold text-primary mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Phone</p>
                    <a href="tel:8888882774" className="text-accent hover:underline">
                      (888) 888-2774
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Address</p>
                    <p className="text-neutral-600">2372 Morse Ave, Irvine, CA 92614</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Business Hours</p>
                    <p className="text-neutral-600">Mon-Fri: 9am-5pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Why Choose Apex Design?</h3>
              <ul className="space-y-3">
                {[
                  'Licensed & Insured Contractor',
                  '10+ Years of Experience',
                  '100+ Satisfied Customers',
                  'Free In-Home Consultations',
                  'Transparent Pricing',
                  '100% Satisfaction Guarantee'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-accent-yellow flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
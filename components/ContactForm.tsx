'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { trackLeadSubmissionAndWait } from '@/lib/analytics';

const OC_ZIPS = new Set([
  '92801','92802','92804','92805','92806','92807','92808',
  '92656',
  '92821','92823',
  '90620','90621','90622','90624',
  '92626','92627','92628',
  '90630',
  '92624','92629',
  '92708',
  '92831','92832','92833','92834','92835','92836','92837','92838',
  '92840','92841','92842','92843','92844','92845','92846',
  '92605','92615','92646','92647','92648','92649',
  '92602','92603','92604','92606','92610','92612','92614','92616','92617','92618','92619','92620','92623','92650','92697',
  '90631','90632','90633',
  '90623',
  '92651','92652',
  '92653','92654',
  '92607','92677',
  '92637',
  '92609','92610','92630',
  '90720',
  '92690','92691','92692',
  '92657','92658','92659','92660','92661','92662','92663',
  '92856','92857','92859','92862','92863','92864','92865','92866','92867','92868','92869',
  '92870','92871',
  '92679','92688',
  '92672','92673','92674',
  '92675','92693',
  '92701','92702','92703','92704','92705','92706','92707','92708','92711','92712','92725','92728','92735','92799',
  '90740',
  '90680',
  '92780','92781','92782',
  '92861',
  '92683','92684','92685',
  '92885','92886','92887',
]);

const FAKE_PHONE_PATTERNS = /^(\d)\1{9}$|^1234567890$|^0987654321$/;

function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 11 && digits[0] === '1') digits = digits.slice(1);
  return digits;
}

function isValidPhone(raw: string): boolean {
  const digits = normalizePhone(raw);
  if (digits.length !== 10) return false;
  if (digits[0] === '0' || digits[0] === '1') return false;
  if (FAKE_PHONE_PATTERNS.test(digits)) return false;
  return true;
}

function formatPhone(raw: string): string {
  const digits = normalizePhone(raw);
  if (digits.length !== 10) return raw;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  zipCode: '',
  serviceType: '',
  budget: '',
  message: '',
  consent: false,
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [outOfArea, setOutOfArea] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number so our team can reach you.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = 'Please enter a valid 5-digit ZIP code';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm your consent to be contacted.';
    }

    return newErrors;
  };

  const encodeForm = (form: HTMLFormElement) => {
    const body = new URLSearchParams();
    new FormData(form).forEach((v, k) => body.append(k, String(v)));
    return body.toString();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm();

    // OC ZIP check (only when format is valid)
    if (
      !validationErrors.zipCode &&
      /^\d{5}$/.test(formData.zipCode.trim()) &&
      !OC_ZIPS.has(formData.zipCode.trim())
    ) {
      setOutOfArea(true);
      setErrors(validationErrors);
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm(e.currentTarget),
      });

      if (!response.ok) throw new Error('Form submission failed');

      await trackLeadSubmissionAndWait({
        conversionAction: 'contact',
        service: formData.serviceType,
        budget: formData.budget,
        zipCode: formData.zipCode,
      });

      setFormData(initialFormData);
      window.location.href = '/thank-you/';
    } catch {
      toast.error('Something went wrong. Please call us at (949) 878-3250.');
      setErrors({ submit: 'Something went wrong. Please call us at (949) 878-3250.' });
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === 'zipCode') setOutOfArea(false);
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'phone' && isValidPhone(value)) {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }));
    }

    if (name === 'zipCode' && /^\d{5}$/.test(value.trim())) {
      if (!OC_ZIPS.has(value.trim())) {
        setOutOfArea(true);
        setErrors((prev) => ({ ...prev, zipCode: '' }));
        return;
      }
      setOutOfArea(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors duration-200 ${
      errors[field] || (field === 'zipCode' && outOfArea)
        ? 'border-red-500 bg-red-50 focus:ring-red-300'
        : 'border-gray-300 focus:ring-accent'
    }`;

  return (
    <div className="bg-white min-h-screen pt-20">
      <Toaster />
      {/* Hero Section */}
      <section className="bg-light/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Let's Design Your <span className="text-accent">Dream Space</span>
            </h2>
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
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/thank-you/?form=contact"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="subject" value="New Apex Contact Form Submission" />
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-bot-field">Website</label>
                <input
                  type="text"
                  id="contact-bot-field"
                  name="bot-field"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                    className={inputClass('name')}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="tel"
                    inputMode="numeric"
                    className={inputClass('phone')}
                    placeholder="(949) 555-0000"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email + ZIP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    className={inputClass('email')}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={5}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className={inputClass('zipCode')}
                    placeholder="92618"
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                </div>
              </div>

              {/* Out-of-area banner */}
              {outOfArea && (
                <div
                  className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-900"
                  role="alert"
                >
                  <p className="font-semibold mb-1">Outside our current service area</p>
                  <p>
                    It looks like this ZIP code may be outside our current Orange County service area. Please call us at{' '}
                    <a href="tel:9494320359" className="font-bold underline hover:text-amber-700">
                      (949) 432-0359
                    </a>{' '}
                    and we'll confirm availability.
                  </p>
                </div>
              )}

              {/* Service + Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass('serviceType')}
                  >
                    <option value="">Select a service</option>
                    <option value="kitchen">Kitchen Remodeling</option>
                    <option value="bathroom">Bathroom Remodeling</option>
                    <option value="both">Kitchen &amp; Bathroom</option>
                    <option value="addition">Home Addition</option>
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
                    Budget Range <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass('budget')}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10K</option>
                    <option value="10k-25k">$10K – $25K</option>
                    <option value="25k-50k">$25K – $50K</option>
                    <option value="50k-75k">$50K – $75K</option>
                    <option value="75k-plus">$75K+</option>
                  </select>
                  {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                </div>
              </div>

              {/* Message */}
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

              {/* Consent Checkbox */}
              <div>
                <label
                  className={`flex items-start gap-3 cursor-pointer ${errors.consent ? 'text-red-600' : 'text-gray-700'}`}
                >
                  <input
                    type="checkbox"
                    name="consent"
                    id="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-gray-300 accent-accent"
                  />
                  <span className="text-sm leading-relaxed">
                    I agree to be contacted by Apex Design • Build • Remodel by phone or text about my estimate request.{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-red-500 text-sm mt-1 ml-8">{errors.consent}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || outOfArea}
                  aria-busy={isSubmitting}
                  whileHover={{ scale: isSubmitting || outOfArea ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || outOfArea ? 1 : 0.98 }}
                  className="w-full bg-accent hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 text-lg"
                >
                  {isSubmitting ? 'Submitting…' : 'Get My Free In-Home Consultation'}
                </motion.button>
              </div>

              {errors.submit && (
                <p className="text-center text-sm font-semibold text-red-600" role="alert">
                  {errors.submit}
                </p>
              )}

              <p className="text-center text-xs leading-5 text-gray-500">
                By submitting this form, you agree to our{' '}
                <Link href="/privacy-policy" className="font-semibold text-accent hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/terms-of-service" className="font-semibold text-accent hover:underline">
                  Terms of Service
                </Link>
                .
              </p>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Or call us directly at{' '}
                  <a href="tel:9498783250" className="font-bold text-accent hover:underline">
                    (949) 878-3250
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Licensed &amp; Insured • Free Estimates • 100% Satisfaction Guaranteed
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

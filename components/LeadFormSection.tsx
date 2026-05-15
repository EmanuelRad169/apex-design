'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  projectType: string;
  consent: boolean;
  honeypot: string;
}

interface FormErrors {
  [key: string]: string;
}

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  zipCode: '',
  projectType: '',
  consent: false,
  honeypot: '',
};

export default function LeadFormSection() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [outOfArea, setOutOfArea] = useState(false);

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'firstName':
        return (value as string).trim().length >= 2 ? '' : 'Please enter your first name';
      case 'lastName':
        return (value as string).trim().length >= 2 ? '' : 'Please enter your last name';
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value as string) ? '' : 'Please enter a valid email';
      }
      case 'phone':
        return isValidPhone(value as string)
          ? ''
          : 'Please enter a valid phone number so our team can reach you.';
      case 'zipCode':
        return /^\d{5}$/.test((value as string).trim()) ? '' : 'ZIP code must be 5 digits';
      case 'projectType':
        return value ? '' : 'Please select a project type';
      case 'consent':
        return value ? '' : 'Please confirm your consent to be contacted.';
      default:
        return '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === 'zipCode') setOutOfArea(false);
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    if (name === 'phone' && isValidPhone(value)) {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }));
    }

    if (name === 'zipCode' && /^\d{5}$/.test(value)) {
      if (!OC_ZIPS.has(value)) {
        setOutOfArea(true);
        setErrors((prev) => ({ ...prev, zipCode: '' }));
        return;
      }
      setOutOfArea(false);
    }

    const error = validateField(name, fieldValue);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const encodeForm = (form: HTMLFormElement) => {
    const body = new URLSearchParams();
    new FormData(form).forEach((v, k) => body.append(k, String(v)));
    return body.toString();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (formData.honeypot) return;

    const newErrors: FormErrors = {};

    (Object.keys(EMPTY_FORM) as Array<keyof FormData>).forEach((key) => {
      if (key === 'honeypot') return;
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    // OC ZIP check (only when format is valid)
    if (!newErrors.zipCode && /^\d{5}$/.test(formData.zipCode) && !OC_ZIPS.has(formData.zipCode)) {
      setOutOfArea(true);
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm(e.currentTarget),
      });

      if (!response.ok) throw new Error('Form submission failed');

      await trackLeadSubmissionAndWait({
        conversionAction: 'estimate',
        projectType: formData.projectType,
        zipCode: formData.zipCode,
      });

      window.location.href = '/thank-you/';
    } catch {
      toast.error('Something went wrong. Please call us at (949) 878-3250.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">
              Let's Design Your <span className="text-accent">Dream Space</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4">
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
            <form
              name="lead"
              method="POST"
              data-netlify="true"
              netlify-honeypot="honeypot"
              action="/thank-you/?form=estimate"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="lead" />
              <input type="hidden" name="subject" value="New Apex Lead Form Submission" />

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
                    autoComplete="given-name"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.firstName
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
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
                    autoComplete="family-name"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.lastName
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="Smith"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
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
                    autoComplete="email"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.email
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                    autoComplete="tel"
                    inputMode="numeric"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.phone
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="(949) 555-0000"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* ZIP + Project Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-semibold text-neutral-900 mb-2">
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
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      errors.zipCode || outOfArea
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="92614"
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                </div>

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
                    <option value="addition">Home Addition</option>
                    <option value="exterior">Exterior Renovation</option>
                    <option value="sunroom">Sunroom</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                  {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
                </div>
              </div>

              {/* Out-of-area banner */}
              {outOfArea && (
                <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-900" role="alert">
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

              {/* Consent Checkbox */}
              <div>
                <label className={`flex items-start gap-3 cursor-pointer ${errors.consent ? 'text-red-600' : 'text-gray-700'}`}>
                  <input
                    type="checkbox"
                    name="consent"
                    id="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-gray-300 accent-accent"
                  />
                  <span className="text-sm leading-relaxed">
                    I agree to be contacted by Apex Design • Build • Remodel by phone or text about my estimate request.{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && <p className="text-red-500 text-sm mt-1 ml-8">{errors.consent}</p>}
              </div>

              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="honeypot">Website</label>
                <input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || outOfArea}
                  aria-busy={isSubmitting}
                  whileHover={{ scale: isSubmitting || outOfArea ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || outOfArea ? 1 : 0.98 }}
                  className="w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 bg-accent hover:brightness-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting…' : 'Request My Free Estimate'}
                </motion.button>
              </div>

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

              <p className="text-center text-sm text-gray-500">
                🔒 No spam. OC homeowners only. We respect your privacy.
              </p>
            </form>
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
              <a href="tel:9498783250" className="text-primary hover:underline font-semibold">
                (949) 878-3250
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-2">Mon–Fri, 9am–5pm</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

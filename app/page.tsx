'use client';

import React from 'react';
import HeroSectionNew from '@/components/HeroSectionNew';
import ServicesGrid from '@/components/ServicesGrid';
import TestimonialSection from '@/components/TestimonialSection';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import LeadFormSection from '@/components/LeadFormSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSectionNew />
      <ServicesGrid />
      <BeforeAfterGallery />
      <LeadFormSection />
      <TestimonialSection />
    </main>
  );
}

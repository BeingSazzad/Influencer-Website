import React from 'react';
import { HeroSection } from '@/components/web-pages/HeroSection';
import { FeaturedPropertiesSection } from '@/components/web-pages/FeaturedPropertiesSection';
import { CategoriesSection } from '@/components/web-pages/CategoriesSection';
import { TopAgentsSection } from '@/components/web-pages/TopAgentsSection';
import { MarketInsightsSection } from '@/components/web-pages/MarketInsightsSection';
import { TestimonialsSection } from '@/components/web-pages/TestimonialsSection';
import { CtaBanner } from '@/components/web-pages/CtaBanner';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedPropertiesSection />
      <CategoriesSection />
      <TopAgentsSection />
      <MarketInsightsSection />
      <TestimonialsSection />
      <CtaBanner />
    </div>
  );
}

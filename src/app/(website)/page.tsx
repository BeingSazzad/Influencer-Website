import React from 'react';
import { SplitHero } from '@/components/web-pages/SplitHero';
import { FeaturedCreators } from '@/components/web-pages/FeaturedCreators';
import { ValuePropsSection } from '@/components/web-pages/ValuePropsSection';
import { CollaborationModelsSection } from '@/components/web-pages/CollaborationModelsSection';
import { HowItWorksSection } from '@/components/web-pages/HowItWorksSection';
import { PricingSection } from '@/components/web-pages/PricingSection';
import { CreatorInviteSection } from '@/components/web-pages/CreatorInviteSection';
import { FaqSection } from '@/components/web-pages/FaqSection';

export const metadata = {
  title: 'Influverse — The Creator Marketplace for Brands & Influencers',
  description:
    'Discover, collaborate, and hire vetted creators across Instagram, TikTok, and YouTube with 100% escrow protection and transparent 15% platform fees in EUR.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SplitHero />
      <FeaturedCreators />
      <ValuePropsSection />
      <CollaborationModelsSection />
      <HowItWorksSection />
      <PricingSection />
      <CreatorInviteSection />
      <FaqSection />
    </div>
  );
}

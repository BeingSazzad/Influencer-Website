import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';
import { AntdConfig } from '@/components/AntdConfig';
import { OfferModal } from '@/components/shared/OfferModal';

export const metadata: Metadata = {
  title: 'Influverse — The Creator Marketplace for Brands & Influencers',
  description:
    'Discover, collaborate, and hire vetted creators across Instagram, TikTok, and YouTube with 100% escrow protection and transparent 15% platform fees in EUR.',
  keywords: [
    'Influencer Marketplace',
    'Content Creators',
    'UGC Ads',
    'Instagram Influencers',
    'TikTok Creators',
    'YouTube Sponsorships',
    'Creator Escrow',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#FAFAF8] text-[#151515] antialiased selection:bg-[#151515] selection:text-white font-sans">
        <ReduxProvider>
          <AntdConfig>
            {children}
            <OfferModal />
          </AntdConfig>
        </ReduxProvider>
      </body>
    </html>
  );
}

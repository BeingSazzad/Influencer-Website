import type { Metadata } from 'next';
import { Red_Hat_Display, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReduxProvider } from '@/redux/provider';
import { AntdConfig } from '@/components/AntdConfig';
import { OfferModal } from '@/components/shared/OfferModal';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
});

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
    <html lang="en" className={`scroll-smooth ${redHatDisplay.variable} ${playfairDisplay.variable}`}>
      <head />
      <body className={`${redHatDisplay.className} min-h-screen bg-[#FAFAF8] text-[#0A0A0A] antialiased selection:bg-[#0A0A0A] selection:text-white font-sans`}>
        <AntdRegistry>
          <ReduxProvider>
            <AntdConfig>
              {children}
              <OfferModal />
            </AntdConfig>
          </ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

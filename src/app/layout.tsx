import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';
import { AntdConfig } from '@/components/AntdConfig';
import { InquiryModal } from '@/components/shared/InquiryModal';

export const metadata: Metadata = {
  title: 'LUXE PRIME — Premier Luxury Real Estate & Influencer Advisory',
  description: 'Discover architectural trophy homes, waterfront estates, and luxury penthouses represented by the world\'s top real estate influencers and producers.',
  keywords: ['Luxury Real Estate', 'Influencer Real Estate', 'Mansions', 'Penthouses', 'Bel Air Estates', 'Dubai Waterfront', 'Miami Trophy Homes'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <ReduxProvider>
          <AntdConfig>
            {children}
            <InquiryModal />
          </AntdConfig>
        </ReduxProvider>
      </body>
    </html>
  );
}

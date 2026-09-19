import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <main className="flex-1 py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

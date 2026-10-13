import React from 'react';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#FAFAF8]">{children}</div>;
}

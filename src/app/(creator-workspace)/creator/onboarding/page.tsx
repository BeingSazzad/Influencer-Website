'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatorOnboardingRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/register?role=creator');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] text-[#66665E] text-sm">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-[#FF2D78] border-t-transparent rounded-full animate-spin" />
        <span>Redirecting to Creator Onboarding Portal...</span>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLanguage } from '@/redux/slices/langSlice';
import { Language } from '@/types';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector((state) => state.lang.currentLang);

  return (
    <div className="inline-flex items-center gap-1 bg-[#F4F4F0] border border-[#E7E7E2] rounded-full p-0.5 text-xs font-semibold text-[#151515]">
      <button
        onClick={() => dispatch(setLanguage('en'))}
        className={`px-2.5 py-1 rounded-full transition-all ${
          currentLang === 'en'
            ? 'bg-[#151515] text-white shadow-xs'
            : 'text-[#73736A] hover:text-[#151515]'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => dispatch(setLanguage('de'))}
        className={`px-2.5 py-1 rounded-full transition-all ${
          currentLang === 'de'
            ? 'bg-[#151515] text-white shadow-xs'
            : 'text-[#73736A] hover:text-[#151515]'
        }`}
      >
        DE
      </button>
    </div>
  );
}

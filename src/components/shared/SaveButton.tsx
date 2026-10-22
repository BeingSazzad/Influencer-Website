'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';

interface SaveButtonProps {
  saved: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  overlay?: boolean;
}

export function SaveButton({ saved, onClick, overlay = false }: SaveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? 'Saved' : 'Save'}
      title={saved ? 'Saved' : 'Save'}
      className={`flex h-9 w-9 items-center justify-center rounded-full shadow-xs transition-all cursor-pointer ${
        saved
          ? 'bg-[#0A0A0A] text-white'
          : overlay
            ? 'bg-white/85 text-[#52524B] backdrop-blur-md hover:bg-white hover:text-[#0A0A0A]'
            : 'border border-[#E7E7E2] bg-white text-[#52524B] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
      }`}
    >
      <Bookmark className={`h-4 w-4 ${saved ? 'fill-white' : ''}`} />
    </button>
  );
}

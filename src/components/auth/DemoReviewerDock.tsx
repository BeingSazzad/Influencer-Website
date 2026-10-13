'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { loginAsBrandDemo, loginAsCreatorDemo } from '@/redux/slices/authSlice';
import { Video, Briefcase, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { message } from 'antd';

export function DemoReviewerDock() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleCreatorDemo = () => {
    dispatch(loginAsCreatorDemo());
    message.success('Entering sandbox as Sophie Kim (Verified Creator)');
    router.push('/creator/dashboard');
  };

  const handleBrandDemo = () => {
    dispatch(loginAsBrandDemo());
    message.success('Entering sandbox as Elena Rostova (Brand Lead)');
    router.push('/brand/dashboard');
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 font-sans">
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="px-3.5 py-2 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-xs font-black shadow-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>🧪 Reviewer Demo Dock</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg font-sans animate-fade-in">
      <div className="bg-[#0A0A0A]/95 backdrop-blur-md text-white p-3 sm:p-3.5 rounded-2xl border border-white/20 shadow-2xl space-y-2.5">
        {/* Header with Prototype Badge and Minimize button */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30 shrink-0">
              Prototype Sandbox Mode
            </span>
            <span className="text-[11px] text-white/50 font-semibold truncate hidden sm:inline">
              Temporary 1-Click Evaluation
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="text-white/60 hover:text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shrink-0 px-1.5 py-0.5 rounded-md hover:bg-white/10"
            title="Minimize dock"
          >
            <span>Hide</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Short English Notice */}
        <div className="flex items-center gap-1.5 text-white/70 text-[11px]">
          <Info className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <p className="truncate">
            <span className="text-white font-bold">Reviewer Demo:</span> 1-click test access for client review only.
          </p>
        </div>

        {/* 1-Click Bypass Actions */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCreatorDemo();
            }}
            className="py-2 px-3 rounded-xl bg-white/10 hover:bg-[#FF2D78] text-white text-xs font-bold transition-all border border-white/10 hover:border-transparent flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
          >
            <Video className="w-3.5 h-3.5 text-[#FF2D78] group-hover:text-white transition-colors" />
            <span className="truncate">Creator Demo (Sophie)</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleBrandDemo();
            }}
            className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white text-xs font-bold transition-all border border-white/10 hover:border-transparent flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
          >
            <Briefcase className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors" />
            <span className="truncate">Brand Demo (Elena)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

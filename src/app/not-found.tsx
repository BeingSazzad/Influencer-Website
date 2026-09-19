import React from 'react';
import Link from 'next/link';
import { Building2, Home, ArrowLeft } from 'lucide-react';
import { Button } from 'antd';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-xl">
        <Building2 className="w-8 h-8" />
      </div>
      <h1 className="text-5xl font-extrabold font-serif mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-200 mb-4">Trophy Estate Not Found</h2>
      <p className="text-xs text-slate-400 max-w-md mb-8">
        The architectural property or directory page you are looking for has been moved or is held in confidential private escrow.
      </p>
      <Link href="/">
        <Button type="primary" size="large" className="font-bold flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Button>
      </Link>
    </div>
  );
}

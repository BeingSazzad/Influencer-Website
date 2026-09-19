import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>High-Net-Worth Security Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
            Privacy Policy & Confidentiality Framework
          </h1>
          <p className="text-xs text-slate-500">Last updated: March 2026</p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-950 font-serif flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              <span>1. Client Confidentiality & Non-Disclosure</span>
            </h2>
            <p>
              At LUXE PRIME, privacy is the cornerstone of our high-net-worth real estate operations. Any inquiry submitted regarding trophy estates, off-market assets, or private walkthroughs is handled exclusively under strict attorney-broker confidentiality protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-950 font-serif flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-600" />
              <span>2. Data Collection and Usage</span>
            </h2>
            <p>
              We collect minimal identifying data solely required to pre-qualify escrow capacity, schedule private security escort tours, and coordinate with representation counsel. We never sell, lease, or monetize client personal data or investment criteria.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-950 font-serif flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>3. Media & Video Filming Protocols</span>
            </h2>
            <p>
              All video walkthroughs and architectural productions conducted by our verified influencer creators are produced with explicit owner written authorization. Sensitive family assets, security layouts, and confidential art collections are systematically excluded or blurred.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

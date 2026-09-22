# Influverse — The Creator Marketplace for Brands & Influencers

> **Production Platform**: Two-sided creator marketplace connecting brands with verified social media creators and UGC specialists with 100% escrow protection and transparent EUR (€) pricing.

---

## 🏛️ System Architecture & Clean Code Structure

```
src/
├── app/
│   ├── (website)/                  # Public Discovery & Marketing Portal
│   │   ├── page.tsx                # Homepage (Hero, TrustedBy, Bento Grid, ValueProps, HowItWorks, Pricing, FAQ)
│   │   ├── creators/               # Creators Discovery Marketplace
│   │   │   ├── page.tsx            # Live URL sync, categories, omni-search, active filter chips & pagination
│   │   │   └── [id]/page.tsx       # Creator Profile, Verified Stats, Packages, Portfolio Lightbox & Reviews
│   │   ├── how-it-works/page.tsx   # Dual-perspective workflow (For Brands / For Creators) with hash navigation
│   │   ├── pricing/page.tsx        # Transparent 15% escrow model breakdown & fee calculator
│   │   ├── about/page.tsx          # Brand story, mission, verified creators standard
│   │   ├── faq/page.tsx            # Categorized accordion FAQ with instant search
│   │   └── layout.tsx              # Public Header (Navbar) + Footer
│   ├── (auth)/                     # Authentication Flows
│   │   ├── login/page.tsx          # 1-Click Demo Login (Brand vs Creator) + Manual auth
│   │   ├── register/page.tsx       # Dual-role onboarding (Brand vs Creator registration)
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (brand-workspace)/          # Brand & Marketer Workspace
│   │   ├── brand/
│   │   │   ├── dashboard/page.tsx  # Campaign metrics, quick actions & active orders overview
│   │   │   ├── hire/new/page.tsx   # Creator hiring wizard with escrow calculation
│   │   │   ├── orders/             # Order tracking, deliverable approvals & escrow release
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── saved/page.tsx      # Shortlisted & favorite creators collection
│   │   │   ├── messages/page.tsx   # Direct unified messaging with creators
│   │   │   ├── payments/page.tsx   # Escrow wallet, deposits, 15% fee breakdown & tax invoices
│   │   │   ├── settings/page.tsx   # Brand profile, billing & team preferences
│   │   │   └── layout.tsx          # Brand workspace shell with BrandSidebar & WorkspaceHeader
│   ├── (creator-workspace)/        # Creator & Talent Workspace
│   │   ├── creator/
│   │   │   ├── dashboard/page.tsx  # Earnings, active deliverables, pipeline, share profile & preview modal
│   │   │   ├── packages/page.tsx   # Rate card manager (Stories, Reels, UGC, Dedicated posts)
│   │   │   ├── offers/page.tsx     # Funded escrow brand offers review & acceptance
│   │   │   ├── orders/             # Active collaboration workflows & deliverable submission
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── messages/page.tsx   # Direct collaboration messaging
│   │   │   ├── payments/page.tsx   # Net earnings, instant SEPA withdrawals & payout methods
│   │   │   ├── settings/page.tsx   # Profile, Bio, Social handles, Photo gallery & security
│   │   │   └── layout.tsx          # Creator workspace shell with CreatorSidebar & WorkspaceHeader
│   ├── (legal)/                    # Compliance & Platform Policy
│   │   ├── terms/page.tsx          # Terms of Service & Escrow Agreements
│   │   └── privacy/page.tsx        # GDPR Privacy Policy
│   ├── globals.css                 # Design tokens, typography variables & component styling
│   ├── layout.tsx                  # Root layout with AntdRegistry, ReduxProvider, and preconnect fonts
│   ├── loading.tsx                 # Instant suspense skeleton loader
│   └── not-found.tsx               # Custom branded 404 recovery page
├── components/
│   ├── auth/                       # Auth visual network illustration
│   ├── layout/                     # Navbar, Footer, BrandSidebar, CreatorSidebar, WorkspaceHeader
│   ├── shared/                     # CreatorCard, PackageCard, VerifiedBadge, EmptyState, Lightboxes, Modals
│   └── web-pages/                  # SplitHero, TrustedBy, Bento, ValueProps, HowItWorks, Pricing, FAQ
├── redux/
│   ├── store.ts                    # Central Redux store with typed hooks
│   ├── hooks.ts                    # useAppDispatch & useAppSelector
│   └── slices/
│       ├── authSlice.ts            # Authentication, demo role switcher (Brand vs Creator) & user profile
│       ├── creatorSlice.ts         # Creator discovery catalog, omni-filters, search query & favorites
│       ├── orderSlice.ts           # Escrow order lifecycles, milestones, deliverable approvals
│       ├── messageSlice.ts         # Unified real-time chat threads & order messaging
│       └── langSlice.ts            # Multilingual support (EN / DE)
├── types/                          # Strictly typed domain definitions (User, Creator, Order, Package, Message)
└── Mockdata.ts                     # Curated realistic datasets with authentic creator metrics, packages & portfolios
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Production Build & Validation
```bash
npm run build
```

---

## 🎨 Design System & Typography

- **Primary Sans / UI Font**: `Red Hat Display` (weights 300–900)
- **Editorial / Serif Font**: `Playfair Display` (weights 400–900, normal & italic)
- **Palette**:
  - Deep Onyx: `#0A0A0A`
  - Canvas / Surface: `#FAFAF8`
  - Subtle Gray: `#F4F4F0`
  - Border Gray: `#E7E7E2`
  - Accent Pink: `#FF2D78`
  - Success Green: `#23744D` / `#EEF7F2`

---

## 🌟 Key Platform Features

1. **Live Autocomplete Hero Search**:
   - Instant real-time creator suggestions dropdown on the Homepage Hero with verified status, follower niches, and EUR base rates.
   - Synchronized query parameter routing to `/creators?q=...&platform=...&category=...`.

2. **Full-Featured Discovery & Filtering**:
   - Multi-parameter filtering across Categories, Platforms (Instagram, TikTok, YouTube, UGC), Follower Tiers (Nano, Micro, Macro, Mega), and Locations.
   - Interactive Active Filter Chips with instant one-click removal and reset.

3. **100% Secure Escrow Workflow**:
   - Brands deposit the creator base price + 15% platform fee into protected escrow.
   - Creator delivers content for review, and escrow is released only upon brand approval.

4. **Dedicated Dual Workspaces**:
   - **Brand Workspace**: Campaign KPIs, shortlist, order tracking, and escrow management.
   - **Creator Workspace**: Direct profile sharing modal (QR code, rate card link), package pricing manager, portfolio showcase, and incoming offer reviews.

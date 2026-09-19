# LUXE PRIME — Influencer & Luxury Real Estate Platform

> **Live Production Platform**: Modern luxury real estate advisory and influencer media platform built with Next.js App Router, Redux Toolkit, Ant Design, and Tailwind CSS.

---

## 🏛️ System Architecture

```
src/
├── app/
│   ├── (website)/              # Public-facing luxury property & agent discovery
│   │   ├── page.tsx            # Homepage (Hero, Featured, Typologies, Influencers, Insights, CTA)
│   │   ├── properties/         # Interactive Property Search & Filter Grid
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx   # Detailed Property Page with Gallery, Specs, Mortgage & Inquiries
│   │   ├── agents/             # Real Estate Influencers & Top Producer Directory
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx   # Agent Profile, Bio, Social Stats & Active Listings
│   │   └── layout.tsx          # Public Layout (Navbar + Footer)
│   ├── (auth)/                 # Authentication Flows
│   │   ├── login/page.tsx      # Dual-Role Login (Buyer vs Agent) with Instant Demo Switcher
│   │   ├── register/page.tsx   # Membership Registration
│   │   └── forgot-password/page.tsx
│   ├── (user-dashboard)/       # Buyer / Investor Private Area
│   │   ├── user/
│   │   │   ├── dashboard/page.tsx       # Buyer Overview, Activity & Scheduled Tours
│   │   │   ├── saved-properties/page.tsx# Wishlist & Comparison Matrix
│   │   │   ├── inquiries/page.tsx       # Message threads with Agents & Itineraries
│   │   │   └── profile/page.tsx         # Account preferences & settings
│   │   └── layout.tsx                   # User Dashboard Layout with UserSidebar
│   ├── (agent-dashboard)/      # Real Estate Agent / Influencer CRM & Portal
│   │   ├── agent/
│   │   │   ├── dashboard/page.tsx       # Agent Analytics, KPI Cards & Inquiries Feed
│   │   │   ├── listings/
│   │   │   │   ├── page.tsx             # Active, Pending, Sold Listings Table & Filters
│   │   │   │   └── new/page.tsx         # Multi-step Property Listing Creator Wizard
│   │   │   ├── leads/page.tsx           # Visual CRM Pipeline (New, Contacted, Viewing, Closed)
│   │   │   ├── analytics/page.tsx       # Traffic, conversion, social reach analytics
│   │   │   └── profile/page.tsx         # Influencer Brand profile & social links editor
│   │   └── layout.tsx                   # Agent Dashboard Layout with AgentSidebar
│   ├── (InfoPages)/            # Corporate & Content Pages
│   │   ├── about/page.tsx      # About Us, Vision, Global Desks & Stats
│   │   ├── contact/page.tsx    # Contact Form & Global Office Hubs
│   │   ├── privacy/page.tsx    # Privacy Policy & Non-Disclosure Framework
│   │   └── faq/page.tsx        # Interactive Accordion FAQ
│   ├── layout.tsx              # Root Layout (Redux Provider, Ant Design ConfigProvider, Fonts)
│   ├── globals.css             # Tailwind base and custom theme styling
│   └── not-found.tsx
├── components/
│   ├── ui/                     # Base design components
│   ├── layout/                 # Navbar, Footer, UserSidebar, AgentSidebar, DashboardHeader
│   ├── shared/                 # PropertyCard, AgentCard, SearchFilterBar, MetricCard, InquiryModal
│   └── web-pages/              # HeroSection, FeaturedProperties, CategoriesSection, TopAgents, Insights
├── redux/
│   ├── store.ts                # Central Redux store
│   ├── hooks.ts                # Typed useAppDispatch & useAppSelector
│   └── slices/
│       ├── authSlice.ts        # Role switcher (Buyer vs Agent) & user state
│       ├── propertySlice.ts    # Filter states, favorites, custom added listings
│       ├── leadSlice.ts        # Agent CRM leads & inquiry creation
│       └── uiSlice.ts          # Modals, drawer controls, active notifications
├── Mockdata.ts                 # Rich dataset of luxury properties, influencers, leads & analytics
└── types/                      # TypeScript definitions (Property, Agent, Lead, User, Filter)
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

### 3. Production Build & Typecheck
```bash
npm run build
```

---

## 🌟 Key Features

1. **Instant Dual-Role Demo Switching**:
   - Toggle seamlessly between **Real Estate Agent / Influencer** and **Buyer / Investor** from the Navbar or Profile dropdown to immediately experience both dashboards and views.
2. **Omni-Search & Dynamic Filtering**:
   - Filter by location (Bel Air, Manhattan, Dubai, Miami Beach, London, Aspen, Monaco), property type, bedroom counts, price ranges, and sorting criteria.
3. **Property Detail & Mortgage Underwriting**:
   - High-res photo gallery, architectural specifications, verified amenities checklist, interactive mortgage calculator, and confidential tour scheduling.
4. **4-Step Property Listing Creator Wizard**:
   - Complete multi-step creator for agents to publish new trophy estates with 4K video walkthrough links and instant Redux catalog integration.
5. **Agent CRM Lead Pipeline**:
   - Kanban-style CRM board with drag/status progression: `New Inquiry` ➔ `Contacted` ➔ `VIP Viewing Set` ➔ `Offer / Escrow` ➔ `Closed Deal`.
6. **Social Reach & Audience Analytics**:
   - Track monthly video impressions across YouTube, Instagram Reels, TikTok, and direct website traffic with conversion rate insights.

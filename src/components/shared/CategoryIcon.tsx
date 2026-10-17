import React from 'react';

export type CategoryIconType =
  | 'all'
  | 'beauty'
  | 'fashion'
  | 'fitness'
  | 'travel'
  | 'food'
  | 'lifestyle'
  | 'tech'
  | 'business'
  | 'art'
  | 'family'
  | 'home'
  | 'ugc'
  | 'sponsored'
  | 'reviews'
  | string;

interface CategoryIconProps {
  name: CategoryIconType;
  className?: string;
  size?: number;
}

export function CategoryIcon({ name, className = 'w-4 h-4', size = 16 }: CategoryIconProps) {
  const normalized = (name || '').toLowerCase().trim();

  // 1. Beauty & Skincare - Bespoke cosmetic dropper / elixir bottle
  if (normalized.includes('beauty') || normalized.includes('skin') || normalized.includes('cosmetic')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Dropper bulb & pipette cap */}
        <path d="M10 2h4M12 2v3M9 5h6v3H9z" />
        {/* Sleek cosmetic bottle body */}
        <path d="M6 11a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8z" />
        {/* Center elixir droplet symbol */}
        <path d="M12 12c-1.2 1.5-1.5 2.5-1.5 3.2a1.5 1.5 0 0 0 3 0c0-.7-.3-1.7-1.5-3.2z" fill="currentColor" fillOpacity="0.25" />
      </svg>
    );
  }

  // 2. Fashion & Style / Luxury - Minimalist designer apparel hanger
  if (normalized.includes('fashion') || normalized.includes('style') || normalized.includes('apparel') || normalized.includes('luxury')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Hook */}
        <path d="M12 4a2.5 2.5 0 0 1 2.5 2.5c0 1.2-.8 2-1.8 2.3L12 9" />
        {/* Hanger frame with tailored shoulder slope */}
        <path d="M12 9 3.5 14.5a1.5 1.5 0 0 0 .8 2.5h15.4a1.5 1.5 0 0 0 .8-2.5L12 9z" />
        {/* Bottom crossbar */}
        <line x1="4.5" y1="17" x2="19.5" y2="17" />
        {/* Designer tag notch */}
        <circle cx="12" cy="14" r="1" fill="currentColor" />
      </svg>
    );
  }

  // 3. Fitness & Health - Kinetic athletic pulse & strength ring
  if (normalized.includes('fit') || normalized.includes('health') || normalized.includes('gym') || normalized.includes('workout')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Outer athletic ring */}
        <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
        {/* Heartbeat pulse with kinetic arrow */}
        <path d="M4 12h3.5l2-4.5 3.5 9 2.5-6.5 2 2h3" />
        {/* Energetic pulse indicator */}
        <circle cx="18" cy="7" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // 4. Travel & Adventure - Precision compass & destination coordinate
  if (normalized.includes('travel') || normalized.includes('adventure') || normalized.includes('vlog') || normalized.includes('flight')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        {/* Directional compass needle */}
        <polygon points="12 6 15 12 12 10 9 12" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.2" />
        <polygon points="12 18 9 12 12 14 15 12" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // 5. Food & Cuisine - Fine dining cloche & artisan aroma
  if (normalized.includes('food') || normalized.includes('cuisine') || normalized.includes('dining') || normalized.includes('beverage')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Serving Platter Dome / Cloche */}
        <path d="M3 18h18" />
        <path d="M4 17a8 8 0 0 1 16 0" />
        <path d="M12 9V6" />
        <circle cx="12" cy="5" r="1.5" fill="currentColor" />
        {/* Taste indicator steam lines */}
        <path d="M8 3.5c.5-.5.5-1 0-1.5" strokeOpacity="0.6" />
        <path d="M16 3.5c.5-.5.5-1 0-1.5" strokeOpacity="0.6" />
      </svg>
    );
  }

  // 6. Lifestyle & Wellness - Botanical organic leaf & balance sphere
  if (normalized.includes('lifestyle') || normalized.includes('wellness') || normalized.includes('mind')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Organic curved leaf */}
        <path d="M12 21a9 9 0 0 0 9-9c0-5-4-9-9-9-4 0-8 3-8 8 0 5 4 10 8 10z" />
        {/* Central stem / vein */}
        <path d="M12 21V11c2.5 0 5-1.5 6-4" />
        <path d="M12 15c-2 0-3.5-.8-4.5-2.5" />
      </svg>
    );
  }

  // 7. Tech & Gaming - Microchip core & precision bus traces
  if (normalized.includes('tech') || normalized.includes('gaming') || normalized.includes('software') || normalized.includes('gadget')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Chip center */}
        <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" fillOpacity="0.15" />
        {/* Internal core trace */}
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        {/* Connector pins */}
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </svg>
    );
  }

  // 8. Business & Finance - Minimal executive folio with financial clasp
  if (normalized.includes('business') || normalized.includes('finance') || normalized.includes('career')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <rect x="3" y="7" width="18" height="13" rx="2.5" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <rect x="10.5" y="10.5" width="3" height="3" rx="0.75" fill="currentColor" />
      </svg>
    );
  }

  // 9. Art & Photography - Studio focal aperture & drafting stroke
  if (normalized.includes('art') || normalized.includes('photo') || normalized.includes('creative') || normalized.includes('design')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="3" x2="16.5" y2="10.8" />
        <line x1="19.8" y1="7.5" x2="13.5" y2="15.3" />
        <line x1="19.8" y1="16.5" x2="9" y2="16.5" />
        <line x1="12" y1="21" x2="7.5" y2="13.2" />
        <line x1="4.2" y1="16.5" x2="10.5" y2="8.7" />
        <line x1="4.2" y1="7.5" x2="15" y2="7.5" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.25" />
      </svg>
    );
  }

  // 10. Family & Parenting - Nurturing protective dual circle
  if (normalized.includes('family') || normalized.includes('parent') || normalized.includes('baby') || normalized.includes('kids')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Parent figure */}
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19a6 6 0 0 1 12 0" />
        {/* Child figure */}
        <circle cx="17" cy="11" r="2.2" />
        <path d="M14 19a4 4 0 0 1 7 0" />
      </svg>
    );
  }

  // 11. Home & Living - Modern architectural gable with window
  if (normalized.includes('home') || normalized.includes('living') || normalized.includes('interior')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="m3 10 9-7 9 7v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20z" />
        <rect x="9.5" y="12.5" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
      </svg>
    );
  }

  // 12. UGC / Ad Creatives - Video recording viewfinder smartphone
  if (normalized.includes('ugc') || normalized.includes('content') || normalized.includes('creative lab')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Vertical Mobile Phone */}
        <rect x="6" y="2.5" width="12" height="19" rx="3" />
        {/* Viewfinder crosshairs */}
        <circle cx="12" cy="11" r="3" strokeWidth="1.2" />
        <circle cx="12" cy="11" r="1.2" fill="currentColor" />
        {/* Recording red pulse dot */}
        <circle cx="15.5" cy="5.5" r="1" fill="#FF2D78" stroke="none" />
        {/* Phone speaker pill */}
        <line x1="10.5" y1="5" x2="13.5" y2="5" strokeWidth="1.2" />
      </svg>
    );
  }

  // 13. Sponsored Posts - Creator spotlight broadcast beacon
  if (normalized.includes('sponsor') || normalized.includes('feed') || normalized.includes('collab')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Broadcast cone */}
        <path d="M4 10l9-4v12l-9-4z" />
        <path d="M4 14v4a2 2 0 0 0 2 2h1" />
        {/* Dynamic soundwaves */}
        <path d="M16 8.5a4.5 4.5 0 0 1 0 7" />
        <path d="M19 6a8 8 0 0 1 0 12" />
      </svg>
    );
  }

  // 14. Product Reviews - Certified inspection seal & package
  if (normalized.includes('review') || normalized.includes('unbox') || normalized.includes('product')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
        {/* Verified check badge inside */}
        <circle cx="16" cy="16" r="3.5" fill="#0A0A0A" stroke="#E7E7E2" strokeWidth="1" />
        <path d="m14.5 16 1 1 2-2" stroke="white" strokeWidth="1.2" />
      </svg>
    );
  }

  // 15. Eco-Friendly & Sustainability - Organic leaf sprout
  if (normalized.includes('eco') || normalized.includes('sustain') || normalized.includes('green') || normalized.includes('organic')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2.5 1 5-1 9-2.2 4.4-4.8 7-7 9z" />
        <path d="M2 21c0-3 1.8-6 5-8l4 4" />
      </svg>
    );
  }

  // Default / All Categories - Layered multifaceted creative grid
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

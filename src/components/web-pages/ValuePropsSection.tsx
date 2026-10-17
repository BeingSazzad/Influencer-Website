import Image from 'next/image';
import { Target } from 'lucide-react';

const valueProps = [
  {
    id: 'creator-discovery',
    image: '/images/value-props/creator-discovery.webp',
    imageAlt: 'A magnifying glass discovering creator profile cards',
    title: 'Find creators',
    description: 'Discover vetted talent that fits your brand, audience and brief.',
  },
  {
    id: 'brand-partnerships',
    image: '/images/value-props/brand-partnerships.webp',
    imageAlt: 'Two interlocking rings representing a creator partnership',
    title: 'Build partnerships',
    description: 'Keep conversations, briefs and feedback together from first hello to final delivery.',
  },
  {
    id: 'campaign-results',
    image: '/images/value-props/campaign-results.webp',
    imageAlt: 'Ascending campaign performance bars and an upward arrow',
    title: 'Drive real results',
    description: 'Create original content with collaborators who know how to move people.',
  },
  {
    id: 'secure-workflow',
    image: '/images/value-props/secure-workflow.webp',
    imageAlt: 'A checked shield beside an organised campaign document',
    title: 'Stay organised',
    description: 'Track offers, escrow, approvals and delivery in one clear workspace.',
  },
  {
    id: 'brands-of-every-size',
    image: '/images/value-props/brands-of-every-size.webp',
    imageAlt: 'Three storefronts representing brands of different sizes',
    title: 'For every brand',
    description: 'Find the right creative fit whether you are launching, growing or scaling.',
  },
];

export function ValuePropsSection() {
  return (
    <section className="border-b border-[#E7E7E2] bg-white py-12 sm:py-20 lg:py-24 font-sans">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto mb-8 sm:mb-14 max-w-3xl text-center sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FFF0F5] text-[#FF2D78] border border-[#FF2D78]/25 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
            <Target className="w-3.5 h-3.5 text-[#FF2D78]" aria-hidden="true" />
            <span>Made for Collaboration</span>
          </div>

          <h2 className="text-[28px] sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.12] sm:leading-[1.15] font-sans">
            Everything you need.{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A]">
              In one place.
            </span>
          </h2>

          <p className="text-[15px] sm:text-[18px] text-[#66665E] font-sans font-medium leading-[24px] sm:leading-[28px] mt-2.5 sm:mt-4 max-w-2xl mx-auto">
            Discover creators, manage collaborations and bring your best ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
          {valueProps.map((prop) => (
            <article key={prop.id} className="group min-w-0 last:col-span-2 sm:last:col-span-1">
              <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl sm:rounded-[28px] border border-black/[0.045] bg-[#F7F4F8] shadow-[0_10px_30px_rgba(30,24,37,0.05)] sm:shadow-[0_18px_55px_rgba(30,24,37,0.07)]">
                <Image
                  src={prop.image}
                  alt={prop.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                  sizes="(min-width: 1280px) 19vw, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 48vw"
                />
              </div>

              <div className="px-0.5 pt-2.5 sm:pt-4">
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-[#0A0A0A] tracking-tight">
                  {prop.title}
                </h3>
                <p className="mt-0.5 sm:mt-1.5 text-xs sm:text-sm text-[#66665E] font-medium leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

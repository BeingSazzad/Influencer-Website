import Image from 'next/image';
import { Sparkles } from 'lucide-react';

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
    <section className="border-b border-[#E7E7E2] bg-white py-20 font-sans sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1EEF9] text-[#6444A6] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#FF2D78]" aria-hidden="true" />
            <span>Made for Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.15] font-sans">
            Everything you need.{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A]">
              In one place.
            </span>
          </h2>

          <p className="text-[18px] text-[#73736A] font-sans font-medium leading-[28px] mt-4 sm:mt-5 max-w-2xl mx-auto">
            Discover creators, manage collaborations and bring your best ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {valueProps.map((prop) => (
            <article key={prop.id} className="group min-w-0">
              <div className="relative aspect-square overflow-hidden rounded-[28px] border border-black/[0.045] bg-[#F7F4F8] shadow-[0_18px_55px_rgba(30,24,37,0.07)]">
                <Image
                  src={prop.image}
                  alt={prop.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                  sizes="(min-width: 1280px) 19vw, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 92vw"
                />
              </div>

              <div className="px-1 pt-5">
                <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] tracking-tight">
                  {prop.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#73736A] font-medium leading-relaxed">
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

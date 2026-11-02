import React from 'react';
import { Language } from '../data/content';

interface TrustStripProps {
  lang: Language;
}

const partnerLogos = [
  {
    id: 'logo-1',
    name: 'HOMED Medical',
    url: 'https://res.cloudinary.com/hbstqwkk/image/upload/v1791474453/82e9cf6969e217fc_kbi9rz.png',
  },
  {
    id: 'logo-2',
    name: 'Healthcare Partner 1',
    url: 'https://res.cloudinary.com/hbstqwkk/image/upload/v1791474454/20aadb285aa22231_nbadz7.png',
  },
  {
    id: 'logo-3',
    name: 'Healthcare Partner 2',
    url: 'https://res.cloudinary.com/hbstqwkk/image/upload/v1791474454/6ef3560dcb363807_kwsjli.png',
  },
  {
    id: 'logo-4',
    name: 'Healthcare Partner 3',
    url: 'https://res.cloudinary.com/hbstqwkk/image/upload/v1791474453/1e119783e793d773_td6yqr.png',
  },
  {
    id: 'logo-5',
    name: 'Healthcare Partner 4',
    url: 'https://res.cloudinary.com/hbstqwkk/image/upload/v1791474453/a54a67f0771af0ff_ljvtyu.png',
  },
];

// Duplicate list for seamless infinite loop scroll
const marqueeLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

export const TrustStrip: React.FC<TrustStripProps> = ({ lang }) => {
  return (
    <section className="relative z-10 bg-[#FAFAFA] py-[3em] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
          <span>
            {lang === 'en'
              ? 'Trusted by Global Healthcare & Clinical Partners'
              : '全球医疗健康品牌与临床机构合作伙伴'}
          </span>
        </div>
      </div>

      {/* Marquee viewport with gradient scrim edges */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />

        {/* Right fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />

        {/* Marquee Track scrolling to the left */}
        <div className="animate-marquee-left flex items-center py-2">
          {marqueeLogos.map((logo, idx) => (
            <div
              key={`${logo.id}-${idx}`}
              className="flex items-center justify-center px-6 sm:px-10 shrink-0 group transition-transform duration-300 hover:scale-105"
            >
              <div className="h-10 sm:h-12 md:h-14 w-36 sm:w-44 flex items-center justify-center p-2 rounded-xl bg-white/70 border border-neutral-200/50 shadow-2xs group-hover:bg-white group-hover:border-neutral-300 transition-all">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

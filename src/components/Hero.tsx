import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Language, siteContent } from '../data/content';

interface HeroProps {
  lang: Language;
  onOpenDistributor: () => void;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenDistributor,
  onExploreProducts,
}) => {
  const t = siteContent[lang].hero;
  const isEn = lang === 'en';

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-end items-center bg-[#161614] text-white overflow-hidden select-none pt-[200px] pb-[70px] md:pt-[230px] md:pb-[85px] px-6 sm:px-8"
    >
      {/* Background Media with Cleannix Video Layout using HOMED authentic Medical Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="https://res.cloudinary.com/hbstqwkk/video/upload/v1791475624/jiaruikang_r82byc.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Cleannix Dark Gradient Overlay (180deg from #16161433 to #161614) */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(22, 22, 20, 0.45) 0%, rgba(22, 22, 20, 0.78) 50%, #161614 100%)',
          }}
        />
      </div>

      {/* Main Container - max-w-[1300px] flex items-center justify-start */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto flex flex-col items-start">
        {/* Hero Left Column (Cleannix layout: max-w-[675px] gap-[40px] to [56px]) */}
        <div className="w-full max-w-[700px] flex flex-col items-start gap-8 md:gap-12">
          
          {/* Cleannix Testimonial / Trust Chip (Avatars + Star Rating + Trust Text) */}
          <div className="inline-flex items-center gap-3 sm:gap-3.5 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-full w-fit max-w-full">
            {/* Overlapping circular profile avatars */}
            <div className="flex items-center -space-x-3 shrink-0">
              <div className="w-[40px] h-[40px] sm:w-[42px] sm:h-[42px] rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80"
                  alt="Clinical Specialist"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-[40px] h-[40px] sm:w-[42px] sm:h-[42px] rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                <img
                  src="https://res.cloudinary.com/hbstqwkk/image/upload/v1791810107/ca14b5fb92df362c2797f5aec7d3d032_j2krv9.jpg"
                  alt="Hospital Physician"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="w-[40px] h-[40px] sm:w-[42px] sm:h-[42px] rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&auto=format&fit=crop&q=80"
                  alt="Respiratory Partner"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Rating Stars & Trust Text */}
            <div className="flex flex-col justify-center min-w-0 gap-0.5">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="font-instrument text-xs sm:text-sm text-white font-medium tracking-normal leading-tight">
                {isEn ? '10k+ Clinical Trust · 50+ Countries' : '全球50+国家 · 10,000+ 临床与家庭信赖'}
              </p>
            </div>
          </div>

          {/* Title & Text + Button Wrapper */}
          <div className="w-full flex flex-col items-start gap-8 md:gap-10">
            {/* Title & Text */}
            <div className="w-full flex flex-col items-start gap-5">
              {/* Cleannix Castoro Headline with Brand Highlight */}
              <h1 className="font-castoro text-white capitalize text-4xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.05] font-normal tracking-tight text-left text-balance">
                {isEn ? (
                  <>
                    Technology That Protects{' '}
                    <span className="text-[#D80048]">Respiratory Health</span>
                  </>
                ) : (
                  <>
                    守护人类呼吸健康的{' '}
                    <span className="text-[#D80048]">先锋医疗科技</span>
                  </>
                )}
              </h1>

              {/* Subheading / Description using HOMED medical copy */}
              <p className="font-instrument text-base sm:text-lg text-[#F8F7FA]/90 leading-[1.55] max-w-[640px] font-normal text-left">
                {t.subtitle}
              </p>
            </div>

            {/* Cleannix Pill Buttons styled in HOMED brand colors */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDistributor}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[54px] bg-[#D80048] hover:bg-black transition-all duration-200 cursor-pointer shadow-lg shadow-[#D80048]/30 hover:shadow-black/20 active:scale-98"
              >
                <span className="font-instrument text-base font-semibold text-white tracking-normal">
                  {t.secondaryCta}
                </span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreProducts}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-[54px] bg-[#D80048] hover:bg-black transition-all duration-200 cursor-pointer shadow-lg shadow-[#D80048]/30 hover:shadow-black/20 active:scale-98"
              >
                <span className="font-instrument text-base font-semibold text-white tracking-normal">
                  {t.primaryCta}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Language, siteContent } from '../data/content';

interface AboutSectionProps {
  lang: Language;
  onExploreCapabilities: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  onExploreCapabilities,
}) => {
  const t = siteContent[lang].about;
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <section id="about" className="py-[3em] bg-[#FAFAFA] border-b border-neutral-200/60">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Strong Image Composition (Eldereelife inspired) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col">
            <div className="relative w-full h-full min-h-[380px] lg:min-h-full flex flex-col">
              <div className="w-full h-full flex-1 rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-200 border border-neutral-200/80 shadow-lg relative min-h-[360px] lg:min-h-0">
                <img
                  src="https://res.cloudinary.com/hbstqwkk/image/upload/v1791539748/about_homed_rd_1791460412333_hoowjq.jpg"
                  alt="HOMED Research and Engineering Center"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
                />

                {/* Verified Badge Overlay */}
                <div className="absolute bottom-4 right-4 sm:right-6 bg-white/95 backdrop-blur-xs p-3.5 sm:p-4 rounded-xl border border-neutral-200/80 shadow-md max-w-xs z-10">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171A20]">
                    <span className="w-2 h-2 rounded-full bg-[#D80048]" />
                    <span>National High-Tech Enterprise</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
                    {lang === 'en'
                      ? 'Shenzhen R&D HQ + Dongguan Cleanroom Campus'
                      : '深圳研发运营总部 + 东莞智能化洁净制造基地'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography & Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            {/* Small section label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{t.label}</span>
            </div>

            {/* Large editorial headline - strictly 2 lines */}
            <h2 className="font-castoro text-2xl sm:text-3xl md:text-[42px] font-normal text-[#171A20] tracking-tight leading-tight">
              {lang === 'en' ? (
                <>
                  <span className="block sm:whitespace-nowrap">Advancing Respiratory Healthcare</span>
                  <span className="block mt-1 sm:mt-1.5">Through Technology</span>
                </>
              ) : (
                <>
                  <span className="block">以创新科技驱动</span>
                  <span className="block mt-1 sm:mt-1.5">呼吸医疗未来</span>
                </>
              )}
            </h2>

            {/* Short supporting paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              <p>{t.paragraph1}</p>
              <p>{t.paragraph2}</p>
            </div>

            {/* Key highlights */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-neutral-200/80">
              {t.highlights.map((h, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-xs font-bold text-[#171A20]">{h.title}</div>
                  <div className="text-[11px] text-neutral-500 leading-normal">{h.desc}</div>
                </div>
              ))}
            </div>

            {/* Simple CTA with subtle arrow interaction */}
            <div className="pt-2">
              <button
                onClick={onExploreCapabilities}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D80048] hover:bg-black text-white font-semibold text-sm transition-all shadow-md shadow-[#D80048]/20 hover:shadow-black/20 cursor-pointer active:scale-98 group"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

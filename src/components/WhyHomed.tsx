import React from 'react';
import { Microscope, Factory, ShieldCheck, Globe2 } from 'lucide-react';
import { Language, siteContent } from '../data/content';

interface WhyHomedProps {
  lang: Language;
}

export const WhyHomed: React.FC<WhyHomedProps> = ({ lang }) => {
  const t = siteContent[lang].whyHomed;

  const icons = [
    <Microscope key="1" className="w-5 h-5 text-[#D80048]" />,
    <Factory key="2" className="w-5 h-5 text-[#D80048]" />,
    <ShieldCheck key="3" className="w-5 h-5 text-[#D80048]" />,
    <Globe2 key="4" className="w-5 h-5 text-[#D80048]" />,
  ];

  return (
    <section id="why-homed" className="py-[3em] bg-[#FAFAFA] border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="w-full max-w-3xl mx-auto mb-8 flex flex-col items-center justify-center gap-3.5 text-center">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{t.label}</span>
            </div>
          </div>
          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] font-normal text-[#171A20] tracking-tight leading-tight text-center">
            {lang === 'en' ? (
              <>
                <span className="block">Why Global Healthcare Leaders</span>
                <span className="block mt-1 sm:mt-1.5">Partner with HOMED</span>
              </>
            ) : (
              <>
                <span className="block">为何全球医疗行业领袖</span>
                <span className="block mt-1 sm:mt-1.5">选择与宏济医疗携手合作</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl text-center">
            {t.subtitle}
          </p>
        </div>

        {/* 4-Column Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF1F5] flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    {item.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#171A20] tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Verified Capability</span>
                <span className="font-mono">HOMED Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

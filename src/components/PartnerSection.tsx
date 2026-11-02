import React from 'react';
import { ArrowRight, CheckCircle2, FileText, Globe } from 'lucide-react';
import { Language, siteContent } from '../data/content';

interface PartnerSectionProps {
  lang: Language;
  onOpenDistributor: () => void;
  onOpenCatalogue: () => void;
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({
  lang,
  onOpenDistributor,
  onOpenCatalogue,
}) => {
  const t = siteContent[lang].partner;

  return (
    <section id="partners" className="py-[3em] bg-[#171A20] text-white relative overflow-hidden">
      {/* Subtle brand glow accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D80048]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#D80048]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{t.label}</span>
            </div>

            <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight leading-tight text-white">
              {lang === 'en' ? (
                <>
                  <span className="block">Partner with HOMED</span>
                  <span className="block mt-1 sm:mt-1.5">Expand Global Healthcare Reach</span>
                </>
              ) : (
                <>
                  <span className="block">携手宏济医疗</span>
                  <span className="block mt-1 sm:mt-1.5">共拓全球健康市场</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal max-w-xl">
              {t.subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenDistributor}
                className="px-8 py-3.5 text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-all shadow-md shadow-[#D80048]/20 hover:shadow-black/20 flex items-center justify-center gap-2 cursor-pointer group active:scale-98"
              >
                <span>{t.primaryCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCatalogue}
                className="px-8 py-3.5 text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-all shadow-md shadow-[#D80048]/20 hover:shadow-black/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>{t.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* Right: Partner Benefits Grid */}
          <div className="lg:col-span-5 bg-neutral-900/90 rounded-2xl p-6 sm:p-8 border border-neutral-800 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-2">
              Manufacturer Support & Advantages
            </div>

            {t.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#D80048] shrink-0 mt-0.5" />
                <span className="leading-snug">{benefit}</span>
              </div>
            ))}

            <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Fast Track 24h Response</span>
              <span className="font-mono text-emerald-400">● Global Onboarding Open</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

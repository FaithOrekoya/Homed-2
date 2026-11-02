import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Language, siteContent } from '../data/content';

interface FinalCTAProps {
  lang: Language;
  onOpenDistributor: () => void;
  onOpenContact: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  lang,
  onOpenDistributor,
  onOpenContact,
}) => {
  const t = siteContent[lang].finalCta;

  return (
    <section className="py-[3em] bg-white border-b border-neutral-200/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Subtle accent mark */}
        <div className="w-12 h-1 bg-[#D80048] mx-auto rounded-full" />

        <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] font-normal text-[#171A20] tracking-tight leading-tight text-center">
          {lang === 'en' ? (
            <>
              <span className="block">Let's Build Better</span>
              <span className="block mt-1 sm:mt-1.5">Respiratory Care Solutions Together</span>
            </>
          ) : (
            <>
              <span className="block">共筑更优质的</span>
              <span className="block mt-1 sm:mt-1.5">呼吸医疗健康未来</span>
            </>
          )}
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
          {t.subtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenDistributor}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-all shadow-md shadow-[#D80048]/20 hover:shadow-black/20 flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
          >
            <span>{t.distributorCta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="mailto:sales@homedgroup.com"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-all shadow-md shadow-[#D80048]/20 hover:shadow-black/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>{t.contactCta}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

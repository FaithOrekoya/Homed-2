import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Globe,
  Award,
  Sparkles,
  Building2,
} from 'lucide-react';
import { Language, siteContent } from '../data/content';
import { AnimatedCounter } from './AnimatedCounter';

interface ManufacturingSectionProps {
  lang: Language;
  onOpenDistributor: () => void;
}

export const ManufacturingSection: React.FC<ManufacturingSectionProps> = ({
  lang,
  onOpenDistributor,
}) => {
  const t = siteContent[lang].manufacturing;
  const isEn = lang === 'en';
  const [activeTab, setActiveTab] = useState<'cleanroom' | 'testing' | 'oem'>('cleanroom');

  return (
    <section
      id="manufacturing"
      className="py-[3em] bg-[#FAFAFA] border-b border-neutral-200/60 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-4 text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
            <span>{isEn ? 'R&D & Intelligent Manufacturing Base' : '研发与精益智造中心'}</span>
          </div>

          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] font-normal text-[#171A20] tracking-tight leading-tight text-center">
            {isEn ? (
              <>
                <span className="block">From Precision Engineering</span>
                <span className="block mt-1 sm:mt-1.5">to Scaled Cleanroom Manufacturing</span>
              </>
            ) : (
              <>
                <span className="block">从前沿声学气流研发</span>
                <span className="block mt-1 sm:mt-1.5">到规模化精益洁净智造</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed font-normal text-center">
            {isEn
              ? 'HOMED combines cutting-edge respiratory acoustics with a state-of-the-art Dongguan cleanroom campus, certified under ISO 13485 and global medical standards.'
              : '宏济医疗依托深圳声学气流研发中心与东莞十万级GMPC无尘净化制造基地，构建了集模具、SMT贴片、整机装配与出厂全检于一体的现代化医用供应链底座。'}
          </p>
        </div>

        {/* Dynamic Running Numbers Grid (Live Animated Counters) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16">
          {/* Stat 1: Annual Capacity */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs hover:border-[#D80048]/40 hover:shadow-md transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F5] text-[#D80048] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#171A20] tracking-tight leading-none mb-2">
              {isEn ? (
                <AnimatedCounter end={2000000} suffix="+" duration={2200} />
              ) : (
                <AnimatedCounter end={200} suffix="万+ 台" duration={2200} />
              )}
            </div>
            <div className="text-xs sm:text-sm font-bold text-neutral-800">
              {isEn ? 'Annual Device Output' : '整机年产能力'}
            </div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
              {isEn
                ? 'High-precision respiratory medical equipment delivered annually'
                : '十万级净化车间规模化智能产线交付能力'}
            </p>
          </div>

          {/* Stat 2: Cleanroom Grade */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs hover:border-[#D80048]/40 hover:shadow-md transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F5] text-[#D80048] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#171A20] tracking-tight leading-none mb-2">
              {isEn ? (
                <>
                  <span className="text-lg sm:text-xl font-bold font-sans text-neutral-400 mr-1">Class</span>
                  <AnimatedCounter end={100000} duration={2000} />
                </>
              ) : (
                <AnimatedCounter end={10} suffix="万级 GMPC" duration={2000} />
              )}
            </div>
            <div className="text-xs sm:text-sm font-bold text-neutral-800">
              {isEn ? 'GMPC Cleanroom Class' : '无尘洁净车间'}
            </div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
              {isEn
                ? 'Positive-pressure positive microbial and particulate barrier'
                : '严格恒温恒湿正压环境与微颗粒全流程监控'}
            </p>
          </div>

          {/* Stat 3: Quality First-Pass Yield */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs hover:border-[#D80048]/40 hover:shadow-md transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#171A20] tracking-tight leading-none mb-2">
              <AnimatedCounter end={99.8} decimals={1} suffix="%" duration={1800} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-neutral-800">
              {isEn ? 'First-Pass Quality Yield' : '出厂全检合格率'}
            </div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
              {isEn
                ? '100% individual testing on oxygen concentration & acoustics'
                : '严苛出厂逐台全检与全程质量溯源体系'}
            </p>
          </div>

          {/* Stat 4: Global Export Footprint */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs hover:border-[#D80048]/40 hover:shadow-md transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F5] text-[#D80048] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#171A20] tracking-tight leading-none mb-2">
              <AnimatedCounter end={50} suffix="+" duration={1600} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-neutral-800">
              {isEn ? 'Countries Exported' : '全球出口国家'}
            </div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
              {isEn
                ? 'Serving healthcare institutions across Europe, Americas & Asia'
                : '长期供应欧美及全球知名药械品牌'}
            </p>
          </div>
        </div>

        {/* Architectural Showcase Grid: Left Visual + Right Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Factory Photography with Overlay Details */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-xl flex-1 min-h-[380px] group">
              <img
                src="https://res.cloudinary.com/hbstqwkk/image/upload/v1791810635/manufacturing_cleanroom_1791460422744_1_knn9jc.jpg"
                alt="HOMED Class 100,000 Cleanroom Intelligent Manufacturing Base"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />

              {/* Floating Certification Strip on Visual */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Dongguan Smart Manufacturing Campus</span>
                </div>
              </div>

              {/* Bottom Accreditation Badges */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                  {isEn ? 'International Regulatory Accreditations' : '国际权威医疗资质认证'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['US FDA 510(k)', 'EU CE-MDR Class IIa', 'ISO 13485:2016', 'MDSAP Certified', 'ETL Listed'].map(
                    (cert, idx) => (
                      <span
                        key={idx}
                        className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white border border-white/15"
                      >
                        {cert}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Structured Precision Capability Pillars */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Capability 1: Cleanroom Assembly */}
            <div
              onClick={() => setActiveTab('cleanroom')}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeTab === 'cleanroom'
                  ? 'bg-white border-[#D80048] shadow-md ring-1 ring-[#D80048]/20'
                  : 'bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FFF1F5] text-[#D80048] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm sm:text-base text-[#171A20]">
                    {isEn ? '100,000-Level GMPC Sterile Environment' : '十万级GMPC无尘净化标准'}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {isEn
                      ? 'Positive-pressure climate-controlled cleanroom guaranteeing zero particulate contamination for medical micro-mesh sieves and pneumatic valves.'
                      : '严苛的正压微环境控制，确保微孔钛合金筛网、微型气泵及核心气路部件在无菌洁净环境下完成总装。'}
                  </p>
                </div>
              </div>
            </div>

            {/* Capability 2: 100% Comprehensive Inspection */}
            <div
              onClick={() => setActiveTab('testing')}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeTab === 'testing'
                  ? 'bg-white border-[#D80048] shadow-md ring-1 ring-[#D80048]/20'
                  : 'bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FFF1F5] text-[#D80048] flex items-center justify-center shrink-0 mt-0.5">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm sm:text-base text-[#171A20]">
                    {isEn ? 'Laser Diffraction & Acoustic Test Labs' : '激光粒度散射与全流程气流实验室'}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {isEn
                      ? '100% automated inspection: validating 93% ± 3% oxygen stability, aerosol MMAD < 3.5μm particle distribution, and whisper-quiet decibel levels (< 25dB).'
                      : '逐台全检出氧浓度稳定性、马尔文激光粒度散射分析（MMAD < 3.5μm）与超低运行分贝测试。'}
                  </p>
                </div>
              </div>
            </div>

            {/* Capability 3: Scaled Turnkey OEM/ODM */}
            <div
              onClick={() => setActiveTab('oem')}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeTab === 'oem'
                  ? 'bg-white border-[#D80048] shadow-md ring-1 ring-[#D80048]/20'
                  : 'bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FFF1F5] text-[#D80048] flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm sm:text-base text-[#171A20]">
                    {isEn ? 'Turnkey OEM / ODM & Global Dossiers' : '跨国药械品牌OEM/ODM柔性定制'}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {isEn
                      ? 'Long-term trusted partner for multinational pharmaceutical leaders (AstraZeneca, Drive DeVilbiss) with complete FDA 510(k) and CE-MDR submission packages.'
                      : '长期服务阿斯利康等跨国药械巨头，提供工业ID设计、模具开发、国际注册合规文件提供与多语种本地化交付。'}
                  </p>
                </div>
              </div>
            </div>

            {/* Inquire Action Button */}
            <div className="pt-2">
              <button
                onClick={onOpenDistributor}
                className="w-full px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-all shadow-md shadow-[#D80048]/20 hover:shadow-black/20 flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>{isEn ? 'Inquire About Contract Manufacturing & Audits' : '咨询OEM/ODM代工合作与验厂接待'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

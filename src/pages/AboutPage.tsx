import React, { useState } from 'react';
import {
  ShieldCheck,
  Globe,
  Users,
  Calendar,
  TrendingUp,
  Sparkles,
  Compass,
  HeartPulse,
  Leaf,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Stethoscope,
  Factory,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../data/content';
import { AboutSection } from '../components/AboutSection';
import { TestimonialsSection } from '../components/TestimonialsSection';

interface AboutPageProps {
  lang: Language;
  onOpenDistributor: () => void;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  lang,
  onOpenDistributor,
  onNavigate,
}) => {
  const isEn = lang === 'en';
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Certifications list
  const certifications = [
    { name: 'US FDA 510(k)', detail: 'Medical Device Clearance for North America' },
    { name: 'EU CE-MDR Class IIa', detail: 'Regulation (EU) 2017/745 MDR Compliant' },
    { name: 'ISO 13485:2016', detail: 'Medical Devices Quality Management System' },
    { name: 'MDSAP Multi-Country', detail: 'Medical Device Single Audit Program' },
    { name: 'ETL Safety Certified', detail: 'North American Electrical & Medical Safety' },
    { name: 'Class 100,000 GMPC', detail: 'Sterile Cleanroom Manufacturing Standard' },
  ];

  // Core Values & Guiding Principles
  const coreValues = [
    {
      number: '01',
      icon: HeartPulse,
      titleEn: 'Clinical Efficacy & Safety',
      titleZh: '临床有效性与生命至上',
      descEn:
        'Every aerosol droplet size and oxygen concentration curve is verified by hospital clinical trials before serial production.',
      descZh:
        '每一项气雾颗粒粒径分布与氧浓度曲线均通过严苛临床验证，恪守医疗级零缺陷安全红线。',
      tagEn: 'First Do No Harm',
      tagZh: '严守临床标准',
    },
    {
      number: '02',
      icon: Compass,
      titleEn: 'Aerosol Fluid Innovation',
      titleZh: '微孔气雾与流体自研',
      descEn:
        'Investing over 15% of annual revenue into mesh nebulization patents, acoustic dampening, and titanium micro-hole alloys.',
      descZh:
        '年研发投入占比超15%，深耕微孔筛网、低噪消音气路与钛合金医用网片底层材料专利。',
      tagEn: '15%+ Annual R&D',
      tagZh: '15%+ 持续研发投入',
    },
    {
      number: '03',
      icon: ShieldCheck,
      titleEn: 'Global Regulatory Rigor',
      titleZh: '国际权威多国合规',
      descEn:
        'Full compliance dossiers under US FDA 510(k), EU CE-MDR, and MDSAP, providing frictionless customs clearance for partners.',
      descZh:
        '完备的FDA 510(k)、CE-MDR及MDSAP技术文档体系，为全球分销商提供畅行无阻的合规准入。',
      tagEn: 'Audit-Ready Standards',
      tagZh: '全球合规通关支持',
    },
    {
      number: '04',
      icon: Users,
      titleEn: 'Healthcare Accessibility',
      titleZh: '普及普惠全球呼吸健康',
      descEn:
        'Designing whisper-quiet, intuitive respiratory hardware engineered for seamless transition between ICU and home use.',
      descZh:
        '研发轻量便携、静音低噪的呼吸健康设备，让高品质医疗科技普及至千家万户与基层诊所。',
      tagEn: 'Patient-Centered Design',
      tagZh: '以患者健康为核心',
    },
  ];

  // ESG Pillars
  const esgPillars = [
    {
      icon: Leaf,
      titleEn: 'Green Cleanroom Manufacturing',
      titleZh: '绿色低碳智能洁净生产',
      descEn:
        'Solar-assisted campus power, high-efficiency closed-loop water filtration, and eco-certified materials reducing factory carbon emissions by 32%.',
      descZh:
        '东莞产业基地引入屋顶分布式光伏与闭环循环水净化，推行低能耗环保工艺，制造端碳排放降低32%。',
      metric: '-32% Operational Carbon Footprint',
    },
    {
      icon: Factory,
      titleEn: '100% Recyclable Packaging',
      titleZh: '100% 环保可循环包材',
      descEn:
        'Eliminated single-use polystyrene foam cushions across export lines, adopting FSC-certified molded pulp buffers and biodegradable shipping cartons.',
      descZh:
        '外贸出口整机全面淘汰一次性泡沫塑料，采用FSC森林认证可降解蜂窝纸浆模塑衬垫，践行绿色包装。',
      metric: 'Zero Styrofoam in Standard Lines',
    },
    {
      icon: Stethoscope,
      titleEn: 'Humanitarian Respiratory Relief',
      titleZh: '全球呼吸健康公益援助',
      descEn:
        'Donated over 50,000 nebulizers and medical oxygen units to community health centers and disaster relief clinics across developing regions.',
      descZh:
        '累计向偏远地区基层卫生站与突发公共卫生灾害一线捐赠逾50,000台微孔雾化器与便携医用制氧机。',
      metric: '50,000+ Devices Donated Globally',
    },
  ];

  // FAQs
  const faqs = [
    {
      qEn: 'What certifications do HOMED Medical devices hold for international market entry?',
      qZh: '宏济医疗器械具备哪些国际主流市场的准入资质？',
      aEn:
        'HOMED devices hold active US FDA 510(k) clearances, EU CE-MDR Class IIa compliance under Regulation (EU) 2017/745 through TÜV Rheinland, ISO 13485:2016 quality management certification, and MDSAP (Medical Device Single Audit Program) recognition covering the US, Canada, Brazil, and Australia. Complete Technical Documentation (DoC, biocompatibility, and clinical evaluation files) is readily provided to authorized partners.',
      aZh:
        '宏济医疗产品已获得美国FDA 510(k)认证、欧盟新版CE-MDR Class IIa医疗器械认证（由德国莱茵TÜV审核签发）、ISO 13485:2016质量体系认证以及涵盖美加巴澳的MDSAP多国联合审核认证。我们为签约分销商提供完备的符合性声明(DoC)、生物相容性报告及临床评估全套技术文档。',
    },
    {
      qEn: 'What OEM/ODM customization capabilities and order lead times does HOMED offer?',
      qZh: '宏济医疗提供哪些OEM/ODM定制服务，起订量与交期如何？',
      aEn:
        'We offer comprehensive turnkey OEM/ODM services including industrial appearance design, structural mold fabrication, PCBA schematic development, and custom UI/software packaging. Standard private-label OEM orders begin at 1,000 units with a production lead time of 25–35 calendar days. For bespoke ODM projects, our Shenzhen engineering center provides rapid working prototypes in as little as 3 weeks.',
      aZh:
        '我们提供涵盖外观ID设计、精密模具注塑、PCBA电路研发、定制化包装与说明书的全套一站式OEM/ODM代工方案。常规贴牌OEM起订量通常为1,000台，标准交期为25至35个自然日；对于全新开模的ODM研发定制，深圳总部工程团队可在3周内完成功能样机打样。',
    },
    {
      qEn: 'Where are HOMED products engineered and manufactured?',
      qZh: '宏济医疗的产品在何处进行技术研发与实体生产？',
      aEn:
        'HOMED operates a twin-hub model: our Research & Innovation Headquarters is based in Shenzhen, focusing on fluid acoustics, firmware, and clinical trials; while mass precision cleanroom manufacturing, automated SMT, and 100% batch testing are housed in our 20,000 m² modernized Class 100,000 GMPC facility in Dongguan, capable of producing over 2 million medical units annually.',
      aZh:
        '宏济医疗采用“研发+智造”双核协同体系：产品声学结构、气路仿真、控制算法与临床试验由深圳研发运营总部深度主导；整机规模化生产、SMT高速贴片与自动化装配检测则依托东莞2万余平方米十万级GMPC无尘净化智能制造基地，年产能超200万台。',
    },
    {
      qEn: 'How does HOMED support regional distributors in public hospital tenders?',
      qZh: '宏济医疗如何协助区域分销商参与当地医院与政府招投标？',
      aEn:
        'We provide complete tender preparation packages, including certified factory authorization letters (LOA), notarized test reports (electrical safety, noise level, aerosol particle distribution), clinical efficacy whitepapers, multilingual promotional collateral, and rapid-ship tender evaluation samples. Dedicated international account managers assist with bid technical scoring compliance.',
      aZh:
        '我们为区域合作伙伴提供全流程标案支持，包括官方授权书(LOA)、原厂检测公证件（电气安全、声学噪音、激光粒度分布报告）、临床疗效白皮书、多语言营销物料及投标测试样机。专属国际商务经理将全程协同，确保投标技术指标获得满分合规评分。',
    },
  ];

  const handleScrollToCapabilities = () => {
    const el = document.getElementById('certifications');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* 1. Full-width Hero Section (Header sits transparently on top like on the Home page, with custom height) */}
      <section className="relative w-full overflow-hidden select-none bg-[#161614] text-white pt-[170px] pb-[70px] sm:pt-[190px] sm:pb-[85px] md:pt-[210px] md:pb-[95px] px-6 sm:px-8 min-h-[420px] sm:min-h-[460px] md:min-h-[480px] flex flex-col justify-center items-center mb-12 sm:mb-16">
        {/* Background Image: Child using medical nebulizer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://res.cloudinary.com/byde2j9a/image/upload/v1792544295/Child_using_medical_nebulizer_20261021015652_vmoae2.jpg"
            alt={isEn ? 'Child using medical nebulizer' : '儿童使用医用雾化器'}
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Cleannix Dark Gradient Overlay (header on top floats transparently, content remains crisp) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(22, 22, 20, 0.45) 0%, rgba(22, 22, 20, 0.78) 55%, #161614 100%)',
            }}
          />
        </div>

        {/* Centered Hero Content with original clean text */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-castoro text-white tracking-tight leading-tight">
            {isEn ? 'About' : '关于宏济'}
          </h1>

          <div className="flex items-center gap-2 sm:gap-2.5 mt-3 sm:mt-4 text-sm sm:text-base font-medium text-white/90">
            <button
              onClick={() => onNavigate('/')}
              className="text-white/80 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {isEn ? 'Home' : '首页'}
            </button>
            <span className="text-white/60 select-none text-xs sm:text-sm">»</span>
            <span className="text-white font-semibold">
              {isEn ? 'About' : '关于宏济'}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Featured AboutSection (Advancing Respiratory Healthcare Through Technology) */}
      <div className="mb-12">
        <AboutSection
          lang={lang}
          onExploreCapabilities={handleScrollToCapabilities}
        />
      </div>

      {/* 3. Quick Numbers Bar / Key Metrics */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 mb-20">
        <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center gap-4 text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{isEn ? 'Key Metrics' : '发展概貌'}</span>
            </div>
          </div>
          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] leading-[1.1] font-normal text-[#161614] text-center">
            {isEn ? 'Scale, Precision & Global Reach' : '制造规模、精密研发与全球辐射'}
          </h2>
          <p className="font-instrument text-base text-[#3B3B3B] leading-[1.5] max-w-[660px] text-center font-normal">
            {isEn
              ? 'Proven manufacturing capability and certified quality infrastructure backing over 50 global partner markets.'
              : '二十余年行业积淀，从高洁净车间到数百万台年装配产能，为全球合作伙伴提供坚实后盾。'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* Card 1: 2003 */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_-8px_rgba(216,0,72,0.12)] hover:border-neutral-300 transition-all duration-300 group overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-[#FFF0F4] text-neutral-700 group-hover:text-[#D80048] flex items-center justify-center transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 group-hover:bg-[#FFF0F4] group-hover:text-[#D80048] px-2.5 py-0.5 rounded-full transition-colors">
                  {isEn ? 'Established' : '品牌创立'}
                </span>
              </div>
              <div className="font-castoro text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-900 group-hover:text-[#D80048] tracking-tight leading-none transition-colors">
                2003
              </div>
              <h3 className="text-base font-bold text-neutral-900 mt-3 group-hover:text-neutral-950 transition-colors">
                {isEn ? 'Founded in Shenzhen' : '始于深圳研发'}
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed mt-1.5">
                {isEn
                  ? 'Over two decades of dedicated R&D in medical nebulization and respiratory therapeutic solutions.'
                  : '深耕医疗雾化与呼吸系统诊疗领域，沉淀二十余载自主核心技术研发积淀。'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D80048]" />
              <span>{isEn ? '20+ Years Clinical Heritage' : '二十余年专业医用积淀'}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D80048] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>

          {/* Card 2: 50+ */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_-8px_rgba(216,0,72,0.12)] hover:border-neutral-300 transition-all duration-300 group overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-[#FFF0F4] text-neutral-700 group-hover:text-[#D80048] flex items-center justify-center transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 group-hover:bg-[#FFF0F4] group-hover:text-[#D80048] px-2.5 py-0.5 rounded-full transition-colors">
                  {isEn ? 'Global Reach' : '全球市场'}
                </span>
              </div>
              <div className="font-castoro text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-900 group-hover:text-[#D80048] tracking-tight leading-none transition-colors">
                50<span className="text-[#D80048]">+</span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 mt-3 group-hover:text-neutral-950 transition-colors">
                {isEn ? 'Global Export Markets' : '全球出口国家与地区'}
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed mt-1.5">
                {isEn
                  ? 'Delivering trusted medical-grade devices to healthcare systems and hospitals across 5 continents.'
                  : '设备远销欧洲、美洲、东南亚及中东等50多个国家，服务全球数千万家庭。'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D80048]" />
              <span>{isEn ? '5 Continents Covered' : '覆盖全球五大洲'}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D80048] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>

          {/* Card 3: 2,000,000+ */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_-8px_rgba(216,0,72,0.12)] hover:border-neutral-300 transition-all duration-300 group overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-[#FFF0F4] text-neutral-700 group-hover:text-[#D80048] flex items-center justify-center transition-colors">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 group-hover:bg-[#FFF0F4] group-hover:text-[#D80048] px-2.5 py-0.5 rounded-full transition-colors">
                  {isEn ? 'Capacity' : '年产能'}
                </span>
              </div>
              <div className="font-castoro text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-900 group-hover:text-[#D80048] tracking-tight leading-none transition-colors">
                2M<span className="text-[#D80048]">+</span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 mt-3 group-hover:text-neutral-950 transition-colors">
                {isEn ? 'Annual Unit Output' : '整机年产能规模'}
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed mt-1.5">
                {isEn
                  ? 'High-speed automated assembly lines ensuring on-time fulfillment for large-scale OEM & ODM orders.'
                  : '配备现代化自动化总装产线与检测设备，满足国际OEM/ODM大批量订单稳定交付。'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D80048]" />
              <span>{isEn ? 'Automated Smart Production' : '智能自动化高效制造'}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D80048] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>

          {/* Card 4: Class 100k */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_-8px_rgba(216,0,72,0.12)] hover:border-neutral-300 transition-all duration-300 group overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-[#FFF0F4] text-neutral-700 group-hover:text-[#D80048] flex items-center justify-center transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 group-hover:bg-[#FFF0F4] group-hover:text-[#D80048] px-2.5 py-0.5 rounded-full transition-colors">
                  {isEn ? 'Cleanroom' : '洁净车间'}
                </span>
              </div>
              <div className="font-castoro text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-900 group-hover:text-[#D80048] tracking-tight leading-none transition-colors">
                100,000
              </div>
              <h3 className="text-base font-bold text-neutral-900 mt-3 group-hover:text-neutral-950 transition-colors">
                {isEn ? 'GMPC Cleanroom Class' : '十万级洁净生产车间'}
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed mt-1.5">
                {isEn
                  ? 'Certified dust-free manufacturing campus strictly compliant with ISO 13485 and GMP standards.'
                  : '严格遵循ISO 13485及国家GMP医疗器械生产质量管理规范，全程无尘无污染控制。'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D80048]" />
              <span>{isEn ? 'ISO 13485 & GMP Standards' : 'ISO 13485 & GMP 规范'}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D80048] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
        </div>
      </div>

      {/* 4. Corporate Mission, Vision & Core Values */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 mb-20">
        <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center gap-4 text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{isEn ? 'Corporate Purpose' : '使命与愿景'}</span>
            </div>
          </div>
          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] leading-[1.1] font-normal text-[#161614] text-center">
            {isEn ? 'Engineering Trust into Every Breath' : '以科技守护每一次健康呼吸'}
          </h2>
          <p className="font-instrument text-base text-[#3B3B3B] leading-[1.5] max-w-[660px] text-center font-normal">
            {isEn
              ? 'Guiding every breakthrough in inhalation medicine and driving our global healthcare commitments.'
              : '聚焦呼吸慢病诊疗与院内外康复，为全球患者和医护人员提供精准、可靠且可负担的吸入给药装备。'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mission & Vision Left Card */}
          <div className="lg:col-span-5 bg-[#161614] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#D80048]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D80048]">
                  {isEn ? 'Corporate Purpose' : '使命与愿景'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-castoro text-white mt-2 leading-snug">
                  {isEn ? 'Engineering Trust into Every Breath.' : '以科技守护每一次健康呼吸'}
                </h2>
              </div>

              {/* Mission Statement */}
              <div className="space-y-2 border-l-2 border-[#D80048] pl-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {isEn ? 'Our Mission' : '企业使命'}
                </div>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                  {isEn
                    ? 'To protect and enhance respiratory well-being worldwide by delivering accessible, clinically validated, and precision-engineered inhalation therapies.'
                    : '聚焦呼吸慢病诊疗与院内外康复，为全球患者和医护人员提供精准、可靠且可负担的吸入给药与供氧装备。'}
                </p>
              </div>

              {/* Vision Statement */}
              <div className="space-y-2 border-l-2 border-white/20 pl-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {isEn ? 'Our Vision' : '企业愿景'}
                </div>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {isEn
                    ? 'To be the global benchmark for respiratory medical technology, bridging clinical hospital standards with comfortable home care across 100+ nations.'
                    : '成为全球呼吸健康领域备受信赖的标杆品牌，构建连接医院重症治疗与家庭长程护理的高品质医用生态。'}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span>{isEn ? '20+ Years Clinical R&D' : '二十余年自主研制'}</span>
              <span className="text-[#D80048] font-semibold">HOMED Medical</span>
            </div>
          </div>

          {/* 4 Core Guiding Values Right Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#D80048] flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-[#D80048] uppercase tracking-wider mb-1">
                      {val.number}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">
                      {isEn ? val.titleEn : val.titleZh}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {isEn ? val.descEn : val.descZh}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-medium text-neutral-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D80048]" />
                    <span>{isEn ? val.tagEn : val.tagZh}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials from Global Clinicians & Distributors */}
      <div className="mb-20">
        <TestimonialsSection lang={lang} />
      </div>

      {/* 5. Certifications & Quality System */}
      <div id="certifications" className="max-w-[1300px] mx-auto px-6 sm:px-8 mb-20">
        <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center gap-4 text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{isEn ? 'Regulatory Rigor' : '国际权威准入'}</span>
            </div>
          </div>
          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] leading-[1.1] font-normal text-[#161614] text-center">
            {isEn ? 'Certified for Global Healthcare Markets' : '严苛通过全球主流医疗法规认证'}
          </h2>
          <p className="font-instrument text-base text-[#3B3B3B] leading-[1.5] max-w-[660px] text-center font-normal">
            {isEn
              ? 'Our devices meet strict international regulatory standards, ensuring seamless hospital procurement and tender compliance worldwide.'
              : '全面获得美国FDA、欧盟CE-MDR及MDSAP多国医疗准入，为全球分销商提供完备技术文档与合规通关支持。'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-neutral-200/90 shadow-2xs hover:border-[#D80048]/40 transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <h4 className="text-sm font-bold text-neutral-900">{cert.name}</h4>
              </div>
              <p className="text-xs text-neutral-500 pl-7">{cert.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ESG & Sustainability Commitment */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 mb-20">
        <div className="bg-[#161614] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div className="w-full max-w-3xl mx-auto mb-10 flex flex-col items-center justify-center text-center relative z-10 gap-3">
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D80048]/20 text-[#D80048] border border-[#D80048]/30 text-xs font-semibold uppercase tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
                <span>{isEn ? 'Corporate Social Responsibility' : '企业社会责任与可持续发展'}</span>
              </div>
            </div>
            <h2 className="font-castoro text-2xl sm:text-3xl md:text-[38px] leading-[1.15] font-normal text-white text-center">
              {isEn ? 'Sustainable Manufacturing & Care' : '绿色智造，关爱生命'}
            </h2>
            <p className="font-instrument text-sm sm:text-base text-neutral-300 leading-[1.5] max-w-[660px] text-center font-normal">
              {isEn
                ? 'We believe medical technology must be environmentally mindful and socially responsible across all production lifecycles.'
                : '将环境低碳、能耗优化与社会公益融入研发制造全生命周期，推动医疗健康产业可持续演进。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {esgPillars.map((item, i) => {
              const IconPillar = item.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#D80048]/20 text-[#D80048] flex items-center justify-center mb-4">
                      <IconPillar className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {isEn ? item.titleEn : item.titleZh}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {isEn ? item.descEn : item.descZh}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 text-xs font-mono text-[#D80048] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#D80048]" />
                    <span>{item.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 10. Frequently Asked Questions (FAQ Accordion) */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 mb-20">
        <div className="w-full">
          <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center gap-4 text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
                <span>{isEn ? 'Common Inquiries' : '常见问题'}</span>
              </div>
            </div>
            <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] leading-[1.1] font-normal text-[#161614] text-center">
              {isEn ? 'Frequently Asked Questions' : '常见问答'}
            </h2>
            <p className="font-instrument text-base text-[#3B3B3B] leading-[1.5] max-w-[660px] text-center font-normal">
              {isEn
                ? 'Key questions regarding international regulatory clearances, manufacturing lead times, and distributor partnerships.'
                : '涵盖国际市场准入认证、OEM/ODM生产交期及全球分销合作政策。'}
            </p>
          </div>

          <div className="space-y-4 w-full">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs ${
                    isOpen ? 'border-[#D80048]/40 shadow-sm' : 'border-neutral-200/90 hover:border-neutral-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/60 transition-colors group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-[#D80048]/10 text-[#D80048] flex items-center justify-center shrink-0 group-hover:bg-[#D80048]/20 transition-colors">
                        <HelpCircle className="w-4 h-4 text-[#D80048]" />
                      </div>
                      <span className="font-bold text-neutral-900 text-sm sm:text-base group-hover:text-neutral-950">
                        {isEn ? faq.qEn : faq.qZh}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#D80048]/10 group-hover:bg-[#D80048]/20 flex items-center justify-center shrink-0 text-[#D80048] transition-colors">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#D80048]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#D80048]" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4 bg-neutral-50/30 pl-5 sm:pl-16">
                      {isEn ? faq.aEn : faq.aZh}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 11. Existing CTA Box */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8">
        <div className="bg-[#161614] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div>
            <h3 className="text-2xl sm:text-3xl font-castoro text-white">
              {isEn ? 'Looking for an OEM/ODM or Distribution Partner?' : '寻找合规稳定的医用设备生产制造与分销伙伴？'}
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-xl">
              {isEn
                ? 'Join over 50 global healthcare distributors and pharmaceutical brands that rely on HOMED engineering.'
                : '携手全球50余国优质分销伙伴，共享宏济医疗在呼吸健康领域的自主技术与规模制造优势。'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <button
              onClick={onOpenDistributor}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#D80048] hover:bg-black text-white text-sm font-semibold transition-all duration-300 shadow-md shadow-[#D80048]/25 hover:shadow-black/20 cursor-pointer active:scale-98"
            >
              <span>{isEn ? 'Become a Distributor' : '成为全球分销商'}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('/shop')}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#D80048] hover:bg-black text-white text-sm font-semibold transition-all duration-300 shadow-md shadow-[#D80048]/25 hover:shadow-black/20 cursor-pointer active:scale-98"
            >
              <span>{isEn ? 'Browse Catalog' : '查看产品目录'}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Star } from 'lucide-react';
import { Language, siteContent, sampleTestimonials } from '../data/content';

interface TestimonialsSectionProps {
  lang: Language;
}

// Map real clinical and distributor personas to the testimonials
const testimonialsWithAvatars = [
  {
    ...sampleTestimonials[0],
    handleEn: '@global_respiratory',
    handleZh: '@global_respiratory',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=160&auto=format&fit=crop&q=80',
    stars: 5,
  },
  {
    ...sampleTestimonials[1],
    handleEn: '@pulmo_europe',
    handleZh: '@pulmo_europe',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=160&auto=format&fit=crop&q=80',
    stars: 5,
  },
  {
    ...sampleTestimonials[2],
    handleEn: '@pharma_inhalation',
    handleZh: '@pharma_inhalation',
    avatar: 'https://res.cloudinary.com/hbstqwkk/image/upload/v1791810107/ca14b5fb92df362c2797f5aec7d3d032_j2krv9.jpg',
    stars: 5,
  },
  {
    id: 'test-4',
    partnerEn: 'Pediatric Pulmonology Center',
    partnerZh: '儿童呼吸诊疗中心',
    roleEn: 'Head of Pediatric Respiratory Care · Guangzhou, China',
    roleZh: '儿科呼吸专科主任医师 · 中国广州',
    locationEn: 'Guangzhou, China',
    locationZh: '中国广州',
    quoteEn: 'The intelligent atomization workstation deployed in our pediatric ward reduced hospital cross-infection and streamlined clinical nurse dosage administration for hundreds of daily treatments.',
    quoteZh: '在我们儿科门诊病区落地的智能中心雾化系统，有效规避了院感交叉感染风险，实现了信息化智能计时与医嘱下达，大幅降低了护理人员的工作负荷。',
    verifiedLabelEn: 'Clinical Hospital Partner',
    verifiedLabelZh: '临床医院合作伙伴',
    handleEn: '@pediatric_resp',
    handleZh: '@pediatric_resp',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&auto=format&fit=crop&q=80',
    stars: 5,
  },
];

// Duplicate for infinite ticker marquee
const marqueeItems = [
  ...testimonialsWithAvatars,
  ...testimonialsWithAvatars,
  ...testimonialsWithAvatars,
  ...testimonialsWithAvatars,
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const isEn = lang === 'en';
  const t = siteContent[lang].reviews;

  return (
    <section className="relative w-full bg-white py-[3em] border-b border-neutral-200/60 overflow-hidden select-none z-[1] flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-8 md:gap-10">
        
        {/* Cleannix Title & Text Header Container */}
        <div className="w-full max-w-[1300px] px-6 sm:px-8 mx-auto flex flex-col items-center justify-center gap-4 text-center">
          {/* Section Tag Badge */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{t.label}</span>
            </div>
          </div>

          {/* Cleannix Castoro Heading (42px) with HOMED Content */}
          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] leading-[1.1] font-normal text-[#161614] capitalize text-center">
            {lang === 'en' ? (
              <>
                <span className="block">Built on Quality</span>
                <span className="block mt-1 sm:mt-1.5">Trusted in Healthcare</span>
              </>
            ) : (
              <>
                <span className="block">以卓越品质立身</span>
                <span className="block mt-1 sm:mt-1.5">获全球医疗机构信赖</span>
              </>
            )}
          </h2>

          {/* Cleannix Paragraph with HOMED Subtitle */}
          <p className="font-instrument text-base text-[#3B3B3B] leading-[1.5] max-w-[660px] text-center font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Cleannix Testimonial Ticker with Left & Right Linear Fade Gradients */}
        <div className="relative w-full overflow-hidden">
          {/* Left Linear Mask (13% width, linear-gradient 90deg from #fff to transparent) */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[10%] sm:w-[13%] z-10"
            style={{
              background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          />

          {/* Right Linear Mask (13% width, linear-gradient 90deg from transparent to #fff) */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[10%] sm:w-[13%] z-10"
            style={{
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
            }}
          />

          {/* Scrolling Ticker Track */}
          <div className="animate-marquee-left flex items-stretch gap-6 sm:gap-8 md:gap-10 py-3">
            {marqueeItems.map((item, idx) => {
              const quote = isEn ? item.quoteEn : item.quoteZh;
              const partner = isEn ? item.partnerEn : item.partnerZh;
              const role = isEn ? item.roleEn : item.roleZh;
              const handle = isEn ? item.handleEn : item.handleZh;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 rounded-[20px] bg-[#F8F7FA] p-6 flex flex-col justify-between gap-8 md:gap-10 cursor-default border border-neutral-200/60 shadow-2xs hover:shadow-md transition-shadow duration-300"
                >
                  {/* Card Content & Rating */}
                  <div className="flex flex-col items-start gap-4 w-full">
                    {/* 5 Star Container with Yellow Stars */}
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(item.stars)].map((_, s) => (
                        <Star
                          key={s}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Verified Partnership Tag */}
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                      {isEn ? item.verifiedLabelEn : item.verifiedLabelZh}
                    </div>

                    {/* Testimonial Quote */}
                    <p className="font-instrument text-sm sm:text-base text-[#3B3B3B] leading-[1.5] font-normal text-left">
                      "{quote}"
                    </p>
                  </div>

                  {/* Image & Name Footer matching Cleannix */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-200/50">
                    {/* 56px Avatar */}
                    <div className="w-[52px] h-[52px] rounded-full overflow-hidden shrink-0 border border-neutral-200">
                      <img
                        src={item.avatar}
                        alt={partner}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>

                    {/* Name, Handle & Role */}
                    <div className="flex flex-col items-start gap-0.5 min-w-0">
                      <div className="font-instrument text-sm sm:text-base font-semibold text-[#161614] leading-[1.3] truncate max-w-[280px]">
                        {partner}
                      </div>
                      <div className="font-instrument text-xs text-neutral-500 truncate max-w-[280px]">
                        {handle} · {role}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

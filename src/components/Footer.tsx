import React, { useRef, useState, useEffect } from 'react';
import { Globe, Mail, MapPin, ArrowUp, Pause, Play, ArrowRight, ExternalLink } from 'lucide-react';
import { Language, siteContent } from '../data/content';

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenDistributor: () => void;
  onOpenCatalogue: () => void;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onToggleLang,
  onOpenDistributor,
  onOpenCatalogue,
  onNavigate,
}) => {
  const t = siteContent[lang].footer;
  const nav = siteContent[lang].nav;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until user gesture
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0C0E] text-neutral-300 overflow-hidden border-t border-neutral-800 select-none">
      {/* Background Video (Robotic Arms Operating in Industrial Facility) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/hbstqwkk/video/upload/v1791465827/Robotic_arms_operating_industria__20261008140800_dy32nw.mp4"
          poster="https://res.cloudinary.com/hbstqwkk/image/upload/v1791810635/manufacturing_cleanroom_1791460422744_1_knn9jc.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Dark Gradient Overlay matching the Hero section */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 12, 14, 0.45) 0%, rgba(10, 12, 14, 0.78) 50%, #0A0C0E 100%)',
          }}
        />
      </div>

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-8 pt-16 md:pt-20 pb-8 flex flex-col justify-between">
        
        {/* Upper Zone: Callout, Navigation & Business Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand & Distributor Lead Trigger */}
          <div className="lg:col-span-4 xl:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <a href="#hero" className="flex items-center hover:opacity-90 transition-opacity" aria-label="HOMED Medical">
                <img
                  src="https://res.cloudinary.com/hbstqwkk/image/upload/v1791474452/1728427bbde2784c_1_g7c93u.png"
                  alt="HOMED Medical"
                  className="h-8 md:h-9 w-auto object-contain"
                />
              </a>
              <span className="text-[11px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                Est. 2003
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
              {t.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenDistributor}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>{nav.distributorCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onToggleLang}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'en' ? '中文' : 'English'}</span>
              </button>

              {/* Video pause/play controller */}
              <button
                onClick={toggleVideoPlayback}
                className="p-2.5 text-xs text-white bg-[#D80048] hover:bg-black rounded-full transition-colors cursor-pointer"
                title={isPlaying ? 'Pause background video' : 'Play background video'}
                aria-label="Toggle background video"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Shared Container: 3 columns beside each other */}
          <div className="lg:col-span-8 xl:col-span-7 grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {/* Column 2: Navigation Links */}
            <div className="space-y-3 min-w-0">
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white font-bold">
                {t.colNavTitle}
              </div>
              <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs">
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/');
                      }
                    }}
                    className="text-neutral-300 hover:text-white transition-colors block break-words"
                  >
                    {nav.home}
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/about');
                      }
                    }}
                    className="text-neutral-300 hover:text-white transition-colors block break-words"
                  >
                    {nav.about}
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/shop');
                      }
                    }}
                    className="text-neutral-300 hover:text-white transition-colors block break-words"
                  >
                    {nav.products}
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/about');
                      }
                    }}
                    className="text-neutral-300 hover:text-white transition-colors block break-words"
                  >
                    {nav.manufacturing}
                  </a>
                </li>
                <li>
                  <a
                    href="/news"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/news');
                      }
                    }}
                    className="text-neutral-300 hover:text-white transition-colors block break-words"
                  >
                    {nav.news}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/contact');
                      }
                    }}
                    className="text-neutral-300 hover:text-white transition-colors block break-words"
                  >
                    {nav.contact}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Business & Partnerships */}
            <div className="space-y-3 min-w-0">
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white font-bold">
                {t.colBusinessTitle}
              </div>
              <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs">
                <li>
                  <button
                    onClick={onOpenDistributor}
                    className="text-neutral-300 hover:text-white text-left transition-colors cursor-pointer block break-words"
                  >
                    {t.businessLinks[0]}
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenCatalogue}
                    className="text-neutral-300 hover:text-white text-left transition-colors cursor-pointer block break-words"
                  >
                    {t.businessLinks[1]}
                  </button>
                </li>
                <li>
                  <a href="#manufacturing" className="text-neutral-300 hover:text-white transition-colors block break-words">
                    {t.businessLinks[2]}
                  </a>
                </li>
                <li>
                  <button
                    onClick={onOpenDistributor}
                    className="text-neutral-300 hover:text-white text-left transition-colors cursor-pointer block break-words"
                  >
                    {t.businessLinks[3]}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact HQ */}
            <div className="space-y-3 min-w-0">
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white font-bold">
                {t.colContactTitle}
              </div>
              <ul className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-xs text-neutral-300">
                <li className="flex items-start gap-1.5 sm:gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D80048] shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line leading-relaxed text-neutral-300 break-words">{t.address}</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#D80048] shrink-0" />
                  <a href={`mailto:${t.email}`} className="text-neutral-300 hover:text-white transition-colors font-mono break-all">
                    {t.email}
                  </a>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#D80048] shrink-0" />
                  <a
                    href="https://www.homedgroup.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-white transition-colors font-mono break-all"
                  >
                    {t.website}
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Centerpiece Zone: Giant Transparent Faded Brand Watermark matching https://fittyhealthyproduct.framer.website/ */}
        <div className="py-6 sm:py-10 md:py-14 flex flex-col items-center justify-center text-center overflow-visible">
          <div className="w-full max-w-[1134px] mx-auto flex flex-col items-center">
            <div
              className="w-full select-none transition-transform hover:scale-[1.01] duration-500 cursor-default"
              style={{
                WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0) 100%)',
              }}
            >
              <svg
                viewBox="0 0 1064 260"
                className="w-full h-auto overflow-visible pointer-events-none block"
                role="img"
                aria-label="HOMED"
              >
                <defs>
                  <linearGradient id="fittyHomedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                    <stop offset="30%" stopColor="#ffffff" stopOpacity="0.58" />
                    <stop offset="60%" stopColor="#ffffff" stopOpacity="0.28" />
                    <stop offset="85%" stopColor="#ffffff" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <text
                  x="532"
                  y="208"
                  textAnchor="middle"
                  fill="url(#fittyHomedGrad)"
                  textLength="1030"
                  lengthAdjust="spacing"
                  style={{
                    fontFamily: '"Montserrat", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 900,
                    fontSize: '255px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  HOMED
                </text>
              </svg>
            </div>

            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 mt-4 sm:mt-5">
              {lang === 'en'
                ? 'Respiratory Healthcare Technology · Intelligent Cleanroom Manufacturing'
                : '呼吸健康医疗科技 · 智能洁净医疗器械智造基地'}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Certifications & Back to top */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} {t.rights}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <span className="font-mono text-[11px] text-neutral-300">{t.compliance}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D80048] hover:bg-black text-white text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-98"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

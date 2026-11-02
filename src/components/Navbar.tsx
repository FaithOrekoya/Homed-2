import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Globe,
  ChevronDown,
  Menu,
  X,
  Wind,
  Droplets,
  Stethoscope,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../data/content';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenDistributor: () => void;
  onOpenSearch: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenDistributor,
  onOpenSearch,
  currentPath,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { totalCount, setIsCartOpen } = useCart();
  const isEn = lang === 'en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasDarkHero = ['/', '/about', '/shop', '/contact', '/news'].includes(currentPath.split('?')[0]);
  const isLightNav = isScrolled || mobileMenuOpen || !hasDarkHero;

  const handleMouseEnterProducts = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 180);
  };

  const navLinks = [
    { label: isEn ? 'Home' : '首页', path: '/' },
    {
      label: isEn ? 'Products' : '产品方案',
      path: '/shop',
      hasDropdown: true,
    },
    { label: isEn ? 'About Us' : '关于宏济', path: '/about' },
    { label: isEn ? 'Blog' : '临床资讯', path: '/news' },
    { label: isEn ? 'Contact Us' : '联系我们', path: '/contact' },
  ];

  const productCategories = [
    {
      nameEn: 'Oxygen Therapy',
      nameZh: '医用制氧与氧疗',
      descEn: 'Portable POC-V5 & Continuous 5L/10L stations',
      descZh: '便携脉冲制氧机与5L/10L医用大流量台式机',
      path: '/shop?category=oxygen',
      icon: Wind,
    },
    {
      nameEn: 'Nebulizers',
      nameZh: '医用雾化治疗',
      descEn: 'Titanium vibrating mesh Mini-Air Pro series',
      descZh: '手持钛金微网雾化器与临床吸入系统',
      path: '/shop?category=nebulizer',
      icon: Droplets,
    },
    {
      nameEn: 'Airway Care',
      nameZh: '气道冲洗与护理',
      descEn: 'Isotonic saline nasal irrigators & suction devices',
      descZh: '0.9%生理盐水多模式鼻腔冲洗与气道吸引器',
      path: '/shop?category=suction',
      icon: Stethoscope,
    },
    {
      nameEn: 'Hospital Systems',
      nameZh: '医院临床与诊断',
      descEn: 'Cardiopulmonary NT-proBNP IVD & central stations',
      descZh: '心肺功能检测试剂盒与院端智慧集中雾化室',
      path: '/shop?category=hospital',
      icon: Activity,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-8 transition-all duration-300 ${
        isLightNav
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-200/80 py-3.5'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="w-full max-w-[1300px] mx-auto flex items-center justify-between">
        
        {/* Left Side Group: Logo + Main Nav Links directly beside it */}
        <div className="flex items-center gap-6 xl:gap-8">
          
          {/* 1. Far Left: Brand Identity Logo (HOMED 家瑞康) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="flex items-center hover:opacity-90 transition-opacity shrink-0"
            aria-label="HOMED Medical (家瑞康) - Homepage"
          >
            <img
              src="https://res.cloudinary.com/hbstqwkk/image/upload/v1791474453/82e9cf6969e217fc_kbi9rz.png"
              alt="HOMED 家瑞康"
              className={`h-8 sm:h-9 w-auto object-contain transition-all duration-300 ${
                isLightNav ? '' : 'brightness-0 invert'
              }`}
              referrerPolicy="no-referrer"
            />
          </a>

          {/* 2. Center / Main Navigation Links (Cleanly spaced beside the logo) */}
          <nav
            className={`hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium transition-colors duration-200 ${
              isLightNav ? 'text-neutral-700' : 'text-neutral-200'
            }`}
          >
            {navLinks.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.path);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={handleMouseEnterProducts}
                    onMouseLeave={handleMouseLeaveProducts}
                  >
                    <button
                      onClick={() => onNavigate('/shop')}
                      className={`flex items-center gap-1 whitespace-nowrap transition-colors py-1 cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#D80048] hover:after:w-full after:transition-all after:duration-200 ${
                        isActive
                          ? `${isLightNav ? 'text-neutral-900' : 'text-white'} font-semibold after:w-full`
                          : isLightNav
                          ? 'hover:text-neutral-900 after:w-0'
                          : 'hover:text-white after:w-0'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          productsDropdownOpen ? 'rotate-180 text-[#D80048]' : ''
                        }`}
                      />
                    </button>

                    {/* Products Dropdown Menu */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-150 p-3.5 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                        <div className="px-2.5 py-1.5 mb-1.5 border-b border-neutral-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                            {isEn ? 'Device Categories' : '器械方案分类'}
                          </span>
                          <span className="text-[10px] font-mono text-[#D80048]">
                            FDA · CE · ISO
                          </span>
                        </div>
                        <div className="space-y-1">
                          {productCategories.map((cat, idx) => {
                            const IconComponent = cat.icon;
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  setProductsDropdownOpen(false);
                                  onNavigate(cat.path);
                                }}
                                className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFF5F8] group text-left transition-colors cursor-pointer"
                              >
                                <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-[#FFF0F4] text-neutral-600 group-hover:text-[#D80048] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold text-neutral-800 group-hover:text-[#D80048] transition-colors">
                                    {isEn ? cat.nameEn : cat.nameZh}
                                  </div>
                                  <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                    {isEn ? cat.descEn : cat.descZh}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-2 pt-2 border-t border-neutral-100">
                          <button
                            onClick={() => {
                              setProductsDropdownOpen(false);
                              onNavigate('/shop');
                            }}
                            className="w-full py-2 px-3 text-xs font-semibold text-[#D80048] hover:text-black bg-[#FFF5F8] hover:bg-neutral-100 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <span>{isEn ? 'Explore All Products (/shop)' : '浏览全部产品商城 (/shop)'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.path);
                  }}
                  className={`whitespace-nowrap transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#D80048] hover:after:w-full after:transition-all after:duration-200 ${
                    isActive
                      ? `${isLightNav ? 'text-neutral-900' : 'text-white'} font-semibold after:w-full`
                      : isLightNav
                      ? 'hover:text-neutral-900 after:w-0'
                      : 'hover:text-white after:w-0'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* 3. Right Side: Utility Icons & Action Buttons (Exact Order) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Right Item 1: Search Icon / Bar (Direct product and model lookup) */}
          <button
            onClick={onOpenSearch}
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              isLightNav
                ? 'text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/60'
                : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15'
            }`}
            title={isEn ? 'Search products & models' : '搜索产品与型号'}
            aria-label="Direct product and model lookup"
          >
            <Search className={`w-4 h-4 transition-colors ${isLightNav ? 'text-black' : 'text-white'}`} />
            <span className="hidden xl:inline text-xs font-normal opacity-80">
              {isEn ? 'Search models...' : '搜索型号...'}
            </span>
            <kbd
              className={`hidden xl:inline px-1.5 py-0.2 text-[9px] font-mono rounded ${
                isLightNav ? 'bg-white text-neutral-500 border border-neutral-200' : 'bg-white/20 text-white'
              }`}
            >
              ⌘K
            </kbd>
          </button>

          {/* Right Item 2: Cart Icon with Badge Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 rounded-full transition-colors cursor-pointer ${
              isLightNav
                ? 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                : 'text-white hover:text-white hover:bg-white/10'
            }`}
            title={isEn ? 'Open Cart / Inquiries' : '打开询价车'}
            aria-label={`Shopping cart containing ${totalCount} items`}
          >
            <ShoppingBag className="w-4 sm:w-[18px] h-4 sm:h-[18px]" />
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#D80048] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs tabular-nums">
                {totalCount}
              </span>
            )}
          </button>

          {/* Right Item 3: Language Switcher Pill (🌐 中文 / EN) - Compact rounded crimson pill button (#D80048) */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors cursor-pointer shadow-xs active:scale-98 shrink-0"
            title="Switch Language / 切换语言 (中文 / EN)"
            aria-label="Switch Language (中文 / EN)"
          >
            <Globe className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-wide">
              {isEn ? '中文' : 'EN'}
            </span>
          </button>

          {/* Right Item 4: Primary Action Button Pill (Become a Distributor) - Bold solid crimson pill button (#D80048) */}
          <button
            onClick={onOpenDistributor}
            className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs sm:text-[13px] font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-all duration-200 whitespace-nowrap shadow-xs cursor-pointer active:scale-98 shrink-0"
          >
            {isEn ? 'Become a Distributor' : '成为分销商'}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              isLightNav
                ? 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                : 'text-white hover:text-white hover:bg-white/10'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-5 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Brand Row */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/hbstqwkk/image/upload/v1791474453/82e9cf6969e217fc_kbi9rz.png"
                alt="HOMED 家瑞康"
                className="h-7 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-bold text-neutral-800">HOMED 家瑞康</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-xs text-neutral-700 rounded-full"
            >
              <Search className="w-3.5 h-3.5 text-[#D80048]" />
              <span>{isEn ? 'Search' : '搜索'}</span>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onNavigate(item.path);
                }}
                className={`flex items-center justify-between py-2 text-sm font-medium border-b border-neutral-100 last:border-0 ${
                  currentPath === item.path ? 'text-[#D80048] font-bold' : 'text-neutral-800'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            ))}

            {/* Mobile Categories Accordion preview */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 my-1 space-y-1.5">
              <span className="text-[11px] font-bold uppercase text-neutral-400 block mb-1">
                {isEn ? 'Quick Category Access' : '产品快速入口'}
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {productCategories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(cat.path);
                    }}
                    className="p-2 text-left bg-white rounded-lg border border-neutral-200/60 text-xs font-medium text-neutral-700 hover:text-[#D80048] hover:border-[#D80048]/30 transition-colors"
                  >
                    {isEn ? cat.nameEn : cat.nameZh}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D80048]" />
                <span>
                  {isEn ? `View Cart (${totalCount})` : `查看询价车 (${totalCount})`}
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDistributor();
                }}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors text-center cursor-pointer shadow-xs"
              >
                {isEn ? 'Become a Distributor' : '成为分销商'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  ShoppingBag,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Wind,
  Droplets,
  Stethoscope,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { Language, sampleProducts, ProductItem } from '../data/content';
import { useCart } from '../context/CartContext';

interface ShopPageProps {
  lang: Language;
  onSelectProduct: (p: ProductItem) => void;
  onOpenDistributor: (productModel?: string) => void;
  initialCategory?: string;
  onNavigate?: (path: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  lang,
  onSelectProduct,
  onOpenDistributor,
  initialCategory,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const { addToCart } = useCart();
  const isEn = lang === 'en';

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { key: 'all', labelEn: 'All Solutions', labelZh: '全部方案', icon: Filter },
    { key: 'oxygen', labelEn: 'Oxygen Therapy', labelZh: '医用制氧与氧疗', icon: Wind },
    { key: 'nebulizer', labelEn: 'Nebulizers', labelZh: '医用雾化治疗', icon: Droplets },
    { key: 'suction', labelEn: 'Airway Care', labelZh: '气道冲洗与护理', icon: Stethoscope },
    { key: 'hospital', labelEn: 'Hospital Systems', labelZh: '医院临床与诊断', icon: Activity },
  ];

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      const matchCat = activeCategory === 'all' || product.categoryKey === activeCategory;
      if (!matchCat) return false;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;

      const inName =
        product.nameEn.toLowerCase().includes(q) || product.nameZh.toLowerCase().includes(q);
      const inModel = product.model.toLowerCase().includes(q);
      const inDesc =
        product.shortDescEn.toLowerCase().includes(q) ||
        product.shortDescZh.toLowerCase().includes(q);

      return inName || inModel || inDesc;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: ProductItem) => {
    addToCart(product, 1);
    setAddedNotice(product.model);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Toast Notification */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-[#D80048] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium">
            {isEn
              ? `Added ${addedNotice} to your equipment cart!`
              : `已将 ${addedNotice} 加入采购询价车！`}
          </span>
        </div>
      )}

      {/* 1. Full-width Hero Section (Matches About Us hero) */}
      <section className="relative w-full overflow-hidden select-none bg-[#161614] text-white pt-[170px] pb-[70px] sm:pt-[190px] sm:pb-[85px] md:pt-[210px] md:pb-[95px] px-6 sm:px-8 min-h-[420px] sm:min-h-[460px] md:min-h-[480px] flex flex-col justify-center items-center mb-12 sm:mb-16">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://res.cloudinary.com/hbstqwkk/image/upload/v1791810635/manufacturing_cleanroom_1791460422744_1_knn9jc.jpg"
            alt={isEn ? 'Medical device engineering and products' : '医疗器械智造与产品方案'}
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(22, 22, 20, 0.45) 0%, rgba(22, 22, 20, 0.78) 55%, #161614 100%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-castoro text-white tracking-tight leading-tight">
            {isEn ? 'Products' : '产品方案'}
          </h1>

          <div className="flex items-center gap-2 sm:gap-2.5 mt-3 sm:mt-4 text-sm sm:text-base font-medium text-white/90">
            <button
              onClick={() => onNavigate?.('/')}
              className="text-white/80 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {isEn ? 'Home' : '首页'}
            </button>
            <span className="text-white/60 select-none text-xs sm:text-sm">»</span>
            <span className="text-white font-semibold">
              {isEn ? 'Products' : '产品方案'}
            </span>
          </div>
        </div>
      </section>

      {/* Centered Catalog Header */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 mb-10">
        <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center gap-4 text-center mb-8">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{isEn ? 'Master Equipment Catalog' : 'HOMED 产品商城与方案总览'}</span>
            </div>
          </div>
          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal text-[#161614] text-center max-w-3xl">
            {isEn ? 'Respiratory Medical Devices & Solutions' : '呼吸健康医疗设备与解决方案'}
          </h2>
          <p className="font-instrument text-base text-[#3B3B3B] leading-[1.5] max-w-[660px] text-center font-normal">
            {isEn
              ? 'Direct manufacturer wholesale pricing, CE-MDR and US FDA 510(k) cleared devices, with comprehensive OEM/ODM custom development capabilities.'
              : '厂家直销批发通道，持有欧盟CE-MDR与美国FDA 510(k)权威认证，支持全球分销与OEM/ODM联合定制。'}
          </p>

          {/* Quick Search Centered */}
          <div className="relative w-full max-w-md mx-auto mt-2">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Filter models or keywords...' : '搜索型号或关键词...'}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-full text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D80048] shadow-2xs"
            />
          </div>
        </div>

        {/* Category Navigation Bar Centered */}
        <div className="flex items-center justify-center gap-2 mt-6 overflow-x-auto no-scrollbar py-1">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = activeCategory === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D80048] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 hover:border-neutral-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isEn ? c.labelEn : c.labelZh}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((p) => {
            const name = isEn ? p.nameEn : p.nameZh;
            const desc = isEn ? p.shortDescEn : p.shortDescZh;
            const badges = isEn ? p.badgesEn : p.badgesZh;
            const priceEst =
              p.categoryKey === 'oxygen' ? 850 : p.categoryKey === 'nebulizer' ? 38 : p.categoryKey === 'hospital' ? 120 : 25;

            return (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border border-neutral-200/80 hover:border-[#D80048]/40 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Product Image Area */}
                <div
                  className="relative aspect-4/3 bg-neutral-50 p-6 flex items-center justify-center overflow-hidden border-b border-neutral-100 cursor-pointer"
                  onClick={() => onSelectProduct(p)}
                >
                  <img
                    src={p.image}
                    alt={name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D80048] bg-white px-2 py-0.5 rounded shadow-2xs border border-[#D80048]/20">
                      {p.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-mono text-neutral-500 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-neutral-200">
                      {p.model}
                    </span>
                  </div>
                </div>

                {/* Product Info Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => onSelectProduct(p)}
                      className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#D80048] transition-colors cursor-pointer leading-snug"
                    >
                      {name}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                      {desc}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {badges.map((b, i) => (
                        <span
                          key={i}
                          className="text-[11px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Compliance row */}
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-neutral-100 text-[11px] text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{p.compliance[0]}</span>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-neutral-400 block leading-tight">
                        {isEn ? 'Est. Wholesale Base' : '预估批发基准'}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-neutral-900 tabular-nums font-mono">
                        ${priceEst} USD
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(p)}
                        className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors"
                        title={isEn ? 'View Technical Specs' : '查看规格参数'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Add to Cart' : '加入询价车'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wholesale Banner */}
        <div className="mt-16 bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D80048]">
              {isEn ? 'B2B Wholesale & OEM/ODM' : '大宗采购与定制代工'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-castoro mt-2">
              {isEn
                ? 'Need Customized Packaging or Hospital Ward Solutions?'
                : '需要定制品牌包装或医院集中雾化工程方案？'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
              {isEn
                ? 'HOMED supplies global healthcare authorities and multinational pharmaceutical companies with high-volume cleanroom manufacturing, customized firmware, and regulatory dossiers.'
                : '宏济医疗拥有年产200万台高规格十万级洁净制造产能，可针对全球医院、制药企业及区域总代理提供全套合规申报与定制化生产支持。'}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenDistributor()}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#D80048] hover:bg-white hover:text-neutral-900 rounded-full transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>{isEn ? 'Request Wholesale Quotation' : '索取大宗批发报价'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

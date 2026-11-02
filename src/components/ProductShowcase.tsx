import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, ProductItem, sampleProducts, siteContent } from '../data/content';

interface ProductShowcaseProps {
  lang: Language;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  lang,
  onSelectProduct,
}) => {
  const t = siteContent[lang].products;
  const isEn = lang === 'en';
  const [activeFilter, setActiveFilter] = useState<'all' | 'oxygen' | 'nebulizer' | 'hospital' | 'suction'>('all');
  const [showAll, setShowAll] = useState(false);

  const filteredProducts = activeFilter === 'all'
    ? sampleProducts
    : sampleProducts.filter((p) => p.categoryKey === activeFilter);

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 3);

  const handleFilterChange = (key: typeof activeFilter) => {
    setActiveFilter(key);
    setShowAll(false);
  };

  return (
    <section id="products" className="py-[3em] bg-[#FAFAFA] border-b border-neutral-200/60 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-3.5 text-center mb-8">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{t.label}</span>
            </div>
          </div>
          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] font-normal text-[#171A20] tracking-tight leading-tight text-center">
            {lang === 'en' ? (
              <>
                <span className="block">Respiratory Solutions</span>
                <span className="block mt-1 sm:mt-1.5">Designed for Better Care</span>
              </>
            ) : (
              <>
                <span className="block">专为卓越护理打造的</span>
                <span className="block mt-1 sm:mt-1.5">呼吸解决方案</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl text-center">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Tabs Bar (Category Segmented Button Controls) */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-200/60 rounded-full max-w-full overflow-x-auto no-scrollbar">
            {(
              [
                { key: 'all', label: t.filters.all },
                { key: 'oxygen', label: t.filters.oxygen },
                { key: 'nebulizer', label: t.filters.nebulizer },
                { key: 'hospital', label: t.filters.hospital },
                { key: 'suction', label: t.filters.suction },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleFilterChange(tab.key)}
                className={`px-5 py-2 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.key
                    ? 'bg-[#D80048] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-black hover:bg-black/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Grid (matching Florida Plant Solutions Shop by Category layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => {
            const name = isEn ? product.nameEn : product.nameZh;
            const shortDesc = isEn ? product.shortDescEn : product.shortDescZh;
            const badges = isEn ? product.badgesEn : product.badgesZh;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="relative min-h-[480px] sm:min-h-[520px] rounded-3xl overflow-hidden text-white cursor-pointer group shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 isolate bg-neutral-900 border border-neutral-200/80"
              >
                {/* Product / Category Image */}
                <img
                  src={product.image}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 z-[-2] w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Shade (exact Florida Plant Solutions shade) */}
                <span
                  className="absolute inset-0 z-[-1] pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(14, 17, 24, 0.94) 0%, rgba(14, 17, 24, 0.45) 58%, rgba(14, 17, 24, 0.08) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Top Floating Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-black/50 backdrop-blur-md text-white/95 border border-white/15">
                    {product.model}
                  </span>
                  {badges[0] && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#D80048] text-white shadow-xs">
                      {badges[0]}
                    </span>
                  )}
                </div>

                {/* Bottom Content Area */}
                <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8 flex flex-col items-start z-10">
                  <small className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#D80048] bg-white/95 px-3 py-1 rounded-full backdrop-blur-xs shadow-xs mb-3 inline-block">
                    {isEn ? 'Shop Collection' : '精选系列'} · {product.category}
                  </small>
                  
                  <h3 className="font-castoro text-2xl sm:text-3xl text-white font-normal leading-[1.02] tracking-tight mb-2.5 group-hover:text-white transition-colors">
                    {name}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-[320px] font-normal mb-5 line-clamp-2">
                    {shortDesc}
                  </p>

                  <b className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white tracking-normal group-hover:translate-x-1.5 transition-transform duration-200">
                    <span>{isEn ? 'Explore Collection' : '了解产品详情'}</span>
                    <ArrowRight className="w-4 h-4 text-[#D80048]" />
                  </b>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Products Button */}
        {(filteredProducts.length > 3 || (activeFilter !== 'all' && sampleProducts.length > 3)) && (
          <div className="mt-10 sm:mt-12 flex items-center justify-center">
            <button
              onClick={() => {
                if (activeFilter !== 'all' && filteredProducts.length <= 3) {
                  setActiveFilter('all');
                  setShowAll(true);
                } else {
                  setShowAll((prev) => !prev);
                }
              }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#D80048] hover:bg-black text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-[#D80048]/20 hover:shadow-black/20 cursor-pointer group active:scale-98"
            >
              <span>
                {showAll
                  ? (isEn ? 'Show Less' : '收起')
                  : (isEn ? 'View all products' : '查看全部产品')}
              </span>
              <ArrowRight
                className={`w-4 h-4 text-white transition-transform duration-300 ${
                  showAll ? '-rotate-90' : 'group-hover:translate-x-1'
                }`}
              />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

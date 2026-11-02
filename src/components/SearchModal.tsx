import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, ArrowRight, Activity, ExternalLink, ShoppingBag } from 'lucide-react';
import { Language, sampleProducts, ProductItem } from '../data/content';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectProduct: (product: ProductItem) => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectProduct,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();
  const isEn = lang === 'en';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleProducts.filter((product) => {
      const matchCat = activeCategory === 'all' || product.categoryKey === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;

      const inNameEn = product.nameEn.toLowerCase().includes(q);
      const inNameZh = product.nameZh.toLowerCase().includes(q);
      const inModel = product.model.toLowerCase().includes(q);
      const inCategory = product.category.toLowerCase().includes(q);
      const inDescEn = product.shortDescEn.toLowerCase().includes(q);
      const inDescZh = product.shortDescZh.toLowerCase().includes(q);
      const inBadges = [...product.badgesEn, ...product.badgesZh].some((b) =>
        b.toLowerCase().includes(q)
      );

      return inNameEn || inNameZh || inModel || inCategory || inDescEn || inDescZh || inBadges;
    });
  }, [query, activeCategory]);

  if (!isOpen) return null;

  const categories = [
    { key: 'all', labelEn: 'All Devices', labelZh: '全部设备' },
    { key: 'oxygen', labelEn: 'Oxygen Therapy', labelZh: '制氧与氧疗' },
    { key: 'nebulizer', labelEn: 'Nebulizers', labelZh: '雾化治疗' },
    { key: 'suction', labelEn: 'Airway Care', labelZh: '气道冲洗与吸引' },
    { key: 'hospital', labelEn: 'Hospital Systems', labelZh: '医院临床系统' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-neutral-100 bg-[#FAFAFA]">
          <Search className="w-5 h-5 text-[#D80048] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isEn
                ? 'Search products by model, name or keyword (e.g. POC-V5, NI-80, Mesh)...'
                : '按型号、产品名称或关键词搜索（如 POC-V5, NI-80, 微网）...'
            }
            className="w-full bg-transparent text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-xs text-neutral-400 hover:text-neutral-700 mr-2 rounded hover:bg-neutral-200/60"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/50 rounded-lg transition-colors ml-1"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-neutral-50/80 border-b border-neutral-100 overflow-x-auto no-scrollbar text-xs">
          <span className="text-neutral-400 font-medium shrink-0 mr-1">
            {isEn ? 'Filter:' : '分类筛选:'}
          </span>
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                activeCategory === c.key
                  ? 'bg-[#D80048] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80'
              }`}
            >
              {isEn ? c.labelEn : c.labelZh}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <Activity className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm font-medium">
                {isEn ? 'No medical devices found matching your criteria.' : '未找到匹配的医疗器械型号。'}
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                {isEn ? 'Try searching by "Oxygen", "Nebulizer", or model "POC-V5"' : '可尝试搜索“制氧机”、“微网雾化器”或型号“POC-V5”'}
              </p>
            </div>
          ) : (
            filteredProducts.map((p) => {
              const name = isEn ? p.nameEn : p.nameZh;
              const desc = isEn ? p.shortDescEn : p.shortDescZh;
              const badges = isEn ? p.badgesEn : p.badgesZh;

              return (
                <div
                  key={p.id}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-neutral-100 hover:border-[#D80048]/30 hover:bg-[#FFF5F8]/40 transition-all cursor-pointer"
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-16 h-16 rounded-lg bg-neutral-100 p-1 shrink-0 overflow-hidden flex items-center justify-center border border-neutral-200/60">
                      <img
                        src={p.image}
                        alt={name}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-[#D80048] tracking-wider">
                          {p.category}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">{p.model}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-neutral-900 truncate group-hover:text-[#D80048] transition-colors">
                        {name}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{desc}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {badges.slice(0, 2).map((b, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p, 1);
                      }}
                      title={isEn ? 'Add to Quote Cart' : '加入询价清单'}
                      className="p-2 text-neutral-600 hover:text-[#D80048] hover:bg-white rounded-lg border border-neutral-200 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-[#D80048] hover:bg-black rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>{isEn ? 'Details' : '查看详情'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-6 py-3 border-t border-neutral-100 bg-[#FAFAFA] flex items-center justify-between text-xs text-neutral-500">
          <span>
            {isEn ? 'Browse full catalog on our ' : '进入产品商城总览 '}
            <button
              onClick={() => {
                onClose();
                onNavigate('/shop');
              }}
              className="text-[#D80048] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>{isEn ? 'Master Shop Page' : '商城页面'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </span>
          <span className="hidden sm:inline font-mono text-[11px] text-neutral-400">
            [ESC] to close
          </span>
        </div>
      </div>
    </div>
  );
};

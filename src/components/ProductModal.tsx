import React from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Activity, ShoppingBag } from 'lucide-react';
import { Language, ProductItem, siteContent } from '../data/content';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenDistributor: (productModel?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  lang,
  onOpenDistributor,
}) => {
  const { addToCart } = useCart();
  if (!isOpen || !product) return null;
  const t = siteContent[lang].products;

  const isEn = lang === 'en';
  const name = isEn ? product.nameEn : product.nameZh;
  const shortDesc = isEn ? product.shortDescEn : product.shortDescZh;
  const badges = isEn ? product.badgesEn : product.badgesZh;
  const specs = isEn ? product.specsEn : product.specsZh;
  const indications = isEn ? product.indicationsEn : product.indicationsZh;

  const handleInquire = () => {
    onClose();
    onOpenDistributor(product.model);
  };

  const handleAdd = () => {
    addToCart(product, 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D80048] bg-[#FFF1F5] px-2.5 py-1 rounded">
              {product.category}
            </span>
            <span className="text-xs text-neutral-500 font-mono">{product.model}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image & Badges */}
            <div className="md:col-span-5 bg-neutral-50 rounded-xl p-4 border border-neutral-100 flex flex-col items-center">
              <div className="w-full aspect-3/4 max-h-[380px] rounded-lg overflow-hidden bg-white relative flex items-center justify-center border border-neutral-100 shadow-xs p-1.5">
                <img
                  src={product.image}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-center"
                />
              </div>
              <div className="w-full mt-4 flex flex-wrap gap-1.5 justify-center">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-neutral-600 bg-white border border-neutral-200 px-2 py-0.5 rounded"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Title & Desc */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#171A20] tracking-tight">
                  {name}
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-0.5">
                  Part / Model: {product.model}
                </p>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                {shortDesc}
              </p>

              {/* Indications */}
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#171A20] mb-1">
                  <Activity className="w-3.5 h-3.5 text-[#D80048]" />
                  {t.modalIndications}
                </div>
                <p className="text-neutral-600 leading-normal">{indications}</p>
              </div>

              {/* Regulatory */}
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-xs text-[#171A20] mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t.modalCompliance}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-neutral-600">
                  {product.compliance.map((c, i) => (
                    <div key={i} className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded border border-emerald-100 text-[11px] font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Specs Table */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
              {t.modalSpecs}
            </h4>
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  {specs.map((spec, i) => (
                    <tr 
                      key={i} 
                      className={`border-b border-neutral-200/60 last:border-b-0 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60'
                      }`}
                    >
                      <td className="py-2.5 px-4 font-semibold text-neutral-700 w-1/3">
                        {spec.label}
                      </td>
                      <td className="py-2.5 px-4 text-neutral-900 font-mono tabular-nums">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-neutral-100 bg-[#FAFAFA]">
          <span className="text-xs text-neutral-500">
            {isEn ? 'OEM/ODM customization available for global distributors' : '支持为全球分销商提供OEM/ODM定制开发'}
          </span>
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleAdd}
              className="px-4 py-2.5 text-xs md:text-sm font-semibold text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-100 rounded-full border border-neutral-300 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#D80048]" />
              <span>{isEn ? 'Add to Cart' : '加入询价车'}</span>
            </button>
            <button
              onClick={handleInquire}
              className="px-5 py-2.5 text-xs md:text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors flex items-center gap-2 shadow-xs cursor-pointer whitespace-nowrap active:scale-98"
            >
              <span>{t.inquireProduct}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

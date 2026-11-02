import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Language } from '../data/content';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

interface CartPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
  onOpenDistributorWithCart?: (notes: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  lang,
  onNavigate,
  onOpenDistributorWithCart,
}) => {
  const { items, totalCount, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const isEn = lang === 'en';

  const handleSendQuote = () => {
    const summaryList = items
      .map(
        (i) =>
          `• ${i.product.model} (${isEn ? i.product.nameEn : i.product.nameZh}) × ${i.quantity} units (Est. $${i.unitPriceEstimate * i.quantity})`
      )
      .join('\n');
    const orderNotes = `Wholesale Cart Inquiries:\n${summaryList}\nTotal Units: ${totalCount} | Est. Value: $${subtotal.toLocaleString()}`;

    if (onOpenDistributorWithCart) {
      onOpenDistributorWithCart(orderNotes);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6">
          <button
            onClick={() => onNavigate('/shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#D80048] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? 'Back to Equipment Catalog' : '返回产品商城'}</span>
          </button>
        </div>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D80048] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D80048]" />
              {isEn ? 'Equipment Procurement Cart' : '医疗器械采购询价清单'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-castoro text-neutral-900 tracking-tight">
              {isEn ? 'Review Selected Medical Devices' : '核对已选医疗设备与采购明细'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-mono">
            {totalCount} {isEn ? (totalCount === 1 ? 'unit selected' : 'units selected') : '台/套设备'}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-castoro text-neutral-900">
              {isEn ? 'Your cart is currently empty' : '您的采购车暂无设备'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-sm mx-auto">
              {isEn
                ? 'Explore our FDA 510(k) and CE-MDR cleared oxygen concentrators, nebulizers, and airway solutions.'
                : '欢迎前往产品商城探索获得权威医疗认证的制氧设备与微网雾化器。'}
            </p>
            <button
              onClick={() => onNavigate('/shop')}
              className="mt-6 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors cursor-pointer"
            >
              {isEn ? 'Explore Catalog (/shop)' : '浏览产品商城 (/shop)'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Table */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  {isEn ? 'Product Details & Quantities' : '设备型号与拟采购数量'}
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-red-600 transition-colors underline cursor-pointer"
                >
                  {isEn ? 'Clear All' : '全部清空'}
                </button>
              </div>

              <div className="divide-y divide-neutral-100">
                {items.map((item) => {
                  const name = isEn ? item.product.nameEn : item.product.nameZh;
                  return (
                    <div
                      key={item.product.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-neutral-50 p-1.5 shrink-0 border border-neutral-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={name}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#D80048] tracking-wider">
                              {item.product.category}
                            </span>
                            <span className="text-[11px] font-mono text-neutral-400">
                              {item.product.model}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-semibold text-neutral-900 truncate">
                            {name}
                          </h4>
                          <span className="text-xs text-neutral-400 font-mono">
                            Est. ${item.unitPriceEstimate} USD / unit
                          </span>
                        </div>
                      </div>

                      {/* Right stepper & price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-neutral-100">
                        <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono font-semibold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right min-w-[90px]">
                          <span className="text-sm sm:text-base font-bold text-neutral-900 font-mono tabular-nums">
                            ${(item.unitPriceEstimate * item.quantity).toLocaleString()}
                          </span>
                          <span className="block text-[10px] text-neutral-400 font-mono">USD</span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                          title={isEn ? 'Remove item' : '删除设备'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Wholesale Summary & Action */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
              <h3 className="text-base font-bold text-neutral-900">
                {isEn ? 'Quotation Summary' : '询价预算汇总'}
              </h3>

              <div className="space-y-2.5 text-xs text-neutral-600 pb-4 border-b border-neutral-100">
                <div className="flex justify-between">
                  <span>{isEn ? 'Total Units' : '设备台数总计'}</span>
                  <span className="font-mono font-medium text-neutral-900">{totalCount} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span>{isEn ? 'Wholesale Base Estimate' : '出厂采购预估总额'}</span>
                  <span className="font-mono font-bold text-neutral-900 text-sm tabular-nums">
                    ${subtotal.toLocaleString()} USD
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>{isEn ? 'Incoterms (FOB / CIF)' : '贸易结算方式'}</span>
                  <span>FOB Shenzhen / Dongguan</span>
                </div>
              </div>

              <div className="bg-[#FFF5F8] p-3 rounded-xl border border-[#D80048]/20 flex items-start gap-2 text-xs text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-[#D80048] shrink-0 mt-0.5" />
                <p>
                  {isEn
                    ? 'Orders over 100 units qualify for tier discounts, localized packaging, and full regulatory dossier packages.'
                    : '单批次采购满100台可享阶梯大宗折扣，支持定制外包装与全套准入注册文件支持。'}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleSendQuote}
                  className="w-full py-3.5 px-6 text-xs sm:text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{isEn ? 'Submit for Official Quotation' : '提交官方阶梯报价申请'}</span>
                </button>

                <button
                  onClick={() => onNavigate('/shop')}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors text-center"
                >
                  {isEn ? '+ Add More Equipment Models' : '+ 继续添加其他器械型号'}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

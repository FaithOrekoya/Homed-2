import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { Language } from '../data/content';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  lang: Language;
  onOpenDistributorWithCart?: (notes: string) => void;
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  lang,
  onOpenDistributorWithCart,
  onNavigate,
}) => {
  const { items, totalCount, subtotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const isEn = lang === 'en';

  if (!isCartOpen) return null;

  const handleCheckoutQuotation = () => {
    setIsCartOpen(false);
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

  const handleGoToCartPage = () => {
    setIsCartOpen(false);
    onNavigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-[#FAFAFA]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FFF1F5] flex items-center justify-center text-[#D80048]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {isEn ? 'Equipment Cart' : '采购询价车'}
                </h3>
                <p className="text-xs text-neutral-500">
                  {totalCount} {isEn ? (totalCount === 1 ? 'item selected' : 'items selected') : '件设备已选'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center text-neutral-400 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-3 text-neutral-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold text-neutral-700">
                  {isEn ? 'Your cart is empty' : '询价车暂无设备'}
                </p>
                <p className="text-xs text-neutral-400 mt-1 max-w-[240px]">
                  {isEn
                    ? 'Explore our FDA/CE cleared oxygen concentrators and nebulizers.'
                    : '探索HOMED获得美国FDA与欧盟CE认证的医用制氧与雾化设备。'}
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('/shop');
                  }}
                  className="mt-5 px-5 py-2 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors"
                >
                  {isEn ? 'Browse Catalog' : '浏览产品商城'}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const name = isEn ? item.product.nameEn : item.product.nameZh;
                return (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-neutral-200/80 bg-white hover:border-neutral-300 transition-all shadow-2xs"
                  >
                    <div className="w-16 h-16 rounded-lg bg-neutral-50 p-1 shrink-0 border border-neutral-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={name}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] uppercase font-bold text-[#D80048] tracking-wider">
                          {item.product.category}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                          title={isEn ? 'Remove item' : '删除设备'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-semibold text-neutral-900 truncate" title={name}>
                        {name}
                      </h4>
                      <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        {item.product.model}
                      </p>
                      
                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-100">
                        <div className="flex items-center border border-neutral-200 rounded-md bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-neutral-900 tabular-nums">
                            ${(item.unitPriceEstimate * item.quantity).toLocaleString()}
                          </span>
                          <span className="block text-[10px] text-neutral-400">
                            (${item.unitPriceEstimate}/ea est.)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {items.length > 0 && (
              <div className="pt-2 flex justify-between items-center text-xs text-neutral-400">
                <button
                  onClick={clearCart}
                  className="hover:text-red-600 transition-colors underline cursor-pointer"
                >
                  {isEn ? 'Clear all items' : '清空全部已选'}
                </button>
                <span>{isEn ? 'B2B Wholesale / OEM Tiers' : '支持B2B阶梯报价'}</span>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>{isEn ? 'Total Device Units' : '设备总数'}</span>
                  <span className="font-mono font-medium text-neutral-900">{totalCount} pcs</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>{isEn ? 'Estimated Wholesale Subtotal' : '预估批发采购基准额'}</span>
                  <span className="font-mono font-bold text-base text-neutral-900 tabular-nums">
                    ${subtotal.toLocaleString()} USD
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isEn
                      ? 'Priority allocation & volume discount eligible'
                      : '符合厂家批量阶梯折扣与资质优先配额'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {/* Primary wholesale inquiry button */}
                <button
                  onClick={handleCheckoutQuotation}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{isEn ? 'Request Wholesale Quote with Cart' : '生成清单并索取分销报价'}</span>
                </button>

                {/* Secondary go to cart page */}
                <button
                  onClick={handleGoToCartPage}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{isEn ? 'View Detailed Cart Page (/cart)' : '查看采购车完整页面 (/cart)'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

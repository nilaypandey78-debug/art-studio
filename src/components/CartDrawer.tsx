import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Truck, PackageOpen } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (artworkId: string, quantity: number) => void;
  onRemoveItem: (artworkId: string) => void;
  onProceedToCheckout: () => void;
  onExploreCollection: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCollection,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.artwork.priceINR * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E7E2D9] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E7E2D9] flex items-center justify-between bg-white">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                Collector's Acquisition Bag
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {items.length} {items.length === 1 ? 'original artwork' : 'artworks'} selected
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Cart"
              className="p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EEE5] text-stone-400 flex items-center justify-center">
                  <PackageOpen className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-800">
                    Your acquisition bag is empty
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Discover original contemporary paintings, sculptures, and limited edition prints from Chhattisgarh artists.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreCollection();
                  }}
                  className="px-6 py-2.5 bg-[#760D24] text-white text-xs uppercase tracking-wider font-medium rounded hover:bg-[#8F122D] transition-colors cursor-pointer"
                >
                  Explore Art Collection →
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.artwork.id}
                  className="flex gap-4 p-3.5 bg-white rounded-lg border border-[#E7E2D9] shadow-xs"
                >
                  <img
                    src={item.artwork.image}
                    alt={item.artwork.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                        {item.artwork.title}
                      </h4>
                      <p className="text-xs text-stone-500 truncate">
                        {item.artwork.artistName}
                      </p>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        {item.artwork.medium}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-semibold text-xs text-[#760D24]">
                        ₹{(item.artwork.priceINR * item.quantity).toLocaleString('en-IN')}
                      </span>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-stone-200 rounded text-xs bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(item.artwork.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-0.5 hover:bg-stone-200 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.artwork.id, item.quantity + 1)}
                            className="px-2 py-0.5 hover:bg-stone-200 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.artwork.id)}
                          aria-label="Remove item"
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E7E2D9] space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Insured Fine-Art Courier
                  </span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#760D24]" /> Certificate of Authenticity
                  </span>
                  <span>Included</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900">
                  <span>Total Amount</span>
                  <span className="font-serif text-[#760D24]">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#760D24] hover:bg-[#8F122D] text-white rounded font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Buy (Razorpay)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-stone-400">
                Secure checkout powered by Razorpay. 100% genuine fine art authenticated by Dhruva’s Gallery curators.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, ZoomIn, Check, Sparkles } from 'lucide-react';
import { Artwork } from '../types';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (artwork: Artwork) => void;
  onBuyNow: (artwork: Artwork) => void;
  isWishlisted: boolean;
  onToggleWishlist: (artworkId: string) => void;
  onViewArtist: (artistId: string) => void;
}

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  artwork,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onViewArtist,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  if (!isOpen || !artwork) return null;

  const handleAdd = () => {
    onAddToCart(artwork);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF7F2] text-[#1C1917] rounded-xl shadow-2xl max-w-4xl w-full border border-[#E7E2D9] overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Left Side: Artwork Visual with Lightbox Zoom */}
        <div className="md:w-1/2 bg-[#F3EEE5] p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E7E2D9]">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label="Toggle zoom"
            className="absolute top-4 left-4 p-2 bg-white/80 hover:bg-white text-stone-700 rounded-full shadow-sm text-xs flex items-center gap-1 cursor-pointer transition-all"
            title="Click to Zoom"
          >
            <ZoomIn className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Enlarge</span>
          </button>

          <div className="w-full flex items-center justify-center overflow-hidden rounded bg-white shadow-md p-3 border border-stone-200">
            <img
              src={artwork.image}
              alt={artwork.title}
              referrerPolicy="no-referrer"
              className={`max-h-[360px] md:max-h-[460px] w-auto object-contain transition-transform duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </div>

          <p className="text-[11px] text-stone-500 italic mt-3 text-center">
            Original contemporary work from the studio collection • Raipur, Chhattisgarh
          </p>
        </div>

        {/* Right Side: Editorial Metadata & Acquisition Controls */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Top Row: Category & Close */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#760D24] uppercase tracking-widest">
                {artwork.category}
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Artist */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {artwork.title}
              </h2>
              <button
                onClick={() => {
                  onClose();
                  onViewArtist(artwork.artistId);
                }}
                className="text-sm font-medium text-stone-600 hover:text-[#760D24] hover:underline transition-colors mt-1 block"
              >
                By {artwork.artistName} →
              </button>
            </div>

            {/* Price Badge */}
            <div className="pt-2 border-t border-[#E7E2D9]">
              <span className="text-xs text-stone-500 block">Acquisition Price:</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-[#760D24]">
                  ₹{artwork.priceINR.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-500">
                  (Inclusive of fine art framing & GST)
                </span>
              </div>
            </div>

            {/* Museum Accession Specification Table */}
            <div className="space-y-2 text-xs border-y border-[#E7E2D9] py-3.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Medium & Support:</span>
                <span className="font-medium text-stone-800 text-right">{artwork.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Dimensions:</span>
                <span className="font-medium text-stone-800">{artwork.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Year Created:</span>
                <span className="font-medium text-stone-800">{artwork.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Availability:</span>
                <span className="font-medium text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> In Gallery Collection
                </span>
              </div>
            </div>

            {/* Curatorial Description */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Curatorial Note
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Authenticity Guarantee Card */}
            <div className="bg-white p-3 rounded border border-stone-200 space-y-1 text-[11px] text-stone-600">
              <div className="flex items-center gap-1.5 text-stone-900 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#760D24]" />
                <span>Certificate of Authenticity Guaranteed</span>
              </div>
              <p className="text-stone-500">
                Signed by artist and counter-stamped by Dhruva’s Art Studio N Gallery curators.
              </p>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 bg-white border border-[#760D24] text-[#760D24] hover:bg-[#760D24]/5 rounded font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {addedAnim ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Acquisition Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(artwork.id)}
                aria-label="Save to Wishlist"
                className={`p-3 rounded border transition-colors cursor-pointer ${
                  isWishlisted 
                    ? 'border-[#760D24] bg-[#760D24]/10 text-[#760D24]' 
                    : 'border-stone-300 hover:border-stone-400 text-stone-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#760D24]' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => onBuyNow(artwork)}
              className="w-full py-3.5 px-4 bg-[#760D24] hover:bg-[#8F122D] text-white rounded font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Instant Buy via Razorpay →</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

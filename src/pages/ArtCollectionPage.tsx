import React, { useState, useMemo } from 'react';
import { Heart, ShoppingBag, SlidersHorizontal, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { Artwork, ArtworkCategory } from '../types';

interface ArtCollectionPageProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
  onBuyNow: (artwork: Artwork) => void;
  wishlistIds: string[];
  onToggleWishlist: (artworkId: string) => void;
}

export const ArtCollectionPage: React.FC<ArtCollectionPageProps> = ({
  artworks,
  onSelectArtwork,
  onAddToCart,
  onBuyNow,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ArtworkCategory>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year'>('featured');
  const [searchFilter, setSearchFilter] = useState('');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  const categories: ('All' | ArtworkCategory)[] = [
    'All',
    'Paintings',
    'Sculptures',
    'Abstract Art',
    'Contemporary Art',
    'Mixed Media',
    'Prints',
  ];

  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
        const matchesSearch = 
          art.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
          art.artistName.toLowerCase().includes(searchFilter.toLowerCase()) ||
          art.medium.toLowerCase().includes(searchFilter.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
        if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
        if (sortBy === 'year') return b.year - a.year;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [artworks, selectedCategory, searchFilter, sortBy]);

  const handleAdd = (e: React.MouseEvent, art: Artwork) => {
    e.stopPropagation();
    onAddToCart(art);
    setAddedNoticeId(art.id);
    setTimeout(() => setAddedNoticeId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Editorial Header */}
      <div className="space-y-3 pb-6 border-b border-[#E7E2D9]">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#760D24] block">
          Dhruva’s Online Art Marketplace
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Art Collection
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Acquire authenticated contemporary originals, bronze & terracotta sculptures, and archival prints directly from the artist studios of Chhattisgarh. Secure payment with Razorpay & complimentary fine-art courier.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E7E2D9] shadow-xs">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 text-xs no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#760D24] text-white font-medium shadow-xs'
                    : 'bg-[#F4EFE6] text-stone-700 hover:bg-[#EBE5DA]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search medium, artist..."
            className="text-xs px-3 py-1.5 bg-[#FAF7F2] border border-stone-200 rounded focus:border-[#760D24] focus:outline-none w-44"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs px-3 py-1.5 bg-[#FAF7F2] border border-stone-200 rounded focus:border-[#760D24] focus:outline-none text-stone-700"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year">Newest Year</option>
          </select>
        </div>

      </div>

      {/* Artworks Marketplace Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtworks.map((art) => {
          const isWish = wishlistIds.includes(art.id);
          const isJustAdded = addedNoticeId === art.id;

          return (
            <div
              key={art.id}
              onClick={() => onSelectArtwork(art)}
              className="group bg-white rounded-xl border border-[#E7E2D9] overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Artwork Photography */}
                <div className="aspect-[4/3] overflow-hidden bg-stone-100 relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-semibold text-[#760D24] uppercase tracking-wider shadow-xs">
                    {art.category}
                  </span>

                  {/* Wishlist Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(art.id);
                    }}
                    aria-label="Toggle wishlist"
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm text-stone-500 hover:text-[#760D24] transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-[#760D24] text-[#760D24]' : ''}`} />
                  </button>
                </div>

                {/* Info Container */}
                <div className="p-6 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#760D24] transition-colors truncate">
                    {art.title}
                  </h3>
                  <p className="text-xs font-medium text-stone-600">
                    {art.artistName} • {art.year}
                  </p>
                  <p className="text-[11px] text-stone-400 truncate">
                    {art.medium}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Dimensions: {art.dimensions}
                  </p>
                </div>
              </div>

              {/* Price & Acquisition Strip */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-baseline justify-between pt-3 border-t border-stone-100">
                  <span className="text-xs text-stone-400">Collector Price:</span>
                  <span className="font-serif font-bold text-lg text-[#760D24]">
                    ₹{art.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={(e) => handleAdd(e, art)}
                    className="py-2.5 px-3 bg-stone-50 hover:bg-stone-100 border border-stone-300 text-stone-800 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyNow(art);
                    }}
                    className="py-2.5 px-3 bg-[#760D24] hover:bg-[#8F122D] text-white rounded text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collector Assurance Strip */}
      <div className="bg-[#F4EFE6] rounded-xl p-6 border border-[#E7E2D9] grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs">
        <div className="space-y-1">
          <ShieldCheck className="w-5 h-5 text-[#760D24] mx-auto" />
          <h4 className="font-semibold text-stone-900">Certificate of Authenticity</h4>
          <p className="text-stone-500">Every piece is verified and signed by Dhruva’s Gallery curators.</p>
        </div>
        <div className="space-y-1">
          <span className="font-mono text-sm font-bold text-[#760D24] block">RAZORPAY</span>
          <h4 className="font-semibold text-stone-900">100% Secure Checkout</h4>
          <p className="text-stone-500">Encrypted instant checkout via UPI, Netbanking, and Credit/Debit Cards.</p>
        </div>
        <div className="space-y-1">
          <span className="text-lg block">📦</span>
          <h4 className="font-semibold text-stone-900">Insured Fine-Art Shipping</h4>
          <p className="text-stone-500">Museum-grade wooden crating and transit insurance across India.</p>
        </div>
      </div>

    </div>
  );
};

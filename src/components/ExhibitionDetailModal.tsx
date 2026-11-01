import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, X, Eye, Download, Share2, Check } from 'lucide-react';
import { Exhibition, Artwork, Artist } from '../types';

interface ExhibitionDetailModalProps {
  exhibition: Exhibition | null;
  isOpen: boolean;
  onClose: () => void;
  artworks: Artwork[];
  artists: Artist[];
  onSelectArtwork: (artwork: Artwork) => void;
  onSelectArtistByName: (artistName: string) => void;
}

export const ExhibitionDetailModal: React.FC<ExhibitionDetailModalProps> = ({
  exhibition,
  isOpen,
  onClose,
  artworks,
  artists,
  onSelectArtwork,
  onSelectArtistByName,
}) => {
  const [activeView, setActiveView] = useState<'overview' | 'virtual-view' | 'artworks'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !exhibition) return null;

  const exhibitionArtworks = artworks.filter(a => 
    exhibition.participatingArtists.some(pa => pa.toLowerCase() === a.artistName.toLowerCase())
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF7F2] text-[#1C1917] animate-in fade-in">
      
      {/* Top sticky navigation bar */}
      <div className="sticky top-0 z-20 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E2D9] px-4 sm:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-[#760D24] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>All Exhibitions</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 px-3 py-1.5 rounded bg-white transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
        
        {/* Top Hero Banner matching Reference Image 6 */}
        <div className="w-full aspect-[21/9] sm:aspect-[24/9] max-h-[460px] rounded-lg overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-200">
          <img
            src={exhibition.image}
            alt={exhibition.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Editorial 2-Column Split matching Reference Image 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
          
          {/* Left Column: Metadata & CTA */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-semibold tracking-widest text-[#760D24] uppercase block">
              {exhibition.participatingArtists.length > 1 ? 'Group Exhibition' : 'Solo Exhibition'}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              {exhibition.title}
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-stone-700 leading-snug">
              {exhibition.subtitle}
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#760D24] shrink-0" />
                <span className="font-medium text-stone-800">{exhibition.dates}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#760D24] shrink-0" />
                <span>{exhibition.location}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActiveView(activeView === 'virtual-view' ? 'overview' : 'virtual-view')}
                className="px-6 py-3.5 bg-[#760D24] hover:bg-[#8F122D] text-white font-medium text-xs uppercase tracking-wider rounded transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>{activeView === 'virtual-view' ? 'Show Curatorial Essay' : 'Exhibition View →'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Curatorial Essay & Participating Artists */}
          <div className="lg:col-span-7 lg:border-l lg:border-[#E7E2D9] lg:pl-10 space-y-6">
            
            <p className="text-sm text-stone-700 leading-relaxed text-justify sm:text-left">
              {exhibition.description}
            </p>

            <div className="border-t border-[#E7E2D9] pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                Curator
              </h4>
              <p className="font-serif text-base font-bold text-stone-900">
                {exhibition.curator}
              </p>
            </div>

            <div className="border-t border-[#E7E2D9] pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#760D24] mb-2">
                Participating Artists
              </h4>
              <div className="text-sm text-stone-800 font-serif leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
                {exhibition.participatingArtists.map((artistName, idx) => (
                  <React.Fragment key={artistName}>
                    <button
                      onClick={() => onSelectArtistByName(artistName)}
                      className="hover:text-[#760D24] hover:underline cursor-pointer font-medium"
                    >
                      {artistName}
                    </button>
                    {idx < exhibition.participatingArtists.length - 1 && (
                      <span className="text-stone-400 font-sans text-xs">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Section: Virtual View or Extended Curatorial Essay */}
        {activeView === 'virtual-view' ? (
          <div className="pt-8 border-t border-[#E7E2D9] space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Virtual Installation Walkthrough
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Full panoramic documentation of the exhibition space at Dhruva’s Studio N Gallery, Raipur.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#E7E2D9] shadow-lg bg-stone-900 aspect-[16/9] relative group">
              <img
                src={exhibition.heroImage}
                alt="Exhibition installation hall"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 text-white">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#E4C882]">
                    Installation Hall A
                  </span>
                  <h4 className="font-serif text-xl font-bold">
                    Spatial Arrangement of Terracotta & Canvases
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 max-w-xl">
                    Natural lighting combined with 3000K museum-grade gallery track luminaires designed to reveal tactile earthenware textures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-8 border-t border-[#E7E2D9] space-y-6">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Curatorial Discourse & Gallery Installation
            </h3>
            
            <div className="p-6 bg-white rounded-lg border border-[#E7E2D9] space-y-3">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-[#760D24]">
                {exhibition.curatorialEssay}
              </p>
            </div>

            {/* Gallery Hall Documentation Image */}
            <div className="w-full aspect-[16/8] rounded-lg overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-200">
              <img
                src={exhibition.heroImage}
                alt="Gallery exhibition view"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Featured Artworks in this Exhibition */}
        <div className="pt-10 border-t border-[#E7E2D9] space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#760D24] font-semibold">
                Curated Selection
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Artworks in the Exhibition
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              {exhibitionArtworks.length} works documented
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exhibitionArtworks.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArtwork(art)}
                className="group bg-white rounded-lg border border-[#E7E2D9] overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-semibold text-[#760D24] uppercase tracking-wider block">
                    {art.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#760D24] transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {art.artistName} • {art.dimensions}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    {art.medium}
                  </p>
                  <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-xs">
                    <span className="font-serif font-bold text-[#760D24]">
                      ₹{art.priceINR.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-stone-600 font-medium group-hover:underline">
                      Acquire Artwork →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

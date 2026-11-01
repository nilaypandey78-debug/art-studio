import React from 'react';
import { X, MapPin, Award, Palette, ExternalLink, ArrowRight } from 'lucide-react';
import { Artist, Artwork } from '../types';

interface ArtistDetailModalProps {
  artist: Artist | null;
  isOpen: boolean;
  onClose: () => void;
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onViewExhibition: (exhibitionTitle: string) => void;
}

export const ArtistDetailModal: React.FC<ArtistDetailModalProps> = ({
  artist,
  isOpen,
  onClose,
  artworks,
  onSelectArtwork,
  onViewExhibition,
}) => {
  if (!isOpen || !artist) return null;

  const artistArtworks = artworks.filter(a => a.artistId === artist.id || a.artistName === artist.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF7F2] text-[#1C1917] rounded-xl shadow-2xl max-w-4xl w-full border border-[#E7E2D9] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-[#E7E2D9] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#760D24] uppercase tracking-widest">
              Artist Profile
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-stone-500">{artist.discipline}</span>
            {artist.role && (
              <>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-[#760D24] font-medium">{artist.role}</span>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Top Split: Portrait + Biography */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-56 shrink-0">
              <div className="aspect-square rounded-lg overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-200">
                <img
                  src={artist.portrait}
                  alt={artist.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-110"
                />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-[#760D24]" />
                <span>{artist.location}</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-stone-900">
                  {artist.name}
                </h2>
                <p className="text-sm font-medium text-[#760D24] italic mt-0.5">
                  {artist.discipline} {artist.role ? `• ${artist.role}` : ''}
                </p>
              </div>

              {/* Personal Statement / Quote */}
              <div className="p-4 bg-white rounded-lg border-l-2 border-[#760D24] border-y border-r border-stone-200 shadow-xs">
                <p className="font-serif italic text-sm text-stone-800 leading-relaxed">
                  {artist.statement}
                </p>
              </div>

              {/* Biography */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Curatorial Biography
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {artist.bio}
                </p>
              </div>

              {/* Exhibitions at Dhruva's Gallery */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Exhibitions at Dhruva’s Studio N Gallery
                </h4>
                <div className="flex flex-wrap gap-2">
                  {artist.exhibitions.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => {
                        onClose();
                        onViewExhibition(ex);
                      }}
                      className="px-3 py-1 bg-white hover:bg-[#F3EEE5] text-stone-700 text-xs rounded border border-stone-200 transition-colors flex items-center gap-1.5"
                    >
                      <span>{ex}</span>
                      <ArrowRight className="w-3 h-3 text-[#760D24]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Artworks in Gallery Collection */}
          <div className="pt-6 border-t border-[#E7E2D9] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Works in Gallery Collection
              </h3>
              <span className="text-xs text-stone-500">
                {artistArtworks.length} {artistArtworks.length === 1 ? 'work available' : 'works available'}
              </span>
            </div>

            {artistArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {artistArtworks.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onClose();
                      onSelectArtwork(art);
                    }}
                    className="group bg-white rounded-lg border border-[#E7E2D9] overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="aspect-4/3 overflow-hidden bg-stone-100">
                      <img
                        src={art.image}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3.5 space-y-1">
                      <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-[#760D24] transition-colors line-clamp-1">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">
                        {art.medium}
                      </p>
                      <div className="pt-2 flex justify-between items-center text-xs">
                        <span className="font-semibold text-[#760D24]">
                          ₹{art.priceINR.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-stone-400">View Details →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-lg border border-dashed border-stone-300 text-center text-xs text-stone-500">
                New studio works by {artist.name} are currently in preparation for the upcoming exhibition season.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

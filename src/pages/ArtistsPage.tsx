import React, { useState } from 'react';
import { Artist, ArtistDiscipline } from '../types';

interface ArtistsPageProps {
  artists: Artist[];
  onSelectArtist: (artist: Artist) => void;
}

export const ArtistsPage: React.FC<ArtistsPageProps> = ({
  artists,
  onSelectArtist,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | ArtistDiscipline>('All');

  const filteredArtists = artists.filter((artist) => {
    if (activeFilter === 'All') return true;
    return artist.discipline === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Top Header & Filter Bar matching Reference Image 5 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E7E2D9]">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Featured Artist
        </h1>

        {/* Filters: All, Painter, Sculptor, Printmaker, Mixed Media */}
        <div className="flex items-center gap-6 sm:gap-8 text-sm font-normal text-stone-600 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Painter', 'Sculptor', 'Printmaker', 'Mixed Media'] as const).map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`relative py-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive ? 'font-medium text-[#760D24]' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#760D24] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Artists Grid matching Reference Image 5 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredArtists.map((artist) => (
          <div
            key={artist.id}
            onClick={() => onSelectArtist(artist)}
            className="group cursor-pointer space-y-3"
          >
            {/* Square B&W Portrait */}
            <div className="aspect-square rounded-lg overflow-hidden border border-[#E7E2D9] shadow-xs bg-stone-200">
              <img
                src={artist.portrait}
                alt={artist.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Typography */}
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#760D24] transition-colors leading-tight">
                {artist.name}
              </h2>
              <p className="font-serif italic text-xs sm:text-sm text-stone-500 mt-0.5">
                {artist.discipline}
              </p>
              {artist.role && (
                <p className="text-[10px] uppercase tracking-wider text-[#760D24] font-medium mt-1">
                  {artist.role}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* "and more ->" Card matching Reference Image 5 */}
        <div
          onClick={() => setActiveFilter('All')}
          className="aspect-square rounded-lg bg-[#F4EFE6] border border-[#E7E2D9] flex items-center justify-center p-6 text-center cursor-pointer hover:bg-[#EBE5DA] transition-colors group"
        >
          <span className="font-serif text-sm sm:text-base font-medium text-stone-800 group-hover:text-[#760D24] flex items-center gap-2">
            <span>and more</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>

      {/* Curatorial Artist Statement Footer Quote */}
      <div className="pt-12 border-t border-[#E7E2D9] max-w-3xl mx-auto text-center space-y-3">
        <p className="font-serif italic text-base sm:text-lg text-stone-700">
          “Dhruva’s Art Studio & Gallery was conceived to nurture artistic dialogue across generations, bridging traditional material lineages with radical contemporary inquiry.”
        </p>
        <span className="text-xs uppercase tracking-widest text-[#760D24] font-semibold block">
          — Raipur Curatorial Board
        </span>
      </div>

    </div>
  );
};

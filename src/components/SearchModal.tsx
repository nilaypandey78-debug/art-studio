import React, { useState, useMemo } from 'react';
import { Search, X, Calendar, User, Image, Sparkles } from 'lucide-react';
import { Exhibition, Artist, Artwork, EventProgram } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  exhibitions: Exhibition[];
  artists: Artist[];
  artworks: Artwork[];
  events: EventProgram[];
  onSelectExhibition: (exhibition: Exhibition) => void;
  onSelectArtist: (artist: Artist) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onSelectEvent: (event: EventProgram) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  exhibitions,
  artists,
  artworks,
  events,
  onSelectExhibition,
  onSelectArtist,
  onSelectArtwork,
  onSelectEvent,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'exhibitions' | 'artists' | 'artworks' | 'events'>('all');

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        exhibitions: exhibitions.slice(0, 2),
        artists: artists.slice(0, 3),
        artworks: artworks.slice(0, 3),
        events: events.slice(0, 2),
      };
    }

    return {
      exhibitions: exhibitions.filter(
        e => e.title.toLowerCase().includes(q) || e.subtitle.toLowerCase().includes(q) || e.participatingArtists.some(a => a.toLowerCase().includes(q))
      ),
      artists: artists.filter(
        a => a.name.toLowerCase().includes(q) || a.discipline.toLowerCase().includes(q) || a.bio.toLowerCase().includes(q)
      ),
      artworks: artworks.filter(
        art => art.title.toLowerCase().includes(q) || art.artistName.toLowerCase().includes(q) || art.medium.toLowerCase().includes(q)
      ),
      events: events.filter(
        ev => ev.title.toLowerCase().includes(q) || ev.subtitle.toLowerCase().includes(q)
      ),
    };
  }, [query, exhibitions, artists, artworks, events]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF7F2] text-[#1C1917] rounded-xl shadow-2xl max-w-2xl w-full border border-[#E7E2D9] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#E7E2D9] flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exhibitions, artists, artworks, or events..."
            autoFocus
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-600 px-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-[#F4EFE6] border-b border-[#E7E2D9] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-500 font-medium text-[11px] uppercase tracking-wider mr-1">Filter:</span>
          {(['all', 'exhibitions', 'artists', 'artworks', 'events'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 rounded-full text-xs capitalize transition-colors ${
                activeFilter === tab
                  ? 'bg-[#760D24] text-white font-medium shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Exhibitions Section */}
          {(activeFilter === 'all' || activeFilter === 'exhibitions') && filteredResults.exhibitions.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#760D24] uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Exhibitions</span>
              </div>
              <div className="space-y-1.5">
                {filteredResults.exhibitions.map((ex) => (
                  <div
                    key={ex.id}
                    onClick={() => {
                      onSelectExhibition(ex);
                      onClose();
                    }}
                    className="p-3 bg-white hover:bg-[#F9F5EE] border border-stone-200 rounded-lg cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-stone-900">{ex.title}</h4>
                      <p className="text-xs text-stone-500">{ex.dates} • {ex.status.toUpperCase()}</p>
                    </div>
                    <span className="text-xs text-[#760D24] font-medium">View →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artists Section */}
          {(activeFilter === 'all' || activeFilter === 'artists') && filteredResults.artists.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#760D24] uppercase tracking-wider mb-2">
                <User className="w-3.5 h-3.5" />
                <span>Featured Artists</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredResults.artists.map((artist) => (
                  <div
                    key={artist.id}
                    onClick={() => {
                      onSelectArtist(artist);
                      onClose();
                    }}
                    className="p-3 bg-white hover:bg-[#F9F5EE] border border-stone-200 rounded-lg cursor-pointer transition-colors flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden shrink-0">
                      <img 
                        src={artist.portrait} 
                        alt={artist.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-stone-900 truncate">{artist.name}</h4>
                      <p className="text-xs text-stone-500">{artist.discipline} {artist.role ? `• ${artist.role}` : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artworks Section */}
          {(activeFilter === 'all' || activeFilter === 'artworks') && filteredResults.artworks.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#760D24] uppercase tracking-wider mb-2">
                <Image className="w-3.5 h-3.5" />
                <span>Art Collection</span>
              </div>
              <div className="space-y-1.5">
                {filteredResults.artworks.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArtwork(art);
                      onClose();
                    }}
                    className="p-2.5 bg-white hover:bg-[#F9F5EE] border border-stone-200 rounded-lg cursor-pointer transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={art.image} 
                        alt={art.title} 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded shrink-0 bg-stone-100"
                      />
                      <div className="truncate">
                        <h4 className="font-serif text-sm font-semibold text-stone-900 truncate">{art.title}</h4>
                        <p className="text-xs text-stone-500">{art.artistName} • {art.category}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#760D24] shrink-0">
                      ₹{art.priceINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Section */}
          {(activeFilter === 'all' || activeFilter === 'events') && filteredResults.events.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#760D24] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Events & Programs</span>
              </div>
              <div className="space-y-1.5">
                {filteredResults.events.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => {
                      onSelectEvent(ev);
                      onClose();
                    }}
                    className="p-3 bg-white hover:bg-[#F9F5EE] border border-stone-200 rounded-lg cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-stone-900">{ev.title}</h4>
                      <p className="text-xs text-stone-500">{ev.date} • {ev.time}</p>
                    </div>
                    <span className="text-xs text-[#760D24] font-medium">Details →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { ArrowRight, Calendar, MapPin, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { Exhibition, Artist, Artwork, NavigationTab } from '../types';
import { GALLERY_INFO } from '../data/galleryData';

interface HomePageProps {
  onNavigate: (tab: NavigationTab) => void;
  exhibitions: Exhibition[];
  artists: Artist[];
  artworks: Artwork[];
  onSelectExhibition: (exhibition: Exhibition) => void;
  onSelectArtist: (artist: Artist) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  exhibitions,
  artists,
  artworks,
  onSelectExhibition,
  onSelectArtist,
  onSelectArtwork,
}) => {
  const currentExhibition = exhibitions.find(e => e.id === 'maati-ka-avtaran') || exhibitions[0];
  const upcomingExhibition = exhibitions.find(e => e.id === 'canvas-for-a-life') || exhibitions[1];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. HERO SECTION Matching Reference Image 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#760D24] block">
              Raipur, Chhattisgarh
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15]">
              A Contemporary Art Space in Chhattisgarh
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
              A platform for artistic expression, dialogue and cultural exchange.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('exhibitions')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1917] group cursor-pointer"
              >
                <span className="border-b-2 border-[#760D24] pb-0.5 group-hover:text-[#760D24] transition-colors">
                  Explore Exhibitions
                </span>
                <span className="text-[#760D24] transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Hero Right Photography: Gallery Building */}
          <div className="lg:col-span-7">
            <div className="rounded-xl overflow-hidden border border-[#E7E2D9] shadow-xl bg-stone-200 aspect-[4/3] sm:aspect-[16/11] relative group">
              <img
                src="/public/assets/gallery/real_building_exterior.jpg"
                alt="Dhruva's Art Studio N Gallery Building in Raipur"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/60 shadow-sm flex items-center justify-between text-xs">
                <span className="font-serif font-semibold text-stone-900">
                  Dhruva’s Art Studio N Gallery • Raipur
                </span>
                <span className="text-[#760D24] font-medium hidden sm:inline">
                  Old Dhamtari Road
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. WHAT'S ON SECTION Matching Reference Image 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E2D9]">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
            What’s On
          </h2>
          <button
            onClick={() => onNavigate('whats-on')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-[#760D24] group cursor-pointer"
          >
            <span>View All</span>
            <span className="text-[#760D24] transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          
          {/* Card 1: Current Exhibition - Maati Ka Avtaran */}
          <div 
            onClick={() => onSelectExhibition(currentExhibition)}
            className="group bg-white p-5 rounded-xl border border-[#E7E2D9] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-center"
          >
            <div className="w-full sm:w-44 h-44 rounded-lg overflow-hidden shrink-0 bg-stone-100">
              <img
                src={currentExhibition.image}
                alt={currentExhibition.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2 flex-1 min-w-0">
              <span className="text-[10px] font-semibold text-[#760D24] uppercase tracking-widest block">
                Current Exhibition
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#760D24] transition-colors leading-snug">
                {currentExhibition.title}
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {currentExhibition.subtitle}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
                <Calendar className="w-3.5 h-3.5 text-[#760D24]" />
                <span>{currentExhibition.dates}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Upcoming Exhibition - Canvas for A' Life */}
          <div 
            onClick={() => onSelectExhibition(upcomingExhibition)}
            className="group bg-white p-5 rounded-xl border border-[#E7E2D9] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-center"
          >
            <div className="w-full sm:w-44 h-44 rounded-lg overflow-hidden shrink-0 bg-stone-100">
              <img
                src={upcomingExhibition.image}
                alt={upcomingExhibition.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2 flex-1 min-w-0">
              <span className="text-[10px] font-semibold text-[#760D24] uppercase tracking-widest block">
                Upcoming
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#760D24] transition-colors leading-snug">
                {upcomingExhibition.title}
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {upcomingExhibition.subtitle}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
                <Calendar className="w-3.5 h-3.5 text-[#760D24]" />
                <span>{upcomingExhibition.dates}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. A SPACE FOR ART, ARTISTS AND CONVERSATIONS Matching Reference Image 3 */}
      <section className="bg-[#F4EFE6] py-16 border-y border-[#E7E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left sculpture detail thumbnail */}
            <div className="md:col-span-3">
              <div className="aspect-square rounded-lg overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-200">
                <img
                  src="/public/assets/gallery/clay_face_profile.jpg"
                  alt="Clay sculptured face"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            </div>

            {/* Center statement */}
            <div className="md:col-span-5 space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                A Space for Art, Artists and Conversations
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Established as a platform for artistic expression, Dhruva's Art Studio & Gallery brings together contemporary art practices from Chhattisgarh and beyond.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917] group cursor-pointer"
                >
                  <span className="border-b-2 border-[#760D24] pb-0.5 group-hover:text-[#760D24] transition-colors">
                    About the Gallery
                  </span>
                  <span className="text-[#760D24] transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>

            {/* Right exhibition space hall photo */}
            <div className="md:col-span-4">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-200">
                <img
                  src="/public/assets/gallery/gallery_interior_home.jpg"
                  alt="Gallery hall installation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED ARTISTS PREVIEW Matching Reference Image 5 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E2D9]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#760D24]">
              Studio Practitioners
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Featured Artists
            </h2>
          </div>
          <button
            onClick={() => onNavigate('artists')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-[#760D24] group cursor-pointer"
          >
            <span>View All Artists</span>
            <span className="text-[#760D24] transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
          {artists.slice(0, 7).map((artist) => (
            <div
              key={artist.id}
              onClick={() => onSelectArtist(artist)}
              className="group cursor-pointer space-y-3"
            >
              <div className="aspect-square rounded-lg overflow-hidden border border-[#E7E2D9] shadow-xs bg-stone-200">
                <img
                  src={artist.portrait}
                  alt={artist.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#760D24] transition-colors">
                  {artist.name}
                </h3>
                <p className="font-serif italic text-xs text-stone-500">
                  {artist.discipline}
                </p>
              </div>
            </div>
          ))}

          {/* "and more ->" Card matching Reference Image 5 */}
          <div
            onClick={() => onNavigate('artists')}
            className="aspect-square rounded-lg bg-[#F4EFE6] border border-[#E7E2D9] flex items-center justify-center p-6 text-center cursor-pointer hover:bg-[#EBE5DA] transition-colors group"
          >
            <span className="font-serif text-sm font-medium text-stone-800 group-hover:text-[#760D24] flex items-center gap-1.5">
              <span>and more</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </section>

      {/* 5. ART COLLECTION MARKETPLACE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E2D9]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#760D24]">
              Original Contemporary Works
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Curated Art Collection
            </h2>
          </div>
          <button
            onClick={() => onNavigate('collection')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-[#760D24] group cursor-pointer"
          >
            <span>Explore Collection</span>
            <span className="text-[#760D24] transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {artworks.filter(a => a.featured).slice(0, 3).map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArtwork(art)}
              className="group bg-white rounded-xl border border-[#E7E2D9] overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-4/3 overflow-hidden bg-stone-100 relative">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-semibold text-[#760D24] uppercase tracking-wider shadow-xs">
                  {art.category}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#760D24] transition-colors truncate">
                  {art.title}
                </h3>
                <p className="text-xs text-stone-500">
                  By {art.artistName} • {art.year}
                </p>
                <p className="text-[11px] text-stone-400 truncate">
                  {art.medium}
                </p>
                <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                  <span className="font-serif font-bold text-base text-[#760D24]">
                    ₹{art.priceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-medium text-stone-700 group-hover:underline">
                    Acquire Artwork →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VISIT US OPERATIONAL STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1917] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-xl border-l-4 border-[#760D24]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#E4C882] font-semibold">
                Plan Your Experience
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Visit Dhruva’s Art Studio N Gallery
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                {GALLERY_INFO.address}. Open Tuesday to Sunday from 11:00 AM – 7:30 PM. Admission is complimentary and open to all art enthusiasts.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onNavigate('contact')}
                className="py-3 px-6 bg-[#760D24] hover:bg-[#8F122D] text-white rounded font-medium text-xs uppercase tracking-wider text-center transition-colors shadow cursor-pointer"
              >
                Directions & Hours →
              </button>
              <button
                onClick={() => onNavigate('events')}
                className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white rounded font-medium text-xs uppercase tracking-wider text-center transition-colors cursor-pointer"
              >
                Upcoming Programs
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

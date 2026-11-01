import React, { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Exhibition, ExhibitionStatus } from '../types';

interface ExhibitionsPageProps {
  exhibitions: Exhibition[];
  onSelectExhibition: (exhibition: Exhibition) => void;
}

export const ExhibitionsPage: React.FC<ExhibitionsPageProps> = ({
  exhibitions,
  onSelectExhibition,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ExhibitionStatus>('all');

  const filteredExhibitions = exhibitions.filter((ex) => {
    if (activeFilter === 'all') return true;
    return ex.status === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header and Filter Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E7E2D9]">
        <div>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#760D24] block mb-1">
            Curated Programs
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Exhibitions
          </h1>
        </div>

        {/* Filters: All, Current, Upcoming, Past */}
        <div className="flex items-center gap-6 sm:gap-8 text-sm font-normal text-stone-600">
          {(['all', 'current', 'upcoming', 'past'] as const).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative py-1.5 capitalize transition-colors cursor-pointer ${
                  isActive ? 'font-medium text-[#760D24]' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'current' ? 'Current' : filter === 'upcoming' ? 'Upcoming' : 'Past'}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#760D24] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exhibitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredExhibitions.map((ex) => (
          <div
            key={ex.id}
            onClick={() => onSelectExhibition(ex)}
            className="group bg-white rounded-xl border border-[#E7E2D9] overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                <img
                  src={ex.image}
                  alt={ex.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider shadow-xs ${
                  ex.status === 'current' 
                    ? 'bg-[#760D24] text-white' 
                    : ex.status === 'upcoming' 
                    ? 'bg-amber-800 text-white' 
                    : 'bg-stone-800 text-stone-200'
                }`}>
                  {ex.status}
                </span>
              </div>

              {/* Information */}
              <div className="p-6 space-y-3">
                <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#760D24] transition-colors leading-snug">
                  {ex.title}
                </h3>
                <p className="font-serif italic text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {ex.subtitle}
                </p>

                <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#760D24] shrink-0" />
                    <span>{ex.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#760D24] shrink-0" />
                    <span className="truncate">Curator: {ex.curator}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-stone-500">
                  <span className="font-medium text-stone-700">Artists: </span>
                  <span className="line-clamp-1">{ex.participatingArtists.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#760D24] group-hover:underline">
                <span>View Exhibition Details</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

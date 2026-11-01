import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Exhibition, EventProgram } from '../types';

interface WhatsOnPageProps {
  exhibitions: Exhibition[];
  events: EventProgram[];
  onSelectExhibition: (exhibition: Exhibition) => void;
  onRegisterEvent: (event: EventProgram) => void;
}

export const WhatsOnPage: React.FC<WhatsOnPageProps> = ({
  exhibitions,
  events,
  onSelectExhibition,
  onRegisterEvent,
}) => {
  const [filter, setFilter] = useState<'all' | 'exhibitions' | 'events' | 'programs'>('all');

  const currentEx = exhibitions.find(e => e.id === 'maati-ka-avtaran') || exhibitions[0];
  const upcomingEx = exhibitions.find(e => e.id === 'canvas-for-a-life') || exhibitions[1];
  const talkEvent = events.find(e => e.id === 'artist-talk-language-of-material') || events[0];
  const workshopEvent = events.find(e => e.id === 'clay-and-contemporary-practice') || events[2];
  const campEvent = events.find(e => e.id === 'the-equinox-camp') || events[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Top Header & Filter Bar matching Reference Image 4 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E7E2D9]">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          What’s On
        </h1>

        {/* Filter Navigation Tabs with burgundy underline */}
        <div className="flex items-center gap-6 sm:gap-8 text-sm font-normal text-stone-600">
          {(['all', 'exhibitions', 'events', 'programs'] as const).map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`relative py-1.5 capitalize transition-colors cursor-pointer ${
                  isActive ? 'font-medium text-[#760D24]' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab === 'all' ? 'All' : tab === 'exhibitions' ? 'Exhibitions' : tab === 'events' ? 'Events' : 'Programs'}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#760D24] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main List matching Reference Image 4 */}
      <div className="space-y-12 divide-y divide-[#E7E2D9]">
        
        {/* Item 1: Current Exhibition - Maati Ka Avtaran */}
        {(filter === 'all' || filter === 'exhibitions') && (
          <div className="pt-8 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
            <div 
              onClick={() => onSelectExhibition(currentEx)}
              className="md:col-span-6 rounded-lg overflow-hidden border border-[#E7E2D9] aspect-[16/10] bg-stone-200 cursor-pointer shadow-xs"
            >
              <img
                src={currentEx.image}
                alt={currentEx.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#760D24] block">
                Current Exhibition
              </span>
              <h2 
                onClick={() => onSelectExhibition(currentEx)}
                className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 group-hover:text-[#760D24] transition-colors cursor-pointer leading-tight"
              >
                {currentEx.title}
              </h2>
              <p className="font-serif italic text-base text-stone-700 leading-relaxed">
                {currentEx.subtitle}
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <Calendar className="w-4 h-4 text-[#760D24]" />
                <span className="font-medium">{currentEx.dates}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onSelectExhibition(currentEx)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-900 group/btn cursor-pointer"
                >
                  <span className="border-b-2 border-[#760D24] pb-0.5 group-hover/btn:text-[#760D24] transition-colors">
                    View Details
                  </span>
                  <span className="text-[#760D24] transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Item 2: Upcoming Exhibition - Canvas for A' Life */}
        {(filter === 'all' || filter === 'exhibitions') && (
          <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
            <div 
              onClick={() => onSelectExhibition(upcomingEx)}
              className="md:col-span-6 rounded-lg overflow-hidden border border-[#E7E2D9] aspect-[16/10] bg-stone-200 cursor-pointer shadow-xs"
            >
              <img
                src={upcomingEx.image}
                alt={upcomingEx.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#760D24] block">
                Upcoming Exhibition
              </span>
              <h2 
                onClick={() => onSelectExhibition(upcomingEx)}
                className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 group-hover:text-[#760D24] transition-colors cursor-pointer leading-tight"
              >
                {upcomingEx.title}
              </h2>
              <p className="font-serif italic text-base text-stone-700 leading-relaxed">
                {upcomingEx.subtitle}
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <Calendar className="w-4 h-4 text-[#760D24]" />
                <span className="font-medium">{upcomingEx.dates}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onSelectExhibition(upcomingEx)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-900 group/btn cursor-pointer"
                >
                  <span className="border-b-2 border-[#760D24] pb-0.5 group-hover/btn:text-[#760D24] transition-colors">
                    View Details
                  </span>
                  <span className="text-[#760D24] transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Item 3: Event - Artist Talk: The Language of Material */}
        {(filter === 'all' || filter === 'events') && (
          <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
            <div 
              onClick={() => onRegisterEvent(talkEvent)}
              className="md:col-span-6 rounded-lg overflow-hidden border border-[#E7E2D9] aspect-[16/10] bg-stone-200 cursor-pointer shadow-xs"
            >
              <img
                src={talkEvent.image}
                alt={talkEvent.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#760D24] block">
                Event
              </span>
              <h2 
                onClick={() => onRegisterEvent(talkEvent)}
                className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 group-hover:text-[#760D24] transition-colors cursor-pointer leading-tight"
              >
                {talkEvent.title}
              </h2>
              <p className="font-serif italic text-base text-stone-700 leading-relaxed">
                {talkEvent.subtitle}
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <Calendar className="w-4 h-4 text-[#760D24]" />
                <span className="font-medium">{talkEvent.date}, {talkEvent.time}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onRegisterEvent(talkEvent)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-900 group/btn cursor-pointer"
                >
                  <span className="border-b-2 border-[#760D24] pb-0.5 group-hover/btn:text-[#760D24] transition-colors">
                    Register Now
                  </span>
                  <span className="text-[#760D24] transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Item 4: Program - Clay and Contemporary Practice Workshop */}
        {(filter === 'all' || filter === 'programs') && workshopEvent && (
          <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
            <div 
              onClick={() => onRegisterEvent(workshopEvent)}
              className="md:col-span-6 rounded-lg overflow-hidden border border-[#E7E2D9] aspect-[16/10] bg-stone-200 cursor-pointer shadow-xs"
            >
              <img
                src={workshopEvent.image}
                alt={workshopEvent.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#760D24] block">
                Studio Workshop
              </span>
              <h2 
                onClick={() => onRegisterEvent(workshopEvent)}
                className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 group-hover:text-[#760D24] transition-colors cursor-pointer leading-tight"
              >
                {workshopEvent.title}
              </h2>
              <p className="font-serif italic text-base text-stone-700 leading-relaxed">
                {workshopEvent.subtitle}
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <Calendar className="w-4 h-4 text-[#760D24]" />
                <span className="font-medium">{workshopEvent.date}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onRegisterEvent(workshopEvent)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-900 group/btn cursor-pointer"
                >
                  <span className="border-b-2 border-[#760D24] pb-0.5 group-hover/btn:text-[#760D24] transition-colors">
                    Register Now
                  </span>
                  <span className="text-[#760D24] transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

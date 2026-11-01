import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Ticket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EventProgram } from '../types';

interface EventsPageProps {
  events: EventProgram[];
  onRegisterEvent: (event: EventProgram) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  events,
  onRegisterEvent,
}) => {
  const [selectedType, setSelectedType] = useState<'All' | 'Artist Talk' | 'Workshop' | 'Camp'>('All');

  const filteredEvents = events.filter((ev) => {
    if (selectedType === 'All') return true;
    return ev.type === selectedType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#E7E2D9]">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#760D24] block">
          Public Learning & Studio Practices
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Events & Programs
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Engage directly with visiting artists, master sculptors, and regional curators through intimate conversations, intensive watercolor camps, and hands-on terracotta workshops.
        </p>
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-3">
        {(['All', 'Artist Talk', 'Workshop', 'Camp'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              selectedType === type
                ? 'bg-[#760D24] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-8">
        {filteredEvents.map((ev) => {
          const seatsLeft = ev.capacity - ev.registeredCount;

          return (
            <div
              key={ev.id}
              className="bg-white rounded-xl border border-[#E7E2D9] overflow-hidden hover:shadow-lg transition-all flex flex-col lg:flex-row group"
            >
              {/* Event Image */}
              <div className="lg:w-2/5 aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-100 relative shrink-0">
                <img
                  src={ev.image}
                  alt={ev.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-wider text-[#760D24] shadow-xs">
                  {ev.type}
                </span>
              </div>

              {/* Event Information */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                    {ev.title}
                  </h2>
                  <p className="font-serif italic text-sm text-stone-700">
                    {ev.subtitle}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {ev.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#760D24] shrink-0" />
                      <span className="font-medium text-stone-900">{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#760D24] shrink-0" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-start gap-2 sm:col-span-2">
                      <MapPin className="w-4 h-4 text-[#760D24] shrink-0 mt-0.5" />
                      <span>{ev.venue}</span>
                    </div>
                    {ev.instructor && (
                      <div className="flex items-center gap-2 sm:col-span-2 text-stone-700">
                        <Users className="w-4 h-4 text-[#760D24] shrink-0" />
                        <span>Led by: <strong className="font-medium">{ev.instructor}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-stone-400 block">Registration Fee</span>
                    <span className="font-serif font-bold text-base text-[#760D24]">{ev.fee}</span>
                    <span className="text-[10px] text-stone-500 block">({seatsLeft} spots remaining)</span>
                  </div>

                  <button
                    onClick={() => onRegisterEvent(ev)}
                    className="py-3 px-6 bg-[#760D24] hover:bg-[#8F122D] text-white rounded text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Register & Get Digital Pass →</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

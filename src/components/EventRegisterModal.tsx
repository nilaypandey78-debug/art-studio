import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, QrCode, Download, Printer } from 'lucide-react';
import { EventProgram, EventRegistration } from '../types';

interface EventRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventProgram | null;
  onRegisterSuccess: (reg: EventRegistration) => void;
}

export const EventRegisterModal: React.FC<EventRegisterModalProps> = ({
  isOpen,
  onClose,
  event,
  onRegisterSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tickets, setTickets] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedReg, setConfirmedReg] = useState<EventRegistration | null>(null);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const newReg: EventRegistration = {
      id: `reg_${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      fullName,
      email,
      phone,
      tickets,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'Confirmed',
    };

    setConfirmedReg(newReg);
    setIsConfirmed(true);
    onRegisterSuccess(newReg);
  };

  const handleDownloadCalendar = () => {
    // Generate .ics calendar invite
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Dhruvas Art Studio N Gallery//Event//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF7F2] text-[#1C1917] rounded-xl shadow-2xl max-w-lg w-full border border-[#E7E2D9] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#1C1917] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#E4C882]">
              Dhruva’s Gallery Programs
            </span>
            <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
              {isConfirmed ? 'Registration Confirmed' : 'Event Registration'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-stone-400 hover:text-white p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isConfirmed ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Quick Info Card */}
              <div className="bg-white p-4 rounded-lg border border-[#E7E2D9] space-y-2">
                <span className="text-[10px] font-semibold text-[#760D24] uppercase tracking-wider block">
                  {event.type}
                </span>
                <h4 className="font-serif text-base font-bold text-stone-900 leading-snug">
                  {event.title}
                </h4>
                <p className="text-xs text-stone-600 italic">
                  {event.subtitle}
                </p>

                <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#760D24]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#760D24]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="col-span-2 flex items-start gap-1.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#760D24] shrink-0 mt-0.5" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-stone-500">Registration Fee:</span>
                  <span className="font-semibold text-stone-900">{event.fee}</span>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Attendee Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Nilay Pandey"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. nilaypandey78@gmail.com"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 97700 00000"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Number of Attendees</label>
                    <select
                      value={tickets}
                      onChange={(e) => setTickets(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#760D24] hover:bg-[#8F122D] text-white rounded font-medium text-xs uppercase tracking-wider transition-colors cursor-pointer mt-2"
              >
                Complete Registration & Issue Pass →
              </button>
            </form>
          ) : (
            <div className="space-y-5 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  You’re on the Guest List!
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Confirmation sent to {confirmedReg?.email}. We look forward to welcoming you to the gallery.
                </p>
              </div>

              {/* Digital Pass / Ticket */}
              <div className="bg-white p-5 rounded-lg border-2 border-dashed border-[#760D24]/40 text-left space-y-3 relative">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#760D24] font-bold">
                      Gallery Admission E-Pass
                    </span>
                    <h5 className="font-serif font-bold text-sm text-stone-900">
                      {event.title}
                    </h5>
                    <p className="text-xs text-stone-500 mt-0.5">{event.date} • {event.time}</p>
                  </div>
                  <QrCode className="w-12 h-12 text-[#1C1917]" />
                </div>

                <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Attendee</span>
                    <span className="font-medium">{confirmedReg?.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Admit</span>
                    <span className="font-medium">{confirmedReg?.tickets} {confirmedReg?.tickets === 1 ? 'Person' : 'People'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-stone-400 block">Venue</span>
                    <span className="text-[11px] text-stone-600">{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="flex-1 py-2 px-3 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-2 px-3 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Pass</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-[#760D24] text-white rounded text-xs uppercase tracking-wider font-medium hover:bg-[#8F122D] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

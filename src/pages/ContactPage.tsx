import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, Car, Accessibility, Info } from 'lucide-react';
import { GALLERY_INFO } from '../data/galleryData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Curatorial Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#E7E2D9]">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#760D24] block">
          Location & Curatorial Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Contact & Visit Us
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          We welcome art enthusiasts, students, collectors, and researchers to experience our exhibitions and studio spaces in Raipur.
        </p>
      </div>

      {/* Main Grid: Details & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E7E2D9] shadow-xs space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#760D24] font-semibold">
                Permanent Studio & Gallery
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                {GALLERY_INFO.name}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#760D24] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-900">Address:</p>
                  <p className="text-stone-600 leading-relaxed mt-0.5">
                    {GALLERY_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#760D24] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-900">Visiting Hours:</p>
                  <p className="text-stone-600 leading-relaxed mt-0.5">
                    {GALLERY_INFO.timings}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    Admission: {GALLERY_INFO.admission}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#760D24] shrink-0" />
                <div>
                  <p className="font-medium text-stone-900">Telephone:</p>
                  <a href={`tel:${GALLERY_INFO.phone}`} className="text-[#760D24] hover:underline">
                    {GALLERY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#760D24] shrink-0" />
                <div>
                  <p className="font-medium text-stone-900">Curatorial Email:</p>
                  <a href={`mailto:${GALLERY_INFO.email}`} className="text-[#760D24] hover:underline">
                    {GALLERY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Old+Dhamtari+Road+Raipur+Chhattisgarh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#760D24] hover:bg-[#8F122D] text-white rounded text-xs uppercase tracking-wider font-medium text-center transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Visitor Guidelines */}
          <div className="bg-[#F4EFE6] p-6 rounded-xl border border-[#E7E2D9] space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#760D24]" />
              <span>Visitor Guidelines & Amenities</span>
            </h3>
            
            <ul className="space-y-2 text-stone-600">
              <li className="flex items-start gap-2">
                <Car className="w-4 h-4 text-[#760D24] shrink-0 mt-0.5" />
                <span>Complimentary parking available on-site for cars and two-wheelers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Accessibility className="w-4 h-4 text-[#760D24] shrink-0 mt-0.5" />
                <span>Step-free ground floor exhibition access and accessible restrooms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#760D24] font-bold shrink-0">📷</span>
                <span>Non-commercial photography without flash is permitted in all public galleries.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Google Maps & Contact Message Form */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Interactive Map */}
          <div className="rounded-xl overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-100 aspect-[16/10]">
            <iframe
              title="Dhruva's Art Studio Location Map"
              src="https://maps.google.com/maps?q=Old+Dhamtari+Road+Raipur+Chhattisgarh+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* Curatorial Inquiries Form */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E7E2D9] shadow-xs space-y-5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#760D24] font-semibold">
                Direct Dialogue
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Send a Message to the Curators
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                For artwork acquisition inquiries, group visit requests, or exhibition proposals.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-base text-emerald-950">
                  Message Dispatched to Curatorial Office
                </h4>
                <p className="text-xs text-emerald-800">
                  Thank you for writing. Our team will review your inquiry and respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Sen"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ananya@domain.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded focus:border-[#760D24] focus:outline-none text-stone-700"
                  >
                    <option value="General Curatorial Inquiry">General Curatorial Inquiry</option>
                    <option value="Artwork Acquisition & Provenance">Artwork Acquisition & Provenance</option>
                    <option value="Artist Representation & Portfolio">Artist Representation & Portfolio</option>
                    <option value="Private Tour & School Booking">Private Tour & School Booking</option>
                    <option value="Press & Media Coverage">Press & Media Coverage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry or artwork of interest..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-300 rounded focus:border-[#760D24] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto py-3 px-8 bg-[#760D24] hover:bg-[#8F122D] text-white rounded text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message →</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

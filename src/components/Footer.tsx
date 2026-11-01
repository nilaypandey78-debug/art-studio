import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Instagram, Facebook, Youtube, CheckCircle2 } from 'lucide-react';
import { NavigationTab } from '../types';
import { GALLERY_INFO } from '../data/galleryData';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] pt-16 pb-12 relative overflow-hidden border-t-4 border-[#760D24]">
      {/* Decorative subtle ochre background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#760D24]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#38332E]">
          
          {/* Brand & Mission column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#760D24] flex items-center justify-center p-1">
                <span className="text-[8px] font-serif italic text-[#E4C882]">Dhruva’s</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
                  Dhruva’s
                </h3>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#A8A29E] font-medium">
                  Art Studio N Gallery
                </p>
              </div>
            </div>

            <p className="text-sm text-[#A8A29E] leading-relaxed max-w-sm">
              An independent contemporary art space in Raipur, Chhattisgarh, committed to supporting artists, fostering dialogue, and building an inclusive regional art ecosystem.
            </p>

            <div className="pt-2 text-xs text-[#D6CEBE]/80 space-y-1">
              <p><strong className="text-white font-medium">Admission:</strong> {GALLERY_INFO.admission}</p>
              <p><strong className="text-white font-medium">Hours:</strong> {GALLERY_INFO.timings}</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#E4C882]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D6CEBE]">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('whats-on')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  What's On
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('exhibitions')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Exhibitions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('artists')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Featured Artists
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('collection')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Art Collection (Store)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('events')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Events & Programs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#E4C882]">
              Location & Contact
            </h4>
            <div className="space-y-3 text-sm text-[#D6CEBE]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#760D24] shrink-0 mt-1" />
                <p className="leading-relaxed text-xs">
                  {GALLERY_INFO.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#760D24] shrink-0" />
                <a href={`tel:${GALLERY_INFO.phone}`} className="hover:text-white text-xs transition-colors">
                  {GALLERY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#760D24] shrink-0" />
                <a href={`mailto:${GALLERY_INFO.email}`} className="hover:text-white text-xs transition-colors">
                  {GALLERY_INFO.email}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#E4C882] hover:text-white underline underline-offset-4 transition-colors"
                >
                  Interactive Map & Plan Your Visit →
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#E4C882]">
              Private View Inquiries
            </h4>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              Receive curated invitations to vernissages, artist talks, and catalogue releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-[#292524] text-xs text-white placeholder-[#78716C] px-3.5 py-2.5 rounded border border-[#44403C] focus:outline-none focus:border-[#760D24]"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#760D24] hover:bg-[#8F122D] text-white rounded text-xs flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you for subscribing to Dhruva’s Gallery.</span>
                </div>
              )}
            </form>

            <div className="pt-3">
              <span className="block text-[11px] uppercase tracking-wider text-[#78716C] mb-2 font-medium">
                Follow the Studio
              </span>
              <div className="flex items-center gap-3 text-[#A8A29E]">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-[#292524] flex items-center justify-center hover:text-white hover:bg-[#760D24] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-[#292524] flex items-center justify-center hover:text-white hover:bg-[#760D24] transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-[#292524] flex items-center justify-center hover:text-white hover:bg-[#760D24] transition-all"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright and Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <p>
            © {new Date().getFullYear()} Dhruva’s Art Studio N Gallery, Raipur. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
            >
              Curator & Admin Portal
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#FAF7F2] transition-colors cursor-pointer"
            >
              Contact Curators
            </button>
            <span>Raipur, Chhattisgarh</span>
          </div>
        </div>
      </div>

      {/* Decorative textured pigment wash bar matching Image 1 */}
      <div className="w-full h-3 bg-gradient-to-r from-[#760D24] via-[#B45309] to-[#78350F] opacity-75 mt-8" />
    </footer>
  );
};

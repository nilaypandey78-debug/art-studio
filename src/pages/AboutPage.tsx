import React from 'react';
import { Palette, BookOpen, MessageCircle, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { GALLERY_INFO, GALLERY_LEADERSHIP, GALLERY_PILLARS } from '../data/galleryData';
import { NavigationTab } from '../types';

interface AboutPageProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. TOP ABOUT SECTION Matching Reference Image 1 & 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#760D24] block">
              About Us
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
              A Contemporary Art Space in Raipur
            </h1>

            <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed text-justify sm:text-left">
              Dhruva’s Art Studio & Gallery is an independent contemporary art space in Raipur, Chhattisgarh, committed to supporting artists, fostering dialogue and engaging with a wider cultural community through exhibitions, programmes and collaborations.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 group cursor-pointer"
              >
                <span className="border-b-2 border-[#760D24] pb-0.5 group-hover:text-[#760D24] transition-colors">
                  Our Vision
                </span>
                <span className="text-[#760D24] transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl overflow-hidden border border-[#E7E2D9] shadow-xl bg-stone-200 aspect-[16/10]">
              <img
                src="/public/assets/gallery/gallery_interior_about.jpg"
                alt="Dhruva's Gallery interior with contemporary sculptures and canvases"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. ABOUT THE GALLERY Split Section Matching Reference Image 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#F4EFE6] p-8 sm:p-12 rounded-2xl border border-[#E7E2D9]">
          
          {/* Left: Close-up Clay Sculpture */}
          <div className="md:col-span-4">
            <div className="aspect-square rounded-xl overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-200">
              <img
                src="/public/assets/gallery/clay_face_profile.jpg"
                alt="Clay sculpted profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </div>

          {/* Right: Curatorial Narrative with vertical divider */}
          <div className="md:col-span-8 md:border-l md:border-stone-300 md:pl-8 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              About the Gallery
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              Established as a platform for artistic expression, Dhruva's Art Studio & Gallery brings together contemporary art practices from Chhattisgarh and beyond. The gallery hosts curated exhibitions, artists' projects, workshops and cultural programmes that explore the intersections of art, society and everyday life.
            </p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              More than a display space, it is conceived as a place for encounter — between artists, ideas, materials and audiences — nurturing a vibrant and inclusive art ecosystem in the region.
            </p>
          </div>

        </div>
      </section>

      {/* 3. THREE PILLARS OF PRACTICE Matching Reference Image 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E7E2D9]">
          
          <div className="space-y-3 pt-6 md:pt-0 md:pr-6">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E7E2D9] flex items-center justify-center text-[#760D24]">
              <Palette className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Exhibitions
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Curated shows by emerging and established artists across painting, sculpture, and new media.
            </p>
          </div>

          <div className="space-y-3 pt-6 md:pt-0 md:px-6">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E7E2D9] flex items-center justify-center text-[#760D24]">
              <BookOpen className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Programs
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Talks, workshops and learning initiatives designed to demystify artistic practice for public audiences.
            </p>
          </div>

          <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E7E2D9] flex items-center justify-center text-[#760D24]">
              <MessageCircle className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Collaborations
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Partnerships with cultural, academic, and community institutions in Chhattisgarh and across the country.
            </p>
          </div>

        </div>
      </section>

      {/* 4. LEADERSHIP NOTES Matching Reference Image 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-t border-[#E7E2D9] pt-12">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#760D24] block mb-1">
            Vision & Leadership
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Voices from the Studio
          </h2>
        </div>

        <div className="space-y-12 divide-y divide-[#E7E2D9]">
          {GALLERY_LEADERSHIP.map((leader) => (
            <div
              key={leader.name}
              className="pt-10 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              {/* Leader Photo */}
              <div className="md:col-span-3">
                <div className="aspect-square rounded-lg overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-200">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                </div>
              </div>

              {/* Leader Quote & Statement with vertical divider */}
              <div className="md:col-span-9 md:border-l md:border-[#E7E2D9] md:pl-8 space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#760D24] block">
                  {leader.label}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {leader.quote}
                </h3>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify sm:text-left font-sans">
                  {leader.text}
                </p>

                <div className="pt-2">
                  <p className="font-serif font-bold text-stone-900 text-sm">
                    — {leader.name}
                  </p>
                  <p className="font-serif italic text-xs text-stone-500">
                    {leader.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VISIT US SECTION Matching Reference Image 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#E7E2D9] pt-12 space-y-8">
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Visit Us
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-[#E7E2D9] shadow-sm">
            
            {/* Details */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#760D24] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-serif text-base text-stone-900 font-bold mb-0.5">
                      {GALLERY_INFO.name}
                    </strong>
                    <p className="leading-relaxed text-stone-600">
                      {GALLERY_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#760D24] shrink-0" />
                  <a href={`tel:${GALLERY_INFO.phone}`} className="hover:text-[#760D24] transition-colors">
                    {GALLERY_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#760D24] shrink-0" />
                  <a href={`mailto:${GALLERY_INFO.email}`} className="hover:text-[#760D24] transition-colors">
                    {GALLERY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="py-2.5 px-5 bg-[#760D24] text-white rounded text-xs uppercase tracking-wider font-medium hover:bg-[#8F122D] transition-colors cursor-pointer"
                >
                  Contact & Directions →
                </button>
              </div>
            </div>

            {/* Stylized Architectural Map */}
            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-[#E7E2D9] shadow-inner bg-[#F3EEE5] aspect-[16/9] relative flex items-center justify-center p-4">
                <iframe
                  title="Dhruva's Art Studio N Gallery Map"
                  src="https://maps.google.com/maps?q=Old+Dhamtari+Road+Raipur+Chhattisgarh+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full rounded border-0"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

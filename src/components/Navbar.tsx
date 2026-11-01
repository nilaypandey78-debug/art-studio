import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ShieldCheck } from 'lucide-react';
import { NavigationTab } from '../types';

interface NavbarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'whats-on', label: "What's On" },
    { id: 'exhibitions', label: 'Exhibitions' },
    { id: 'artists', label: 'Artists' },
    { id: 'collection', label: 'Art Collection' },
    { id: 'events', label: 'Events & Programs' },
    { id: 'about', label: 'About' },
  ];

  const handleTabClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E2D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Wordmark matching Reference */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* Circular Black and Gold Emblem */}
            <div className="relative w-12 h-12 rounded-full bg-[#111111] border-2 border-[#760D24] shadow-sm flex items-center justify-center text-center p-1 overflow-hidden transition-transform group-hover:scale-105">
              <div className="text-[9px] leading-tight font-serif text-[#E4C882] font-semibold italic">
                <span>Dhruva’s</span>
                <span className="block text-[6.5px] uppercase tracking-tighter text-[#EFE7D2] font-sans font-normal mt-0.5">
                  Art Studio N Gallery
                </span>
              </div>
            </div>

            {/* Typography Wordmark */}
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917] leading-none">
                Dhruva’s
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.2em] text-[#44403C] font-semibold mt-1">
                Art Studio N Gallery
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[14px] font-normal text-[#292524]">
            <div className="h-5 w-[1px] bg-[#D7D0C5] mr-1" aria-hidden="true" />
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative py-2 whitespace-nowrap transition-colors cursor-pointer hover:text-[#760D24] ${
                    isActive ? 'font-medium text-[#760D24]' : 'text-[#3D3A37]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#760D24] rounded-full transition-all"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search exhibitions, artists, and artworks"
              className="p-2 text-[#292524] hover:text-[#760D24] hover:bg-[#F0EAE1] rounded-full transition-colors cursor-pointer"
              title="Search Gallery"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              aria-label="View Wishlist"
              className="relative p-2 text-[#292524] hover:text-[#760D24] hover:bg-[#F0EAE1] rounded-full transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 stroke-[1.75] ${wishlistCount > 0 ? 'fill-[#760D24] text-[#760D24]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute 1 top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#760D24] text-white text-[10px] font-medium flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="View Shopping Cart"
              className="relative p-2 text-[#292524] hover:text-[#760D24] hover:bg-[#F0EAE1] rounded-full transition-colors cursor-pointer"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#760D24] text-white text-[10px] font-medium flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Switch */}
            <button
              onClick={() => handleTabClick('admin')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase font-medium rounded border transition-colors ${
                currentTab === 'admin'
                  ? 'bg-[#760D24] text-white border-[#760D24]'
                  : 'bg-transparent text-[#57534E] border-[#D6CEBE] hover:border-[#760D24] hover:text-[#760D24]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 text-[#292524] hover:bg-[#F0EAE1] rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E7E2D9] px-6 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`text-left py-2 text-base border-b border-[#F0EAE1] transition-colors ${
                  currentTab === item.id 
                    ? 'font-medium text-[#760D24] pl-2 border-l-2 border-[#760D24]' 
                    : 'text-[#3D3A37]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 flex items-center justify-between">
              <button
                onClick={() => handleTabClick('contact')}
                className="text-sm font-medium text-[#760D24] hover:underline"
              >
                Contact & Visit Us →
              </button>
              <button
                onClick={() => handleTabClick('admin')}
                className="flex items-center gap-1.5 text-xs text-[#57534E] px-2.5 py-1 border border-[#D6CEBE] rounded"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Portal
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab, Exhibition, Artist, Artwork, EventProgram, Order, EventRegistration, CartItem } from './types';
import { INITIAL_EXHIBITIONS, INITIAL_ARTISTS, INITIAL_ARTWORKS, INITIAL_EVENTS } from './data/galleryData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { WhatsOnPage } from './pages/WhatsOnPage';
import { ExhibitionsPage } from './pages/ExhibitionsPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { ArtCollectionPage } from './pages/ArtCollectionPage';
import { EventsPage } from './pages/EventsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { RazorpayModal } from './components/RazorpayModal';
import { SearchModal } from './components/SearchModal';
import { EventRegisterModal } from './components/EventRegisterModal';
import { ArtworkDetailModal } from './components/ArtworkDetailModal';
import { ArtistDetailModal } from './components/ArtistDetailModal';
import { ExhibitionDetailModal } from './components/ExhibitionDetailModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  
  // Primary Repository State (Synchronized across applet)
  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(INITIAL_EXHIBITIONS);
  const [artists, setArtists] = useState<Artist[]>(INITIAL_ARTISTS);
  const [events, setEvents] = useState<EventProgram[]>(INITIAL_EVENTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);

  // Collector Commerce State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['art-1', 'art-4']);

  // Modals & Overlay Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<EventProgram | null>(null);

  // Cart Handlers
  const handleAddToCart = (artwork: Artwork) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.artwork.id === artwork.id);
      if (existing) {
        return prev.map((item) =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { artwork, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (artworkId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.artwork.id === artworkId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (artworkId: string) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId));
  };

  const handleToggleWishlist = (artworkId: string) => {
    setWishlistIds((prev) =>
      prev.includes(artworkId)
        ? prev.filter((id) => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  // Immediate Buy Now Trigger
  const handleBuyNow = (artwork: Artwork) => {
    setCheckoutItems([{ artwork, quantity: 1 }]);
    setIsRazorpayOpen(true);
  };

  // Cart Proceed to Checkout Trigger
  const handleProceedCartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutItems(cart);
    setIsCartOpen(false);
    setIsRazorpayOpen(true);
  };

  // Payment Success in Razorpay
  const handlePaymentSuccess = (confirmedOrder: Order) => {
    setOrders((prev) => [confirmedOrder, ...prev]);
    // If the cart items were purchased, clear cart
    setCart([]);
  };

  // Event Registration Success
  const handleEventRegisterSuccess = (reg: EventRegistration) => {
    setRegistrations((prev) => [reg, ...prev]);
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === reg.eventId
          ? { ...ev, registeredCount: ev.registeredCount + reg.tickets }
          : ev
      )
    );
  };

  // Cross-Navigation Helpers
  const handleViewArtistByName = (artistName: string) => {
    const artist = artists.find((a) => a.name.toLowerCase() === artistName.toLowerCase());
    if (artist) {
      setSelectedArtist(artist);
    }
  };

  const handleViewArtistById = (artistId: string) => {
    const artist = artists.find((a) => a.id === artistId);
    if (artist) {
      setSelectedArtist(artist);
    }
  };

  const handleViewExhibitionByTitle = (title: string) => {
    const ex = exhibitions.find((e) => e.title.toLowerCase() === title.toLowerCase());
    if (ex) {
      setSelectedExhibition(ex);
    }
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col font-sans selection:bg-[#760D24] selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => {
          setCurrentTab('collection');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Page Content with Smooth Transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentTab === 'home' && (
              <HomePage
                onNavigate={setCurrentTab}
                exhibitions={exhibitions}
                artists={artists}
                artworks={artworks}
                onSelectExhibition={setSelectedExhibition}
                onSelectArtist={setSelectedArtist}
                onSelectArtwork={setSelectedArtwork}
              />
            )}

            {currentTab === 'whats-on' && (
              <WhatsOnPage
                exhibitions={exhibitions}
                events={events}
                onSelectExhibition={setSelectedExhibition}
                onRegisterEvent={setRegisteringEvent}
              />
            )}

            {currentTab === 'exhibitions' && (
              <ExhibitionsPage
                exhibitions={exhibitions}
                onSelectExhibition={setSelectedExhibition}
              />
            )}

            {currentTab === 'artists' && (
              <ArtistsPage
                artists={artists}
                onSelectArtist={setSelectedArtist}
              />
            )}

            {currentTab === 'collection' && (
              <ArtCollectionPage
                artworks={artworks}
                onSelectArtwork={setSelectedArtwork}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {currentTab === 'events' && (
              <EventsPage
                events={events}
                onRegisterEvent={setRegisteringEvent}
              />
            )}

            {currentTab === 'about' && (
              <AboutPage
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'contact' && (
              <ContactPage />
            )}

            {currentTab === 'admin' && (
              <AdminDashboard
                artworks={artworks}
                onUpdateArtworks={setArtworks}
                exhibitions={exhibitions}
                onUpdateExhibitions={setExhibitions}
                artists={artists}
                onUpdateArtists={setArtists}
                events={events}
                onUpdateEvents={setEvents}
                orders={orders}
                registrations={registrations}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentTab} />

      {/* Global Modals & Drawers */}
      
      {/* 1. Collector Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedCartCheckout}
        onExploreCollection={() => {
          setIsCartOpen(false);
          setCurrentTab('collection');
        }}
      />

      {/* 2. Razorpay Payment Gateway Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        items={checkoutItems}
        totalINR={checkoutItems.reduce((sum, it) => sum + it.artwork.priceINR * it.quantity, 0)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 3. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        exhibitions={exhibitions}
        artists={artists}
        artworks={artworks}
        events={events}
        onSelectExhibition={setSelectedExhibition}
        onSelectArtist={setSelectedArtist}
        onSelectArtwork={setSelectedArtwork}
        onSelectEvent={setRegisteringEvent}
      />

      {/* 4. Event Registration & Digital Pass Modal */}
      <EventRegisterModal
        isOpen={!!registeringEvent}
        onClose={() => setRegisteringEvent(null)}
        event={registeringEvent}
        onRegisterSuccess={handleEventRegisterSuccess}
      />

      {/* 5. Artwork Detail & Lightbox Modal */}
      <ArtworkDetailModal
        isOpen={!!selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        artwork={selectedArtwork}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedArtwork ? wishlistIds.includes(selectedArtwork.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onViewArtist={handleViewArtistById}
      />

      {/* 6. Artist Profile Modal */}
      <ArtistDetailModal
        isOpen={!!selectedArtist}
        onClose={() => setSelectedArtist(null)}
        artist={selectedArtist}
        artworks={artworks}
        onSelectArtwork={setSelectedArtwork}
        onViewExhibition={handleViewExhibitionByTitle}
      />

      {/* 7. Exhibition Detail Modal (Matching Image 6) */}
      <ExhibitionDetailModal
        isOpen={!!selectedExhibition}
        onClose={() => setSelectedExhibition(null)}
        exhibition={selectedExhibition}
        artworks={artworks}
        artists={artists}
        onSelectArtwork={setSelectedArtwork}
        onSelectArtistByName={handleViewArtistByName}
      />

    </div>
  );
}

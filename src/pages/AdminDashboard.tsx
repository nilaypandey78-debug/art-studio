import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, ShieldCheck, DollarSign, Calendar, Users, 
  ShoppingBag, CheckCircle, Clock, AlertCircle, FileText, Download, 
  Eye, RefreshCw, Sparkles, Lock, ArrowUpRight
} from 'lucide-react';
import { Artwork, Exhibition, Artist, EventProgram, Order, EventRegistration, ArtworkCategory, ArtistDiscipline, ExhibitionStatus } from '../types';

interface AdminDashboardProps {
  artworks: Artwork[];
  onUpdateArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  exhibitions: Exhibition[];
  onUpdateExhibitions: React.Dispatch<React.SetStateAction<Exhibition[]>>;
  artists: Artist[];
  onUpdateArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
  events: EventProgram[];
  onUpdateEvents: React.Dispatch<React.SetStateAction<EventProgram[]>>;
  orders: Order[];
  registrations: EventRegistration[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  artworks,
  onUpdateArtworks,
  exhibitions,
  onUpdateExhibitions,
  artists,
  onUpdateArtists,
  events,
  onUpdateEvents,
  orders,
  registrations,
}) => {
  const [activeTab, setActiveTab] = useState<'artworks' | 'exhibitions' | 'artists' | 'orders' | 'registrations' | 'settings'>('artworks');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Artwork Form State
  const [showAddArtModal, setShowAddArtModal] = useState(false);
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtArtist, setNewArtArtist] = useState(artists[0]?.name || '');
  const [newArtCategory, setNewArtCategory] = useState<ArtworkCategory>('Paintings');
  const [newArtMedium, setNewArtMedium] = useState('');
  const [newArtDimensions, setNewArtDimensions] = useState('');
  const [newArtPrice, setNewArtPrice] = useState(75000);
  const [newArtYear, setNewArtYear] = useState(2026);
  const [newArtImage, setNewArtImage] = useState('/src/assets/images/watercolor_landscape_1793542982805.jpg');

  // Exhibition Form State
  const [showAddExModal, setShowAddExModal] = useState(false);
  const [newExTitle, setNewExTitle] = useState('');
  const [newExSubtitle, setNewExSubtitle] = useState('');
  const [newExDates, setNewExDates] = useState('');
  const [newExCurator, setNewExCurator] = useState('Chirayu Kumar Sinha');
  const [newExStatus, setNewExStatus] = useState<ExhibitionStatus>('upcoming');

  const flashNotice = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Add Artwork Handler
  const handleAddArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle || !newArtMedium) return;

    const matchedArtist = artists.find(a => a.name === newArtArtist) || artists[0];

    const created: Artwork = {
      id: `art-${Date.now()}`,
      title: newArtTitle,
      artistId: matchedArtist.id,
      artistName: matchedArtist.name,
      category: newArtCategory,
      medium: newArtMedium,
      dimensions: newArtDimensions || '70 x 90 cm',
      year: newArtYear,
      priceINR: Number(newArtPrice),
      image: newArtImage,
      description: `Newly curated ${newArtCategory.toLowerCase()} acquisition created for Dhruva's Studio N Gallery.`,
      isAvailable: true,
      featured: false,
    };

    onUpdateArtworks([created, ...artworks]);
    setShowAddArtModal(false);
    setNewArtTitle('');
    setNewArtMedium('');
    flashNotice(`Artwork "${created.title}" added to inventory.`);
  };

  // Toggle Artwork Availability
  const handleToggleAvailability = (id: string) => {
    onUpdateArtworks(prev => prev.map(a => a.id === id ? { ...a, isAvailable: !a.isAvailable } : a));
    flashNotice('Inventory status updated.');
  };

  // Update Artwork Price
  const handleQuickPriceChange = (id: string, newPrice: number) => {
    onUpdateArtworks(prev => prev.map(a => a.id === id ? { ...a, priceINR: newPrice } : a));
    flashNotice('Price updated successfully.');
  };

  // Delete Artwork
  const handleDeleteArtwork = (id: string) => {
    onUpdateArtworks(prev => prev.filter(a => a.id !== id));
    flashNotice('Artwork removed from catalog.');
  };

  // Add Exhibition
  const handleAddExhibition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExTitle || !newExDates) return;

    const createdEx: Exhibition = {
      id: newExTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newExTitle,
      subtitle: newExSubtitle || 'Curated Contemporary Exposition',
      dates: newExDates,
      dateRange: { start: '2026-10-01', end: '2026-10-20' },
      status: newExStatus,
      curator: newExCurator,
      location: "Dhruva's Art Studio N Gallery, Raipur",
      description: newExSubtitle,
      curatorialEssay: 'A dynamic curatorial inquiry examining contemporary spatial practices in Chhattisgarh.',
      image: '/src/assets/images/gallery_interior_1793542983026.jpg',
      heroImage: '/src/assets/images/gallery_interior_1793542983026.jpg',
      participatingArtists: ['Jiten Sahu', 'Dhruva Tiwari', 'Rani Madane'],
      artworksCount: 16,
    };

    onUpdateExhibitions([createdEx, ...exhibitions]);
    setShowAddExModal(false);
    flashNotice(`Exhibition "${createdEx.title}" announced.`);
  };

  // Toggle Exhibition Status
  const handleToggleExStatus = (id: string, newStatus: ExhibitionStatus) => {
    onUpdateExhibitions(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
    flashNotice('Exhibition status updated.');
  };

  // Export registrations CSV
  const handleExportRegistrations = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["ID,Event Title,Attendee Name,Email,Phone,Tickets,Date,Status"]
      .concat(registrations.map(r => `"${r.id}","${r.eventTitle}","${r.fullName}","${r.email}","${r.phone}",${r.tickets},"${r.date}","${r.status}"`))
      .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dhruvas_event_attendees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#1C1917] text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-[#760D24] shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#E4C882]" />
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#E4C882]">
              Curator & Gallery Director Console
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Studio N Gallery Admin
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Manage artworks, curate exhibitions, oversee Razorpay orders, and track event guest lists.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-4 py-2 rounded text-right">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Inventory Value</span>
            <span className="font-serif font-bold text-sm text-[#E4C882]">
              ₹{artworks.reduce((sum, a) => sum + a.priceINR, 0).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Status Notice Alert */}
      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E7E2D9] pb-2 overflow-x-auto text-xs no-scrollbar">
        {[
          { id: 'artworks', label: 'Artworks & Pricing', count: artworks.length },
          { id: 'exhibitions', label: 'Exhibitions', count: exhibitions.length },
          { id: 'artists', label: 'Featured Artists', count: artists.length },
          { id: 'orders', label: 'Orders & Razorpay', count: orders.length },
          { id: 'registrations', label: 'Event Guest Lists', count: registrations.length },
          { id: 'settings', label: 'Gallery Settings' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
                isActive 
                  ? 'bg-[#760D24] text-white shadow-xs' 
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ARTWORKS MANAGEMENT */}
      {activeTab === 'artworks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Gallery Inventory & Price Catalog
              </h2>
              <p className="text-xs text-stone-500">
                Update prices, toggle availability, and catalog new acquisitions.
              </p>
            </div>
            <button
              onClick={() => setShowAddArtModal(true)}
              className="py-2.5 px-4 bg-[#760D24] hover:bg-[#8F122D] text-white rounded text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Catalog New Artwork</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E7E2D9] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] border-b border-[#E7E2D9] text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Artwork</th>
                    <th className="py-3 px-4">Artist</th>
                    <th className="py-3 px-4">Category / Medium</th>
                    <th className="py-3 px-4">Price (INR)</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2D9] text-stone-700">
                  {artworks.map((art) => (
                    <tr key={art.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={art.image}
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover rounded bg-stone-100 shrink-0"
                          />
                          <div>
                            <span className="font-serif font-bold text-stone-900 block">{art.title}</span>
                            <span className="text-[10px] text-stone-400">{art.dimensions} • {art.year}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{art.artistName}</td>
                      <td className="py-3 px-4">
                        <span className="text-stone-900 block">{art.category}</span>
                        <span className="text-[10px] text-stone-400 truncate max-w-[150px] block">{art.medium}</span>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          defaultValue={art.priceINR}
                          onBlur={(e) => handleQuickPriceChange(art.id, Number(e.target.value))}
                          className="w-24 px-2 py-1 bg-stone-50 border border-stone-200 rounded font-mono font-semibold text-stone-900 focus:bg-white focus:border-[#760D24] focus:outline-none"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAvailability(art.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer ${
                            art.isAvailable 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-stone-100 text-stone-500 border border-stone-200'
                          }`}
                        >
                          {art.isAvailable ? 'In Stock' : 'Sold Out'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteArtwork(art.id)}
                          aria-label="Delete artwork"
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXHIBITIONS MANAGEMENT */}
      {activeTab === 'exhibitions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Curatorial Exhibition Programming
              </h2>
              <p className="text-xs text-stone-500">
                Publish exhibitions, configure dates, and update curatorial credits.
              </p>
            </div>
            <button
              onClick={() => setShowAddExModal(true)}
              className="py-2.5 px-4 bg-[#760D24] hover:bg-[#8F122D] text-white rounded text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Announce Exhibition</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exhibitions.map((ex) => (
              <div key={ex.id} className="p-4 bg-white rounded-xl border border-[#E7E2D9] space-y-3 shadow-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900">{ex.title}</h3>
                    <p className="text-xs text-stone-500 italic">{ex.subtitle}</p>
                  </div>
                  <select
                    value={ex.status}
                    onChange={(e) => handleToggleExStatus(ex.id, e.target.value as any)}
                    className="text-xs px-2 py-1 bg-stone-50 border border-stone-200 rounded font-medium text-stone-700"
                  >
                    <option value="current">Current</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>

                <div className="text-xs text-stone-600 space-y-1">
                  <p><strong className="text-stone-700">Dates:</strong> {ex.dates}</p>
                  <p><strong className="text-stone-700">Curator:</strong> {ex.curator}</p>
                  <p className="line-clamp-1"><strong className="text-stone-700">Artists:</strong> {ex.participatingArtists.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ARTISTS */}
      {activeTab === 'artists' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Featured Artist Roster
              </h2>
              <p className="text-xs text-stone-500">
                Biographical records and active studio participants.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {artists.map((artist) => (
              <div key={artist.id} className="p-4 bg-white rounded-xl border border-[#E7E2D9] flex gap-4 items-center shadow-xs">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-200 shrink-0">
                  <img
                    src={artist.portrait}
                    alt={artist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-bold text-stone-900 truncate">{artist.name}</h4>
                  <p className="text-xs text-stone-500 italic">{artist.discipline} {artist.role ? `• ${artist.role}` : ''}</p>
                  <p className="text-[10px] text-stone-400 mt-0.5 truncate">{artist.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ORDERS & RAZORPAY */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Collector Orders & Razorpay Transactions
              </h2>
              <p className="text-xs text-stone-500">
                Live order records, courier fulfillment, and payment IDs.
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 bg-white rounded-xl border border-[#E7E2D9] text-center space-y-2">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="font-serif text-base font-bold text-stone-800">No Orders Yet</h3>
              <p className="text-xs text-stone-500">
                When collectors purchase artworks through the Razorpay gateway, transactions appear here with full invoice details.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E7E2D9] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#E7E2D9] text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Collector</th>
                      <th className="py-3 px-4">Artworks</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Gateway ID</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2D9] text-stone-700">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/50">
                        <td className="py-3 px-4 font-mono font-medium text-stone-900">{ord.orderNumber}</td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-stone-900 block">{ord.customerName}</span>
                          <span className="text-[10px] text-stone-400">{ord.customerEmail} • {ord.customerPhone}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs text-stone-700">
                            {ord.items.map(i => `${i.artwork.title} (x${i.quantity})`).join(', ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-serif font-bold text-[#760D24]">
                          ₹{ord.totalINR.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-stone-500">
                          {ord.paymentId}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {ord.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: REGISTRATIONS */}
      {activeTab === 'registrations' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Public Program Attendees & Guest Lists
              </h2>
              <p className="text-xs text-stone-500">
                Live attendance for artist talks, watercolor landscape camps, and ceramic workshops.
              </p>
            </div>
            {registrations.length > 0 && (
              <button
                onClick={handleExportRegistrations}
                className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Guest List (CSV)</span>
              </button>
            )}
          </div>

          {registrations.length === 0 ? (
            <div className="p-12 bg-white rounded-xl border border-[#E7E2D9] text-center space-y-2">
              <Users className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="font-serif text-base font-bold text-stone-800">No Event Registrations Yet</h3>
              <p className="text-xs text-stone-500">
                When visitors sign up for Artist Talks or Workshops, their confirmed digital passes will be logged here.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E7E2D9] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#E7E2D9] text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Event</th>
                      <th className="py-3 px-4">Attendee</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Pass Count</th>
                      <th className="py-3 px-4">Booked Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2D9] text-stone-700">
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-stone-50/50">
                        <td className="py-3 px-4 font-serif font-bold text-stone-900">{reg.eventTitle}</td>
                        <td className="py-3 px-4 font-medium">{reg.fullName}</td>
                        <td className="py-3 px-4 text-stone-500">
                          <div>{reg.email}</div>
                          <div>{reg.phone}</div>
                        </td>
                        <td className="py-3 px-4 font-semibold">{reg.tickets} Person(s)</td>
                        <td className="py-3 px-4 text-stone-500">{reg.date}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {reg.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-xl border border-[#E7E2D9] space-y-6 max-w-2xl">
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Gallery Public Details & Timings
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 mb-1 font-medium">Gallery Name</label>
              <input
                type="text"
                defaultValue="Dhruva’s Art Studio N Gallery"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-medium">Gallery Physical Address</label>
              <input
                type="text"
                defaultValue="Near Kalpavriksh Resort and Villa, Old Dhamtari Road, Raipur, Chhattisgarh – 492002"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Telephone</label>
                <input
                  type="text"
                  defaultValue="+91 97700 00000"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Curatorial Email</label>
                <input
                  type="email"
                  defaultValue="info@dhruvasgallery.com"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-medium">Admission Note</label>
              <input
                type="text"
                defaultValue="Free Public Admission • Tue-Sun 11:00 AM – 7:30 PM"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded"
              />
            </div>
          </div>

          <button
            onClick={() => flashNotice('Settings saved to gallery repository.')}
            className="py-2.5 px-6 bg-[#760D24] text-white rounded text-xs uppercase tracking-wider font-medium hover:bg-[#8F122D] transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Modal: Add Artwork */}
      {showAddArtModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF7F2] text-[#1C1917] rounded-xl shadow-2xl max-w-lg w-full border border-[#E7E2D9] overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900">Catalog New Artwork</h3>
              <button onClick={() => setShowAddArtModal(false)} className="text-stone-400 hover:text-stone-800">✕</button>
            </div>

            <form onSubmit={handleAddArtwork} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1">Artwork Title</label>
                <input
                  type="text"
                  required
                  value={newArtTitle}
                  onChange={(e) => setNewArtTitle(e.target.value)}
                  placeholder="e.g. Symphony of Clay and Sky"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1">Artist</label>
                  <select
                    value={newArtArtist}
                    onChange={(e) => setNewArtArtist(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                  >
                    {artists.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Category</label>
                  <select
                    value={newArtCategory}
                    onChange={(e) => setNewArtCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                  >
                    <option value="Paintings">Paintings</option>
                    <option value="Sculptures">Sculptures</option>
                    <option value="Abstract Art">Abstract Art</option>
                    <option value="Contemporary Art">Contemporary Art</option>
                    <option value="Mixed Media">Mixed Media</option>
                    <option value="Prints">Prints</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Medium & Support</label>
                <input
                  type="text"
                  required
                  value={newArtMedium}
                  onChange={(e) => setNewArtMedium(e.target.value)}
                  placeholder="e.g. Raw Terracotta & Brass Inlay"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={newArtPrice}
                    onChange={(e) => setNewArtPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={newArtDimensions}
                    onChange={(e) => setNewArtDimensions(e.target.value)}
                    placeholder="e.g. 50 x 70 cm"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddArtModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#760D24] text-white rounded font-medium hover:bg-[#8F122D]"
                >
                  Save to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Exhibition */}
      {showAddExModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF7F2] text-[#1C1917] rounded-xl shadow-2xl max-w-lg w-full border border-[#E7E2D9] overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900">Announce Exhibition</h3>
              <button onClick={() => setShowAddExModal(false)} className="text-stone-400 hover:text-stone-800">✕</button>
            </div>

            <form onSubmit={handleAddExhibition} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1">Exhibition Title</label>
                <input
                  type="text"
                  required
                  value={newExTitle}
                  onChange={(e) => setNewExTitle(e.target.value)}
                  placeholder="e.g. Shadows of the Forest"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Curatorial Subtitle</label>
                <input
                  type="text"
                  value={newExSubtitle}
                  onChange={(e) => setNewExSubtitle(e.target.value)}
                  placeholder="e.g. Dialogues between memory and raw earth"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1">Dates</label>
                  <input
                    type="text"
                    required
                    value={newExDates}
                    onChange={(e) => setNewExDates(e.target.value)}
                    placeholder="e.g. 10 – 25 November 2026"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Status</label>
                  <select
                    value={newExStatus}
                    onChange={(e) => setNewExStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="current">Current</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddExModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#760D24] text-white rounded font-medium hover:bg-[#8F122D]"
                >
                  Publish Exhibition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

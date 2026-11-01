export type NavigationTab = 
  | 'home' 
  | 'whats-on' 
  | 'exhibitions' 
  | 'artists' 
  | 'collection' 
  | 'events' 
  | 'about' 
  | 'contact' 
  | 'admin';

export type ExhibitionStatus = 'current' | 'upcoming' | 'past';

export interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  dateRange: { start: string; end: string };
  status: ExhibitionStatus;
  curator: string;
  location: string;
  description: string;
  curatorialEssay: string;
  image: string;
  heroImage: string;
  participatingArtists: string[];
  artworksCount: number;
}

export type ArtistDiscipline = 'Painter' | 'Sculptor' | 'Printmaker' | 'Mixed Media';

export interface Artist {
  id: string;
  name: string;
  discipline: ArtistDiscipline;
  role?: string;
  bio: string;
  statement: string;
  portrait: string;
  location: string;
  featuredArtworks: string[];
  exhibitions: string[];
}

export type ArtworkCategory = 
  | 'Paintings' 
  | 'Sculptures' 
  | 'Abstract Art' 
  | 'Contemporary Art' 
  | 'Mixed Media' 
  | 'Prints';

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  category: ArtworkCategory;
  medium: string;
  dimensions: string;
  year: number;
  priceINR: number;
  image: string;
  description: string;
  isAvailable: boolean;
  featured?: boolean;
}

export interface EventProgram {
  id: string;
  title: string;
  type: 'Artist Talk' | 'Workshop' | 'Exhibition' | 'Camp';
  category: 'exhibitions' | 'events' | 'programs';
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  instructor?: string;
  fee: string;
  image: string;
  description: string;
  capacity: number;
  registeredCount: number;
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  tickets: number;
  date: string;
  status: 'Confirmed' | 'Pending';
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  items: CartItem[];
  totalINR: number;
  paymentMethod: 'Razorpay UPI' | 'Razorpay Card' | 'Netbanking';
  paymentId: string;
  paymentStatus: 'Paid' | 'Processing' | 'Failed';
  createdAt: string;
}

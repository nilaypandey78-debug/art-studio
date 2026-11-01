import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Lock, CreditCard, Smartphone, Building, Download, Printer } from 'lucide-react';
import { CartItem, Order } from '../types';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalINR: number;
  onPaymentSuccess: (order: Order) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  items,
  totalINR,
  onPaymentSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  
  // Customer details form
  const [customerName, setCustomerName] = useState('Nilay Pandey');
  const [customerEmail, setCustomerEmail] = useState('nilaypandey78@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [shippingAddress, setShippingAddress] = useState('Flat 402, Shalimar Heights, VIP Road');
  const [city, setCity] = useState('Raipur');
  const [postalCode, setPostalCode] = useState('492001');

  // Payment mock states
  const [upiId, setUpiId] = useState('collector@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handlePayNow = () => {
    setStep('processing');
    setTimeout(() => {
      const generatedOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber: `DHRUVA-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        postalCode,
        items,
        totalINR,
        paymentMethod: paymentMethod === 'upi' ? 'Razorpay UPI' : paymentMethod === 'card' ? 'Razorpay Card' : 'Netbanking',
        paymentId: `pay_${Math.random().toString(36).substring(2, 12)}`,
        paymentStatus: 'Paid',
        createdAt: new Date().toISOString(),
      };
      setConfirmedOrder(generatedOrder);
      setStep('success');
      onPaymentSuccess(generatedOrder);
    }, 1800);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white text-[#1C1917] rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#E7E2D9] max-h-[90vh] flex flex-col">
        
        {/* Razorpay Authentic Header */}
        <div className="bg-[#0c2340] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#3395ff] text-white font-bold flex items-center justify-center text-sm shadow">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight">Razorpay Trusted</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
                  <Lock className="w-2.5 h-2.5" /> SECURE 256-BIT
                </span>
              </div>
              <p className="text-xs text-blue-200">Dhruva’s Art Studio N Gallery</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close Payment Modal"
            className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'details' && (
            <div className="space-y-4">
              <div className="bg-[#FAF7F2] p-4 rounded-lg border border-[#E7E2D9]">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-stone-600">Total Artwork Value</span>
                  <span className="font-serif text-lg font-bold text-[#760D24]">
                    ₹{totalINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  {items.length} {items.length === 1 ? 'artwork' : 'artworks'} • Complimentary Insured Fine-Art Courier & Certificate of Authenticity Included.
                </p>
              </div>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Collector Shipping & Contact Details
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-stone-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-stone-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-stone-500 mb-1">Phone (with country code)</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-stone-500 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-500 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-500 mb-1">Postal PIN Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#760D24] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                onClick={() => setStep('payment')}
                disabled={!customerName || !customerEmail || !customerPhone}
                className="w-full py-3 bg-[#760D24] hover:bg-[#8F122D] text-white rounded font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>Continue to Razorpay Payment</span>
                <span>→</span>
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <p className="text-xs text-stone-500">Payable to Dhruva’s Gallery</p>
                  <p className="text-xl font-bold font-serif text-[#1C1917]">
                    ₹{totalINR.toLocaleString('en-IN')}
                  </p>
                </div>
                <button
                  onClick={() => setStep('details')}
                  className="text-xs text-[#760D24] hover:underline"
                >
                  Edit Details
                </button>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#3395ff] bg-blue-50/50 text-[#0c2340] font-semibold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#3395ff]" />
                  <span>UPI / QR</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#3395ff] bg-blue-50/50 text-[#0c2340] font-semibold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#3395ff]" />
                  <span>Cards</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#3395ff] bg-blue-50/50 text-[#0c2340] font-semibold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#3395ff]" />
                  <span>Netbanking</span>
                </button>
              </div>

              {/* Method Specific Form */}
              {paymentMethod === 'upi' && (
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-medium text-stone-700">
                    <span>Enter UPI ID / VPA</span>
                    <span className="text-[10px] text-stone-500">GPay, PhonePe, BHIM</span>
                  </div>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="user@upi"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded focus:outline-none focus:border-[#3395ff]"
                  />
                  <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant payment confirmation via official bank UPI gateway.</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
                  <div className="text-xs">
                    <label className="block text-stone-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-500 mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="08/29"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 mb-1">CVV</label>
                      <input
                        type="password"
                        defaultValue="•••"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-2">
                  <p className="text-xs text-stone-600 font-medium">Popular Banks</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((bank, i) => (
                      <button
                        key={bank}
                        className={`p-2 rounded border text-left ${i === 0 ? 'border-[#3395ff] bg-blue-50 font-medium' : 'border-stone-200 bg-white'}`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handlePayNow}
                className="w-full py-3.5 bg-[#3395ff] hover:bg-[#2083ee] text-white rounded font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Lock className="w-4 h-4" />
                <span>Pay ₹{totalINR.toLocaleString('en-IN')} with Razorpay</span>
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 border-4 border-[#3395ff]/20 border-t-[#3395ff] rounded-full animate-spin" />
              <div>
                <h3 className="font-semibold text-base text-[#0c2340]">Contacting Bank Gateway</h3>
                <p className="text-xs text-stone-500 mt-1">Authenticating transaction with Razorpay...</p>
              </div>
            </div>
          )}

          {step === 'success' && confirmedOrder && (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                  Acquisition Confirmed
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Payment of ₹{totalINR.toLocaleString('en-IN')} received successfully.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#FAF7F2] p-4 rounded-lg border border-[#E7E2D9] text-left text-xs space-y-2">
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Order Reference:</span>
                  <span className="font-mono font-medium">{confirmedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Razorpay Payment ID:</span>
                  <span className="font-mono text-stone-700">{confirmedOrder.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Recipient:</span>
                  <span>{confirmedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Delivery To:</span>
                  <span className="text-right truncate max-w-[200px]">{confirmedOrder.shippingAddress}, {confirmedOrder.city}</span>
                </div>
                <div className="pt-2 border-t border-stone-200">
                  <p className="font-medium text-stone-700 mb-1">Purchased Artworks:</p>
                  {confirmedOrder.items.map(it => (
                    <div key={it.artwork.id} className="flex justify-between text-stone-600 text-[11px]">
                      <span>{it.artwork.title} ({it.artwork.artistName})</span>
                      <span>₹{(it.artwork.priceINR * it.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrintReceipt}
                  className="flex-1 py-2.5 px-3 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-3 bg-[#760D24] text-white hover:bg-[#8F122D] rounded text-xs font-medium cursor-pointer"
                >
                  Return to Gallery
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

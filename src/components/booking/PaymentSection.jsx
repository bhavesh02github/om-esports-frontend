import React from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PaymentSectionProps {
  amount: number;
  onBack: () => void;
  onComplete: () => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking';

export default function PaymentSection({ amount, onBack, onComplete }: PaymentSectionProps) {
  const [selectedMethod, setSelectedMethod] = React.useState<PaymentMethod>('upi');
  const [error, setError] = React.useState<string | null>(null);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    onComplete();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <div className="text-right">
          <p className="text-sm text-gray-400">Amount to Pay</p>
          <p className="text-xl font-bold text-white">₹{amount}</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedMethod('upi')}
            className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border ${
              selectedMethod === 'upi'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <Smartphone className="h-5 w-5" />
            <span>UPI</span>
          </button>
          <button
            onClick={() => setSelectedMethod('card')}
            className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border ${
              selectedMethod === 'card'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <CreditCard className="h-5 w-5" />
            <span>Card</span>
          </button>
          <button
            onClick={() => setSelectedMethod('netbanking')}
            className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border ${
              selectedMethod === 'netbanking'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <Building2 className="h-5 w-5" />
            <span>NetBanking</span>
          </button>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handlePayment} className="space-y-4">
        {selectedMethod === 'upi' && (
          <div>
            <label htmlFor="upi" className="block text-sm font-medium text-gray-300 mb-2">
              UPI ID
            </label>
            <input
              type="text"
              id="upi"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your UPI ID"
              required
            />
          </div>
        )}

        {selectedMethod === 'card' && (
          <>
            <div>
              <label htmlFor="card" className="block text-sm font-medium text-gray-300 mb-2">
                Card Number
              </label>
              <input
                type="text"
                id="card"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-2">
                  CVV
                </label>
                <input
                  type="password"
                  id="cvv"
                  maxLength={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </>
        )}

        {selectedMethod === 'netbanking' && (
          <div>
            <label htmlFor="bank" className="block text-sm font-medium text-gray-300 mb-2">
              Select Bank
            </label>
            <select
              id="bank"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-500 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 transition-colors"
        >
          Pay ₹{amount}
        </button>
      </form>
    </div>
  );
}
import React from 'react';
import { ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import TeammateInput from './TeammateInput';
import PaymentSection from './PaymentSection';
import type { Game, TimeSlot } from '../../types';

interface BookingConfirmationProps {
  game: Game;
  slot: TimeSlot;
  onBack: () => void;
  onComplete: () => void;
}

export default function BookingConfirmation({ game, slot, onBack, onComplete }: BookingConfirmationProps) {
  const [teammates, setTeammates] = React.useState<string[]>([]);
  const [showPayment, setShowPayment] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handlePaymentComplete = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h3>
            <p className="text-gray-300 mb-6">
              Your slot has been successfully booked. Get ready for an amazing gaming session!
            </p>
            <button
              onClick={onComplete}
              className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Slot Selection
          </button>
          <h1 className="text-2xl font-bold text-white">Booking Confirmation</h1>
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Booking Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Game</span>
              <span className="text-white font-medium">{game.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time Slot</span>
              <span className="text-white font-medium">
                {slot.startTime} - {slot.endTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mode</span>
              <span className="text-white font-medium uppercase">{slot.mode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Entry Fee</span>
              <span className="text-white font-medium">₹99</span>
            </div>
          </div>
        </div>

        {/* Teammate Input Section */}
        {(slot.mode === 'duo' || slot.mode === 'squad') && !showPayment && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Team Details</h2>
            <TeammateInput
              mode={slot.mode}
              teammates={teammates}
              onTeammatesChange={setTeammates}
            />
          </div>
        )}

        {/* Payment Section */}
        {showPayment ? (
          <PaymentSection
            amount={99}
            onBack={() => setShowPayment(false)}
            onComplete={handlePaymentComplete}
          />
        ) : (
          <button
            onClick={() => setShowPayment(true)}
            disabled={
              (slot.mode !== 'solo' && teammates.length < (slot.mode === 'duo' ? 1 : 3)) ||
              isProcessing
            }
            className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </span>
            ) : (
              'Proceed to Payment'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
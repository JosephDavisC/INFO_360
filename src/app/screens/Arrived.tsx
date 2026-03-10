import React, { useState } from 'react';
import { useParams } from 'react-router';
import { X, Moon, UserCheck, UserX, Star, Send } from 'lucide-react';
import { MOCK_SPOTS } from '../types';
import { useNav } from '../context/AppContext';
import { toast } from 'sonner';

export function Arrived() {
  const { id } = useParams();
  const navigate = useNav();
  const spot = MOCK_SPOTS.find(s => s.id === id) || MOCK_SPOTS[0];

  const [noiseLevel, setNoiseLevel] = useState<string>('Very Quiet');
  const [occupied, setOccupied] = useState<'available' | 'occupied' | null>('available');
  const [rating, setRating] = useState(4);

  const handleSubmit = () => {
    toast('Review submitted!', {
      description: 'Thanks for helping others find nap spots',
      icon: <Send className="w-5 h-5 text-[#4B2E83]" />,
    });
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      <div className="h-[52px] flex items-center px-5 justify-between shrink-0 bg-white">
        <button onClick={() => navigate('/')} className="w-8 h-8 flex items-center justify-center active:scale-95 transition-transform">
          <X className="w-5 h-5 text-[#333]" />
        </button>
        <h1 className="text-[18px] font-bold text-[#1a1a1a]">Rate This Spot</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-5 pt-2 pb-3 overflow-y-auto no-scrollbar">
        {/* Arrival confirmation */}
        <div className="flex flex-col items-center mb-4 pt-1">
          <div className="w-12 h-12 rounded-full bg-[#4B2E83]/10 flex items-center justify-center mb-2">
            <Moon className="w-6 h-6 text-[#4B2E83]" />
          </div>
          <h2 className="text-[18px] font-bold text-[#1a1a1a] mb-0.5">You've Arrived!</h2>
          <p className="text-[13px] text-[#888] font-medium">{spot.name}</p>
        </div>

        {/* Noise Level */}
        <div className="bg-[#F5F3EE] rounded-[14px] p-4 mb-3">
          <h3 className="text-[14px] font-bold text-[#1a1a1a] mb-0.5">How quiet is it?</h3>
          <p className="text-[11px] text-[#888] mb-3">Help others know what to expect</p>
          <div className="grid grid-cols-2 gap-2">
            {['Very Quiet', 'Quiet', 'Moderate', 'Loud'].map((level) => (
              <button
                key={level}
                onClick={() => setNoiseLevel(level)}
                className={`py-2 rounded-[10px] text-[13px] font-semibold text-center transition-all active:scale-95 ${
                  noiseLevel === level
                    ? 'bg-[#4B2E83] text-white shadow-[0_2px_8px_rgba(75,46,131,0.3)]'
                    : 'bg-white text-[#555] border border-[#E8E3D3]'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Occupancy */}
        <div className="bg-[#F5F3EE] rounded-[14px] p-4 mb-3">
          <h3 className="text-[14px] font-bold text-[#1a1a1a] mb-0.5">Is this spot occupied?</h3>
          <p className="text-[11px] text-[#888] mb-3">Let others know if seats are available</p>
          <div className="flex gap-3">
            <button
              onClick={() => setOccupied('available')}
              className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                occupied === 'available'
                  ? 'bg-[#4CAF50] text-white shadow-[0_2px_8px_rgba(76,175,80,0.3)]'
                  : 'bg-white text-[#555] border border-[#E8E3D3]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Available
            </button>
            <button
              onClick={() => setOccupied('occupied')}
              className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                occupied === 'occupied'
                  ? 'bg-[#E53935] text-white shadow-[0_2px_8px_rgba(229,57,53,0.3)]'
                  : 'bg-white text-[#555] border border-[#E8E3D3]'
              }`}
            >
              <UserX className="w-4 h-4" />
              Occupied
            </button>
          </div>
        </div>

        {/* Overall Rating */}
        <div className="bg-[#F5F3EE] rounded-[14px] p-4">
          <h3 className="text-[14px] font-bold text-[#1a1a1a] mb-2">Overall Rating</h3>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="active:scale-110 transition-transform">
                <Star className={`w-8 h-8 ${star <= rating ? 'text-[#FFC107] fill-[#FFC107]' : 'text-[#ddd]'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit - fixed at bottom */}
      <div className="px-5 py-3 shrink-0 bg-white">
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-3.5 bg-[#4B2E83] text-white rounded-[12px] font-bold text-[15px] shadow-[0_4px_12px_rgba(75,46,131,0.3)] active:scale-[0.98] transition-transform"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

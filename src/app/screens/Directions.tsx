import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Footprints, Clock } from 'lucide-react';
import { MOCK_SPOTS } from '../types';
import { useNav } from '../context/AppContext';

export function Directions() {
  const { id } = useParams();
  const goBack = useNavigate();
  const navigate = useNav();
  const spot = MOCK_SPOTS.find(s => s.id === id) || MOCK_SPOTS[0];
  const [navigating, setNavigating] = useState(false);

  const fromX = navigating ? 160 : 195;
  const fromY = navigating ? 400 : 520;
  const toX = spot.coords.x;
  const toY = spot.coords.y;
  const midX1 = navigating ? (fromX + toX) / 2 : (fromX + toX) / 2 - 15;
  const midY1 = navigating ? (fromY + toY) / 2 : (fromY + toY) / 2 + 20;

  const handleStartWalking = () => {
    setNavigating(true);
  };

  const handleArrive = () => {
    navigate(`/arrived/${spot.id}`);
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {navigating ? (
        <div className="h-[64px] bg-[#4B2E83] flex items-center px-5 gap-4 shrink-0">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Footprints className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-[15px]">Head northwest</p>
            <p className="text-white/70 text-[12px] font-medium">toward {spot.library}</p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-[18px]">1 min</p>
            <p className="text-white/70 text-[11px] font-medium">80m left</p>
          </div>
        </div>
      ) : (
        <div className="h-[52px] flex items-center px-5 justify-between shrink-0 bg-white">
          <button onClick={() => goBack(-1)} className="w-8 h-8 flex items-center justify-center active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5 text-[#333]" />
          </button>
          <h1 className="text-[18px] font-bold text-[#1a1a1a]">Directions</h1>
          <div className="w-8" />
        </div>
      )}

      <div className="flex-1 relative overflow-hidden">
        {/* Map */}
        <div className="absolute inset-0">
          <img src="/assets/map.png" alt="UW Campus Map" className="w-full h-full object-cover" draggable={false} />
        </div>

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <filter id="routeShadowInt" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#4B2E83" floodOpacity="0.4" />
            </filter>
          </defs>
          <path
            d={`M${fromX},${fromY} Q${midX1},${midY1} ${toX},${toY}`}
            fill="none" stroke="#4B2E83" strokeWidth="5" strokeLinecap="round" filter="url(#routeShadowInt)"
          />
          <circle r="4" fill="white" stroke="#4B2E83" strokeWidth="2">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={`M${fromX},${fromY} Q${midX1},${midY1} ${toX},${toY}`} />
          </circle>
        </svg>

        {/* Destination pin */}
        <div className="absolute z-20" style={{ left: toX - 18, top: toY - 46.8 }}>
          <svg width={36} height={46.8} viewBox="0 0 24 32" fill="none">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="#4B2E83" />
            <circle cx="12" cy="12" r="6" fill="white" />
            <text x="12" y="14.5" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#4B2E83">z</text>
          </svg>
        </div>

        {/* Your location */}
        <div className="absolute z-20" style={{ left: fromX - 12, top: fromY - 12 }}>
          <div className="w-6 h-6 rounded-full bg-[#4B2E83] border-[3px] border-white shadow-[0_0_12px_rgba(75,46,131,0.5)]" />
          <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#4B2E83]/30 animate-ping" />
        </div>

        {navigating && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.12)] flex items-center gap-2 z-20">
            <Clock className="w-4 h-4 text-[#4B2E83]" />
            <span className="text-[14px] font-bold text-[#1a1a1a]">Arriving in 1 min</span>
          </div>
        )}
      </div>

      {/* Bottom section */}
      {navigating ? (
        <div className="h-[72px] bg-white border-t border-[#E8E3D3] flex items-center justify-between px-6 shrink-0">
          <button onClick={() => goBack(-1)} className="px-5 py-2.5 border-2 border-[#E8E3D3] rounded-full text-[14px] font-bold text-[#555] active:scale-95 transition-transform">
            Cancel
          </button>
          <button onClick={handleArrive} className="px-5 py-2.5 bg-[#4CAF50] text-white rounded-full text-[14px] font-bold shadow-[0_2px_8px_rgba(76,175,80,0.3)] active:scale-95 transition-transform">
            I've Arrived
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-5 pt-4 pb-6 shrink-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#4B2E83]/10 flex items-center justify-center">
              <Footprints className="w-6 h-6 text-[#4B2E83]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[17px] font-bold text-[#1a1a1a]">{spot.name}</h3>
              <p className="text-[13px] text-[#888] font-medium">{spot.walkTime} walk &bull; 150m</p>
            </div>
          </div>
          <button onClick={handleStartWalking} className="w-full px-4 py-3.5 bg-[#4B2E83] text-white rounded-[12px] font-bold text-[15px] shadow-[0_4px_12px_rgba(75,46,131,0.3)] active:scale-[0.98] transition-transform">
            Start Walking
          </button>
        </div>
      )}
    </div>
  );
}

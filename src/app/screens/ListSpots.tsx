import React from 'react';
import { Clock, MapPin, Moon } from 'lucide-react';
import { TopBar } from '../components/layout';
import { StatusBadge } from '../components/ui';
import { useApp, useNav } from '../context/AppContext';

export function ListSpots() {
  const navigate = useNav();
  const { filteredSpots } = useApp();

  return (
    <div className="flex flex-col h-full bg-white relative">
      <TopBar title="All Spots" rightIcon={<Moon className="w-5 h-5 text-[#B7A57A]" />} />

      <div className="flex-1 px-5 pt-4 pb-5 overflow-y-auto no-scrollbar space-y-3">
        {filteredSpots.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-[#F5F3EE] flex items-center justify-center">
              <MapPin className="w-8 h-8 text-[#999]" />
            </div>
            <h3 className="text-[16px] font-bold text-[#1a1a1a]">No spots found</h3>
            <p className="text-[14px] text-[#888]">Try adjusting your filters</p>
          </div>
        ) : (
          filteredSpots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => navigate(`/spot/${spot.id}`)}
              className="w-full flex items-start gap-3.5 p-3.5 bg-white border border-[#E8E3D3] rounded-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all text-left"
            >
              <div className="w-[76px] h-[76px] rounded-[10px] overflow-hidden bg-[#eee] shrink-0">
                <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[15px] font-bold text-[#1a1a1a] leading-tight">{spot.name}</h4>
                  <StatusBadge status={spot.status} size="small" />
                </div>
                <div className="flex items-center gap-1.5 text-[#888]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-medium">{spot.library}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#888]">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-medium">{spot.walkTime} walk</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

    </div>
  );
}

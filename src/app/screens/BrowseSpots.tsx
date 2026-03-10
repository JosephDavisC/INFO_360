import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, Clock, Volume2, Plus, Heart, Bookmark } from 'lucide-react';
import { StatusBadge } from '../components/ui';
import { MOCK_SPOTS } from '../types';
import { useApp, useNav } from '../context/AppContext';
import { toast } from 'sonner';

export function BrowseSpots() {
  const goBack = useNavigate();
  const navigate = useNav();
  const { savedSpots, toggleSaveSpot } = useApp();

  const unsavedSpots = MOCK_SPOTS.filter(s => !savedSpots.has(s.id));
  const savedSpotsList = MOCK_SPOTS.filter(s => savedSpots.has(s.id));

  const handleAddSpot = (spotId: string) => {
    toggleSaveSpot(spotId);
    toast('Spot saved!', {
      description: 'Added to your Saved tab',
      icon: <Bookmark className="w-5 h-5 text-[#4B2E83] fill-[#4B2E83]" />,
    });
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="h-[52px] flex items-center px-5 justify-between shrink-0 bg-white">
        <button
          onClick={() => goBack(-1)}
          className="w-8 h-8 flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[#333]" />
        </button>
        <h1 className="text-[18px] font-bold text-[#1a1a1a]">Browse Spots</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-5 pt-3 pb-5 overflow-y-auto no-scrollbar">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#F5F3EE] rounded-[12px] mb-5">
          <Search className="w-4 h-4 text-[#999]" />
          <span className="text-[14px] text-[#999] font-medium">Search for a spot...</span>
        </div>

        {/* Nearby Spots */}
        {unsavedSpots.length > 0 && (
          <>
            <h3 className="text-[12px] font-bold text-[#999] uppercase tracking-wider mb-3">Nearby Spots</h3>
            <div className="space-y-2.5">
              {unsavedSpots.map((spot) => (
                <div key={spot.id} className="flex items-center gap-3 p-3.5 bg-white border border-[#E8E3D3] rounded-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[15px] font-bold text-[#1a1a1a] truncate">{spot.name}</h4>
                      <StatusBadge status={spot.status} size="small" />
                    </div>
                    <p className="text-[12px] text-[#888] font-medium">{spot.location}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1 text-[#888]">
                        <Clock className="w-3 h-3" />
                        <span className="text-[11px] font-medium">{spot.walkTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#888]">
                        <Volume2 className="w-3 h-3" />
                        <span className="text-[11px] font-medium">{spot.noiseLevel}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddSpot(spot.id)}
                    className="w-9 h-9 rounded-full bg-[#4B2E83]/10 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                  >
                    <Plus className="w-4 h-4 text-[#4B2E83]" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Already Saved */}
        {savedSpotsList.length > 0 && (
          <>
            <h3 className="text-[12px] font-bold text-[#999] uppercase tracking-wider mt-6 mb-3">Already Saved</h3>
            <div className="space-y-2.5">
              {savedSpotsList.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => navigate(`/spot/${spot.id}`)}
                  className="flex items-center gap-3 p-3.5 bg-[#F9F9F9] border border-[#E8E3D3] rounded-[14px] opacity-60 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[15px] font-bold text-[#1a1a1a] truncate">{spot.name}</h4>
                    <p className="text-[12px] text-[#888] font-medium">{spot.location}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#4B2E83]/10 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-[#4B2E83] fill-[#4B2E83]" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
}

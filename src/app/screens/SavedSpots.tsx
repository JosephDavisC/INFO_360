import React from 'react';
import { Plus, Heart, Clock } from 'lucide-react';
import { TopBar } from '../components/layout';
import { MOCK_SPOTS } from '../types';
import { StatusBadge } from '../components/ui';
import { useApp, useNav } from '../context/AppContext';

export function SavedSpots() {
  const navigate = useNav();
  const { savedSpots } = useApp();

  const savedSpotsList = MOCK_SPOTS.filter(spot => savedSpots.has(spot.id));

  return (
    <div className="flex flex-col h-full bg-white relative">
      <TopBar title="Saved Spots" rightIcon={<Heart className="w-5 h-5 text-[#717182]" />} />

      <div className="flex-1 px-5 pt-4 overflow-y-auto no-scrollbar space-y-3">
        {savedSpotsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-[#F5F3EE] flex items-center justify-center">
              <Heart className="w-8 h-8 text-[#999]" />
            </div>
            <h3 className="text-[16px] font-bold text-[#1a1a1a]">No saved spots yet</h3>
            <p className="text-[14px] text-[#888]">Start exploring and save your favorites</p>
          </div>
        ) : (
          <>
            {savedSpotsList.map((spot) => (
              <button
                key={spot.id}
                onClick={() => navigate(`/spot/${spot.id}`)}
                className="w-full p-4 bg-white border border-[#E8E3D3] rounded-[14px] shadow-[0_1px_8px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all text-left"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-0.5">{spot.name}</h3>
                    <span className="text-[13px] text-[#888] font-medium">{spot.library}</span>
                  </div>
                  <StatusBadge status={spot.status} size="small" />
                </div>
                <div className="flex items-center gap-1.5 text-[#888]">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-medium">{spot.walkTime} walk</span>
                </div>
              </button>
            ))}

            <button
              onClick={() => navigate('/browse')}
              className="w-full h-[90px] border-2 border-dashed border-black/8 rounded-[14px] flex items-center justify-center gap-2 hover:bg-black/[0.02] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-black/[0.03] flex items-center justify-center">
                <Plus className="w-4 h-4 text-[#aaa]" />
              </div>
              <span className="text-[14px] font-semibold text-[#aaa]">Add more spots</span>
            </button>
          </>
        )}
      </div>

    </div>
  );
}

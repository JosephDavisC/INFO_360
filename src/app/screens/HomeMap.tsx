import React, { useState } from 'react';
import { Filter, Moon } from 'lucide-react';
import { TopBar } from '../components/layout';
import { MapMarker, BottomSheet, FilterModal } from '../components/map-overlays';
import { AnimatePresence } from 'motion/react';
import { useApp, useNav } from '../context/AppContext';
import { NapSpot } from '../types';

export function HomeMap() {
  const navigate = useNav();
  const { filteredSpots, applyFilters } = useApp();
  const [selectedSpot, setSelectedSpot] = useState<NapSpot | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleViewDetails = (spot: NapSpot) => {
    navigate(`/spot/${spot.id}`);
  };

  const handleApplyFilters = (filters: any) => {
    applyFilters(filters);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      <TopBar title="Nap Spot Finder" rightIcon={<Moon className="w-5 h-5 text-[#B7A57A]" />} />

      <div className="flex-1 relative overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0">
          <img
            src="/assets/map.png"
            alt="UW Campus Map"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Map Markers */}
        {filteredSpots.map((spot) => (
          <MapMarker
            key={spot.id}
            spot={spot}
            onClick={setSelectedSpot}
            selected={selectedSpot?.id === spot.id}
          />
        ))}

        {/* Floating Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="absolute bottom-6 left-6 bg-white flex items-center gap-2 px-5 py-3 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.12)] border border-[#E8E3D3] hover:scale-105 transition-transform active:scale-95 z-30"
        >
          <Filter className="w-4 h-4 text-[#4B2E83]" />
          <span className="text-[14px] font-semibold text-[#333]">Filter</span>
        </button>

        {/* Bottom Sheet Overlay */}
        <AnimatePresence>
          {selectedSpot && (
            <BottomSheet
              spot={selectedSpot}
              onClose={() => setSelectedSpot(null)}
              onViewDetails={() => handleViewDetails(selectedSpot)}
            />
          )}
        </AnimatePresence>

        {/* Filter Modal Overlay */}
        <AnimatePresence>
          {isFilterOpen && (
            <FilterModal
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onApply={handleApplyFilters}
            />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

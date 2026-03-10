import { motion } from 'motion/react';
import { X, Volume2, Sofa, Plug } from 'lucide-react';
import { NapSpot } from '../types';
import { StatusBadge, AmenityChip } from './ui';
import { useState } from 'react';

interface MapMarkerProps {
  spot: NapSpot;
  onClick: (spot: NapSpot) => void;
  selected?: boolean;
}

export function MapMarker({ spot, onClick, selected }: MapMarkerProps) {
  const colors = {
    Open: '#4CAF50',
    Busy: '#FFC107',
    Full: '#E53935',
  };
  const color = colors[spot.status];
  const s = selected ? 36 : 28;

  return (
    <button
      onClick={() => onClick(spot)}
      className="absolute transition-transform duration-200 hover:scale-110 active:scale-95 z-10"
      style={{ left: spot.coords.x - s / 2, top: spot.coords.y - s }}
    >
      <div className="absolute rounded-full opacity-20 blur-[2px]"
        style={{ width: s * 0.6, height: s * 0.25, backgroundColor: '#000', bottom: -s * 0.1, left: s * 0.2 }}
      />
      <svg width={s} height={s * 1.3} viewBox="0 0 24 32" fill="none">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill={color} />
        <circle cx="12" cy="12" r="6" fill="white" />
        <text x="12" y="14.5" textAnchor="middle" fontSize="8" fontWeight="bold" fill={color}>z</text>
      </svg>
    </button>
  );
}

interface BottomSheetProps {
  spot: NapSpot | null;
  onClose: () => void;
  onViewDetails: () => void;
}

export function BottomSheet({ spot, onClose, onViewDetails }: BottomSheetProps) {
  if (!spot) return null;

  return (
    <>
      <div
        className="absolute inset-0 bg-black/15 z-40 transition-opacity"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-50 px-5 pt-3 pb-5"
      >
        <div className="w-10 h-[4px] bg-black/10 rounded-full mx-auto mb-4" />

        <h2 className="text-[18px] font-bold text-[#1a1a1a] mb-1">{spot.name}</h2>
        <p className="text-[13px] text-[#888] font-medium mb-3">
          {spot.library} <span className="mx-1">&bull;</span> {spot.walkTime} walk
        </p>

        <div className="mb-3">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white ${
            spot.status === 'Open' ? 'bg-[#4CAF50]' : spot.status === 'Busy' ? 'bg-[#FFC107]' : 'bg-[#E53935]'
          }`}>
            {spot.status}
          </span>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          <AmenityChip label={spot.noiseLevel} icon={<Volume2 className="w-3.5 h-3.5" />} />
          <AmenityChip label={spot.seating} icon={<Sofa className="w-3.5 h-3.5" />} />
          <AmenityChip label="Outlet" icon={<Plug className="w-3.5 h-3.5" />} />
        </div>

        <button
          onClick={onViewDetails}
          className="w-full bg-[#4B2E83] text-white py-3.5 rounded-[12px] font-bold text-[15px] text-center transition-all hover:opacity-90 active:scale-[0.98] shadow-[0_4px_12px_rgba(75,46,131,0.3)]"
        >
          View Details
        </button>
      </motion.div>
    </>
  );
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [noiseLevel, setNoiseLevel] = useState<string>('Any');
  const [seatingType, setSeatingType] = useState<string>('');
  const [availability, setAvailability] = useState<string>('Show All');
  const [maxWalkTime, setMaxWalkTime] = useState<string>('');

  if (!isOpen) return null;

  const handleApply = () => {
    onApply({ noiseLevel, seatingType, availability, maxWalkTime });
  };

  const handleReset = () => {
    setNoiseLevel('Any');
    setSeatingType('');
    setAvailability('Show All');
    setMaxWalkTime('');
  };

  return (
    <>
      <div className="absolute inset-0 bg-black/40 z-[60]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] bg-white rounded-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.2)] z-[70] p-6 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="w-6" />
          <h2 className="text-[18px] font-bold text-[#1a1a1a]">Filter Spots</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 active:scale-95 transition-all">
            <X className="w-4 h-4 text-[#555]" />
          </button>
        </div>

        <div className="space-y-5">
          <FilterSection title="Noise Level">
            <ChipGroup items={['Very Quiet', 'Moderate', 'Any']} active={noiseLevel} onSelect={setNoiseLevel} />
          </FilterSection>

          <FilterSection title="Seating Type">
            <ChipGroup items={['Chair', 'Couch', 'Floor Cushion']} active={seatingType} onSelect={setSeatingType} />
          </FilterSection>

          <FilterSection title="Availability">
            <ChipGroup items={['Open Only', 'Show All']} active={availability} onSelect={setAvailability} />
          </FilterSection>

          <FilterSection title="Max Walk Time">
            <ChipGroup items={['5 min', '10 min', '15 min']} active={maxWalkTime} onSelect={setMaxWalkTime} />
          </FilterSection>

          <button
            onClick={handleApply}
            className="w-full bg-[#4B2E83] text-white py-3.5 rounded-[12px] font-bold text-[15px] transition-all active:scale-95 shadow-[0_4px_12px_rgba(75,46,131,0.3)] mt-1"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[12px] font-bold text-[#999] uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

function ChipGroup({ items, active, onSelect }: { items: string[]; active: string; onSelect: (item: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-all active:scale-95 ${
            item === active
              ? 'bg-[#4B2E83] border-[#4B2E83] text-white shadow-[0_2px_8px_rgba(75,46,131,0.3)]'
              : 'bg-white border-[#E8E3D3] text-[#555]'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

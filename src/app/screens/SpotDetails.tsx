import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Share2, MapPin, Clock, Volume2, Sofa, Plug, Bookmark, Flag, Moon } from 'lucide-react';
import { MOCK_SPOTS } from '../types';
import { useApp, useNav } from '../context/AppContext';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'motion/react';

export function SpotDetails() {
  const { id } = useParams();
  const goBack = useNavigate();
  const navigate = useNav();
  const { toggleSaveSpot, isSaved } = useApp();
  const spot = MOCK_SPOTS.find(s => s.id === id) || MOCK_SPOTS[0];
  const saved = isSaved(spot.id);

  const [showReportModal, setShowReportModal] = useState(false);

  const handleSave = () => {
    toggleSaveSpot(spot.id);
    if (!saved) {
      toast('Spot saved!', {
        description: 'You can find it in your Saved tab',
        icon: <Bookmark className="w-5 h-5 text-[#4B2E83] fill-[#4B2E83]" />,
      });
    } else {
      toast('Spot removed from saved', {
        icon: <Bookmark className="w-5 h-5 text-[#999]" />,
      });
    }
  };

  const handleGetDirections = () => {
    navigate(`/directions/${spot.id}`);
  };

  const handleReport = () => {
    setShowReportModal(false);
    toast('Thank you for reporting!', {
      description: 'This helps keep our data accurate',
      icon: <Flag className="w-5 h-5 text-[#E53935]" />,
    });
  };

  const infoRows = [
    { label: 'Walk Time', value: spot.walkTime, icon: <Clock className="w-4 h-4 text-[#888]" /> },
    { label: 'Noise Level', value: spot.noiseLevel, icon: <Volume2 className="w-4 h-4 text-[#888]" /> },
    { label: 'Seating', value: spot.seating, icon: <Sofa className="w-4 h-4 text-[#888]" /> },
    { label: 'Amenities', value: spot.amenities.join(', '), icon: <Plug className="w-4 h-4 text-[#888]" /> },
  ];

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <div className="h-[52px] flex items-center px-5 justify-between shrink-0 bg-white">
        <button onClick={() => goBack(-1)} className="w-8 h-8 flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-[#333]" />
        </button>
        <h1 className="text-[18px] font-bold text-[#1a1a1a]">Spot Details</h1>
        <button className="w-8 h-8 flex items-center justify-center active:scale-95 transition-transform">
          <Share2 className="w-5 h-5 text-[#333]" />
        </button>
      </div>

      <div className="flex-1 px-5 pt-2 pb-5 overflow-y-auto no-scrollbar">
        <div className="w-full h-[180px] bg-[#eee] rounded-[16px] overflow-hidden mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover" />
        </div>

        <div className="mb-5">
          <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-1.5">{spot.name}</h2>
          <div className="flex items-center gap-1.5 text-[#888]">
            <MapPin className="w-4 h-4" />
            <span className="text-[14px] font-medium">{spot.location}</span>
          </div>
        </div>

        <div className="mb-5">
          {infoRows.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3.5 border-b border-[#E8E3D3] last:border-b-0">
              <span className="text-[14px] text-[#888] font-medium">{item.label}</span>
              <div className="flex items-center gap-1.5">
                {item.icon}
                <span className="text-[14px] text-[#1a1a1a] font-bold">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-4 bg-[#F5F3EE] rounded-[14px] mb-6">
          <div className={`w-3 h-3 rounded-full shadow-[0_0_6px_rgba(76,175,80,0.5)] ${
            spot.status === 'Open' ? 'bg-[#4CAF50]' : spot.status === 'Busy' ? 'bg-[#FFC107]' : 'bg-[#E53935]'
          }`} />
          <span className="text-[15px] font-bold text-[#1a1a1a]">Currently: {spot.status}</span>
          <span className={`ml-auto px-3 py-1 rounded-full text-[12px] font-bold text-white ${
            spot.status === 'Open' ? 'bg-[#4CAF50]' : spot.status === 'Busy' ? 'bg-[#FFC107]' : 'bg-[#E53935]'
          }`}>{spot.status}</span>
        </div>

        <div className="flex gap-3 mb-5">
          <button onClick={handleGetDirections}
            className="flex-1 px-4 py-3.5 border-2 border-[#4B2E83] text-[#4B2E83] rounded-[12px] font-bold text-[15px] active:scale-95 transition-transform">
            Get Directions
          </button>
          <button onClick={handleSave}
            className={`flex-1 px-4 py-3.5 rounded-[12px] font-bold text-[15px] active:scale-95 transition-transform ${
              saved ? 'bg-[#F5F3EE] text-[#333] border-2 border-[#E8E3D3]' : 'bg-[#4B2E83] text-white shadow-[0_4px_12px_rgba(75,46,131,0.3)]'
            }`}>
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>

        <div className="flex justify-center">
          <button onClick={() => setShowReportModal(true)} className="text-[14px] text-[#888] font-medium underline underline-offset-2">
            Report as Occupied
          </button>
        </div>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <>
            <div className="absolute inset-0 bg-black/30 z-50" onClick={() => setShowReportModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] bg-white rounded-[20px] shadow-xl z-[60] p-6"
            >
              <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-2">Report this spot?</h3>
              <p className="text-[14px] text-[#888] mb-6">This will mark "{spot.name}" as occupied and notify other users.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-[#E8E3D3] text-[#333] rounded-[12px] font-bold text-[15px] active:scale-95 transition-all">
                  Cancel
                </button>
                <button onClick={handleReport}
                  className="flex-1 px-4 py-3 bg-[#E53935] text-white rounded-[12px] font-bold text-[15px] active:scale-95 transition-all">
                  Report
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

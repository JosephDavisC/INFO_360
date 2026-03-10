import React from 'react';
import { useNavigate } from 'react-router';
import { Filter, Moon, ArrowLeft, Share2, MapPin, Clock, Volume2, Sofa, Plug, Bookmark, Map, LayoutList, Heart, X, Footprints, Star, UserCheck, UserX, Plus, Flag } from 'lucide-react';

// UW Colors
const UW_PURPLE = '#4B2E83';
const UW_GOLD = '#B7A57A';

// ─── Shared ──────────────────────────────────────────────────────────────────

const FRAME_SCALE = 0.42;
const FRAME_W = Math.round(390 * FRAME_SCALE);
const FRAME_H = Math.round(844 * FRAME_SCALE);

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2" style={{ width: FRAME_W }}>
      <div style={{ width: FRAME_W, height: FRAME_H }}>
        <div className="w-[390px] h-[844px] bg-white rounded-[44px] shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-[8px] border-[#1a1a1a] overflow-hidden relative flex flex-col font-sans origin-top-left" style={{ transform: `scale(${FRAME_SCALE})` }}>
          {children}
        </div>
      </div>
      <p className="text-[12px] font-semibold text-[#555]">{label}</p>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-[54px] bg-white flex items-center justify-between px-6 shrink-0 relative">
      <span className="text-[15px] font-semibold">9:41</span>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full" />
      <div className="flex items-center gap-1">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="8" width="3" height="4" rx="0.5" fill="#333"/><rect x="4" y="5" width="3" height="7" rx="0.5" fill="#333"/><rect x="8" y="2" width="3" height="10" rx="0.5" fill="#333"/><rect x="12" y="0" width="3" height="12" rx="0.5" fill="#333"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2C5.5 2 3.3 3.1 2 5L3.2 6.2C4.2 4.8 5.9 3.8 8 3.8C10.1 3.8 11.8 4.8 12.8 6.2L14 5C12.7 3.1 10.5 2 8 2Z" fill="#333"/><path d="M8 5.5C6.5 5.5 5.2 6.2 4.3 7.3L5.5 8.5C6.1 7.7 7 7.2 8 7.2C9 7.2 9.9 7.7 10.5 8.5L11.7 7.3C10.8 6.2 9.5 5.5 8 5.5Z" fill="#333"/><circle cx="8" cy="10" r="1.5" fill="#333"/></svg>
        <div className="flex items-center"><div className="w-[22px] h-[11px] border-[1.5px] border-black/40 rounded-[3px] relative"><div className="absolute inset-[1.5px] bg-[#333] rounded-[1px]" /></div><div className="w-[1.5px] h-[5px] bg-black/40 rounded-r-full ml-[0.5px]" /></div>
      </div>
    </div>
  );
}

function TopBar({ title, leftIcon, rightIcon }: { title: string; leftIcon?: React.ReactNode; rightIcon?: React.ReactNode }) {
  return (
    <div className="h-[52px] flex items-center px-5 justify-between shrink-0 bg-white border-b border-[#E8E3D3]/60">
      <div className="w-8 h-8 flex items-center justify-center">{leftIcon}</div>
      <h1 className="text-[17px] font-bold text-[#2D2D2D]">{title}</h1>
      <div className="w-8 h-8 flex items-center justify-center">{rightIcon}</div>
    </div>
  );
}

function BottomNav({ activeTab }: { activeTab: 'map' | 'list' | 'saved' }) {
  const tabs = [
    { id: 'map', label: 'Map', icon: Map },
    { id: 'list', label: 'List', icon: LayoutList },
    { id: 'saved', label: 'Saved', icon: Heart },
  ];
  return (
    <div className="h-[84px] bg-white border-t border-[#E8E3D3] flex items-start justify-around px-8 pt-2 shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === activeTab;
        return (
          <div key={tab.id} className="flex flex-col items-center gap-1 pt-1">
            <Icon className="w-[22px] h-[22px]" strokeWidth={isActive ? 2.5 : 1.8} style={{ color: isActive ? UW_PURPLE : '#aaa' }} />
            <span className="text-[10px]" style={{ color: isActive ? UW_PURPLE : '#aaa', fontWeight: isActive ? 700 : 500 }}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function StatusBadge({ status, size = 'default' }: { status: 'Open' | 'Busy' | 'Full'; size?: 'default' | 'small' }) {
  const colors = { Open: 'bg-[#4CAF50] text-white', Busy: 'bg-[#E8943A] text-white', Full: 'bg-[#D32F2F] text-white' };
  return <span className={`${colors[status]} ${size === 'small' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-[12px]'} rounded-full font-bold inline-block`}>{status}</span>;
}

function MapPin2({ color, x, y, size = 'default' }: { color: string; x: number; y: number; size?: 'default' | 'large' }) {
  const s = size === 'large' ? 36 : 28;
  return (
    <div className="absolute" style={{ left: x - s / 2, top: y - s }}>
      <div className="absolute rounded-full opacity-20 blur-[2px]" style={{ width: s * 0.6, height: s * 0.25, backgroundColor: '#000', bottom: -s * 0.1, left: s * 0.2 }} />
      <svg width={s} height={s * 1.3} viewBox="0 0 24 32" fill="none">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill={color} />
        <circle cx="12" cy="12" r="6" fill="white" />
        <text x="12" y="14.5" textAnchor="middle" fontSize="8" fontWeight="bold" fill={color}>z</text>
      </svg>
    </div>
  );
}

function SatelliteMap({ opacity = 1 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
      <img src="/assets/map.png" alt="UW Campus Map" className="w-full h-full object-cover" draggable={false} />
    </div>
  );
}

function ChipTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F3EE] rounded-full border border-[#E8E3D3]">
      {icon}<span className="text-[12px] font-medium text-[#555]">{label}</span>
    </div>
  );
}

function FilterChip({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <button className={`px-4 py-2 rounded-full text-[13px] font-semibold ${selected ? 'text-white shadow-sm' : 'bg-white text-[#555] border border-[#E8E3D3]'}`}
      style={selected ? { backgroundColor: UW_PURPLE } : undefined}>
      {label}
    </button>
  );
}

function InFrameToast({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="absolute top-[58px] left-4 right-4 z-[100] bg-white rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-[#E8E3D3] px-4 py-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[#4B2E83]/10 flex items-center justify-center shrink-0">{icon}</div>
      <div><p className="text-[14px] font-bold text-[#2D2D2D]">{title}</p>{subtitle && <p className="text-[12px] text-[#888]">{subtitle}</p>}</div>
    </div>
  );
}

// ─── Frame 1: Map View ───────────────────────────────────────────────────────

function Frame1_MapView() {
  return (
    <Frame label="1. Map View">
      <StatusBar />
      <TopBar title="Nap Spot Finder" rightIcon={<Moon className="w-5 h-5 text-[#B7A57A]" />} />
      <div className="flex-1 relative overflow-hidden">
        <SatelliteMap />
        <MapPin2 color="#4CAF50" x={115} y={250} />
        <MapPin2 color="#E8943A" x={280} y={365} />
        <MapPin2 color="#4CAF50" x={200} y={445} />
        <button className="absolute bottom-6 left-6 bg-white flex items-center gap-2 px-5 py-3 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.1)] border border-[#E8E3D3]">
          <Filter className="w-4 h-4" style={{ color: UW_PURPLE }} />
          <span className="text-[14px] font-semibold text-[#333]">Filter</span>
        </button>
      </div>
      <BottomNav activeTab="map" />
    </Frame>
  );
}

// ─── Frame 2: Filter ─────────────────────────────────────────────────────────

function Frame2_Filter() {
  return (
    <Frame label="2. Filter Spots">
      <StatusBar />
      <TopBar title="Nap Spot Finder" rightIcon={<Moon className="w-5 h-5 text-[#B7A57A]" />} />
      <div className="flex-1 relative overflow-hidden">
        <SatelliteMap opacity={0.25} />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 bg-white rounded-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.2)] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="w-6" />
            <h2 className="text-[17px] font-bold text-[#2D2D2D]">Filter Spots</h2>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5"><X className="w-4 h-4 text-[#555]" /></button>
          </div>
          <div className="mb-4"><h3 className="text-[11px] font-bold text-[#999] uppercase tracking-wider mb-2.5">Noise Level</h3><div className="flex gap-2"><FilterChip label="Very Quiet" selected /><FilterChip label="Moderate" /><FilterChip label="Any" /></div></div>
          <div className="mb-4"><h3 className="text-[11px] font-bold text-[#999] uppercase tracking-wider mb-2.5">Seating Type</h3><div className="flex flex-wrap gap-2"><FilterChip label="Chair" /><FilterChip label="Couch" selected /><FilterChip label="Floor Cushion" /></div></div>
          <div className="mb-4"><h3 className="text-[11px] font-bold text-[#999] uppercase tracking-wider mb-2.5">Availability</h3><div className="flex gap-2"><FilterChip label="Open Only" /><FilterChip label="Show All" selected /></div></div>
          <div className="mb-5"><h3 className="text-[11px] font-bold text-[#999] uppercase tracking-wider mb-2.5">Max Walk Time</h3><div className="flex gap-2"><FilterChip label="5 min" /><FilterChip label="10 min" selected /><FilterChip label="15 min" /></div></div>
          <button className="w-full py-3.5 rounded-[12px] font-bold text-[15px] text-white" style={{ backgroundColor: UW_PURPLE }}>Apply Filters</button>
        </div>
      </div>
      <BottomNav activeTab="map" />
    </Frame>
  );
}

// ─── Frame 3: Spot Preview ───────────────────────────────────────────────────

function Frame3_SpotPreview() {
  return (
    <Frame label="3. Spot Preview">
      <StatusBar />
      <TopBar title="Nap Spot Finder" rightIcon={<Moon className="w-5 h-5 text-[#B7A57A]" />} />
      <div className="flex-1 relative overflow-hidden">
        <SatelliteMap />
        <MapPin2 color="#E8943A" x={280} y={365} />
        <MapPin2 color="#4CAF50" x={115} y={250} size="large" />
        <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[24px] shadow-[0_-6px_24px_rgba(0,0,0,0.1)] px-5 pt-3 pb-5">
          <div className="w-10 h-[4px] bg-black/8 rounded-full mx-auto mb-4" />
          <h3 className="text-[17px] font-bold text-[#2D2D2D] mb-1">Odegaard 3rd Floor Lounge</h3>
          <p className="text-[13px] text-[#888] mb-3">Odegaard Library <span className="mx-1">&bull;</span> 2 min walk</p>
          <div className="mb-3"><span className="inline-block bg-[#4CAF50] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">Open</span></div>
          <div className="flex gap-2 mb-4">
            <ChipTag icon={<Volume2 className="w-3.5 h-3.5 text-[#888]" />} label="Very Quiet" />
            <ChipTag icon={<Sofa className="w-3.5 h-3.5 text-[#888]" />} label="Couch" />
            <ChipTag icon={<Plug className="w-3.5 h-3.5 text-[#888]" />} label="Outlet" />
          </div>
          <button className="w-full py-3.5 rounded-[12px] font-bold text-[15px] text-white" style={{ backgroundColor: UW_PURPLE }}>View Details</button>
        </div>
      </div>
      <BottomNav activeTab="map" />
    </Frame>
  );
}

// ─── Frame 4: Spot Details ───────────────────────────────────────────────────

function Frame4_SpotDetails() {
  return (
    <Frame label="4. Spot Details">
      <StatusBar />
      <InFrameToast icon={<Bookmark className="w-4 h-4 text-[#4B2E83] fill-[#4B2E83]" />} title="Spot saved!" subtitle="You can find it in your Saved tab" />
      <div className="h-[52px] flex items-center px-5 justify-between shrink-0 bg-white border-b border-[#E8E3D3]/60">
        <button className="w-8 h-8 flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-[#333]" /></button>
        <h1 className="text-[17px] font-bold text-[#2D2D2D]">Spot Details</h1>
        <button className="w-8 h-8 flex items-center justify-center"><Share2 className="w-5 h-5 text-[#333]" /></button>
      </div>
      <div className="flex-1 px-5 pt-2 pb-5 overflow-y-auto no-scrollbar">
        <div className="w-full h-[175px] bg-[#eee] rounded-[14px] overflow-hidden mb-5"><img src="https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover" /></div>
        <div className="mb-4">
          <h2 className="text-[19px] font-bold text-[#2D2D2D] mb-1">Odegaard 3rd Floor Lounge</h2>
          <div className="flex items-center gap-1.5 text-[#888]"><MapPin className="w-4 h-4" /><span className="text-[13px]">Odegaard Library, Floor 3</span></div>
        </div>
        <div className="mb-4">
          {[
            { label: 'Walk Time', value: '2 min', icon: <Clock className="w-4 h-4 text-[#999]" /> },
            { label: 'Noise Level', value: 'Very Quiet', icon: <Volume2 className="w-4 h-4 text-[#999]" /> },
            { label: 'Seating', value: 'Couch', icon: <Sofa className="w-4 h-4 text-[#999]" /> },
            { label: 'Amenities', value: 'Outlet, Dim Lighting', icon: <Plug className="w-4 h-4 text-[#999]" /> },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#E8E3D3]/50 last:border-b-0">
              <span className="text-[13px] text-[#888]">{item.label}</span>
              <div className="flex items-center gap-1.5">{item.icon}<span className="text-[13px] text-[#2D2D2D] font-bold">{item.value}</span></div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 p-3.5 bg-[#F5F3EE] rounded-[12px] mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
          <span className="text-[14px] font-bold text-[#2D2D2D]">Currently: Open</span>
          <span className="ml-auto bg-[#4CAF50] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">Open</span>
        </div>
        <div className="flex gap-3 mb-4">
          <button className="flex-1 py-3 rounded-[10px] font-bold text-[14px] border-2" style={{ borderColor: UW_PURPLE, color: UW_PURPLE }}>Get Directions</button>
          <button className="flex-1 py-3 rounded-[10px] font-bold text-[14px] bg-[#F0EDE6] text-[#555] border border-[#E8E3D3]">Saved</button>
        </div>
        <div className="flex justify-center"><button className="text-[13px] text-[#999] underline underline-offset-2">Report as Occupied</button></div>
      </div>
    </Frame>
  );
}

// ─── Frame 5: List View ──────────────────────────────────────────────────────

function Frame5_ListView() {
  const spots = [
    { name: 'Odegaard 3rd Floor Lounge', loc: 'Odegaard Library', walk: '2 min', status: 'Open' as const, img: 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=400' },
    { name: 'Suzzallo Reading Room', loc: 'Suzzallo Library', walk: '3 min', status: 'Busy' as const, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400' },
    { name: 'Gerberding Hall Lounge', loc: 'Gerberding Hall', walk: '3 min', status: 'Open' as const, img: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=400' },
    { name: 'Engineering Library Pods', loc: 'Engineering Library', walk: '8 min', status: 'Busy' as const, img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=400' },
  ];
  return (
    <Frame label="5. List View">
      <StatusBar />
      <TopBar title="All Spots" rightIcon={<Moon className="w-5 h-5 text-[#B7A57A]" />} />
      <div className="flex-1 px-5 pt-4 pb-5 overflow-y-auto no-scrollbar space-y-2.5">
        {spots.map((s, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-white border border-[#E8E3D3]/60 rounded-[12px]">
            <div className="w-[70px] h-[70px] rounded-[10px] overflow-hidden bg-[#eee] shrink-0"><img src={s.img} alt="" className="w-full h-full object-cover" /></div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-start justify-between gap-2"><h4 className="text-[14px] font-bold text-[#2D2D2D] leading-tight">{s.name}</h4><StatusBadge status={s.status} size="small" /></div>
              <div className="flex items-center gap-1 text-[#999]"><MapPin className="w-3 h-3" /><span className="text-[11px]">{s.loc}</span></div>
              <div className="flex items-center gap-1 text-[#999]"><Clock className="w-3 h-3" /><span className="text-[11px]">{s.walk} walk</span></div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav activeTab="list" />
    </Frame>
  );
}

// ─── Frame 6: Saved Spots ────────────────────────────────────────────────────

function Frame6_SavedSpots() {
  return (
    <Frame label="6. Saved Spots">
      <StatusBar />
      <TopBar title="Saved Spots" rightIcon={<Heart className="w-5 h-5 text-[#717182]" />} />
      <div className="flex-1 px-5 pt-4 overflow-y-auto no-scrollbar space-y-2.5">
        {[
          { name: 'Suzzallo Reading Room', loc: 'Suzzallo Library', walk: '3 min', status: 'Busy' as const },
          { name: 'Odegaard 3rd Floor Lounge', loc: 'Odegaard Library, Floor 3', walk: '2 min', status: 'Open' as const },
        ].map((s, i) => (
          <div key={i} className="p-4 bg-white border border-[#E8E3D3]/60 rounded-[12px]">
            <div className="flex justify-between items-start mb-1.5">
              <div><h3 className="text-[15px] font-bold text-[#2D2D2D] mb-0.5">{s.name}</h3><span className="text-[12px] text-[#999]">{s.loc}</span></div>
              <StatusBadge status={s.status} size="small" />
            </div>
            <div className="flex items-center gap-1 text-[#999]"><Clock className="w-3 h-3" /><span className="text-[11px]">{s.walk} walk</span></div>
          </div>
        ))}
        <div className="h-[80px] border-2 border-dashed border-[#E8E3D3] rounded-[12px] flex items-center justify-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#F5F3EE] flex items-center justify-center"><Plus className="w-3.5 h-3.5 text-[#bbb]" /></div>
          <span className="text-[13px] font-medium text-[#bbb]">Add more spots</span>
        </div>
      </div>
      <BottomNav activeTab="saved" />
    </Frame>
  );
}

// ─── Frame 7: Get Directions ─────────────────────────────────────────────────

function Frame7_Directions() {
  const fromX = 195; const fromY = 520; const toX = 115; const toY = 250;
  const midX1 = 180; const midY1 = 440; const midX2 = 140; const midY2 = 350;
  return (
    <Frame label="7. Get Directions">
      <StatusBar />
      <div className="h-[52px] flex items-center px-5 justify-between shrink-0 bg-white border-b border-[#E8E3D3]/60">
        <button className="w-8 h-8 flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-[#333]" /></button>
        <h1 className="text-[17px] font-bold text-[#2D2D2D]">Directions</h1>
        <div className="w-8" />
      </div>
      <div className="flex-1 relative overflow-hidden">
        <SatelliteMap />
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs><filter id="rs1" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1" stdDeviation="2" floodColor={UW_PURPLE} floodOpacity="0.35" /></filter></defs>
          <path d={`M${fromX},${fromY} C${midX1},${midY1} ${midX2},${midY2} ${toX},${toY}`} fill="none" stroke={UW_PURPLE} strokeWidth="5" strokeLinecap="round" filter="url(#rs1)" />
          <circle r="4" fill="white" stroke={UW_PURPLE} strokeWidth="2"><animateMotion dur="3s" repeatCount="indefinite" path={`M${fromX},${fromY} C${midX1},${midY1} ${midX2},${midY2} ${toX},${toY}`} /></circle>
        </svg>
        <MapPin2 color={UW_PURPLE} x={toX} y={toY} size="large" />
        <div className="absolute z-20" style={{ left: fromX - 12, top: fromY - 12 }}>
          <div className="w-6 h-6 rounded-full border-[3px] border-white shadow-lg" style={{ backgroundColor: UW_PURPLE }} />
          <div className="absolute inset-0 w-6 h-6 rounded-full animate-ping opacity-30" style={{ backgroundColor: UW_PURPLE }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[24px] shadow-[0_-6px_24px_rgba(0,0,0,0.1)] px-5 pt-4 pb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: UW_PURPLE + '15' }}><Footprints className="w-5 h-5" style={{ color: UW_PURPLE }} /></div>
            <div><h3 className="text-[16px] font-bold text-[#2D2D2D]">Odegaard 3rd Floor Lounge</h3><p className="text-[12px] text-[#999]">2 min walk &bull; 150m</p></div>
          </div>
          <button className="w-full py-3.5 rounded-[12px] font-bold text-[15px] text-white" style={{ backgroundColor: UW_PURPLE }}>Start Walking</button>
        </div>
      </div>
    </Frame>
  );
}

// ─── Frame 8: Navigating ─────────────────────────────────────────────────────

function Frame8_Navigating() {
  const fromX = 160; const fromY = 400; const toX = 115; const toY = 250; const midX = 135; const midY = 320;
  return (
    <Frame label="8. Navigating">
      <StatusBar />
      <div className="h-[60px] flex items-center px-5 gap-4 shrink-0" style={{ backgroundColor: UW_PURPLE }}>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><Footprints className="w-4 h-4 text-white" /></div>
        <div className="flex-1"><p className="text-white font-bold text-[14px]">Head northwest</p><p className="text-white/60 text-[11px]">toward Odegaard Library</p></div>
        <div className="text-right"><p className="text-white font-bold text-[17px]">1 min</p><p className="text-white/60 text-[10px]">80m left</p></div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <SatelliteMap />
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs><filter id="rs2" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1" stdDeviation="2" floodColor={UW_PURPLE} floodOpacity="0.35" /></filter></defs>
          <path d={`M${fromX},${fromY} Q${midX},${midY} ${toX},${toY}`} fill="none" stroke={UW_PURPLE} strokeWidth="5" strokeLinecap="round" filter="url(#rs2)" />
          <circle r="4" fill="white" stroke={UW_PURPLE} strokeWidth="2"><animateMotion dur="2s" repeatCount="indefinite" path={`M${fromX},${fromY} Q${midX},${midY} ${toX},${toY}`} /></circle>
        </svg>
        <MapPin2 color={UW_PURPLE} x={toX} y={toY} size="large" />
        <div className="absolute z-20" style={{ left: fromX - 12, top: fromY - 12 }}>
          <div className="w-6 h-6 rounded-full border-[3px] border-white shadow-lg" style={{ backgroundColor: UW_PURPLE }} />
          <div className="absolute inset-0 w-6 h-6 rounded-full animate-ping opacity-30" style={{ backgroundColor: UW_PURPLE }} />
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2 z-20">
          <Clock className="w-3.5 h-3.5" style={{ color: UW_PURPLE }} /><span className="text-[13px] font-bold text-[#2D2D2D]">Arriving in 1 min</span>
        </div>
      </div>
      <div className="h-[68px] bg-white border-t border-[#E8E3D3] flex items-center justify-between px-6 shrink-0">
        <button className="px-5 py-2.5 border-2 border-[#E8E3D3] rounded-full text-[13px] font-bold text-[#555]">Cancel</button>
        <button className="px-5 py-2.5 bg-[#4CAF50] text-white rounded-full text-[13px] font-bold shadow-[0_2px_8px_rgba(76,175,80,0.3)]">I've Arrived</button>
      </div>
    </Frame>
  );
}

// ─── Frame 9: Rate This Spot ─────────────────────────────────────────────────

function Frame9_Rate() {
  return (
    <Frame label="9. Rate This Spot">
      <StatusBar />
      <div className="h-[52px] flex items-center px-5 justify-between shrink-0 bg-white border-b border-[#E8E3D3]/60">
        <button className="w-8 h-8 flex items-center justify-center"><X className="w-5 h-5 text-[#333]" /></button>
        <h1 className="text-[17px] font-bold text-[#2D2D2D]">Rate This Spot</h1>
        <div className="w-8" />
      </div>
      <div className="flex-1 px-5 pt-4 pb-5 overflow-y-auto no-scrollbar">
        <div className="flex flex-col items-center mb-5 pt-1">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2.5" style={{ backgroundColor: UW_PURPLE + '15' }}><Moon className="w-7 h-7" style={{ color: UW_PURPLE }} /></div>
          <h2 className="text-[19px] font-bold text-[#2D2D2D] mb-0.5">You've Arrived!</h2>
          <p className="text-[13px] text-[#999]">Odegaard 3rd Floor Lounge</p>
        </div>
        <div className="bg-[#F5F3EE] rounded-[14px] p-4 mb-3.5">
          <h3 className="text-[14px] font-bold text-[#2D2D2D] mb-0.5">How quiet is it?</h3>
          <p className="text-[11px] text-[#999] mb-3">Help others know what to expect</p>
          <div className="grid grid-cols-2 gap-2">
            {['Very Quiet', 'Quiet', 'Moderate', 'Loud'].map((l, i) => (
              <button key={l} className={`py-2.5 rounded-[8px] text-[12px] font-semibold text-center ${i === 0 ? 'text-white' : 'bg-white text-[#666] border border-[#E8E3D3]'}`}
                style={i === 0 ? { backgroundColor: UW_PURPLE } : undefined}>{l}</button>
            ))}
          </div>
        </div>
        <div className="bg-[#F5F3EE] rounded-[14px] p-4 mb-3.5">
          <h3 className="text-[14px] font-bold text-[#2D2D2D] mb-0.5">Is this spot occupied?</h3>
          <p className="text-[11px] text-[#999] mb-3">Let others know if seats are available</p>
          <div className="flex gap-2.5">
            <button className="flex-1 py-2.5 rounded-[8px] text-[13px] font-bold bg-[#4CAF50] text-white flex items-center justify-center gap-1.5"><UserCheck className="w-3.5 h-3.5" />Available</button>
            <button className="flex-1 py-2.5 rounded-[8px] text-[13px] font-bold bg-white text-[#666] border border-[#E8E3D3] flex items-center justify-center gap-1.5"><UserX className="w-3.5 h-3.5" />Occupied</button>
          </div>
        </div>
        <div className="bg-[#F5F3EE] rounded-[14px] p-4 mb-5">
          <h3 className="text-[14px] font-bold text-[#2D2D2D] mb-3">Overall Rating</h3>
          <div className="flex gap-1.5 justify-center">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`w-8 h-8 ${s <= 4 ? 'fill-[#B7A57A]' : 'text-[#ddd]'}`} style={s <= 4 ? { color: UW_GOLD } : undefined} />)}
          </div>
        </div>
        <button className="w-full py-3.5 rounded-[12px] font-bold text-[15px] text-white" style={{ backgroundColor: UW_PURPLE }}>Submit Review</button>
      </div>
    </Frame>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

function FrameViewSwitcher() {
  const nav = useNavigate();
  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm border border-[#E8E3D3]">
      <button
        onClick={() => nav('/')}
        className="px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#888] hover:text-[#555] transition-all"
      >
        Prototype
      </button>
      <button
        className="px-4 py-1.5 rounded-full text-[12px] font-semibold bg-[#4B2E83] text-white shadow-sm transition-all"
      >
        All Frames
      </button>
    </div>
  );
}

export default function StaticFrames() {
  return (
    <div className="min-h-screen bg-[#EDEBE6] p-10">
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="text-[26px] font-bold text-[#2D2D2D] mb-1">Nap Spot Finder</h1>
          <p className="text-[14px] text-[#999]">Complete user flow &mdash; 9 screens</p>
        </div>
        <FrameViewSwitcher />
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <Frame1_MapView />
        <Frame2_Filter />
        <Frame3_SpotPreview />
        <Frame4_SpotDetails />
        <Frame5_ListView />
        <Frame6_SavedSpots />
        <Frame7_Directions />
        <Frame8_Navigating />
        <Frame9_Rate />
      </div>
    </div>
  );
}

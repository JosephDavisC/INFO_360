import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Outlet } from 'react-router';
import { AppProvider } from './context/AppContext';
import { HomeMap } from './screens/HomeMap';
import { ListSpots } from './screens/ListSpots';
import { SpotDetails } from './screens/SpotDetails';
import { SavedSpots } from './screens/SavedSpots';
import { BrowseSpots } from './screens/BrowseSpots';
import { Directions } from './screens/Directions';
import { Arrived } from './screens/Arrived';
import StaticFrames from './StaticFrames';
import { StatusBar, BottomNav } from './components/layout';
import { Toaster } from './components/ui/sonner';
import { PageTransition } from './components/PageTransition';
import { AnimatePresence } from 'motion/react';

function getActiveTab(pathname: string): 'map' | 'list' | 'saved' | undefined {
  const map: Record<string, 'map' | 'list' | 'saved'> = {
    '/': 'map',
    '/list': 'list',
    '/saved': 'saved',
    '/browse': 'saved',
  };
  return map[pathname];
}

function useFrameScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const sw = (window.innerWidth - 32) / 406;
      const sh = (window.innerHeight - 32) / 860;
      setScale(Math.min(1, sw, sh));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return scale;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 900);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return isDesktop;
}

const TEAM = [
  { name: 'Joseph', full: 'Joseph Davis Chamdani', img: '/team/joseph.jpeg' },
  { name: 'Kenneth W.', full: 'Kenneth Wu', img: '/team/kenneth.jpeg' },
  { name: 'Kenneth P.', full: 'Kenneth Pangestu', img: '/team/kenneth_p.png' },
  { name: 'Winson', full: 'Winson Teh', img: '/team/winson.jpeg' },
];

function ProjectInfo() {
  return (
    <div className="flex-1 flex flex-col justify-center max-w-[480px]">
      <p className="text-[14px] font-mono text-[#4B2E83] mb-4">INFO 360 · Team B-Penabur</p>

      <h1 className="text-[40px] font-bold text-[#1a1a1a] leading-[1.1] mb-2">
        UW Nap Spot Finder
      </h1>
      <div className="w-12 h-[3px] bg-[#B7A57A] rounded-full mb-5" />

      <p className="text-[16px] text-[#555] leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
        A high-fidelity prototype for finding quiet nap spots across the University of Washington campus. Browse locations, check real-time availability, and get walking directions.
      </p>

      <div className="flex items-center gap-4 mb-6">
        {TEAM.map((m) => (
          <div key={m.name} className="group relative">
            {m.img ? (
              <img src={m.img} alt={m.full} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#4B2E83] border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-[16px] font-bold text-white">{m.full.charAt(0)}</span>
              </div>
            )}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <span className="text-[11px] font-medium text-[#888]">{m.name}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[12px] text-[#aaa] font-mono mb-3">Winter 2026 · High-Fidelity Prototype</p>

      <a href="https://github.com/JosephDavisC/INFO_360" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[12px] text-[#888] hover:text-[#4B2E83] transition-colors w-fit">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        View source on GitHub
      </a>
    </div>
  );
}

function ViewSwitcher({ active }: { active: 'prototype' | 'frames' }) {
  const nav = useNavigate();
  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm border border-[#E8E3D3]">
      <button
        onClick={() => nav('/')}
        className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
          active === 'prototype' ? 'bg-[#4B2E83] text-white shadow-sm' : 'text-[#888] hover:text-[#555]'
        }`}
      >
        Prototype
      </button>
      <button
        onClick={() => nav('/frames')}
        className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
          active === 'frames' ? 'bg-[#4B2E83] text-white shadow-sm' : 'text-[#888] hover:text-[#555]'
        }`}
      >
        All Frames
      </button>
    </div>
  );
}

function PhoneFrame() {
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);
  const scale = useFrameScale();
  const isDesktop = useIsDesktop();
  const [showHotspots, setShowHotspots] = useState(false);

  return (
    <div className={`h-[100dvh] bg-[#F5F3EE] flex overflow-hidden ${isDesktop ? 'items-center justify-center gap-12 px-12' : 'flex-col items-center justify-center'}`}>
      {isDesktop && <ProjectInfo />}
      <div className="flex flex-col items-center justify-center shrink-0 gap-4">
        <div className="flex items-center gap-3" style={{ transform: `scale(${scale})` }}>
          <ViewSwitcher active="prototype" />
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all active:scale-95 ${
              showHotspots
                ? 'bg-[#4B2E83] text-white shadow-[0_2px_8px_rgba(75,46,131,0.3)]'
                : 'bg-white text-[#888] border border-[#E8E3D3] shadow-sm hover:text-[#555]'
            }`}
          >
            {showHotspots ? '✦ Hotspots ON' : '✦ Hotspots'}
          </button>
        </div>
        <div
          className={`w-[390px] h-[844px] bg-white rounded-[44px] shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-[8px] border-[#1a1a1a] overflow-hidden relative flex flex-col font-sans shrink-0 ${showHotspots ? 'hotspots-on' : ''}`}
          style={{ transform: `scale(${scale})` }}
        >
          <StatusBar />
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </div>
          {activeTab && <BottomNav activeTab={activeTab} />}
          <Toaster
            position="top-center"
            offset={60}
            toastOptions={{
              style: {
                maxWidth: '340px',
                fontSize: '14px',
              },
            }}
          />
        </div>
        {showHotspots && (
          <p className="text-[11px] text-[#888] text-center" style={{ transform: `scale(${scale})` }}>
            Purple outlines = <strong className="text-[#4B2E83]">clickable areas</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/frames" element={<StaticFrames />} />
          <Route path="/frame" element={<StaticFrames />} />

          <Route path="/" element={<PhoneFrame />}>
            <Route index element={<HomeMap />} />
            <Route path="list" element={<ListSpots />} />
            <Route path="saved" element={<SavedSpots />} />
            <Route path="spot/:id" element={<SpotDetails />} />
            <Route path="browse" element={<BrowseSpots />} />
            <Route path="directions/:id" element={<Directions />} />
            <Route path="arrived/:id" element={<Arrived />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

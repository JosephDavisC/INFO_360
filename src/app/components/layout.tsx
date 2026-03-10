import { Map, LayoutList, Heart } from 'lucide-react';
import { NavLink } from 'react-router';

export function StatusBar() {
  return (
    <div className="h-[54px] bg-white flex items-center justify-between px-6 shrink-0 relative">
      <span className="text-[15px] font-semibold">9:41</span>
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full" />
      <div className="flex items-center gap-1">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#333"/>
          <rect x="4" y="5" width="3" height="7" rx="0.5" fill="#333"/>
          <rect x="8" y="2" width="3" height="10" rx="0.5" fill="#333"/>
          <rect x="12" y="0" width="3" height="12" rx="0.5" fill="#333"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2C5.5 2 3.3 3.1 2 5L3.2 6.2C4.2 4.8 5.9 3.8 8 3.8C10.1 3.8 11.8 4.8 12.8 6.2L14 5C12.7 3.1 10.5 2 8 2Z" fill="#333"/>
          <path d="M8 5.5C6.5 5.5 5.2 6.2 4.3 7.3L5.5 8.5C6.1 7.7 7 7.2 8 7.2C9 7.2 9.9 7.7 10.5 8.5L11.7 7.3C10.8 6.2 9.5 5.5 8 5.5Z" fill="#333"/>
          <circle cx="8" cy="10" r="1.5" fill="#333"/>
        </svg>
        <div className="flex items-center">
          <div className="w-[22px] h-[11px] border-[1.5px] border-black/40 rounded-[3px] relative">
            <div className="absolute inset-[1.5px] bg-[#333] rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-[5px] bg-black/40 rounded-r-full ml-[0.5px]" />
        </div>
      </div>
    </div>
  );
}

export function TopBar({ title, leftIcon, rightIcon }: { title: string; leftIcon?: React.ReactNode; rightIcon?: React.ReactNode }) {
  return (
    <div className="h-[52px] flex items-center px-5 justify-between shrink-0 bg-white">
      <div className="w-8 h-8 flex items-center justify-center">
        {leftIcon}
      </div>
      <h1 className="text-[18px] font-bold text-[#1a1a1a]">{title}</h1>
      <div className="w-8 h-8 flex items-center justify-center">
        {rightIcon}
      </div>
    </div>
  );
}

export function BottomNav({ activeTab, basePath = '' }: { activeTab?: 'map' | 'list' | 'saved'; basePath?: string }) {
  const navItems = [
    { label: 'Map', icon: Map, path: `${basePath}/`, key: 'map' },
    { label: 'List', icon: LayoutList, path: `${basePath}/list`, key: 'list' },
    { label: 'Saved', icon: Heart, path: `${basePath}/saved`, key: 'saved' },
  ];

  return (
    <div className="h-[84px] bg-white border-t border-[#E8E3D3] flex items-start justify-around px-8 pt-2 shrink-0 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.key;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1 pt-1"
          >
            <Icon className={`w-[22px] h-[22px] ${isActive ? 'text-[#4B2E83]' : 'text-[#999]'}`} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className={`text-[10px] ${isActive ? 'text-[#4B2E83] font-bold' : 'text-[#999] font-medium'}`}>
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
}

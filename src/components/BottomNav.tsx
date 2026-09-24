import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    {
      id: 'dashboard' as ScreenType,
      label: 'DASH',
      icon: 'dashboard',
      matchScreens: ['dashboard']
    },
    {
      id: 'members' as ScreenType,
      label: 'MEMBERS',
      icon: 'group',
      matchScreens: ['members', 'member-detail', 'book-pt', 'pass', 'coach-chat']
    },
    {
      id: 'schedule' as ScreenType,
      label: 'SCHEDULE',
      icon: 'calendar_today',
      matchScreens: ['schedule']
    },
    {
      id: 'billing' as ScreenType,
      label: 'BILLING',
      icon: 'payments',
      matchScreens: ['billing']
    }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#0a0e16]/95 backdrop-blur-xl border-t border-white/[0.08] shadow-[0_-2px_16px_rgba(0,0,0,0.6)]">
      <div className="h-16 px-3 max-w-lg mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = tab.matchScreens.includes(currentScreen);
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] h-12 gap-0.5 transition-all ${
                isActive
                  ? 'text-[#c3f400] font-bold'
                  : 'text-[#94a3b8] hover:text-[#dfe2ee]'
              } active:scale-95`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span 
                className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

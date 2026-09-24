import React from 'react';
import { ScreenType } from '../types';
import { APEX_LOGO } from '../data/gymData';

interface HeaderProps {
  currentScreen: ScreenType;
  occupancy: number;
  maxOccupancy: number;
  onNavigate: (screen: ScreenType) => void;
  onOpenQuickScan: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  occupancy,
  maxOccupancy,
  onNavigate,
  onOpenQuickScan
}) => {
  const getSubTitle = () => {
    switch (currentScreen) {
      case 'dashboard':
        return 'Dashboard';
      case 'members':
      case 'member-detail':
        return 'Members';
      case 'schedule':
        return 'Schedule';
      case 'billing':
        return 'Billing';
      case 'book-pt':
        return 'Book PT';
      case 'pass':
        return 'Access Pass';
      case 'coach-chat':
        return 'Member Detail';
      default:
        return 'Dashboard';
    }
  };

  const isSubScreen = ['member-detail', 'book-pt', 'pass', 'coach-chat'].includes(currentScreen);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0f131c]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.4)] pt-safe">
      <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          {isSubScreen ? (
            <button
              onClick={() => {
                if (currentScreen === 'pass' || currentScreen === 'coach-chat') {
                  onNavigate('member-detail');
                } else if (currentScreen === 'book-pt') {
                  onNavigate('member-detail');
                } else {
                  onNavigate('members');
                }
              }}
              className="w-9 h-9 rounded-full bg-[#1c2028] flex items-center justify-center text-[#dfe2ee] hover:text-[#c3f400] active:scale-95 transition-all shrink-0"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center shrink-0 active:scale-95 transition-transform"
            >
              <img
                src={APEX_LOGO}
                alt="Apex Fitness Pro Logo"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </button>
          )}

          <div 
            onClick={() => onNavigate('dashboard')} 
            className="flex flex-col min-w-0 cursor-pointer"
          >
            <span className="font-headline font-bold text-[17px] text-[#dfe2ee] leading-tight truncate tracking-tight">
              Apex Fitness Pro
            </span>
            <span className="text-[10px] text-[#c4c9ac] uppercase font-semibold tracking-wider truncate">
              {getSubTitle()}
            </span>
          </div>
        </div>

        {/* Right: Live Occupancy Counter & Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Occupancy Badge */}
          <button 
            onClick={onOpenQuickScan}
            title="Click to launch Fast Pass scanner"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#262a33] hover:bg-[#31353e] active:scale-95 transition-all border border-white/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400] animate-pulse"></span>
            <span className="text-[11px] font-bold text-[#c3f400] tracking-wide">
              {occupancy} / {maxOccupancy} Inside
            </span>
          </button>

          {/* Profile Avatar */}
          <button 
            onClick={() => onNavigate('members')}
            title="Manager: Coach Marcus"
            className="w-8 h-8 rounded-full bg-white text-[#283500] flex items-center justify-center font-bold text-xs shadow-sm hover:ring-2 hover:ring-[#c3f400] transition-all"
            aria-label="User Profile"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};

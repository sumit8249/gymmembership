import React from 'react';
import { ScreenType, Member, Coach } from '../types';

interface PassScreenProps {
  member: Member;
  bookingDetails?: {
    coach: Coach;
    date: string;
    time: string;
    focus: string;
  };
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const PassScreen: React.FC<PassScreenProps> = ({
  member,
  bookingDetails,
  onNavigate,
  onShowToast
}) => {
  const coach = bookingDetails?.coach;
  const time = bookingDetails?.time || '02:00 PM';
  const date = bookingDetails?.date || 'Thu, Oct 24, 2024';
  const focus = bookingDetails?.focus || 'Power Hypertrophy & PR Session';

  return (
    <div className="flex flex-col w-full pb-36 max-w-lg mx-auto">
      {/* Top Bar */}
      <div className="px-4 pt-2.5 pb-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1 text-[13px] text-[#94a3b8] hover:text-[#c3f400] transition-colors font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
          <span>Close</span>
        </button>

        <span className="text-[10px] font-bold uppercase tracking-wider text-[#c3f400] bg-[#262a33] px-2.5 py-1 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400] animate-pulse"></span>
          Turnstile Synced
        </span>
      </div>

      {/* Confirmation Celebration Header */}
      <div className="px-4 flex flex-col items-center text-center my-3">
        <div className="w-16 h-16 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center shadow-[0_4px_24px_rgba(195,244,0,0.4)] mb-3 animate-bounce">
          <span className="material-symbols-outlined text-[36px] font-bold">check</span>
        </div>
        <h1 className="font-headline font-extrabold text-[24px] text-[#dfe2ee] tracking-tight">
          You're Locked In, {member.name.split(' ')[0]}!
        </h1>
        <p className="text-[13px] text-[#94a3b8] max-w-xs mt-1">
          Your 1-on-1 session is synchronized with Turnstile A, Rig A & Coach {coach?.name || 'Jax Carter'}.
        </p>
      </div>

      {/* Digital Access Pass Ticket Card */}
      <div className="px-4 mb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1c2028] to-[#12161f] border border-white/10 shadow-2xl">
          {/* Card Top Strip */}
          <div className="p-4 bg-[#262a33]/60 flex items-center justify-between border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c3f400] text-[20px]">fitness_center</span>
              <span className="font-headline font-bold text-[14px] text-[#dfe2ee] uppercase tracking-wider">
                Apex Fitness Pro
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#c3f400] text-[#161e00] text-[10px] font-extrabold uppercase tracking-wider">
              PT Access Pass
            </span>
          </div>

          {/* Ticket Body */}
          <div className="p-5 flex flex-col items-center">
            {/* Athlete & Session Metadata */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#94a3b8] block">Athlete</span>
                <span className="font-headline text-[16px] font-bold text-[#dfe2ee]">
                  {member.name}
                </span>
                <span className="text-[11px] text-[#c3f400] block">{member.tier} • #{member.memberNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#94a3b8] block">Coach</span>
                <span className="font-headline text-[15px] font-bold text-[#dfe2ee]">
                  {coach?.name || 'Coach Jax Carter'}
                </span>
                <span className="text-[11px] text-[#7bd0ff] block">Head Strength Lead</span>
              </div>
            </div>

            {/* Time & Venue */}
            <div className="w-full grid grid-cols-2 gap-3 py-3 border-b border-white/[0.06] text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#94a3b8] block">Date & Time</span>
                <span className="text-[13px] font-bold text-[#dfe2ee] block">{date}</span>
                <span className="text-[12px] font-bold text-[#c3f400] block">{time} (60 Mins)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#94a3b8] block">Floor Location</span>
                <span className="text-[13px] font-bold text-[#dfe2ee] block">Turf Zone & Rig A</span>
                <span className="text-[11px] text-[#94a3b8] block">Barbell Platform 1</span>
              </div>
            </div>

            {/* Ticket Notches */}
            <div className="relative w-full my-4 flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-[#31353e]"></div>
            </div>

            {/* High-Definition QR Code Container */}
            <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center">
              <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none">
                {/* Simulated Sharp QR Pattern */}
                <rect width="100" height="100" fill="white" />
                {/* Top-Left Position Detection Marker */}
                <rect x="6" y="6" width="28" height="28" fill="#161e00" rx="3" />
                <rect x="11" y="11" width="18" height="18" fill="white" rx="1" />
                <rect x="15" y="15" width="10" height="10" fill="#161e00" rx="1" />
                {/* Top-Right Position Detection Marker */}
                <rect x="66" y="6" width="28" height="28" fill="#161e00" rx="3" />
                <rect x="71" y="11" width="18" height="18" fill="white" rx="1" />
                <rect x="75" y="15" width="10" height="10" fill="#161e00" rx="1" />
                {/* Bottom-Left Position Detection Marker */}
                <rect x="6" y="66" width="28" height="28" fill="#161e00" rx="3" />
                <rect x="11" y="71" width="18" height="18" fill="white" rx="1" />
                <rect x="15" y="75" width="10" height="10" fill="#161e00" rx="1" />
                {/* Dynamic Data Modules */}
                <rect x="40" y="8" width="8" height="8" fill="#161e00" />
                <rect x="52" y="8" width="6" height="6" fill="#161e00" />
                <rect x="42" y="20" width="14" height="6" fill="#161e00" />
                <rect x="12" y="42" width="6" height="14" fill="#161e00" />
                <rect x="22" y="48" width="8" height="8" fill="#161e00" />
                <rect x="38" y="38" width="24" height="24" fill="#161e00" rx="2" />
                <rect x="44" y="44" width="12" height="12" fill="#c3f400" rx="1" />
                <rect x="68" y="42" width="8" height="12" fill="#161e00" />
                <rect x="80" y="42" width="10" height="6" fill="#161e00" />
                <rect x="40" y="70" width="12" height="6" fill="#161e00" />
                <rect x="56" y="74" width="8" height="14" fill="#161e00" />
                <rect x="70" y="68" width="14" height="8" fill="#161e00" />
                <rect x="86" y="80" width="8" height="8" fill="#161e00" />
                <rect x="72" y="82" width="8" height="10" fill="#161e00" />
              </svg>
              <span className="font-mono text-[11px] font-bold text-[#161e00] mt-1.5 tracking-wider">
                PASS: APX-9942-PT24
              </span>
            </div>

            <p className="text-[11px] text-[#94a3b8] text-center mt-3 leading-relaxed">
              Hold near turnstile or kiosk scanner. Fast NFC pass is synced with RFID #{member.rfid}.
            </p>
          </div>
        </div>
      </div>

      {/* Wallet & Calendar Sync Buttons */}
      <div className="px-4 grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => onShowToast('Pass added to Apple Wallet!', 'wallet')}
          className="p-3 rounded-xl bg-[#1c2028] hover:bg-[#262a33] text-[#dfe2ee] font-semibold text-[12px] flex items-center justify-center gap-2 border border-white/[0.04] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px] text-[#c3f400]">account_balance_wallet</span>
          <span>Apple Wallet</span>
        </button>

        <button
          onClick={() => onShowToast('Added to Google Calendar with reminders!', 'event')}
          className="p-3 rounded-xl bg-[#1c2028] hover:bg-[#262a33] text-[#dfe2ee] font-semibold text-[12px] flex items-center justify-center gap-2 border border-white/[0.04] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px] text-[#7bd0ff]">event</span>
          <span>Add to Calendar</span>
        </button>
      </div>

      {/* Before You Arrive Guidelines */}
      <div className="px-4 mb-4 space-y-2">
        <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider block">
          Before You Arrive
        </span>

        <div className="bg-[#1c2028] rounded-xl p-3 flex items-start gap-3 border border-white/[0.04]">
          <span className="material-symbols-outlined text-[#c3f400] text-[20px] shrink-0 mt-0.5">lock</span>
          <div>
            <span className="text-[12px] font-bold text-[#dfe2ee] block">RFID Locker #42 Assigned</span>
            <span className="text-[11px] text-[#94a3b8]">Auto-unlocks when you tap your RFID pass or phone.</span>
          </div>
        </div>

        <div className="bg-[#1c2028] rounded-xl p-3 flex items-start gap-3 border border-white/[0.04]">
          <span className="material-symbols-outlined text-[#7bd0ff] text-[20px] shrink-0 mt-0.5">sports_score</span>
          <div>
            <span className="text-[12px] font-bold text-[#dfe2ee] block">Gear Recommendation</span>
            <span className="text-[11px] text-[#94a3b8]">Flat lifting shoes, lifting belt, and chalk bag.</span>
          </div>
        </div>

        <div className="bg-[#1c2028] rounded-xl p-3 flex items-start gap-3 border border-white/[0.04]">
          <span className="material-symbols-outlined text-[#dfe2ee] text-[20px] shrink-0 mt-0.5">water_drop</span>
          <div>
            <span className="text-[12px] font-bold text-[#dfe2ee] block">Hydration Station Tap</span>
            <span className="text-[11px] text-[#94a3b8]">Electrolyte tap and recovery cold plunge ready on Level 2.</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <aside className="fixed bottom-16 inset-x-0 z-40 bg-[#0a0e16]/95 backdrop-blur-xl border-t border-white/[0.08] p-3 max-w-lg mx-auto">
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('coach-chat')}
            className="flex-1 py-3 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[13px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#c3f400]">chat</span>
            <span>Message Coach Jax</span>
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 py-3 rounded-xl bg-[#c3f400] text-[#161e00] font-headline text-[13px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all hover:brightness-105"
          >
            <span className="material-symbols-outlined text-[18px]">done</span>
            <span>Done</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

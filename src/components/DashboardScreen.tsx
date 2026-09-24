import React from 'react';
import { ScreenType, Member } from '../types';

interface DashboardScreenProps {
  occupancy: number;
  maxOccupancy: number;
  members: Member[];
  onNavigate: (screen: ScreenType) => void;
  onSelectMember: (memberId: string) => void;
  onOpenQuickScan: () => void;
  onOpenAddMember: () => void;
  onOpenLogPay: () => void;
  onOpenBroadcast: () => void;
  onOpenRoster: () => void;
  onFilterMembers?: (filter: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  occupancy,
  maxOccupancy,
  members,
  onNavigate,
  onSelectMember,
  onOpenQuickScan,
  onOpenAddMember,
  onOpenLogPay,
  onOpenBroadcast,
  onOpenRoster,
  onFilterMembers
}) => {
  const percent = Math.round((occupancy / maxOccupancy) * 100);
  const lockersLeft = Math.max(0, maxOccupancy - occupancy);

  // Pick floor members
  const floorMembers = members.filter(m => m.currentLocation).slice(0, 3);

  return (
    <div className="flex flex-col w-full pb-28 px-4 max-w-lg mx-auto">
      {/* Greeting & Live Status Header */}
      <section className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#c3f400] animate-ping"></span>
            <span className="text-[11px] font-bold text-[#c3f400] uppercase tracking-wider">
              Live Facility Ops
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#c4c9ac] bg-[#262a33] px-2.5 py-1 rounded-full">
            Thu, Oct 24
          </span>
        </div>

        <div>
          <h1 className="font-headline text-[22px] font-bold text-[#dfe2ee] tracking-tight leading-snug">
            Good morning, Coach Marcus
          </h1>
          <p className="text-[13px] text-[#94a3b8] mt-0.5">
            Facility running at peak momentum. Ready for morning wave.
          </p>
        </div>

        {/* Occupancy Meter Banner */}
        <div className="relative overflow-hidden rounded-xl bg-[#181c24] p-4 shadow-md border border-white/[0.04] mt-1">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#94a3b8]">
                Floor Capacity Real-Time
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline text-[32px] font-extrabold text-[#dfe2ee] leading-none">
                  {percent}<span className="text-[#c3f400] text-[24px]">%</span>
                </span>
                <span className="text-[13px] text-[#94a3b8] ml-2 font-medium">
                  {occupancy} / {maxOccupancy} Inside
                </span>
              </div>
            </div>
            <button
              onClick={onOpenQuickScan}
              title="Launch QR & NFC Scanner"
              className="w-12 h-12 rounded-full bg-[#262a33] hover:bg-[#31353e] active:scale-95 flex items-center justify-center text-[#c3f400] shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">fitness_center</span>
            </button>
          </div>

          {/* Segmented Bar Meter */}
          <div className="mt-3.5 flex flex-col gap-1.5">
            <div className="w-full bg-[#31353e] h-2.5 rounded-full overflow-hidden flex">
              <div
                className="bg-[#c3f400] h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(195,244,0,0.5)]"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[#94a3b8] text-[11px]">
              <span className="text-[#c3f400] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                Peak Pace Expected (6:30 PM)
              </span>
              <span>{lockersLeft} lockers left</span>
            </div>
          </div>
        </div>
      </section>

      {/* High-Velocity Quick Action Row */}
      <section className="mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
            Fast Lane Operations
          </span>
          <span className="text-[11px] font-semibold text-[#c3f400]">
            4 Actions Active
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* Primary Check-In */}
          <button
            onClick={onOpenQuickScan}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#c3f400] text-[#161e00] transition-all active:scale-95 shadow-[0_2px_12px_rgba(195,244,0,0.3)] hover:brightness-105"
            type="button"
          >
            <div className="w-9 h-9 rounded-full bg-[#161e00]/10 flex items-center justify-center mb-1">
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                qr_code_scanner
              </span>
            </div>
            <span className="text-[11px] font-bold text-center leading-tight">
              Quick Scan
            </span>
          </button>

          {/* New Member */}
          <button
            onClick={onOpenAddMember}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#1c2028] text-[#dfe2ee] hover:bg-[#262a33] transition-all active:scale-95 shadow-sm border border-white/[0.04]"
            type="button"
          >
            <div className="w-9 h-9 rounded-full bg-[#262a33] group-hover:bg-[#31353e] flex items-center justify-center mb-1 text-[#c3f400]">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
            </div>
            <span className="text-[11px] font-semibold text-center leading-tight">
              + Member
            </span>
          </button>

          {/* Log Payment */}
          <button
            onClick={onOpenLogPay}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#1c2028] text-[#dfe2ee] hover:bg-[#262a33] transition-all active:scale-95 shadow-sm border border-white/[0.04]"
            type="button"
          >
            <div className="w-9 h-9 rounded-full bg-[#262a33] group-hover:bg-[#31353e] flex items-center justify-center mb-1 text-[#7bd0ff]">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <span className="text-[11px] font-semibold text-center leading-tight">
              Log Pay
            </span>
          </button>

          {/* Floor Alert */}
          <button
            onClick={onOpenBroadcast}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#1c2028] text-[#dfe2ee] hover:bg-[#262a33] transition-all active:scale-95 shadow-sm border border-white/[0.04]"
            type="button"
          >
            <div className="w-9 h-9 rounded-full bg-[#262a33] group-hover:bg-[#31353e] flex items-center justify-center mb-1 text-[#ffb4ab]">
              <span className="material-symbols-outlined text-[20px]">campaign</span>
            </div>
            <span className="text-[11px] font-semibold text-center leading-tight">
              Broadcast
            </span>
          </button>
        </div>
      </section>

      {/* Live KPI Summary Grid (2x2) */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
            Performance Analytics
          </span>
          <span className="text-[11px] text-[#94a3b8]">Real-time sync</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. Active Members */}
          <div 
            onClick={() => onNavigate('members')}
            className="rounded-xl bg-[#1c2028] p-3.5 flex flex-col justify-between shadow-sm border border-white/[0.04] cursor-pointer hover:border-[#c3f400]/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                Active Roster
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#c3f400]">
                groups
              </span>
            </div>
            <div className="my-1.5">
              <span className="font-headline text-[24px] font-extrabold text-[#dfe2ee] tracking-tight">
                1,420
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px] text-[#c3f400]">
                  trending_up
                </span>
                <span className="text-[11px] font-bold text-[#c3f400]">+4.2%</span>
                <span className="text-[10px] text-[#94a3b8]">this mo</span>
              </div>
            </div>
            {/* Sparkline SVG */}
            <div className="w-full h-6 mt-0.5">
              <svg
                className="w-full h-full overflow-visible"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 30"
              >
                <path
                  d="M0 24 Q 15 22, 30 18 T 60 12 T 85 8 T 100 3"
                  stroke="#c3f400"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                ></path>
                <path
                  d="M0 24 Q 15 22, 30 18 T 60 12 T 85 8 T 100 3 L 100 30 L 0 30 Z"
                  fill="#c3f400"
                  fillOpacity="0.12"
                ></path>
              </svg>
            </div>
          </div>

          {/* 2. Today's Check-ins */}
          <div 
            onClick={onOpenQuickScan}
            className="rounded-xl bg-[#1c2028] p-3.5 flex flex-col justify-between shadow-sm border border-white/[0.04] cursor-pointer hover:border-[#7bd0ff]/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                Check-Ins
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#7bd0ff]">
                how_to_reg
              </span>
            </div>
            <div className="my-1.5">
              <span className="font-headline text-[24px] font-extrabold text-[#dfe2ee] tracking-tight">
                342
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px] text-[#7bd0ff]">
                  schedule
                </span>
                <span className="text-[11px] text-[#7bd0ff] font-medium">
                  Peak 6:30 PM
                </span>
              </div>
            </div>
            {/* Mini Bar Metric Visualization */}
            <div className="flex items-end gap-1 h-6 mt-0.5 pt-1">
              <span className="flex-1 bg-[#262a33] rounded-sm h-2.5"></span>
              <span className="flex-1 bg-[#262a33] rounded-sm h-3.5"></span>
              <span className="flex-1 bg-[#262a33] rounded-sm h-4.5"></span>
              <span className="flex-1 bg-[#7bd0ff] rounded-sm h-6 shadow-[0_0_8px_rgba(123,208,255,0.4)]"></span>
              <span className="flex-1 bg-[#262a33] rounded-sm h-3.5"></span>
              <span className="flex-1 bg-[#262a33] rounded-sm h-2"></span>
            </div>
          </div>

          {/* 3. Monthly Recurring Revenue */}
          <div 
            onClick={() => onNavigate('billing')}
            className="rounded-xl bg-[#1c2028] p-3.5 flex flex-col justify-between shadow-sm border border-white/[0.04] cursor-pointer hover:border-[#c3f400]/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                MRR Total
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#c3f400]">
                payments
              </span>
            </div>
            <div className="my-1.5">
              <span className="font-headline text-[24px] font-extrabold text-[#dfe2ee] tracking-tight">
                $48.6k
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px] text-[#c3f400]">
                  north_east
                </span>
                <span className="text-[11px] font-bold text-[#c3f400]">+8.1% YoY</span>
              </div>
            </div>
            <div className="w-full bg-[#262a33] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#c3f400] h-full rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>

          {/* 4. At-Risk / Expiring */}
          <div className="rounded-xl bg-[#1c2028] p-3.5 flex flex-col justify-between shadow-sm border border-white/[0.04]">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                At-Risk
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#ffb4ab]">
                warning
              </span>
            </div>
            <div className="my-1.5">
              <span className="font-headline text-[24px] font-extrabold text-[#dfe2ee] tracking-tight">
                18
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-pulse"></span>
                <span className="text-[11px] font-semibold text-[#ffb4ab]">
                  Action Needed
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                if (onFilterMembers) onFilterMembers('expiring');
                onNavigate('members');
              }}
              className="inline-flex items-center justify-between px-2 py-1 rounded bg-[#93000a]/40 text-[#ffdad6] hover:bg-[#93000a]/60 active:scale-95 transition-all text-[10px] font-bold mt-1"
            >
              <span>Expiring in 7d</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Class Spotlight */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
            Next Live Session
          </span>
          <span className="text-[11px] font-bold text-[#c3f400]">
            Studio A
          </span>
        </div>

        <div className="rounded-xl bg-[#1c2028] p-4 shadow-sm relative overflow-hidden flex flex-col gap-3 border border-white/[0.04]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-[#31353e] overflow-hidden shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNPgEwCFc93etYcXuIf7hAhx4dzGUqQi-8dgj_d0FkM6Uy_6GysRdgGawxK5R07S8NCOE9ogBLxOaLFZNybesyQbPTIVgHwmuvG34qXdI6xJBKMw6PMwmclfQTmtqREXxKtNemY88tq41jKaG_r9RyjWiXjSy15llkeoTbsMcm2fklEUsTxhkc-6sOwU3Yj9mIm6I0J0IwZnf5l9Rt1COQBfEI201kztrTa2jFCh4AQXxOzoUiNavfcA"
                  alt="Trainer Jax Carter"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline font-bold text-[16px] text-[#dfe2ee] truncate">
                    High-Octane HIIT
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#c3f400]/20 text-[#c3f400] text-[10px] font-bold uppercase tracking-wider">
                    25m
                  </span>
                </div>
                <p className="text-[12px] text-[#94a3b8] truncate">
                  Trainer Jax Carter • 45 Min Session
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-headline font-bold text-[16px] text-[#c3f400]">
                24 / 25
              </span>
              <span className="block text-[10px] text-[#94a3b8]">
                Spots filled
              </span>
            </div>
          </div>

          {/* Session Progress & Rapid Action */}
          <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
            <div className="flex items-center gap-1.5 text-[#94a3b8] text-[11px]">
              <span className="material-symbols-outlined text-[15px] text-[#7bd0ff]">
                timer
              </span>
              <span>Starts 07:15 AM (Pre-cleared)</span>
            </div>
            <button
              onClick={onOpenRoster}
              className="px-3 py-1.5 rounded-lg bg-[#262a33] text-[#dfe2ee] text-[11px] font-bold hover:bg-[#353942] active:scale-95 transition-all"
              type="button"
            >
              Manage Roster
            </button>
          </div>
        </div>
      </section>

      {/* Live Floor Activity Stream */}
      <section className="mt-6 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#c3f400]">
              sensors
            </span>
            <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
              Current Floor Activity
            </span>
          </div>
          <button
            onClick={() => onNavigate('members')}
            className="text-[11px] font-bold text-[#c3f400] flex items-center gap-0.5 hover:underline"
            type="button"
          >
            View All ({occupancy})
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        {/* Feed List */}
        <div className="flex flex-col gap-2">
          {floorMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => {
                onSelectMember(member.id);
                onNavigate('member-detail');
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-[#1c2028] hover:bg-[#262a33] transition-all shadow-sm border border-white/[0.04] cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#31353e] overflow-hidden shrink-0 ring-1 ring-white/10">
                  <img
                    className="w-full h-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-[14px] text-[#dfe2ee] truncate block">
                    {member.name}
                  </span>
                  <span className="text-[12px] text-[#94a3b8] flex items-center gap-1 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400]"></span>
                    {member.currentLocation || 'Main Floor'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-[#262a33] text-[#dfe2ee] text-[10px] font-semibold">
                  {member.tier.includes('VIP') ? 'VIP Elite' : member.tier.includes('Class') ? 'Class Pass' : 'Standard'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMember(member.id);
                    onNavigate('member-detail');
                  }}
                  className="w-8 h-8 rounded-full bg-[#262a33] flex items-center justify-center text-[#94a3b8] hover:text-[#dfe2ee]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">more_vert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

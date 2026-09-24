import React, { useState } from 'react';
import { ScreenType, Member } from '../types';

interface MemberDetailScreenProps {
  member: Member;
  onNavigate: (screen: ScreenType) => void;
  onToggleCheckIn: (memberId: string) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const MemberDetailScreen: React.FC<MemberDetailScreenProps> = ({
  member,
  onNavigate,
  onToggleCheckIn,
  onShowToast
}) => {
  const [selectedLogFilter, setSelectedLogFilter] = useState<'all' | 'classes' | 'gym' | 'spa'>('all');
  const [showWaiverModal, setShowWaiverModal] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(Boolean(member.currentLocation));

  const handleCheckInToggle = () => {
    setIsCheckedIn(!isCheckedIn);
    onToggleCheckIn(member.id);
    onShowToast(
      !isCheckedIn 
        ? `${member.name} checked in to Turnstile A!`
        : `${member.name} checked out of facility.`,
      'how_to_reg'
    );
  };

  const handleFreezeToggle = () => {
    onShowToast(`Membership freeze request initiated for ${member.name}.`, 'ac_unit');
  };

  return (
    <div className="flex flex-col w-full pb-36 max-w-lg mx-auto">
      {/* Sub-Header Navigation */}
      <div className="px-4 pt-2.5 pb-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('members')}
          className="flex items-center gap-1 text-[13px] text-[#94a3b8] hover:text-[#c3f400] transition-colors font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Members Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast(`Member file #${member.memberNumber} edited`, 'edit')}
            className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center hover:bg-[#31353e] active:scale-95 transition-all"
            aria-label="Edit Member"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
          <button
            onClick={() => onShowToast('Audit Options: Change Tier, Reissue RFID, Export Dossier')}
            className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center hover:bg-[#31353e] active:scale-95 transition-all"
            aria-label="More Options"
          >
            <span className="material-symbols-outlined text-[16px]">more_vert</span>
          </button>
        </div>
      </div>

      {/* Hero Member Profile Card */}
      <div className="px-4 mb-3">
        <div className="relative overflow-hidden rounded-2xl bg-[#1c2028] p-4 shadow-xl border border-white/[0.04]">
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#c3f400]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-start gap-3.5 relative z-10">
            <div className="relative shrink-0">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#c3f400] shadow-md"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#c3f400] ring-2 ring-[#1c2028] flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-[#161e00]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-headline font-extrabold text-[20px] text-[#dfe2ee] tracking-tight">
                  {member.name}
                </h1>
                <span className="material-symbols-outlined text-[18px] text-[#c3f400]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#c3f400]/20 text-[#c3f400] text-[10px] font-bold uppercase tracking-wider">
                  VIP ONYX
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#262a33] text-[#c3f400] text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400] animate-pulse"></span>
                  ACTIVE
                </span>
              </div>

              <div className="text-[11px] text-[#94a3b8] mt-1.5 space-x-2">
                <span>ID: #{member.memberNumber}</span>
                <span>•</span>
                <span>RFID: {member.rfid}</span>
                <span>•</span>
                <span>{member.monthsActive} mos active</span>
              </div>
            </div>
          </div>

          {/* Quick Action Ribbon */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/[0.04]">
            <a
              href={`tel:${member.phone}`}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] active:scale-95 transition-all text-center"
            >
              <span className="material-symbols-outlined text-[18px] text-[#7bd0ff]">phone</span>
              <span className="text-[10px] font-semibold mt-1">Call</span>
            </a>

            <button
              onClick={() => onNavigate('coach-chat')}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] active:scale-95 transition-all text-center"
            >
              <span className="material-symbols-outlined text-[18px] text-[#c3f400]">chat</span>
              <span className="text-[10px] font-semibold mt-1">Message</span>
            </button>

            <button
              onClick={handleCheckInToggle}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl active:scale-95 transition-all text-center ${
                isCheckedIn
                  ? 'bg-[#c3f400] text-[#161e00] font-bold'
                  : 'bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isCheckedIn ? 'done_all' : 'how_to_reg'}
              </span>
              <span className="text-[10px] font-semibold mt-1">
                {isCheckedIn ? 'Inside' : 'Check In'}
              </span>
            </button>

            <button
              onClick={handleFreezeToggle}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] active:scale-95 transition-all text-center"
            >
              <span className="material-symbols-outlined text-[18px] text-[#94a3b8]">ac_unit</span>
              <span className="text-[10px] font-semibold mt-1">Freeze</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Vitals Matrix (2x2) */}
      <div className="px-4 mb-3.5">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Pass Details */}
          <div className="bg-[#1c2028] rounded-xl p-3.5 flex flex-col justify-between border border-white/[0.04] shadow-sm">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Monthly Pass
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#c3f400]">credit_card</span>
            </div>
            <div className="my-1">
              <span className="font-headline text-[22px] font-extrabold text-[#dfe2ee]">
                ${member.monthlyFee}
              </span>
              <span className="text-[11px] text-[#94a3b8]"> / mo</span>
            </div>
            <span className="text-[10px] text-[#c3f400] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">autorenew</span>
              Auto-Pay: Next Nov 12
            </span>
          </div>

          {/* Card 2: PT Sessions */}
          <div className="bg-[#1c2028] rounded-xl p-3.5 flex flex-col justify-between border border-white/[0.04] shadow-sm">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                PT Credits
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#7bd0ff]">sports_martial_arts</span>
            </div>
            <div className="my-1">
              <span className="font-headline text-[22px] font-extrabold text-[#c3f400]">
                {member.ptCreditsRemaining} / {member.totalPtCredits}
              </span>
              <span className="text-[11px] text-[#94a3b8]"> Left</span>
            </div>
            <button
              onClick={() => onNavigate('book-pt')}
              className="text-[10px] text-[#7bd0ff] font-bold hover:underline flex items-center justify-between"
            >
              <span>+ Book PT Session</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </button>
          </div>

          {/* Card 3: Active Streak */}
          <div className="bg-[#1c2028] rounded-xl p-3.5 flex flex-col justify-between border border-white/[0.04] shadow-sm">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Active Streak
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#c3f400]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
            </div>
            <div className="my-1">
              <span className="font-headline text-[22px] font-extrabold text-[#dfe2ee]">
                {member.streakDays}
              </span>
              <span className="text-[11px] text-[#94a3b8]"> Days</span>
            </div>
            <span className="text-[10px] text-[#94a3b8]">
              Personal Best: 34 Days
            </span>
          </div>

          {/* Card 4: Total Visits */}
          <div className="bg-[#1c2028] rounded-xl p-3.5 flex flex-col justify-between border border-white/[0.04] shadow-sm">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Lifetime Visits
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#dfe2ee]">fitness_center</span>
            </div>
            <div className="my-1">
              <span className="font-headline text-[22px] font-extrabold text-[#dfe2ee]">
                {member.totalVisits}
              </span>
              <span className="text-[11px] text-[#94a3b8]"> Total</span>
            </div>
            <span className="text-[10px] text-[#c3f400] font-semibold">
              Avg 4.2 / week (Top 5%)
            </span>
          </div>
        </div>
      </div>

      {/* Attendance Rhythm & Zone Heatmap */}
      <div className="px-4 mb-3.5">
        <div className="bg-[#1c2028] rounded-xl p-4 border border-white/[0.04] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Attendance Rhythm
              </span>
              <h3 className="font-headline text-[15px] font-bold text-[#dfe2ee]">
                4.2 Visits / Week Average
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-[#c3f400] bg-[#262a33] px-2.5 py-1 rounded-full">
              Oct 2024
            </span>
          </div>

          {/* 4-Week Activity Heatmap */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] text-[#94a3b8] font-bold px-1">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>

            {/* Week 1 */}
            <div className="grid grid-cols-7 gap-1.5">
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">1</span>
              <span className="h-6 rounded bg-[#262a33]"></span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">3</span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">4</span>
              <span className="h-6 rounded bg-[#262a33]"></span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">6</span>
              <span className="h-6 rounded bg-[#262a33]"></span>
            </div>

            {/* Week 2 */}
            <div className="grid grid-cols-7 gap-1.5">
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">8</span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">9</span>
              <span className="h-6 rounded bg-[#262a33]"></span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">11</span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">12</span>
              <span className="h-6 rounded bg-[#262a33]"></span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">14</span>
            </div>

            {/* Week 3 */}
            <div className="grid grid-cols-7 gap-1.5">
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">15</span>
              <span className="h-6 rounded bg-[#262a33]"></span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">17</span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">18</span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">19</span>
              <span className="h-6 rounded bg-[#262a33]"></span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">21</span>
            </div>

            {/* Week 4 (Current) */}
            <div className="grid grid-cols-7 gap-1.5">
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">22</span>
              <span className="h-6 rounded bg-[#c3f400] flex items-center justify-center text-[10px] font-bold text-[#161e00]">23</span>
              <span className="h-6 rounded bg-[#c3f400] ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-[#161e00]">24</span>
              <span className="h-6 rounded bg-[#31353e] border border-dashed border-[#c3f400]/40"></span>
              <span className="h-6 rounded bg-[#262a33]"></span>
              <span className="h-6 rounded bg-[#262a33]"></span>
              <span className="h-6 rounded bg-[#262a33]"></span>
            </div>
          </div>

          {/* Facility Telemetry Highlights */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/[0.04] text-[11px]">
            <div className="flex items-center gap-1.5 text-[#94a3b8]">
              <span className="material-symbols-outlined text-[15px] text-[#7bd0ff]">schedule</span>
              <span>Preferred: <strong>07:15 AM Wave</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-[#94a3b8]">
              <span className="material-symbols-outlined text-[15px] text-[#c3f400]">timer</span>
              <span>Avg Session: <strong>1h 14m</strong></span>
            </div>
          </div>

          {/* Zone Affinity Multi-Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-[#94a3b8] font-bold mb-1">
              <span>ZONE AFFINITY</span>
              <span className="text-[#dfe2ee]">Strength 65% • HIIT 25% • Spa 10%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#0a0e16] overflow-hidden flex">
              <div className="h-full bg-[#c3f400]" style={{ width: '65%' }}></div>
              <div className="h-full bg-[#7bd0ff]" style={{ width: '25%' }}></div>
              <div className="h-full bg-[#353942]" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Access Log / Check-in Ledger */}
      <div className="px-4 mb-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-[16px] text-[#dfe2ee]">
              Access Log
            </span>
            <span className="text-[10px] font-bold text-[#c3f400] bg-[#262a33] px-2 py-0.5 rounded-full">
              Real-Time Sync
            </span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'all', label: 'All (248)' },
            { id: 'classes', label: 'Classes (42)' },
            { id: 'gym', label: 'Open Gym (186)' },
            { id: 'spa', label: 'Spa Lounge (20)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLogFilter(tab.id as any)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
                selectedLogFilter === tab.id
                  ? 'bg-[#c3f400] text-[#161e00]'
                  : 'bg-[#262a33] text-[#94a3b8] hover:text-[#dfe2ee]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Access Log Items */}
        <div className="space-y-2 mt-1">
          {/* Today */}
          <div className="bg-[#1c2028] rounded-xl p-3 flex items-center justify-between border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#c3f400]/20 text-[#c3f400] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">sensors</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#dfe2ee]">
                  Turnstile A - Main Floor
                </span>
                <span className="text-[10px] text-[#94a3b8]">
                  Today • 7:15 AM • RFID OX-9942
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#c3f400] flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              +1 Streak
            </span>
          </div>

          {/* Yesterday */}
          <div className="bg-[#1c2028] rounded-xl p-3 flex items-center justify-between border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7bd0ff]/20 text-[#7bd0ff] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">sports_martial_arts</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#dfe2ee]">
                  Studio 1 - High-Octane HIIT
                </span>
                <span className="text-[10px] text-[#94a3b8]">
                  Yesterday • 6:30 PM • Coach Jax Carter
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#94a3b8]">
              Completed
            </span>
          </div>

          {/* Oct 21 */}
          <div className="bg-[#1c2028] rounded-xl p-3 flex items-center justify-between border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">fitness_center</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#dfe2ee]">
                  Turnstile B - Strength Rig
                </span>
                <span className="text-[10px] text-[#94a3b8]">
                  Oct 21 • 7:02 AM • Open Floor
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#94a3b8]">
              1h 22m
            </span>
          </div>
        </div>

        <button
          onClick={() => onShowToast('All 248 records loaded in dossier view', 'history')}
          className="mt-2.5 w-full py-2 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[11px] font-bold text-center transition-colors"
        >
          Load Earlier Activity
        </button>
      </div>

      {/* Coach Notes & Waivers */}
      <div className="px-4 mb-4 space-y-2.5">
        <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider block">
          Coach Directives & Legal
        </span>

        {/* Coach Jax Carter Note Card */}
        <div className="bg-[#1c2028] rounded-xl p-3.5 border border-white/[0.04]">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa_y7-MQu7s6PYx4FONsiH909HleWjqIQaCmyXxzrRqJOTXgCutCLaViCQLNKJmsATMISudYEZzIjGpR12rIP6sqcx1MM7XFOYeuvQCfUKlr9v63YSDi3Edc-zJb8RLYmcUtAI9oqnOpaQTi5wj-8YTyd9cGyY6y7w5kNDS5b5GcFdAnfTolcBPWr3qb_ismoCB88O4dfbyj3ruSn2rHreGsGcJby53UkKbQNRXNf6z84owVo1nrRJ1Q"
                alt="Coach Jax Carter"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
                referrerPolicy="no-referrer"
              />
              <span className="text-[12px] font-bold text-[#dfe2ee]">
                Coach Jax Carter (Head Strength Lead)
              </span>
            </div>
            <span className="text-[10px] text-[#94a3b8]">Oct 18</span>
          </div>
          <p className="text-[12px] text-[#c4c9ac] leading-relaxed">
            "Targeting 180kg deadlift milestone this training block. Knee rehab routine verified with physical therapist; clear for unrestricted barbell training."
          </p>
        </div>

        {/* Digital Waiver Card */}
        <div className="bg-[#1c2028] rounded-xl p-3 flex items-center justify-between border border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#c3f400]">
              verified_user
            </span>
            <div>
              <span className="text-[12px] font-semibold text-[#dfe2ee] block">
                Digital Facility & Liability Waiver
              </span>
              <span className="text-[10px] text-[#94a3b8]">
                Signed Mar 14, 2023 • Doc ID #W-8812
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowWaiverModal(true)}
            className="px-2.5 py-1 rounded bg-[#262a33] text-[#c3f400] text-[11px] font-bold hover:bg-[#31353e]"
          >
            View
          </button>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <aside className="fixed bottom-16 inset-x-0 z-40 bg-[#0a0e16]/95 backdrop-blur-xl border-t border-white/[0.08] p-3 max-w-lg mx-auto">
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('coach-chat')}
            className="flex-1 py-3 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[13px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#c3f400]">chat</span>
            <span>Message Coach</span>
          </button>
          <button
            onClick={() => onNavigate('book-pt')}
            className="flex-1 py-3 rounded-xl bg-[#c3f400] hover:brightness-105 text-[#161e00] font-headline text-[13px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(195,244,0,0.3)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              event_available
            </span>
            <span>Book PT Session</span>
          </button>
        </div>
      </aside>

      {/* Waiver Modal */}
      {showWaiverModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c2028] rounded-2xl max-w-sm w-full p-5 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c3f400]">verified_user</span>
                <h4 className="font-headline font-bold text-[16px] text-[#dfe2ee]">
                  Digital Waiver Dossier
                </h4>
              </div>
              <button
                onClick={() => setShowWaiverModal(false)}
                className="w-8 h-8 rounded-full bg-[#262a33] text-[#94a3b8] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-2 text-[12px] text-[#c4c9ac] max-h-60 overflow-y-auto pr-1">
              <p><strong>Member Name:</strong> Sarah Jenkins</p>
              <p><strong>Agreement ID:</strong> W-8812-2023</p>
              <p><strong>Verification:</strong> Cryptographically timestamped Mar 14, 2023 10:14 AM UTC.</p>
              <p><strong>Terms:</strong> Standard Apex Fitness Pro liability release, equipment usage protocols, recovery lounge health certification, and personal training authorization.</p>
              <p className="text-[#c3f400] font-semibold">Status: Fully Enforced & Valid</p>
            </div>
            <button
              onClick={() => setShowWaiverModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#c3f400] text-[#161e00] font-bold text-[13px]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

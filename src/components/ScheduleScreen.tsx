import React, { useState } from 'react';
import { ScreenType, ClassSession } from '../types';

interface ScheduleScreenProps {
  classes: ClassSession[];
  onNavigate: (screen: ScreenType) => void;
  onOpenQuickScan: () => void;
  onOpenRoster: (classSession?: ClassSession) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  classes,
  onOpenQuickScan,
  onOpenRoster,
  onShowToast
}) => {
  const [selectedDay, setSelectedDay] = useState(24);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const days = [
    { day: 'Mon', date: 21 },
    { day: 'Tue', date: 22 },
    { day: 'Wed', date: 23 },
    { day: 'Today', date: 24, isToday: true },
    { day: 'Fri', date: 25 },
    { day: 'Sat', date: 26 },
    { day: 'Sun', date: 27 },
  ];

  const categoryFilters = [
    { id: 'all', label: 'All Trackers (4)' },
    { id: 'hiit', label: 'HIIT & Power' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'recovery', label: 'Recovery Flow' },
  ];

  const filteredClasses = classes.filter((cls) => {
    if (selectedCategory === 'all') return true;
    return cls.category === selectedCategory;
  });

  return (
    <div className="flex flex-col w-full pb-32 max-w-lg mx-auto">
      {/* Horizontal Date Strip */}
      <div className="w-full px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#c3f400] text-[20px]">
              calendar_month
            </span>
            <h2 className="font-headline text-[18px] font-bold text-[#dfe2ee]">
              October 2024
            </h2>
          </div>
          <button
            onClick={() => onShowToast('October 2024 Full Calendar Synced')}
            className="flex items-center gap-1 text-[#94a3b8] hover:text-[#c3f400] transition-colors text-[12px] font-semibold"
            type="button"
          >
            <span>Full Month</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Scrollable Days Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar -mx-4 px-4">
          {days.map((item) => {
            const isSelected = selectedDay === item.date;
            if (item.isToday) {
              return (
                <button
                  key={item.date}
                  onClick={() => setSelectedDay(item.date)}
                  className="relative flex flex-col items-center justify-center shrink-0 w-14 h-16 rounded-xl bg-[#c3f400] text-[#161e00] shadow-[0_4px_20px_rgba(195,244,0,0.35)] active:scale-95 transition-transform"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Today
                  </span>
                  <span className="font-headline text-[22px] leading-tight font-extrabold">
                    24
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#161e00] mt-0.5"></div>
                </button>
              );
            }

            return (
              <button
                key={item.date}
                onClick={() => setSelectedDay(item.date)}
                className={`flex flex-col items-center justify-center shrink-0 w-12 h-16 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-[#31353e] text-[#c3f400] ring-1 ring-[#c3f400]'
                    : 'bg-[#1c2028] text-[#dfe2ee] hover:bg-[#262a33]'
                } active:scale-95`}
              >
                <span className="text-[10px] text-[#94a3b8] uppercase font-bold">
                  {item.day}
                </span>
                <span className="font-headline text-[17px] font-bold mt-0.5">
                  {item.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Class Stats Pulse Bar */}
      <div className="px-4 my-2">
        <div className="bg-[#1c2028] p-3.5 rounded-xl shadow-md border border-white/[0.04]">
          <div className="grid grid-cols-3 gap-3">
            {/* Metric 1 */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Sessions
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline text-[22px] font-extrabold text-[#dfe2ee]">
                  6
                </span>
                <span className="text-[11px] text-[#94a3b8]">Today</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[#c3f400]">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                <span className="text-[10px] font-bold">Peak Day</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Booked
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline text-[22px] font-extrabold text-[#dfe2ee]">
                  148
                </span>
                <span className="text-[11px] text-[#94a3b8]">Athletes</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[#7bd0ff]">
                <span className="material-symbols-outlined text-[14px]">group</span>
                <span className="text-[10px] font-medium">+14 vs Avg</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Fill Rate
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline text-[22px] font-extrabold text-[#c3f400]">
                  94%
                </span>
              </div>
              <div className="w-full bg-[#262a33] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#c3f400] h-full rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter / Sorting Pill Strip */}
      <div className="px-4 flex items-center gap-2 overflow-x-auto py-1 no-scrollbar -mx-4 px-4">
        {categoryFilters.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold shrink-0 transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#c3f400] text-[#161e00] shadow-sm'
                  : 'bg-[#1c2028] text-[#94a3b8] hover:bg-[#262a33] hover:text-[#dfe2ee]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Timeline Cards */}
      <div className="px-4 flex flex-col gap-3.5 mt-3">
        {filteredClasses.map((cls) => {
          if (cls.status === 'completed') {
            return (
              <div
                key={cls.id}
                className="bg-[#1c2028] rounded-xl p-4 relative overflow-hidden shadow-md border border-white/[0.04]"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#262a33] text-[#94a3b8] text-[10px] font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[13px] text-[#94a3b8]">
                        check_circle
                      </span>
                      COMPLETED
                    </span>
                    <span className="text-[12px] text-[#94a3b8]">{cls.timeRange}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#262a33] text-[#94a3b8] font-semibold">
                    {cls.studio}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-headline text-[16px] font-bold text-[#dfe2ee] tracking-tight">
                      {cls.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <img
                        className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-white/10"
                        src={cls.coach.avatar}
                        alt={cls.coach.name}
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[12px] text-[#94a3b8]">{cls.coach.name}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-headline text-[18px] font-bold text-[#ffb4ab]">
                      {cls.booked}/{cls.capacity}
                    </span>
                    <span className="block text-[10px] text-[#ffb4ab] uppercase font-bold">
                      FULL ({cls.waitlist || 3} Wait)
                    </span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-2.5 w-full bg-[#31353e] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ffb4ab] h-full rounded-full" style={{ width: '100%' }}></div>
                </div>

                {/* Post-Session Audit Pill */}
                <div className="mt-3 pt-2 flex items-center justify-between text-[#94a3b8] border-t border-white/[0.04]">
                  <div className="flex items-center gap-3 text-[12px]">
                    <span className="flex items-center gap-1 text-[#c3f400] font-semibold">
                      <span className="material-symbols-outlined text-[15px]">how_to_reg</span>
                      {cls.attended || 24} Attended
                    </span>
                    <span className="flex items-center gap-1 text-[#ffb4ab] font-semibold">
                      <span className="material-symbols-outlined text-[15px]">person_off</span>
                      {cls.noShow || 1} No-show
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenRoster(cls)}
                    className="text-[12px] font-semibold text-[#94a3b8] hover:text-[#dfe2ee] flex items-center gap-0.5"
                  >
                    <span>Log</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            );
          }

          if (cls.status === 'live') {
            return (
              <div
                key={cls.id}
                className="bg-[#1c2028] rounded-xl p-4 relative overflow-hidden shadow-lg border border-white/[0.04]"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c3f400] via-[#7bd0ff] to-[#c3f400] animate-pulse"></div>
                <div className="flex items-center justify-between gap-2 mb-2 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#262a33] text-[#c3f400] text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#c3f400] animate-ping"></span>
                      LIVE NOW
                    </span>
                    <span className="text-[12px] text-[#dfe2ee] font-semibold">{cls.timeRange}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#262a33] text-[#94a3b8] font-semibold">
                    {cls.studio}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-headline text-[16px] font-bold text-[#dfe2ee] tracking-tight">
                      {cls.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <img
                        className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-white/10"
                        src={cls.coach.avatar}
                        alt={cls.coach.name}
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[12px] text-[#94a3b8]">{cls.coach.name}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-headline text-[18px] font-bold text-[#c3f400]">
                      {cls.booked}/{cls.capacity}
                    </span>
                    <span className="block text-[10px] text-[#94a3b8] uppercase">
                      Spots Taken
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 w-full bg-[#31353e] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#c3f400] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(195,244,0,0.5)]"
                    style={{ width: `${(cls.booked / cls.capacity) * 100}%` }}
                  ></div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between border-t border-white/[0.04]">
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#c3f400]">
                    <span className="material-symbols-outlined text-[17px]">verified</span>
                    <span>Live: {cls.checkedInLive || 17} Checked In</span>
                  </div>
                  <button
                    onClick={() => onOpenRoster(cls)}
                    className="px-3 py-1 rounded-lg bg-[#262a33] hover:bg-[#353942] text-[#dfe2ee] text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">timer</span>
                    <span>Session HUD</span>
                  </button>
                </div>
              </div>
            );
          }

          if (cls.status === 'next_up') {
            return (
              <div
                key={cls.id}
                className="bg-[#1c2028] rounded-xl p-4 relative overflow-hidden shadow-xl border border-white/[0.06]"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#262a33] text-[#7bd0ff] text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      NEXT UP
                    </span>
                    <span className="text-[12px] text-[#dfe2ee] font-semibold">{cls.timeRange}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#262a33] text-[#94a3b8] font-semibold">
                    {cls.studio}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-headline text-[16px] font-bold text-[#dfe2ee] tracking-tight">
                      {cls.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <img
                        className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-white/10"
                        src={cls.coach.avatar}
                        alt={cls.coach.name}
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[12px] text-[#94a3b8]">{cls.coach.name}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-headline text-[18px] font-bold text-[#dfe2ee]">
                      {cls.booked}/{cls.capacity}
                    </span>
                    <span className="block text-[10px] text-[#94a3b8] uppercase">
                      {cls.capacity - cls.booked} Spots Left
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 w-full bg-[#31353e] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00a6e0] h-full rounded-full"
                    style={{ width: `${(cls.booked / cls.capacity) * 100}%` }}
                  ></div>
                </div>

                <div className="mt-3.5 grid grid-cols-2 gap-2">
                  <button
                    onClick={onOpenQuickScan}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#c3f400] text-[#161e00] font-bold text-[12px] shadow-[0_2px_12px_rgba(195,244,0,0.25)] active:scale-[0.98] transition-transform hover:brightness-105"
                  >
                    <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                    <span>Check-in Scan</span>
                  </button>
                  <button
                    onClick={() => onOpenRoster(cls)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#262a33] hover:bg-[#353942] text-[#dfe2ee] font-semibold text-[12px] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[17px]">badge</span>
                    <span>View Roster ({cls.booked})</span>
                  </button>
                </div>
              </div>
            );
          }

          // Upcoming
          return (
            <div
              key={cls.id}
              className="bg-[#1c2028] rounded-xl p-4 relative overflow-hidden shadow-md border border-white/[0.04]"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#262a33] text-[#94a3b8] text-[10px] font-bold">
                    UPCOMING
                  </span>
                  <span className="text-[12px] text-[#94a3b8]">{cls.timeRange}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#262a33] text-[#94a3b8] font-semibold">
                  {cls.studio}
                </span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-headline text-[16px] font-bold text-[#dfe2ee] tracking-tight">
                    {cls.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-white/10"
                      src={cls.coach.avatar}
                      alt={cls.coach.name}
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[12px] text-[#94a3b8]">{cls.coach.name}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-headline text-[18px] font-bold text-[#dfe2ee]">
                    {cls.booked}/{cls.capacity}
                  </span>
                  <span className="block text-[10px] text-[#94a3b8] uppercase">
                    {cls.capacity - cls.booked} Spot Left
                  </span>
                </div>
              </div>

              <div className="mt-2.5 w-full bg-[#31353e] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#7bd0ff] h-full rounded-full"
                  style={{ width: `${(cls.booked / cls.capacity) * 100}%` }}
                ></div>
              </div>

              <div className="mt-3 pt-2 flex items-center justify-between text-[#94a3b8] border-t border-white/[0.04]">
                <span className="text-[12px] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#7bd0ff]">
                    self_improvement
                  </span>
                  Foam rollers & bands ready
                </span>
                <button
                  onClick={() => onOpenRoster(cls)}
                  className="text-[12px] font-semibold text-[#94a3b8] hover:text-[#dfe2ee] flex items-center gap-0.5"
                >
                  <span>Manage</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Fast Pass Kiosk Scanner Quick-Trigger Card */}
      <div className="px-4 mt-6">
        <div className="relative bg-[#262a33] rounded-xl p-4 shadow-xl overflow-hidden border border-white/[0.04]">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#c3f400]/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#c3f400] text-[#161e00] flex items-center justify-center shrink-0 shadow-[0_2px_12px_rgba(195,244,0,0.35)]">
              <span className="material-symbols-outlined text-[28px]">contactless</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-headline font-bold text-[16px] text-[#dfe2ee] tracking-tight">
                  Fast Pass Kiosk Scanner
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-[#c3f400]/20 text-[#c3f400] text-[9px] font-bold uppercase">
                  Ready
                </span>
              </div>
              <p className="text-[12px] text-[#94a3b8] mt-1 leading-relaxed">
                Scan member wristband or mobile app QR code for rapid instant session entry and auto-roster check-in.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={onOpenQuickScan}
                  className="px-3.5 py-2 rounded-lg bg-[#0a0e16] hover:bg-[#353942] text-[#c3f400] text-[12px] font-bold flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">sensors</span>
                  <span>Launch NFC Reader</span>
                </button>
                <span className="text-[10px] text-[#94a3b8]">Port #2 Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

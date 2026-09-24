import React, { useState } from 'react';
import { ScreenType, Member, Coach } from '../types';
import { COACH_JAX, COACH_MAYA, COACH_DAVE } from '../data/gymData';

interface BookPTScreenProps {
  member: Member;
  onNavigate: (screen: ScreenType) => void;
  onConfirmBooking: (bookingDetails: {
    coach: Coach;
    date: string;
    time: string;
    focus: string;
  }) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const BookPTScreen: React.FC<BookPTScreenProps> = ({
  member,
  onNavigate,
  onConfirmBooking,
  onShowToast
}) => {
  const [selectedCoach, setSelectedCoach] = useState<Coach>(COACH_JAX);
  const [selectedDate, setSelectedDate] = useState('Today 24');
  const [selectedFocus, setSelectedFocus] = useState('Strength / PR');
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const coaches: Coach[] = [COACH_JAX, COACH_MAYA, COACH_DAVE];

  const dates = [
    { label: 'Today', dayNum: '24', id: 'Today 24', isToday: true },
    { label: 'Fri', dayNum: '25', id: 'Fri 25' },
    { label: 'Sat', dayNum: '26', id: 'Sat 26' },
    { label: 'Sun', dayNum: '27', id: 'Sun 27' },
    { label: 'Mon', dayNum: '28', id: 'Mon 28' },
  ];

  const focusOptions = [
    { id: 'Strength / PR', label: 'Strength / PR', icon: 'fitness_center' },
    { id: 'Deload & Mobility', label: 'Deload & Mobility', icon: 'self_improvement' },
    { id: 'Movement Screen', label: 'Movement Screen', icon: 'checklist' },
    { id: 'Technique Clinic', label: 'Technique Clinic', icon: 'videocam' },
  ];

  const timeSlots = [
    { time: '08:30 AM', status: 'available' },
    { time: '10:00 AM', status: 'available' },
    { time: '02:00 PM', status: 'selected', note: 'Optimal Recovery Window' },
    { time: '04:30 PM', status: 'waitlist' },
  ];

  const packages = [
    {
      id: 'pkg-10',
      title: '10-Session Performance Accelerator',
      price: '$750',
      perSession: '$75/session',
      badge: 'Best Value • Save $200'
    },
    {
      id: 'pkg-5',
      title: '5-Session Hypertrophy Booster',
      price: '$400',
      perSession: '$80/session',
      badge: 'Popular'
    },
    {
      id: 'pkg-1',
      title: '1-on-1 Single Drop-in Session',
      price: '$95',
      perSession: 'Single Credit',
    }
  ];

  const handleBooking = () => {
    onConfirmBooking({
      coach: selectedCoach,
      date: 'Thu, Oct 24, 2024',
      time: selectedTime,
      focus: selectedFocus
    });
    onShowToast(`Session booked with ${selectedCoach.name}!`, 'check_circle');
    onNavigate('pass');
  };

  return (
    <div className="flex flex-col w-full pb-36 max-w-lg mx-auto">
      {/* Header Bar */}
      <div className="px-4 pt-2.5 pb-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('member-detail')}
          className="flex items-center gap-1 text-[13px] text-[#94a3b8] hover:text-[#c3f400] transition-colors font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Member Profile</span>
        </button>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#c3f400] bg-[#262a33] px-2.5 py-1 rounded-full">
          PT Concierge
        </span>
      </div>

      <div className="px-4 mb-2">
        <h1 className="font-headline text-[22px] font-bold text-[#dfe2ee]">
          Book PT Session
        </h1>
        <p className="text-[12px] text-[#94a3b8]">
          One-on-one high performance coaching at Apex Rig & Turf.
        </p>
      </div>

      {/* Member Session Credit Pip Card */}
      <div className="px-4 mb-3.5">
        <div className="bg-[#1c2028] rounded-xl p-3.5 border border-white/[0.04] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#c3f400]"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[14px] font-bold text-[#dfe2ee] block">
                  {member.name}
                </span>
                <span className="text-[11px] text-[#c3f400] font-semibold">
                  {member.tier}
                </span>
              </div>
            </div>
            <button
              onClick={() => onShowToast('Purchased +5 PT Session Pack!', 'credit_card')}
              className="text-[11px] font-bold text-[#c3f400] bg-[#262a33] hover:bg-[#31353e] px-2.5 py-1 rounded-lg transition-colors"
            >
              + Buy Pass
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#94a3b8] mb-1.5">
            <span>Session Balance</span>
            <span className="text-[#dfe2ee] font-bold">
              {member.ptCreditsRemaining} of {member.totalPtCredits} sessions available
            </span>
          </div>

          {/* Credit Pips (6 filled volt, 2 empty gray) */}
          <div className="grid grid-cols-8 gap-1.5 h-2">
            {Array.from({ length: member.totalPtCredits || 8 }).map((_, idx) => (
              <span
                key={idx}
                className={`rounded-full h-full ${
                  idx < member.ptCreditsRemaining
                    ? 'bg-[#c3f400] shadow-[0_0_6px_rgba(195,244,0,0.5)]'
                    : 'bg-[#31353e]'
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Select Coach Carousel */}
      <div className="px-4 mb-3.5">
        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-2">
          Select Elite Coach
        </span>
        <div className="grid grid-cols-3 gap-2">
          {coaches.map((coach) => {
            const isSelected = selectedCoach.id === coach.id;
            return (
              <button
                key={coach.id}
                onClick={() => setSelectedCoach(coach)}
                className={`rounded-xl p-2.5 flex flex-col items-center text-center transition-all active:scale-95 border ${
                  isSelected
                    ? 'bg-[#262a33] border-[#c3f400] shadow-md ring-1 ring-[#c3f400]'
                    : 'bg-[#1c2028] border-white/[0.04] text-[#94a3b8] hover:bg-[#262a33]'
                }`}
              >
                <div className="relative mb-1.5">
                  <img
                    src={coach.avatar}
                    alt={coach.name}
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isSelected && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                    </span>
                  )}
                </div>
                <span className="text-[12px] font-bold text-[#dfe2ee] leading-tight truncate w-full">
                  {coach.name.replace('Coach ', '')}
                </span>
                <span className="text-[10px] text-[#c4c9ac] truncate w-full mt-0.5">
                  {coach.specialty}
                </span>
                <div className="flex items-center gap-0.5 text-[10px] font-bold text-[#c3f400] mt-1">
                  <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>{coach.rating}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Date Selector */}
      <div className="px-4 mb-3.5">
        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-2">
          Target Date
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {dates.map((d) => {
            const isSelected = selectedDate === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDate(d.id)}
                className={`flex flex-col items-center justify-center shrink-0 w-14 h-16 rounded-xl transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#c3f400] text-[#161e00] font-bold shadow-[0_2px_12px_rgba(195,244,0,0.3)]'
                    : 'bg-[#1c2028] text-[#dfe2ee] hover:bg-[#262a33]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold">{d.label}</span>
                <span className="font-headline text-[18px] font-extrabold">{d.dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Session Focus Selector */}
      <div className="px-4 mb-3.5">
        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-2">
          Session Focus & Objectives
        </span>
        <div className="grid grid-cols-2 gap-2">
          {focusOptions.map((f) => {
            const isSelected = selectedFocus === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFocus(f.id)}
                className={`p-3 rounded-xl flex items-center gap-2.5 transition-all active:scale-95 border ${
                  isSelected
                    ? 'bg-[#262a33] border-[#c3f400] text-[#c3f400]'
                    : 'bg-[#1c2028] border-white/[0.04] text-[#94a3b8] hover:text-[#dfe2ee]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
                <span className="text-[12px] font-bold text-left">{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="px-4 mb-4">
        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-2">
          Available Time Slots
        </span>
        <div className="space-y-2">
          {timeSlots.map((slot) => {
            const isSelected = selectedTime === slot.time;
            return (
              <button
                key={slot.time}
                onClick={() => setSelectedTime(slot.time)}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-all active:scale-98 border ${
                  isSelected
                    ? 'bg-[#c3f400] text-[#161e00] font-bold shadow-md border-[#c3f400]'
                    : 'bg-[#1c2028] border-white/[0.04] text-[#dfe2ee] hover:bg-[#262a33]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">
                    {isSelected ? 'schedule' : 'query_builder'}
                  </span>
                  <span className="text-[14px] font-bold">{slot.time}</span>
                  {slot.note && !isSelected && (
                    <span className="text-[10px] text-[#7bd0ff] bg-[#262a33] px-2 py-0.5 rounded-full">
                      {slot.note}
                    </span>
                  )}
                  {slot.note && isSelected && (
                    <span className="text-[10px] text-[#161e00] bg-[#161e00]/15 px-2 py-0.5 rounded-full font-bold">
                      {slot.note}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {slot.status === 'waitlist' ? (
                    <span className="text-[10px] font-bold uppercase text-[#ffb4ab] bg-[#93000a]/30 px-2 py-0.5 rounded-full">
                      Waitlist
                    </span>
                  ) : isSelected ? (
                    <span className="material-symbols-outlined text-[20px] font-bold">check_circle</span>
                  ) : (
                    <span className="text-[11px] text-[#94a3b8]">Select</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Package Top-Up Expansion */}
      <div className="px-4 mb-4">
        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-2">
          Need More Credits? Top Up & Save
        </span>
        <div className="space-y-2">
          {packages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(isSelected ? null : pkg.id)}
                className={`p-3 rounded-xl bg-[#1c2028] border cursor-pointer transition-all ${
                  isSelected ? 'border-[#c3f400] bg-[#262a33]' : 'border-white/[0.04] hover:bg-[#262a33]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[#dfe2ee]">{pkg.title}</span>
                      {pkg.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-[#c3f400]/20 text-[#c3f400] text-[9px] font-bold">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#94a3b8]">{pkg.perSession}</span>
                  </div>
                  <span className="font-headline font-extrabold text-[16px] text-[#c3f400]">
                    {pkg.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Summary Box */}
      <div className="px-4 mb-3">
        <div className="bg-[#262a33] rounded-xl p-3.5 border border-white/[0.06] text-[12px] space-y-1.5">
          <div className="flex justify-between text-[#94a3b8]">
            <span>Coach:</span>
            <span className="text-[#dfe2ee] font-semibold">{selectedCoach.name} ({selectedCoach.title})</span>
          </div>
          <div className="flex justify-between text-[#94a3b8]">
            <span>Scheduled:</span>
            <span className="text-[#c3f400] font-semibold">{selectedDate}, 2024 • {selectedTime} (60 Mins)</span>
          </div>
          <div className="flex justify-between text-[#94a3b8]">
            <span>Zone:</span>
            <span className="text-[#dfe2ee] font-semibold">Turf Zone & Barbell Rig A</span>
          </div>
          <div className="flex justify-between text-[#94a3b8] pt-1 border-t border-white/[0.04]">
            <span>Credit Deduction:</span>
            <span className="text-[#c3f400] font-bold">1 Credit (5 Remaining)</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Action */}
      <aside className="fixed bottom-16 inset-x-0 z-40 bg-[#0a0e16]/95 backdrop-blur-xl border-t border-white/[0.08] p-3 max-w-lg mx-auto">
        <button
          onClick={handleBooking}
          className="w-full py-3.5 rounded-xl bg-[#c3f400] hover:brightness-105 active:scale-98 text-[#161e00] font-headline font-bold text-[14px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(195,244,0,0.35)] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span>Confirm Booking (Deduct 1 Credit)</span>
        </button>
      </aside>
    </div>
  );
};

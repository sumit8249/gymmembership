import React, { useState } from 'react';
import { ClassSession, Member } from '../types';

interface ClassRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  session?: ClassSession;
  members: Member[];
  onShowToast: (message: string, icon?: string) => void;
}

export const ClassRosterModal: React.FC<ClassRosterModalProps> = ({
  isOpen,
  onClose,
  session,
  members,
  onShowToast
}) => {
  if (!isOpen || !session) return null;

  const [roster, setRoster] = useState(() => {
    return members.slice(0, session.booked).map((m, idx) => ({
      ...m,
      checkedIn: idx < (session.checkedInLive || session.attended || 17)
    }));
  });

  const toggleCheckIn = (id: string) => {
    setRoster((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.checkedIn;
          onShowToast(
            `${item.name} ${nextState ? 'marked Present' : 'marked Absent'}`,
            nextState ? 'how_to_reg' : 'person_off'
          );
          return { ...item, checkedIn: nextState };
        }
        return item;
      })
    );
  };

  const checkedInCount = roster.filter((r) => r.checkedIn).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#181c24] rounded-3xl max-w-sm w-full p-5 border border-white/10 shadow-2xl relative flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/[0.06] shrink-0">
          <div>
            <span className="text-[10px] font-bold text-[#c3f400] uppercase tracking-wider block">
              {session.studio} • {session.timeRange}
            </span>
            <h3 className="font-headline font-bold text-[18px] text-[#dfe2ee]">
              {session.name}
            </h3>
            <span className="text-[12px] text-[#94a3b8]">
              Coach: {session.coach.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a33] text-[#94a3b8] hover:text-white flex items-center justify-center shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Stats summary */}
        <div className="py-2.5 flex items-center justify-between text-[12px] shrink-0">
          <span className="text-[#94a3b8]">
            Roster: <strong className="text-[#dfe2ee]">{roster.length} Booked</strong>
          </span>
          <span className="text-[#c3f400] font-bold">
            {checkedInCount} / {session.capacity} Checked In
          </span>
        </div>

        {/* Roster List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar my-2">
          {roster.map((athlete) => (
            <div
              key={athlete.id}
              className="bg-[#262a33] p-2.5 rounded-xl flex items-center justify-between border border-white/[0.04]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={athlete.avatar}
                  alt={athlete.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <span className="text-[13px] font-bold text-[#dfe2ee] truncate block">
                    {athlete.name}
                  </span>
                  <span className="text-[10px] text-[#94a3b8] truncate block">
                    RFID #{athlete.rfid} • {athlete.tier}
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleCheckIn(athlete.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all shrink-0 ${
                  athlete.checkedIn
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'bg-[#1c2028] text-[#94a3b8] hover:text-[#dfe2ee]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {athlete.checkedIn ? 'check' : 'add'}
                </span>
                <span>{athlete.checkedIn ? 'Present' : 'Check In'}</span>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-2 py-3 rounded-xl bg-[#c3f400] text-[#161e00] font-headline font-bold text-[13px] uppercase tracking-wider shadow-lg active:scale-95 transition-all shrink-0"
        >
          Confirm Attendance Log
        </button>
      </div>
    </div>
  );
};

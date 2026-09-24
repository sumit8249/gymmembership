import React, { useState } from 'react';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [headline, setHeadline] = useState('Morning Peak Reminder: Turf Reset at 08:30 AM');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(`Broadcast transmitted to Digital Floor Displays & Athlete Apps!`, 'campaign');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#181c24] rounded-3xl max-w-sm w-full p-5 border border-white/10 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb4ab] text-[24px]">campaign</span>
            <h3 className="font-headline font-bold text-[18px] text-[#dfe2ee]">
              Facility Broadcast
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a33] text-[#94a3b8] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSend} className="space-y-3.5">
          <div>
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1">
              Broadcast Headline & Announcement
            </label>
            <textarea
              rows={3}
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-[#262a33] text-[#dfe2ee] text-[13px] p-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#ffb4ab] resize-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1">
              Destination Channels
            </label>
            <div className="space-y-2 text-[12px] text-[#dfe2ee]">
              <label className="flex items-center gap-2 bg-[#262a33] p-2.5 rounded-xl cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#c3f400] w-4 h-4" />
                <span>Gym Floor Digital Signage Screens</span>
              </label>
              <label className="flex items-center gap-2 bg-[#262a33] p-2.5 rounded-xl cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#c3f400] w-4 h-4" />
                <span>Member Mobile Push Notifications (1,420 athletes)</span>
              </label>
              <label className="flex items-center gap-2 bg-[#262a33] p-2.5 rounded-xl cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#c3f400] w-4 h-4" />
                <span>Front Turnstile Kiosk Audio Chime</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setPriority('normal')}
              className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition-all ${
                priority === 'normal'
                  ? 'bg-[#262a33] text-[#c3f400] ring-1 ring-[#c3f400]'
                  : 'bg-[#1c2028] text-[#94a3b8]'
              }`}
            >
              Standard Notice
            </button>
            <button
              type="button"
              onClick={() => setPriority('urgent')}
              className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition-all ${
                priority === 'urgent'
                  ? 'bg-[#93000a]/50 text-[#ffb4ab] ring-1 ring-[#ffb4ab]'
                  : 'bg-[#1c2028] text-[#94a3b8]'
              }`}
            >
              High Priority Flash
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-[#c3f400] text-[#161e00] font-headline font-bold text-[13px] uppercase tracking-wider shadow-lg active:scale-95 transition-all hover:brightness-105"
          >
            Transmit Live Broadcast
          </button>
        </form>
      </div>
    </div>
  );
};

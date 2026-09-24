import React, { useState } from 'react';
import { Member } from '../types';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (newMember: Member) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember,
  onShowToast
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+1 (555) 019-');
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState<'vip' | 'standard' | 'pt'>('vip');
  const [rfidTag, setRfidTag] = useState(() => `OX-${Math.floor(1000 + Math.random() * 9000)}`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: Member = {
      id: `member-${Date.now()}`,
      memberNumber: `${Math.floor(10000 + Math.random() * 90000)}`,
      rfid: rfidTag,
      name: name.trim(),
      tier: tier === 'vip' ? 'Black Onyx VIP Tier' : tier === 'pt' ? 'Personal Training + Unlimited' : 'Standard All-Access',
      tierType: tier,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      phone: phone.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@athlete.io`,
      joinedDate: 'Oct 2024',
      monthsActive: 1,
      lastAccess: 'Just joined',
      visitsThisMonth: 1,
      totalVisits: 1,
      streakDays: 1,
      ptCreditsRemaining: tier === 'vip' ? 2 : tier === 'pt' ? 6 : 0,
      totalPtCredits: tier === 'vip' ? 2 : tier === 'pt' ? 8 : 0,
      assignedCoach: 'Jax Carter',
      monthlyFee: tier === 'vip' ? 189 : tier === 'pt' ? 249 : 119,
      nextRenewal: 'Nov 24',
      autoRenew: true,
      zoneAffinity: {
        strength: 50,
        hiit: 30,
        recovery: 20
      },
      currentLocation: 'Welcome Desk'
    };

    onAddMember(newMember);
    onShowToast(`New member ${newMember.name} registered and RFID #${newMember.rfid} paired!`, 'person_add');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#181c24] rounded-3xl max-w-sm w-full p-5 border border-white/10 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c3f400] text-[24px]">person_add</span>
            <h3 className="font-headline font-bold text-[18px] text-[#dfe2ee]">
              Register New Member
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a33] text-[#94a3b8] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Hayes"
              className="w-full bg-[#262a33] text-[#dfe2ee] text-[13px] px-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#c3f400]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#262a33] text-[#dfe2ee] text-[13px] px-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#c3f400]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1">
              Membership Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'vip', label: 'Black Onyx', price: '$189' },
                { id: 'standard', label: 'All-Access', price: '$119' },
                { id: 'pt', label: 'PT Plus', price: '$249' },
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTier(t.id as any)}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    tier === t.id
                      ? 'bg-[#c3f400] text-[#161e00] font-bold border-[#c3f400]'
                      : 'bg-[#262a33] text-[#dfe2ee] border-white/5 hover:bg-[#31353e]'
                  }`}
                >
                  <span className="text-[11px] block leading-tight">{t.label}</span>
                  <span className="text-[12px] font-extrabold">{t.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Assigned RFID Tag / Keyfob
              </label>
              <button
                type="button"
                onClick={() => setRfidTag(`OX-${Math.floor(1000 + Math.random() * 9000)}`)}
                className="text-[10px] text-[#c3f400] hover:underline"
              >
                Re-generate
              </button>
            </div>
            <div className="flex items-center gap-2 bg-[#262a33] px-3.5 py-2 rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-[#c3f400] text-[18px]">contactless</span>
              <span className="font-mono text-[13px] font-bold text-[#dfe2ee]">{rfidTag}</span>
              <span className="text-[10px] text-[#94a3b8] ml-auto">Ready to Tap</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-[#c3f400] text-[#161e00] font-headline font-bold text-[13px] uppercase tracking-wider shadow-lg active:scale-95 transition-all hover:brightness-105"
          >
            Create & Issue Pass
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Member, Transaction } from '../types';

interface LogPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onAddTransaction: (tx: Transaction) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const LogPayModal: React.FC<LogPayModalProps> = ({
  isOpen,
  onClose,
  members,
  onAddTransaction,
  onShowToast
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || '');
  const [amount, setAmount] = useState('189.00');
  const [category, setCategory] = useState<'membership' | 'pt' | 'retail'>('membership');
  const [method, setMethod] = useState<'card' | 'nfc' | 'cash'>('card');
  const [note, setNote] = useState('Auto-Renew Black Onyx Pass');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const member = members.find((m) => m.id === selectedMemberId) || members[0];
    const parsedAmount = parseFloat(amount) || 0;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      memberName: member.name,
      avatar: member.avatar,
      description: category === 'retail' ? `POS Store • ${note || 'Retail'}` : note || 'Membership Payment',
      timestamp: 'Just now',
      amount: parsedAmount,
      status: category === 'retail' ? 'pos' : 'paid'
    };

    onAddTransaction(newTx);
    onShowToast(`Processed $${parsedAmount.toFixed(2)} payment for ${member.name}!`, 'payments');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#181c24] rounded-3xl max-w-sm w-full p-5 border border-white/10 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7bd0ff] text-[24px]">receipt_long</span>
            <h3 className="font-headline font-bold text-[18px] text-[#dfe2ee]">
              Log Payment / POS
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
              Select Member
            </label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full bg-[#262a33] text-[#dfe2ee] text-[13px] px-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#7bd0ff]"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#181c24]">
                  {m.name} ({m.tier})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1">
              Payment Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'membership', label: 'Membership' },
                { id: 'pt', label: 'PT Pack' },
                { id: 'retail', label: 'Retail/Bar' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => {
                    setCategory(c.id as any);
                    if (c.id === 'membership') {
                      setAmount('189.00');
                      setNote('Auto-Renew Membership');
                    } else if (c.id === 'pt') {
                      setAmount('450.00');
                      setNote('10-Pack PT Package');
                    } else {
                      setAmount('14.50');
                      setNote('Protein Bar & Pre-Workout');
                    }
                  }}
                  className={`py-2 px-1 text-center rounded-xl text-[11px] font-bold transition-all ${
                    category === c.id
                      ? 'bg-[#7bd0ff] text-[#001e2c]'
                      : 'bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1">
              Amount ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-[#94a3b8] text-[14px] font-bold">$</span>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#262a33] text-[#dfe2ee] pl-8 pr-3.5 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#7bd0ff] font-headline text-[16px] font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1">
              Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card', label: 'Card on File' },
                { id: 'nfc', label: 'NFC Tap' },
                { id: 'cash', label: 'Cash' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMethod(m.id as any)}
                  className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    method === m.id
                      ? 'bg-[#c3f400] text-[#161e00]'
                      : 'bg-[#262a33] text-[#94a3b8]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-[#c3f400] text-[#161e00] font-headline font-bold text-[13px] uppercase tracking-wider shadow-lg active:scale-95 transition-all hover:brightness-105"
          >
            Process Charge (${parseFloat(amount || '0').toFixed(2)})
          </button>
        </form>
      </div>
    </div>
  );
};

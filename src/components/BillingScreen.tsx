import React, { useState } from 'react';
import { ScreenType, Transaction, MembershipPlan } from '../types';

interface BillingScreenProps {
  transactions: Transaction[];
  plans: MembershipPlan[];
  onNavigate: (screen: ScreenType) => void;
  onOpenLogPay: () => void;
  onShowToast: (message: string, icon?: string) => void;
  onRetryPayment: (txId: string) => void;
}

export const BillingScreen: React.FC<BillingScreenProps> = ({
  transactions,
  plans,
  onOpenLogPay,
  onShowToast,
  onRetryPayment
}) => {
  const [isDispatchingSms, setIsDispatchingSms] = useState(false);
  const [smsDispatched, setSmsDispatched] = useState(false);

  const handleBatchSms = () => {
    if (isDispatchingSms || smsDispatched) return;
    setIsDispatchingSms(true);
    setTimeout(() => {
      setIsDispatchingSms(false);
      setSmsDispatched(true);
      onShowToast('18 Smart SMS Payment Recovery Links Queued!', 'send');
    }, 1000);
  };

  const handleExportData = () => {
    onShowToast('Financial Audit CSV Exported (October 2024)', 'file_download');
  };

  return (
    <div className="flex flex-col w-full pb-32 max-w-lg mx-auto">
      {/* Dynamic Pulse Header Banner */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex w-2 h-2 rounded-full bg-[#c3f400] animate-ping"></span>
            <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
              Financial Engine Online
            </span>
          </div>
          <span className="text-[10px] font-semibold text-[#c3f400] bg-[#262a33] px-2.5 py-0.5 rounded-full">
            Cycle: Oct 01–31
          </span>
        </div>
      </div>

      {/* Metric / Revenue Overview Card */}
      <div className="px-4 mb-3.5">
        <div className="relative overflow-hidden rounded-xl bg-[#262a33] p-4 shadow-xl border border-white/[0.04]">
          <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[#c3f400]/10 blur-3xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
              Total Monthly Revenue
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c3f400]/15">
              <span className="material-symbols-outlined text-[13px] text-[#c3f400] font-bold">
                trending_up
              </span>
              <span className="text-[11px] text-[#c3f400] font-bold">+12.4% vs last mo</span>
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-3">
            <span className="font-headline text-[32px] font-extrabold text-[#dfe2ee] tracking-tight">
              $48,650
            </span>
            <span className="text-[14px] text-[#94a3b8]">.00</span>
          </div>

          {/* Segmented Bar Visualization */}
          <div className="w-full space-y-2">
            <div className="w-full h-2.5 rounded-full bg-[#0a0e16] overflow-hidden flex">
              <div
                className="h-full bg-[#c3f400] transition-all duration-700"
                style={{ width: '84.7%' }}
                title="Recurring: 84.7%"
              ></div>
              <div
                className="h-full bg-[#00a6e0] transition-all duration-700"
                style={{ width: '11.9%' }}
                title="Personal Training: 11.9%"
              ></div>
              <div
                className="h-full bg-[#353942] transition-all duration-700"
                style={{ width: '3.4%' }}
                title="Retail: 3.4%"
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-1 pt-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#c3f400] shrink-0"></span>
                  <span className="text-[10px] text-[#94a3b8] truncate">Recurring</span>
                </div>
                <span className="text-[13px] text-[#dfe2ee] font-bold pl-3">$41.2k</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00a6e0] shrink-0"></span>
                  <span className="text-[10px] text-[#94a3b8] truncate">Personal Trg</span>
                </div>
                <span className="text-[13px] text-[#dfe2ee] font-bold pl-3">$5.8k</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#353942] shrink-0"></span>
                  <span className="text-[10px] text-[#94a3b8] truncate">Retail / Supps</span>
                </div>
                <span className="text-[13px] text-[#dfe2ee] font-bold pl-3">$1.65k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onOpenLogPay}
            className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#1c2028] active:scale-[0.98] transition-transform shadow-md hover:bg-[#262a33] border border-white/[0.04]"
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-[#262a33] group-hover:bg-[#31353e] flex items-center justify-center mb-1.5 transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#c3f400]">
                credit_card
              </span>
            </div>
            <span className="text-[11px] text-[#dfe2ee] font-semibold text-center">
              Charge Card
            </span>
          </button>

          <button
            onClick={() => onShowToast('New Tier Configurator Opened', 'tune')}
            className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#1c2028] active:scale-[0.98] transition-transform shadow-md hover:bg-[#262a33] border border-white/[0.04]"
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-[#262a33] group-hover:bg-[#31353e] flex items-center justify-center mb-1.5 transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#7bd0ff]">
                add_circle
              </span>
            </div>
            <span className="text-[11px] text-[#dfe2ee] font-semibold text-center">
              Add Plan Tier
            </span>
          </button>

          <button
            onClick={handleExportData}
            className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#1c2028] active:scale-[0.98] transition-transform shadow-md hover:bg-[#262a33] border border-white/[0.04]"
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-[#262a33] group-hover:bg-[#31353e] flex items-center justify-center mb-1.5 transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#94a3b8] group-hover:text-[#dfe2ee]">
                ios_share
              </span>
            </div>
            <span className="text-[11px] text-[#dfe2ee] font-semibold text-center">
              Export Data
            </span>
          </button>
        </div>
      </div>

      {/* Attention Banner: Overdue Dues Recovery */}
      <div className="px-4 mb-4">
        <div className="relative overflow-hidden rounded-xl bg-[#262a33] p-4 shadow-lg border border-white/[0.04]">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ffb4ab]"></div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#93000a]/40 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px] text-[#ffb4ab]">
                priority_high
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#ffb4ab] uppercase tracking-wider">
                  Overdue Dues Alert
                </span>
                <span className="text-[10px] text-[#94a3b8] bg-[#0a0e16] px-2 py-0.5 rounded-full font-semibold">
                  18 Accounts
                </span>
              </div>
              <p className="font-headline text-[18px] font-bold text-[#dfe2ee] mt-0.5">
                $1,422.00
              </p>
              <p className="text-[12px] text-[#94a3b8] mt-0.5">
                Dues pending retry. Automated recovery grace period active.
              </p>

              <button
                onClick={handleBatchSms}
                disabled={isDispatchingSms || smsDispatched}
                className={`mt-3 w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all text-[12px] font-bold shadow-md ${
                  smsDispatched
                    ? 'bg-[#31353e] text-[#94a3b8]'
                    : 'bg-[#c3f400] text-[#161e00] hover:brightness-105'
                }`}
                type="button"
              >
                {isDispatchingSms ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    <span>Dispatching Links...</span>
                  </>
                ) : smsDispatched ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                    <span>SMS Reminders Dispatched</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">sms</span>
                    <span>Send Batch SMS Payment Links</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Membership Plans Section */}
      <div className="flex flex-col mb-4">
        <div className="px-4 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-[16px] text-[#dfe2ee]">
              Membership Tiers
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#262a33] text-[10px] font-semibold text-[#94a3b8]">
              3 Active
            </span>
          </div>
          <button
            onClick={() => onShowToast('Configure Tier Pricing & Perks')}
            className="text-[11px] font-bold text-[#c3f400] hover:underline uppercase tracking-wider"
            type="button"
          >
            Configure
          </button>
        </div>

        {/* Horizontal Swipe Carousel */}
        <div className="flex gap-3 overflow-x-auto px-4 no-scrollbar py-1">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="shrink-0 w-[260px] rounded-xl bg-[#1c2028] p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden border border-white/[0.04]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#c3f400]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${plan.tagColor}`}
                  >
                    {plan.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[#94a3b8]">
                    <span className="material-symbols-outlined text-[14px]">group</span>
                    <span className="text-[11px] font-bold text-[#dfe2ee]">
                      {plan.memberCount}
                    </span>
                  </div>
                </div>

                <h3 className="font-headline font-bold text-[16px] text-[#dfe2ee]">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 my-1.5">
                  <span className="font-headline text-[22px] font-extrabold text-[#c3f400]">
                    ${plan.price}
                  </span>
                  <span className="text-[11px] text-[#94a3b8]">/ month</span>
                </div>
                <p className="text-[12px] text-[#94a3b8] line-clamp-2">
                  {plan.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 bg-[#0a0e16]/60 -mx-3.5 -mb-3.5 px-3.5 py-2 flex items-center justify-between border-t border-white/[0.02]">
                <span className="text-[10px] text-[#94a3b8] font-medium">Monthly Yield</span>
                <span className="text-[13px] text-[#dfe2ee] font-bold">
                  ${plan.monthlyYield.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions Live Audit Log */}
      <div className="px-4 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-[16px] text-[#dfe2ee]">
              Live Ledger
            </span>
            <span className="w-2 h-2 rounded-full bg-[#c3f400]"></span>
          </div>
          <button
            onClick={() => onShowToast('Full Financial Audit Log Exported')}
            className="text-[11px] font-bold text-[#c3f400] hover:underline uppercase tracking-wider"
            type="button"
          >
            Full Audit
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3 rounded-xl bg-[#1c2028] flex items-center justify-between shadow-sm hover:bg-[#262a33] transition-colors border border-white/[0.04]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                    src={tx.avatar}
                    alt={tx.memberName}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0a0e16] flex items-center justify-center">
                    {tx.status === 'failed' ? (
                      <span className="material-symbols-outlined text-[13px] text-[#ffb4ab] font-bold">
                        error
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-[13px] text-[#c3f400] font-bold">
                        check_circle
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] text-[#dfe2ee] font-semibold truncate">
                    {tx.memberName}
                  </span>
                  <span
                    className={`text-[11px] truncate ${
                      tx.status === 'failed' ? 'text-[#ffb4ab] font-medium' : 'text-[#94a3b8]'
                    }`}
                  >
                    {tx.description}
                  </span>
                  <span className="text-[10px] text-[#94a3b8]/80">
                    {tx.timestamp}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 ml-3">
                <span
                  className={`font-headline text-[15px] font-bold ${
                    tx.status === 'failed' ? 'text-[#ffb4ab]' : 'text-[#dfe2ee]'
                  }`}
                >
                  {tx.status === 'failed' ? '' : '+'}${tx.amount.toFixed(2)}
                </span>

                {tx.status === 'paid' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#c3f400]/15 text-[#c3f400] text-[9px] font-bold uppercase mt-0.5">
                    Paid
                  </span>
                )}
                {tx.status === 'pos' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#c3f400]/15 text-[#c3f400] text-[9px] font-bold uppercase mt-0.5">
                    POS Store
                  </span>
                )}
                {tx.status === 'failed' && (
                  <button
                    onClick={() => onRetryPayment(tx.id)}
                    className="px-2 py-0.5 rounded-full bg-[#93000a]/40 text-[#ffb4ab] text-[9px] font-bold uppercase mt-0.5 active:scale-95 transition-transform flex items-center gap-0.5 hover:bg-[#93000a]/60"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[11px]">refresh</span>
                    <span>Retry</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

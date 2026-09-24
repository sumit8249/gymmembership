/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, Member, Coach, ClassSession, Transaction } from './types';
import {
  INITIAL_MEMBERS,
  INITIAL_CLASSES,
  INITIAL_TRANSACTIONS,
  MEMBERSHIP_PLANS,
  COACH_JAX
} from './data/gymData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardScreen } from './components/DashboardScreen';
import { MembersScreen } from './components/MembersScreen';
import { ScheduleScreen } from './components/ScheduleScreen';
import { BillingScreen } from './components/BillingScreen';
import { MemberDetailScreen } from './components/MemberDetailScreen';
import { BookPTScreen } from './components/BookPTScreen';
import { PassScreen } from './components/PassScreen';
import { CoachChatScreen } from './components/CoachChatScreen';
import { QuickScanModal } from './components/QuickScanModal';
import { AddMemberModal } from './components/AddMemberModal';
import { LogPayModal } from './components/LogPayModal';
import { BroadcastModal } from './components/BroadcastModal';
import { ClassRosterModal } from './components/ClassRosterModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [occupancy, setOccupancy] = useState(85);
  const maxOccupancy = 120;

  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('sarah-jenkins');
  const [classes, setClasses] = useState<ClassSession[]>(INITIAL_CLASSES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [membersFilter, setMembersFilter] = useState<string>('all');

  // Booking details for Pass screen
  const [latestBooking, setLatestBooking] = useState<{
    coach: Coach;
    date: string;
    time: string;
    focus: string;
  }>({
    coach: COACH_JAX,
    date: 'Thu, Oct 24, 2024',
    time: '02:00 PM',
    focus: 'Power Hypertrophy & PR'
  });

  // Modals state
  const [isQuickScanOpen, setIsQuickScanOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isLogPayOpen, setIsLogPayOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [selectedRosterSession, setSelectedRosterSession] = useState<ClassSession | null>(null);
  const [videoModalThumb, setVideoModalThumb] = useState<string | null>(null);

  // Toast feedback state
  const [toast, setToast] = useState<{ message: string; icon?: string } | null>(null);

  const showToast = (message: string, icon: string = 'info') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 2800);
  };

  const selectedMember = members.find((m) => m.id === selectedMemberId) || members[0];

  // Actions
  const handleToggleCheckIn = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const isCurrentlyInside = Boolean(m.currentLocation);
          const nextLocation = isCurrentlyInside ? undefined : 'Strength Zone • Just now';
          setOccupancy((curr) => (isCurrentlyInside ? Math.max(0, curr - 1) : Math.min(maxOccupancy, curr + 1)));
          return {
            ...m,
            currentLocation: nextLocation,
            visitsThisMonth: isCurrentlyInside ? m.visitsThisMonth : m.visitsThisMonth + 1,
            totalVisits: isCurrentlyInside ? m.totalVisits : m.totalVisits + 1,
            streakDays: isCurrentlyInside ? m.streakDays : m.streakDays + 1
          };
        }
        return m;
      })
    );
  };

  const handleScanSuccess = (scannedMember: Member) => {
    handleToggleCheckIn(scannedMember.id);
  };

  const handleAddMember = (newMember: Member) => {
    setMembers((prev) => [newMember, ...prev]);
    setSelectedMemberId(newMember.id);
    setOccupancy((curr) => Math.min(maxOccupancy, curr + 1));
  };

  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleRenewMember = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, status: 'active', nextRenewal: 'Oct 30, 2025', autoRenew: true }
          : m
      )
    );
    showToast('Pass renewed! Auto-pay activated.', 'check_circle');
  };

  const handleUnfreezeMember = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, status: 'active', freezeReason: undefined, unfreezeDate: undefined }
          : m
      )
    );
    showToast('Membership unfrozen. Turnstile permissions reinstated.', 'lock_open');
  };

  const handleSendReminder = (member: Member) => {
    showToast(`SMS reminder dispatched to ${member.name} (${member.phone})`, 'send');
  };

  const handleConfirmBooking = (details: {
    coach: Coach;
    date: string;
    time: string;
    focus: string;
  }) => {
    setLatestBooking(details);
    // Deduct 1 credit from selected member
    setMembers((prev) =>
      prev.map((m) =>
        m.id === selectedMember.id
          ? { ...m, ptCreditsRemaining: Math.max(0, m.ptCreditsRemaining - 1) }
          : m
      )
    );
  };

  const handleRetryPayment = (txId: string) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === txId
          ? { ...tx, status: 'paid', description: 'Recovered via Retry: Paid' }
          : tx
      )
    );
    showToast('Payment card re-attempt succeeded! $119.00 recovered.', 'check_circle');
  };

  return (
    <div className="min-h-screen bg-[#0a0e16] text-[#dfe2ee] font-sans antialiased flex flex-col items-center selection:bg-[#c3f400] selection:text-[#161e00]">
      {/* Mobile Shell Container */}
      <div className="w-full max-w-lg min-h-screen bg-[#0f131c] flex flex-col relative shadow-2xl">
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          occupancy={occupancy}
          maxOccupancy={maxOccupancy}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenQuickScan={() => setIsQuickScanOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 pt-16 flex flex-col">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              occupancy={occupancy}
              maxOccupancy={maxOccupancy}
              members={members}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onSelectMember={(id) => setSelectedMemberId(id)}
              onOpenQuickScan={() => setIsQuickScanOpen(true)}
              onOpenAddMember={() => setIsAddMemberOpen(true)}
              onOpenLogPay={() => setIsLogPayOpen(true)}
              onOpenBroadcast={() => setIsBroadcastOpen(true)}
              onOpenRoster={() => setSelectedRosterSession(classes[0])}
              onFilterMembers={(filter) => {
                setMembersFilter(filter);
                setCurrentScreen('members');
              }}
            />
          )}

          {currentScreen === 'members' && (
            <MembersScreen
              members={members}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onSelectMember={(id) => setSelectedMemberId(id)}
              onOpenAddMember={() => setIsAddMemberOpen(true)}
              onRenewMember={handleRenewMember}
              onUnfreezeMember={handleUnfreezeMember}
              onSendReminder={handleSendReminder}
              initialFilter={membersFilter}
            />
          )}

          {currentScreen === 'schedule' && (
            <ScheduleScreen
              classes={classes}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenQuickScan={() => setIsQuickScanOpen(true)}
              onOpenRoster={(cls) => setSelectedRosterSession(cls || classes[1])}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'billing' && (
            <BillingScreen
              transactions={transactions}
              plans={MEMBERSHIP_PLANS}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenLogPay={() => setIsLogPayOpen(true)}
              onShowToast={showToast}
              onRetryPayment={handleRetryPayment}
            />
          )}

          {currentScreen === 'member-detail' && (
            <MemberDetailScreen
              member={selectedMember}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onToggleCheckIn={handleToggleCheckIn}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'book-pt' && (
            <BookPTScreen
              member={selectedMember}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onConfirmBooking={handleConfirmBooking}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'pass' && (
            <PassScreen
              member={selectedMember}
              bookingDetails={latestBooking}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'coach-chat' && (
            <CoachChatScreen
              member={selectedMember}
              coach={COACH_JAX}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onShowToast={showToast}
              onOpenVideo={(thumb) => setVideoModalThumb(thumb)}
            />
          )}
        </main>

        {/* Global Bottom Navigation */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />

        {/* Interactive Modals */}
        <QuickScanModal
          isOpen={isQuickScanOpen}
          onClose={() => setIsQuickScanOpen(false)}
          members={members}
          onScanSuccess={handleScanSuccess}
          onShowToast={showToast}
        />

        <AddMemberModal
          isOpen={isAddMemberOpen}
          onClose={() => setIsAddMemberOpen(false)}
          onAddMember={handleAddMember}
          onShowToast={showToast}
        />

        <LogPayModal
          isOpen={isLogPayOpen}
          onClose={() => setIsLogPayOpen(false)}
          members={members}
          onAddTransaction={handleAddTransaction}
          onShowToast={showToast}
        />

        <BroadcastModal
          isOpen={isBroadcastOpen}
          onClose={() => setIsBroadcastOpen(false)}
          onShowToast={showToast}
        />

        <ClassRosterModal
          isOpen={Boolean(selectedRosterSession)}
          onClose={() => setSelectedRosterSession(null)}
          session={selectedRosterSession || undefined}
          members={members}
          onShowToast={showToast}
        />

        <VideoPlayerModal
          isOpen={Boolean(videoModalThumb)}
          onClose={() => setVideoModalThumb(null)}
          videoThumb={videoModalThumb || ''}
        />

        {/* Floating Toast Notification */}
        {toast && (
          <aside
            aria-live="polite"
            className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1c2028] text-[#dfe2ee] border border-[#c3f400]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-fade-in"
          >
            <span className="material-symbols-outlined text-[#c3f400] text-[20px] shrink-0">
              {toast.icon || 'check_circle'}
            </span>
            <span className="text-[12px] font-semibold flex-1 leading-snug">
              {toast.message}
            </span>
          </aside>
        )}
      </div>
    </div>
  );
}

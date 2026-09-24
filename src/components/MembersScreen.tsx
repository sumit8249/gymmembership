import React, { useState, useMemo } from 'react';
import { ScreenType, Member } from '../types';

interface MembersScreenProps {
  members: Member[];
  onNavigate: (screen: ScreenType) => void;
  onSelectMember: (memberId: string) => void;
  onOpenAddMember: () => void;
  onRenewMember: (memberId: string) => void;
  onUnfreezeMember: (memberId: string) => void;
  onSendReminder: (member: Member) => void;
  initialFilter?: string;
}

export const MembersScreen: React.FC<MembersScreenProps> = ({
  members,
  onNavigate,
  onSelectMember,
  onOpenAddMember,
  onRenewMember,
  onUnfreezeMember,
  onSendReminder,
  initialFilter = 'all'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
  const [sortOrder, setSortOrder] = useState<'recent' | 'name' | 'tier'>('recent');

  const filters = [
    { id: 'all', label: 'All', count: members.length },
    { id: 'active', label: 'Active', count: members.filter(m => m.status === 'active').length, dotColor: 'bg-[#c3f400]' },
    { id: 'expiring', label: 'Expiring Soon', count: members.filter(m => m.status === 'expiring').length, dotColor: 'bg-[#facc15]' },
    { id: 'past_due', label: 'Past Due', count: members.filter(m => m.status === 'past_due').length, dotColor: 'bg-[#ffb4ab]' },
    { id: 'frozen', label: 'Freeze', count: members.filter(m => m.status === 'frozen').length, dotColor: 'bg-[#7bd0ff]' }
  ];

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Status filter
      if (selectedFilter !== 'all' && member.status !== selectedFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          member.name.toLowerCase().includes(q) ||
          member.memberNumber.toLowerCase().includes(q) ||
          member.rfid.toLowerCase().includes(q) ||
          member.phone.toLowerCase().includes(q) ||
          member.tier.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [members, selectedFilter, searchQuery]);

  return (
    <div className="flex flex-col w-full pb-32 max-w-lg mx-auto relative">
      {/* Search & Filter Controls */}
      <div className="px-4 pt-3 pb-2 flex flex-col gap-2.5">
        <div className="flex items-center gap-2 bg-[#262a33] rounded-xl px-3.5 py-2.5 focus-within:bg-[#31353e] transition-colors border border-white/[0.04]">
          <span className="material-symbols-outlined text-[#94a3b8] text-[20px] shrink-0">
            search
          </span>
          <input
            className="bg-transparent text-[#dfe2ee] placeholder:text-[#94a3b8] text-[14px] focus:outline-none w-full min-w-0"
            placeholder="Search member, phone, RFID tag or ID..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#94a3b8] hover:text-[#dfe2ee] p-0.5"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            aria-label="Open Filter Options"
            onClick={() => setSortOrder(prev => prev === 'recent' ? 'name' : 'recent')}
            className="p-1 rounded-lg hover:bg-[#353942] active:scale-95 transition-all text-[#94a3b8] hover:text-[#c3f400] shrink-0 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Filter Pills Strip (Horizontal Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 active:scale-95 transition-all ${
                  isSelected
                    ? 'bg-[#c3f400] text-[#161e00] font-bold shadow-sm'
                    : 'bg-[#262a33] text-[#94a3b8] hover:text-[#dfe2ee]'
                }`}
              >
                {filter.dotColor && !isSelected && (
                  <span className={`w-1.5 h-1.5 rounded-full ${filter.dotColor}`}></span>
                )}
                <span>{filter.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-[#161e00]/15 font-bold'
                      : 'text-[#94a3b8] bg-[#1c2028]'
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Operational Health Metrics Strip */}
      <div className="px-4 my-2">
        <div className="bg-[#181c24] rounded-xl p-3.5 grid grid-cols-3 gap-2 border border-white/[0.04]">
          <div className="flex flex-col items-start min-w-0">
            <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider truncate">
              Total Roster
            </span>
            <span className="font-headline text-[22px] font-extrabold text-[#dfe2ee] tracking-tight mt-0.5">
              1,420
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[13px] text-[#c3f400]">
                trending_up
              </span>
              <span className="text-[10px] font-bold text-[#c3f400]">+4.2%</span>
            </div>
          </div>

          <div className="flex flex-col items-start min-w-0 px-2 bg-[#1c2028]/60 rounded-lg">
            <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider truncate">
              Active Rate
            </span>
            <span className="font-headline text-[22px] font-extrabold text-[#c3f400] tracking-tight mt-0.5">
              90.1%
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[13px] text-[#c3f400]">
                check_circle
              </span>
              <span className="text-[10px] text-[#94a3b8] truncate">Target met</span>
            </div>
          </div>

          <div className="flex flex-col items-start min-w-0">
            <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider truncate">
              Needs Action
            </span>
            <span className="font-headline text-[22px] font-extrabold text-[#ffb4ab] tracking-tight mt-0.5">
              60
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[13px] text-[#ffb4ab]">
                priority_high
              </span>
              <span className="text-[10px] text-[#ffb4ab] truncate">42 expiring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Members Roster Section */}
      <div className="px-4 flex flex-col gap-3 mt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
            Filtered Results ({filteredMembers.length} Selected)
          </span>
          <div className="flex items-center gap-1 text-[#94a3b8] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[15px]">swap_vert</span>
            <span className="uppercase tracking-wider">
              {sortOrder === 'recent' ? 'Recent Visit' : 'Sort: Name'}
            </span>
          </div>
        </div>

        {/* Member Cards */}
        {filteredMembers.map((member) => {
          const isSarah = member.id === 'sarah-jenkins';
          const isMateo = member.id === 'mateo-silva';
          const isChloe = member.id === 'chloe-bennett';
          const isLiam = member.id === 'liam-gallagher';
          const isAnya = member.id === 'anya-patel';

          return (
            <div
              key={member.id}
              className="bg-[#1c2028] rounded-xl p-3.5 flex flex-col gap-2.5 hover:bg-[#262a33]/80 transition-colors border border-white/[0.04] shadow-sm"
            >
              {/* Member Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div 
                  onClick={() => {
                    onSelectMember(member.id);
                    onNavigate('member-detail');
                  }}
                  className="flex items-center gap-3 min-w-0 cursor-pointer"
                >
                  <div className="relative shrink-0">
                    <img
                      className="w-12 h-12 rounded-full object-cover ring-1 ring-white/10"
                      src={member.avatar}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                    />
                    {member.status === 'active' && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#c3f400] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-[#161e00]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          bolt
                        </span>
                      </span>
                    )}
                    {member.status === 'expiring' && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#facc15] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-[#001e2c]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          priority_high
                        </span>
                      </span>
                    )}
                    {member.status === 'past_due' && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#ffb4ab] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-[#690005]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          close
                        </span>
                      </span>
                    )}
                    {member.status === 'frozen' && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#7bd0ff] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-[#00354a]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          ac_unit
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline font-bold text-[16px] text-[#dfe2ee] truncate">
                        {member.name}
                      </span>
                      {member.status === 'active' && (
                        <span className="material-symbols-outlined text-[16px] text-[#c3f400] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                          verified
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] text-[#c3f400] font-medium truncate">
                      {member.tier}
                    </span>
                    <span className="text-[10px] text-[#94a3b8] truncate">
                      RFID: #{member.rfid} • ID: {member.memberNumber}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                {member.status === 'active' && (
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#262a33] text-[#c3f400] text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400] animate-pulse"></span>
                    ACTIVE
                  </span>
                )}
                {member.status === 'expiring' && (
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#262a33] text-[#facc15] text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]"></span>
                    EXPIRING: 3 DAYS
                  </span>
                )}
                {member.status === 'past_due' && (
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#93000a]/40 text-[#ffdad6] text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span>
                    PAST DUE
                  </span>
                )}
                {member.status === 'frozen' && (
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#262a33] text-[#7bd0ff] text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">ac_unit</span>
                    FROZEN
                  </span>
                )}
              </div>

              {/* Middle Context Bar */}
              {isSarah && (
                <div className="bg-[#181c24] rounded-lg p-2.5 flex items-center justify-between gap-2 border border-white/[0.02]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#262a33] flex items-center justify-center shrink-0 text-[#c3f400]">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider truncate">
                        Last Access
                      </span>
                      <span className="text-[12px] text-[#dfe2ee] truncate font-semibold">
                        Today • 7:15 AM <span className="text-[#94a3b8] font-normal">(14 visits this mo)</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 bg-[#1c2028] px-2 py-1 rounded-md text-[11px]">
                    <span className="material-symbols-outlined text-[#94a3b8] text-[14px]">sports_martial_arts</span>
                    <span className="text-[#dfe2ee] font-medium">Jax C.</span>
                  </div>
                </div>
              )}

              {isMateo && (
                <div className="bg-[#181c24] rounded-lg p-2.5 flex items-center justify-between gap-2 border border-white/[0.02]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#262a33] flex items-center justify-center shrink-0 text-[#facc15]">
                      <span className="material-symbols-outlined text-[16px]">autorenew</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider truncate">
                        Billing Status
                      </span>
                      <span className="text-[12px] text-[#facc15] truncate font-semibold">
                        Auto-renew: OFF
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#94a3b8] text-[11px]">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span>Ends Sep 30</span>
                  </div>
                </div>
              )}

              {isChloe && (
                <div className="bg-[#181c24] rounded-lg p-2.5 flex items-center justify-between gap-2 border border-white/[0.02]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#262a33] flex items-center justify-center shrink-0 text-[#c3f400]">
                      <span className="material-symbols-outlined text-[16px]">history</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider truncate">
                        Session Log
                      </span>
                      <span className="text-[12px] text-[#dfe2ee] truncate font-semibold">
                        Yesterday • 5:40 PM
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 bg-[#1c2028] px-2 py-1 rounded-md text-[11px]">
                    <span className="material-symbols-outlined text-[#7bd0ff] text-[14px]">badge</span>
                    <span className="text-[#dfe2ee] font-medium">Maya Lin (Coach)</span>
                  </div>
                </div>
              )}

              {isLiam && (
                <div className="bg-[#181c24] rounded-lg p-2.5 flex items-center justify-between gap-2 border border-white/[0.02]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#93000a]/40 flex items-center justify-center shrink-0 text-[#ffb4ab]">
                      <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider truncate">
                        Outstanding Balance
                      </span>
                      <span className="text-[12px] text-[#ffb4ab] truncate font-bold">
                        $79.00 Overdue
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#ffb4ab] bg-[#1c2028] px-2 py-1 rounded-md shrink-0">
                    12 Days Over
                  </span>
                </div>
              )}

              {isAnya && (
                <div className="bg-[#181c24] rounded-lg p-2.5 flex items-center justify-between gap-2 border border-white/[0.02]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#262a33] flex items-center justify-center shrink-0 text-[#7bd0ff]">
                      <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider truncate">
                        Hold Expiration
                      </span>
                      <span className="text-[12px] text-[#dfe2ee] truncate font-semibold">
                        Unfreezes on Oct 1st, 2025
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#7bd0ff] bg-[#1c2028] px-2 py-1 rounded-md shrink-0">
                    Study Break
                  </span>
                </div>
              )}

              {/* Bottom Action Strip */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#94a3b8] truncate">
                  {isSarah && 'Cycle Renews in 18d • Auto-Pay Active'}
                  {isMateo && 'Cycle Expiring in 3d'}
                  {isChloe && '4 PT Credits remaining'}
                  {isLiam && 'Billing cycle paused'}
                  {isAnya && 'Freeze Fee: $10.00/mo billed'}
                  {!isSarah && !isMateo && !isChloe && !isLiam && !isAnya && `Joined ${member.joinedDate}`}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  {isSarah && (
                    <>
                      <a
                        href={`tel:${member.phone}`}
                        aria-label="Call Sarah"
                        className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center active:scale-95 transition-all hover:bg-[#353942]"
                      >
                        <span className="material-symbols-outlined text-[16px]">phone</span>
                      </a>
                      <button
                        onClick={() => {
                          onSelectMember(member.id);
                          onNavigate('coach-chat');
                        }}
                        aria-label="Chat with Sarah"
                        className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center active:scale-95 transition-all hover:bg-[#353942]"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectMember(member.id);
                          onNavigate('member-detail');
                        }}
                        className="h-8 px-3 rounded-full bg-[#262a33] text-[#dfe2ee] text-[12px] font-semibold flex items-center gap-1 active:scale-95 transition-all hover:bg-[#353942]"
                      >
                        <span>Profile</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                      </button>
                    </>
                  )}

                  {isMateo && (
                    <>
                      <a
                        href={`tel:${member.phone}`}
                        aria-label="Call Mateo"
                        className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">phone</span>
                      </a>
                      <button
                        onClick={() => onRenewMember(member.id)}
                        className="h-8 px-3.5 rounded-lg bg-[#c3f400] text-[#161e00] text-[11px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">update</span>
                        <span>Renew Pass</span>
                      </button>
                    </>
                  )}

                  {isChloe && (
                    <>
                      <button
                        onClick={() => {
                          onSelectMember(member.id);
                          onNavigate('coach-chat');
                        }}
                        className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectMember(member.id);
                          onNavigate('book-pt');
                        }}
                        className="h-8 px-3 rounded-full bg-[#262a33] text-[#dfe2ee] text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all hover:bg-[#353942]"
                      >
                        <span className="material-symbols-outlined text-[14px]">event_available</span>
                        <span>Book PT</span>
                      </button>
                    </>
                  )}

                  {isLiam && (
                    <>
                      <a
                        href={`tel:${member.phone}`}
                        className="h-8 px-3 rounded-full bg-[#262a33] text-[#dfe2ee] text-[11px] font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">call</span>
                        <span>Call</span>
                      </a>
                      <button
                        onClick={() => onSendReminder(member)}
                        className="h-8 px-3.5 rounded-full bg-[#93000a]/50 text-[#ffdad6] text-[11px] font-bold flex items-center gap-1.5 active:scale-95 transition-all hover:bg-[#93000a]/70"
                      >
                        <span className="material-symbols-outlined text-[16px]">notification_important</span>
                        <span>Send Reminder</span>
                      </button>
                    </>
                  )}

                  {isAnya && (
                    <button
                      onClick={() => onUnfreezeMember(member.id)}
                      className="h-8 px-3 rounded-full bg-[#262a33] text-[#dfe2ee] text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all hover:bg-[#353942]"
                    >
                      <span className="material-symbols-outlined text-[14px]">lock_open</span>
                      <span>Unfreeze Now</span>
                    </button>
                  )}

                  {!isSarah && !isMateo && !isChloe && !isLiam && !isAnya && (
                    <button
                      onClick={() => {
                        onSelectMember(member.id);
                        onNavigate('member-detail');
                      }}
                      className="h-8 px-3 rounded-full bg-[#262a33] text-[#dfe2ee] text-[11px] font-semibold flex items-center gap-1"
                    >
                      <span>Details</span>
                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredMembers.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center text-[#94a3b8]">
            <span className="material-symbols-outlined text-[36px] mb-2 text-[#94a3b8]">
              person_search
            </span>
            <p className="text-[14px] font-medium text-[#dfe2ee]">No members found</p>
            <p className="text-[12px] mt-0.5">Try searching for a different name, tag, or tier</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-[#262a33] text-[#c3f400] text-[12px] font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Member Button */}
      <aside className="fixed bottom-20 right-4 z-40 max-w-lg mx-auto">
        <button
          onClick={onOpenAddMember}
          aria-label="Add New Member"
          className="h-14 px-5 rounded-full bg-[#c3f400] text-[#161e00] font-headline font-bold text-[14px] uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_24px_rgba(195,244,0,0.4)] active:scale-95 transition-all hover:brightness-105"
        >
          <span className="material-symbols-outlined text-[24px]">person_add</span>
          <span>Add Member</span>
        </button>
      </aside>
    </div>
  );
};

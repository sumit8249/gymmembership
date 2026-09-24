export type ScreenType = 
  | 'dashboard' 
  | 'members' 
  | 'schedule' 
  | 'billing' 
  | 'member-detail' 
  | 'book-pt' 
  | 'pass' 
  | 'coach-chat';

export interface Member {
  id: string;
  memberNumber: string;
  rfid: string;
  name: string;
  tier: string;
  tierType: 'vip' | 'standard' | 'pt' | 'off_peak' | 'student';
  status: 'active' | 'expiring' | 'past_due' | 'frozen';
  avatar: string;
  phone: string;
  email: string;
  joinedDate: string;
  monthsActive: number;
  lastAccess: string;
  visitsThisMonth: number;
  totalVisits: number;
  streakDays: number;
  ptCreditsRemaining: number;
  totalPtCredits: number;
  assignedCoach: string;
  monthlyFee: number;
  nextRenewal: string;
  autoRenew: boolean;
  outstandingBalance?: number;
  freezeReason?: string;
  unfreezeDate?: string;
  zoneAffinity: {
    strength: number;
    hiit: number;
    recovery: number;
  };
  currentLocation?: string;
  lastCheckedInTime?: string;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  rating: number;
  bookedCount: number;
  avatar: string;
  specialty: string;
  badge?: string;
  availability: string;
  note?: string;
}

export interface ClassSession {
  id: string;
  name: string;
  coach: Coach;
  timeRange: string;
  studio: string;
  status: 'completed' | 'live' | 'next_up' | 'upcoming';
  category: 'hiit' | 'conditioning' | 'recovery';
  booked: number;
  capacity: number;
  waitlist?: number;
  attended?: number;
  noShow?: number;
  checkedInLive?: number;
  note?: string;
}

export interface Transaction {
  id: string;
  memberName: string;
  avatar: string;
  description: string;
  timestamp: string;
  amount: number;
  status: 'paid' | 'pos' | 'failed';
  tier?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  price: number;
  memberCount: number;
  description: string;
  monthlyYield: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text?: string;
  timestamp: string;
  type?: 'text' | 'workout_plan' | 'voice_memo' | 'video_check';
  workoutPlan?: {
    title: string;
    target: string;
    items: {
      name: string;
      details: string;
      meta?: string;
      icon?: string;
    }[];
    preset: string;
  };
  audioDuration?: string;
  audioNote?: string;
  videoThumb?: string;
  videoDuration?: string;
  videoCaption?: string;
}

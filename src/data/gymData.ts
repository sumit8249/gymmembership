import { Member, Coach, ClassSession, Transaction, MembershipPlan, ChatMessage } from '../types';

export const APEX_LOGO = "https://lh3.googleusercontent.com/aida-public/AB6AXuAqLWGhZozIZsVSwt7dzHmWhPXhnLoDvDrgOWCNVz5NdXpXuoE5HrbfdGh3DdDIq3f2elcqCtNNiFAVjYi65QPpN95DF3OiSr3_YZmeW9rDfWFeCJL3d3TU9YAs8jgSWqdtTJwIMWn5bWGZwj2mdexOzei3Laj3noi2DkhAku3dE93CG5bvtDPFLYVT7l-Cf7m5smFoLuUFP68NHaycFHcsBeZuhUHgGfLVYF9Crc9akKbPMxG9-LqHbQ";

export const COACH_JAX: Coach = {
  id: "jax-carter",
  name: "Coach Jax Carter",
  title: "Head Strength Lead",
  rating: 4.9,
  bookedCount: 128,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa_y7-MQu7s6PYx4FONsiH909HleWjqIQaCmyXxzrRqJOTXgCutCLaViCQLNKJmsATMISudYEZzIjGpR12rIP6sqcx1MM7XFOYeuvQCfUKlr9v63YSDi3Edc-zJb8RLYmcUtAI9oqnOpaQTi5wj-8YTyd9cGyY6y7w5kNDS5b5GcFdAnfTolcBPWr3qb_ismoCB88O4dfbyj3ruSn2rHreGsGcJby53UkKbQNRXNf6z84owVo1nrRJ1Q",
  specialty: "Head Strength & PR",
  badge: "Assigned Coach",
  availability: "Today Open",
  note: "Targeting 180kg deadlift milestone this training block. Knee rehab routine verified with physical therapist; clear for unrestricted barbell training."
};

export const COACH_MAYA: Coach = {
  id: "maya-lin",
  name: "Coach Maya Lin",
  title: "Mobility & Kinetic Specialist",
  rating: 5.0,
  bookedCount: 94,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZDP-udZOgcQipPvoG20RaxWV0vCvK-5LZHE9pWErT0rsDbplDe929qbSpr9NJn_DYmwpqsvYjlN3KqHR4PKNXsmzTjz6jm4YXw8GPH3szR5QI8vqZeazjHjfeQr9Gyd43JRp0K4zPNcfwjAiv4ENP3yNbBFmLgO4zDdXhd5f1OfyCRoJaF9xjSgFDAI8KUqfgZmh2J8VcPLgE3JZD0Q1KabLzhsBkEx9w7Cogttf2fp_Aco4Ikx5Y2Q",
  specialty: "Mobility & Kinetic Core",
  badge: "Specialist Tier",
  availability: "Tomorrow"
};

export const COACH_DAVE: Coach = {
  id: "dave-k",
  name: "Coach Dave K.",
  title: "MetCon & Conditioning Lead",
  rating: 4.8,
  bookedCount: 82,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF5wv26LN0I8MJDPLKamn2O_ij9g9Vbr_RGntkOtX2Yw4YsWWj7GQ0D8MYmI3cgZkjixpAubvOQaxphhmQ3Pg1e4A4KX-M9G1adZJzXOni3fA70MstjlOdu9asW93hYRZCqoxipWqGzdWVrv94Zd_4UDDXwpwp61K1E-BYU4_VDWTypPW9Y6JTSfuT8rtYWnmlVzerG8jxXr8sW5NZNw_V_Zbs1jqH1nhfs9cA8p-c1fHCwH3JFxcVtg",
  specialty: "MetCon & Conditioning",
  badge: "Conditioning",
  availability: "Sat 09:00 AM"
};

export const COACH_SARAH_S: Coach = {
  id: "sarah-s",
  name: "Coach Sarah S.",
  title: "Mobility & Recovery Flow",
  rating: 4.9,
  bookedCount: 110,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFHo8VR73hBkwjchyDCYnr9n3veuQeBorBqEIPOeK7hTxW5urW8oWU9q_GgtOeYNb3ZTnBoqIw1WGAUVRydPfpxzaP6xSGxijIRs65x7DavLqWIvNzI3k-bzoFRzX5H6kGfwG6xGx-y-D4QVQPpQZnOxtC2vOFhBNKOwXeQIXQVUw5D8Pu7KaD_J_P5-k067alSP3F3BlVNtfmh0J581aI_L6KMlWho6bhf30Om0d_Hh5dMHxRCmHvww",
  specialty: "Zen & Mobility Flow",
  availability: "Tonight 06:45 PM"
};

export const INITIAL_MEMBERS: Member[] = [
  {
    id: "sarah-jenkins",
    memberNumber: "10428",
    rfid: "OX-9942",
    name: "Sarah Jenkins",
    tier: "Black Onyx VIP Tier",
    tierType: "vip",
    status: "active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_3P6DPrRYJTw-5ch8ddOBCLE5mbS5vWqQszF-j9mIoXT1HdXgtyyUFkC0Wf095Z6b87S44YwTyuEazIU2vCKtzb_H5MjfhefvFeIV2ir9zr3E4FovTQ_HJ0fOslVI5wf7CjQ-tLVfYXe5jo2brRu3X05vCCb_P3-v8FxNMNtvVjmMceHP81ZSxXDekavz9S4L3ffRKHEJ_-ERy8QDk6QuNjpiQHlqMtbl-Mij3YzHQaPA692fILam0Q",
    phone: "+1 (555) 019-8429",
    email: "sarah.j@athlete.io",
    joinedDate: "Mar 2023",
    monthsActive: 19,
    lastAccess: "Today • 7:15 AM (14 visits this mo)",
    visitsThisMonth: 14,
    totalVisits: 248,
    streakDays: 18,
    ptCreditsRemaining: 6,
    totalPtCredits: 8,
    assignedCoach: "Jax Carter",
    monthlyFee: 189,
    nextRenewal: "Nov 12",
    autoRenew: true,
    zoneAffinity: {
      strength: 65,
      hiit: 25,
      recovery: 10
    },
    currentLocation: "Strength Zone • 4m ago",
    lastCheckedInTime: "7:15 AM"
  },
  {
    id: "mateo-silva",
    memberNumber: "10892",
    rfid: "ST-4820",
    name: "Mateo Silva",
    tier: "Standard All-Access",
    tierType: "standard",
    status: "expiring",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNrNMY_h3d1RMNWtPsI_hXRKjStKezrnyxifGxFV4PrwthjOB8yQCEVYalEHt8-yROnwvTNHjLmJ4N5antVSFhtS_4vmxBhniSYk5lhsa0if9o4oocksq5KB43q8OdqUj0TuYUP0uQsA8oRulq0yfKZpmtdJ_2HVTQsfW1DNIz9VG5GZ22RwUQky2nyi92ftrhcYZxwoR-B3hIqtF9NcumwN6gjIM5BV1aulZUvFMgADTqqDwUmXDtcQ",
    phone: "+1 (555) 019-3820",
    email: "mateo.silva@outlook.com",
    joinedDate: "Sep 2023",
    monthsActive: 13,
    lastAccess: "2 days ago • 6:15 PM",
    visitsThisMonth: 8,
    totalVisits: 142,
    streakDays: 0,
    ptCreditsRemaining: 0,
    totalPtCredits: 0,
    assignedCoach: "Dave K.",
    monthlyFee: 119,
    nextRenewal: "Ends Sep 30",
    autoRenew: false,
    zoneAffinity: {
      strength: 40,
      hiit: 50,
      recovery: 10
    }
  },
  {
    id: "chloe-bennett",
    memberNumber: "11204",
    rfid: "PT-1994",
    name: "Chloe Bennett",
    tier: "Personal Training + Unlimited",
    tierType: "pt",
    status: "active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYjCEFbj-Xv5tNneqOiSRPvsW-mPrWDKpKhnRAQj43DmDFVAX-yJZMa3dGJDkPUnEhIRZgKFaFPIwZXfXTQRm84IWn_OfqVf2E3yPv8Cl_vstgBrST80eSFIjeERMJX6Da2B0WbfRzNFltz7E9uZayvGxOh2BwzVB5VTg17976kSIk9jooVaCiWUTdjlEViEoiA1aueTptNUsRbXx1Ugh58bPdLpQBYZ2I638rgS8Jca3m4fCjRF_FKw",
    phone: "+1 (555) 019-7411",
    email: "c.bennett@apexathlete.com",
    joinedDate: "Jan 2024",
    monthsActive: 9,
    lastAccess: "Yesterday • 5:40 PM",
    visitsThisMonth: 12,
    totalVisits: 118,
    streakDays: 14,
    ptCreditsRemaining: 4,
    totalPtCredits: 8,
    assignedCoach: "Maya Lin (Coach)",
    monthlyFee: 249,
    nextRenewal: "Oct 28",
    autoRenew: true,
    zoneAffinity: {
      strength: 70,
      hiit: 15,
      recovery: 15
    }
  },
  {
    id: "liam-gallagher",
    memberNumber: "10301",
    rfid: "OP-6180",
    name: "Liam Gallagher",
    tier: "Morning Off-Peak Pass",
    tierType: "off_peak",
    status: "past_due",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOzfX7xRyFLuvGTA9clh82k5aZf6uZ8p1b45xWOGtcF7X7Qara19W79YUk4edqnS8etGuF5qx8ZdSoZsGGHlpJbzEs1bagIQgIC03_NV4uh-PscAl3hyBKHDCdtRYwbjcleb98XsBtdyLnXNUdLinQQc2T2C2FjRLmtZJURo5sY9DB4slXsWwwS_kMrQT6SxKHZLiRwRCNmOp90MVexzTTcS4V_G7Brlze0aDz1CsBtjw-0t-oLFlgaw",
    phone: "+1 (555) 019-6180",
    email: "liam.g@soundtrack.co",
    joinedDate: "Jun 2023",
    monthsActive: 16,
    lastAccess: "3 days ago • 8:10 AM",
    visitsThisMonth: 5,
    totalVisits: 160,
    streakDays: 0,
    ptCreditsRemaining: 0,
    totalPtCredits: 0,
    assignedCoach: "Jax Carter",
    monthlyFee: 79,
    nextRenewal: "Overdue",
    autoRenew: true,
    outstandingBalance: 79.00,
    zoneAffinity: {
      strength: 30,
      hiit: 60,
      recovery: 10
    }
  },
  {
    id: "anya-patel",
    memberNumber: "11985",
    rfid: "SU-3312",
    name: "Anya Patel",
    tier: "Student Unlimited",
    tierType: "student",
    status: "frozen",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuADvmvMBd_x1PjsQBFIVMJVctplnbIu2VRv--YQTA1SI8UCX5YxHmwJbul0VZVQba6vIT5ETapzctIrvtuDRimZ1Q4QMm2HPQMQnkLnBE3bLBFD9aYTFr6IQpr2wj-00dxrzjP5YCHInDtVWKqu0tnURwxCAgvMK-FY4zTChWC2SvXgKwHZUAssHQCDu4EqFGKH7cP5_WOLGfcLcRy4rP7ifH_hcuSuXEah6fhkRvSNLiLDCSsj1E_41A",
    phone: "+1 (555) 019-3312",
    email: "anya.patel@polytech.edu",
    joinedDate: "Aug 2023",
    monthsActive: 14,
    lastAccess: "Sep 28 • 11:30 AM",
    visitsThisMonth: 0,
    totalVisits: 98,
    streakDays: 0,
    ptCreditsRemaining: 2,
    totalPtCredits: 4,
    assignedCoach: "Sarah S.",
    monthlyFee: 59,
    nextRenewal: "Frozen ($10/mo)",
    autoRenew: false,
    freezeReason: "Study Break",
    unfreezeDate: "Oct 1st, 2025",
    zoneAffinity: {
      strength: 20,
      hiit: 50,
      recovery: 30
    }
  },
  {
    id: "elena-rostova",
    memberNumber: "10220",
    rfid: "OX-7721",
    name: "Elena Rostova",
    tier: "Class Pass / VIP",
    tierType: "vip",
    status: "active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnxpbvq5AbloQ-4inCi1WovBHxkLQwMtOogTo4N5U2KiKFwXmTEp2u1-OX3WQ4078lgB0B1Bi8qaxVhvf13gzEa20A9xta9r2pvbHNfGmEi1rJOVHuzWC4B_Y5GkgEE-5qDCTxg4b2p06lCW6XM5KsPVWXQCJDvCeGzxwye08fVO4yEKg79ysRs3tcOrfOpDpBcIF2xVoewNyngTik7JKmPat4JZqvoKJ21FoV5Xy8xZDYGxKYxIZAqw",
    phone: "+1 (555) 019-9922",
    email: "elena.r@kinetics.org",
    joinedDate: "Feb 2023",
    monthsActive: 20,
    lastAccess: "Today • 12m ago",
    visitsThisMonth: 16,
    totalVisits: 290,
    streakDays: 22,
    ptCreditsRemaining: 3,
    totalPtCredits: 6,
    assignedCoach: "Maya Lin",
    monthlyFee: 189,
    nextRenewal: "Nov 02",
    autoRenew: true,
    zoneAffinity: {
      strength: 50,
      hiit: 40,
      recovery: 10
    },
    currentLocation: "Studio B • 12m ago"
  },
  {
    id: "marcus-vance",
    memberNumber: "10118",
    rfid: "VIP-4412",
    name: "Marcus Vance",
    tier: "VIP Elite",
    tierType: "vip",
    status: "active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ40iox5BTnkiTSyaMdiXkOLQwwK9-XpqOiJ8ADfpCHbIPTVPy_eDR52l6z2TzL_G2isNMCGgWAb49qTWEdYtWlOE36SZCQGkjzH4LxfUf82RMhRLouwj0MmhCZWnMLuWqkcL646QYevDgCJqMG9Z6G0144cQTpryHk_x9cE8RZGRq4iL9UW20x4IkdIVt-LSrkyobKv2mCTnx-5etdqDZ2TtmRD1jpbizHwaTMnwnylJtR734yOCKqg",
    phone: "+1 (555) 019-4412",
    email: "marcus.v@primepower.com",
    joinedDate: "Nov 2022",
    monthsActive: 23,
    lastAccess: "Today • 4m ago",
    visitsThisMonth: 19,
    totalVisits: 350,
    streakDays: 31,
    ptCreditsRemaining: 5,
    totalPtCredits: 10,
    assignedCoach: "Jax Carter",
    monthlyFee: 189,
    nextRenewal: "Nov 15",
    autoRenew: true,
    zoneAffinity: {
      strength: 85,
      hiit: 10,
      recovery: 5
    },
    currentLocation: "Strength Zone • 4m ago"
  },
  {
    id: "david-chen",
    memberNumber: "10554",
    rfid: "ST-9102",
    name: "David Chen",
    tier: "Standard",
    tierType: "standard",
    status: "active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVDrNZxU0anhsIhThKOfv4pgLxkDU-yWh_Ea27Enne6DyhhoKzcK8DlooS_pSwlczTBSMqs5PgRThcys2qOGYrGi1dEFhgF7KOQ4DX_LmfGARcBAyo-GTrel6Sb8z3866G8K-c_K8Rguy58I_K1akkO076b0sABgYsnmWJe87ihM_syMviKOocBV41Z1PIl-AqNo42XoTORb8AWd7FYGX6goC7Gi6zSRqu14GXwZqIZkKjFMOmj7P0Gw",
    phone: "+1 (555) 019-9102",
    email: "david.chen@runfast.io",
    joinedDate: "May 2023",
    monthsActive: 17,
    lastAccess: "Today • 22m ago",
    visitsThisMonth: 11,
    totalVisits: 175,
    streakDays: 9,
    ptCreditsRemaining: 0,
    totalPtCredits: 0,
    assignedCoach: "Dave K.",
    monthlyFee: 119,
    nextRenewal: "Nov 01",
    autoRenew: true,
    zoneAffinity: {
      strength: 30,
      hiit: 60,
      recovery: 10
    },
    currentLocation: "Cardio Deck • 22m ago"
  }
];

export const INITIAL_CLASSES: ClassSession[] = [
  {
    id: "hiit-morning",
    name: "Morning Velocity HIIT",
    coach: COACH_JAX,
    timeRange: "07:00 AM - 08:00 AM",
    studio: "Studio 1",
    status: "completed",
    category: "hiit",
    booked: 25,
    capacity: 25,
    waitlist: 3,
    attended: 24,
    noShow: 1,
    note: "All stations wiped down & reset."
  },
  {
    id: "power-lift-live",
    name: "Power Lift & Core",
    coach: COACH_MAYA,
    timeRange: "12:15 PM - 01:00 PM",
    studio: "Turf Zone",
    status: "live",
    category: "conditioning",
    booked: 18,
    capacity: 20,
    checkedInLive: 17,
    note: "Barbells and platforms occupied"
  },
  {
    id: "metcon-next",
    name: "Metabolic Conditioning",
    coach: COACH_DAVE,
    timeRange: "05:30 PM - 06:30 PM",
    studio: "Main Rig",
    status: "next_up",
    category: "conditioning",
    booked: 22,
    capacity: 25,
    note: "Kettlebells and rower lanes queued"
  },
  {
    id: "mobility-flow",
    name: "Mobility & Deep Flow",
    coach: COACH_SARAH_S,
    timeRange: "06:45 PM - 07:45 PM",
    studio: "Zen Studio",
    status: "upcoming",
    category: "recovery",
    booked: 14,
    capacity: 15,
    note: "Foam rollers & bands ready"
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "black-onyx",
    name: "Black Onyx VIP",
    tag: "VIP Tier",
    tagColor: "bg-primary-fixed/20 text-primary-fixed",
    price: 189,
    memberCount: 342,
    description: "All-access + Recovery Spa + 2 Personal Training sessions per month.",
    monthlyYield: 64638
  },
  {
    id: "all-access",
    name: "All-Access Pro",
    tag: "Popular",
    tagColor: "bg-secondary-container/20 text-secondary",
    price: 119,
    memberCount: 820,
    description: "Unlimited open gym floor access plus full schedule of studio classes.",
    monthlyYield: 97580
  },
  {
    id: "basic-fit",
    name: "Basic Fit",
    tag: "Floor Only",
    tagColor: "bg-surface-bright text-on-surface-variant",
    price: 69,
    memberCount: 258,
    description: "Standard gym weight room and cardio equipment access only.",
    monthlyYield: 17802
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    memberName: "Elena Rostova",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6hGylf5Nok0Bt-npM9ZCm20RDIvXFfVf76TgrIIFjcZh19UlcriW_5E7neA3ZHlEwZkR7wIkrTaqDYn7hKIhwB5o3MpgLM7XxwmzuXX9gq_p1M4pwf-89tX1H6ZtQzpjxV0ZnZDzGmlrgpt0Gc8_1Ky1aWa8Haa47Ck6f4vOyON8fsBsNdUHf2IyQJCUjRfGXJdrJBbSbDE8eELV4hoW0FMnvS7BTbAdm4jrM3v0vdIJycPoRJILSQ",
    description: "Black Onyx Auto-Renew",
    timestamp: "Today, 08:12 AM",
    amount: 189.00,
    status: "paid"
  },
  {
    id: "tx-2",
    memberName: "Marcus Vance",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrLj0PrVEYtDQvwZp372hoe6bq7KHn1xgdiXJ_RgFXNsi1djJtoXhhgPNftxZMLxfPM4KXpTb7T40T-66SwIQgvZ7Rs2YIQE8QrF59YkrQh0-Zz2KTyaJGpm0L1ym_UJxO-pX2TW0JmklbfrdkWpPIeIv-ieVl9oxn1umhWiKelosFgcDg1fkn6IB0E6-NHi_CVQSVJQb9h3AyptuoTjDTYGwQVnEaLl4KyjsiGU8c-oUfuebo8BpSHA",
    description: "Protein Bar & Pre-Workout",
    timestamp: "Today, 07:45 AM",
    amount: 14.50,
    status: "pos"
  },
  {
    id: "tx-3",
    memberName: "Liam Gallagher",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU3fmUeFxug3sPNv-Mc8VWgsTdcscDGrGoBk_iHqi9OnBZemSVBC39l_DRrJSfz7aEkl2XyJNSJ5Rq6QgybtB1qd_G4DtC57cbr1ghPDUpBOhTMdbp9RmQdFAxqB4O0IBN-b7s-d1kkQ3WYTSPyQyYGIrzaJUAfyhPRSOvFCO4rn2zpc4qx7vVx0pNm95l47DW57KkudxouCnyx8qhywfWiZ_F6tuNezrNEnQ-8xuFbsyNCyvuhsUjDg",
    description: "Failed: Insufficient Funds",
    timestamp: "Yesterday",
    amount: 119.00,
    status: "failed"
  },
  {
    id: "tx-4",
    memberName: "Priya Sharma",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqxvWPhxDrSz6EhpTIojQLxgbqTUEqS-S9YblnkOWqCGyB-FNUI7Wg01he1b-S7oldB1QqQfV8T1lHlLi41d7rZGw7RML8V2eCfNUyjmjJIQjre6W14xR1P6HojmQAE7pTP7Oq6wlYOCrND9sqJsO0nodikugfgesnlYs2Q35B_xVBSuBd9cEZtt4twEspyImLY1YGk6Ks4SJdJsKzd2Q3OgiMIkhuspY1Ww7q5J1aLfFqLQFkJt8Saw",
    description: "10-Pack PT Package",
    timestamp: "Yesterday",
    amount: 450.00,
    status: "paid"
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "user",
    text: "Hey Jax! Just booked our 2:00 PM PR session. Knee felt 100% after yesterday's mobility drills. Ready for heavy barbell work. 🔥",
    timestamp: "10:15 AM",
    type: "text"
  },
  {
    id: "msg-2",
    sender: "coach",
    text: "Awesome news Sarah! 🎯 Just reviewed your readiness score from yesterday's turnstile log. We are targeting that 180kg deadlift milestone today.",
    timestamp: "10:18 AM",
    type: "text"
  },
  {
    id: "msg-3",
    sender: "coach",
    timestamp: "10:19 AM",
    type: "workout_plan",
    workoutPlan: {
      title: "Session Focus: Power Hypertrophy & PR",
      target: "180 KG TARGET",
      preset: "Preset Rig A • Chalk & Towel Ready",
      items: [
        {
          name: "1. Conventional Barbell Deadlift",
          details: "5 sets × 3 reps @ 85% 1RM",
          icon: "lock_clock"
        },
        {
          name: "2. Bulgarian Split Squats",
          details: "3 sets × 8 reps / leg • Tempo 3-1-1",
          meta: "DB 24kg"
        },
        {
          name: "3. Core Anti-Rotation & Nordic Curls",
          details: "3 supersets to failure",
          icon: "autorenew"
        }
      ]
    }
  },
  {
    id: "msg-4",
    sender: "coach",
    timestamp: "10:20 AM",
    type: "voice_memo",
    audioDuration: "0:38",
    audioNote: '"Note on hip hinge cue for warmups"'
  },
  {
    id: "msg-5",
    sender: "user",
    timestamp: "10:22 AM",
    type: "video_check",
    videoThumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3jPZV4QGwsUbRPXqHPj_7eyMDg4qIwzrEJLZez1XqYmIQRuZC7GhjGtPuqe8DLgiaFNVmjirvmwHXIo5W46fHwWgDP4YYb3rLSaDJoWWS029N6oVTOGe9kQYS1t5Hgae-3dENo16_2QlUKK10M1kRAk4ZZF4QANQiaFVu4Cyiqs-VD0sHD86z-WauJeK3dpwGa5edvuke6kSW9kvYDQMkkdCy9s4gfqk1SYnwkMPpYI6wZv37BJlW4A",
    videoDuration: "0:14",
    videoCaption: "Felt slight hip rise on rep 3"
  },
  {
    id: "msg-6",
    sender: "coach",
    text: "Locked it in. Hip angle looks much sharper than last week! Bring your flat lifting shoes, and warm up with 5 mins on the row erg before 2 PM. Let's get that record! ⚡",
    timestamp: "10:24 AM",
    type: "text"
  }
];

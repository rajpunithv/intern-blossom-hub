// Mock API service for intern dashboard

export interface InternData {
  name: string;
  referralCode: string;
  donations: number;
  email: string;
  joinDate: string;
  rank: number;
  totalInterns: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  donations: number;
  rank: number;
  referralCode: string;
  avatar?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
}

// Mock data
const mockInternData: InternData = {
  name: "Rajpunith",
  referralCode: "rajpunith2025",
  donations: 4500,
  email: "rajpunith@company.com",
  joinDate: "2024-01-15",
  rank: 3,
  totalInterns: 150
};

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Priya Sharma",
    donations: 7800,
    rank: 1,
    referralCode: "priya2025",
  },
  {
    id: "2", 
    name: "Arjun Patel",
    donations: 6200,
    rank: 2,
    referralCode: "arjun2025",
  },
  {
    id: "3",
    name: "Rajpunith",
    donations: 4500,
    rank: 3,
    referralCode: "rajpunith2025",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    donations: 3900,
    rank: 4,
    referralCode: "sneha2025",
  },
  {
    id: "5",
    name: "Kiran Kumar",
    donations: 3600,
    rank: 5,
    referralCode: "kiran2025",
  }
];

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your profile setup",
    isUnlocked: true,
    requirement: "Complete profile",
    rarity: "common",
    icon: "user"
  },
  {
    id: "2", 
    title: "Rising Star",
    description: "Reach ₹1,000 in donations",
    isUnlocked: true,
    requirement: "₹1,000 donations",
    rarity: "rare",
    icon: "star"
  },
  {
    id: "3",
    title: "Champion",
    description: "Reach ₹5,000 in donations", 
    isUnlocked: false,
    requirement: "₹5,000 donations",
    rarity: "epic",
    icon: "trophy"
  },
  {
    id: "4",
    title: "Legend",
    description: "Reach ₹10,000 in donations",
    isUnlocked: false,
    requirement: "₹10,000 donations", 
    rarity: "legendary",
    icon: "crown"
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Get intern dashboard data
  async getInternData(): Promise<InternData> {
    await delay(500);
    
    // Get name from localStorage if available
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      return {
        ...mockInternData,
        name: storedName,
        referralCode: `${storedName.toLowerCase().replace(/\s+/g, '')}2025`
      };
    }
    
    return mockInternData;
  },

  // Get leaderboard data
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    await delay(300);
    return mockLeaderboard;
  },

  // Get achievements/rewards data
  async getAchievements(): Promise<Achievement[]> {
    await delay(400);
    return mockAchievements;
  },

  // Get donation stats (monthly data for charts)
  async getDonationStats() {
    await delay(200);
    return {
      monthlyData: [
        { month: 'Jan', donations: 500 },
        { month: 'Feb', donations: 800 },
        { month: 'Mar', donations: 1200 },
        { month: 'Apr', donations: 950 },
        { month: 'May', donations: 1500 },
        { month: 'Jun', donations: 4500 },
      ],
      totalDonations: 4500,
      monthlyGrowth: 23.5,
      avgDonationAmount: 125
    };
  }
};
import { supabase } from "@/integrations/supabase/client";

export interface CreditTransaction {
  id: string;
  user_id: string;
  action_type: string;
  credits_amount: number;
  reason: string;
  metadata: any;
  ip_address?: string | null;
  user_agent?: string | null;
  referral_code?: string | null;
  admin_user_id?: string | null;
  admin_reason?: string | null;
  created_at: string;
}

export interface UserUnlock {
  id: string;
  user_id: string;
  unlock_type: string;
  unlock_value: string;
  credits_required: number;
  unlocked_at: string;
  metadata: any;
}

export interface LevelConfig {
  level: number;
  name: string;
  description: string;
  creditsRequired: number;
  benefits: string[];
  icon: string;
  color: string;
}

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    level: 1,
    name: "Explorer",
    description: "Welcome to EmviApp!",
    creditsRequired: 0,
    benefits: ["Basic booking", "Profile creation"],
    icon: "🌟",
    color: "text-blue-500"
  },
  {
    level: 2,
    name: "Enthusiast",
    description: "Getting active in the community",
    creditsRequired: 100,
    benefits: ["Priority support", "Special offers"],
    icon: "💎",
    color: "text-purple-500"
  },
  {
    level: 3,
    name: "Insider",
    description: "Trusted community member",
    creditsRequired: 250,
    benefits: ["Early access features", "VIP booking slots"],
    icon: "👑",
    color: "text-yellow-500"
  },
  {
    level: 4,
    name: "Ambassador",
    description: "Community leader",
    creditsRequired: 500,
    benefits: ["Exclusive events", "Partner discounts"],
    icon: "🏆",
    color: "text-orange-500"
  },
  {
    level: 5,
    name: "Elite",
    description: "Top tier member",
    creditsRequired: 1000,
    benefits: ["Premium features", "Personal concierge"],
    icon: "💫",
    color: "text-pink-500"
  },
  {
    level: 6,
    name: "Legend",
    description: "Legendary status",
    creditsRequired: 2000,
    benefits: ["All premium perks", "Special recognition"],
    icon: "⭐",
    color: "text-gradient"
  },
  {
    level: 7,
    name: "Mythic",
    description: "Ultimate achievement",
    creditsRequired: 5000,
    benefits: ["Everything unlocked", "Hall of fame"],
    icon: "🚀",
    color: "text-gradient"
  }
];

export const CREDIT_REWARDS = {
  PROFILE_COMPLETE: 50,
  FIRST_BOOKING: 100,
  BOOKING_COMPLETED: 25,
  REVIEW_LEFT: 30,
  REFERRAL: 150,
  SHARE_ARTIST: 10,
  SHARE_APP: 20,
  DAILY_LOGIN: 5,
  STREAK_7_DAYS: 50,
  STREAK_30_DAYS: 200
};

class CreditsManager {
  private getUserAgent(): string {
    return navigator.userAgent;
  }

  private async getClientIP(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return null;
    }
  }

  async getUserCredits(userId: string): Promise<number> {
    const { data, error } = await supabase.rpc('get_user_credits', {
      p_user_id: userId
    });

    if (error) {
      console.error('Error fetching credits:', error);
      return 0;
    }

    return data || 0;
  }

  async awardCredits(
    userId: string,
    credits: number,
    reason: string,
    metadata: any = {},
    referralCode?: string
  ): Promise<boolean> {
    const ip = await this.getClientIP();
    const userAgent = this.getUserAgent();

    const { data, error } = await supabase.rpc('award_credits', {
      p_user_id: userId,
      p_credits: credits,
      p_reason: reason,
      p_metadata: metadata,
      p_ip_address: ip,
      p_user_agent: userAgent,
      p_referral_code: referralCode
    });

    if (error) {
      console.error('Error awarding credits:', error);
      return false;
    }

    return data;
  }

  async spendCredits(
    userId: string,
    credits: number,
    reason: string,
    metadata: any = {}
  ): Promise<boolean> {
    const { data, error } = await supabase.rpc('spend_credits', {
      p_user_id: userId,
      p_credits: credits,
      p_reason: reason,
      p_metadata: metadata
    });

    if (error) {
      console.error('Error spending credits:', error);
      return false;
    }

    return data;
  }

  async unlockLevel(
    userId: string,
    level: number,
    creditsRequired: number
  ): Promise<boolean> {
    const ip = await this.getClientIP();
    const userAgent = this.getUserAgent();

    const { data, error } = await supabase.rpc('unlock_level', {
      p_user_id: userId,
      p_level: level,
      p_credits_required: creditsRequired,
      p_ip_address: ip,
      p_user_agent: userAgent
    });

    if (error) {
      console.error('Error unlocking level:', error);
      return false;
    }

    return data;
  }

  async getUserUnlocks(userId: string): Promise<UserUnlock[]> {
    const { data, error } = await supabase
      .from('user_unlocks')
      .select('*')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false });

    if (error) {
      console.error('Error fetching unlocks:', error);
      return [];
    }

    return data || [];
  }

  async getCreditHistory(userId: string): Promise<CreditTransaction[]> {
    const { data, error } = await supabase
      .from('credits_ledger')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching credit history:', error);
      return [];
    }

    return data || [];
  }

  getCurrentLevel(credits: number): LevelConfig {
    for (let i = LEVEL_CONFIGS.length - 1; i >= 0; i--) {
      if (credits >= LEVEL_CONFIGS[i].creditsRequired) {
        return LEVEL_CONFIGS[i];
      }
    }
    return LEVEL_CONFIGS[0];
  }

  getNextLevel(credits: number): LevelConfig | null {
    for (const level of LEVEL_CONFIGS) {
      if (credits < level.creditsRequired) {
        return level;
      }
    }
    return null;
  }

  getProgressToNextLevel(credits: number): number {
    const currentLevel = this.getCurrentLevel(credits);
    const nextLevel = this.getNextLevel(credits);
    
    if (!nextLevel) return 100;
    
    const progress = ((credits - currentLevel.creditsRequired) / 
      (nextLevel.creditsRequired - currentLevel.creditsRequired)) * 100;
    
    return Math.min(100, Math.max(0, progress));
  }

  // Anti-cheat detection
  async detectSuspiciousActivity(userId: string): Promise<boolean> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const { data, error } = await supabase
      .from('credits_ledger')
      .select('id')
      .eq('user_id', userId)
      .eq('action_type', 'earn')
      .gte('created_at', oneHourAgo);

    if (error) return false;
    
    // Flag if more than 20 credit transactions in 1 hour
    return (data?.length || 0) > 20;
  }
}

export const creditsManager = new CreditsManager();
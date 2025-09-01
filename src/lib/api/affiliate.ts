import { supabase } from '@/integrations/supabase/client';
import { AffiliateStats, Payout } from '@/types/affiliate';

const isDev = import.meta.env.MODE === 'development';

export const affiliateApi = {
  async getStats(period: string = '30d'): Promise<AffiliateStats> {
    if (isDev) {
      // Mock data for development
      return {
        totalClicks: 1247,
        totalConversions: 89,
        totalCommissions: 2670.30,
        conversionRate: 7.1,
        thisMonth: {
          clicks: 342,
          conversions: 23,
          commissions: 690.00
        }
      };
    }

    try {
      const { data: affiliate } = await supabase
        .from('affiliate_partners')
        .select('id, total_clicks, total_conversions, total_commissions')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!affiliate) throw new Error('Affiliate not found');

      return {
        totalClicks: affiliate.total_clicks || 0,
        totalConversions: affiliate.total_conversions || 0,
        totalCommissions: affiliate.total_commissions || 0,
        conversionRate: affiliate.total_clicks > 0 ? (affiliate.total_conversions / affiliate.total_clicks) * 100 : 0,
        thisMonth: {
          clicks: 0, // Would need separate monthly tracking
          conversions: 0,
          commissions: 0
        }
      };
    } catch (error) {
      console.error('Error fetching affiliate stats:', error);
      throw error;
    }
  },

  async getPayouts(): Promise<Payout[]> {
    if (isDev) {
      // Mock data for development
      return [
        {
          id: '1',
          period_start: '2024-01-01',
          period_end: '2024-01-31',
          commission_amount: 890.50,
          status: 'completed',
          paid_at: '2024-02-15T10:30:00Z',
          stripe_payout_id: 'po_1234567890',
          failure_reason: null
        },
        {
          id: '2',
          period_start: '2024-02-01',
          period_end: '2024-02-29',
          commission_amount: 1240.30,
          status: 'pending',
          paid_at: null,
          stripe_payout_id: null,
          failure_reason: null
        }
      ];
    }

    try {
      const { data: affiliate } = await supabase
        .from('affiliate_partners')
        .select('id')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!affiliate) throw new Error('Affiliate not found');

      const { data, error } = await supabase
        .from('affiliate_payouts')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .order('period_start', { ascending: false });

      if (error) throw error;

      return data.map(payout => ({
        ...payout,
        status: payout.status as 'pending' | 'processing' | 'completed' | 'failed'
      })) || [];
    } catch (error) {
      console.error('Error fetching payouts:', error);
      throw error;
    }
  },

  async createLink(linkData: { title: string; destination_url: string; slug?: string }) {
    return supabase.functions.invoke('affiliate-links', {
      body: linkData
    });
  },

  async regenerateToken(): Promise<{ token: string }> {
    if (isDev) {
      return { token: 'emvi_dev_' + Math.random().toString(36).substring(7) };
    }

    const response = await supabase.functions.invoke('affiliate-token', {
      body: { action: 'regenerate' }
    });

    if (response.error) throw response.error;
    return response.data;
  }
};
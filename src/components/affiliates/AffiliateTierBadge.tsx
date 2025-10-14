import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { TrendingUp, Star, Award, Crown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TierData {
  name: string;
  commission_rate: number;
  badge_color: string;
  perks: string[];
  min_conversions: number;
  priority_support: boolean;
}

interface AffiliateTierBadgeProps {
  tierName: string;
  totalConversions: number;
  size?: 'sm' | 'md' | 'lg';
  showPopover?: boolean;
}

const AffiliateTierBadge: React.FC<AffiliateTierBadgeProps> = ({ 
  tierName, 
  totalConversions,
  size = 'md',
  showPopover = true 
}) => {
  const [tier, setTier] = useState<TierData | null>(null);
  const [nextTier, setNextTier] = useState<TierData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTierData();
  }, [tierName]);

  const fetchTierData = async () => {
    try {
      // Get current tier
      const { data: currentTier } = await supabase
        .from('affiliate_tiers')
        .select('*')
        .eq('name', tierName)
        .single();

      if (currentTier) {
        setTier({
          ...currentTier,
          perks: Array.isArray(currentTier.perks) ? currentTier.perks : []
        } as TierData);

        // Get next tier
        const { data: tiers } = await supabase
          .from('affiliate_tiers')
          .select('*')
          .gt('min_conversions', currentTier.min_conversions)
          .order('min_conversions', { ascending: true })
          .limit(1);

        if (tiers && tiers.length > 0) {
          setNextTier({
            ...tiers[0],
            perks: Array.isArray(tiers[0].perks) ? tiers[0].perks : []
          } as TierData);
        }
      }
    } catch (error) {
      console.error('Error fetching tier data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierIcon = (name: string) => {
    switch (name) {
      case 'Bronze': return Star;
      case 'Silver': return Award;
      case 'Gold': return Crown;
      case 'Platinum': return Crown;
      default: return Star;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xs px-2 py-0.5';
      case 'lg': return 'text-base px-4 py-2';
      default: return 'text-sm px-3 py-1';
    }
  };

  if (loading || !tier) {
    return <Badge variant="outline">Loading...</Badge>;
  }

  const Icon = getTierIcon(tier.name);
  const progressToNext = nextTier 
    ? Math.min(((totalConversions - tier.min_conversions) / (nextTier.min_conversions - tier.min_conversions)) * 100, 100)
    : 100;

  const badgeContent = (
    <Badge 
      className={`${getSizeClasses()} border-2`}
      style={{
        backgroundColor: tier.badge_color + '20',
        borderColor: tier.badge_color,
        color: tier.badge_color
      }}
    >
      <Icon className={`mr-1 ${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}`} />
      {tier.name} Tier
    </Badge>
  );

  if (!showPopover) {
    return badgeContent;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="cursor-pointer">
          {badgeContent}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          {/* Current Tier Info */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Icon className="h-5 w-5" style={{ color: tier.badge_color }} />
                {tier.name} Tier
              </h4>
              <Badge variant="outline">{(tier.commission_rate * 100).toFixed(0)}% Commission</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {totalConversions} total conversions
            </p>
          </div>

          {/* Perks */}
          <div>
            <p className="text-sm font-medium mb-2">Your Perks:</p>
            <ul className="space-y-1">
              {tier.perks.map((perk: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Progress to Next Tier */}
          {nextTier && (
            <Card className="p-3 bg-violet-50 border-violet-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Next: {nextTier.name} Tier</span>
                  <span className="text-violet-600 font-semibold">
                    {nextTier.min_conversions - totalConversions} more conversions
                  </span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Unlock {(nextTier.commission_rate * 100).toFixed(0)}% commission rate + premium perks
                </p>
              </div>
            </Card>
          )}

          {tier.name === 'Platinum' && (
            <div className="text-center p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
              <Crown className="h-6 w-6 mx-auto mb-2 text-violet-600" />
              <p className="text-sm font-medium text-violet-900">You've reached the top tier!</p>
              <p className="text-xs text-muted-foreground mt-1">Maximum benefits unlocked</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AffiliateTierBadge;

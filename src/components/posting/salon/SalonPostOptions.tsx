import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PricingOptions, UserPostingStats } from '@/utils/posting/types';
import { generatePromotionalText, getFirstPostPromotionalText } from '@/utils/posting/promotionalText';

interface SalonPostOptionsProps {
  pricingOptions: PricingOptions;
  setPricingOptions: (options: PricingOptions) => void;
  isFirstPost: boolean;
}

const SalonPostOptions = ({ pricingOptions, setPricingOptions, isFirstPost }: SalonPostOptionsProps) => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [totalJobPosts, setTotalJobPosts] = useState(0);
  const [totalSalonPosts, setTotalSalonPosts] = useState(0);
  const [totalBoothPosts, setTotalBoothPosts] = useState(0);
  const [totalSupplyPosts, setTotalSupplyPosts] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      
      try {
        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', user.id);
        
        if (postsError) throw postsError;
        
        const jobPosts = posts.filter(post => post.type === 'job').length;
        const salonPosts = posts.filter(post => post.type === 'salon').length;
        const boothPosts = posts.filter(post => post.type === 'booth').length;
        const supplyPosts = posts.filter(post => post.type === 'supply').length;
        
        setTotalJobPosts(jobPosts);
        setTotalSalonPosts(salonPosts);
        setTotalBoothPosts(boothPosts);
        setTotalSupplyPosts(supplyPosts);
        
        const { data: referralData, error: referralError } = await supabase
          .from('users')
          .select('referral_count')
          .eq('id', user.id)
          .single();
        
        if (referralError) throw referralError;
        
        setReferralCount(referralData?.referral_count || 0);
      } catch (error) {
        console.error("Error fetching user stats:", error);
        toast.error("Failed to load user stats");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserStats();
  }, [user?.id]);
  
  const handleOptionChange = (option: string, value: boolean | number) => {
    setPricingOptions(prev => ({ ...prev, [option]: value }));
  };

const getPostStats = (): UserPostingStats => {
  // Create an object that matches the UserPostingStats interface
  return {
    jobPostCount: totalJobPosts,
    salonPostCount: totalSalonPosts,
    boothPostCount: totalBoothPosts,
    supplyPostCount: totalSupplyPosts,
    totalPosts: totalJobPosts + totalSalonPosts + totalBoothPosts + totalSupplyPosts,
    referralCount: referralCount
  };
};
  
  const postStats = getPostStats();
  
  if (loading) {
    return <div>Loading options...</div>;
  }
  
  return (
    <Card>
      <CardContent className="space-y-4">
        <h3 className="font-medium text-lg">Post Options</h3>
        
        {/* Promotional Text */}
        <div className="text-sm text-muted-foreground">
          {isFirstPost 
            ? getFirstPostPromotionalText() 
            : generatePromotionalText(userProfile?.role)}
        </div>
        
        {/* Nationwide Visibility */}
        <div className="flex items-center justify-between">
          <Label htmlFor="nationwide">Nationwide Visibility</Label>
          <Switch 
            id="nationwide" 
            checked={pricingOptions.isNationwide || false}
            onCheckedChange={(checked) => handleOptionChange('isNationwide', checked)}
          />
        </div>
        
        {/* Show at Top */}
        <div className="flex items-center justify-between">
          <Label htmlFor="showAtTop">Show at Top</Label>
          <Switch 
            id="showAtTop"
            disabled
            checked={pricingOptions.showAtTop || false}
            onCheckedChange={(checked) => handleOptionChange('showAtTop', checked)}
          />
        </div>
        
        {/* Fast Sale Package */}
        <div className="flex items-center justify-between">
          <Label htmlFor="fastSalePackage">Fast Sale Package</Label>
          <Switch 
            id="fastSalePackage"
            disabled
            checked={pricingOptions.fastSalePackage || false}
            onCheckedChange={(checked) => handleOptionChange('fastSalePackage', checked)}
          />
        </div>
        
        {/* Bundle with Job Post */}
        {postStats.jobPostCount === 0 && (
          <div className="flex items-center justify-between">
            <Label htmlFor="bundleWithJobPost">Bundle with Job Post</Label>
            <Switch 
              id="bundleWithJobPost"
              disabled
              checked={pricingOptions.bundleWithJobPost || false}
              onCheckedChange={(checked) => handleOptionChange('bundleWithJobPost', checked)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonPostOptions;

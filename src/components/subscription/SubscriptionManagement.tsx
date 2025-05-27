
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Crown, Star, Zap, Shield, Check } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

const SubscriptionManagement: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      interval: 'month',
      features: [
        'Basic profile',
        'Browse listings',
        'Send messages',
        'Basic support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 19.99,
      interval: 'month',
      popular: true,
      features: [
        'Everything in Basic',
        'Featured profile',
        'Priority messaging',
        'Advanced analytics',
        'Priority support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 39.99,
      interval: 'month',
      features: [
        'Everything in Professional',
        'Verified badge',
        'Custom branding',
        'API access',
        'Dedicated support'
      ]
    }
  ];

  useEffect(() => {
    checkSubscriptionStatus();
  }, [user]);

  const checkSubscriptionStatus = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        return;
      }
      
      setCurrentSubscription(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast.error(t({ english: "Please log in to subscribe", vietnamese: "Vui lòng đăng nhập để đăng ký" }));
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast.error(t({ english: "Failed to create subscription", vietnamese: "Không thể tạo đăng ký" }));
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        throw error;
      }
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error(t({ english: "Failed to open subscription management", vietnamese: "Không thể mở quản lý đăng ký" }));
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          {t({ english: "Subscription Plans", vietnamese: "Gói đăng ký" })}
        </h2>
        <p className="text-gray-600 mt-2">
          {t({ english: "Choose the plan that's right for you", vietnamese: "Chọn gói phù hợp với bạn" })}
        </p>
      </div>

      {currentSubscription?.subscribed && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Check className="w-5 h-5" />
              {t({ english: "Current Subscription", vietnamese: "Đăng ký hiện tại" })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {currentSubscription.subscription_tier || t({ english: "Active Plan", vietnamese: "Gói đang hoạt động" })}
                </p>
                {currentSubscription.subscription_end && (
                  <p className="text-sm text-gray-600">
                    {t({ english: "Expires", vietnamese: "Hết hạn" })}: {new Date(currentSubscription.subscription_end).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Button onClick={handleManageSubscription} variant="outline">
                {t({ english: "Manage", vietnamese: "Quản lý" })}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-purple-200 shadow-lg' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white">
                  {t({ english: "Most Popular", vietnamese: "Phổ biến nhất" })}
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                {plan.id === 'basic' && <Star className="w-6 h-6 text-purple-600" />}
                {plan.id === 'professional' && <Zap className="w-6 h-6 text-purple-600" />}
                {plan.id === 'premium' && <Crown className="w-6 h-6 text-purple-600" />}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                ${plan.price}
                <span className="text-sm text-gray-500 font-normal">/{plan.interval}</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {currentSubscription?.subscribed && currentSubscription.subscription_tier === plan.name
                  ? t({ english: "Current Plan", vietnamese: "Gói hiện tại" })
                  : t({ english: "Choose Plan", vietnamese: "Chọn gói" })
                }
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionManagement;

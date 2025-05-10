
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Diamond, Gift } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export interface ListingPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  description: string;
  features: string[];
  popular?: boolean;
}

interface ListingPlanSelectorProps {
  onSelectPlan: (plan: ListingPlan) => void;
  selectedPlanId?: string;
}

const ListingPlanSelector: React.FC<ListingPlanSelectorProps> = ({ onSelectPlan, selectedPlanId }) => {
  const { t } = useTranslation();
  
  const plans: ListingPlan[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      duration: 14,
      description: "Basic listing with limited visibility",
      features: [
        "14-day listing",
        "Basic search visibility",
        "Text only listing"
      ]
    },
    {
      id: "featured",
      name: "Featured",
      price: 19.99,
      duration: 30,
      description: "Enhanced listing with better visibility",
      features: [
        "30-day listing",
        "Highlighted in search results",
        "Include images",
        "Featured badge"
      ],
      popular: true
    },
    {
      id: "premium",
      price: 49.99,
      name: "Premium",
      duration: 90,
      description: "Maximum visibility for faster hiring",
      features: [
        "3-month listing",
        "Top search placement",
        "Premium badge",
        "Social media promotion",
        "Email campaign inclusion"
      ]
    },
    {
      id: "diamond",
      name: "Diamond Featured",
      price: 999.99,
      duration: 365,
      description: "Ultimate visibility with year-round presence",
      features: [
        "12-month listing",
        "Homepage feature",
        "Priority customer support",
        "Premium placement in all search results",
        "Monthly promotion refreshes",
        "Custom branding options"
      ]
    }
  ];

  const handleSelectPlan = (plan: ListingPlan) => {
    onSelectPlan(plan);
  };

  // Icons for each plan
  const planIcon = (planId: string) => {
    switch (planId) {
      case "free": return <Gift className="h-8 w-8 text-gray-400" />;
      case "featured": return <Star className="h-8 w-8 text-amber-400" />;
      case "premium": return <Star className="h-8 w-8 text-purple-500" />;
      case "diamond": return <Diamond className="h-8 w-8 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{t('Select a Listing Plan', 'Chọn Gói Đăng Tin')}</h2>
        <p className="text-gray-500">
          {t('Choose the best visibility option for your job listing', 'Chọn tùy chọn hiển thị tốt nhất cho tin tuyển dụng của bạn')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedPlanId === plan.id ? "border-2 border-primary shadow-md" : "border border-gray-200",
              plan.popular ? "relative" : ""
            )}
            onClick={() => handleSelectPlan(plan)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                {t('Most Popular', 'Phổ Biến Nhất')}
              </div>
            )}
            <CardHeader>
              <div className="mb-2">{planIcon(plan.id)}</div>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  {plan.price === 0 ? t('FREE', 'MIỄN PHÍ') : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-gray-500 ml-1">
                    {plan.duration === 30 && '/month'}
                    {plan.duration === 90 && '/3 months'}
                    {plan.duration === 365 && '/year'}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-2">
                {t(`${plan.duration}-day listing`, `Đăng tin ${plan.duration} ngày`)}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{t(feature, feature)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedPlanId === plan.id ? "default" : "outline"} 
                className="w-full"
                onClick={() => handleSelectPlan(plan)}
              >
                {selectedPlanId === plan.id 
                  ? t('Selected', 'Đã Chọn') 
                  : plan.price === 0 
                    ? t('Select Free Plan', 'Chọn Gói Miễn Phí') 
                    : t('Select Plan', 'Chọn Gói')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListingPlanSelector;

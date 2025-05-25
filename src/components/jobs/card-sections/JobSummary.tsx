
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getJobTypeColor } from "../utils/badgeStyles";
import { useState } from "react";
import { JobPricingTier, PricingOptions } from "@/utils/posting/types";
import { getJobPrice } from "@/utils/posting/jobPricing";
import { usePricing } from "@/context/pricing/PricingProvider";

interface JobSummaryProps {
  employmentType: string;
  salaryRange?: string;
  createdAt: string | Date;
  pricingTier?: JobPricingTier;
  pricingOptions?: PricingOptions;
}

export const JobSummary = ({ 
  employmentType, 
  salaryRange, 
  createdAt,
  pricingTier,
  pricingOptions 
}: JobSummaryProps) => {
  // Safely use the pricing context, with a fallback if it's not available
  const pricingContext = (() => {
    try {
      return usePricing();
    } catch (error) {
      console.error("Pricing context not available, using fallback", error);
      // Return null if the context is not available
      return null;
    }
  })();

  const formatPostedDate = (dateInput: string | Date) => {
    try {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      return `Posted ${formatDistanceToNow(date, { addSuffix: false })} ago`;
    } catch (error) {
      return "Recently posted";
    }
  };

  // Get the pricing tier badge if available
  const renderPricingBadge = () => {
    if (!pricingTier) return null;
    
    let badgeClass = "";
    let badgeText = "";
    
    switch (pricingTier) {
      case "free":
        badgeClass = "bg-gray-100 text-gray-800";
        badgeText = "Free";
        break;
      case "premium":
        badgeClass = "bg-purple-100 text-purple-800";
        badgeText = "Premium";
        break;
      case "gold":
        badgeClass = "bg-amber-100 text-amber-800";
        badgeText = "Gold";
        break;
      case "diamond":
        badgeClass = "bg-cyan-100 text-cyan-800";
        badgeText = "Diamond";
        break;
      default:
        return null;
    }
    
    return (
      <Badge className={`ml-2 ${badgeClass}`}>
        {badgeText}
      </Badge>
    );
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 text-gray-700">
      <div className="flex items-center gap-1">
        <Briefcase className="h-4 w-4 text-gray-500" />
        <Badge variant="outline" className={getJobTypeColor(employmentType)}>
          {employmentType}
          {renderPricingBadge()}
        </Badge>
      </div>
      
      {salaryRange && (
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span className="font-medium">{salaryRange}</span>
        </div>
      )}
      
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4 text-gray-500" />
        <span className="text-sm">{formatPostedDate(createdAt)}</span>
      </div>
    </div>
  );
};

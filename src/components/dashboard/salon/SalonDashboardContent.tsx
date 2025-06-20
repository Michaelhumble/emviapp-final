
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/auth";
import { SalonOverviewCard } from "./components/SalonOverviewCard";
import { BookingsSummaryCard } from "./components/BookingsSummaryCard";
import { StaffOverviewCard } from "./components/StaffOverviewCard";
import { EarningsCard } from "./components/EarningsCard";
import { RecentReviewsCard } from "./components/RecentReviewsCard";

export const SalonDashboardContent = () => {
  const { userProfile } = useAuth();
  
  // Get salon name from user profile, fallback to business name or generic greeting
  const getSalonName = () => {
    if (userProfile?.salon_name) {
      return userProfile.salon_name;
    }
    if (userProfile?.company_name) {
      return userProfile.company_name;
    }
    if (userProfile?.full_name) {
      return userProfile.full_name;
    }
    return "Salon Owner";
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="font-playfair text-2xl md:text-3xl font-semibold text-gray-900">
          Welcome to Your Salon Dashboard, {getSalonName()}
        </h1>
        <p className="text-gray-600 mt-1">Here's your business snapshot for today.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalonOverviewCard />
        </div>
        <div className="flex flex-col gap-6">
          <BookingsSummaryCard />
          <StaffOverviewCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EarningsCard />
        <RecentReviewsCard />
      </div>

      <div className="sticky bottom-4 md:relative md:bottom-0 z-10">
        <Button 
          className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </Button>
      </div>
    </div>
  );
};

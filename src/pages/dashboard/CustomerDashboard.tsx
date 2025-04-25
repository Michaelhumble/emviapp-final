import React from "react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardQuickCard from "@/components/dashboard/customer/DashboardQuickCard";
import { Users, Search, Calendar, Star, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import FavoritesSection from "@/components/dashboard/customer/favorites/FavoritesSection";
import { differenceInDays } from "date-fns";

const accentColor = "#9b87f5";
const lavenderGradient =
  "linear-gradient(90deg, rgba(229,222,255,1) 0%, rgba(255,222,226,0.9) 100%)";

const CustomerDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  // Safely get first name
  const firstName = userProfile?.full_name?.split(" ")[0] || "Beautiful";

  // Demo stats – replace with actual logic if available
  const totalBookings = userProfile?.bookings_count ?? null;
  const totalReviews = userProfile?.reviews_count ?? null;

  // Referral link logic
  const referralLink = userProfile?.referral_code
    ? `https://emviapp.com/invite/${userProfile.referral_code}`
    : "";

  const handleCopyReferral = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  // Check if user needs a booking reminder
  const showBookingReminder = () => {
    const lastBookingDate = userProfile?.last_booking_date 
      ? new Date(userProfile.last_booking_date)
      : new Date('2024-03-15'); // Mock date for testing - remove in production

    const daysSinceLastBooking = differenceInDays(new Date(), lastBookingDate);
    return daysSinceLastBooking > 21;
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center bg-gradient-to-b from-white to-pink-50/40 px-2 pb-10">
      {/* 🌟 Premium Welcome Banner */}
      <div
        className="w-full max-w-3xl mx-auto mt-6 mb-8"
        style={{
          background: lavenderGradient,
          borderRadius: "2rem",
          boxShadow: "0 8px 26px 0 rgba(155,135,245,0.10), 0 1.5px 8px 0 rgba(219,200,244,0.08)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 py-7 sm:py-8">
          <div className="flex-shrink-0 flex items-center justify-center bg-white/70 rounded-full shadow-md p-3">
            <Sparkles size={40} className="text-yellow-400 drop-shadow" />
          </div>
          <div className="flex-1 flex flex-col items-center sm:items-start">
            <h1
              className="font-serif font-bold text-xl sm:text-2xl md:text-3xl mb-1 text-gray-800"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.5px" }}
            >
              Hello <span className="text-primary" style={{ color: accentColor }}>{firstName}</span>, your beauty journey starts here <span className="inline-block align-middle ml-0.5"><Sparkles size={28} className="inline text-yellow-400" /></span>
            </h1>
            <p
              className="font-normal text-gray-700 text-base sm:text-lg max-w-2xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Book your next appointment, explore inspiring artists, and earn credits as you go. 
              Emvi makes your self-care effortless & rewarding!
            </p>
          </div>
        </div>
      </div>

      {/* Motivational welcome (old) */}
      {/* We comment out or remove the original "Motivational welcome" section to avoid duplicate welcome blocks */}
      {/* 
      <div className="max-w-2xl w-full mx-auto text-center mt-8 mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex flex-col items-center">
          Hey <span className="text-[1.5em] font-extrabold text-primary" style={{ color: accentColor }}>{firstName}</span>, your next beauty appointment is just a click away 💅
        </h1>
        <p className="text-gray-600 text-base">Jump into your dashboard to plan appointments, discover artists, and earn fabulous credits!</p>
      </div>
      */}
      {/* Stats cards */}
      {(totalBookings !== null || totalReviews !== null) && (
        <div className="flex flex-row gap-4 mb-6">
          {totalBookings !== null && (
            <Card className="rounded-2xl bg-white/70 shadow-inner px-5 py-2 min-w-[100px] flex flex-col items-center">
              <Calendar className="h-5 w-5 text-primary mb-1" />
              <div className="text-lg font-semibold">{totalBookings}</div>
              <div className="text-xs text-gray-500 font-medium">Bookings</div>
            </Card>
          )}
          {totalReviews !== null && (
            <Card className="rounded-2xl bg-white/70 shadow-inner px-5 py-2 min-w-[100px] flex flex-col items-center">
              <Star className="h-5 w-5 text-yellow-400 mb-1" />
              <div className="text-lg font-semibold">{totalReviews}</div>
              <div className="text-xs text-gray-500 font-medium">Reviews</div>
            </Card>
          )}
        </div>
      )}
      {/* Smart Booking Reminder */}
      {showBookingReminder() && (
        <Card className="w-full max-w-2xl mx-auto mb-6 bg-[#F8F7FF] border border-primary/20">
          <CardContent className="py-6 px-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 
                  className="text-xl mb-2 text-gray-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  💡 It's been a while since your last beauty appointment
                </h3>
                <p className="text-gray-600 font-inter">
                  Keep your style fresh — book your next session today!
                </p>
              </div>
              <Button 
                className="whitespace-nowrap"
                onClick={() => navigate("/search")}
              >
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Dashboard navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <DashboardQuickCard
          icon={<Users className="h-6 w-6 text-primary" />}
          title="Browse Salons"
          description="Explore premium salons nearby."
          buttonLabel="See Salons"
          onClick={() => navigate("/salons")}
          accentColor={accentColor}
        />
        <DashboardQuickCard
          icon={<Search className="h-6 w-6 text-primary" />}
          title="Find Artists"
          description="Discover talented beauty pros."
          buttonLabel="Find Artists"
          onClick={() => navigate("/search")}
          accentColor={accentColor}
        />
        <DashboardQuickCard
          icon={<Calendar className="h-6 w-6 text-primary" />}
          title="My Appointments"
          description="View and manage your bookings."
          buttonLabel="My Bookings"
          onClick={() => navigate("/bookings")}
          accentColor={accentColor}
        />
        <DashboardQuickCard
          icon={<Star className="h-6 w-6 text-yellow-400" />}
          title="My Reviews"
          description="Manage your artist reviews."
          buttonLabel="My Reviews"
          onClick={() => navigate("/profile/reviews")}
          accentColor={accentColor}
        />
        {/* Referral link panel */}
        <Card className="rounded-2xl bg-white/80 shadow-xl py-6 px-5 col-span-1 sm:col-span-2 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRight className="h-5 w-5 text-emerald-500" />
            <span className="font-semibold text-emerald-700 text-[1.08em]">
              Invite Friends &amp; Earn
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="bg-gray-100 border border-gray-200 px-3 py-2 rounded-md text-sm truncate w-full sm:w-auto">
              {referralLink || "No referral link available"}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 sm:mt-0"
              style={{ color: accentColor, borderColor: accentColor }}
              onClick={handleCopyReferral}
              disabled={!referralLink}
            >
              Copy Link
            </Button>
          </div>
          <div className="text-xs text-gray-600 mt-1">Share and earn free credits—let’s grow our beauty community together!</div>
        </Card>
      </div>

      {/* Add Favorites Section */}
      <div className="mt-8 w-full">
        <FavoritesSection />
      </div>
    </div>
  );
};

export default CustomerDashboard;

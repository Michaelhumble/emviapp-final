
import { useAuth } from "@/context/auth";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CalendarClock, 
  Eye, 
  Users, 
  Star,
  TrendingUp,
  Image
} from "lucide-react";

const ArtistStats = () => {
  const { userProfile } = useAuth();
  
  // Stats would normally be fetched from the database
  const stats = [
    {
      title: "Profile Views",
      value: userProfile?.profile_views || 0,
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Bookings",
      value: 0, // Would come from bookings table
      icon: CalendarClock,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Clients",
      value: 0, // Would come from clients table
      icon: Users,
      color: "text-violet-500",
      bgColor: "bg-violet-50"
    },
    {
      title: "Average Rating",
      value: "0.0", // Would come from reviews table
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      title: "Portfolio Items",
      value: userProfile?.portfolio_urls?.length || 0,
      icon: Image,
      color: "text-pink-500",
      bgColor: "bg-pink-50"
    },
    {
      title: "Referrals",
      value: userProfile?.referral_count || 0,
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center space-y-2">
            <div className={`mx-auto rounded-full p-3 w-12 h-12 flex items-center justify-center ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.title}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArtistStats;

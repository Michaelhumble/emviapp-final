
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/context/auth/types";
import { Calendar, Image, Users, CreditCard } from "lucide-react";

interface ArtistDashboardStatsProps {
  profileData?: UserProfile;
}

const ArtistDashboardStats = ({ profileData }: ArtistDashboardStatsProps) => {
  // Sample stats - in a real app these would come from the database
  const stats = [
    {
      title: "Portfolio Items",
      value: profileData?.portfolio_urls?.length || 0,
      icon: <Image className="h-5 w-5 text-purple-500" />,
      change: "+2 this week",
      trend: "up"
    },
    {
      title: "Upcoming Appointments",
      value: 5,
      icon: <Calendar className="h-5 w-5 text-indigo-500" />,
      change: "3 this week",
      trend: "neutral"
    },
    {
      title: "Profile Views",
      value: profileData?.profile_views || 0,
      icon: <Users className="h-5 w-5 text-pink-500" />,
      change: "+12 this week",
      trend: "up"
    },
    {
      title: "Credits",
      value: profileData?.credits || 0,
      icon: <CreditCard className="h-5 w-5 text-emerald-500" />,
      change: "Use for promotions",
      trend: "neutral"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-purple-100">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  {stat.icon}
                  <span className="ml-1">{stat.title}</span>
                </p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stat.trend === 'up' 
                  ? 'bg-green-100 text-green-800' 
                  : stat.trend === 'down' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
              }`}>
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArtistDashboardStats;


import { useAuth } from "@/context/auth";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Users, Calendar, Heart } from "lucide-react";

const CustomerDashboardStats = () => {
  const { userProfile } = useAuth();
  
  // Mock stats for demonstration
  const bookings = Math.floor(Math.random() * 8) + 1;
  const savedArtists = Math.floor(Math.random() * 12) + 3;
  const favoriteStyles = Math.floor(Math.random() * 5) + 1;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Calendar className="h-8 w-8 text-purple-500 mb-2" />
          <div className="text-2xl font-bold">{bookings}</div>
          <div className="text-sm text-gray-500">Bookings</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Users className="h-8 w-8 text-purple-500 mb-2" />
          <div className="text-2xl font-bold">{savedArtists}</div>
          <div className="text-sm text-gray-500">Saved Artists</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Heart className="h-8 w-8 text-purple-500 mb-2" />
          <div className="text-2xl font-bold">{favoriteStyles}</div>
          <div className="text-sm text-gray-500">Favorite Styles</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <BarChart className="h-8 w-8 text-purple-500 mb-2" />
          <div className="text-2xl font-bold">{0}</div>
          <div className="text-sm text-gray-500">Profile Views</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboardStats;

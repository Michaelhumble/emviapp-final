
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Image, MessageSquare, Star, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import { getRoleTheme } from "./utils/themeHelpers";

const ArtistProfileSection = () => {
  const { userRole } = useAuth();
  const theme = getRoleTheme(userRole);
  
  return (
    <div className="space-y-6">
      <Card className={`overflow-hidden ${theme.borderColor} shadow-sm hover-scale`}>
        <CardHeader className={`bg-gradient-to-r ${theme.lightBg} pb-2`}>
          <CardTitle className={`font-serif text-xl flex items-center ${theme.textColor}`}>
            <Image className={`h-5 w-5 ${theme.iconColor} mr-2`} />
            Featured Work
          </CardTitle>
          <CardDescription>Showcase your best nail art and designs</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-4">
            <p className="text-gray-500 mb-4">Add photos of your best work to attract new clients</p>
            <Button asChild className={theme.accentColor}>
              <Link to="/profile/portfolio">Upload Portfolio</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`${theme.borderColor} shadow-sm hover-scale`}>
          <CardHeader className="pb-2">
            <CardTitle className={`font-serif text-lg flex items-center ${theme.textColor}`}>
              <Calendar className={`h-5 w-5 ${theme.iconColor} mr-2`} />
              Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">Set your availability and manage appointments</p>
              <Button variant="outline" asChild className={theme.hoverColor}>
                <Link to="/bookings">Manage Schedule</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${theme.borderColor} shadow-sm hover-scale`}>
          <CardHeader className="pb-2">
            <CardTitle className={`font-serif text-lg flex items-center ${theme.textColor}`}>
              <Star className={`h-5 w-5 ${theme.iconColor} mr-2`} />
              Testimonials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">Client reviews help build your reputation</p>
              <Button variant="outline" asChild className={theme.hoverColor}>
                <Link to="/testimonials">Collect Reviews</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className={`${theme.borderColor} shadow-sm bg-gradient-to-r ${theme.lightBg}`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className={`font-serif text-lg text-gray-800 flex items-center ${theme.textColor}`}>
                <TrendingUp className={`h-5 w-5 ${theme.iconColor} mr-2`} />
                Grow Your Business
              </h3>
              <p className="text-gray-600 max-w-md">
                Promote your services to reach more clients and increase your bookings
              </p>
            </div>
            <Button className={theme.accentColor}>
              Promote My Services
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistProfileSection;

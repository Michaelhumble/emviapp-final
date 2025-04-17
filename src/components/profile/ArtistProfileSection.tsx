import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Image, MessageSquare, Star, TrendingUp, Award, Shield, Palette } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import { getRoleTheme } from "./utils/themeHelpers";

const ArtistProfileSection = () => {
  const { userRole, userProfile } = useAuth();
  const theme = getRoleTheme(userRole);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className={`overflow-hidden ${theme.borderColor} shadow-sm hover:shadow-md transition-all`}>
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
              <Button asChild className={`${theme.accentColor} hover:shadow-md transition-shadow`}>
                <Link to="/profile/portfolio">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Portfolio
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`${theme.borderColor} shadow-sm hover:shadow-md transition-all`}>
          <CardHeader className="pb-2">
            <CardTitle className={`font-serif text-lg flex items-center ${theme.textColor}`}>
              <Calendar className={`h-5 w-5 ${theme.iconColor} mr-2`} />
              Bookings & Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <div className={`p-2 rounded-full ${theme.lightBg} mr-3`}>
                <Calendar className={`h-5 w-5 ${theme.iconColor}`} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Set Your Schedule</h3>
                <p className="text-sm text-gray-500">Define your working hours and manage appointments</p>
              </div>
            </div>
            <Button variant="outline" asChild className={`w-full mt-2 ${theme.hoverColor}`}>
              <Link to="/bookings">Manage Schedule</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className={`${theme.borderColor} shadow-sm hover:shadow-md transition-all`}>
          <CardHeader className="pb-2">
            <CardTitle className={`font-serif text-lg flex items-center ${theme.textColor}`}>
              <Star className={`h-5 w-5 ${theme.iconColor} mr-2`} />
              Testimonials & Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <div className={`p-2 rounded-full ${theme.lightBg} mr-3`}>
                <Star className={`h-5 w-5 ${theme.iconColor}`} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Build Your Reputation</h3>
                <p className="text-sm text-gray-500">Client reviews help build trust and attract new business</p>
              </div>
            </div>
            <Button variant="outline" asChild className={`w-full mt-2 ${theme.hoverColor}`}>
              <Link to="/testimonials">Collect Reviews</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className={`${theme.borderColor} shadow-sm bg-gradient-to-r ${theme.lightBg}`}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-start mb-4 md:mb-0 md:mr-4">
                <div className={`p-2 rounded-full bg-white/80 mr-3 flex-shrink-0`}>
                  <TrendingUp className={`h-5 w-5 ${theme.iconColor}`} />
                </div>
                <div>
                  <h3 className={`font-medium text-lg text-gray-800 ${theme.textColor} mb-1`}>
                    Grow Your Business
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Promote your services to reach more clients and increase your bookings
                  </p>
                </div>
              </div>
              <Button className={`${theme.accentColor} hover:shadow-md transition-shadow`}>
                <Star className="h-4 w-4 mr-2" />
                Promote My Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`${theme.borderColor} shadow-sm hover:shadow-md transition-all h-full`}>
          <CardContent className="p-4 flex flex-col h-full">
            <div className={`p-3 rounded-full ${theme.lightBg} mb-3 self-start`}>
              <Shield className={`h-6 w-6 ${theme.iconColor}`} />
            </div>
            <h3 className="font-medium text-lg mb-2">Badges & Certifications</h3>
            <p className="text-sm text-gray-500 mb-3 flex-grow">
              Showcase your professional achievements and certifications.
            </p>
            <Button variant="outline" size="sm" className={theme.hoverColor}>
              <Award className="h-4 w-4 mr-2" />
              Add Badges
            </Button>
          </CardContent>
        </Card>
        
        <Card className={`${theme.borderColor} shadow-sm hover:shadow-md transition-all h-full`}>
          <CardContent className="p-4 flex flex-col h-full">
            <div className={`p-3 rounded-full ${theme.lightBg} mb-3 self-start`}>
              <Palette className={`h-6 w-6 ${theme.iconColor}`} />
            </div>
            <h3 className="font-medium text-lg mb-2">Services Menu</h3>
            <p className="text-sm text-gray-500 mb-3 flex-grow">
              Create a list of services with prices and descriptions.
            </p>
            <Button variant="outline" size="sm" className={theme.hoverColor}>
              <Palette className="h-4 w-4 mr-2" />
              Manage Services
            </Button>
          </CardContent>
        </Card>
        
        <Card className={`${theme.borderColor} shadow-sm hover:shadow-md transition-all h-full`}>
          <CardContent className="p-4 flex flex-col h-full">
            <div className={`p-3 rounded-full ${theme.lightBg} mb-3 self-start`}>
              <MessageSquare className={`h-6 w-6 ${theme.iconColor}`} />
            </div>
            <h3 className="font-medium text-lg mb-2">Client Communication</h3>
            <p className="text-sm text-gray-500 mb-3 flex-grow">
              Manage messages and stay connected with your clients.
            </p>
            <Button variant="outline" size="sm" className={theme.hoverColor}>
              <MessageSquare className="h-4 w-4 mr-2" />
              View Messages
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ArtistProfileSection;

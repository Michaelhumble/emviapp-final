
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, User, Users } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import { getRoleTheme } from "./utils/themeHelpers";

const OtherProfileSection = () => {
  const { userRole } = useAuth();
  const theme = getRoleTheme(userRole);
  
  return (
    <div className="space-y-6">
      <Card className={`overflow-hidden ${theme.borderColor} shadow-sm bg-gradient-to-r ${theme.lightBg}`}>
        <CardHeader className="pb-2">
          <CardTitle className={`font-serif text-xl flex items-center ${theme.textColor}`}>
            <User className={`h-5 w-5 ${theme.iconColor} mr-2`} />
            Select Your Role
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-6">
            Choosing a role helps us personalize your experience and connect you with the right features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Button variant="outline" className={`justify-start h-auto py-3 px-4 ${theme.hoverColor}`} asChild>
              <Link to="/profile/role-selection?role=artist">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Nail Artist</span>
                  <span className="text-sm text-gray-500">For nail techs and beauty artists</span>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className={`justify-start h-auto py-3 px-4 ${theme.hoverColor}`} asChild>
              <Link to="/profile/role-selection?role=salon">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Salon Owner</span>
                  <span className="text-sm text-gray-500">For salon and spa businesses</span>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className={`justify-start h-auto py-3 px-4 ${theme.hoverColor}`} asChild>
              <Link to="/profile/role-selection?role=supplier">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Supplier</span>
                  <span className="text-sm text-gray-500">For beauty product suppliers</span>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className={`justify-start h-auto py-3 px-4 ${theme.hoverColor}`} asChild>
              <Link to="/profile/role-selection?role=customer">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Beauty Customer</span>
                  <span className="text-sm text-gray-500">For beauty service clients</span>
                </div>
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 italic">
            You can change your role later in your profile settings.
          </p>
        </CardContent>
      </Card>
      
      <Card className={`${theme.borderColor} shadow-sm`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className={`font-serif text-lg text-gray-800 flex items-center ${theme.textColor}`}>
                <HelpCircle className={`h-5 w-5 ${theme.iconColor} mr-2`} />
                Need Help?
              </h3>
              <p className="text-gray-600 max-w-md">
                Not sure which role to choose? Your AI Agent can help you decide.
              </p>
            </div>
            <Button className={theme.accentColor}>
              Chat with AI Agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtherProfileSection;

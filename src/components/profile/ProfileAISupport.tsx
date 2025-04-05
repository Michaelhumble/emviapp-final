
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { getRoleTheme } from "./utils/themeHelpers";

const ProfileAISupport = () => {
  const { userRole } = useAuth();
  const theme = getRoleTheme(userRole);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className={`glass-effect border-0 bg-gradient-to-r ${theme.lightBg} backdrop-blur-md`}>
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className={`${theme.accentColor.split(' ')[0]}/10 p-2 rounded-full mr-3`}>
                <Sparkles className={`h-5 w-5 ${theme.iconColor}`} />
              </div>
              <div>
                <h3 className="font-medium">Need help?</h3>
                <p className="text-sm text-gray-600">Your AI Agent is here to assist you</p>
              </div>
            </div>
            <Button size="sm" className={theme.accentColor}>
              Ask AI Agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileAISupport;

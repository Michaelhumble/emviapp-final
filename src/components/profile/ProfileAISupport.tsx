
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ProfileAISupport = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="glass-effect border-0 bg-gradient-to-r from-purple-50/90 to-indigo-50/90 backdrop-blur-md">
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Need help?</h3>
                <p className="text-sm text-gray-600">Your AI Agent is here to assist you</p>
              </div>
            </div>
            <Button size="sm" className="bg-primary/90 hover:bg-primary">
              Ask AI Agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileAISupport;

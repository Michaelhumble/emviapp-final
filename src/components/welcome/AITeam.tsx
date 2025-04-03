import { motion } from "framer-motion";
import { Search, Users, Shield, TrendingUp, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// AI agent interface
interface AIAgent {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  action?: string;
  iconColor: string;
  bgColor: string;
}

interface AITeamProps {
  userRole?: 'artist' | 'owner' | 'renter' | 'supplier' | 'customer' | 'freelancer' | 'salon' | 'other' | null;
}

const AITeam = ({ userRole = 'customer' }: AITeamProps) => {
  // Define the AI agents
  const aiAgents: AIAgent[] = [
    {
      id: "emviscout",
      name: "EmviScout",
      icon: Search,
      description: "Extends your reach with SEO optimization across the web and social media.",
      action: "Maximize Reach",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "emvimatch",
      name: "EmviMatch",
      icon: Users,
      description: "Connects you with ideal matches based on skills, location, and preferences.",
      action: "Find Matches",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      id: "emviguard",
      name: "EmviGuard",
      icon: Shield,
      description: "Blocks spam and verifies legitimate profiles to keep the platform safe.",
      action: "View Protection",
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: "emviboost",
      name: "EmviBoost",
      icon: TrendingUp,
      description: "Provides intelligent suggestions to grow your business and income.",
      action: "Ask EmviBoost",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      id: "sunshine",
      name: "Sunshine",
      icon: Sun,
      description: "Your friendly support agent, available 24/7 to help with any questions.",
      action: "Get Help",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  // Customize descriptions based on user role
  const getCustomizedAgents = () => {
    const customized = [...aiAgents];
    
    switch(userRole) {
      case 'artist':
        customized[0].description = "Optimizes your profile for discovery by salon owners and clients looking for your skills.";
        customized[1].description = "Matches you with job opportunities and clients that perfectly fit your expertise.";
        customized[3].description = "Suggests ways to increase your income and build a stronger client base.";
        break;
      case 'owner':
      case 'salon':
        customized[0].description = "Increases your salon's visibility to potential clients and talented beauty professionals.";
        customized[1].description = "Connects you with qualified professionals who match your salon's style and needs.";
        customized[3].description = "Recommends strategies to boost salon revenue and retain talented staff.";
        break;
      case 'supplier':
        customized[0].description = "Enhances discovery of your products by salons and beauty professionals.";
        customized[1].description = "Connects your products with salons and professionals most likely to purchase them.";
        customized[3].description = "Suggests pricing strategies and promotions to increase your product sales.";
        break;
      default:
        // Keep default descriptions for customers and others
        break;
    }
    
    return customized;
  };
  
  const customizedAgents = getCustomizedAgents();
  
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
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Meet Your AI Team
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          These intelligent agents work behind the scenes to enhance your EmviApp experience.
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {customizedAgents.map((agent) => (
          <motion.div
            key={agent.id}
            variants={itemVariants}
            className="h-full"
          >
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${agent.bgColor} shrink-0`}>
                    <agent.icon className={`h-6 w-6 ${agent.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold font-serif mb-1">{agent.name}</h3>
                    <p className="text-gray-600 mb-4">{agent.description}</p>
                    {agent.action && (
                      <Button variant="outline" size="sm" className="text-xs">
                        {agent.action}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AITeam;

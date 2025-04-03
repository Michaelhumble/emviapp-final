
import { MessageCircle, Search, RefreshCw, BarChart2, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// AI agent interface
interface AIAgent {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  iconColor: string;
  bgColor: string;
}

// Define the AI agents
const aiAgents: AIAgent[] = [
  {
    id: "emvimatch",
    title: "EmviMatch AI",
    icon: Search,
    description: "Matches salons with artists based on skills, location, and preferences for perfect fits every time.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "autoboost",
    title: "AutoBoost AI",
    icon: RefreshCw,
    description: "Automatically promotes your listings across platforms to maximize visibility and opportunities.",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    id: "trustscan",
    title: "TrustScan AI",
    icon: MessageCircle,
    description: "Filters out scams & spam automatically so you can focus on real connections with confidence.",
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "analyticspulse",
    title: "AnalyticsPulse AI",
    icon: TrendingUp,
    description: "Provides intelligent insights on your performance and suggests improvements for better results.",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
];

const AIAgents = () => {
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
    <section className="py-20 bg-gradient-to-b from-[#FDFDFD] to-[#F9F9FF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-6 bg-primary/10 px-4 py-1.5 text-sm font-medium rounded-full border-primary/30 text-primary">
            AI-Powered Platform
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif tracking-tight flex items-center justify-center gap-2">
            <span className="text-3xl">🤖</span> Meet the AI That's Got Your Back
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Smart, behind-the-scenes intelligence that works 24/7 to make your beauty career more successful.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {aiAgents.map((agent) => (
            <motion.div
              key={agent.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card className="h-full backdrop-blur-sm bg-white/90 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6 relative">
                  <div 
                    className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"
                    aria-hidden="true"
                  />
                  
                  <div className="flex items-start mb-4 relative">
                    <div className={`p-3 ${agent.bgColor} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <agent.icon className={`h-6 w-6 ${agent.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold font-serif">{agent.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600">{agent.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIAgents;

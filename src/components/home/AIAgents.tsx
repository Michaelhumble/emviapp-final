
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
    title: "EmviMatch",
    icon: Search,
    description: "Auto-connects salons & artists based on skills, location, and goals. No more wasted interviews or endless scrolling.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "emviboost",
    title: "EmviBoost",
    icon: RefreshCw,
    description: "Auto-promotes posts across Google & social media, reaching beauty communities. Your business gets seen by the right people.",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    id: "emviguard",
    title: "EmviGuard",
    icon: MessageCircle,
    description: "Blocks scams & spam automatically, like a 24/7 security guard powered by Emvi's intelligence. Your business stays protected.",
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "emvigrow",
    title: "EmviGrow",
    icon: TrendingUp,
    description: "Suggests perfect gigs and opportunities aligned with your skills and career aspirations. Grow your clientele and expertise effortlessly.",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "emvipulse",
    title: "EmviPulse",
    icon: BarChart2,
    description: "Provides live data insights on your posts, showing who views your content, where they're from, and how to improve results.",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
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
            <span className="text-3xl">🤖</span> Powered by AI, Built for Artists
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent agents work behind the scenes to make your beauty career or business more successful.
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
      </motion.div>
    </section>
  );
};

export default AIAgents;

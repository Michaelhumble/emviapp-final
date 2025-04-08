
import { Check, MessageCircle, Search, RefreshCw, BarChart2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// AI tool interface
interface AITool {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

const aiTools: AITool[] = [
  {
    id: "matchmaker",
    title: "EmviMatch",
    tagline: "The perfect match, every time.",
    description: "Connects salons & artists automatically based on skills, location, and goals. No more wasted interviews or endless scrolling.",
    icon: Search,
    delay: 0.1
  },
  {
    id: "outreach",
    title: "EmviBoost",
    tagline: "Your brand, everywhere.",
    description: "Promotes posts across Google & social media, reaching beauty communities. Your business gets seen by the right people.",
    icon: RefreshCw,
    delay: 0.2
  },
  {
    id: "insight",
    title: "EmviPulse",
    tagline: "Data that makes sense.",
    description: "Tracks real-time data, bookings & performance. Shows you analytics: who viewed your post, where they're from, how to improve results.",
    icon: BarChart2,
    delay: 0.3
  },
  {
    id: "support",
    title: "EmviGuard",
    tagline: "Only the good stuff.",
    description: "Stops scam & spam automatically, like a 24/7 security guard powered by Emvi's intelligence. Your business stays protected.",
    icon: MessageCircle,
    delay: 0.4
  },
];

// Trust badge interface
interface TrustBadge {
  id: string;
  text: string;
}

const trustBadges: TrustBadge[] = [
  { id: "supabase", text: "Verified by Supabase" },
  { id: "seo", text: "SEO Optimized" },
  { id: "ai", text: "AI-Powered" },
  { id: "payments", text: "Secure Payments" },
  { id: "transparent", text: "100% Transparent" },
];

const AIPowerhouse = () => {
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
    <section className="py-24 bg-gradient-to-b from-[#FDFDFD] to-[#F9F9FF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute top-1/4 right-0 w-60 h-60 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-6 bg-primary/10 px-4 py-1.5 text-sm font-medium rounded-full border-primary/30 text-primary">
            AI-Powered Solutions
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif tracking-tight">
            Powered by AI, Built for Humans
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From finding talent to bringing customers to your door — EmviApp is powered by AI agents designed to help your beauty business grow without limits.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {aiTools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card className="h-full backdrop-blur-sm bg-white/90 border border-gray-100 shadow-xl shadow-gray-100/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden group">
                <CardContent className="p-8 relative">
                  <div 
                    className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"
                    aria-hidden="true"
                  />
                  
                  <div className="flex items-start mb-6 relative">
                    <div className="p-3 bg-primary/10 rounded-xl mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold font-serif">{tool.title}</h3>
                      <p className="text-gray-600 italic">{tool.tagline}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{tool.description}</p>
                  
                  <div className="mt-6 flex">
                    <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                      Premium Feature
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl font-serif italic border-t border-b py-8 px-4">
              "Our AI doesn't just find jobs — it builds careers and businesses."
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {trustBadges.map((badge) => (
              <Badge key={badge.id} variant="outline" className="bg-white py-1.5 px-3 text-sm shadow-sm">
                <Check className="h-4 w-4 mr-1.5 text-green-500" />
                {badge.text}
              </Badge>
            ))}
          </div>

          <Link to="/auth/signup">
            <Button 
              size="lg" 
              className="font-medium px-8 py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              Join EmviApp Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AIPowerhouse;

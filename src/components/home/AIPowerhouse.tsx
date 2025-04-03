
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
}

const aiTools: AITool[] = [
  {
    id: "matchmaker",
    title: "MatchMaker AI",
    tagline: "The perfect match, every time.",
    description: "Matches you with the perfect job or artist based on skills, location, and goals. No more wasted interviews or endless scrolling.",
    icon: Search,
  },
  {
    id: "outreach",
    title: "Outreach AI",
    tagline: "Your brand, everywhere.",
    description: "Automatically promotes your post to social media, search engines, and beauty communities. Your business gets seen by the right people.",
    icon: RefreshCw,
  },
  {
    id: "insight",
    title: "Insight AI",
    tagline: "Data that makes sense.",
    description: "Shows you analytics: who viewed your post, where they're from, how to improve results. Make decisions based on real data.",
    icon: BarChart2,
  },
  {
    id: "support",
    title: "Support AI",
    tagline: "24/7 service, no coffee breaks.",
    description: "Handles inquiries, DMs, follow-ups — like a 24/7 receptionist powered by Emvi's soul. Your customers always get a response.",
    icon: MessageCircle,
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
        staggerChildren: 0.2
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
    <section className="py-20 bg-[#FDFDFD]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif tracking-wide">
            Meet the AI Team That Works for You
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From finding talent to bringing customers to your door — EmviApp is powered by AI agents designed to help your beauty business grow without limits.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {aiTools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              className="h-full"
            >
              <Card className="h-full backdrop-blur-sm bg-white/80 border border-gray-100 transition-all hover:shadow-lg hover:scale-[1.02] duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-full mr-4">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold font-serif">{tool.title}</h3>
                      <p className="text-gray-600 italic">{tool.tagline}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{tool.description}</p>
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
          className="text-center mb-10"
        >
          <p className="text-xl font-bold border-t border-b py-6 max-w-3xl mx-auto">
            "Our AI doesn't just find jobs — it builds careers and businesses."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {trustBadges.map((badge) => (
              <Badge key={badge.id} variant="outline" className="bg-white py-1 px-3 text-sm">
                <Check className="h-4 w-4 mr-1 text-green-500" />
                {badge.text}
              </Badge>
            ))}
          </div>

          <Link to="/auth/signup">
            <Button size="lg" className="font-medium px-8 py-6">
              Join EmviApp Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AIPowerhouse;

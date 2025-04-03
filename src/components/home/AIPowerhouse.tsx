
import { Check, BarChart2, Brain, Bot, Rocket } from "lucide-react";
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
    id: "jobmatch",
    title: "JobMatch AI",
    tagline: "Finds your perfect match — instantly.",
    description: "Uses behavior data, specialties, and location to connect beauty artists with jobs they'll actually love — not random posts. No more endless scrolling. One click, and AI handles the rest.",
    icon: BarChart2,
  },
  {
    id: "salonradar",
    title: "SalonRadar AI",
    tagline: "Find the right person. Not just a résumé.",
    description: "AI helps salon owners screen candidates based on profile behavior, review scores, past bookings, and professional fit. Smarter hiring without wasting time.",
    icon: Brain,
  },
  {
    id: "postbooster",
    title: "PostBooster AI",
    tagline: "Get seen everywhere, even outside the app.",
    description: "Automatically optimizes your job or salon listing for Google SEO, local keywords, and social media sharing. This is how people find your post — even if they're not using EmviApp (yet).",
    icon: Rocket,
  },
  {
    id: "emvibot",
    title: "EmviBot Agent",
    tagline: "Works 24/7, so you don't have to.",
    description: "Your personal concierge that handles support, follow-ups, upsells, and onboarding. Built with natural language and smart workflows, EmviBot keeps your business running — even while you sleep.",
    icon: Bot,
  },
];

// Trust badge interface
interface TrustBadge {
  id: string;
  text: string;
}

const trustBadges: TrustBadge[] = [
  { id: "supabase", text: "Verified by Supabase" },
  { id: "seo", text: "SEO-friendly" },
  { id: "ai", text: "AI Built, Not Buzzword" },
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
            Meet the AI Powerhouse Behind EmviApp
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cutting-edge AI tools working behind the scenes to optimize your beauty business experience.
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
              <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] duration-300">
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
            "No fake AI. No gimmicks. Just powerful systems working behind the scenes to help you grow."
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
              Start using AI the easy way — with EmviApp
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AIPowerhouse;

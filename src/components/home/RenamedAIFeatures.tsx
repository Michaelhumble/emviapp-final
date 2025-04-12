
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Search, TrendingUp, ShieldCheck, HelpCircle } from "lucide-react";

interface AIFeature {
  id: string;
  title: string;
  oldName: string;
  icon: React.ElementType;
  description: string;
  iconColor: string;
  bgColor: string;
}

const aiFeatures: AIFeature[] = [
  {
    id: "perfectmatch",
    title: "PerfectMatch AI",
    oldName: "EmviMatch",
    icon: Search,
    description: "Matches artists with the right clients and salons with the perfect talent.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "safeconnect",
    title: "SafeConnect AI",
    oldName: "EmviGuard",
    icon: ShieldCheck,
    description: "Protects your information and filters out spam so you only connect with genuine opportunities.",
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "growthpulse",
    title: "GrowthPulse AI",
    oldName: "EmviPulse",
    icon: TrendingUp,
    description: "Analyzes your performance and suggests personalized ways to grow your business.",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: "posthelper",
    title: "PostHelper AI",
    oldName: "EmviSupport",
    icon: HelpCircle,
    description: "Assists you in creating effective job posts and service listings that get noticed.",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    id: "boostrank",
    title: "BoostRank AI",
    oldName: "EmviRank",
    icon: MessageCircle,
    description: "Increases your visibility across platforms and helps you rank higher in search results.",
    iconColor: "text-rose-500",
    bgColor: "bg-rose-50",
  },
];

const RenamedAIFeatures = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 px-4 py-1.5 text-sm font-medium rounded-full border-primary/30 text-primary">
            AI That Works For You
          </Badge>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-serif tracking-tight">
            <span className="text-2xl">💡</span> We've built smart AI tools to handle the stress — so you can focus on your craft
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full backdrop-blur-sm bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6 relative">
                  <div className="flex items-start mb-4">
                    <div className={`p-3 ${feature.bgColor} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold font-serif">{feature.title}</h3>
                      <p className="text-xs text-gray-500">formerly {feature.oldName}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RenamedAIFeatures;

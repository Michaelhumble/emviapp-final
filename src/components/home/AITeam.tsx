
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Megaphone, Shield, Bot } from "lucide-react";

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const aiFeatures: AIFeature[] = [
  {
    id: "rank",
    title: "EmviRank AI",
    description: "Gets your job posts ranked on Google & social media.",
    icon: Globe,
    color: "text-emerald-500 bg-emerald-100"
  },
  {
    id: "boost",
    title: "EmviBoost AI",
    description: "Automatically promotes your listings to the right people.",
    icon: Megaphone,
    color: "text-indigo-500 bg-indigo-100"
  },
  {
    id: "guard",
    title: "EmviGuard AI",
    description: "Stops spam, fake accounts, and keeps your info safe.",
    icon: Shield,
    color: "text-rose-500 bg-rose-100"
  },
  {
    id: "support",
    title: "EmviSupport AI",
    description: "A smart assistant that helps you post faster and better.",
    icon: Bot,
    color: "text-amber-500 bg-amber-100"
  }
];

const AITeam = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#FFFFFF] to-[#FAF5FF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="mb-6 bg-white px-4 py-1.5 text-sm font-medium rounded-full border-primary/30 text-primary shadow-sm">
            AI Powerhouse
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-6 text-foreground tracking-tight">
            🔥 Meet the AI Behind EmviApp
          </h2>
          <p className="text-xl font-inter font-medium text-foreground mb-4">
            This isn't just tech—it's your personal beauty business team.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-inter">
            From boosting your job post to ranking you on Google, our AI agents do the work for you. 
            Whether you're hiring, applying, or selling your salon—EmviApp's built-in AI makes sure you get seen, hired, and supported.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden group">
                <CardContent className="p-8 relative">
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/5 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                  
                  <div className={`w-16 h-16 rounded-xl ${feature.color.split(' ')[1]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.color.split(' ')[0]}`} />
                  </div>
                  
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground font-inter">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AITeam;

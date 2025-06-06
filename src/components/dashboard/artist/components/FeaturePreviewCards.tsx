
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, MessageCircle, Bot, Sparkles, BarChart3 } from "lucide-react";

const upcomingFeatures = [
  {
    id: "booking-system",
    title: "Smart Booking System",
    description: "Advanced calendar with automated scheduling and client reminders",
    icon: Calendar,
    gradient: "from-blue-500 to-purple-600",
    bgGradient: "from-blue-50 to-purple-50"
  },
  {
    id: "pos-system",
    title: "POS System",
    description: "Complete point-of-sale with payment processing and inventory",
    icon: CreditCard,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50"
  },
  {
    id: "messaging",
    title: "In-App Messaging",
    description: "Real-time chat with clients, photo sharing, and booking integration",
    icon: MessageCircle,
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-50 to-rose-50"
  },
  {
    id: "ai-chatbot",
    title: "AI Assistant",
    description: "Smart chatbot for customer service and appointment scheduling",
    icon: Bot,
    gradient: "from-violet-500 to-indigo-600",
    bgGradient: "from-violet-50 to-indigo-50"
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description: "Business insights, revenue tracking, and performance metrics",
    icon: BarChart3,
    gradient: "from-orange-500 to-amber-600",
    bgGradient: "from-orange-50 to-amber-50"
  },
  {
    id: "premium-features",
    title: "Premium Features",
    description: "Exclusive tools for verified artists and premium subscribers",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50"
  }
];

const FeaturePreviewCards = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Coming Soon Features
        </h2>
        <p className="text-gray-600">Get excited for these powerful tools coming to EmviApp</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingFeatures.map((feature) => {
          const IconComponent = feature.icon;
          
          return (
            <Card 
              key={feature.id}
              className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm`}
            >
              {/* Coming Soon Ribbon */}
              <div className="absolute top-3 right-3 z-10">
                <Badge 
                  variant="secondary" 
                  className={`bg-gradient-to-r ${feature.gradient} text-white border-0 shadow-md`}
                >
                  Coming Soon!
                </Badge>
              </div>

              {/* Glassmorphism Effect */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
              
              <CardContent className="relative z-10 p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Subtle Animation Elements */}
                <div className="mt-4 flex justify-end">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} animate-pulse`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturePreviewCards;

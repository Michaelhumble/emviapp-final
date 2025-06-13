
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, CreditCard, Calendar, BarChart3, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SponsorTeasers = () => {
  const features = [
    {
      id: 1,
      title: "AI-Powered POS Integration",
      description: "Seamlessly connect your existing point-of-sale system with EmviApp for automated booking management and client tracking.",
      icon: CreditCard,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
      votes: 342,
      category: "Business Tools"
    },
    {
      id: 2,
      title: "Smart SMS Marketing Suite",
      description: "Automated client reminders, promotional campaigns, and follow-up messages that increase retention by 40%.",
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=1000&auto=format&fit=crop",
      votes: 298,
      category: "Marketing"
    },
    {
      id: 3,
      title: "Advanced Analytics Dashboard",
      description: "Deep insights into client behavior, peak booking times, and revenue optimization opportunities.",
      icon: BarChart3,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      votes: 267,
      category: "Analytics"
    },
    {
      id: 4,
      title: "Team Collaboration Hub",
      description: "Internal communication tools, staff scheduling, and performance tracking for multi-artist salons.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
      votes: 234,
      category: "Team Management"
    },
    {
      id: 5,
      title: "Smart Appointment Optimization",
      description: "AI-driven scheduling that maximizes your booking efficiency and reduces no-shows by 60%.",
      icon: Calendar,
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1000&auto=format&fit=crop",
      votes: 189,
      category: "Scheduling"
    },
    {
      id: 6,
      title: "Instant Payment Processing",
      description: "Lightning-fast payments with multiple options including digital wallets, split payments, and tips.",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop",
      votes: 156,
      category: "Payments"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <Badge className="bg-orange-100 text-orange-800 mb-4 px-4 py-2">
            🔮 Coming Soon
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vote for Future Features
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Help shape the future of EmviApp! Vote for the features you want most. The top-voted features will be developed first with our sponsor partners.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Feature Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-gray-800">
                    {feature.category}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Voting Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {feature.votes} votes
                    </span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${Math.min((feature.votes / 350) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    Vote
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in Sponsoring?
          </h3>
          <p className="text-gray-600 mb-6">
            Partner with EmviApp to bring cutting-edge features to the beauty industry. 
            Your sponsorship helps us build the tools that salons and artists need most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Sponsor Partnership Info
            </Button>
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              View All Features
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorTeasers;

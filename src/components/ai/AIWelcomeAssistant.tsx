
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIWelcomeAssistant = () => {
  const { userRole, userProfile } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const getWelcomeContent = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return {
          title: "Welcome to Your Artist Hub! 🎨",
          subtitle: "Let's set up your creative space",
          steps: [
            { title: "Complete Your Profile", description: "Add your bio, specialties, and contact info" },
            { title: "Upload Portfolio", description: "Show off your best work" },
            { title: "Set Your Services", description: "List what you offer and pricing" },
            { title: "Go Live!", description: "Start accepting bookings" }
          ]
        };
      case 'salon':
      case 'owner':
        return {
          title: "Welcome to Your Salon Dashboard! 💼",
          subtitle: "Manage your business like a pro",
          steps: [
            { title: "Set Up Salon Profile", description: "Add your salon info and photos" },
            { title: "Add Your Team", description: "Invite artists and staff" },
            { title: "Create Services Menu", description: "List all services you offer" },
            { title: "Start Booking!", description: "Accept appointments and grow" }
          ]
        };
      case 'customer':
        return {
          title: "Welcome to EmviApp! ✨",
          subtitle: "Find your perfect beauty experience",
          steps: [
            { title: "Set Preferences", description: "Tell us what you're looking for" },
            { title: "Browse Artists", description: "Discover talent near you" },
            { title: "Book Services", description: "Schedule your appointments" },
            { title: "Leave Reviews", description: "Share your experience" }
          ]
        };
      case 'supplier':
      case 'beauty supplier':
        return {
          title: "Welcome, Beauty Supplier! 📦",
          subtitle: "Connect with salons and artists",
          steps: [
            { title: "Create Company Profile", description: "Showcase your products" },
            { title: "Upload Catalog", description: "Display your offerings" },
            { title: "Connect with Salons", description: "Build partnerships" },
            { title: "Manage Orders", description: "Track sales and deliveries" }
          ]
        };
      default:
        return {
          title: "Welcome to EmviApp! 🌟",
          subtitle: "Your beauty journey starts here",
          steps: [
            { title: "Complete Profile", description: "Tell us about yourself" },
            { title: "Explore Features", description: "Discover what's available" },
            { title: "Connect", description: "Find artists, salons, or suppliers" },
            { title: "Get Started", description: "Begin your beauty journey" }
          ]
        };
    }
  };

  if (!isExpanded) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
          size="lg"
        >
          <Bot className="h-5 w-5 mr-2" />
          AI Assistant
          <Sparkles className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    );
  }

  const content = getWelcomeContent();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {content.title}
                </CardTitle>
                <p className="text-gray-600 mt-1">{content.subtitle}</p>
              </div>
            </div>
            
            <Badge variant="secondary" className="w-fit">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Setup
            </Badge>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {content.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    currentStep === index 
                      ? 'bg-white shadow-sm border-2 border-purple-200' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep > index 
                      ? 'bg-green-500 text-white' 
                      : currentStep === index 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > index ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {currentStep === index && (
                    <ArrowRight className="h-4 w-4 text-purple-500" />
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={() => setCurrentStep(Math.min(currentStep + 1, content.steps.length - 1))}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={currentStep >= content.steps.length - 1}
              >
                {currentStep >= content.steps.length - 1 ? 'All Set!' : 'Next Step'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsExpanded(false)}
                className="px-6"
              >
                Later
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIWelcomeAssistant;

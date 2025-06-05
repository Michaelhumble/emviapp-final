
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Heart, Star, MessageCircle, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";

const CustomerPremiumActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBookAppointment = () => {
    // Navigate to artists page for booking
    navigate('/artists');
    toast.success("Browse artists to book your appointment!");
  };

  const handleExploreServices = () => {
    navigate('/artists');
    toast.info("Exploring available services...");
  };

  const handleSendMessage = () => {
    if (!user) {
      toast.error("Please sign in to send messages");
      return;
    }
    // Open chat or message center
    toast.info("Message feature coming soon!");
  };

  const handleSendEmail = () => {
    if (!user) {
      toast.error("Please sign in to send emails");
      return;
    }
    window.location.href = `mailto:support@emviapp.com?subject=Customer Support Request&body=Hello,%0D%0A%0D%0AI need help with...`;
  };

  const actionItems = [
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Find and book with top artists",
      color: "from-purple-500 to-pink-500",
      action: handleBookAppointment,
      priority: "high"
    },
    {
      icon: Search,
      title: "Explore Services",
      description: "Discover new beauty experiences",
      color: "from-blue-500 to-cyan-500",
      action: handleExploreServices,
      priority: "medium"
    },
    {
      icon: MessageCircle,
      title: "Send Message",
      description: "Chat with artists directly",
      color: "from-green-500 to-emerald-500",
      action: handleSendMessage,
      priority: "medium"
    },
    {
      icon: Mail,
      title: "Contact Support",
      description: "Get help via email",
      color: "from-orange-500 to-red-500",
      action: handleSendEmail,
      priority: "low"
    }
  ];

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">Quick Actions</h3>
          <p className="text-gray-600 text-sm">Everything you need at your fingertips</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actionItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-left flex flex-col items-start space-y-2 hover:shadow-md transition-all group"
                onClick={item.action}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} text-white group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerPremiumActions;

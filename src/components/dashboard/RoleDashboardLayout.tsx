
import { PropsWithChildren, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Zap, 
  Users, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Shield, 
  Star, 
  Video, 
  Package, 
  Leaf,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface RoleDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const comingSoonFeatures = [
  {
    icon: Zap,
    title: "Autopilot Salon Management",
    description: "Let Emvi run your schedule, payroll, and reminders—just flip the switch and relax.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Dream Team AI Talent Scout",
    description: "Find your next superstar before they're even looking—AI matches you with perfect stylists.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: TrendingUp,
    title: "Live Industry Benchmarking",
    description: "See how your pay rates, bookings, and reviews stack up against the city's best—live.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: DollarSign,
    title: "AI Price Optimizer",
    description: "Get AI-powered price recommendations based on your real data, reviews, and location.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: MapPin,
    title: "Salon Talent & Demand Map",
    description: "See where stylists and clients are trending in real-time. Expansion? You'll know first.",
    gradient: "from-red-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Smart Financial Safety Net",
    description: "Emvi warns you before cash flow drops, and helps you plan for taxes and expenses.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Star,
    title: "AI Review & Employee Recognition",
    description: "Automatic 'Employee of the Day' badges from 5-star reviews. Private negative feedback coach.",
    gradient: "from-amber-500 to-yellow-500"
  },
  {
    icon: Video,
    title: "Creator Mode: Salon TV & Story Studio",
    description: "Record, edit, and share your salon's best moments to TikTok, Instagram, and more—no editing skills needed.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Package,
    title: "Smart Supply Replenishment",
    description: "Never run out of anything—Emvi tracks, predicts, and reorders for you.",
    gradient: "from-teal-500 to-green-500"
  },
  {
    icon: Leaf,
    title: "Eco/Green Salon Certification",
    description: "Emvi tracks and certifies your sustainability, with rewards and marketing boosts for going green.",
    gradient: "from-green-600 to-emerald-600"
  }
];

const RoleDashboardLayout = ({ children, className = "" }: RoleDashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set());
  
  const handleVote = (featureTitle: string) => {
    setVotedFeatures(prev => new Set([...prev, featureTitle]));
    toast.success("Thank you! You'll be first to try this feature. 🎉", {
      description: "We'll notify you when it's ready!"
    });
  };

  const handleNotifyMe = (featureTitle: string) => {
    toast.success("You're on the list! 📧", {
      description: "We'll email you as soon as this feature launches."
    });
  };

  const scrollFeatures = (direction: 'left' | 'right') => {
    const container = document.getElementById('features-scroll');
    if (container) {
      const scrollAmount = 320;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-white ${className}`}>
      {/* Main Dashboard Container */}
      <div className={`${isMobile ? 'px-4 py-6' : 'px-6 py-8'} max-w-7xl mx-auto space-y-8`}>
        
        {/* Header Section - Greeting & Welcome */}
        <section className="dashboard-header">
          <div className="space-y-2">
            {/* Greeting will be rendered here by child components */}
          </div>
        </section>

        {/* FOMO Feature Gallery Section */}
        <section className="fomo-features-section">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-6 lg:p-8">
            
            {/* Gallery Header */}
            <div className="text-center space-y-4 mb-8">
              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                  🚀 Coming Soon
                </Badge>
                <Badge variant="outline" className="text-purple-600 border-purple-200">
                  Vote to Prioritize
                </Badge>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Revolutionary Features in Development
              </h3>
              
              <p className="text-gray-600 max-w-2xl mx-auto">
                🗳️ <strong>The features you vote for will be built first!</strong> Help us prioritize what matters most to your salon.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="relative">
              {/* Navigation Arrows */}
              {!isMobile && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                    onClick={() => scrollFeatures('left')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                    onClick={() => scrollFeatures('right')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Scrollable Container */}
              <div 
                id="features-scroll"
                className={`
                  ${isMobile ? 'grid grid-cols-1 gap-4' : 'flex gap-6 overflow-x-auto scrollbar-hide px-8'}
                  ${!isMobile ? 'scroll-smooth' : ''}
                `}
                style={!isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
              >
                {comingSoonFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  const hasVoted = votedFeatures.has(feature.title);
                  
                  return (
                    <Card 
                      key={index} 
                      className={`
                        ${isMobile ? 'w-full' : 'min-w-[300px] w-[300px]'}
                        relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 
                        bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm
                        hover:scale-105 group
                      `}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                      
                      <CardContent className="relative p-6 space-y-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        
                        {/* Content */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-gray-900 text-lg leading-tight">
                            {feature.title}
                          </h4>
                          
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className={`flex-1 ${hasVoted 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : `bg-gradient-to-r ${feature.gradient} hover:opacity-90`
                            } text-white shadow-md`}
                            onClick={() => handleVote(feature.title)}
                            disabled={hasVoted}
                          >
                            {hasVoted ? '✓ Voted' : '🗳️ Vote'}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-gray-200 hover:bg-gray-50"
                            onClick={() => handleNotifyMe(feature.title)}
                          >
                            🔔 Notify Me
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Live Core Widgets Section */}
        <section className="core-widgets-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Bookings & Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bookings-widget">
                  {/* Bookings content will be rendered here */}
                </div>
                <div className="stats-widget">
                  {/* Stats content will be rendered here */}
                </div>
              </div>

              {/* Team & Performance Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="team-widget">
                  {/* Team management content will be rendered here */}
                </div>
                <div className="performance-widget">
                  {/* Performance metrics will be rendered here */}
                </div>
              </div>

            </div>

            {/* Sidebar Area */}
            <div className="sidebar-area space-y-6">
              
              {/* Messages Widget */}
              <div className="messages-widget bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Messages</h4>
                {/* Messages content will be rendered here */}
              </div>

              {/* Quick Actions Widget */}
              <div className="quick-actions-widget bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                {/* Quick actions will be rendered here */}
              </div>

            </div>
          </div>
        </section>

        {/* Children Content - Existing Dashboard Components */}
        <section className="existing-content">
          {children}
        </section>

      </div>
    </div>
  );
};

export default RoleDashboardLayout;

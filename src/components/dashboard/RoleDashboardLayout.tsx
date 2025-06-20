
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Sparkles, 
  Bot, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Shield, 
  Star, 
  Camera, 
  Package, 
  Leaf,
  Calendar,
  MessageSquare,
  CreditCard,
  BarChart3,
  Clock,
  Settings,
  Plus,
  Eye,
  UserPlus
} from 'lucide-react';

// Inline Coming Soon Feature Component
const ComingSoonFeatureCard = ({ feature, onVote, onNotify }: { 
  feature: any; 
  onVote: () => void; 
  onNotify: () => void; 
}) => (
  <div className="min-w-[320px] bg-gradient-to-br from-white/80 to-purple-50/60 backdrop-blur-sm border border-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg`}>
        <feature.icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {feature.description}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={onVote}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Vote
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onNotify}
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            Notify Me
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Inline Coming Soon Section Card Component
const ComingSoonSectionCard = ({ title, description, icon: Icon }: {
  title: string;
  description: string;
  icon: any;
}) => (
  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
    <CardContent className="p-6 text-center">
      <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => toast.success("Thank you! You'll be first to know when this feature launches.")}
        className="border-purple-200 text-purple-600 hover:bg-purple-50"
      >
        Notify Me When Ready
      </Button>
    </CardContent>
  </Card>
);

const RoleDashboardLayout = () => {
  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set());

  // Coming Soon Features Data
  const comingSoonFeatures = [
    {
      id: "autopilot",
      title: "Autopilot Salon Management",
      description: "Let Emvi run your schedule, payroll, and reminders—just flip the switch and relax.",
      icon: Bot,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "talent-scout",
      title: "Dream Team AI Talent Scout",
      description: "Find your next superstar before they're even looking—AI matches you with perfect stylists.",
      icon: Users,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: "benchmarking",
      title: "Live Industry Benchmarking",
      description: "See how your pay rates, bookings, and reviews stack up against the city's best—live.",
      icon: TrendingUp,
      gradient: "from-orange-500 to-amber-600"
    },
    {
      id: "price-optimizer",
      title: "AI Price Optimizer",
      description: "Get AI-powered price recommendations based on your real data, reviews, and location.",
      icon: DollarSign,
      gradient: "from-pink-500 to-rose-600"
    },
    {
      id: "talent-map",
      title: "Salon Talent & Demand Map",
      description: "See where stylists and clients are trending in real-time. Expansion? You'll know first.",
      icon: BarChart3,
      gradient: "from-violet-500 to-indigo-600"
    },
    {
      id: "financial-safety",
      title: "Smart Financial Safety Net",
      description: "Emvi warns you before cash flow drops, and helps you plan for taxes and expenses.",
      icon: Shield,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      id: "ai-recognition",
      title: "AI Review & Employee Recognition",
      description: "Automatic 'Employee of the Day' badges from 5-star reviews. Private negative feedback coach.",
      icon: Star,
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      id: "creator-mode",
      title: "Creator Mode: Salon TV & Story Studio",
      description: "Record, edit, and share your salon's best moments to TikTok, Instagram, and more—no editing skills needed.",
      icon: Camera,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "supply-replenishment",
      title: "Smart Supply Replenishment",
      description: "Never run out of anything—Emvi tracks, predicts, and reorders for you.",
      icon: Package,
      gradient: "from-emerald-500 to-green-600"
    },
    {
      id: "eco-certification",
      title: "Eco/Green Salon Certification",
      description: "Emvi tracks and certifies your sustainability, with rewards and marketing boosts for going green.",
      icon: Leaf,
      gradient: "from-green-600 to-emerald-700"
    }
  ];

  const handleVote = (featureId: string) => {
    setVotedFeatures(prev => new Set([...prev, featureId]));
    toast.success("Thank you for voting! This feature just moved up in priority.");
  };

  const handleNotify = (featureId: string) => {
    toast.success("Thank you! You'll be first to try this feature when it launches.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Salon Dashboard</h1>
          <p className="text-gray-600">Manage your salon with premium tools and insights</p>
        </div>

        {/* Coming Soon Feature Gallery */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Coming Soon Features
            </h2>
            <p className="text-sm text-gray-600 mb-4">🏆 The features you vote for will be built first!</p>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {comingSoonFeatures.map((feature) => (
                <ComingSoonFeatureCard
                  key={feature.id}
                  feature={feature}
                  onVote={() => handleVote(feature.id)}
                  onNotify={() => handleNotify(feature.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="space-y-12">
          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                <Plus className="h-5 w-5 mr-2" />
                Add Appointment
              </Button>
              <Button variant="outline" className="h-16 border-purple-200 text-purple-600 hover:bg-purple-50">
                <UserPlus className="h-5 w-5 mr-2" />
                Invite Artist
              </Button>
              <Button variant="outline" className="h-16 border-purple-200 text-purple-600 hover:bg-purple-50">
                <Eye className="h-5 w-5 mr-2" />
                View Reports
              </Button>
              <Button variant="outline" className="h-16 border-purple-200 text-purple-600 hover:bg-purple-50">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Button>
            </div>
          </section>

          {/* Bookings Overview */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Bookings Overview
            </h2>
            <ComingSoonSectionCard
              title="Advanced Booking Management"
              description="Complete booking overview, calendar integration, and automated reminders coming soon."
              icon={Calendar}
            />
          </section>

          {/* My Team */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              My Team
            </h2>
            <ComingSoonSectionCard
              title="Team Management Hub"
              description="Manage your artists, track performance, and handle payroll all in one place."
              icon={Users}
            />
          </section>

          {/* Credit Balance & Pro Plan */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              Credit Balance & Pro Plan
            </h2>
            <ComingSoonSectionCard
              title="Premium Subscription Management"
              description="Manage your credits, upgrade plans, and unlock premium features."
              icon={CreditCard}
            />
          </section>

          {/* Quick Statistics */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Quick Statistics
            </h2>
            <ComingSoonSectionCard
              title="Business Analytics Dashboard"
              description="Real-time insights into revenue, bookings, and performance metrics."
              icon={BarChart3}
            />
          </section>

          {/* Availability Manager */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Availability Manager
            </h2>
            <ComingSoonSectionCard
              title="Smart Scheduling System"
              description="Manage your salon's availability, block time slots, and optimize scheduling."
              icon={Clock}
            />
          </section>

          {/* Messages & Internal Chat */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              Messages & Internal Chat
            </h2>
            <ComingSoonSectionCard
              title="Integrated Communication Hub"
              description="Chat with your team, communicate with clients, and manage all conversations."
              icon={MessageSquare}
            />
          </section>

          {/* Service Management */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-600" />
              Service Management
            </h2>
            <ComingSoonSectionCard
              title="Service Catalog Manager"
              description="Manage your services, pricing, and packages with smart recommendations."
              icon={Settings}
            />
          </section>

          {/* Reviews/Recognition */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              Reviews & Recognition
            </h2>
            <ComingSoonSectionCard
              title="Employee Recognition & Reviews"
              description="Track reviews, celebrate achievements, and boost team morale with automated recognition."
              icon={Star}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default RoleDashboardLayout;

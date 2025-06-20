
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Calendar,
  MessageSquare,
  Settings,
  Award,
  BarChart3,
  Clock,
  Briefcase,
  CreditCard,
  UserPlus
} from "lucide-react";

interface RoleDashboardLayoutProps {
  children?: React.ReactNode;
}

const RoleDashboardLayout: React.FC<RoleDashboardLayoutProps> = ({ children }) => {
  // Coming Soon Feature Gallery Component
  const ComingSoonFeatureGallery = () => {
    const features = [
      {
        id: 1,
        icon: <Zap className="h-6 w-6" />,
        title: "Autopilot Salon Management",
        description: "Let Emvi run your schedule, payroll, and reminders—just flip the switch and relax."
      },
      {
        id: 2,
        icon: <Users className="h-6 w-6" />,
        title: "Dream Team AI Talent Scout",
        description: "Find your next superstar before they're even looking—AI matches you with perfect stylists."
      },
      {
        id: 3,
        icon: <TrendingUp className="h-6 w-6" />,
        title: "Live Industry Benchmarking",
        description: "See how your pay rates, bookings, and reviews stack up against the city's best—live."
      },
      {
        id: 4,
        icon: <DollarSign className="h-6 w-6" />,
        title: "AI Price Optimizer",
        description: "Get AI-powered price recommendations based on your real data, reviews, and location."
      },
      {
        id: 5,
        icon: <MapPin className="h-6 w-6" />,
        title: "Salon Talent & Demand Map",
        description: "See where stylists and clients are trending in real-time. Expansion? You'll know first."
      },
      {
        id: 6,
        icon: <Shield className="h-6 w-6" />,
        title: "Smart Financial Safety Net",
        description: "Emvi warns you before cash flow drops, and helps you plan for taxes and expenses."
      },
      {
        id: 7,
        icon: <Star className="h-6 w-6" />,
        title: "AI Review & Employee Recognition",
        description: "Automatic 'Employee of the Day' badges from 5-star reviews. Private negative feedback coach."
      },
      {
        id: 8,
        icon: <Video className="h-6 w-6" />,
        title: "Creator Mode: Salon TV & Story Studio",
        description: "Record, edit, and share your salon's best moments to TikTok, Instagram, and more—no editing skills needed."
      },
      {
        id: 9,
        icon: <Package className="h-6 w-6" />,
        title: "Smart Supply Replenishment",
        description: "Never run out of anything—Emvi tracks, predicts, and reorders for you."
      },
      {
        id: 10,
        icon: <Leaf className="h-6 w-6" />,
        title: "Eco/Green Salon Certification",
        description: "Emvi tracks and certifies your sustainability, with rewards and marketing boosts for going green."
      }
    ];

    const handleVote = (featureTitle: string) => {
      toast.success(`Thank you! You'll be first to try ${featureTitle}.`);
    };

    const handleNotifyMe = (featureTitle: string) => {
      toast.success(`You'll be notified when ${featureTitle} launches!`);
    };

    return (
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Coming Soon Features
          </h2>
          <p className="text-sm text-gray-600 bg-yellow-50 px-4 py-2 rounded-full inline-block border border-yellow-200">
            ✨ The features you vote for will be built first!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto">
          {features.map((feature) => (
            <Card key={feature.id} className="min-w-[280px] bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-md"
                      onClick={() => handleVote(feature.title)}
                    >
                      Vote
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={() => handleNotifyMe(feature.title)}
                    >
                      Notify Me
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Coming Soon Card Component
  const ComingSoonCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-dashed border-2 border-gray-300">
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mx-auto mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-lg text-gray-700 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <Button
          size="sm"
          variant="outline"
          className="border-gray-300 text-gray-600 hover:bg-gray-50"
          onClick={() => toast.success("You'll be notified when this feature launches!")}
        >
          Notify Me
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Coming Soon Feature Gallery */}
        <ComingSoonFeatureGallery />

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-purple-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <UserPlus className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium">Add Team Member</h3>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium">Schedule Appointment</h3>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Briefcase className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium">Post Job</h3>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <h3 className="font-medium">Salon Settings</h3>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bookings Overview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            Bookings Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Today's Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <Badge variant="outline" className="mt-1">+3 from yesterday</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">89</div>
                <Badge variant="outline" className="mt-1">+15% from last week</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Next Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-orange-600">Tomorrow 2:30 PM</div>
                <Badge variant="outline" className="mt-1">Sarah K.</Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Team */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-600" />
            My Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <p className="text-sm text-gray-500">Senior Stylist</p>
                    <Badge variant="outline" className="mt-1 text-xs">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Mike Chen</h3>
                    <p className="text-sm text-gray-500">Color Specialist</p>
                    <Badge variant="outline" className="mt-1 text-xs">Busy</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Emma Davis</h3>
                    <p className="text-sm text-gray-500">Junior Stylist</p>
                    <Badge variant="outline" className="mt-1 text-xs">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Credit Balance & Pro Plan */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
            Credit Balance & Pro Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
                  Credit Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">245</div>
                <p className="text-sm text-gray-500 mb-4">Credits available</p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Buy More Credits
                </Button>
              </CardContent>
            </Card>
            <Card className="border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Pro Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="mb-2 bg-yellow-500">Upgrade Available</Badge>
                <p className="text-sm text-gray-600 mb-4">Unlock unlimited features</p>
                <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Statistics */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
            Quick Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-xl font-bold text-green-600">$12,450</div>
                <p className="text-sm text-gray-500">This Month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-xl font-bold text-blue-600">156</div>
                <p className="text-sm text-gray-500">Clients Served</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                <div className="text-xl font-bold text-yellow-600">4.8</div>
                <p className="text-sm text-gray-500">Average Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-xl font-bold text-purple-600">85%</div>
                <p className="text-sm text-gray-500">Booking Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Availability Manager */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-600" />
            Availability Manager
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-medium text-gray-700 mb-2">Manage Your Availability</h3>
                <p className="text-sm text-gray-500 mb-4">Set your working hours and time off</p>
                <Button>Update Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages & Internal Chat */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
            Messages & Internal Chat
          </h2>
          <ComingSoonCard
            title="Team Communication Hub"
            description="Chat with your team, share updates, and coordinate schedules—all in one place."
            icon={<MessageSquare className="h-6 w-6" />}
          />
        </div>

        {/* Service Management */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-purple-600" />
            Service Management
          </h2>
          <ComingSoonCard
            title="Service Menu Builder"
            description="Create, edit, and manage your salon's service offerings with pricing and duration."
            icon={<Settings className="h-6 w-6" />}
          />
        </div>

        {/* Reviews/Recognition */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-purple-600" />
            Reviews & Recognition
          </h2>
          <ComingSoonCard
            title="Employee of the Month & Reviews"
            description="Celebrate your team's achievements and manage customer feedback effortlessly."
            icon={<Award className="h-6 w-6" />}
          />
        </div>

        {/* Render children if provided */}
        {children}
      </div>
    </div>
  );
};

export default RoleDashboardLayout;

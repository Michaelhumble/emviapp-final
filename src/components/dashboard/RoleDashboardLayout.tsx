
import { PropsWithChildren } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
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
  BarChart3,
  MessageSquare,
  Settings,
  Award,
  CreditCard,
  Clock,
  UserPlus
} from "lucide-react";

interface RoleDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const RoleDashboardLayout = ({ children, className = "" }: RoleDashboardLayoutProps) => {
  const isMobile = useIsMobile();

  const handleVote = (featureName: string) => {
    toast.success(`Thank you for voting for ${featureName}! You'll be first to try this feature.`);
  };

  const handleNotifyMe = (featureName: string) => {
    toast.success(`We'll notify you when ${featureName} is ready!`);
  };

  // Inline Coming Soon Card Component
  const ComingSoonCard = ({ 
    title, 
    description, 
    icon: Icon, 
    showVoting = false 
  }: { 
    title: string; 
    description: string; 
    icon: any; 
    showVoting?: boolean;
  }) => (
    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5" />
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <Badge variant="secondary" className="mt-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
              Coming Soon
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative pt-0">
        <p className="text-gray-600 mb-4">{description}</p>
        {showVoting && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleVote(title)}
              className="flex-1"
            >
              Vote
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNotifyMe(title)}
              className="flex-1"
            >
              Notify Me
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Section Header Component
  const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );

  const comingSoonFeatures = [
    {
      icon: Zap,
      title: "Autopilot Salon Management",
      description: "Let Emvi run your schedule, payroll, and reminders—just flip the switch and relax."
    },
    {
      icon: Users,
      title: "Dream Team AI Talent Scout",
      description: "Find your next superstar before they're even looking—AI matches you with perfect stylists."
    },
    {
      icon: TrendingUp,
      title: "Live Industry Benchmarking",
      description: "See how your pay rates, bookings, and reviews stack up against the city's best—live."
    },
    {
      icon: DollarSign,
      title: "AI Price Optimizer",
      description: "Get AI-powered price recommendations based on your real data, reviews, and location."
    },
    {
      icon: MapPin,
      title: "Salon Talent & Demand Map",
      description: "See where stylists and clients are trending in real-time. Expansion? You'll know first."
    },
    {
      icon: Shield,
      title: "Smart Financial Safety Net",
      description: "Emvi warns you before cash flow drops, and helps you plan for taxes and expenses."
    },
    {
      icon: Star,
      title: "AI Review & Employee Recognition",
      description: "Automatic 'Employee of the Day' badges from 5-star reviews. Private negative feedback coach."
    },
    {
      icon: Video,
      title: "Creator Mode: Salon TV & Story Studio",
      description: "Record, edit, and share your salon's best moments to TikTok, Instagram, and more—no editing skills needed."
    },
    {
      icon: Package,
      title: "Smart Supply Replenishment",
      description: "Never run out of anything—Emvi tracks, predicts, and reorders for you."
    },
    {
      icon: Leaf,
      title: "Eco/Green Salon Certification",
      description: "Emvi tracks and certifies your sustainability, with rewards and marketing boosts for going green."
    }
  ];
  
  return (
    <div className={`${isMobile ? 'px-4 py-6' : 'px-6 py-8'} max-w-7xl mx-auto ${className}`}>
      {/* Coming Soon Feature Gallery */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            🚀 Coming Soon Features
          </h1>
          <p className="text-gray-600 text-lg">The features you vote for will be built first!</p>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {comingSoonFeatures.map((feature, index) => (
              <div key={index} className="w-80 flex-shrink-0">
                <Card className="h-full relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30 border-purple-200/50 hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5" />
                  <CardHeader className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-medium">
                        Coming Soon
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleVote(feature.title)}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Vote
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleNotifyMe(feature.title)}
                        className="flex-1 border-purple-200 hover:bg-purple-50 font-medium transition-all duration-300"
                      >
                        Notify Me
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <SectionHeader 
          title="Quick Actions" 
          subtitle="Essential salon management tools at your fingertips"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <UserPlus className="h-8 w-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2">Add Appointment</h3>
              <Button size="sm" className="w-full">Book Now</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-green-500" />
              <h3 className="font-semibold mb-2">Invite Staff</h3>
              <Button size="sm" variant="outline" className="w-full">Invite</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-purple-500" />
              <h3 className="font-semibold mb-2">View Schedule</h3>
              <Button size="sm" variant="outline" className="w-full">Open</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold mb-2">Analytics</h3>
              <Button size="sm" variant="outline" className="w-full">View</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bookings Overview */}
      <section className="mb-12">
        <SectionHeader 
          title="Bookings Overview" 
          subtitle="Track your appointments and revenue"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Hair Cut & Color - 2:00 PM</p>
                  </div>
                  <Badge variant="secondary">Today</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Mike Chen</p>
                    <p className="text-sm text-gray-600">Beard Trim - 3:30 PM</p>
                  </div>
                  <Badge variant="secondary">Today</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Emily Davis</p>
                    <p className="text-sm text-gray-600">Manicure - 10:00 AM</p>
                  </div>
                  <Badge variant="outline">Tomorrow</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Today's Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">$1,240</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Appointment</p>
                  <p className="font-medium">2:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* My Team */}
      <section className="mb-12">
        <SectionHeader 
          title="My Team" 
          subtitle="Manage your staff and their performance"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                JS
              </div>
              <h3 className="font-semibold mb-1">Jessica Smith</h3>
              <p className="text-sm text-gray-600 mb-2">Senior Stylist</p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">Available</Badge>
                <Badge variant="outline">5★</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                MT
              </div>
              <h3 className="font-semibold mb-1">Maria Torres</h3>
              <p className="text-sm text-gray-600 mb-2">Nail Technician</p>
              <div className="flex justify-center gap-2">
                <Badge variant="destructive">Busy</Badge>
                <Badge variant="outline">4.9★</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                AL
              </div>
              <h3 className="font-semibold mb-1">Alex Lee</h3>
              <p className="text-sm text-gray-600 mb-2">Barber</p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">Available</Badge>
                <Badge variant="outline">4.8★</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Credit Balance & Pro Plan */}
      <section className="mb-12">
        <SectionHeader 
          title="Credit Balance & Pro Plan" 
          subtitle="Manage your subscription and credits"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                Credit Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">250 Credits</div>
              <p className="text-gray-600 mb-4">Use credits to boost your listings and unlock premium features</p>
              <Button className="w-full">Purchase More Credits</Button>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-500" />
                Pro Plan Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">PRO</Badge>
                <span className="font-semibold">Active</span>
              </div>
              <p className="text-gray-600 mb-4">Expires in 24 days</p>
              <Button variant="outline" className="w-full">Manage Subscription</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="mb-12">
        <SectionHeader 
          title="Quick Statistics" 
          subtitle="Your salon's performance at a glance"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">28</div>
              <p className="text-sm text-gray-600">This Week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">$8.2k</div>
              <p className="text-sm text-gray-600">Revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">156</div>
              <p className="text-sm text-gray-600">Clients</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">4.9</div>
              <p className="text-sm text-gray-600">Rating</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Availability Manager */}
      <section className="mb-12">
        <SectionHeader 
          title="Availability Manager" 
          subtitle="Set your salon hours and staff schedules"
        />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Salon Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Current Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-red-600">Closed</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Edit Hours
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Block Time Off
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Staff Schedules
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Messages & Internal Chat */}
      <section className="mb-12">
        <SectionHeader 
          title="Messages & Internal Chat" 
          subtitle="Stay connected with your team and clients"
        />
        <ComingSoonCard
          title="Advanced Team Communication Hub"
          description="Real-time chat with your team, client messaging system, and automated appointment reminders all in one place."
          icon={MessageSquare}
          showVoting={true}
        />
      </section>

      {/* Service Management */}
      <section className="mb-12">
        <SectionHeader 
          title="Service Management" 
          subtitle="Manage your salon's services and pricing"
        />
        <ComingSoonCard
          title="Smart Service Manager"
          description="AI-powered service recommendations, dynamic pricing based on demand, and automated service package creation."
          icon={Settings}
          showVoting={true}
        />
      </section>

      {/* Reviews/Recognition */}
      <section className="mb-12">
        <SectionHeader 
          title="Reviews & Recognition" 
          subtitle="Celebrate your team's achievements"
        />
        <ComingSoonCard
          title="Employee Recognition Center"
          description="Automatic 'Employee of the Month' selection based on client reviews, performance tracking, and team achievement badges."
          icon={Award}
          showVoting={true}
        />
      </section>

      {/* Original Children Content */}
      {children}
    </div>
  );
};

export default RoleDashboardLayout;

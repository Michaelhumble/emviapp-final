
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Users, 
  Briefcase, 
  Star, 
  ArrowRightLeft, 
  Shield, 
  Brain,
  Sparkles,
  Lock
} from "lucide-react";

const SalonFutureFeatures = () => {
  console.log('🟪 SalonFutureFeatures component loaded - TEASER ONLY');

  const futureFeatures = [
    {
      icon: ArrowRightLeft,
      title: "Work Freedom Module",
      subtitle: "Revolutionary Artist Mobility",
      description: "Artists receive offers from other salons while working at yours. First-ever system for flexible artist movement.",
      badge: "Secret Weapon",
      badgeColor: "bg-purple-100 text-purple-800",
      cardColor: "border-purple-200 bg-purple-50/50",
      comingSoon: "Q3 2025"
    },
    {
      icon: Brain,
      title: "AI-Powered Matchmaking",
      subtitle: "Smart Salon-Artist Matching",
      description: "Our AI analyzes skills, preferences, and location to match artists with perfect salon opportunities.",
      badge: "Game Changer",
      badgeColor: "bg-blue-100 text-blue-800",
      cardColor: "border-blue-200 bg-blue-50/50",
      comingSoon: "Q4 2025"
    },
    {
      icon: Shield,
      title: "Universal Support System",
      subtitle: "We Handle Everything Technical",
      description: "EmviApp manages all technical, accounting, payroll, and marketing so you focus purely on your craft.",
      badge: "Industry First",
      badgeColor: "bg-green-100 text-green-800",
      cardColor: "border-green-200 bg-green-50/50",
      comingSoon: "2026"
    },
    {
      icon: Briefcase,
      title: "Portable Artist Portfolios",
      subtitle: "Never Locked In Again",
      description: "Artists carry their profiles, reviews, and offers between salons. Complete professional freedom.",
      badge: "Revolutionary",
      badgeColor: "bg-amber-100 text-amber-800",
      cardColor: "border-amber-200 bg-amber-50/50",
      comingSoon: "2026"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center py-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-purple-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900 font-playfair">Coming Soon Features</h2>
          <Sparkles className="h-8 w-8 text-purple-500 ml-3" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The future of salon-artist relationships is coming. Revolutionary features that will change how the beauty industry works forever.
        </p>
        <Badge className="mt-4 bg-purple-600 text-white px-4 py-2 text-sm">
          <Lock className="h-4 w-4 mr-2" />
          Exclusive Preview - Not Yet Available
        </Badge>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {futureFeatures.map((feature, index) => (
          <Card key={index} className={`${feature.cardColor} hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4">
              <Badge className={feature.badgeColor}>
                {feature.badge}
              </Badge>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <feature.icon className="h-6 w-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                  <p className="text-sm font-medium text-gray-600 mt-1">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-gray-700 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Expected: {feature.comingSoon}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                  className="cursor-not-allowed opacity-75"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Coming Soon
                </Button>
              </div>
            </CardContent>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
        <CardContent className="py-8 text-center">
          <Star className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-3">Be First to Access These Features</h3>
          <p className="text-purple-100 mb-6 max-w-lg mx-auto">
            Active salon owners will get priority access to these revolutionary features. Keep using EmviApp to secure your spot!
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
            <Users className="h-4 w-4 mr-2" />
            Join Priority List
          </Button>
        </CardContent>
      </Card>

      {/* Debug marker */}
      <div className="text-xs text-purple-500 text-center border-t pt-4">
        🟪 Future Features Component | All Features: TEASER ONLY - NOT FUNCTIONAL | Debug: Active
      </div>
    </div>
  );
};

export default SalonFutureFeatures;


import { ReactNode } from "react";
import { useAuth } from "@/context/auth";
import { getPersonalizedGreeting } from "@/utils/navigation";
import { 
  Sparkles, Scissors, Building2, User, Briefcase, 
  ShoppingBag, HelpCircle, Star 
} from "lucide-react";

interface RoleDashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

const RoleDashboardLayout = ({ children, className = "" }: RoleDashboardLayoutProps) => {
  const { userRole, userProfile } = useAuth();
  
  // Get motivational quotes based on role
  const getMotivationalQuote = () => {
    const quotes = {
      artist: [
        "Your creativity changes lives 💖",
        "Every nail tells a story ✨",
        "Your art matters 🎨"
      ],
      salon: [
        "Building beauty businesses that last 🏆",
        "Creating spaces for artists to shine ✨",
        "Leading with excellence 🌟"
      ],
      customer: [
        "Look good, feel good 💃",
        "Beauty is your superpower ✨",
        "Self-care is never selfish 🧖‍♀️"
      ],
      supplier: [
        "Quality tools create masterpieces 🛠️",
        "Empowering artists with the best ✨",
        "Innovation drives the industry forward 🚀"
      ],
      freelancer: [
        "Freedom to create on your terms 🦅",
        "Your skills, your schedule, your success ⏰",
        "Building a business that works for you 💼"
      ]
    };
    
    const roleKey = userRole as keyof typeof quotes || "artist";
    const roleQuotes = quotes[roleKey] || quotes.artist;
    
    return roleQuotes[Math.floor(Math.random() * roleQuotes.length)];
  };
  
  // Get role-specific styling
  const getRoleIcon = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return <Scissors className="h-5 w-5 text-purple-500" />;
      case 'salon':
      case 'owner':
        return <Building2 className="h-5 w-5 text-blue-500" />;
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        return <ShoppingBag className="h-5 w-5 text-emerald-500" />;
      case 'freelancer':
        return <Briefcase className="h-5 w-5 text-amber-500" />;
      case 'customer':
        return <Star className="h-5 w-5 text-rose-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get role-specific accent color
  const getRoleAccentColor = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return "border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50";
      case 'salon':
      case 'owner':
        return "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50";
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        return "border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50";
      case 'freelancer':
        return "border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50";
      case 'customer':
        return "border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50";
      default:
        return "border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50";
    }
  };
  
  const userName = userProfile?.full_name || userProfile?.salon_name || "there";
  const greeting = getPersonalizedGreeting(userName, userRole);
  const quote = getMotivationalQuote();
  
  return (
    <div className={`${className}`}>
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{greeting}</h1>
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm ${getRoleAccentColor()} border`}>
            {getRoleIcon()}
            <span className="ml-2 font-medium">{userRole}</span>
            <Sparkles className="h-4 w-4 ml-2 text-amber-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 p-3 rounded-lg border border-indigo-100 text-center">
          <p className="text-gray-700 flex items-center justify-center">
            <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
            <span className="italic">{quote}</span>
            <Sparkles className="h-4 w-4 ml-2 text-amber-400" />
          </p>
        </div>
      </div>
      
      <div className={`rounded-xl overflow-hidden border ${getRoleAccentColor()}`}>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RoleDashboardLayout;

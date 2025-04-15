
import { Button } from "@/components/ui/button";
import { 
  BriefcaseBusiness, 
  ScrollText, 
  Search, 
  ShoppingBag, 
  Camera, 
  Users, 
  Settings, 
  Calendar 
} from "lucide-react";
import { Link } from "react-router-dom";

interface SalonFeatureCardsGridProps {
  credits?: number;
}

const SalonFeatureCardsGrid = ({ credits = 0 }: SalonFeatureCardsGridProps) => {
  // Features for salon owners
  const features = [
    {
      title: "Post a Job",
      description: "Find qualified nail technicians",
      icon: BriefcaseBusiness,
      link: "/jobs/post",
      highlight: true
    },
    {
      title: "Manage Listings",
      description: "Control your job postings",
      icon: ScrollText,
      link: "/dashboard/jobs"
    },
    {
      title: "Staff Directory",
      description: "Manage your team",
      icon: Users,
      link: "/dashboard/staff"
    },
    {
      title: "Bookings",
      description: "Track appointments",
      icon: Calendar,
      link: "/dashboard/bookings"
    },
    {
      title: "Browse Artists",
      description: "Discover talented professionals",
      icon: Search,
      link: "/artists"
    },
    {
      title: "Sell Your Salon",
      description: credits > 0 ? `You have ${credits} credits` : "List your business for sale",
      icon: ShoppingBag,
      link: "/salon/sell",
      credits: credits
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <div 
          key={index}
          className={`bg-white rounded-lg border ${feature.highlight ? 'border-indigo-200 shadow-sm' : 'border-gray-100'} 
                      p-5 flex flex-col h-full`}
        >
          <div className="flex items-start gap-3 mb-3">
            <div className={`rounded-full p-2 ${feature.highlight ? 'bg-indigo-100' : 'bg-gray-100'}`}>
              <feature.icon className={`h-5 w-5 ${feature.highlight ? 'text-indigo-600' : 'text-gray-600'}`} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
              
              {feature.credits !== undefined && feature.credits > 0 && (
                <span className="inline-block px-2 py-1 mt-2 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  {feature.credits} credits available
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-auto pt-3">
            <Button 
              variant={feature.highlight ? "default" : "outline"} 
              size="sm" 
              className={feature.highlight ? "bg-indigo-600 hover:bg-indigo-700 w-full" : "w-full"}
              asChild
            >
              <Link to={feature.link}>
                {feature.highlight ? "Post Now" : "View"}
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalonFeatureCardsGrid;


import { motion } from "framer-motion";
import { 
  Star, 
  Users, 
  Shield, 
  Clock, 
  ArrowUpRight, 
  Calendar 
} from "lucide-react";

interface ProfileHighlightsProps {
  stats: {
    rating: number;
    clients: number;
    completionRate: number;
    responseTime: string;
    repeatClients: number;
    experience: string;
  };
}

const ProfileHighlights = ({ stats }: ProfileHighlightsProps) => {
  const items = [
    {
      label: "Rating",
      value: `${stats.rating}/5`,
      icon: <Star className="h-4 w-4 text-amber-500" />,
      color: "bg-amber-50 border-amber-100",
    },
    {
      label: "Happy Clients",
      value: stats.clients.toString(),
      icon: <Users className="h-4 w-4 text-blue-500" />,
      color: "bg-blue-50 border-blue-100",
    },
    {
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      icon: <Shield className="h-4 w-4 text-emerald-500" />,
      color: "bg-emerald-50 border-emerald-100",
    },
    {
      label: "Response Time",
      value: stats.responseTime,
      icon: <Clock className="h-4 w-4 text-purple-500" />,
      color: "bg-purple-50 border-purple-100",
    },
    {
      label: "Repeat Clients",
      value: `${stats.repeatClients}%`,
      icon: <ArrowUpRight className="h-4 w-4 text-rose-500" />,
      color: "bg-rose-50 border-rose-100",
    },
    {
      label: "Experience",
      value: stats.experience,
      icon: <Calendar className="h-4 w-4 text-indigo-500" />,
      color: "bg-indigo-50 border-indigo-100",
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl overflow-hidden border border-gray-100 shadow-sm"
    >
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-800">Professional Highlights</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-6 bg-white">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border ${item.color}`}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white mb-2 shadow-sm">
              {item.icon}
            </div>
            <span className="font-medium text-lg">{item.value}</span>
            <span className="text-xs text-gray-500 mt-1">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileHighlights;

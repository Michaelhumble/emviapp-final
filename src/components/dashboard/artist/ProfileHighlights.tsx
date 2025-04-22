
import { motion } from "framer-motion";
import { Star, Clock, Users, Award, ThumbsUp, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProfileHighlightProps } from "@/types/artist";

const ProfileHighlights = ({ stats }: ProfileHighlightProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Define highlights with icons and values
  const highlights = [
    {
      label: "Rating",
      value: stats.rating ? `${stats.rating.toFixed(1)}/5.0` : "New",
      icon: <Star className="h-5 w-5 text-amber-500" />,
      className: "from-amber-50 to-orange-50 border-amber-100"
    },
    {
      label: "Response Time",
      value: stats.responseTime || "< 24hrs",
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      className: "from-blue-50 to-indigo-50 border-blue-100"
    },
    {
      label: "Happy Clients",
      value: stats.clients || "0",
      icon: <Users className="h-5 w-5 text-indigo-500" />,
      className: "from-indigo-50 to-purple-50 border-indigo-100"
    },
    {
      label: "Completion Rate",
      value: stats.completionRate ? `${stats.completionRate}%` : "N/A",
      icon: <ThumbsUp className="h-5 w-5 text-green-500" />,
      className: "from-green-50 to-emerald-50 border-green-100"
    },
    {
      label: "Repeat Clients",
      value: stats.repeatClients ? `${stats.repeatClients}%` : "N/A",
      icon: <Award className="h-5 w-5 text-purple-500" />,
      className: "from-purple-50 to-pink-50 border-purple-100"
    },
    {
      label: "Experience",
      value: stats.experience || "New Artist",
      icon: <Calendar className="h-5 w-5 text-pink-500" />,
      className: "from-pink-50 to-rose-50 border-pink-100"
    }
  ];

  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm">
      <CardContent className="p-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              className={cn(
                "rounded-xl border p-4 flex items-center bg-gradient-to-br shadow-sm",
                highlight.className
              )}
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="mr-3 rounded-full bg-white p-2 shadow-sm">
                {highlight.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  {highlight.label}
                </h4>
                <p className="text-base font-semibold mt-1">
                  {highlight.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ProfileHighlights;

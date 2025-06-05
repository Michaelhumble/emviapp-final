
import { motion } from "framer-motion";
import { UserRole } from "@/context/auth/types";
import { Users, Paintbrush, Building2, User } from "lucide-react";

interface RoleSelectionCardsProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

const RoleSelectionCards = ({ selectedRole, onChange }: RoleSelectionCardsProps) => {
  const roles = [
    {
      key: "customer" as UserRole,
      title: "Beauty Enthusiast",
      description: "Book appointments & discover services",
      icon: User,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      key: "artist" as UserRole,
      title: "Nail Artist",
      description: "Showcase your skills & grow your clientele",
      icon: Paintbrush,
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      key: "salon" as UserRole,
      title: "Salon Owner",
      description: "Manage your business & hire talent",
      icon: Building2,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      key: "freelancer" as UserRole,
      title: "Freelancer",
      description: "Work independently & build your brand",
      icon: Users,
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Choose Your Role
      </h3>
      
      <motion.div 
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.key;
          
          return (
            <motion.div
              key={role.key}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg shadow-indigo-100'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => onChange(role.key)}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
              
              {/* Icon with gradient background */}
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${role.gradient} p-2 mb-3 mx-auto`}>
                <Icon className="w-full h-full text-white" />
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h4 className={`font-semibold text-sm mb-1 ${
                  isSelected ? 'text-indigo-900' : 'text-gray-900'
                }`}>
                  {role.title}
                </h4>
                <p className={`text-xs leading-tight ${
                  isSelected ? 'text-indigo-700' : 'text-gray-600'
                }`}>
                  {role.description}
                </p>
              </div>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${role.gradient} opacity-0 transition-opacity duration-300 ${
                !isSelected ? 'group-hover:opacity-5' : ''
              }`} />
            </motion.div>
          );
        })}
      </motion.div>
      
      <p className="text-xs text-gray-500 text-center mt-4 italic">
        You can change your role anytime in your profile settings
      </p>
    </div>
  );
};

export default RoleSelectionCards;

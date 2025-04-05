
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";

const UserProfileBanner = () => {
  const { userProfile } = useAuth();
  const firstName = userProfile?.full_name?.split(' ')[0] || 'there';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100 mb-8"
    >
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="font-serif text-2xl md:text-3xl text-gray-800">
          Welcome back, <span className="font-semibold text-primary">{firstName}</span> — your beauty journey starts here.
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Express yourself, connect with clients, and grow your presence in the beauty community.
        </p>
      </div>
    </motion.div>
  );
};

export default UserProfileBanner;

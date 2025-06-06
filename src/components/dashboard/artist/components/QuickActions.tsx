
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, MessageSquare, Camera, Settings } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { icon: Plus, label: "New Booking", color: "from-purple-500 to-pink-500" },
    { icon: Calendar, label: "Schedule", color: "from-blue-500 to-cyan-500" },
    { icon: MessageSquare, label: "Messages", color: "from-green-500 to-emerald-500" },
    { icon: Camera, label: "Portfolio", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="sm"
            className={`bg-gradient-to-r ${action.color} hover:shadow-lg text-white border-0 shadow-md transition-all duration-300 font-medium group`}
          >
            <action.icon className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            {action.label}
          </Button>
        </motion.div>
      ))}
      
      {/* Settings Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="sm"
          variant="outline"
          className="border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 backdrop-blur-sm bg-white/80"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </motion.div>
    </div>
  );
};

export default QuickActions;

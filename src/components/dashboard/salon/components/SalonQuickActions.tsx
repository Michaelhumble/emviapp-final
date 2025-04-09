
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  TrendingUp, 
  Store, 
  Building, 
  Users, 
  Settings,
  Mail
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SalonQuickActions = () => {
  const { t } = useTranslation();
  
  const handlePlaceholderAction = (action: string) => {
    toast.info(`${action} feature coming soon!`);
  };
  
  // Array of quick action cards
  const quickActions = [
    {
      title: t("Post a New Job"),
      description: t("Find talent for your salon"),
      icon: <PlusCircle className="h-6 w-6" />,
      link: "/post/job",
      variant: "active",
      badge: "HOT",
      badgeColor: "bg-green-500"
    },
    {
      title: t("Boost Visibility"),
      description: t("Increase your reach"),
      icon: <TrendingUp className="h-6 w-6" />,
      link: "/boost/salon",
      variant: "active"
    },
    {
      title: t("List Salon for Sale"),
      description: t("Create a business listing"),
      icon: <Store className="h-6 w-6" />,
      onClick: () => handlePlaceholderAction(t("List Salon for Sale")),
      variant: "placeholder"
    },
    {
      title: t("Manage Staff"),
      description: t("Track your team"),
      icon: <Users className="h-6 w-6" />,
      onClick: () => handlePlaceholderAction(t("Staff Management")),
      variant: "placeholder"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          whileHover={{ scale: 1.02 }}
          className="flex"
        >
          <Card className={`w-full border ${
            action.variant === 'active' 
              ? 'border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50'
              : 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100'
          }`}>
            <CardContent className="p-6 flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div className={`rounded-lg p-2 ${
                    action.variant === 'active' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {action.icon}
                  </div>
                  
                  {action.badge && (
                    <span className={`${action.badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                      {action.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="mt-4 text-lg font-semibold">{action.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{action.description}</p>
              </div>
              
              <div className="mt-5">
                {action.link ? (
                  <Button 
                    asChild 
                    className={action.variant === 'active' ? 'bg-blue-600 hover:bg-blue-700 w-full' : 'bg-gray-600 w-full'}
                  >
                    <Link to={action.link}>{t("Start Now")}</Link>
                  </Button>
                ) : (
                  <Button 
                    onClick={action.onClick}
                    className={action.variant === 'active' ? 'bg-blue-600 hover:bg-blue-700 w-full' : 'bg-gray-600 w-full'}
                  >
                    {t("Coming Soon")}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default SalonQuickActions;

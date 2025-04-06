
import React from 'react';
import { Gift, Star, Upload, Users, Award, Calendar, Edit, Settings } from 'lucide-react';

interface ActivityIconProps {
  activityType: string;
  className?: string;
}

const ActivityIcon: React.FC<ActivityIconProps> = ({ activityType, className = "" }) => {
  const iconClass = `h-5 w-5 ${className}`;
  
  switch (activityType) {
    case 'credit_earned':
      return <Gift className={`${iconClass} text-purple-500`} />;
    
    case 'profile_boosted':
      return <Star className={`${iconClass} text-amber-500`} />;
    
    case 'referral_completed':
      return <Users className={`${iconClass} text-indigo-500`} />;
    
    case 'portfolio_upload':
      return <Upload className={`${iconClass} text-blue-500`} />;
    
    case 'service_added':
      return <Calendar className={`${iconClass} text-green-500`} />;
    
    case 'profile_updated':
      return <Edit className={`${iconClass} text-pink-500`} />;
    
    default:
      return <Award className={`${iconClass} text-gray-500`} />;
  }
};

export default ActivityIcon;

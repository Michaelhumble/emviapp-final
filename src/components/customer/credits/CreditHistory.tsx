
import React from 'react';
import { Bell, Heart, BadgeCheck, Users, ArrowUp, Gift, Coins } from 'lucide-react';
import { CreditHistoryItem } from './types';

interface CreditHistoryProps {
  history: CreditHistoryItem[];
  loading: boolean;
}

const CreditHistory: React.FC<CreditHistoryProps> = ({ history, loading }) => {
  // Format action type for display
  const formatActionType = (actionType: string) => {
    if (!actionType) return 'Unknown';
    
    // Replace underscores with spaces and capitalize each word
    return actionType
      .replace(/_/g, ' ')
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  // Get icon for action type
  const getActionIcon = (actionType: string) => {
    if (actionType.includes('follow')) return <Bell className="h-3 w-3 text-blue-500" />;
    if (actionType.includes('bookmark')) return <Heart className="h-3 w-3 text-pink-500" />;
    if (actionType.includes('review')) return <BadgeCheck className="h-3 w-3 text-green-500" />;
    if (actionType.includes('referral')) return <Users className="h-3 w-3 text-purple-500" />;
    if (actionType.includes('redemption')) return <ArrowUp className="h-3 w-3 text-red-500" />;
    if (actionType.includes('received_support')) return <Gift className="h-3 w-3 text-amber-500" />;
    if (actionType.includes('support_artist')) return <Heart className="h-3 w-3 text-red-500" />;
    return <Coins className="h-3 w-3 text-gray-500" />;
  };
  
  if (loading) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">Loading credit history...</p>
      </div>
    );
  }
  
  if (history.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">No credit history found.</p>
        <p className="text-xs text-muted-foreground mt-1">Start earning credits by interacting with artists!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {history.map((item) => (
        <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
          <div className="flex items-center">
            <div className="mr-3">
              {getActionIcon(item.action_type)}
            </div>
            <div>
              <div className="text-sm font-medium">{formatActionType(item.action_type)}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(item.created_at).toLocaleDateString()} • {new Date(item.created_at).toLocaleTimeString()}
              </div>
            </div>
          </div>
          <span className={item.value > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {item.value > 0 ? "+" : ""}{item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CreditHistory;

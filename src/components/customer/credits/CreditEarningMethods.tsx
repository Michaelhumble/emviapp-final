
import React from 'react';
import { Award, Bell, Heart, Users } from 'lucide-react';

const CreditEarningMethods: React.FC = () => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-3">Ways to earn credits:</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
            <Heart className="h-4 w-4 text-pink-600" />
          </div>
          <div>
            <div className="text-xs font-medium">Bookmark Artist</div>
            <div className="text-xs text-muted-foreground">+2 credits</div>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <Bell className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-medium">Follow Artist</div>
            <div className="text-xs text-muted-foreground">+5 credits</div>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
            <Award className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-medium">Leave Review</div>
            <div className="text-xs text-muted-foreground">+10 credits</div>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <Users className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="text-xs font-medium">Refer Friend</div>
            <div className="text-xs text-muted-foreground">+20 credits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditEarningMethods;

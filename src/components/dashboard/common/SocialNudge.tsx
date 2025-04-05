
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Mock data for social nudges
const recentActivities = [
  { salonName: 'Luxury Nails', timeAgo: '2 hours ago' },
  { salonName: 'Perfect Look', timeAgo: '5 hours ago' },
  { salonName: 'Beauty Corner', timeAgo: 'yesterday' },
  { salonName: 'Nail Paradise', timeAgo: '2 days ago' },
  { salonName: 'Glamour Studio', timeAgo: '3 days ago' },
];

interface SocialNudgeProps {
  className?: string;
}

const SocialNudge = ({ className = '' }: SocialNudgeProps) => {
  const [activity, setActivity] = useState<{
    salonName: string;
    timeAgo: string;
  }>(recentActivities[0]);
  
  useEffect(() => {
    // Rotate through different activities every few seconds
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * recentActivities.length);
      setActivity(recentActivities[randomIdx]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className={`border-l-4 border-l-indigo-500 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium mb-1">
              <span className="text-indigo-600">{activity.salonName}</span> just activated premium visibility
            </p>
            <p className="text-xs text-muted-foreground">{activity.timeAgo}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
            View
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialNudge;

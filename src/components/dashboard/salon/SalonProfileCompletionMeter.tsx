
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

interface CompletionTask {
  id: string;
  label: string;
  completed: boolean;
}

const SalonProfileCompletionMeter = () => {
  const { user, userProfile } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) {
          throw error;
        }
        
        setProfileData(data);
        setCompletedTasks(data.completed_profile_tasks || []);
      } catch (err) {
        console.error("Error fetching profile completion data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user?.id]);
  
  // Define all tasks for salon owner
  const tasks: CompletionTask[] = [
    {
      id: 'add-salon-details',
      label: 'Add salon details',
      completed: Boolean(userProfile?.salon_name),
    },
    {
      id: 'add-salon-logo',
      label: 'Add salon logo',
      completed: Boolean(userProfile?.avatar_url),
    },
    {
      id: 'add-salon-location',
      label: 'Add salon location',
      completed: Boolean(userProfile?.location),
    },
    {
      id: 'add-salon-services',
      label: 'Add your services',
      completed: completedTasks.includes('add-salon-services'),
    },
    {
      id: 'add-team-members',
      label: 'Add team members',
      completed: completedTasks.includes('add-team-members'),
    },
    {
      id: 'setup-booking-system',
      label: 'Set up booking system',
      completed: Boolean(userProfile?.accepts_bookings),
    },
    {
      id: 'connect-socials',
      label: 'Connect social media',
      completed: Boolean(userProfile?.instagram) || completedTasks.includes('connect-socials'),
    },
  ];
  
  // Calculate completion percentage
  const completedCount = tasks.filter(task => task.completed).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);
  
  if (loading) {
    return (
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="text-lg">Profile Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center">
            <div className="animate-pulse bg-blue-100 h-4 w-full rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-blue-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-blue-700">
            Profile Completion
          </CardTitle>
          <span className="text-sm font-medium">
            {percentage}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="h-2 mb-6" />
        
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                )}
                <span className={`text-sm ${task.completed ? 'text-gray-700' : 'text-gray-500'}`}>
                  {task.label}
                </span>
              </div>
              {!task.completed && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-7 px-2"
                  asChild
                >
                  <a href={`/profile/edit?task=${task.id}`}>
                    Complete
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonProfileCompletionMeter;

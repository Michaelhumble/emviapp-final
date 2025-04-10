
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CirclePercent, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface CompletionTask {
  id: string;
  label: string;
  completed: boolean;
  path: string;
}

const SalonProfileCompletionMeter = () => {
  const { user, userProfile } = useAuth();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [tasks, setTasks] = useState<CompletionTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id && userProfile) {
      evaluateProfileCompletion();
    }
  }, [user?.id, userProfile]);

  const evaluateProfileCompletion = async () => {
    setLoading(true);
    
    try {
      // Define tasks to check
      const tasksToCheck: CompletionTask[] = [
        {
          id: 'salon_name',
          label: 'Add salon name',
          completed: Boolean(userProfile?.salon_name),
          path: '/profile/edit?tab=business'
        },
        {
          id: 'logo',
          label: 'Upload salon logo',
          completed: Boolean(userProfile?.avatar_url),
          path: '/profile/edit?tab=photos'
        },
        {
          id: 'location',
          label: 'Add salon location',
          completed: Boolean(userProfile?.location),
          path: '/profile/edit?tab=business'
        },
        {
          id: 'contact',
          label: 'Add contact information',
          completed: Boolean(userProfile?.phone),
          path: '/profile/edit?tab=contact'
        },
        {
          id: 'bio',
          label: 'Add salon description',
          completed: Boolean(userProfile?.bio),
          path: '/profile/edit?tab=business'
        },
        {
          id: 'services',
          label: 'Add at least one service',
          completed: false, // Will be checked below
          path: '/dashboard/salon?tab=services'
        },
        {
          id: 'team',
          label: 'Add salon staff',
          completed: false, // Will be checked below
          path: '/dashboard/salon?tab=team'
        },
        {
          id: 'website',
          label: 'Add website or social media',
          completed: Boolean(userProfile?.website) || Boolean(userProfile?.instagram),
          path: '/profile/edit?tab=social'
        }
      ];

      // Check if salon has services
      const { count: serviceCount, error: serviceError } = await supabase
        .from('services')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user?.id);
        
      if (!serviceError && serviceCount !== null) {
        const serviceTask = tasksToCheck.find(task => task.id === 'services');
        if (serviceTask) {
          serviceTask.completed = serviceCount > 0;
        }
      }
      
      // Check if salon has team members
      const { count: teamCount, error: teamError } = await supabase
        .from('users')
        .select('id', { count: 'exact', head: true })
        .eq('salon_id', user?.id);
        
      if (!teamError && teamCount !== null) {
        const teamTask = tasksToCheck.find(task => task.id === 'team');
        if (teamTask) {
          teamTask.completed = teamCount > 0;
        }
      }
      
      // Calculate percentage
      const completedCount = tasksToCheck.filter(task => task.completed).length;
      const percentage = Math.round((completedCount / tasksToCheck.length) * 100);
      
      setTasks(tasksToCheck);
      setCompletionPercentage(percentage);
    } catch (err) {
      console.error("Error evaluating profile completion:", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="border-amber-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <CirclePercent className="h-5 w-5 text-amber-500 mr-2" />
          Profile Completion
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Your profile is {completionPercentage}% complete</span>
          <span className="text-amber-600 font-semibold">{completionPercentage}%</span>
        </div>
        
        <Progress value={completionPercentage} className="h-2 mb-4" />
        
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                )}
                <span className={task.completed ? 'text-gray-600' : 'text-gray-500'}>
                  {task.label}
                </span>
              </div>
              
              {!task.completed && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs text-amber-600"
                  asChild
                >
                  <Link to={task.path}>
                    Complete
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
        
        {completionPercentage === 100 && (
          <div className="mt-4 bg-green-50 text-green-700 rounded-md p-3 text-sm">
            <p className="flex items-center font-medium">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Your profile is complete!
            </p>
            <p className="mt-1 text-xs">
              A complete profile attracts more clients and improves visibility.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonProfileCompletionMeter;

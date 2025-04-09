
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { toTranslatableText } from './TranslationHelper';
import { UserProfile } from '@/context/auth/types';

export interface ProfileCompletionCardProps {
  percentage?: number;
  userProfile?: UserProfile | null;
  loading?: boolean;
}

const ProfileCompletionCard = ({ percentage = 0, userProfile = null, loading = false }: ProfileCompletionCardProps) => {
  const { t } = useTranslation();
  
  // Use passed percentage or calculate from profile if not provided
  const displayPercentage = percentage || 0;
  
  // Default tasks if no profile data is available
  const completedTasks = userProfile?.completed_profile_tasks || [];
  
  // Profile completion tasks
  const tasks = [
    {
      id: 'add-profile-picture',
      label: t(toTranslatableText('Add profile picture')),
      completed: Boolean(userProfile?.avatar_url),
    },
    {
      id: 'add-bio',
      label: t(toTranslatableText('Add your bio')),
      completed: Boolean(userProfile?.bio),
    },
    {
      id: 'add-services',
      label: t(toTranslatableText('Add services')),
      completed: completedTasks.includes('add-services'),
    },
    {
      id: 'add-portfolio',
      label: t(toTranslatableText('Add portfolio items')),
      completed: Array.isArray(userProfile?.portfolio_urls) && 
                userProfile?.portfolio_urls.length > 0,
    },
    {
      id: 'set-availability',
      label: t(toTranslatableText('Set your availability')),
      completed: completedTasks.includes('set-availability'),
    },
    {
      id: 'enable-bookings',
      label: t(toTranslatableText('Enable bookings')),
      completed: Boolean(userProfile?.accepts_bookings),
    },
    {
      id: 'add-location',
      label: t(toTranslatableText('Add your location')),
      completed: Boolean(userProfile?.location),
    },
    {
      id: 'add-specialties',
      label: t(toTranslatableText('Add specialties')),
      completed: Boolean(userProfile?.specialty),
    },
    {
      id: 'connect-socials',
      label: t(toTranslatableText('Connect social media')),
      completed: completedTasks.includes('connect-socials'),
    },
  ];
  
  // Calculate completed tasks count
  const completedCount = tasks.filter(task => task.completed).length;
  const completionPercentage = Math.round((completedCount / tasks.length) * 100);
  
  return (
    <Card className="border-purple-100 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-purple-700">
            {t(toTranslatableText('Profile Completion'))}
          </CardTitle>
          <span className="text-sm font-medium">
            {completionPercentage}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={completionPercentage} className="h-2 mb-6" />
        
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300 mr-2" />
                )}
                <span className={`text-sm ${task.completed ? 'text-gray-700' : 'text-gray-500'}`}>
                  {task.label}
                </span>
              </div>
              {!task.completed && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 h-7 px-2"
                  asChild
                >
                  <a href={`/profile/edit?task=${task.id}`}>
                    {t(toTranslatableText('Complete'))}
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

export default ProfileCompletionCard;

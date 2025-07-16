import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action?: () => void;
  route?: string;
}

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingComplete: boolean;
  completeStep: (stepId: string) => void;
  showOnboarding: boolean;
  dismissOnboarding: () => void;
  progress: number;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    if (user) {
      loadOnboardingProgress();
      checkUserRole();
    }
  }, [user]);

  const loadOnboardingProgress = async () => {
    try {
      if (!user) return;

      // Check if user has completed onboarding
      const { data: profile } = await supabase
        .from('users')
        .select('completed_profile_tasks, role')
        .eq('id', user.id)
        .single();

      if (profile) {
        setCompletedSteps(profile.completed_profile_tasks || []);
        setUserRole(profile.role || 'customer');
        
        // Show onboarding if user is new (less than 3 completed tasks)
        const completedCount = (profile.completed_profile_tasks || []).length;
        setShowOnboarding(completedCount < 3);
      }
    } catch (error) {
      console.warn('Failed to load onboarding progress:', error);
    }
  };

  const checkUserRole = async () => {
    try {
      if (!user) return;

      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role) {
        setUserRole(profile.role);
      }
    } catch (error) {
      console.warn('Failed to check user role:', error);
    }
  };

  const getRoleSpecificSteps = (role: string): OnboardingStep[] => {
    const baseSteps: OnboardingStep[] = [
      {
        id: 'welcome',
        title: 'Welcome to EmviApp! 👋',
        description: 'Let\'s get you set up to make the most of our beauty community.',
        completed: completedSteps.includes('welcome')
      },
      {
        id: 'profile_setup',
        title: 'Complete Your Profile',
        description: 'Add your photo, bio, and contact information to help others connect with you.',
        completed: completedSteps.includes('profile_setup'),
        route: '/profile/edit'
      }
    ];

    if (role === 'artist' || role === 'nail technician/artist') {
      return [
        ...baseSteps,
        {
          id: 'portfolio_upload',
          title: 'Upload Your Portfolio',
          description: 'Showcase your best work to attract potential clients and job opportunities.',
          completed: completedSteps.includes('portfolio_upload'),
          route: '/dashboard/artist/portfolio'
        },
        {
          id: 'services_setup',
          title: 'Add Your Services',
          description: 'List the services you offer with pricing to start receiving bookings.',
          completed: completedSteps.includes('services_setup'),
          route: '/dashboard/artist'
        },
        {
          id: 'first_job_view',
          title: 'Explore Job Opportunities',
          description: 'Browse available positions in your specialty to grow your career.',
          completed: completedSteps.includes('first_job_view'),
          route: '/jobs'
        }
      ];
    } else if (role === 'salon owner' || role === 'salon') {
      return [
        ...baseSteps,
        {
          id: 'salon_listing',
          title: 'Create Your Salon Listing',
          description: 'Add your salon details to attract customers and talented artists.',
          completed: completedSteps.includes('salon_listing'),
          route: '/post-salon'
        },
        {
          id: 'team_setup',
          title: 'Invite Your Team',
          description: 'Add your stylists and staff to manage bookings and schedules together.',
          completed: completedSteps.includes('team_setup'),
          route: '/dashboard/salon'
        },
        {
          id: 'first_job_post',
          title: 'Post Your First Job',
          description: 'Find talented beauty professionals to join your team.',
          completed: completedSteps.includes('first_job_post'),
          route: '/post-job'
        }
      ];
    } else {
      return [
        ...baseSteps,
        {
          id: 'explore_artists',
          title: 'Discover Artists',
          description: 'Find talented beauty professionals in your area for your next appointment.',
          completed: completedSteps.includes('explore_artists'),
          route: '/artists'
        },
        {
          id: 'explore_salons',
          title: 'Browse Salons',
          description: 'Explore beauty salons and spas near you for premium services.',
          completed: completedSteps.includes('explore_salons'),
          route: '/salons'
        }
      ];
    }
  };

  const steps = getRoleSpecificSteps(userRole);
  const currentStepIndex = steps.findIndex(step => !step.completed);
  const currentStep = currentStepIndex === -1 ? steps.length - 1 : currentStepIndex;
  const isOnboardingComplete = steps.every(step => step.completed);
  const progress = (completedSteps.length / steps.length) * 100;

  const completeStep = async (stepId: string) => {
    if (completedSteps.includes(stepId) || !user) return;

    try {
      const newCompletedSteps = [...completedSteps, stepId];
      setCompletedSteps(newCompletedSteps);

      // Update database
      await supabase
        .from('users')
        .update({ completed_profile_tasks: newCompletedSteps })
        .eq('id', user.id);

      // Track completion in analytics
      await supabase
        .from('activity_log')
        .insert({
          user_id: user.id,
          activity_type: 'onboarding_step_completed',
          description: `Completed onboarding step: ${stepId}`,
          metadata: { step_id: stepId, total_completed: newCompletedSteps.length }
        });

      // Hide onboarding if user completed enough steps
      if (newCompletedSteps.length >= 3) {
        setShowOnboarding(false);
      }
    } catch (error) {
      console.warn('Failed to complete onboarding step:', error);
    }
  };

  const dismissOnboarding = async () => {
    setShowOnboarding(false);
    
    // Track dismissal
    if (user) {
      try {
        await supabase
          .from('activity_log')
          .insert({
            user_id: user.id,
            activity_type: 'onboarding_dismissed',
            description: 'User dismissed onboarding checklist',
            metadata: { completed_steps: completedSteps.length, total_steps: steps.length }
          });
      } catch (error) {
        console.warn('Failed to track onboarding dismissal:', error);
      }
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        steps,
        currentStep,
        isOnboardingComplete,
        completeStep,
        showOnboarding,
        dismissOnboarding,
        progress
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
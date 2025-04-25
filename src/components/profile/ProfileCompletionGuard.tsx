
import React from 'react';
import { useAuth } from '@/context/auth';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { CORE_FEATURES, CORE_FEATURE_DESCRIPTIONS } from '@/components/dashboard/artist/constants/dashboardCore';

const ProfileCompletionGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userRole } = useAuth();
  const { completionStatus } = useProfileCompletion();
  
  return (
    <>
      {/* Show children regardless of completion status - no blocking */}
      {children}
      
      {/* Gentle reminder if profile is incomplete */}
      {completionStatus && !completionStatus.isComplete && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Alert variant="default" className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
            <Palette className="h-4 w-4 text-purple-500" />
            <AlertDescription className="text-purple-800">
              🎨 Complete your profile to attract more clients and unlock all features!
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </>
  );
};

// Add JSDoc to warn about modification
/**
 * @component ProfileCompletionGuard
 * 🚨 CORE COMPONENT: Part of profile completion feature
 * This component provides gentle guidance for profile completion.
 * Do not modify without thorough review.
 * @see {@link CORE_FEATURES.PROFILE_COMPLETION}
 */
export default ProfileCompletionGuard;

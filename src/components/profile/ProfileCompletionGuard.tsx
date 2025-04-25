
import { useAuth } from '@/context/auth';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileCompletionGuard({ children }: { children: React.ReactNode }) {
  const { userRole } = useAuth();
  const { completionStatus } = useProfileCompletion();
  
  return (
    <>
      {completionStatus && !completionStatus.isComplete && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Alert className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
            <Palette className="h-4 w-4 text-purple-500" />
            <AlertDescription className="text-purple-800">
              🎨 Tip: Complete your profile to attract more clients!
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      {children}
    </>
  );
}

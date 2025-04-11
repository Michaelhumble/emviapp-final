
import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { migrateSingleToMultiSalon } from '@/utils/migration/migrateSingleToMultiSalon';

// This component will handle the migration of users to the multi-salon model
// We'll use it as a child component in the main App.tsx
const AppModifier = () => {
  const { user, userRole, isSignedIn } = useAuth();
  
  useEffect(() => {
    const handleMigration = async () => {
      // Only run migration for salon owners who are signed in
      if (isSignedIn && user?.id && (userRole === 'salon' || userRole === 'owner')) {
        const hasMigrationRun = localStorage.getItem('salon_migration_complete');
        
        // Only run once per user
        if (!hasMigrationRun) {
          console.log('Running salon migration for user:', user.id);
          try {
            const salonId = await migrateSingleToMultiSalon(user.id);
            
            if (salonId) {
              localStorage.setItem('salon_migration_complete', 'true');
              localStorage.setItem('selected_salon_id', salonId);
            }
          } catch (error) {
            console.error('Error during salon migration:', error);
          }
        }
      }
    };
    
    handleMigration();
  }, [user?.id, userRole, isSignedIn]);
  
  // This component doesn't render anything
  return null;
};

export default AppModifier;


import { useAuth } from '../useAuth';

/**
 * Simplified session hook that uses the centralized auth context
 * This replaces the complex session management logic
 */
export function useSession() {
  const { 
    user, 
    session, 
    loading, 
    isNewUser, 
    clearIsNewUser, 
    setLoading 
  } = useAuth();

  return { 
    session, 
    user, 
    loading, 
    isNewUser, 
    clearIsNewUser, 
    setLoading 
  };
}

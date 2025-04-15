
// Re-export from the provider
import { useProfileCompletion as useProfileCompletionFromProvider } from '@/context/profile/ProfileCompletionProvider';

export function useProfileCompletion() {
  return useProfileCompletionFromProvider();
}

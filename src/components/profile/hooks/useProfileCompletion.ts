
// This file re-exports the hook from the context for backward compatibility
import { useProfileCompletion as useProfileCompletionHook } from '@/context/profile/ProfileProvider';

export const useProfileCompletion = useProfileCompletionHook;

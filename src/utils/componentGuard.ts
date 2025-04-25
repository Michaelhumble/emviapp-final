
/**
 * Utility to help prevent accidental deletion of core components
 * 🚨 DO NOT REMOVE OR MODIFY WITHOUT APPROVAL
 */

import { CORE_COMPONENTS, CORE_FEATURE_DESCRIPTIONS } from '@/components/dashboard/artist/constants/dashboardCore';

export function validateCoreComponent(componentName: string): void {
  // Only run in development
  if (process.env.NODE_ENV !== 'development') return;

  for (const [feature, components] of Object.entries(CORE_COMPONENTS)) {
    if (components.includes(componentName)) {
      console.warn(
        `⚠️ WARNING: ${componentName} is a core component of the ${feature} feature.\n` +
        `Reason: ${CORE_FEATURE_DESCRIPTIONS[feature]}\n` +
        'Please ensure any modifications maintain core functionality.'
      );
      return;
    }
  }
}

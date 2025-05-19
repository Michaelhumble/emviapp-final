import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { 
  JobPostingState, 
  JobFormValues, 
  PricingOptions, 
  JobPostingAction,
  ExtendedJobFormValues
} from '@/types/jobPosting';
import { calculateJobPostPrice } from '@/utils/pricing/calculatePrice';
import { logStateChange, logError, logJobPostingEvent, JobPostingEventType } from '@/utils/telemetry/jobPostingEvents';
import { logJobPostingError, resetJobPostingErrorState } from '@/utils/rollback/jobPostingRollback';
import { shouldShowDebugPanel } from '@/utils/featureFlags/jobPostingFlags';

// Default initial state with proper defaults
const initialState: JobPostingState = {
  jobData: {} as JobFormValues,
  pricingOptions: {
    selectedPricingTier: 'premium', // Default to premium tier
    durationMonths: 1,             // Default to 1 month
    autoRenew: true,               // Default to auto-renew enabled
    isFirstPost: true,             // Default to first post (for free tier)
    isNationwide: false            // Default to local listing
  },
  photoUploads: [],
  currentStep: 'details',
  calculatedPrice: {
    originalPrice: 0,
    finalPrice: 0,
    discountPercentage: 0,
    isFreeTrial: false,
    currency: 'USD',
    formattedOriginalPrice: '$0.00',
    formattedFinalPrice: '$0.00',
    recurringBilling: false
  },
  validation: {
    hasValidJobData: false,
    hasValidPricing: true,
    errors: []
  },
  ui: {
    isSubmitting: false,
    isNavigatingBack: false,
    showDebugPanel: process.env.NODE_ENV === 'development' // Enable debug panel in development
  },
  analytics: {
    startTime: Date.now(),
    stepTimes: {},
    pricingChanges: 0,
    formSubmitAttempts: 0
  }
};

// Storage key for persisting state
const STORAGE_KEY = 'emviapp_job_posting_state';

// Create context with undefined default
const JobPostingContext = createContext<{
  state: JobPostingState;
  dispatch: React.Dispatch<JobPostingAction>;
} | undefined>(undefined);

// Reducer function to handle all state updates
function jobPostingReducer(state: JobPostingState, action: JobPostingAction): JobPostingState {
  console.log('Job posting action:', action.type, action.payload);
  
  // Log action for debugging
  logJobPostingEvent(
    JobPostingEventType.USER_ACTION, 
    action.type, 
    action.type === 'UPDATE_JOB_DATA' ? { fields: Object.keys(action.payload) } : action.payload
  );
  
  try {
    switch (action.type) {
      case 'UPDATE_JOB_DATA': {
        const newJobData = { ...state.jobData, ...action.payload };
        
        // Validate job data
        const hasTitle = Boolean(newJobData.title);
        const hasLocation = Boolean(newJobData.location);
        const hasEmail = Boolean(newJobData.contactEmail);
        const hasDescription = Boolean(newJobData.description);
        
        const hasValidJobData = hasTitle && hasLocation && hasEmail && hasDescription;
        
        // Log state change
        logStateChange('jobData', state.jobData, newJobData);
        
        return { 
          ...state, 
          jobData: newJobData,
          validation: {
            ...state.validation,
            hasValidJobData
          }
        };
      }
      
      case 'UPDATE_PRICING_OPTIONS': {
        const newPricingOptions = { ...state.pricingOptions, ...action.payload };
        
        // Enforce Diamond plan constraints (must be annual)
        if (newPricingOptions.selectedPricingTier === 'diamond' && 
            newPricingOptions.durationMonths !== 12) {
          newPricingOptions.durationMonths = 12;
        }
        
        // Recalculate price whenever pricing options change
        const calculatedPrice = calculateJobPostPrice(newPricingOptions);
        
        // Update analytics
        const newAnalytics = {
          ...state.analytics,
          pricingChanges: state.analytics.pricingChanges + 1
        };
        
        // Log state change
        logStateChange('pricingOptions', state.pricingOptions, newPricingOptions);
        
        return { 
          ...state, 
          pricingOptions: newPricingOptions,
          calculatedPrice,
          analytics: newAnalytics
        };
      }
      
    case 'SET_PHOTO_UPLOADS':
      return { 
        ...state, 
        photoUploads: action.payload 
      };
    
    case 'SET_STEP': {
      const currentTime = Date.now();
      
      // Record time spent in previous step
      const stepTimes = {
        ...state.analytics.stepTimes,
        [state.currentStep]: (state.analytics.stepTimes[state.currentStep] || 0) + 
                            (currentTime - (state.analytics.stepTimes._lastUpdate || state.analytics.startTime))
      };
      
      // Set timestamp for the step change
      stepTimes._lastUpdate = currentTime;
      
      return { 
        ...state, 
        currentStep: action.payload,
        analytics: {
          ...state.analytics,
          stepTimes
        }
      };
    }
    
    case 'VALIDATE_FORM': {
      // Perform validation checks
      const jobData = state.jobData;
      const pricingOptions = state.pricingOptions;
      
      const errors: string[] = [];
      
      // Job data validation
      if (!jobData.title) errors.push('Job title is required');
      if (!jobData.location) errors.push('Location is required');
      if (!jobData.contactEmail) errors.push('Contact email is required');
      if (!jobData.description) errors.push('Job description is required');
      
      // Pricing validation
      if (!pricingOptions.selectedPricingTier) errors.push('Please select a pricing tier');
      
      // Special validations for diamond tier
      if (pricingOptions.selectedPricingTier === 'diamond' && pricingOptions.durationMonths !== 12) {
        errors.push('Diamond tier requires annual subscription');
      }
      
      return {
        ...state,
        validation: {
          hasValidJobData: !errors.some(e => e.includes('Job title') || e.includes('Location') || 
                                            e.includes('Contact email') || e.includes('description')),
          hasValidPricing: !errors.some(e => e.includes('pricing tier') || e.includes('Diamond tier')),
          errors
        }
      };
    }
    
    case 'START_SUBMISSION':
      return {
        ...state,
        ui: {
          ...state.ui,
          isSubmitting: true
        },
        analytics: {
          ...state.analytics,
          formSubmitAttempts: state.analytics.formSubmitAttempts + 1
        }
      };
    
    case 'SUBMISSION_SUCCESS':
      return {
        ...state,
        ui: {
          ...state.ui,
          isSubmitting: false
        }
      };
    
    case 'SUBMISSION_FAILURE':
      return {
        ...state,
        ui: {
          ...state.ui,
          isSubmitting: false
        },
        validation: {
          ...state.validation,
          errors: [...state.validation.errors, action.payload]
        }
      };
    
    case 'NAVIGATE_BACK':
      return {
        ...state,
        ui: {
          ...state.ui,
          isNavigatingBack: true
        }
      };
    
    case 'TOGGLE_DEBUG_PANEL':
      return {
        ...state,
        ui: {
          ...state.ui,
          showDebugPanel: !state.ui.showDebugPanel
        }
      };
      
      case 'RESET_FORM':
        // Clear stored state and reset to initial values
        localStorage.removeItem(STORAGE_KEY);
        resetJobPostingErrorState(); // Also reset error indicators
        
        // Log event
        logJobPostingEvent(JobPostingEventType.USER_ACTION, 'reset_form', null);
        
        return {
          ...initialState,
          ui: {
            ...initialState.ui,
            showDebugPanel: shouldShowDebugPanel() // Respect debug panel preference
          },
          analytics: {
            ...initialState.analytics,
            startTime: Date.now()
          }
        };
      
      default:
        console.warn('Unknown action type:', (action as any).type);
        return state;
    }
  } catch (error) {
    // Log error and return unchanged state
    logError('reducer_error', error as Error, { actionType: action.type });
    return state;
  }
}

/**
 * Provider component that manages job posting state
 */
export const JobPostingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Log page view
  useEffect(() => {
    logJobPostingEvent(JobPostingEventType.PAGE_VIEW, 'job_posting_flow', { 
      url: window.location.pathname,
      timestamp: Date.now()
    });
    
    // Reset error state on mount
    resetJobPostingErrorState();
  }, []);
  
  // Initialize state from localStorage if available
  const [state, dispatch] = useReducer(jobPostingReducer, initialState, (initialArg) => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        console.log('Restoring job posting state from localStorage');
        const parsedState = JSON.parse(savedState) as Partial<JobPostingState>;
        
        // Ensure we have all required properties from initial state
        return {
          ...initialArg,
          ...parsedState,
          // Always reset these values
          ui: {
            ...initialArg.ui,
            isSubmitting: false,
            isNavigatingBack: false,
            // Set debug panel based on feature flag
            showDebugPanel: shouldShowDebugPanel()
          },
          // Maintain analytics from the restored state, but update the startTime
          analytics: {
            ...(parsedState.analytics || initialArg.analytics),
            startTime: Date.now()
          }
        };
      }
      return {
        ...initialArg,
        ui: {
          ...initialArg.ui,
          showDebugPanel: shouldShowDebugPanel()
        }
      };
    } catch (error) {
      logJobPostingError(error);
      console.error('Error restoring job posting state:', error);
      return initialArg;
    }
  });
  
  // Persist state to localStorage whenever it changes
  useEffect(() => {
    try {
      // Don't persist file objects (they can't be serialized)
      const stateToSave = {
        ...state,
        photoUploads: [] // Don't persist actual file objects
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      logError('persist_state_error', error as Error);
      console.error('Failed to persist job posting state:', error);
    }
  }, [state]);
  
  // Provide state and dispatch to children
  return (
    <JobPostingContext.Provider value={{ state, dispatch }}>
      {children}
    </JobPostingContext.Provider>
  );
};

/**
 * Custom hook that provides access to the job posting context
 */
export function useJobPosting() {
  const context = useContext(JobPostingContext);
  
  if (!context) {
    throw new Error('useJobPosting must be used within a JobPostingProvider');
  }
  
  const { state, dispatch } = context;
  
  // Helper functions for common operations
  const updateJobData = (data: Partial<JobFormValues>) => {
    dispatch({ type: 'UPDATE_JOB_DATA', payload: data });
  };
  
  const updatePricingOptions = (options: Partial<PricingOptions>) => {
    dispatch({ type: 'UPDATE_PRICING_OPTIONS', payload: options });
  };
  
  const setPhotoUploads = (files: File[]) => {
    dispatch({ type: 'SET_PHOTO_UPLOADS', payload: files });
  };
  
  const setStep = (step: JobPostingState['currentStep']) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };
  
  const validateForm = () => {
    dispatch({ type: 'VALIDATE_FORM' });
  };
  
  const startSubmission = () => {
    dispatch({ type: 'START_SUBMISSION' });
  };
  
  const submissionSuccess = () => {
    dispatch({ type: 'SUBMISSION_SUCCESS' });
  };
  
  const submissionFailure = (error: string) => {
    dispatch({ type: 'SUBMISSION_FAILURE', payload: error });
  };
  
  const navigateBack = () => {
    dispatch({ type: 'NAVIGATE_BACK' });
  };
  
  const toggleDebugPanel = () => {
    dispatch({ type: 'TOGGLE_DEBUG_PANEL' });
  };
  
  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };
  
  // Return state and helper functions
  return {
    ...state,
    updateJobData,
    updatePricingOptions,
    setPhotoUploads,
    setStep,
    validateForm,
    startSubmission,
    submissionSuccess,
    submissionFailure,
    navigateBack,
    toggleDebugPanel,
    resetForm
  };
}

/**
 * Helper function to map JobFormValues to JobDetailsSubmission
 * This ensures consistent formatting for backend API
 */
export function mapToJobDetailsSubmission(
  jobData: ExtendedJobFormValues, 
  userId?: string
): {
  title: string;
  description?: string;
  vietnameseDescription?: string;
  location: string;
  contact_info: {
    email: string;
    phone: string;
    owner_name: string;
    zalo?: string;
  };
  compensation_details?: string;
  employment_type?: string;
  requirements?: string[];
  specialties?: string[];
  weekly_pay?: boolean;
  has_housing?: boolean;
  no_supply_deduction?: boolean;
  owner_will_train?: boolean;
  is_urgent?: boolean;
  user_id?: string;
} {
  return {
    title: jobData.title || '',
    description: jobData.description || '',
    vietnameseDescription: jobData.vietnameseDescription || '',
    location: jobData.location || '',
    contact_info: {
      email: jobData.contactEmail || '',
      phone: jobData.contactPhone || '',
      owner_name: jobData.contactName || '',
      zalo: jobData.contactZalo || '',
    },
    compensation_details: jobData.compensation_details || jobData.compensationDetails,
    employment_type: jobData.employment_type || jobData.employmentType,
    requirements: Array.isArray(jobData.requirements) ? jobData.requirements : 
                (jobData.requirements ? [jobData.requirements] : []),
    specialties: jobData.specialties || [],
    weekly_pay: jobData.weeklyPay || false,
    has_housing: jobData.hasHousing || false,
    no_supply_deduction: jobData.noSupplyDeduction || false,
    owner_will_train: jobData.ownerWillTrain || false,
    is_urgent: jobData.isUrgent || false,
    user_id: userId,
  };
}

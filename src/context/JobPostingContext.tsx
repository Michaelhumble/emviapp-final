
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { JobPostingState, JobPostingAction, PricingOptions, PricingSummary } from '@/types/jobPosting';
import { calculateJobPostPrice, validatePricingOptions, logPriceCalculation } from '@/utils/pricing/calculatePrice';
import { logJobPostingEvent } from '@/utils/telemetry/jobPostingEvents';

// Default initial state
const initialState: JobPostingState = {
  jobData: {} as JobFormValues,
  pricingOptions: {
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: false,
    isNationwide: false
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
    hasValidPricing: false,
    errors: []
  },
  ui: {
    isSubmitting: false,
    isNavigatingBack: false,
    showDebugPanel: process.env.NODE_ENV === 'development'
  },
  analytics: {
    startTime: Date.now(),
    stepTimes: {},
    pricingChanges: 0,
    formSubmitAttempts: 0
  }
};

// Create context
const JobPostingContext = createContext<{
  state: JobPostingState;
  dispatch: React.Dispatch<JobPostingAction>;
  updateJobData: (data: Partial<JobFormValues>) => void;
  updatePricingOptions: (options: Partial<PricingOptions>) => void;
  setPhotoUploads: (files: File[]) => void;
  setStep: (step: JobPostingState['currentStep']) => void;
  validateForm: () => void;
  startSubmission: () => void;
  submissionSuccess: () => void;
  submissionFailure: (error: string) => void;
  navigateBack: () => void;
  toggleDebugPanel: () => void;
  resetForm: () => void;
  isLegacyFlow: boolean;
}>({
  state: initialState,
  dispatch: () => null,
  updateJobData: () => null,
  updatePricingOptions: () => null,
  setPhotoUploads: () => null,
  setStep: () => null,
  validateForm: () => null,
  startSubmission: () => null,
  submissionSuccess: () => null,
  submissionFailure: () => null,
  navigateBack: () => null,
  toggleDebugPanel: () => null,
  resetForm: () => null,
  isLegacyFlow: false
});

// State persistence keys
const STATE_STORAGE_KEY = 'emviapp_job_posting_state';

// Reducer function
function jobPostingReducer(state: JobPostingState, action: JobPostingAction): JobPostingState {
  let newState = { ...state };

  switch (action.type) {
    case 'UPDATE_JOB_DATA':
      newState = {
        ...state,
        jobData: {
          ...state.jobData,
          ...action.payload
        }
      };
      break;

    case 'UPDATE_PRICING_OPTIONS':
      const updatedPricingOptions = {
        ...state.pricingOptions,
        ...action.payload
      };
      
      // Recalculate price when pricing options change
      const calculatedPrice = calculateJobPostPrice(updatedPricingOptions);
      logPriceCalculation(updatedPricingOptions, calculatedPrice);
      
      newState = {
        ...state,
        pricingOptions: updatedPricingOptions,
        calculatedPrice,
        analytics: {
          ...state.analytics,
          pricingChanges: state.analytics.pricingChanges + 1
        }
      };
      break;

    case 'SET_PHOTO_UPLOADS':
      newState = {
        ...state,
        photoUploads: action.payload
      };
      break;

    case 'SET_STEP':
      newState = {
        ...state,
        currentStep: action.payload,
        analytics: {
          ...state.analytics,
          stepTimes: {
            ...state.analytics.stepTimes,
            [action.payload]: Date.now()
          }
        }
      };
      break;

    case 'VALIDATE_FORM':
      const pricingValidation = validatePricingOptions(state.pricingOptions);
      const hasValidJobData = Boolean(
        state.jobData.title && 
        state.jobData.location && 
        state.jobData.jobType && 
        state.jobData.experience_level
      );
      
      newState = {
        ...state,
        validation: {
          hasValidJobData,
          hasValidPricing: pricingValidation.valid,
          errors: [...(hasValidJobData ? [] : ['Missing required job data']), ...pricingValidation.errors]
        }
      };
      break;

    case 'START_SUBMISSION':
      newState = {
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
      break;

    case 'SUBMISSION_SUCCESS':
      newState = {
        ...state,
        ui: {
          ...state.ui,
          isSubmitting: false
        }
      };
      break;

    case 'SUBMISSION_FAILURE':
      newState = {
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
      break;

    case 'NAVIGATE_BACK':
      newState = {
        ...state,
        ui: {
          ...state.ui,
          isNavigatingBack: true
        }
      };
      break;

    case 'TOGGLE_DEBUG_PANEL':
      newState = {
        ...state,
        ui: {
          ...state.ui,
          showDebugPanel: !state.ui.showDebugPanel
        }
      };
      break;

    case 'RESET_FORM':
      return {
        ...initialState,
        analytics: {
          ...initialState.analytics,
          startTime: Date.now() // Reset start time
        }
      };

    default:
      return state;
  }

  // Log state changes
  logJobPostingEvent(
    'STATE_CHANGE',
    `JobPostingContext: ${action.type}`,
    { beforeState: state, afterState: newState }
  );

  return newState;
}

// Provider component
export const JobPostingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Check for legacy flow override
  const isLegacyFlow = typeof window !== 'undefined' && (
    window.location.search.includes('useLegacyFlow=true') ||
    localStorage.getItem('useJobPostingLegacyFlow') === 'true'
  );

  // Initialize state from localStorage if available
  const [storedState, setStoredState] = React.useState<JobPostingState | null>(null);
  
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STATE_STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState) as JobPostingState;
        setStoredState(parsedState);
      }
    } catch (error) {
      console.error('Failed to load job posting state from localStorage:', error);
    }
  }, []);

  // Use stored state or initial state
  const [state, dispatch] = useReducer(jobPostingReducer, storedState || initialState);

  // Save state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save job posting state to localStorage:', error);
    }
  }, [state]);

  // Helper functions
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

  return (
    <JobPostingContext.Provider
      value={{
        state,
        dispatch,
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
        resetForm,
        isLegacyFlow
      }}
    >
      {children}
    </JobPostingContext.Provider>
  );
};

// Custom hook to use the context
export const useJobPosting = () => {
  const context = useContext(JobPostingContext);
  
  if (!context) {
    throw new Error('useJobPosting must be used within a JobPostingProvider');
  }
  
  return {
    ...context,
    jobData: context.state.jobData,
    pricingOptions: context.state.pricingOptions,
    photoUploads: context.state.photoUploads,
    currentStep: context.state.currentStep,
    calculatedPrice: context.state.calculatedPrice,
    validation: context.state.validation,
    ui: context.state.ui,
    analytics: context.state.analytics
  };
};

export default JobPostingContext;


import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { calculateJobPostPrice } from '@/utils/pricing/calculatePrice';
import { 
  JobPostingState, 
  JobPostingAction,
  PricingOptions,
  PricingSummary
} from '@/types/jobPosting';
import { logJobPostingEvent } from '@/utils/telemetry/jobPostingEvents';

// Default state
const initialState: JobPostingState = {
  // Form data
  jobData: {} as JobFormValues,
  // Pricing selection
  pricingOptions: {
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: true,
    isNationwide: false
  },
  // Uploaded files
  photoUploads: [],
  // Current step in wizard
  currentStep: 'details',
  // Calculated pricing information
  calculatedPrice: {
    originalPrice: 0,
    finalPrice: 0,
    discountPercentage: 0,
    isFreeTrial: false,
    currency: 'USD',
    formattedOriginalPrice: '$0',
    formattedFinalPrice: '$0',
    recurringBilling: false
  },
  // Validation state
  validation: {
    hasValidJobData: false,
    hasValidPricing: false,
    errors: []
  },
  // UI state
  ui: {
    isSubmitting: false,
    isNavigatingBack: false,
    showDebugPanel: process.env.NODE_ENV === 'development' 
  },
  // Tracking & analytics data
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
  // Helper methods
  updateJobData: (data: Partial<JobFormValues>) => void;
  updatePricingOptions: (options: Partial<PricingOptions>) => void;
  setPhotoUploads: (files: File[]) => void;
  setStep: (step: JobPostingState['currentStep']) => void;
  validateForm: () => boolean;
  navigateBack: () => void;
  resetForm: () => void;
  toggleDebugPanel: () => void;
  // Direct state access (to avoid prop drilling)
  jobData: JobFormValues;
  pricingOptions: PricingOptions;
  photoUploads: File[];
  currentStep: JobPostingState['currentStep'];
  calculatedPrice: PricingSummary;
  validation: JobPostingState['validation'];
  ui: JobPostingState['ui'];
  isLegacyFlow: boolean;
} | undefined>(undefined);

// Reducer function
function jobPostingReducer(state: JobPostingState, action: JobPostingAction): JobPostingState {
  switch (action.type) {
    case 'UPDATE_JOB_DATA':
      return {
        ...state,
        jobData: {
          ...state.jobData,
          ...action.payload
        }
      };
      
    case 'UPDATE_PRICING_OPTIONS':
      const newPricingOptions = {
        ...state.pricingOptions,
        ...action.payload
      };
      
      // Recalculate price based on new options
      const newPrice = calculateJobPostPrice(newPricingOptions);
      
      return {
        ...state,
        pricingOptions: newPricingOptions,
        calculatedPrice: newPrice,
        analytics: {
          ...state.analytics,
          pricingChanges: state.analytics.pricingChanges + 1
        }
      };
      
    case 'SET_PHOTO_UPLOADS':
      return {
        ...state,
        photoUploads: action.payload
      };
      
    case 'SET_STEP':
      const now = Date.now();
      const stepTime = now - (
        state.analytics.stepTimes[state.currentStep] || state.analytics.startTime
      );
      
      return {
        ...state,
        currentStep: action.payload,
        analytics: {
          ...state.analytics,
          stepTimes: {
            ...state.analytics.stepTimes,
            [state.currentStep]: stepTime
          }
        }
      };
      
    case 'VALIDATE_FORM':
      // Basic validation logic
      const hasTitle = !!state.jobData.title && state.jobData.title.length > 3;
      const hasLocation = !!state.jobData.location && state.jobData.location.length > 0;
      const hasContactEmail = !!state.jobData.contactEmail;
      
      // Collect all validation errors
      const errors = [];
      if (!hasTitle) errors.push('Title is required (min 3 characters)');
      if (!hasLocation) errors.push('Location is required');
      if (!hasContactEmail) errors.push('Contact email is required');
      
      // Check pricing options
      const hasValidPricing = state.pricingOptions.selectedPricingTier !== undefined &&
                             state.pricingOptions.durationMonths >= 1;
                             
      if (!hasValidPricing) errors.push('Please select a valid pricing tier and duration');
      
      return {
        ...state,
        validation: {
          hasValidJobData: hasTitle && hasLocation && hasContactEmail,
          hasValidPricing,
          errors
        },
        analytics: {
          ...state.analytics,
          formSubmitAttempts: state.analytics.formSubmitAttempts + 1
        }
      };
      
    case 'START_SUBMISSION':
      return {
        ...state,
        ui: {
          ...state.ui,
          isSubmitting: true
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
      return initialState;
      
    default:
      return state;
  }
}

// Provider component
interface JobPostingProviderProps {
  children: ReactNode;
  initialData?: Partial<JobPostingState>;
}

export const JobPostingProvider: React.FC<JobPostingProviderProps> = ({ 
  children,
  initialData
}) => {
  // Initialize state from localStorage if available
  const getInitialState = (): JobPostingState => {
    if (typeof window === 'undefined') return initialState;
    
    try {
      const savedState = localStorage.getItem('emviapp_job_posting_state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        return {
          ...initialState,
          ...parsedState,
          ...initialData,
          // Always reset UI state on reload
          ui: {
            ...initialState.ui,
            ...(initialData?.ui || {})
          },
          analytics: {
            ...initialState.analytics,
            startTime: Date.now()
          }
        };
      }
    } catch (error) {
      console.error('Failed to parse saved job posting state:', error);
    }
    
    return {
      ...initialState,
      ...initialData
    };
  };

  const [state, dispatch] = useReducer(jobPostingReducer, null, getInitialState);
  
  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('emviapp_job_posting_state', JSON.stringify({
        jobData: state.jobData,
        pricingOptions: state.pricingOptions,
        currentStep: state.currentStep,
        // Don't save uploads as they're complex objects
      }));
      
      // Log any state changes
      logJobPostingEvent('STATE_UPDATED', 'Job posting state updated', {
        step: state.currentStep,
        pricingTier: state.pricingOptions.selectedPricingTier,
        validationErrors: state.validation.errors.length
      });
    } catch (error) {
      console.error('Failed to save job posting state:', error);
    }
  }, [state.jobData, state.pricingOptions, state.currentStep]);
  
  // Helper functions to simplify component usage
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
    return state.validation.hasValidJobData && state.validation.hasValidPricing;
  };
  
  const navigateBack = () => {
    dispatch({ type: 'NAVIGATE_BACK' });
  };
  
  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };
  
  const toggleDebugPanel = () => {
    dispatch({ type: 'TOGGLE_DEBUG_PANEL' });
  };
  
  const isLegacyFlow = false;
  
  const value = {
    state,
    dispatch,
    updateJobData,
    updatePricingOptions,
    setPhotoUploads,
    setStep,
    validateForm,
    navigateBack,
    resetForm,
    toggleDebugPanel,
    jobData: state.jobData,
    pricingOptions: state.pricingOptions,
    photoUploads: state.photoUploads,
    currentStep: state.currentStep,
    calculatedPrice: state.calculatedPrice,
    validation: state.validation,
    ui: state.ui,
    isLegacyFlow
  };

  return (
    <JobPostingContext.Provider value={value}>
      {children}
    </JobPostingContext.Provider>
  );
};

// Custom hook to use the context
export const useJobPosting = () => {
  const context = useContext(JobPostingContext);
  
  if (context === undefined) {
    throw new Error('useJobPosting must be used within a JobPostingProvider');
  }
  
  return context;
};

// Helper function to reset job posting state for testing
export const resetJobPostingState = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('emviapp_job_posting_state');
  }
};

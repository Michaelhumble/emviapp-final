
export interface ProfileRequirement {
  role: string;
  requiredFields: string[];
  optionalFields: string[];
  minCompletionPercentage: number;
}

export interface ProfileCompletionStatus {
  isComplete: boolean;
  completionPercentage: number;
  requiredFields: string[];
  optionalFields: string[];
  minCompletionPercentage: number;
  missingFields: string[];
}


// Fix the function signature to match the expected parameters
const handlePlanChange = (newPricing: string) => {
  setSelectedPlan(newPricing);
};

// Adjust how you call this function from elsewhere in the code
handlePlanChange(option.id);

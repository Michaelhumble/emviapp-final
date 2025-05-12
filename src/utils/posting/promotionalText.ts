
/**
 * Generates promotional text based on job listing details
 * @param industry - The industry category
 * @param hasWeeklyPay - Whether weekly pay is offered
 * @returns A promotional blurb to highlight in the job listing
 */
export const generatePromotionalText = (
  industry: string,
  hasWeeklyPay: boolean = false
): string => {
  const industryText = {
    nails: "nail technicians",
    hair: "hair stylists",
    tattoo: "tattoo artists",
    eyebrowLash: "lash and brow specialists",
    massage: "massage therapists"
  };
  
  const industrySpecificText = industryText[industry as keyof typeof industryText] || "professionals";
  
  let promo = `Looking for experienced ${industrySpecificText}!`;
  
  if (hasWeeklyPay) {
    promo += " Weekly pay available!";
  }
  
  return promo;
};

/**
 * Generates Vietnamese promotional text based on job listing details
 * @param industry - The industry category
 * @param hasWeeklyPay - Whether weekly pay is offered
 * @returns A promotional blurb in Vietnamese to highlight in the job listing
 */
export const generateVietnamesePromotionalText = (
  industry: string,
  hasWeeklyPay: boolean = false
): string => {
  const industryText = {
    nails: "thợ nail",
    hair: "thợ tóc",
    tattoo: "nghệ sĩ xăm",
    eyebrowLash: "chuyên gia lông mi và lông mày",
    massage: "thợ massage"
  };
  
  const industrySpecificText = industryText[industry as keyof typeof industryText] || "chuyên gia";
  
  let promo = `Đang tìm ${industrySpecificText} có kinh nghiệm!`;
  
  if (hasWeeklyPay) {
    promo += " Trả lương hàng tuần!";
  }
  
  return promo;
};

/**
 * Generates promotional text for first-time posters
 * @param isFirstPost - Whether this is the user's first post
 * @returns A promotional blurb for first-time posters
 */
export const getFirstPostPromotionalText = (isFirstPost: boolean): string => {
  return isFirstPost 
    ? "First post discount applied!" 
    : "";
};


/**
 * Helper functions to generate placeholder content for expired or demo listings
 */

export const generatePlaceholderResponsibilities = (title: string) => {
  const baseResponsibilities = [
    "Provide exceptional client services",
    "Maintain cleanliness and organization of work area",
    "Follow all health and safety protocols"
  ];
  
  if (title.toLowerCase().includes('hair')) {
    return [...baseResponsibilities, 
      "Perform haircuts, styling, and color services", 
      "Consult with clients on hair treatment options",
      "Recommend appropriate hair care products"
    ];
  } else if (title.toLowerCase().includes('nail')) {
    return [...baseResponsibilities, 
      "Perform manicures, pedicures, and nail enhancements", 
      "Apply gel and traditional polish techniques",
      "Create custom nail art designs upon request"
    ];
  } else {
    return [...baseResponsibilities, 
      "Perform beauty services according to client requests", 
      "Stay updated on latest beauty trends and techniques",
      "Build and maintain a loyal client base"
    ];
  }
};

export const generatePlaceholderQualifications = () => {
  return [
    "Valid cosmetology/specialty license required",
    "Minimum 1-2 years of salon experience preferred",
    "Strong communication and customer service skills",
    "Positive attitude and team-oriented mindset",
    "Bilingual (English/Vietnamese) a plus"
  ];
};

export const generatePlaceholderBenefits = (weeklyPay: boolean) => {
  const baseBenefits = [
    "Flexible scheduling available",
    "Professional development opportunities",
    "Product discounts",
  ];
  
  if (weeklyPay) {
    baseBenefits.push("Weekly pay 💰");
    baseBenefits.push("Bao Lương Nếu Cần ✅");
  } else {
    baseBenefits.push("Competitive commission structure");
  }
  
  return [
    ...baseBenefits,
    "Friendly, drama-free work environment 💎",
    "Growing clientele base ✨"
  ];
};

export const generatePlaceholderCompanyDescription = (location: string) => {
  const locations = {
    "CA": "Located in a bustling shopping center with high foot traffic, our established salon offers a modern, upscale environment with loyal clientele in the beautiful California area.",
    "TX": "Our Texas-based salon provides a friendly, family atmosphere with a steady stream of clients in a rapidly growing community. We pride ourselves on Southern hospitality and quality service.",
    "FL": "Situated in sunny Florida, our salon caters to a diverse clientele in a vibrant location. We offer a relaxing atmosphere where clients come to be pampered and beautified.",
    "NY": "Our New York salon features a fast-paced, trendy environment in a prime location. We serve a diverse, fashion-forward clientele who expect the latest styles and techniques."
  };
  
  for (const [state, description] of Object.entries(locations)) {
    if (location.includes(state)) {
      return description;
    }
  }
  
  return "Our established salon offers a professional, friendly environment with a steady clientele base. We focus on quality service and creating a positive experience for both our team members and clients.";
};


// Add the missing helper functions
const getRandomSalaryRange = () => {
  const ranges = [
    "$800-1200/week", 
    "$1000-1500/week", 
    "$900-1300/week", 
    "$700-1100/week",
    "$1200-1800/week"
  ];
  return ranges[Math.floor(Math.random() * ranges.length)];
};

const getRandomSpecialties = () => {
  const specialties = [
    ["Acrylic", "Gel", "Pedicure"],
    ["Dip Powder", "Nail Art", "Manicure"],
    ["Acrylic", "Pedicure"],
    ["Gel", "Nail Art", "Manicure", "Pedicure"],
    ["Dip Powder", "Acrylic", "Gel"]
  ];
  return specialties[Math.floor(Math.random() * specialties.length)];
};

export const generateVietnameseNailSamples = () => {
  // Sample function to generate Vietnamese nail job samples
  // Implementation will be added when needed
  return [];
};


// Format date from ISO string
export const formatDate = (dateString?: string | null) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Get role display text
export const getRoleDisplay = (role?: string | null) => {
  if (!role) return "Member";
  
  switch(role) {
    case "artist":
      return "Nail Artist";
    case "nail technician/artist":
      return "Nail Technician/Artist";
    case "salon":
      return "Salon Business";
    case "owner":
      return "Salon Owner";
    case "supplier":
    case "beauty supplier":
      return "Beauty Supplier";
    case "vendor":
      return "Vendor";
    case "freelancer":
      return "Freelance Artist";
    case "renter":
      return "Booth Renter";
    case "customer":
      return "Beauty Enthusiast";
    default:
      return role.charAt(0).toUpperCase() + role.slice(1);
  }
};

// Determine which profile section to show based on user role
export const getRoleSpecificSection = (userRole?: string | null) => {
  if (userRole === "artist" || userRole === "nail technician/artist" || userRole === "renter") {
    return "artist";
  }
  
  if (userRole === "salon" || userRole === "owner") {
    return "salon";
  }
  
  if (userRole === "vendor" || userRole === "supplier" || userRole === "beauty supplier") {
    return "supplier";
  }
  
  if (userRole === "customer") {
    return "customer";
  }
  
  return "other";
};

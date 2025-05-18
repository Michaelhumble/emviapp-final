
// Job specialties for various beauty industry roles

export const beautySpecialties = {
  nails: [
    "Gel Manicures", 
    "Acrylic Nails", 
    "Nail Art", 
    "Dipping Powder", 
    "Natural Nails", 
    "Pedicures",
    "3D Nail Art",
    "Paraffin Treatments",
    "Nail Repair",
    "Vietnamese Techniques"
  ],
  hair: [
    "Hair Cutting", 
    "Hair Coloring", 
    "Balayage", 
    "Blowouts", 
    "Extensions", 
    "Styling",
    "Hair Treatments",
    "Men's Grooming",
    "Keratin Treatments",
    "Bridal Styling"
  ],
  lashes: [
    "Classic Lash Extensions", 
    "Volume Lashes", 
    "Hybrid Lashes", 
    "Lash Lifts", 
    "Lash Tinting",
    "Mega Volume",
    "Bottom Lashes",
    "Lash Removal"
  ],
  brows: [
    "Eyebrow Shaping", 
    "Microblading", 
    "Brow Lamination", 
    "Brow Tinting", 
    "Threading",
    "Henna Brows",
    "Powder Brows",
    "Combo Brows"
  ],
  skincare: [
    "Facials", 
    "Chemical Peels", 
    "Microdermabrasion", 
    "Microneedling", 
    "LED Therapy",
    "Hydrafacial",
    "Acne Treatments",
    "Anti-aging Treatments"
  ],
  massage: [
    "Swedish Massage", 
    "Deep Tissue", 
    "Hot Stone", 
    "Reflexology", 
    "Sports Massage",
    "Prenatal Massage",
    "Aromatherapy",
    "Thai Massage"
  ],
  tattoo: [
    "Traditional", 
    "Japanese", 
    "Watercolor", 
    "Blackwork", 
    "Realism",
    "Fine Line",
    "Cover-ups",
    "Cosmetic Tattooing"
  ],
  makeup: [
    "Bridal Makeup", 
    "Special Event", 
    "Airbrush", 
    "Editorial", 
    "Natural Looks",
    "HD Makeup",
    "Special FX",
    "Contouring"
  ],
  barber: [
    "Classic Cuts", 
    "Fades", 
    "Beard Trims", 
    "Hot Towel Shaves", 
    "Lineup",
    "Hair Design",
    "Razor Work",
    "Beard Coloring"
  ]
};

export const commonRequirements = [
  "2+ years experience",
  "Client-friendly attitude",
  "Clean and organized",
  "Reliable transportation",
  "Weekend availability",
  "Bilingual (English/Vietnamese)",
  "Product knowledge",
  "Customer service skills",
  "Portfolio of work",
  "Follows sanitation protocols"
];

export const getAllSpecialties = () => {
  let allSpecialties: string[] = [];
  
  Object.values(beautySpecialties).forEach(categorySpecialties => {
    allSpecialties = [...allSpecialties, ...categorySpecialties];
  });
  
  return allSpecialties;
};

export default {
  beautySpecialties,
  commonRequirements,
  getAllSpecialties
};

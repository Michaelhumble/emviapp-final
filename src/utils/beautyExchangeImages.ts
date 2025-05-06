
/**
 * Centralized storage for Beauty Exchange image paths
 * Contains arrays for all listing sections
 */

// Nail salon images
export const nailSalonImages = [
  "/lovable-uploads/17e65a2b-10a7-4b2a-a839-340a80da6903.png",
  "/lovable-uploads/0d50d1e2-4ac5-4520-8d66-dffc59da9302.png",
  "/lovable-uploads/b4f26c5f-97b6-4a68-9acf-1b370937ef1a.png",
  "/lovable-uploads/323c0530-2a0b-45ee-9065-646dee476f89.png",
  "/lovable-uploads/a59ea036-184e-4057-b4ba-8a0f2ab2c365.png"
];

// Hair salon images
export const hairSalonImages = [
  "/lovable-uploads/565dbac0-48b7-4aaf-b1ad-7c97ca38e1e9.png",
  "/lovable-uploads/d62af349-7eeb-443d-b168-7036cabfd2ac.png",
  "/lovable-uploads/b8f0c457-76d8-46e9-9ee6-4869928cbea6.png",
  "/lovable-uploads/05372b9b-5a24-4f86-82c8-e0681ed539eb.png", 
  "/lovable-uploads/402f947b-3877-4d57-8ced-7191eb207b9d.png"
];

// Barber shop images
export const barberShopImages = [
  "/lovable-uploads/fb41198f-fd0f-4562-8338-ee94ac01a8f8.png",
  "/lovable-uploads/0bbbfeba-7132-4060-9a23-404a7859b082.png", 
  "/lovable-uploads/4edfaa59-6542-4bad-9e6b-1cd0d7ae9113.png",
  "/lovable-uploads/234cc568-7237-4f55-9ae3-272a74508d1c.png",
  "/lovable-uploads/e65d38e6-6072-4b4b-b6ed-0a81c2e1a44e.png"
];

// Tattoo studio images
export const tattooStudioImages = [
  "/lovable-uploads/6af7cc02-b6cf-4c54-9c03-9510d543d3f1.png",  
  "/lovable-uploads/7af46f7a-c8f1-497f-a8e6-271856b882eb.png",  
  "/lovable-uploads/cd91684d-63c1-444f-baea-5814694edf50.png",  
  "/lovable-uploads/f5696d4d-294d-42d6-b633-ab23dcacc6d2.png",  
  "/lovable-uploads/1d1e2a21-2e5b-452d-a583-57240e114a67.png",  
];

// Makeup studio images - Use proper image paths instead of placeholders
export const makeupStudioImages = [
  "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png", 
  "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png",
  "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png",
  "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png",
  "/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png"
];

// Skincare clinic images - Use proper image paths instead of placeholders
export const skincareClinicImages = [
  "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
  "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png",
  "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
  "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
  "/lovable-uploads/c54c0558-09db-483f-b844-bacb8824f789.png" || "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png" // Fallback image
];

// Standardized card destinations for all listing types
export const cardDestinations = {
  nail: [
    { id: "nail-1", type: "salon", path: "/salons/nail-1" },
    { id: "nail-2", type: "job", path: "/jobs/nail-2" },
    { id: "nail-3", type: "salon", path: "/salons/nail-3" },
    { id: "nail-4", type: "job", path: "/jobs/nail-4" },
    { id: "nail-5", type: "salon", path: "/salons/nail-5" }
  ],
  hair: [
    { id: "hair-1", type: "salon", path: "/jobs/hair-1" },
    { id: "hair-2", type: "job", path: "/jobs/hair-2" },
    { id: "hair-3", type: "salon", path: "/jobs/hair-3" },
    { id: "hair-4", type: "job", path: "/jobs/hair-4" },
    { id: "hair-5", type: "salon", path: "/jobs/hair-5" }
  ],
  barber: [
    { id: "barber-1", type: "salon", path: "/salons/barber-1" },
    { id: "barber-2", type: "job", path: "/jobs/barber-2" },
    { id: "barber-3", type: "salon", path: "/salons/barber-3" },
    { id: "barber-4", type: "job", path: "/jobs/barber-4" },
    { id: "barber-5", type: "salon", path: "/salons/barber-5" }
  ],
  tattoo: [
    { id: "tattoo-1", type: "salon", path: "/salons/tattoo-1" },
    { id: "tattoo-2", type: "job", path: "/jobs/tattoo-2" },
    { id: "tattoo-3", type: "salon", path: "/salons/tattoo-3" },
    { id: "tattoo-4", type: "job", path: "/jobs/tattoo-4" },
    { id: "tattoo-5", type: "salon", path: "/salons/tattoo-5" }
  ],
  makeup: [
    { id: "makeup-1", type: "salon", path: "/salons/makeup-1" },
    { id: "makeup-2", type: "job", path: "/jobs/makeup-2" },
    { id: "makeup-3", type: "salon", path: "/salons/makeup-3" },
    { id: "makeup-4", type: "job", path: "/jobs/makeup-4" },
    { id: "makeup-5", type: "salon", path: "/salons/makeup-5" }
  ],
  skincare: [
    { id: "skincare-1", type: "salon", path: "/salons/skincare-1" },
    { id: "skincare-2", type: "job", path: "/jobs/skincare-2" },
    { id: "skincare-3", type: "salon", path: "/salons/skincare-3" },
    { id: "skincare-4", type: "job", path: "/jobs/skincare-4" },
    { id: "skincare-5", type: "salon", path: "/salons/skincare-5" }
  ]
};

import { IndustryListing } from '@/types/industryListing';

// Helper function to generate image rotation
const getImageUrl = (industry: string, images: string[], index: number) => {
  return images[index % images.length];
};

// Industry image arrays
const industryImages = {
  hair: [
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(1).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(2).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(3).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(5).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated.png'
  ],
  barber: [
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(1).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(2).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(3).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(4).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(6).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated.png'
  ],
  massage: [
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(2).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(3).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated.png'
  ],
  skincare: [
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(1).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(2).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(3).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(4).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(5).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated.png'
  ],
  makeup: [
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-45.png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-46.png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-47.png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-48.png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-49.png'
  ],
  tattoo: [
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(1).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(2).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(3).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(4).png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated.png'
  ],
  browsLashes: [
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-11.png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-12.png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-13.png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-14.png',
    'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-15.png'
  ]
};

// Generate comprehensive listings for each industry (30 expired + 20 active)
function generateComprehensiveListings(industry: string, images: string[]) {
  const listings: IndustryListing[] = [];
  
  // Generate 30 expired listings
  for (let i = 1; i <= 30; i++) {
    listings.push({
      id: `${industry}-expired-${i}`,
      title: `${industry.charAt(0).toUpperCase() + industry.slice(1)} Studio ${i}`,
      location: 'Various Locations',
      salary: '$1,500–$2,500/week',
      tier: 'featured',
      summary: `Professional ${industry} position filled.`,
      imageUrl: getImageUrl(industry, images, i - 1),
      rating: 4.0 + (Math.random() * 0.9),
      isPositionFilled: true,
      fullDescription: `This ${industry} position has been filled.`,
      fomoText: 'Position Filled'
    });
  }
  
  // Generate 20 active listings
  for (let i = 1; i <= 20; i++) {
    listings.push({
      id: `${industry}-active-${i}`,
      title: `${industry.charAt(0).toUpperCase() + industry.slice(1)} Professional ${i}`,
      location: 'Premium Locations',
      salary: '$1,800–$3,000/week',
      tier: 'featured',
      summary: `Seeking skilled ${industry} professionals.`,
      imageUrl: getImageUrl(industry, images, i - 1),
      rating: 4.2 + (Math.random() * 0.7),
      fullDescription: `Professional ${industry} position available.`
    });
  }
  
  return listings;
}

// Export comprehensive listings for each industry
export const comprehensiveHairListings = generateComprehensiveListings('hair', industryImages.hair);
export const comprehensiveBarberListings = generateComprehensiveListings('barber', industryImages.barber);
export const comprehensiveMassageListings = generateComprehensiveListings('massage', industryImages.massage);
export const comprehensiveSkincareListings = generateComprehensiveListings('skincare', industryImages.skincare);
export const comprehensiveMakeupListings = generateComprehensiveListings('makeup', industryImages.makeup);
export const comprehensiveTattooListings = generateComprehensiveListings('tattoo', industryImages.tattoo);
export const comprehensiveBrowsLashesListings = generateComprehensiveListings('browsLashes', industryImages.browsLashes);
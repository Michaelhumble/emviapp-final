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

// Realistic business names and locations for each industry
const industryData = {
  hair: {
    expiredBusinesses: [
      { name: "Salon Bliss", location: "Beverly Hills, CA" },
      { name: "Golden Scissors Studio", location: "Manhattan, NY" },
      { name: "Hair Haven Salon", location: "Austin, TX" },
      { name: "The Style Lounge", location: "Seattle, WA" },
      { name: "Luxe Hair Studio", location: "Miami, FL" },
      { name: "Radiance Hair Salon", location: "Chicago, IL" },
      { name: "Elite Hair Design", location: "Denver, CO" },
      { name: "Hair Artistry Studio", location: "Portland, OR" },
      { name: "Chic Hair Boutique", location: "Atlanta, GA" },
      { name: "Crown Hair Studio", location: "Phoenix, AZ" },
      { name: "Bella Hair Salon", location: "Nashville, TN" },
      { name: "Platinum Hair Studio", location: "Las Vegas, NV" },
      { name: "Hair Gallery", location: "San Francisco, CA" },
      { name: "Glamour Hair Lounge", location: "Dallas, TX" },
      { name: "Hair Sanctuary", location: "Boston, MA" },
      { name: "Studio 9 Hair Salon", location: "Minneapolis, MN" },
      { name: "The Hair Studio", location: "Charlotte, NC" },
      { name: "Mane Event Salon", location: "Tampa, FL" },
      { name: "Hair Craft Studio", location: "San Diego, CA" },
      { name: "Trendy Hair Salon", location: "Orlando, FL" },
      { name: "Hair Magic Studio", location: "Pittsburgh, PA" },
      { name: "Silk Hair Salon", location: "Sacramento, CA" },
      { name: "Hair Dreams Studio", location: "Cleveland, OH" },
      { name: "Velvet Hair Lounge", location: "Detroit, MI" },
      { name: "Hair Couture Salon", location: "Kansas City, MO" },
      { name: "Diamond Hair Studio", location: "Salt Lake City, UT" },
      { name: "Hair Elite Salon", location: "Milwaukee, WI" },
      { name: "Prestige Hair Studio", location: "Oklahoma City, OK" },
      { name: "Hair Luxe Salon", location: "Richmond, VA" },
      { name: "Signature Hair Studio", location: "Memphis, TN" }
    ],
    activeBusinesses: [
      { name: "Artisan Hair Collective", location: "West Hollywood, CA" },
      { name: "Metropolitan Hair Studio", location: "Brooklyn, NY" },
      { name: "Zenith Hair Salon", location: "Scottsdale, AZ" },
      { name: "Harmony Hair Lounge", location: "Charleston, SC" },
      { name: "Luxe Hair Boutique", location: "Newport Beach, CA" },
      { name: "Elite Hair Gallery", location: "Georgetown, DC" },
      { name: "Avant Hair Studio", location: "Tribeca, NY" },
      { name: "Prestige Hair Lounge", location: "Buckhead, GA" },
      { name: "Crown Hair Gallery", location: "River North, IL" },
      { name: "Platinum Hair Collective", location: "South Beach, FL" },
      { name: "Hair Artisan Studio", location: "Pearl District, OR" },
      { name: "Salon Luxuria", location: "Upper East Side, NY" },
      { name: "Hair Sophisticate", location: "Beacon Hill, MA" },
      { name: "Glamour Hair Gallery", location: "Fashion District, LA" },
      { name: "Chic Hair Collective", location: "Capitol Hill, WA" },
      { name: "Hair Elegance Studio", location: "Highland Park, TX" },
      { name: "Luxe Hair Design", location: "Cherry Creek, CO" },
      { name: "Hair Couture Gallery", location: "Coral Gables, FL" },
      { name: "Elite Hair Boutique", location: "Shadyside, PA" },
      { name: "Hair Sophistique", location: "Nob Hill, CA" }
    ]
  },
  barber: {
    expiredBusinesses: [
      { name: "Classic Cuts Barbershop", location: "Brooklyn, NY" },
      { name: "The Gentleman's Cut", location: "Chicago, IL" },
      { name: "Old School Barbershop", location: "Philadelphia, PA" },
      { name: "Sharp Edge Barbers", location: "Austin, TX" },
      { name: "Vintage Barbershop", location: "Portland, OR" },
      { name: "The Barber's Den", location: "Nashville, TN" },
      { name: "Crown Barbershop", location: "Atlanta, GA" },
      { name: "Elite Men's Grooming", location: "Miami, FL" },
      { name: "The Modern Barber", location: "Seattle, WA" },
      { name: "Prestige Barbershop", location: "Denver, CO" },
      { name: "Signature Cuts", location: "Dallas, TX" },
      { name: "The Barber Studio", location: "San Francisco, CA" },
      { name: "Gentleman's Choice", location: "Boston, MA" },
      { name: "Sharp Style Barbers", location: "Phoenix, AZ" },
      { name: "Classic Barbering Co.", location: "Minneapolis, MN" },
      { name: "The Cut House", location: "Charlotte, NC" },
      { name: "Urban Barbershop", location: "Tampa, FL" },
      { name: "The Shave Shop", location: "San Diego, CA" },
      { name: "Distinguished Cuts", location: "Orlando, FL" },
      { name: "The Barber's Chair", location: "Pittsburgh, PA" },
      { name: "Premium Cuts", location: "Sacramento, CA" },
      { name: "The Grooming Room", location: "Cleveland, OH" },
      { name: "Refined Barbershop", location: "Detroit, MI" },
      { name: "The Cut Co.", location: "Kansas City, MO" },
      { name: "Signature Barbershop", location: "Salt Lake City, UT" },
      { name: "The Barber's Guild", location: "Milwaukee, WI" },
      { name: "Elite Cuts", location: "Oklahoma City, OK" },
      { name: "The Shaving Parlor", location: "Richmond, VA" },
      { name: "Classic Style Barbers", location: "Memphis, TN" },
      { name: "The Barbering House", location: "Louisville, KY" }
    ],
    activeBusinesses: [
      { name: "Royal Crown Barbershop", location: "Manhattan, NY" },
      { name: "The Distinguished Gentleman", location: "Beverly Hills, CA" },
      { name: "Metropolitan Barbers", location: "SoHo, NY" },
      { name: "Prestige Men's Grooming", location: "River North, IL" },
      { name: "The Barbering Collective", location: "Wynwood, FL" },
      { name: "Luxury Cuts Barbershop", location: "Capitol Hill, WA" },
      { name: "The Refined Barber", location: "Highland Park, TX" },
      { name: "Elite Grooming Lounge", location: "Cherry Creek, CO" },
      { name: "The Barber's Gallery", location: "Back Bay, MA" },
      { name: "Crown & Shave Co.", location: "Gaslamp Quarter, CA" },
      { name: "The Gentleman's Parlor", location: "Pearl District, OR" },
      { name: "Signature Style Barbers", location: "Music Row, TN" },
      { name: "The Barbering Studio", location: "Buckhead, GA" },
      { name: "Luxury Men's Grooming", location: "Scottsdale, AZ" },
      { name: "The Cut & Shave Co.", location: "Short North, OH" },
      { name: "Elite Barbering House", location: "Old City, PA" },
      { name: "The Grooming Collective", location: "Hayes Valley, CA" },
      { name: "Distinguished Barbers", location: "Corktown, MI" },
      { name: "The Barber's Craft", location: "Crossroads, MO" },
      { name: "Premium Grooming Studio", location: "Sugar House, UT" }
    ]
  },
  massage: {
    expiredBusinesses: [
      { name: "Serenity Spa & Massage", location: "Scottsdale, AZ" },
      { name: "Tranquil Touch Wellness", location: "Malibu, CA" },
      { name: "Harmony Massage Therapy", location: "Asheville, NC" },
      { name: "Zen Garden Spa", location: "Sedona, AZ" },
      { name: "Peaceful Palms Massage", location: "Key West, FL" },
      { name: "Mountain View Wellness", location: "Boulder, CO" },
      { name: "Ocean Breeze Massage", location: "Half Moon Bay, CA" },
      { name: "Sacred Stone Spa", location: "Taos, NM" },
      { name: "Forest Path Wellness", location: "Olympic Peninsula, WA" },
      { name: "Desert Rose Spa", location: "Palm Springs, CA" },
      { name: "Healing Hands Massage", location: "Martha's Vineyard, MA" },
      { name: "River Rock Wellness", location: "Jackson Hole, WY" },
      { name: "Moonlight Massage Spa", location: "Carmel, CA" },
      { name: "Lotus Blossom Wellness", location: "Kauai, HI" },
      { name: "Pine Tree Massage", location: "Lake Tahoe, CA" },
      { name: "Sunset Spa Retreat", location: "Outer Banks, NC" },
      { name: "Crystal Springs Massage", location: "Hot Springs, AR" },
      { name: "Sage Wellness Center", location: "Santa Fe, NM" },
      { name: "Coastal Massage Therapy", location: "Mendocino, CA" },
      { name: "Highland Healing Spa", location: "Blue Ridge Mountains, VA" },
      { name: "Wildflower Wellness", location: "Glacier National Park, MT" },
      { name: "Sunrise Massage Studio", location: "Acadia National Park, ME" },
      { name: "Prairie Wind Spa", location: "Yellowstone, WY" },
      { name: "Canyon View Massage", location: "Zion National Park, UT" },
      { name: "Redwood Retreat Spa", location: "Humboldt County, CA" },
      { name: "Lakeside Wellness", location: "Finger Lakes, NY" },
      { name: "Alpine Massage Therapy", location: "Vail, CO" },
      { name: "Meadow Springs Spa", location: "Shenandoah, VA" },
      { name: "Golden Valley Massage", location: "Napa Valley, CA" },
      { name: "Starlight Wellness Center", location: "Death Valley, CA" }
    ],
    activeBusinesses: [
      { name: "Luxury Wellness Sanctuary", location: "Beverly Hills, CA" },
      { name: "Elite Massage Therapy", location: "Upper East Side, NY" },
      { name: "Prestige Wellness Studio", location: "Coral Gables, FL" },
      { name: "Metropolitan Spa Collective", location: "SoHo, NY" },
      { name: "Platinum Massage Lounge", location: "Rodeo Drive, CA" },
      { name: "Royal Wellness Retreat", location: "Georgetown, DC" },
      { name: "Signature Spa Experience", location: "Tribeca, NY" },
      { name: "Elite Healing Arts", location: "South Beach, FL" },
      { name: "Luxury Touch Wellness", location: "Beacon Hill, MA" },
      { name: "Crown Spa & Massage", location: "River North, IL" },
      { name: "Prestige Healing Center", location: "Buckhead, GA" },
      { name: "Metropolitan Wellness", location: "Capitol Hill, WA" },
      { name: "Elite Spa Sanctuary", location: "Highland Park, TX" },
      { name: "Luxury Massage Gallery", location: "Cherry Creek, CO" },
      { name: "Signature Wellness Studio", location: "Pearl District, OR" },
      { name: "Crown Healing Arts", location: "Gaslamp Quarter, CA" },
      { name: "Prestige Spa Collective", location: "Short North, OH" },
      { name: "Elite Wellness Lounge", location: "Old City, PA" },
      { name: "Metropolitan Healing", location: "Hayes Valley, CA" },
      { name: "Luxury Spa Experience", location: "Crossroads, MO" }
    ]
  },
  skincare: {
    expiredBusinesses: [
      { name: "Radiant Skin Studio", location: "Beverly Hills, CA" },
      { name: "Glow Facial Spa", location: "Manhattan, NY" },
      { name: "Pure Aesthetics Clinic", location: "Scottsdale, AZ" },
      { name: "Luminous Skin Care", location: "Miami Beach, FL" },
      { name: "Crystal Clear Aesthetics", location: "Seattle, WA" },
      { name: "Flawless Facial Studio", location: "Austin, TX" },
      { name: "Rejuvenation Med Spa", location: "Chicago, IL" },
      { name: "Skin Perfection Clinic", location: "Denver, CO" },
      { name: "Ageless Beauty Studio", location: "Atlanta, GA" },
      { name: "Clarity Skin Clinic", location: "Phoenix, AZ" },
      { name: "Skin Revival Studio", location: "Nashville, TN" },
      { name: "Ethereal Aesthetics", location: "Las Vegas, NV" },
      { name: "Skin Sanctuary Spa", location: "San Francisco, CA" },
      { name: "Luxe Facial Studio", location: "Dallas, TX" },
      { name: "Skin Wellness Clinic", location: "Boston, MA" },
      { name: "Pristine Aesthetics", location: "Minneapolis, MN" },
      { name: "Skin Elite Studio", location: "Charlotte, NC" },
      { name: "Glow Aesthetics Spa", location: "Tampa, FL" },
      { name: "Skin Artistry Clinic", location: "San Diego, CA" },
      { name: "Radiance Facial Spa", location: "Orlando, FL" },
      { name: "Skin Luxe Studio", location: "Pittsburgh, PA" },
      { name: "Pure Glow Aesthetics", location: "Sacramento, CA" },
      { name: "Skin Renewal Clinic", location: "Cleveland, OH" },
      { name: "Luminous Facial Spa", location: "Detroit, MI" },
      { name: "Skin Perfection Studio", location: "Kansas City, MO" },
      { name: "Radiant Aesthetics", location: "Salt Lake City, UT" },
      { name: "Skin Elite Clinic", location: "Milwaukee, WI" },
      { name: "Glow Facial Studio", location: "Oklahoma City, OK" },
      { name: "Skin Luxe Clinic", location: "Richmond, VA" },
      { name: "Pure Skin Studio", location: "Memphis, TN" }
    ],
    activeBusinesses: [
      { name: "Beverly Hills Dermatology", location: "Beverly Hills, CA" },
      { name: "Manhattan Skin Institute", location: "Upper East Side, NY" },
      { name: "Elite Aesthetics Studio", location: "Coral Gables, FL" },
      { name: "Prestige Skin Clinic", location: "SoHo, NY" },
      { name: "Luxury Facial Lounge", location: "Rodeo Drive, CA" },
      { name: "Metropolitan Skin Care", location: "Georgetown, DC" },
      { name: "Signature Aesthetics", location: "Tribeca, NY" },
      { name: "Crown Skin Studio", location: "South Beach, FL" },
      { name: "Elite Dermatology Spa", location: "Beacon Hill, MA" },
      { name: "Prestige Facial Gallery", location: "River North, IL" },
      { name: "Luxury Skin Institute", location: "Buckhead, GA" },
      { name: "Metropolitan Aesthetics", location: "Capitol Hill, WA" },
      { name: "Elite Skin Sanctuary", location: "Highland Park, TX" },
      { name: "Signature Facial Studio", location: "Cherry Creek, CO" },
      { name: "Crown Aesthetics Spa", location: "Pearl District, OR" },
      { name: "Prestige Skin Gallery", location: "Gaslamp Quarter, CA" },
      { name: "Elite Facial Lounge", location: "Short North, OH" },
      { name: "Luxury Dermatology", location: "Old City, PA" },
      { name: "Metropolitan Skin Spa", location: "Hayes Valley, CA" },
      { name: "Signature Skin Studio", location: "Crossroads, MO" }
    ]
  },
  makeup: {
    expiredBusinesses: [
      { name: "Glamour Makeup Studio", location: "Hollywood, CA" },
      { name: "Beauty Artistry Lounge", location: "Manhattan, NY" },
      { name: "Makeup Magic Studio", location: "Miami, FL" },
      { name: "Glam Squad Beauty", location: "Las Vegas, NV" },
      { name: "Beauty Collective Studio", location: "Austin, TX" },
      { name: "Makeup Mastery Lounge", location: "Seattle, WA" },
      { name: "Beauty Bar Studio", location: "Chicago, IL" },
      { name: "Glam Beauty Lounge", location: "Denver, CO" },
      { name: "Makeup Artistry Studio", location: "Atlanta, GA" },
      { name: "Beauty Studio Pro", location: "Phoenix, AZ" },
      { name: "Glamour Beauty Bar", location: "Nashville, TN" },
      { name: "Makeup Gallery Studio", location: "San Francisco, CA" },
      { name: "Beauty Craft Lounge", location: "Dallas, TX" },
      { name: "Glam Studio Collective", location: "Boston, MA" },
      { name: "Beauty Elite Studio", location: "Minneapolis, MN" },
      { name: "Makeup Pro Lounge", location: "Charlotte, NC" },
      { name: "Beauty Artisan Studio", location: "Tampa, FL" },
      { name: "Glam Beauty Studio", location: "San Diego, CA" },
      { name: "Makeup Masters Lounge", location: "Orlando, FL" },
      { name: "Beauty Studio Elite", location: "Pittsburgh, PA" },
      { name: "Glamour Makeup Bar", location: "Sacramento, CA" },
      { name: "Beauty Pro Studio", location: "Cleveland, OH" },
      { name: "Makeup Artistry Bar", location: "Detroit, MI" },
      { name: "Beauty Collective Pro", location: "Kansas City, MO" },
      { name: "Glam Studio Elite", location: "Salt Lake City, UT" },
      { name: "Beauty Masters Studio", location: "Milwaukee, WI" },
      { name: "Makeup Pro Collective", location: "Oklahoma City, OK" },
      { name: "Beauty Studio Gallery", location: "Richmond, VA" },
      { name: "Glamour Pro Lounge", location: "Memphis, TN" },
      { name: "Beauty Elite Collective", location: "Louisville, KY" }
    ],
    activeBusinesses: [
      { name: "Prestige Beauty Atelier", location: "Beverly Hills, CA" },
      { name: "Elite Makeup Studio", location: "Upper East Side, NY" },
      { name: "Signature Beauty Lounge", location: "South Beach, FL" },
      { name: "Metropolitan Makeup", location: "SoHo, NY" },
      { name: "Crown Beauty Studio", location: "Rodeo Drive, CA" },
      { name: "Luxury Makeup Gallery", location: "Georgetown, DC" },
      { name: "Elite Beauty Collective", location: "Tribeca, NY" },
      { name: "Prestige Makeup Lounge", location: "Coral Gables, FL" },
      { name: "Signature Beauty Studio", location: "Beacon Hill, MA" },
      { name: "Crown Makeup Atelier", location: "River North, IL" },
      { name: "Luxury Beauty Lounge", location: "Buckhead, GA" },
      { name: "Metropolitan Beauty", location: "Capitol Hill, WA" },
      { name: "Elite Makeup Gallery", location: "Highland Park, TX" },
      { name: "Prestige Beauty Studio", location: "Cherry Creek, CO" },
      { name: "Signature Makeup Lounge", location: "Pearl District, OR" },
      { name: "Crown Beauty Gallery", location: "Gaslamp Quarter, CA" },
      { name: "Elite Beauty Studio", location: "Short North, OH" },
      { name: "Luxury Makeup Lounge", location: "Old City, PA" },
      { name: "Metropolitan Makeup", location: "Hayes Valley, CA" },
      { name: "Prestige Beauty Gallery", location: "Crossroads, MO" }
    ]
  },
  browsLashes: {
    expiredBusinesses: [
      { name: "Brow Beauty Studio", location: "Beverly Hills, CA" },
      { name: "Lash Lounge NYC", location: "Manhattan, NY" },
      { name: "Brow & Lash Bar", location: "Miami, FL" },
      { name: "Perfect Brows Studio", location: "Scottsdale, AZ" },
      { name: "Lash Artistry Lounge", location: "Austin, TX" },
      { name: "Brow Studio Elite", location: "Seattle, WA" },
      { name: "Lash & Brow Gallery", location: "Chicago, IL" },
      { name: "Brow Perfection Studio", location: "Denver, CO" },
      { name: "Lash Beauty Bar", location: "Atlanta, GA" },
      { name: "Brow Artistry Lounge", location: "Phoenix, AZ" },
      { name: "Lash Studio Pro", location: "Nashville, TN" },
      { name: "Brow & Lash Collective", location: "Las Vegas, NV" },
      { name: "Perfect Lash Studio", location: "San Francisco, CA" },
      { name: "Brow Gallery Lounge", location: "Dallas, TX" },
      { name: "Lash Perfection Bar", location: "Boston, MA" },
      { name: "Brow Studio Gallery", location: "Minneapolis, MN" },
      { name: "Lash Elite Studio", location: "Charlotte, NC" },
      { name: "Brow Artisan Lounge", location: "Tampa, FL" },
      { name: "Lash Beauty Studio", location: "San Diego, CA" },
      { name: "Brow Masters Gallery", location: "Orlando, FL" },
      { name: "Lash Studio Elite", location: "Pittsburgh, PA" },
      { name: "Brow Beauty Bar", location: "Sacramento, CA" },
      { name: "Lash Pro Studio", location: "Cleveland, OH" },
      { name: "Brow Artistry Bar", location: "Detroit, MI" },
      { name: "Lash Collective Pro", location: "Kansas City, MO" },
      { name: "Brow Studio Elite", location: "Salt Lake City, UT" },
      { name: "Lash Masters Studio", location: "Milwaukee, WI" },
      { name: "Brow Pro Collective", location: "Oklahoma City, OK" },
      { name: "Lash Studio Gallery", location: "Richmond, VA" },
      { name: "Brow Elite Lounge", location: "Memphis, TN" }
    ],
    activeBusinesses: [
      { name: "Elite Brow & Lash Studio", location: "Beverly Hills, CA" },
      { name: "Prestige Lash Lounge", location: "Upper East Side, NY" },
      { name: "Signature Brow Studio", location: "South Beach, FL" },
      { name: "Metropolitan Lash Bar", location: "SoHo, NY" },
      { name: "Crown Brow & Lash", location: "Rodeo Drive, CA" },
      { name: "Luxury Lash Studio", location: "Georgetown, DC" },
      { name: "Elite Brow Gallery", location: "Tribeca, NY" },
      { name: "Prestige Lash Atelier", location: "Coral Gables, FL" },
      { name: "Signature Brow Lounge", location: "Beacon Hill, MA" },
      { name: "Crown Lash Studio", location: "River North, IL" },
      { name: "Luxury Brow & Lash", location: "Buckhead, GA" },
      { name: "Metropolitan Brow Bar", location: "Capitol Hill, WA" },
      { name: "Elite Lash Gallery", location: "Highland Park, TX" },
      { name: "Prestige Brow Studio", location: "Cherry Creek, CO" },
      { name: "Signature Lash Lounge", location: "Pearl District, OR" },
      { name: "Crown Brow Gallery", location: "Gaslamp Quarter, CA" },
      { name: "Elite Lash Studio", location: "Short North, OH" },
      { name: "Luxury Brow Lounge", location: "Old City, PA" },
      { name: "Metropolitan Lash", location: "Hayes Valley, CA" },
      { name: "Prestige Brow Gallery", location: "Crossroads, MO" }
    ]
  },
  tattoo: {
    expiredBusinesses: [
      { name: "Ink Masters Studio", location: "Hollywood, CA" },
      { name: "Tattoo Artistry NYC", location: "Brooklyn, NY" },
      { name: "Sacred Ink Studio", location: "Austin, TX" },
      { name: "Iron & Ink Tattoo", location: "Portland, OR" },
      { name: "Rebel Ink Studio", location: "Miami, FL" },
      { name: "Black Diamond Tattoo", location: "Las Vegas, NV" },
      { name: "Artisan Ink Studio", location: "Seattle, WA" },
      { name: "Tattoo Gallery Pro", location: "Chicago, IL" },
      { name: "Ink Culture Studio", location: "Denver, CO" },
      { name: "Sacred Art Tattoo", location: "Atlanta, GA" },
      { name: "Ink Legacy Studio", location: "Phoenix, AZ" },
      { name: "Tattoo Masters Collective", location: "Nashville, TN" },
      { name: "Dark Art Tattoo", location: "San Francisco, CA" },
      { name: "Ink Revolution Studio", location: "Dallas, TX" },
      { name: "Tattoo Craft Collective", location: "Boston, MA" },
      { name: "Ink Elite Studio", location: "Minneapolis, MN" },
      { name: "Sacred Tattoo Gallery", location: "Charlotte, NC" },
      { name: "Ink Artisan Studio", location: "Tampa, FL" },
      { name: "Tattoo Pro Collective", location: "San Diego, CA" },
      { name: "Dark Ink Studio", location: "Orlando, FL" },
      { name: "Tattoo Elite Gallery", location: "Pittsburgh, PA" },
      { name: "Ink Masters Collective", location: "Sacramento, CA" },
      { name: "Sacred Art Studio", location: "Cleveland, OH" },
      { name: "Tattoo Artistry Pro", location: "Detroit, MI" },
      { name: "Ink Culture Collective", location: "Kansas City, MO" },
      { name: "Dark Art Gallery", location: "Salt Lake City, UT" },
      { name: "Tattoo Masters Studio", location: "Milwaukee, WI" },
      { name: "Ink Pro Collective", location: "Oklahoma City, OK" },
      { name: "Sacred Tattoo Studio", location: "Richmond, VA" },
      { name: "Tattoo Elite Collective", location: "Memphis, TN" }
    ],
    activeBusinesses: [
      { name: "Elite Tattoo Gallery", location: "West Hollywood, CA" },
      { name: "Prestige Ink Studio", location: "Lower East Side, NY" },
      { name: "Signature Tattoo Atelier", location: "Wynwood, FL" },
      { name: "Metropolitan Ink", location: "Williamsburg, NY" },
      { name: "Crown Tattoo Studio", location: "Venice Beach, CA" },
      { name: "Luxury Ink Gallery", location: "Capitol Hill, WA" },
      { name: "Elite Art Studio", location: "Deep Ellum, TX" },
      { name: "Prestige Tattoo Collective", location: "RiNo, CO" },
      { name: "Signature Ink Gallery", location: "Back Bay, MA" },
      { name: "Crown Art Studio", location: "River North, IL" },
      { name: "Luxury Tattoo Atelier", location: "Little Five Points, GA" },
      { name: "Metropolitan Tattoo", location: "Fremont, WA" },
      { name: "Elite Ink Collective", location: "Bishop Arts, TX" },
      { name: "Prestige Art Studio", location: "LoHi, CO" },
      { name: "Signature Tattoo Gallery", location: "Pearl District, OR" },
      { name: "Crown Ink Studio", location: "Gaslamp Quarter, CA" },
      { name: "Elite Tattoo Atelier", location: "Short North, OH" },
      { name: "Luxury Art Gallery", location: "Northern Liberties, PA" },
      { name: "Metropolitan Ink Studio", location: "Mission District, CA" },
      { name: "Prestige Tattoo Gallery", location: "Crossroads, MO" }
    ]
  }
};

// Generate comprehensive listings for each industry (30 expired + 20 active)
function generateComprehensiveListings(industry: string, images: string[]) {
  const listings: IndustryListing[] = [];
  const data = industryData[industry as keyof typeof industryData];
  
  // Generate 30 expired listings
  for (let i = 0; i < 30; i++) {
    const business = data.expiredBusinesses[i];
    listings.push({
      id: `${industry}-expired-${i + 1}`,
      title: `${business.name}`,
      location: business.location,
      salary: '$1,500–$2,500/week',
      tier: 'featured',
      summary: `Professional ${industry} position filled.`,
      imageUrl: getImageUrl(industry, images, i),
      isPositionFilled: true,
      fullDescription: `This ${industry} position at ${business.name} has been filled.`,
      fomoText: 'Position Filled'
    });
  }
  
  // Generate 20 active listings
  for (let i = 0; i < 20; i++) {
    const business = data.activeBusinesses[i];
    const tiers = ['diamond', 'premium', 'featured'];
    const tier = tiers[i % 3] as 'diamond' | 'premium' | 'featured';
    const salaryRanges = {
      diamond: '$3,000–$5,000/week',
      premium: '$2,500–$4,000/week',
      featured: '$1,800–$3,000/week'
    };
    
    listings.push({
      id: `${industry}-active-${i + 1}`,
      title: `${business.name}`,
      location: business.location,
      salary: salaryRanges[tier],
      tier,
      summary: `Seeking skilled ${industry} professionals for our premium location.`,
      imageUrl: getImageUrl(industry, images, i),
      fullDescription: `Join our team at ${business.name}. We're seeking experienced ${industry} professionals for our ${business.location} location.`,
      urgencyBadge: i < 5 ? 'Hiring Now' : undefined
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
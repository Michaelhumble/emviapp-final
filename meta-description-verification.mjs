#!/usr/bin/env node

/**
 * 🎯 Meta Description Length Verification
 * Quick check of optimized descriptions
 */

// Test the generateSEODescription function with sample data
function generateSEODescription(service, city, state) {
  const serviceMap = {
    'nails': 'nail technician',
    'hair': 'hair stylist',
    'barber': 'barber',
    'massage': 'massage therapist',
    'makeup': 'makeup artist',
    'skincare': 'esthetician',
  };
  
  const serviceName = serviceMap[service] || service;
  const location = city && state ? `in ${city}, ${state}` : city ? `in ${city}` : 'nationwide';
  
  return `Find premium ${serviceName} jobs ${location}. Browse high-paying opportunities at top beauty salons. Competitive pay, flexible schedules. Apply today for your dream career!`;
}

// Sample test cases
const testCases = [
  { service: 'nails', city: 'Houston', state: 'TX' },
  { service: 'hair', city: 'Dallas', state: 'TX' },
  { service: 'barber', city: 'Austin', state: 'TX' },
  { service: 'massage', city: 'Atlanta', state: 'GA' },
  { service: 'makeup', city: 'Los Angeles', state: 'CA' },
];

console.log('🔍 Testing Meta Description Lengths:');
console.log('Target: 150-160 characters\n');

let allOptimal = true;

testCases.forEach(({ service, city, state }) => {
  const description = generateSEODescription(service, city, state);
  const length = description.length;
  const status = length >= 150 && length <= 160 ? '✅' : '⚠️';
  
  if (length < 150 || length > 160) {
    allOptimal = false;
  }
  
  console.log(`${status} ${service.toUpperCase()} in ${city}, ${state}`);
  console.log(`   Length: ${length} chars`);
  console.log(`   Description: ${description}`);
  console.log('');
});

// Test other descriptions
const categoryDescription = `Find premium nail technician jobs and career opportunities across the US. Browse hundreds of positions at top beauty salons. Join thousands of professionals today!`;

const cityDescription = `Find premium beauty jobs in Houston, TX. 5000+ monthly searches. Browse nail tech, hair stylist, barber & spa jobs. Apply today!`;

console.log('📝 Other Description Tests:');
console.log(`Category Page (${categoryDescription.length} chars): ${categoryDescription.length >= 150 && categoryDescription.length <= 160 ? '✅' : '⚠️'}`);
console.log(`City Page (${cityDescription.length} chars): ${cityDescription.length >= 150 && cityDescription.length <= 160 ? '✅' : '⚠️'}`);

console.log('\n📊 SUMMARY:');
if (allOptimal && categoryDescription.length >= 150 && categoryDescription.length <= 160 && cityDescription.length >= 150 && cityDescription.length <= 160) {
  console.log('✅ All meta descriptions are optimized (150-160 characters)');
} else {
  console.log('⚠️ Some descriptions need adjustment');
}
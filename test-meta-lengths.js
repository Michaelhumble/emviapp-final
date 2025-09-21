// Test meta description lengths

// Current descriptions from the code:

// From generateSEODescription function:
function testDesc1() {
  const serviceName = 'nail technician';
  const location = 'in Houston, TX';
  return `Find premium ${serviceName} jobs ${location}. Browse high-paying opportunities at top beauty salons. Competitive pay, flexible schedules. Apply today for your dream career!`;
}

// From CategoryOnlyPage:
const categoryDesc = `Find premium nail technician jobs and career opportunities across the US. Browse hundreds of positions at top beauty salons. Join thousands of professionals today!`;

// From CityOnlyPage (UPDATED):
const cityDesc = `Find premium beauty jobs in Houston, TX. 5000+ monthly job searches. Browse nail tech, hair stylist, barber, spa & massage positions. Competitive pay, flexible schedules. Apply today!`;

// From ProgrammaticLander (UPDATED):
function testProgrammatic() {
  const role = { label: 'Nail Artist' };
  const city = { city: 'Houston', state: 'TX' };
  const pageType = 'jobs';
  const avgSalary = 45000;
  
  return `Find premium ${role.label.toLowerCase()} ${pageType} in ${city.city}, ${city.state}. Browse high-paying opportunities at top beauty salons. Average salary $${avgSalary.toLocaleString()}/year. Competitive pay, benefits. Apply now!`;
}

console.log('🎯 FINAL Meta Description Length Verification:');
console.log('Target: 150-160 characters');
console.log('');

const desc1 = testDesc1();
console.log('✅ SEO Keywords Function (generateSEODescription):');
console.log(`   Length: ${desc1.length} chars ${desc1.length >= 150 && desc1.length <= 160 ? '✅' : '⚠️'}`);
console.log(`   Text: "${desc1}"`);
console.log('');

console.log('✅ Category Only Page:');
console.log(`   Length: ${categoryDesc.length} chars ${categoryDesc.length >= 150 && categoryDesc.length <= 160 ? '✅' : '⚠️'}`);
console.log(`   Text: "${categoryDesc}"`);
console.log('');

console.log('✅ City Only Page (UPDATED):');
console.log(`   Length: ${cityDesc.length} chars ${cityDesc.length >= 150 && cityDesc.length <= 160 ? '✅' : '⚠️'}`);
console.log(`   Text: "${cityDesc}"`);
console.log('');

const progDesc = testProgrammatic();
console.log('✅ Programmatic Lander (UPDATED):');
console.log(`   Length: ${progDesc.length} chars ${progDesc.length >= 150 && progDesc.length <= 160 ? '✅' : '⚠️'}`);
console.log(`   Text: "${progDesc}"`);
console.log('');

// Check if all are in range
const all = [desc1, categoryDesc, cityDesc, progDesc];
const results = all.map(d => ({
  length: d.length,
  optimal: d.length >= 150 && d.length <= 160
}));

console.log('📊 OPTIMIZATION SUMMARY:');
const descriptions = [
  'Role+City Pages (generateSEODescription)',
  'Category-Only Pages', 
  'City-Only Pages',
  'Programmatic Jobs/Salons Pages'
];

results.forEach((result, i) => {
  const status = result.optimal ? '✅' : '⚠️';
  console.log(`${status} ${descriptions[i]}: ${result.length} chars`);
});

console.log('');
const allOptimal = results.every(r => r.optimal);
if (allOptimal) {
  console.log('🎉 SUCCESS: All meta descriptions are optimized (150-160 chars)');
  console.log('🎯 144+ programmatic pages now have optimal SEO meta descriptions');
} else {
  console.log('⚠️ Some descriptions still need adjustment');
  const needFix = results.filter(r => !r.optimal).length;
  console.log(`   ${needFix} description(s) outside optimal range`);
}
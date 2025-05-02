import sampleJobs from "@/data/sampleJobs";

// Filter salons for sale from the sample jobs data
export const salonsForSaleJobs = sampleJobs.filter(job => job.for_sale === true);

// This is a utility to ensure we always have enough salon for sale listings
export const ensureSalonsForSale = (count: number = 20) => {
  // If we already have enough, return them
  if (salonsForSaleJobs.length >= count) {
    return salonsForSaleJobs.slice(0, count);
  }
  
  // Otherwise, create more listings by duplicating existing ones with different IDs
  const additional = [];
  let currentId = 200; // Start IDs from a higher number to avoid conflicts
  
  for (let i = 0; i < count - salonsForSaleJobs.length; i++) {
    const templateIndex = i % salonsForSaleJobs.length;
    const template = salonsForSaleJobs[templateIndex];
    
    additional.push({
      ...template,
      id: String(currentId++),
      company: `${template.company} ${i + 1}`,
      location: template.location.includes('Denver') ? 
        template.location.replace('Denver', ['Boulder', 'Colorado Springs', 'Fort Collins'][i % 3]) : 
        template.location,
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return [...salonsForSaleJobs, ...additional];
};

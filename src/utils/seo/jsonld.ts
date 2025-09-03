// Sanitization utility for JSON-LD descriptions
export function sanitizeHtmlForJsonLd(html?: string): string {
  if (!html) return '';
  
  // Strip dangerous tags and attributes while keeping basic formatting
  const allowedTags = ['p', 'ul', 'li', 'br', 'strong', 'em', 'b', 'i'];
  const allowedTagsRegex = new RegExp(`<(?!\\/?(?:${allowedTags.join('|')})\\s*\\/?>)[^>]+>`, 'gi');
  
  return html
    .replace(/<script[^>]*>.*?<\/script>/gis, '') // Remove scripts
    .replace(/<style[^>]*>.*?<\/style>/gis, '') // Remove styles
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
    .replace(/<iframe[^>]*>.*?<\/iframe>/gis, '') // Remove iframes
    .replace(allowedTagsRegex, '') // Remove non-allowed tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Parse employment type from job data
export function parseEmploymentType(
  compensationType?: string,
  description?: string,
  title?: string
): string[] {
  const types: string[] = [];
  const searchText = `${compensationType || ''} ${description || ''} ${title || ''}`.toLowerCase();
  
  if (searchText.includes('full-time') || searchText.includes('full time')) {
    types.push('FULL_TIME');
  }
  if (searchText.includes('part-time') || searchText.includes('part time')) {
    types.push('PART_TIME');
  }
  if (searchText.includes('contract') || searchText.includes('contractor') || searchText.includes('commission')) {
    types.push('CONTRACTOR');
  }
  if (searchText.includes('temporary') || searchText.includes('temp')) {
    types.push('TEMPORARY');
  }
  if (searchText.includes('internship') || searchText.includes('intern')) {
    types.push('INTERN');
  }
  
  // Default for beauty industry if nothing specific found
  return types.length > 0 ? types : ['CONTRACTOR'];
}

// Parse salary information
export function parseSalaryInfo(compensationDetails?: string): {
  currency: string;
  value: number;
  unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
} | null {
  if (!compensationDetails) return null;
  
  const salaryStr = compensationDetails.toLowerCase();
  const numMatch = compensationDetails.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  
  if (!numMatch) return null;
  
  const value = parseFloat(numMatch[1].replace(/,/g, ''));
  
  if (salaryStr.includes('hour') || salaryStr.includes('/hr')) {
    return { currency: 'USD', value, unitText: 'HOUR' };
  } else if (salaryStr.includes('day') || salaryStr.includes('/day')) {
    return { currency: 'USD', value, unitText: 'DAY' };
  } else if (salaryStr.includes('week') || salaryStr.includes('/wk')) {
    return { currency: 'USD', value, unitText: 'WEEK' };
  } else if (salaryStr.includes('month') || salaryStr.includes('/mo')) {
    return { currency: 'USD', value, unitText: 'MONTH' };
  } else if (salaryStr.includes('year') || salaryStr.includes('/yr') || salaryStr.includes('annual')) {
    return { currency: 'USD', value, unitText: 'YEAR' };
  }
  
  // Default to monthly for most beauty industry roles
  return { currency: 'USD', value, unitText: 'MONTH' };
}

// Parse location into components
export function parseJobLocation(location?: string): {
  streetAddress?: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
} {
  if (!location) {
    return {
      addressLocality: 'Various Locations',
      addressCountry: 'US'
    };
  }
  
  // Parse common formats: "City, State", "City, State ZIP", "Street, City, State"
  const parts = location.split(',').map(p => p.trim());
  
  if (parts.length >= 2) {
    const lastPart = parts[parts.length - 1];
    const stateZipMatch = lastPart.match(/^([A-Z]{2})\s*(\d{5})?$/);
    
    if (stateZipMatch) {
      return {
        ...(parts.length > 2 && { streetAddress: parts.slice(0, -2).join(', ') }),
        addressLocality: parts[parts.length - 2],
        addressRegion: stateZipMatch[1],
        ...(stateZipMatch[2] && { postalCode: stateZipMatch[2] }),
        addressCountry: 'US'
      };
    }
    
    // Simple "City, State" format
    return {
      addressLocality: parts[0],
      addressRegion: parts[1],
      addressCountry: 'US'
    };
  }
  
  // Single location string
  return {
    addressLocality: location,
    addressCountry: 'US'
  };
}

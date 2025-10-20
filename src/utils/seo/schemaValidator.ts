/**
 * Schema Validator for JSON-LD structured data
 * Validates uniqueness of @id and required fields for JobPosting
 */

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

interface JsonLdSchema {
  '@context'?: string;
  '@type': string;
  '@id'?: string;
  [key: string]: any;
}

const REQUIRED_JOB_POSTING_FIELDS = [
  'title',
  'description',
  'datePosted',
  'employmentType',
  'hiringOrganization',
  'jobLocation',
  'identifier'
];

const RECOMMENDED_JOB_POSTING_FIELDS = ['validThrough', 'baseSalary', 'url'];

/**
 * Validates a collection of JSON-LD schemas for duplicates and required fields
 */
export function validateSchemas(schemas: JsonLdSchema[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Map<string, string>();

  schemas.forEach((schema, index) => {
    const schemaType = schema['@type'];
    const schemaId = schema['@id'];

    // Check for duplicate @id
    if (schemaId) {
      if (seenIds.has(schemaId)) {
        errors.push(
          `Duplicate @id "${schemaId}" found in schema ${index} (${schemaType}). Previously seen in ${seenIds.get(schemaId)}`
        );
      } else {
        seenIds.set(schemaId, `${schemaType} at index ${index}`);
      }
    }

    // Validate JobPosting schemas
    if (schemaType === 'JobPosting') {
      const missingFields = REQUIRED_JOB_POSTING_FIELDS.filter(
        field => !schema[field] || (typeof schema[field] === 'string' && schema[field].trim() === '')
      );

      if (missingFields.length > 0) {
        errors.push(
          `JobPosting schema at index ${index} missing required fields: ${missingFields.join(', ')}`
        );
      }

      // Check recommended fields
      const missingRecommended = RECOMMENDED_JOB_POSTING_FIELDS.filter(
        field => !schema[field]
      );

      if (missingRecommended.length > 0) {
        warnings.push(
          `JobPosting schema at index ${index} missing recommended fields: ${missingRecommended.join(', ')}`
        );
      }

      // Validate nested required fields
      if (schema.hiringOrganization && typeof schema.hiringOrganization === 'object') {
        if (!schema.hiringOrganization.name) {
          errors.push(`JobPosting at index ${index}: hiringOrganization missing required 'name' field`);
        }
      }

      if (schema.jobLocation && typeof schema.jobLocation === 'object') {
        if (!schema.jobLocation.address || typeof schema.jobLocation.address !== 'object') {
          errors.push(`JobPosting at index ${index}: jobLocation missing required 'address' field`);
        }
      }

      if (schema.identifier && typeof schema.identifier === 'object') {
        if (!schema.identifier.value) {
          errors.push(`JobPosting at index ${index}: identifier missing required 'value' field`);
        }
      }
    }

    // Validate Organization schemas
    if (schemaType === 'Organization') {
      if (!schema.name) {
        errors.push(`Organization schema at index ${index} missing required 'name' field`);
      }
    }

    // Validate WebSite schemas
    if (schemaType === 'WebSite') {
      if (!schema.name || !schema.url) {
        errors.push(`WebSite schema at index ${index} missing required 'name' or 'url' field`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Extracts all JSON-LD schemas from HTML string
 */
export function extractSchemasFromHTML(html: string): JsonLdSchema[] {
  const schemas: JsonLdSchema[] = [];
  const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const schema = JSON.parse(match[1]);
      if (Array.isArray(schema)) {
        schemas.push(...schema);
      } else {
        schemas.push(schema);
      }
    } catch (e) {
      console.warn('Failed to parse JSON-LD:', e);
    }
  }

  return schemas;
}

/**
 * De-duplicates schemas by @id, keeping the first occurrence
 */
export function deduplicateSchemas(schemas: JsonLdSchema[]): JsonLdSchema[] {
  const seenIds = new Set<string>();
  const seenTypeWithoutId = new Set<string>();
  
  return schemas.filter(schema => {
    const schemaId = schema['@id'];
    const schemaType = schema['@type'];

    // If schema has @id, check for duplicates
    if (schemaId) {
      if (seenIds.has(schemaId)) {
        return false; // Skip duplicate
      }
      seenIds.add(schemaId);
      return true;
    }

    // For schemas without @id, allow multiple of same type (e.g., multiple JobPostings)
    // But dedupe Organization/WebSite that don't have @id
    if (['Organization', 'WebSite', 'SoftwareApplication'].includes(schemaType)) {
      if (seenTypeWithoutId.has(schemaType)) {
        return false; // Skip duplicate
      }
      seenTypeWithoutId.add(schemaType);
    }

    return true;
  });
}

/**
 * Validates canonical URL alignment with schema URLs
 */
export function validateCanonicalAlignment(
  canonicalUrl: string | null,
  schemas: JsonLdSchema[]
): string[] {
  const errors: string[] = [];

  if (!canonicalUrl) {
    errors.push('No canonical URL found in document');
    return errors;
  }

  schemas.forEach((schema, index) => {
    if (schema.url && schema.url !== canonicalUrl) {
      errors.push(
        `Schema ${index} (${schema['@type']}) url "${schema.url}" does not match canonical "${canonicalUrl}"`
      );
    }

    if (schema['@type'] === 'JobPosting' && schema.url && schema.url !== canonicalUrl) {
      errors.push(
        `JobPosting schema url must match canonical URL. Got "${schema.url}", expected "${canonicalUrl}"`
      );
    }
  });

  return errors;
}

/**
 * Comprehensive validation report
 */
export function generateValidationReport(html: string, canonicalUrl: string | null): {
  valid: boolean;
  report: string;
  schemas: JsonLdSchema[];
} {
  const schemas = extractSchemasFromHTML(html);
  const schemaValidation = validateSchemas(schemas);
  const canonicalErrors = canonicalUrl ? validateCanonicalAlignment(canonicalUrl, schemas) : [];

  const allErrors = [...schemaValidation.errors, ...canonicalErrors];
  const valid = allErrors.length === 0;

  let report = `📊 JSON-LD Schema Validation Report\n`;
  report += `${'='.repeat(50)}\n\n`;
  report += `✅ Schemas Found: ${schemas.length}\n`;
  report += `   - ${schemas.map(s => s['@type']).join(', ')}\n\n`;

  if (allErrors.length > 0) {
    report += `❌ Errors (${allErrors.length}):\n`;
    allErrors.forEach((error, i) => {
      report += `   ${i + 1}. ${error}\n`;
    });
    report += '\n';
  } else {
    report += `✅ No errors found!\n\n`;
  }

  if (schemaValidation.warnings.length > 0) {
    report += `⚠️  Warnings (${schemaValidation.warnings.length}):\n`;
    schemaValidation.warnings.forEach((warning, i) => {
      report += `   ${i + 1}. ${warning}\n`;
    });
    report += '\n';
  }

  report += `Canonical URL: ${canonicalUrl || 'Not found'}\n`;

  return { valid, report, schemas };
}

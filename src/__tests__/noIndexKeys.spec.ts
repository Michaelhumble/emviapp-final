import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

describe('No Index Keys', () => {
  const srcDir = join(process.cwd(), 'src');
  
  const getFileContent = (dir: string, fileName: string): string => {
    try {
      return readFileSync(join(dir, fileName), 'utf-8');
    } catch {
      return '';
    }
  };

  const scanDirectory = (dir: string): string[] => {
    try {
      const files = readdirSync(dir, { withFileTypes: true });
      const tsxFiles: string[] = [];
      
      for (const file of files) {
        if (file.isDirectory() && !file.name.startsWith('.')) {
          tsxFiles.push(...scanDirectory(join(dir, file.name)));
        } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
          tsxFiles.push(join(dir, file.name));
        }
      }
      
      return tsxFiles;
    } catch {
      return [];
    }
  };

  it('should not use index as React keys in any component', () => {
    const files = scanDirectory(srcDir);
    const violations: string[] = [];

    for (const filePath of files) {
      const content = getFileContent('', filePath);
      const fileName = filePath.replace(process.cwd(), '');
      
      // Check for various patterns of index keys
      const indexKeyPatterns = [
        /key=\{index\}/g,
        /key=\{\s*i\s*\}/g,
        /key=\{\s*idx\s*\}/g,
      ];

      for (const pattern of indexKeyPatterns) {
        const matches = content.match(pattern);
        if (matches) {
          violations.push(`${fileName}: Found ${matches.length} index key(s): ${matches.join(', ')}`);
        }
      }
    }

    if (violations.length > 0) {
      console.log('Index key violations found:');
      violations.forEach(violation => console.log(`  ${violation}`));
    }

    expect(violations).toHaveLength(0);
  });
});
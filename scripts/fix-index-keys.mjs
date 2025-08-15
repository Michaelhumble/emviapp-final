#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRY_RUN = process.argv.includes('--dry-run');

// Find all TSX/TS files in src
function findFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !item.startsWith('.')) {
      findFiles(fullPath, files);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Protected paths that should NOT be modified
const PROTECTED_PATHS = [
  'src/components/nav/',
  'MobileMenu.tsx',
  'Navbar.tsx', 
  'PostWizardLayout.tsx',
  'src/components/payment/',
  'src/components/stripe/',
  'src/data/protected/',
  'curated',
  'vietnamese'
];

// Check if file is protected
function isProtectedFile(filePath) {
  return PROTECTED_PATHS.some(protected => filePath.includes(protected));
}

// Fix index keys in a file
function fixIndexKeys(filePath) {
  // Skip protected files
  if (isProtectedFile(filePath)) {
    if (DRY_RUN) {
      console.log(`SKIPPED (protected): ${filePath}`);
    }
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Skip if already imports getStableKey
  if (content.includes('getStableKey')) {
    return false;
  }

  let newContent = content;

  // Add import if we have index keys to fix
  const hasIndexKeys = /key=\{(index|i|idx)\}/.test(content);
  if (!hasIndexKeys) {
    return false;
  }

  // Add getStableKey import
  const importMatch = newContent.match(/^(import.*?from ['"']react['"'];?\s*\n)/m);
  if (importMatch) {
    const insertPos = newContent.indexOf(importMatch[1]) + importMatch[1].length;
    newContent = newContent.slice(0, insertPos) + 
      "import { getStableKey } from '@/utils/getStableKey';\n" +
      newContent.slice(insertPos);
    modified = true;
  }

  // Replace key={index} patterns
  newContent = newContent.replace(/key=\{index\}/g, (match, offset) => {
    // Try to find context for a better key
    const lineStart = newContent.lastIndexOf('\n', offset) + 1;
    const lineEnd = newContent.indexOf('\n', offset);
    const line = newContent.slice(lineStart, lineEnd);
    
    // Look for common patterns
    if (line.includes('.map((') && line.includes(', index)')) {
      const mapMatch = line.match(/\.map\(\(([^,]+),\s*index\)/);
      if (mapMatch) {
        const itemName = mapMatch[1];
        // Try to guess prefix from context
        let prefix = 'item';
        if (line.includes('Card') || line.includes('<Card')) prefix = 'card';
        if (line.includes('Button') || line.includes('<Button')) prefix = 'button';
        if (line.includes('Badge') || line.includes('<Badge')) prefix = 'badge';
        if (line.includes('article') || line.includes('post')) prefix = 'article';
        if (line.includes('job') || line.includes('Job')) prefix = 'job';
        if (line.includes('artist') || line.includes('Artist')) prefix = 'artist';
        if (line.includes('salon') || line.includes('Salon')) prefix = 'salon';
        
        return `key={getStableKey(${itemName}, '${prefix}')}`;
      }
    }
    
    return `key={\`item-\${index}\`}`;
  });

  // Replace key={i} patterns  
  newContent = newContent.replace(/key=\{i\}/g, `key={\`skeleton-\${i}\`}`);
  
  // Replace key={idx} patterns
  newContent = newContent.replace(/key=\{idx\}/g, `key={\`item-\${idx}\`}`);

  if (newContent !== content) {
    if (DRY_RUN) {
      console.log(`WOULD FIX: ${filePath}`);
      const beforeCount = (content.match(/key=\{(index|i|idx)\}/g) || []).length;
      const afterCount = (newContent.match(/key=\{(index|i|idx)\}/g) || []).length;
      console.log(`  - Before: ${beforeCount} index keys, After: ${afterCount} index keys`);
    } else {
      fs.writeFileSync(filePath, newContent);
      console.log(`Fixed: ${filePath}`);
    }
    return true;
  }
  
  return false;
}

// Main execution
const srcDir = path.join(__dirname, '..', 'src');
const files = findFiles(srcDir);

let fixedCount = 0;
for (const file of files) {
  try {
    if (fixIndexKeys(file)) {
      fixedCount++;
    }
  } catch (error) {
    console.error(`Error fixing ${file}:`, error.message);
  }
}

console.log(`\n${DRY_RUN ? 'DRY RUN - Would fix' : 'Fixed'} ${fixedCount} files with index keys.`);
console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'APPLY CHANGES'}`);
console.log('Protected paths were skipped to maintain system integrity.');
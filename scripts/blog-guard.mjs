#!/usr/bin/env node

import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Banned terms (case-insensitive)
const BANNED_TERMS = [
  'ho-chi-minh',
  'saigon', 
  'sai gon',
  'hcmc',
  '🇻🇳',
  'viet nam',
  'vietnam'
];

// Blog content directories to check
const BLOG_DIRS = [
  'src/content/hub',
  'src/content/blog', 
  'content/blog',
  'data/posts',
  'posts'
];

function findBlogDirectory() {
  const projectRoot = join(__dirname, '..');
  
  for (const dir of BLOG_DIRS) {
    try {
      const fullPath = join(projectRoot, dir);
      readdirSync(fullPath);
      return fullPath;
    } catch (e) {
      // Directory doesn't exist, continue
    }
  }
  
  console.log('ℹ️  No blog directory found, skipping guard check');
  process.exit(0);
}

function getAllBlogFiles(blogDir) {
  const files = [];
  
  function readDirRecursive(currentDir) {
    const entries = readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        readDirRecursive(fullPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name);
        if (['.md', '.mdx'].includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  readDirRecursive(blogDir);
  return files;
}

function checkFileForBannedContent(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const filename = filePath.split('/').pop();
  const errors = [];
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  let frontmatter = '';
  let body = content;
  
  if (frontmatterMatch) {
    frontmatter = frontmatterMatch[1];
    body = content.slice(frontmatterMatch[0].length);
  }
  
  // Check filename
  for (const term of BANNED_TERMS) {
    if (filename.toLowerCase().includes(term.toLowerCase())) {
      errors.push(`Filename contains banned term: "${term}"`);
    }
  }
  
  // Check frontmatter fields
  if (frontmatter) {
    const lines = frontmatter.split('\n');
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      for (const term of BANNED_TERMS) {
        if (lowerLine.includes(term.toLowerCase())) {
          // Extract field name for better error messaging
          const fieldMatch = line.match(/^(\w+):/);
          const field = fieldMatch ? fieldMatch[1] : 'frontmatter';
          errors.push(`${field} contains banned term: "${term}"`);
        }
      }
    }
  }
  
  // Check body content
  const bodyLower = body.toLowerCase();
  for (const term of BANNED_TERMS) {
    if (bodyLower.includes(term.toLowerCase())) {
      errors.push(`Content body contains banned term: "${term}"`);
    }
  }
  
  return errors;
}

function main() {
  console.log('🛡️  Running blog content guard...');
  
  const blogDir = findBlogDirectory();
  console.log(`📁 Checking blog directory: ${blogDir.replace(process.cwd(), '.')}`);
  
  const blogFiles = getAllBlogFiles(blogDir);
  console.log(`📝 Found ${blogFiles.length} blog files to check`);
  
  let totalErrors = 0;
  
  for (const filePath of blogFiles) {
    const errors = checkFileForBannedContent(filePath);
    
    if (errors.length > 0) {
      const relativePath = filePath.replace(process.cwd(), '.');
      console.error(`\n❌ BLOCKED: ${relativePath}`);
      
      for (const error of errors) {
        console.error(`   • ${error}`);
      }
      
      totalErrors += errors.length;
    }
  }
  
  if (totalErrors > 0) {
    console.error(`\n🚫 Blog guard failed: ${totalErrors} banned content violation(s) found`);
    console.error('   Remove banned terms from blog posts to continue');
    process.exit(1);
  }
  
  console.log(`\n✅ Blog guard passed: ${blogFiles.length} files checked, no banned content found`);
}

main();
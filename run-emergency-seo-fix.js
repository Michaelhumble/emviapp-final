#!/usr/bin/env node

/**
 * Runner script to execute emergency SEO fixes
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting Emergency SEO Fix...\n');

// Run the emergency fix script
const emergencyFix = spawn('node', ['scripts/seo/emergency-fix.mjs'], {
  stdio: 'pipe',
  cwd: __dirname
});

let output = '';
let errorOutput = '';

emergencyFix.stdout.on('data', (data) => {
  const text = data.toString();
  console.log(text);
  output += text;
});

emergencyFix.stderr.on('data', (data) => {
  const text = data.toString();
  console.error(text);
  errorOutput += text;
});

emergencyFix.on('close', (code) => {
  console.log(`\n📊 Emergency fix completed with code: ${code}`);
  
  if (code === 0) {
    console.log('✅ Emergency SEO fix completed successfully!');
    
    // Run audit script if it exists
    console.log('\n🔍 Running SEO audit to verify fixes...');
    const audit = spawn('node', ['scripts/audit-seo.mjs'], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    audit.on('close', (auditCode) => {
      console.log(`\n📋 SEO audit completed with code: ${auditCode}`);
      if (auditCode === 0) {
        console.log('🎉 All SEO fixes verified successfully!');
      }
    });
    
  } else {
    console.error('❌ Emergency fix failed with errors');
    if (errorOutput) {
      console.error('Error details:', errorOutput);
    }
  }
});

emergencyFix.on('error', (error) => {
  console.error('Failed to start emergency fix:', error.message);
});
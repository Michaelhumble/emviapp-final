#!/usr/bin/env node

/**
 * 🤖 ChatGPT Agent Interface
 * Calls OpenAI API with EmviApp SEO context and fix plans
 */

import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SYSTEM_PROMPT_PATH = 'agents/seo-agent/prompt.md';

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY environment variable is required');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
let fixPlan = null;

for (const arg of args) {
  if (arg.startsWith('--plan=')) {
    try {
      fixPlan = JSON.parse(arg.substring(7));
    } catch (error) {
      console.error('❌ Invalid JSON in --plan argument');
      process.exit(1);
    }
  }
}

if (!fixPlan) {
  console.error('❌ --plan argument is required');
  process.exit(1);
}

async function loadSystemPrompt() {
  try {
    return fs.readFileSync(SYSTEM_PROMPT_PATH, 'utf8');
  } catch (error) {
    console.error('❌ Could not load system prompt:', error.message);
    process.exit(1);
  }
}

async function getRepoContext() {
  // Get current codebase context for the agent
  const context = {
    structure: {},
    seo_components: [],
    current_canonicals: {},
    recent_changes: []
  };

  try {
    // Get SEO components structure
    const seoDir = 'src/components/seo';
    if (fs.existsSync(seoDir)) {
      context.seo_components = fs.readdirSync(seoDir).filter(f => f.endsWith('.tsx'));
    }

    // Get recent git changes (if in git repo)
    try {
      const { execSync } = await import('child_process');
      const gitLog = execSync('git log --oneline -10 --grep="seo\\|SEO" 2>/dev/null || echo "No git history"', {
        encoding: 'utf8'
      });
      context.recent_changes = gitLog.split('\n').filter(line => line.trim());
    } catch (error) {
      context.recent_changes = ['No git history available'];
    }

  } catch (error) {
    console.warn('⚠️ Could not gather full repo context:', error.message);
  }

  return context;
}

async function callOpenAI(systemPrompt, userMessage, context) {
  const payload = {
    model: 'gpt-4',
    temperature: 0.1,
    max_tokens: 2000,
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `Fix Plan Analysis:

${JSON.stringify(fixPlan, null, 2)}

Repository Context:
${JSON.stringify(context, null, 2)}

Please analyze the fix plan and provide either:
1. Safe auto-fixes (JSON format with file changes)
2. PR draft recommendation (JSON format with diffs)

Focus on the most critical issues first. Remember the guardrails about protected areas and canonical domain requirements.`
      }
    ]
  };

  try {
    // Using fetch for Node.js 18+ (or could use axios/node-fetch for older versions)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI API');
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error('❌ OpenAI API call failed:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🤖 Calling ChatGPT agent for SEO analysis...');
  
  try {
    const systemPrompt = await loadSystemPrompt();
    const context = await getRepoContext();
    
    console.log('📤 Sending fix plan to ChatGPT...');
    const agentResponse = await callOpenAI(systemPrompt, '', context);
    
    console.log('📥 Received response from ChatGPT');
    
    // Try to parse as JSON first
    try {
      const jsonResponse = JSON.parse(agentResponse);
      console.log(JSON.stringify(jsonResponse, null, 2));
    } catch (parseError) {
      // If not JSON, return as-is
      console.log(agentResponse);
    }
    
  } catch (error) {
    console.error('❌ Agent call failed:', error.message);
    process.exit(1);
  }
}

main();
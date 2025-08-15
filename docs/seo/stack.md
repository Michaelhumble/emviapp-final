# EmviApp SEO Tool Stack Integration Guide

## Overview

This document outlines the integration setup for AI-assisted SEO tools to enhance EmviApp's search performance through automated content optimization, technical monitoring, and data-driven insights.

## Tool Stack

### 1. Clearscope (Content Optimization)
**Purpose**: AI-powered content optimization and keyword research

**Setup Steps**:
1. Sign up at [clearscope.io](https://clearscope.io)
2. Generate API key from Dashboard → API Settings
3. Add to Supabase Edge Function Secrets: `CLEARSCOPE_API_KEY`

**Integration Points**:
- Blog content optimization (before publish)
- Job listing description enhancement
- Meta description recommendations
- Related keyword suggestions

**API Endpoints**:
```javascript
// Content analysis
POST https://api.clearscope.io/v1/reports
Headers: { Authorization: `Bearer ${CLEARSCOPE_API_KEY}` }

// Keyword research  
GET https://api.clearscope.io/v1/keywords?seed={keyword}
```

**Environment Variables**:
```
CLEARSCOPE_API_KEY=cs_live_xxxxxxxxxxxxx
CLEARSCOPE_ACCOUNT_ID=your_account_id
```

### 2. Surfer SEO (Alternative to Clearscope)
**Purpose**: Content optimization with SERP analysis

**Setup Steps**:
1. Create account at [surferseo.com](https://surferseo.com)
2. Get API key from Settings → Integrations
3. Store in Supabase: `SURFER_API_KEY`

**Integration Points**:
- Real-time content scoring
- Competitor analysis for beauty industry
- Technical SEO recommendations

**API Endpoints**:
```javascript
// Content analysis
POST https://api.surferseo.com/v1/content-editor
Headers: { 'X-API-Key': SURFER_API_KEY }

// Audit pages
POST https://api.surferseo.com/v1/audit
```

**Environment Variables**:
```
SURFER_API_KEY=sk_xxxxxxxxxxxxx
SURFER_WORKSPACE_ID=ws_xxxxxxxxxxxxx
```

### 3. ContentKing (Technical SEO Monitoring)
**Purpose**: Real-time technical SEO monitoring and alerting

**Setup Steps**:
1. Sign up at [contentkingapp.com](https://contentkingapp.com)
2. Add your domain: `www.emvi.app`
3. Generate API token from Settings → API
4. Store in Supabase: `CONTENTKING_API_TOKEN`

**Monitoring Setup**:
- Website: `https://www.emvi.app`
- Key pages: `/`, `/jobs`, `/salons`, `/artists`, `/blog/*`
- Alert thresholds: 
  - Page load time > 3s
  - Missing meta descriptions
  - Broken internal links
  - Schema markup errors

**API Integration**:
```javascript
// Get website overview
GET https://api.contentkingapp.com/v1/websites/{website_id}
Headers: { Authorization: `token ${CONTENTKING_API_TOKEN}` }

// Get issues
GET https://api.contentkingapp.com/v1/websites/{website_id}/issues
```

**Environment Variables**:
```
CONTENTKING_API_TOKEN=ck_xxxxxxxxxxxxx
CONTENTKING_WEBSITE_ID=12345
CONTENTKING_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 4. JetOctopus (Enterprise Crawling)
**Purpose**: Large-scale technical SEO auditing and log file analysis

**Setup Steps**:
1. Create account at [jetoctopus.com](https://jetoctopus.com)
2. Set up project for `www.emvi.app`
3. Get API credentials from Profile → API Access
4. Store in Supabase: `JETOCTOPUS_API_KEY`

**Crawl Configuration**:
```javascript
// Project setup
{
  "domain": "www.emvi.app",
  "crawl_settings": {
    "max_pages": 50000,
    "respect_robots_txt": true,
    "user_agent": "JetOctopus/EmviApp SEO Bot",
    "crawl_delay": 1000
  },
  "alerts": {
    "missing_titles": true,
    "duplicate_content": true,
    "broken_links": true,
    "large_pages": true
  }
}
```

**Environment Variables**:
```
JETOCTOPUS_API_KEY=jo_xxxxxxxxxxxxx
JETOCTOPUS_PROJECT_ID=proj_xxxxxxxxxxxxx
JETOCTOPUS_WEBHOOK_URL=https://your-webhook-endpoint.com
```

### 5. InLinks (Internal Linking Automation)
**Purpose**: AI-powered internal linking suggestions and automation

**Setup Steps**:
1. Sign up at [inlinks.com](https://inlinks.com)
2. Add domain and verify ownership
3. Generate API key from Tools → API
4. Store in Supabase: `INLINKS_API_KEY`

**Entity Configuration**:
```javascript
// Define beauty industry entities
{
  "entities": [
    "nail technician", "hair stylist", "barber", "makeup artist",
    "esthetician", "massage therapist", "beauty salon", "nail salon"
  ],
  "auto_linking": {
    "max_links_per_page": 5,
    "target_authority_pages": ["/jobs", "/salons", "/artists"],
    "exclude_patterns": ["/auth/*", "/dashboard/*"]
  }
}
```

**Environment Variables**:
```
INLINKS_API_KEY=il_xxxxxxxxxxxxx
INLINKS_PROJECT_ID=proj_xxxxxxxxxxxxx
INLINKS_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 6. SearchPilot (A/B Testing) - Optional
**Purpose**: Statistical A/B testing for SEO changes

**Setup Steps**:
1. Contact [searchpilot.com](https://searchpilot.com) for enterprise setup
2. Implement tracking script (defer to avoid CLS impact)
3. Configure test segments by page type
4. Store credentials in Supabase: `SEARCHPILOT_API_KEY`

**Test Configuration**:
```javascript
// Example title test configuration
{
  "test_name": "Job Page Title Optimization",
  "hypothesis": "Adding salary info to titles increases CTR",
  "pages": "/jobs/*",
  "variants": {
    "control": "{job.title} - {location} | EmviApp",
    "treatment": "{job.title} - ${salary} - {location} | EmviApp"
  },
  "success_metrics": ["organic_ctr", "organic_clicks", "conversions"],
  "duration_days": 28,
  "statistical_power": 0.8
}
```

**Environment Variables**:
```
SEARCHPILOT_API_KEY=sp_xxxxxxxxxxxxx
SEARCHPILOT_ACCOUNT_ID=acc_xxxxxxxxxxxxx
SEARCHPILOT_TRACKING_ID=sp_track_xxxxxxxxxxxxx
```

## Integration Architecture

### Supabase Edge Functions
Create these edge functions to handle API integrations:

1. **`seo-content-optimize`** - Clearscope/Surfer integration
2. **`seo-technical-monitor`** - ContentKing/JetOctopus webhook handler  
3. **`seo-internal-links`** - InLinks API integration
4. **`seo-test-manager`** - SearchPilot test management

### Webhook Endpoints

**ContentKing Alerts**: 
```
https://your-project.supabase.co/functions/v1/seo-technical-monitor
```

**JetOctopus Crawl Complete**:
```
https://your-project.supabase.co/functions/v1/seo-crawl-webhook
```

**InLinks Suggestions**:
```
https://your-project.supabase.co/functions/v1/seo-internal-links
```

## Security Best Practices

1. **API Key Management**: Store all keys in Supabase Edge Function Secrets
2. **Webhook Verification**: Validate webhook signatures for all services
3. **Rate Limiting**: Implement proper rate limiting for API calls
4. **Error Handling**: Log errors to Supabase for monitoring
5. **Data Privacy**: Ensure no PII is sent to third-party services

## Cost Management

| Tool | Est. Monthly Cost | Usage Limits |
|------|------------------|--------------|
| Clearscope | $170-$500 | 30-100 reports |
| Surfer SEO | $89-$239 | 120-840 audits |
| ContentKing | $39-$299 | 1-25K pages |
| JetOctopus | $99-$499 | 250K-5M pages |
| InLinks | $49-$199 | 5-50K pages |
| SearchPilot | Custom | Enterprise only |

**Total Est. Range**: $546-$2,035/month (depending on features used)

## Implementation Priority

### Phase 1 (Immediate)
1. ContentKing technical monitoring
2. Basic Clearscope/Surfer integration for blog content
3. Google Search Console API integration

### Phase 2 (1-2 months)
1. JetOctopus enterprise crawling
2. InLinks internal linking automation
3. Advanced content optimization workflows

### Phase 3 (3+ months)  
1. SearchPilot A/B testing setup
2. Advanced analytics and reporting
3. Custom AI-powered content suggestions

## Support and Documentation

- **Clearscope API**: [docs.clearscope.io](https://docs.clearscope.io)
- **Surfer API**: [docs.surferseo.com](https://docs.surferseo.com)
- **ContentKing API**: [docs.contentkingapp.com](https://docs.contentkingapp.com)
- **JetOctopus API**: [api.jetoctopus.com](https://api.jetoctopus.com)
- **InLinks API**: [help.inlinks.com](https://help.inlinks.com)
- **SearchPilot**: Contact support for enterprise documentation

---

For implementation questions or tool-specific setup, refer to the individual tool documentation or contact the EmviApp development team.
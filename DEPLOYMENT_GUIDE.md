# EmviApp Deployment Guide

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Development   │───▶│     Staging      │───▶│   Production    │
│                 │    │                  │    │                 │
│ Local Machine   │    │ Auto-Deploy      │    │ Manual Deploy   │
│ Feature Branches│    │ staging branch   │    │ main branch     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Deployment Process

### 1. Staging Deployment (Automatic)
- **Trigger**: Push to `staging` branch
- **Process**: Automatic via GitHub Actions
- **URL**: `https://staging-emviapp.vercel.app`

```bash
# Deploy to staging
git checkout staging
git merge main  # or your feature branch
git push origin staging
```

### 2. Production Deployment (Manual Only)

#### Option A: GitHub Actions (Recommended)
1. Go to GitHub Actions tab
2. Select "EmviApp Deployment Pipeline"
3. Click "Run workflow"
4. Choose "production" environment
5. Type `DEPLOY-TO-PRODUCTION` in confirmation field
6. Click "Run workflow"

#### Option B: Command Line
```bash
# Make deployment script executable
chmod +x scripts/deploy.sh scripts/rollback.sh

# Deploy to production
./scripts/deploy.sh production
```

## 🔧 Environment Setup

### Vercel Environment Variables

#### Production Environment
```
VITE_ENVIRONMENT=production
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-supabase-key
VITE_GOOGLE_MAPS_API_KEY=your-production-maps-key
```

#### Staging Environment
```
VITE_ENVIRONMENT=staging
VITE_SUPABASE_URL=your-staging-supabase-url
VITE_SUPABASE_ANON_KEY=your-staging-supabase-key
VITE_GOOGLE_MAPS_API_KEY=your-staging-maps-key
```

### GitHub Secrets Required
```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-vercel-project-id

# Production Environment
PROD_SUPABASE_URL=production-supabase-url
PROD_SUPABASE_ANON_KEY=production-supabase-key
PROD_GOOGLE_MAPS_API_KEY=production-maps-key

# Staging Environment
STAGING_SUPABASE_URL=staging-supabase-url
STAGING_SUPABASE_ANON_KEY=staging-supabase-key
STAGING_GOOGLE_MAPS_API_KEY=staging-maps-key
```

## 🔄 Rollback Process

### Quick Rollback
```bash
# List recent deployments
git tag --sort=-creatordate | grep "deploy-" | head -10

# Rollback to specific deployment
./scripts/rollback.sh production deploy-20250201-143022
```

### Emergency Rollback via Vercel Dashboard
1. Login to Vercel dashboard
2. Go to EmviApp project
3. Click "Deployments" tab
4. Find the last working deployment
5. Click "Promote to Production"

## 📋 Pre-Deployment Checklist

### Before Staging
- [ ] All tests pass locally
- [ ] Code reviewed and approved
- [ ] Feature branch merged to staging
- [ ] Database migrations applied to staging DB

### Before Production
- [ ] Staging deployment tested thoroughly
- [ ] All stakeholders approve
- [ ] Database migrations applied to production DB
- [ ] Monitoring systems ready
- [ ] Team notified of deployment window

## 🚨 Emergency Procedures

### If Production Breaks
1. **Immediate Response**
   ```bash
   ./scripts/rollback.sh production
   ```

2. **Incident Response**
   - Notify team immediately
   - Document the issue
   - Fix in staging first
   - Re-deploy when confirmed working

### If Staging Breaks
1. Check GitHub Actions logs
2. Fix the issue locally
3. Push to staging branch again
4. Verify fix works before promoting

## 🛡️ Security Best Practices

### Branch Protection Rules
- `main` branch requires PR review
- `staging` branch allows direct pushes for rapid iteration
- No force pushes allowed on `main`

### Environment Isolation
- Separate Supabase projects for staging/production
- Different API keys for each environment
- Separate analytics and monitoring

### Deployment Safety
- Manual approval required for production
- Automated rollback on health check failures
- Database migration validation

## 🔍 Monitoring & Alerts

### Production Health Checks
```bash
# Add to your monitoring system
curl -f https://emviapp.com/health || alert_team()
```

### Key Metrics to Watch
- Response time < 2s
- Error rate < 1%
- Uptime > 99.9%
- Core Web Vitals scores

## 📞 Support & Troubleshooting

### Common Issues

#### Deployment Fails
1. Check GitHub Actions logs
2. Verify environment variables
3. Ensure database migrations are applied
4. Check Vercel build logs

#### Site Not Loading
1. Check Vercel deployment status
2. Verify DNS settings
3. Check environment variables
4. Review error logs

### Getting Help
- Check deployment logs in GitHub Actions
- Review Vercel deployment dashboard
- Contact DevOps team for infrastructure issues
- Use rollback as first response to critical issues

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [EmviApp Architecture Guide](./ARCHITECTURE.md)
- [Emergency Contacts](./EMERGENCY_CONTACTS.md)
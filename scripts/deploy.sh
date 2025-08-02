#!/bin/bash

# EmviApp Safe Deployment Script
# Usage: ./scripts/deploy.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 EmviApp Deployment Script${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Timestamp: ${TIMESTAMP}${NC}"
echo ""

# Validation
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    echo -e "${RED}❌ Invalid environment. Use 'staging' or 'production'${NC}"
    exit 1
fi

# Production safety check
if [[ "$ENVIRONMENT" == "production" ]]; then
    echo -e "${YELLOW}⚠️  PRODUCTION DEPLOYMENT WARNING${NC}"
    echo -e "${YELLOW}This will deploy to the live EmviApp production environment.${NC}"
    echo ""
    read -p "Type 'DEPLOY-TO-PRODUCTION' to continue: " confirmation
    
    if [[ "$confirmation" != "DEPLOY-TO-PRODUCTION" ]]; then
        echo -e "${RED}❌ Deployment cancelled. Confirmation text didn't match.${NC}"
        exit 1
    fi
    
    # Ensure we're on main branch for production
    CURRENT_BRANCH=$(git branch --show-current)
    if [[ "$CURRENT_BRANCH" != "main" ]]; then
        echo -e "${RED}❌ Production deployments must be from 'main' branch. Currently on: ${CURRENT_BRANCH}${NC}"
        exit 1
    fi
fi

# Pre-deployment checks
echo -e "${BLUE}🔍 Running pre-deployment checks...${NC}"

# Check if we have uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes. Commit them first.${NC}"
    git status
    exit 1
fi

# Pull latest changes
git pull origin $(git branch --show-current)

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm ci

# Run tests
echo -e "${BLUE}🧪 Running tests...${NC}"
npm run test:ci || {
    echo -e "${RED}❌ Tests failed. Fix them before deploying.${NC}"
    exit 1
}

# Build the application
echo -e "${BLUE}🏗️  Building application...${NC}"
if [[ "$ENVIRONMENT" == "production" ]]; then
    npm run build:prod
else
    npm run build:staging
fi

# Deploy based on environment
if [[ "$ENVIRONMENT" == "staging" ]]; then
    echo -e "${BLUE}🚀 Deploying to staging...${NC}"
    vercel --target staging
else
    echo -e "${BLUE}🚀 Deploying to production...${NC}"
    vercel --prod
    
    # Create deployment tag
    TAG_NAME="deploy-${TIMESTAMP}"
    git tag -a "$TAG_NAME" -m "Production deployment $TIMESTAMP"
    git push origin "$TAG_NAME"
    echo -e "${GREEN}✅ Created deployment tag: ${TAG_NAME}${NC}"
fi

echo ""
echo -e "${GREEN}✅ Deployment to ${ENVIRONMENT} completed successfully!${NC}"

if [[ "$ENVIRONMENT" == "production" ]]; then
    echo -e "${GREEN}🎉 EmviApp is now live in production!${NC}"
    echo -e "${BLUE}📊 Monitor at: https://emviapp.com${NC}"
else
    echo -e "${BLUE}🔍 Preview at: https://staging.emviapp.com${NC}"
fi

echo -e "${BLUE}💡 To rollback if needed: ./scripts/rollback.sh${NC}"
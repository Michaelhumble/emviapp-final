#!/bin/bash

# EmviApp Rollback Script
# Usage: ./scripts/rollback.sh [production|staging] [tag-name]

set -e

ENVIRONMENT=${1:-production}
TARGET_TAG=${2}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${RED}🔄 EmviApp Rollback Script${NC}"
echo -e "${RED}Environment: ${ENVIRONMENT}${NC}"
echo ""

# Validation
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    echo -e "${RED}❌ Invalid environment. Use 'staging' or 'production'${NC}"
    exit 1
fi

# List recent deployment tags if no target specified
if [[ -z "$TARGET_TAG" ]]; then
    echo -e "${BLUE}📋 Recent deployment tags:${NC}"
    git tag --sort=-creatordate | grep "deploy-" | head -10
    echo ""
    read -p "Enter the tag to rollback to: " TARGET_TAG
fi

# Validate tag exists
if ! git rev-parse "$TARGET_TAG" >/dev/null 2>&1; then
    echo -e "${RED}❌ Tag '${TARGET_TAG}' does not exist${NC}"
    exit 1
fi

# Production safety check
if [[ "$ENVIRONMENT" == "production" ]]; then
    echo -e "${YELLOW}⚠️  PRODUCTION ROLLBACK WARNING${NC}"
    echo -e "${YELLOW}This will rollback EmviApp production to tag: ${TARGET_TAG}${NC}"
    echo ""
    read -p "Type 'ROLLBACK-PRODUCTION' to continue: " confirmation
    
    if [[ "$confirmation" != "ROLLBACK-PRODUCTION" ]]; then
        echo -e "${RED}❌ Rollback cancelled${NC}"
        exit 1
    fi
fi

# Checkout the target tag
echo -e "${BLUE}🔄 Checking out tag: ${TARGET_TAG}${NC}"
git checkout "$TARGET_TAG"

# Install dependencies for the rollback version
echo -e "${BLUE}📦 Installing dependencies for rollback version...${NC}"
npm ci

# Build the rollback version
echo -e "${BLUE}🏗️  Building rollback version...${NC}"
if [[ "$ENVIRONMENT" == "production" ]]; then
    npm run build:prod
else
    npm run build:staging
fi

# Deploy the rollback
if [[ "$ENVIRONMENT" == "staging" ]]; then
    echo -e "${BLUE}🚀 Rolling back staging...${NC}"
    vercel --target staging
else
    echo -e "${BLUE}🚀 Rolling back production...${NC}"
    vercel --prod
    
    # Create rollback tag
    ROLLBACK_TAG="rollback-$(date +%Y%m%d-%H%M%S)-to-${TARGET_TAG}"
    git tag -a "$ROLLBACK_TAG" -m "Rollback to $TARGET_TAG"
    git push origin "$ROLLBACK_TAG"
    echo -e "${GREEN}✅ Created rollback tag: ${ROLLBACK_TAG}${NC}"
fi

# Return to main/staging branch
if [[ "$ENVIRONMENT" == "production" ]]; then
    git checkout main
else
    git checkout staging
fi

echo ""
echo -e "${GREEN}✅ Rollback to ${TARGET_TAG} completed successfully!${NC}"
echo -e "${YELLOW}⚠️  Don't forget to investigate and fix the issue that caused the rollback${NC}"

if [[ "$ENVIRONMENT" == "production" ]]; then
    echo -e "${BLUE}📊 Verify at: https://emviapp.com${NC}"
else
    echo -e "${BLUE}🔍 Verify at: https://staging.emviapp.com${NC}"
fi
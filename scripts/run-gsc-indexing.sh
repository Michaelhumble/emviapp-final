#!/bin/bash

# 🚀 EmviApp GSC Indexing Request Runner - Jobs Only
# Submits ONLY JobPosting URLs to Google Search Console Indexing API

set -e  # Exit on any error

echo "🚀 Starting GSC Job Indexing Process..."
echo "📁 Working directory: $(pwd)"
echo "📅 Timestamp: $(date)"

# Check if jobs URLs file exists
if [ ! -f "reports/seo/priority-indexing-urls-jobs.txt" ]; then
    echo "❌ Jobs URLs file not found: reports/seo/priority-indexing-urls-jobs.txt"
    echo "This file should contain ONLY JobPosting URLs for the Indexing API."
    exit 1
fi

# Count URLs to process
URL_COUNT=$(grep -c "^https://" reports/seo/priority-indexing-urls-jobs.txt || echo "0")
echo "📋 Found $URL_COUNT job URLs for indexing"

if [ "$URL_COUNT" -eq 0 ]; then
    echo "❌ No valid job URLs found in the list"
    exit 1
fi

# Check for Service Account credentials
SERVICE_ACCOUNT_PATH="${GOOGLE_APPLICATION_CREDENTIALS:-./secrets/google-service-account.json}"

if [ ! -f "$SERVICE_ACCOUNT_PATH" ]; then
    echo "⚠️  Google Service Account JSON not found at: $SERVICE_ACCOUNT_PATH"
    echo ""
    echo "🔧 To set up authentication:"
    echo "1. Create a Google Service Account: https://console.cloud.google.com/"
    echo "2. Enable the Indexing API for your project"
    echo "3. Download the JSON key file"
    echo "4. Save it as: $SERVICE_ACCOUNT_PATH"
    echo "5. Add the service account email as OWNER in Google Search Console"
    echo ""
    echo "🧪CredentiaLS not found - running in DRY RUN mode instead..."
    DRY_RUN="--dry-run"
else
    echo "✅ Service Account JSON found at: $SERVICE_ACCOUNT_PATH"
    
    # Extract service account email for verification
    if command -v jq &> /dev/null; then
        SERVICE_EMAIL=$(jq -r '.client_email' "$SERVICE_ACCOUNT_PATH" 2>/dev/null || echo "unknown")
        echo "📧 Service Account Email: $SERVICE_EMAIL"
        echo "⚠️  VERIFY: This email must be added as OWNER in Google Search Console"
        echo "   Visit: https://search.google.com/search-console/users"
    fi
    
    DRY_RUN=""
fi

# Quota safety check
if [ "$URL_COUNT" -gt 180 ]; then
    echo "⚠️  URL count ($URL_COUNT) exceeds daily quota safety limit (180)"
    echo "This will be limited to 180 requests automatically"
fi

# Show what URLs will be processed (first 10)
echo ""
echo "📋 First 10 job URLs to be processed:"
head -n 20 reports/seo/priority-indexing-urls-jobs.txt | grep "^https://" | head -n 10 | while read -r url; do
    echo "   $url"
done

if [ "$URL_COUNT" -gt 10 ]; then
    echo "   ... and $(($URL_COUNT - 10)) more job URLs"
fi

# Confirmation prompt for live mode
if [ -z "$DRY_RUN" ]; then
    echo ""
    echo "⚠️  WARNING: This will submit $URL_COUNT URLs to Google's Indexing API"
    echo "This uses your daily quota (200 requests max per day)"
    echo ""
    read -p "Continue with live submission? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Aborted by user"
        exit 1
    fi
fi

# Run the indexing request tool
echo ""
echo "🔄 Executing GSC job indexing requests..."
echo "⏱️  Rate limit: 2 seconds between requests"
echo "🎯 Target: Job URLs only (with JobPosting structured data)"

export GOOGLE_APPLICATION_CREDENTIALS="$SERVICE_ACCOUNT_PATH"

node scripts/gsc-indexing-request.mjs $DRY_RUN

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ GSC job indexing process completed successfully"
    
    # Show latest report if it exists
    LATEST_REPORT=$(ls -t reports/seo/indexing-logs/*.json 2>/dev/null | head -n1 || echo "")
    if [ -n "$LATEST_REPORT" ]; then
        echo "📄 Latest report: $LATEST_REPORT"
        
        # Extract key metrics from report
        if command -v jq &> /dev/null; then
            SUCCESS_COUNT=$(jq -r '.results.successful' "$LATEST_REPORT" 2>/dev/null || echo "N/A")
            FAILED_COUNT=$(jq -r '.results.failed' "$LATEST_REPORT" 2>/dev/null || echo "N/A")
            SUCCESS_RATE=$(jq -r '.results.success_rate_percent' "$LATEST_REPORT" 2>/dev/null || echo "N/A")
            echo "📊 Results: $SUCCESS_COUNT successful, $FAILED_COUNT failed ($SUCCESS_RATE% success rate)"
        fi
    fi
    
    if [ -n "$DRY_RUN" ]; then
        echo ""
        echo "🧪 This was a dry run - no actual requests were sent"
        echo "Remove --dry-run or provide valid service account credentials to run live"
    else
        echo ""
        echo "⏰ Google typically processes indexing requests within minutes to hours"
        echo "📊 Monitor progress in Google Search Console"
        echo "🎯 Only JobPosting URLs were submitted (per Google's guidelines)"
    fi
else
    echo ""
    echo "❌ GSC job indexing process failed with exit code $EXIT_CODE"
    echo "Check the error messages above for troubleshooting"
fi

echo ""
echo "🏁 GSC job indexing runner completed"
exit $EXIT_CODE
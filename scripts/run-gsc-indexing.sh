#!/bin/bash

# 🚀 EmviApp GSC Indexing Request Runner
# Executes priority URL indexing with quota-aware batching

set -e  # Exit on any error

echo "🚀 Starting GSC Priority Indexing Process..."
echo "📁 Working directory: $(pwd)"
echo "📅 Timestamp: $(date)"

# Check if priority URLs file exists
if [ ! -f "reports/seo/priority-indexing-urls.txt" ]; then
    echo "❌ Priority URLs file not found: reports/seo/priority-indexing-urls.txt"
    echo "Run the SEO audit first to generate the URLs list."
    exit 1
fi

# Count URLs to process
URL_COUNT=$(grep -c "^https://" reports/seo/priority-indexing-urls.txt || echo "0")
echo "📋 Found $URL_COUNT priority URLs for indexing"

if [ "$URL_COUNT" -eq 0 ]; then
    echo "❌ No valid URLs found in the priority list"
    exit 1
fi

# Check for API credentials
if [ -z "$GOOGLE_API_KEY" ] && [ -z "$GOOGLE_SERVICE_ACCOUNT_KEY" ]; then
    echo "⚠️  No Google API credentials found"
    echo "Set one of these environment variables:"
    echo "  GOOGLE_API_KEY=your_api_key"
    echo "  GOOGLE_SERVICE_ACCOUNT_KEY='{\"type\":\"service_account\",...}'"
    echo ""
    echo "🧪 Running in DRY RUN mode instead..."
    DRY_RUN="--dry-run"
else
    echo "✅ Google API credentials detected"
    DRY_RUN=""
fi

# Quota safety check
if [ "$URL_COUNT" -gt 180 ]; then
    echo "⚠️  URL count ($URL_COUNT) exceeds daily quota safety limit (180)"
    echo "This will be split across multiple days automatically"
fi

# Run the indexing request tool
echo ""
echo "🔄 Executing GSC indexing requests..."
echo "📊 Batch size: 5 URLs per batch"
echo "⏱️  Delay: 2 seconds between requests"

node scripts/gsc-indexing-request.mjs \
    --batch-size=5 \
    --delay=2000 \
    $DRY_RUN

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ GSC indexing process completed successfully"
    
    # Show latest report if it exists
    LATEST_REPORT=$(ls -t reports/seo/gsc-indexing-report-*.json 2>/dev/null | head -n1 || echo "")
    if [ -n "$LATEST_REPORT" ]; then
        echo "📄 Latest report: $LATEST_REPORT"
        
        # Extract key metrics from report
        if command -v jq &> /dev/null; then
            SUCCESS_COUNT=$(jq -r '.results.success' "$LATEST_REPORT" 2>/dev/null || echo "N/A")
            FAILED_COUNT=$(jq -r '.results.failed' "$LATEST_REPORT" 2>/dev/null || echo "N/A")
            echo "📊 Results: $SUCCESS_COUNT successful, $FAILED_COUNT failed"
        fi
    fi
    
    if [ -n "$DRY_RUN" ]; then
        echo ""
        echo "🧪 This was a dry run - no actual requests were sent"
        echo "Remove API credential restrictions to run live requests"
    else
        echo ""
        echo "⏰ Google typically processes indexing requests within minutes to hours"
        echo "📊 Monitor progress in Google Search Console"
    fi
else
    echo ""
    echo "❌ GSC indexing process failed with exit code $EXIT_CODE"
    echo "Check the error messages above for troubleshooting"
fi

echo ""
echo "🏁 GSC indexing runner completed"
exit $EXIT_CODE
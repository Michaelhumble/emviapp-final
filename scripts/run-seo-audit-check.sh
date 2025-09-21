#!/bin/bash

echo "🔍 Running SEO Audit to verify Meta Description & H1 optimizations..."
echo ""

# Run the SEO audit production script
node scripts/seo-audit-production.mjs

echo ""
echo "📊 Quick test of specific programmatic URLs:"
echo ""

# Test sample URLs to verify changes
URLS=(
  "https://www.emvi.app/seo/nails/houston-tx"
  "https://www.emvi.app/jobs-in/houston-tx/nail-artist" 
  "https://www.emvi.app/salons-in/dallas-tx/hair-stylist"
)

for url in "${URLS[@]}"; do
  echo "Testing: $url"
  
  # Get meta description
  META_DESC=$(curl -s "$url" | grep -o '<meta[^>]*name="description"[^>]*content="[^"]*"' | sed 's/.*content="//; s/".*//')
  META_LENGTH=${#META_DESC}
  
  # Get H1 tag
  H1_TAG=$(curl -s "$url" | grep -o '<h1[^>]*>[^<]*</h1>' | sed 's/<[^>]*>//g')
  
  echo "  Meta Description ($META_LENGTH chars): ${META_DESC:0:80}..."
  echo "  H1 Tag: $H1_TAG"
  
  # Check if meta description is in optimal range
  if [ $META_LENGTH -ge 150 ] && [ $META_LENGTH -le 160 ]; then
    echo "  ✅ Meta description length optimal"
  else
    echo "  ⚠️ Meta description length: $META_LENGTH (should be 150-160)"
  fi
  
  # Check if H1 follows expected format for programmatic pages
  if [[ "$H1_TAG" == *"Find the Best"* && "$H1_TAG" == *"| EmviApp"* ]]; then
    echo "  ✅ H1 format correct"
  else
    echo "  ⚠️ H1 format may need adjustment"
  fi
  
  echo ""
done

echo "✅ SEO audit complete. Check above results for any remaining issues."
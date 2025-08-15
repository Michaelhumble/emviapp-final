#!/bin/bash

# 🔍 Production Spot-Check Script
# Tests key URLs for proper headers and content

echo "🔍 PRODUCTION SPOT-CHECKS"
echo "========================="

SITE="https://www.emvi.app"

echo ""
echo "1️⃣ Robots.txt check:"
curl -I ${SITE}/robots.txt 2>/dev/null | head -n 5

echo ""
echo "2️⃣ Sitemap.xml check:"
curl -I ${SITE}/sitemap.xml 2>/dev/null | head -n 5

echo ""
echo "3️⃣ Jobs sitemap check:"
curl -I ${SITE}/jobs-sitemap.xml 2>/dev/null | head -n 5

echo ""
echo "4️⃣ Blog sitemap check:"
curl -I ${SITE}/blog-sitemap.xml 2>/dev/null | head -n 5

echo ""
echo "5️⃣ Jobs page canonical:"
curl -s ${SITE}/jobs 2>/dev/null | grep -i '<link rel="canonical"' | head -n 3

echo ""
echo "6️⃣ Home page canonical:"
curl -s ${SITE}/ 2>/dev/null | grep -i '<link rel="canonical"' | head -n 3

echo ""
echo "7️⃣ Sign-in page noindex:"
curl -s ${SITE}/signin 2>/dev/null | grep -i 'noindex' | head -n 3

echo ""
echo "8️⃣ Job detail JSON-LD (sample):"
# This would need a real job ID - placeholder for now
echo "Note: Would test with real job ID from production"

echo ""
echo "✅ Spot-checks complete!"
echo "Check each response for 200 status and proper content"
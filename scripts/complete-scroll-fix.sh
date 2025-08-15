#!/usr/bin/env bash

echo "🔍 Checking current status of index keys..."

echo "=== Before: Count of key={index} ==="
rg -c "key=\{index\}" src || echo "0 matches"

echo ""
echo "=== Before: Count of key={i} ==="
rg -c "key=\{i\}" src || echo "0 matches" 

echo ""
echo "=== Before: Count of key={idx} ==="
rg -c "key=\{idx\}" src || echo "0 matches"

echo ""
echo "=== Running node scripts/fix-index-keys.mjs ==="
node scripts/fix-index-keys.mjs

echo ""
echo "=== After: Count of key={index} ==="
rg -c "key=\{index\}" src || echo "✅ 0 matches - no index keys left"

echo ""
echo "=== After: Count of key={i} ==="  
rg -c "key=\{i\}" src || echo "✅ 0 matches - no i keys left"

echo ""
echo "=== After: Count of key={idx} ==="
rg -c "key=\{idx\}" src || echo "✅ 0 matches - no idx keys left"

echo ""
echo "🧪 Running tests..."
npm run test src/__tests__/noIndexKeys.spec.ts

echo ""
echo "🎯 Running lint..."
npm run lint --silent

echo ""
echo "✅ Scroll stability refactor completed!"
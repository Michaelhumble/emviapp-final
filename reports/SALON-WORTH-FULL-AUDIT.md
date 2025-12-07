# SALON WORTH FULL AUDIT REPORT
## EmviApp Salon Valuation System - Complete Accuracy Analysis

**Audit Date:** December 7, 2025  
**Audit Type:** READ-ONLY - Formula & Accuracy Assessment  
**Status:** ⚠️ CRITICAL ISSUES IDENTIFIED  

---

## EXECUTIVE SUMMARY

The EmviApp Salon Worth Calculator uses a proprietary formula combining revenue multiples, asset values, and location/reputation modifiers. While the architecture is sound, **significant accuracy concerns** exist due to:

1. **Hardcoded mock values** bypass actual user input on the main page
2. **Missing industry-standard factors** (profit margins, cash flow, customer concentration)
3. **Overly simplistic location data** (only 13 US metro areas covered)
4. **No validation for unrealistic inputs** (negative values, extreme outliers)
5. **Confidence score disconnected** from actual data completeness

**ACCURACY RATING: 5.5/10**

---

## 1. EXACT FORMULA USED (Line-by-Line)

### Primary Formula Location: `src/lib/valuation.ts`

```
SALON VALUE = BASE VALUE + ALL ADJUSTMENTS

Where:
BASE VALUE = (Monthly Revenue × Revenue Multiplier) + (Stations × $15,000)
```

### Step 1: Revenue Multiple Calculation
**Lines 36-42:**
```typescript
let revenueMultiplier = 2.5;
if (inputs.monthlyRevenue > 80000) {
  revenueMultiplier = 2.3;  // Reduced for high-revenue salons
}
revenueMultiple = monthlyRevenue × revenueMultiplier
```

| Revenue Range | Multiplier | Industry Standard |
|---------------|------------|-------------------|
| ≤ $80K/month | 2.5× | 1.5-4.0× (varies by profit) |
| > $80K/month | 2.3× | Should be higher for profitable salons |

**⚠️ ISSUE:** Industry uses SDE (Seller's Discretionary Earnings) multiples, not gross revenue multiples. A 2.5× revenue multiple assumes ~40% profit margin, which may not be accurate.

### Step 2: Station/Asset Value
**Lines 44-45:**
```typescript
stationValue = numberOfStations × $15,000
```

| Asset Type | EmviApp Value | Industry Standard |
|------------|---------------|-------------------|
| Nail Station | $15,000 | $8,000-$25,000 depending on equipment |
| Pedicure Chair | $15,000 | $3,000-$15,000 |
| Shampoo Station | $15,000 | $2,000-$8,000 |

**⚠️ ISSUE:** Flat $15K per station doesn't differentiate between equipment quality or station types.

### Step 3: Location Premium
**Lines 54-56 (via `valuation-location-data.ts`):**
```typescript
locationPremium = baseValue × (locationMultiplier - 1.0)
```

| Market Tier | Multiplier | Example Cities |
|-------------|------------|----------------|
| Super Premium | 1.30× | SF Bay Area |
| High Premium | 1.25× | OC Coastal, LA West Side |
| High Demand | 1.18-1.20× | Seattle, San Diego, Austin |
| Strong | 1.10-1.15× | Denver, Boston, Atlanta |
| Moderate | 1.05-1.08× | Dallas, Houston, Phoenix |
| Default | 1.00× | All other US locations |

**⚠️ ISSUE:** Only 13 metro areas covered (857 ZIP codes). The other 40,000+ US ZIP codes get NO premium, even in high-value areas like NYC, DC, Chicago, Las Vegas.

### Step 4: Online Reputation Adjustment
**Lines 62-78:**
```typescript
if (reviewCount > 400 && rating >= 4.8):      +20% of base
else if (reviewCount > 200 && rating >= 4.5): +15% of base
else if (reviewCount > 100 && rating >= 4.2): +8% of base
else if (reviewCount < 50 || rating < 3.8):   -5% of base
```

**✅ REASONABLE:** This tiered approach aligns with industry practices.

### Step 5: Lease Security Adjustment
**Lines 84-94:**
```typescript
if (leaseLength === 'owned'):       +30% of base
else if (leaseLength === 'long-term'): +5% of base
else if (leaseLength === 'short-term'): -12% of base
```

**⚠️ ISSUE:** "Owned" property should add the real estate value separately, not as a percentage. A salon with $200K equipment shouldn't automatically get $60K for owning the building.

### Step 6: Business Age Bonus (NOT COLLECTED IN UI)
**Lines 100-113:**
```typescript
if (yearsInBusiness >= 10): +10% of base
else if (yearsInBusiness >= 5): +5% of base
else if (yearsInBusiness >= 3): +2% of base
```

**⚠️ CRITICAL:** This field exists in the formula but is NOT collected in either UI form.

### Step 7: Client Base Loyalty (NOT COLLECTED IN UI)
**Lines 119-123:**
```typescript
if (hasLoyalClientBase): +8% of base
```

**⚠️ CRITICAL:** This field exists in the formula but is NOT collected in either UI form.

### Step 8: Final Calculation
**Line 129:**
```typescript
finalValue = base + locationAdjustment + reviewsAdjustment + 
             leaseAdjustment + businessAgeBonus + clientBaseBonus
```

### Step 9: Range Calculation
**Lines 152-154:**
```typescript
rangePercent = (confidenceScore >= 85) ? 0.08 : 0.12
low = finalValue × (1 - rangePercent)
high = finalValue × (1 + rangePercent)
```

---

## 2. COMPLETE FILE DEPENDENCY MAP

```
src/pages/SalonWorth.tsx
├── IMPORTS:
│   ├── src/lib/valuation.ts (calculateSalonValuation, ValuationInputs, ValuationResult)
│   ├── src/components/calculator/BottomSheet.tsx
│   ├── src/components/calculator/ValuationResultSheet.tsx
│   ├── src/components/calculator/MiniSummaryBar.tsx
│   └── src/components/calculator/FAQSection.tsx
│
├── ⚠️ CRITICAL: Uses HARDCODED MOCK inputs (lines 73-80):
│   monthlyRevenue: 50000 (IGNORES USER INPUT)
│   numberOfStations: 10 (IGNORES USER INPUT)
│   zipCode: cityInput || '92704'
│   leaseLength: 'long-term' (HARDCODED)
│   googleRating: 4.8 (HARDCODED)
│   googleReviewCount: 250 (HARDCODED)

src/components/calculator/SalonWorthCalculator.tsx
├── FULL FORM with actual user inputs
├── IMPORTS:
│   ├── src/lib/valuation.ts
│   ├── src/components/calculator/ConfidenceMeter.tsx
│   ├── src/components/calculator/StickyResultBar.tsx
│   ├── src/components/calculator/ValuationChart.tsx
│   ├── src/components/calculator/MarketComparison.tsx
│   ├── src/components/calculator/SalesTimeline.tsx
│   ├── src/components/calculator/AnimatedValuationResult.tsx
│   ├── src/components/calculator/UrgencyTimer.tsx
│   ├── src/components/calculator/ComparisonSlider.tsx
│   └── src/components/calculator/ProgressBar.tsx
│
├── Collects: revenue, stations, zipCode, leaseLength, rating, reviewCount
└── Does NOT collect: yearsInBusiness, hasLoyalClientBase

src/lib/valuation.ts
├── EXPORTS:
│   ├── calculateSalonValuation(inputs: ValuationInputs): ValuationResult
│   └── formatCurrency(amount: number): string
├── IMPORTS:
│   └── src/lib/valuation-location-data.ts (calculateLocationPremium)

src/lib/valuation-location-data.ts
├── EXPORTS:
│   ├── METRO_MULTIPLIERS: Record<string, MetroMultiplier>
│   ├── getLocationMultiplier(zipCode: string)
│   └── calculateLocationPremium(baseValue, zipCode)
├── Contains 13 metro areas with 857 total ZIP codes
└── Default multiplier: 1.0 for uncovered areas

src/components/calculator/ValuationResultSheet.tsx
├── Display component for bottom sheet
├── Uses formatCurrency from valuation.ts
├── Saves leads to Supabase 'valuation_leads' table
└── Hardcoded market average: $125,000

src/components/calculator/MarketComparison.tsx
├── Hardcoded marketAverage: $125,000
└── Displays percentage difference from average

src/components/calculator/ComparisonSlider.tsx
├── Uses formatCurrency from valuation.ts
└── Also uses hardcoded average comparison
```

---

## 3. CALCULATION ACCURACY ASSESSMENT

### Accuracy Rating: 5.5/10

| Factor | Weight | Score | Notes |
|--------|--------|-------|-------|
| Revenue Multiple Logic | 25% | 4/10 | Uses gross revenue, not SDE/profit |
| Asset Valuation | 15% | 5/10 | Flat rate, no equipment differentiation |
| Location Data | 20% | 3/10 | Only 13 metros, missing NYC, Chicago, DC, Vegas |
| Reputation Factors | 10% | 8/10 | Reasonable tiered approach |
| Lease Factors | 10% | 6/10 | Owned property logic flawed |
| Missing Factors | 20% | 4/10 | No profit margin, customer concentration, trends |

### Critical Calculation Flaws

1. **Revenue ≠ Value** - Industry standard is 2-3× SDE (profit after owner salary), not gross revenue. A salon with $50K revenue but $45K expenses is worth far less than one with $20K expenses.

2. **Mock Data Bypass** - The main `/salon-worth` page uses hardcoded values, making actual user input irrelevant.

3. **Geographic Gaps** - Major markets completely missing:
   - New York City (20M+ population)
   - Chicago (9.5M population)
   - Washington DC (6M population)
   - Las Vegas (2.3M population)
   - Nashville (2M population)
   - Charlotte (2.7M population)

---

## 4. USER INPUT RISK AUDIT

### Missing Validation

| Input | Validation Status | Risk Level |
|-------|-------------------|------------|
| Monthly Revenue | No min/max | 🔴 HIGH |
| Number of Stations | No min/max | 🔴 HIGH |
| ZIP Code | maxLength=5 only | 🟡 MEDIUM |
| Lease Length | Select (safe) | 🟢 LOW |
| Google Rating | min=1, max=5 | 🟡 MEDIUM |
| Review Count | No max | 🟡 MEDIUM |

### Edge Cases That Break Formula

```typescript
// Negative values → Negative valuation
monthlyRevenue: -50000 → Returns negative value

// Zero values → Incomplete valuation
monthlyRevenue: 0, numberOfStations: 0 → Returns $0

// Extreme values → Unrealistic output
monthlyRevenue: 10000000 → Returns $23M+ (no cap)

// Invalid ZIP → No error, just defaults to 1.0 multiplier
zipCode: "XXXXX" → Uses 1.0 multiplier silently
```

### Division-by-Zero Risks
```typescript
// In ComparisonSlider.tsx:
percentageDiff = ((userValue - averageSalonValue) / averageSalonValue) * 100
// If averageSalonValue changed to 0, this would produce Infinity
```

---

## 5. UX/TRUST AUDIT

### Current Trust Issues

| Issue | Location | Impact |
|-------|----------|--------|
| Hardcoded results | SalonWorth.tsx L73-80 | Users always see same result |
| "Based on real market data" claim | AnimatedValuationResult.tsx L108 | Potentially misleading |
| "IBBA Standards" trust pill | ValuationResultSheet.tsx L183 | IBBA uses different methodology |
| Market average $125K | Multiple files | Hardcoded, not dynamic |
| "5% accuracy" testimonial | TestimonialBlock.tsx L13 | Unverifiable claim |

### Missing Trust Elements

1. **Data source disclosure** - Where do the multipliers come from?
2. **Last updated date** - When was location data last refreshed?
3. **Methodology page** - Detailed explanation of calculation
4. **Confidence intervals** - Beyond just low/medium/high
5. **Comparable sales** - Actual recent sale prices in the area

---

## 6. WHAT IS MISSING COMPARED TO REAL VALUATION MODELS

### Industry-Standard Factors NOT Included

| Factor | Industry Weight | EmviApp Status |
|--------|-----------------|----------------|
| **SDE (Seller's Discretionary Earnings)** | PRIMARY | ❌ Not collected |
| **Profit Margin** | 25-35% of valuation | ❌ Not collected |
| **Customer Concentration** | 10-15% of valuation | ❌ Not collected |
| **Employee Retention** | 5-10% of valuation | ❌ Not collected |
| **Revenue Trend (3-year)** | 10-15% of valuation | ❌ Not collected |
| **Inventory Value** | Direct add | ❌ Not collected |
| **Receivables/Payables** | Direct add/subtract | ❌ Not collected |
| **Competition Density** | 5-10% adjustment | ❌ Not calculated |
| **Square Footage** | Per-sqft baseline | ❌ Not collected |
| **Rent-to-Revenue Ratio** | Key factor | ❌ Not collected |

### Professional Valuation Formula Comparison

**IBBA Standard:**
```
Business Value = (SDE × Multiple) + Inventory + FF&E - Liabilities
Where: Multiple = 1.5-3.5× based on risk factors
```

**EmviApp Formula:**
```
Business Value = (Revenue × 2.5) + (Stations × $15K) + Adjustments
```

**Key Difference:** EmviApp uses revenue; industry uses profit (SDE). A salon with 10% profit margin would be valued 2.5× too high.

---

## 7. RECOMMENDED FORMULA IMPROVEMENTS (Conceptual)

### Phase 1: Critical Fixes (No Formula Change)
1. **Remove hardcoded mock values** in SalonWorth.tsx
2. **Add input validation** (min/max values, required fields)
3. **Add missing metro areas** (NYC, Chicago, DC, Vegas, etc.)

### Phase 2: Accuracy Improvements
1. **Add profit margin question** → Adjust revenue multiple based on margin
2. **Add years in business** → Already in formula, just add to UI
3. **Add loyal client base toggle** → Already in formula, just add to UI
4. **Differentiate station types** → Nail vs. pedicure vs. hair

### Phase 3: Industry Alignment
1. **Switch to SDE-based valuation** with guided profit calculation
2. **Add monthly rent question** → Calculate rent-to-revenue ratio
3. **Add trend direction** → "Revenue increasing/stable/decreasing"
4. **Add competition question** → "Competitors within 1 mile"

### Proposed Enhanced Formula
```typescript
// Step 1: Calculate SDE
sde = monthlyRevenue - monthlyExpenses;
annualSDE = sde * 12;

// Step 2: Determine Multiple (1.5-3.5×)
baseMultiple = 2.0;
if (revenueGrowing) baseMultiple += 0.3;
if (yearsInBusiness > 5) baseMultiple += 0.2;
if (hasLoyalClients) baseMultiple += 0.2;
if (lowCompetition) baseMultiple += 0.2;
if (goodLease) baseMultiple += 0.3;
if (excellentReviews) baseMultiple += 0.3;

// Step 3: Calculate Value
businessValue = annualSDE * baseMultiple;

// Step 4: Add Assets
totalValue = businessValue + inventoryValue + equipmentValue;
```

---

## 8. HOW TO INCREASE ACCURACY

### A. Revenue Multiples
**Current:** Fixed 2.5× (2.3× for high revenue)
**Recommended:**
```
If profit margin < 20%: 1.5-2.0×
If profit margin 20-30%: 2.0-2.5×
If profit margin 30-40%: 2.5-3.0×
If profit margin > 40%: 3.0-3.5×
```

### B. Location Categories
**Current:** 13 metro areas (857 ZIPs)
**Recommended:** Add at minimum:
- New York Metro (1.25-1.35×)
- Chicago Metro (1.10-1.20×)
- Washington DC (1.15-1.25×)
- Las Vegas (1.10-1.20×)
- Nashville (1.08-1.15×)
- Portland (1.10-1.18×)
- Minneapolis (1.05-1.12×)

### C. Review-Based Modifiers
**Current:** Reasonable tiers
**Enhancement:**
- Add Yelp rating (many salons rely on Yelp)
- Add social media followers as bonus
- Weight by recency (reviews in last 6 months)

### D. Lease Term Modifiers
**Current:** Short/Long/Owned
**Enhancement:**
```
< 1 year remaining: -20%
1-2 years remaining: -10%
2-5 years remaining: +5%
5+ years remaining: +10%
Owns property: Add property value separately (not %)
```

### E. Assets Valuation
**Current:** Flat $15K per station
**Enhancement:**
```
Nail Station: $8,000-12,000
Pedicure Chair (basic): $5,000-8,000
Pedicure Chair (premium): $12,000-20,000
Shampoo Station: $3,000-6,000
Hair Station: $2,000-5,000
Waxing Room: $3,000-8,000
Facial Room: $5,000-15,000
```

---

## 9. COMPLETE FILE LIST

### Core Logic
- `src/lib/valuation.ts` (181 lines)
- `src/lib/valuation-location-data.ts` (221 lines)

### Pages
- `src/pages/SalonWorth.tsx` (260 lines) ⚠️ Contains mock data

### Calculator Components
- `src/components/calculator/SalonWorthCalculator.tsx` (467 lines)
- `src/components/calculator/ValuationResultSheet.tsx` (364 lines)
- `src/components/calculator/AnimatedValuationResult.tsx` (113 lines)
- `src/components/calculator/BottomSheet.tsx`
- `src/components/calculator/ComparisonSlider.tsx`
- `src/components/calculator/ConfidenceMeter.tsx` (44 lines)
- `src/components/calculator/FAQSection.tsx`
- `src/components/calculator/MarketComparison.tsx`
- `src/components/calculator/MiniSummaryBar.tsx`
- `src/components/calculator/ProgressBar.tsx`
- `src/components/calculator/SalesTimeline.tsx`
- `src/components/calculator/StickyResultBar.tsx`
- `src/components/calculator/TestimonialBlock.tsx`
- `src/components/calculator/UrgencyTimer.tsx`
- `src/components/calculator/ValuationChart.tsx`

### Database
- `valuation_leads` table (stores email captures)

---

## 10. FINAL ASSESSMENT

### Strengths
✅ Clean, modular code architecture  
✅ Comprehensive UI with multiple display components  
✅ Good UX with animations and confidence indicators  
✅ Lead capture integration with Supabase  
✅ Reasonable reputation-based adjustments  

### Critical Weaknesses
❌ Main page uses hardcoded mock values  
❌ Revenue-based formula instead of profit-based  
❌ Major US metros missing from location data  
❌ No input validation for edge cases  
❌ Claims "IBBA Standards" but uses different methodology  
❌ Formula fields exist but aren't collected in UI  

### Risk Level: **MEDIUM-HIGH**

Users may receive inaccurate valuations that:
1. Overvalue low-margin businesses (using revenue, not profit)
2. Undervalue salons in unlisted premium areas (NYC, Chicago)
3. Give identical results regardless of input (mock data bypass)

---

## APPENDIX: Quick Reference Card

### Current Formula Summary
```
VALUE = (Revenue × 2.5) + (Stations × $15K) + LocationBonus + ReviewBonus + LeaseBonus
```

### Accuracy Factors
| Factor | Accuracy |
|--------|----------|
| Revenue Multiple | 40% |
| Station Value | 50% |
| Location Premium | 30% (limited coverage) |
| Reviews | 80% |
| Lease | 60% |
| **Overall** | **55%** |

---

**Report Generated:** December 7, 2025  
**Report Type:** READ-ONLY Audit  
**Files Modified:** NONE  
**Recommendations:** Conceptual only - requires explicit approval before implementation

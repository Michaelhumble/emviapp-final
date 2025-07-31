# 🔍 ANALYTICS QA CHECKLIST
**Verify unified GA4 analytics system is working correctly**

## ✅ PRE-TESTING SETUP
- [ ] Open Google Analytics 4 dashboard (G-RRFWGM0MPH)
- [ ] Open browser developer tools > Network tab
- [ ] Clear localStorage and sessionStorage
- [ ] Use incognito/private browsing for clean test

## 📊 CORE TRACKING VERIFICATION

### Page Views
- [ ] Navigate to different pages (/jobs, /salons, /blog, etc.)
- [ ] Verify GA4 "Realtime" shows page views within 30 seconds
- [ ] Check Network tab shows gtag requests with page_view events
- [ ] Confirm no duplicate/conflicting analytics calls

### User Events
- [ ] Sign up for new account → Check GA4 "Conversions" for `sign_up` event
- [ ] Search for jobs/salons → Verify `search` events in GA4
- [ ] View job/salon details → Check `view_item` events
- [ ] Submit contact form → Verify `generate_lead` conversion

### E-commerce Tracking
- [ ] Start booking process → Check `begin_checkout` event
- [ ] Complete booking → Verify `purchase` event with correct value
- [ ] Post a job → Check `purchase` event for job posting
- [ ] Cancel/refund → Verify `refund` event (if applicable)

## 🎯 CONVERSION VERIFICATION
- [ ] GA4 shows signup conversions in real-time
- [ ] Booking revenue tracked correctly in GA4 E-commerce
- [ ] UTM parameters captured and attributed
- [ ] User journey tracking works end-to-end

## 📱 MOBILE TESTING
- [ ] Test all flows on mobile device
- [ ] Verify touch events track correctly
- [ ] Check mobile conversions appear in GA4

## 🔍 DATA ACCURACY CHECK
- [ ] Compare GA4 pageviews with Lovable AI analytics (should be within 5%)
- [ ] Verify user counts match between systems
- [ ] Check conversion rates align across platforms
- [ ] Confirm revenue tracking is accurate

## ⚡ PERFORMANCE CHECK
- [ ] Page load times not impacted by analytics
- [ ] No console errors related to gtag
- [ ] Analytics scripts load asynchronously
- [ ] No memory leaks from event listeners

## 🚨 CRITICAL SUCCESS CRITERIA
- ✅ GA4 shows real traffic within 60 seconds of user activity
- ✅ Conversion events fire correctly for all major actions
- ✅ Revenue tracking matches actual transactions
- ✅ Data accuracy within 5% between GA4 and internal systems
- ✅ No duplicate or conflicting analytics calls

## 🔧 TROUBLESHOOTING
If tests fail:
1. Check browser console for gtag errors
2. Verify GA4 tracking ID in index.html
3. Confirm gtag script loads before analytics calls
4. Check if ad blockers are interfering
5. Validate event parameters match GA4 requirements

---
**Status: Ready for scaling ad spend and marketing campaigns once all checks pass ✅**
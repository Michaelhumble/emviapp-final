/**
 * Cross-Platform Conversion Tracking for EmviApp
 * Tracks lead submissions across GA4, Facebook Pixel, and TikTok Pixel
 * Integrates with existing UTM attribution from utm.js
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'emvi_attribution';
  const DEBUG_PARAM = 'debug_conversions';
  
  // Environment variables for pixel IDs
  const GA_ID = window.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const FB_ID = window.NEXT_PUBLIC_FB_PIXEL_ID;
  const TIKTOK_ID = window.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  
  const isDebugMode = new URLSearchParams(window.location.search).get(DEBUG_PARAM) === '1';

  // Get stored attribution data from utm.js
  function getAttributionData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (Date.now() < data.expires) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Failed to parse attribution data:', e);
    }
    return {};
  }

  // Extract URL parameters for additional tracking
  function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      gclid: urlParams.get('gclid') || '',
      fbclid: urlParams.get('fbclid') || '',
      ttclid: urlParams.get('ttclid') || ''
    };
  }

  // Create conversion payload
  function createConversionPayload() {
    const attribution = getAttributionData();
    const urlParams = getUrlParams();
    
    return {
      source: attribution.utm_source || '',
      medium: attribution.utm_medium || '',
      campaign: attribution.utm_campaign || '',
      term: attribution.utm_term || '',
      content: attribution.utm_content || '',
      gclid: urlParams.gclid,
      fbclid: urlParams.fbclid,
      ttclid: urlParams.ttclid,
      referrer: attribution.initial_referrer || '',
      path: attribution.landing_page || window.location.pathname,
      timestamp: new Date().toISOString()
    };
  }

  // Push to Google Analytics 4 dataLayer
  function pushToDataLayer(payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_submitted',
      ...payload
    });
    
    if (isDebugMode) {
      console.info('🎯 DataLayer pushed:', payload);
    }
  }

  // Fire GA4 conversion
  function fireGA4Conversion(payload) {
    if (!GA_ID) {
      console.info('⚠️ GA4 conversion skipped - NEXT_PUBLIC_GA_MEASUREMENT_ID not set');
      return;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        campaign_id: payload.campaign,
        campaign_source: payload.source,
        campaign_medium: payload.medium,
        campaign_term: payload.term,
        campaign_content: payload.content,
        gclid: payload.gclid
      });
      
      if (isDebugMode) {
        console.info('🎯 GA4 generate_lead fired:', payload);
      }
    } else {
      console.warn('GA4 gtag function not available');
    }
  }

  // Fire Facebook Pixel conversion
  function fireFacebookConversion(payload) {
    if (!FB_ID) {
      console.info('⚠️ Facebook Pixel conversion skipped - NEXT_PUBLIC_FB_PIXEL_ID not set');
      return;
    }

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        source: payload.source,
        medium: payload.medium,
        campaign: payload.campaign,
        fbclid: payload.fbclid
      });
      
      if (isDebugMode) {
        console.info('🎯 Facebook Lead fired:', payload);
      }
    } else {
      console.warn('Facebook Pixel fbq function not available');
    }
  }

  // Fire TikTok Pixel conversion
  function fireTikTokConversion(payload) {
    if (!TIKTOK_ID) {
      console.info('⚠️ TikTok Pixel conversion skipped - NEXT_PUBLIC_TIKTOK_PIXEL_ID not set');
      return;
    }

    if (typeof window.ttq === 'function') {
      window.ttq.track('CompleteRegistration', {
        content_type: 'lead_form',
        source: payload.source,
        medium: payload.medium,
        campaign: payload.campaign,
        ttclid: payload.ttclid
      });
      
      if (isDebugMode) {
        console.info('🎯 TikTok CompleteRegistration fired:', payload);
      }
    } else {
      console.warn('TikTok Pixel ttq function not available');
    }
  }

  // Main conversion tracking function
  function trackLeadConversion() {
    const payload = createConversionPayload();
    
    // Push to dataLayer first
    pushToDataLayer(payload);
    
    // Fire all pixel conversions
    fireGA4Conversion(payload);
    fireFacebookConversion(payload);
    fireTikTokConversion(payload);
    
    console.log('✅ Lead conversion tracked across all platforms');
  }

  // Listen for HubSpot form submissions
  function listenForHubSpotForms() {
    if (typeof window.hbspt !== 'undefined') {
      window.hbspt.forms.onFormSubmit = function() {
        trackLeadConversion();
      };
    }
    
    // Alternative: Listen for HubSpot global events
    window.addEventListener('message', function(event) {
      if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
        trackLeadConversion();
      }
    });
  }

  // Listen for our custom lead forms
  function listenForLeadForms() {
    const leadForms = document.querySelectorAll('.lead-form');
    
    leadForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        // Track immediately on submit (don't wait for success)
        trackLeadConversion();
      });
    });
  }

  // Listen for thank-you page visits (alternative success detection)
  function detectThankYouPage() {
    if (window.location.pathname === '/thank-you') {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('source');
      
      if (source === 'contact' || source === 'partner') {
        trackLeadConversion();
      }
    }
  }

  // Initialize conversion tracking
  function init() {
    if (isDebugMode) {
      console.info('🔍 Conversion tracking debug mode enabled');
    }
    
    // Set up all listeners
    listenForHubSpotForms();
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        listenForLeadForms();
        detectThankYouPage();
      });
    } else {
      listenForLeadForms();
      detectThankYouPage();
    }
  }

  // Start initialization
  init();

})();
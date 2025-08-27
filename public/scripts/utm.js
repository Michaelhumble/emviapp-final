/**
 * UTM and Attribution Tracking
 * Captures UTM parameters, referrer, and landing page data
 * Automatically injects into lead forms across the site
 */

(function() {
  'use strict';

  const UTM_STORAGE_KEY = 'emvi_attribution';
  const TTL_DAYS = 90;
  const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const ATTRIBUTION_FIELDS = [...UTM_PARAMS, 'initial_referrer', 'landing_page'];

  // Get UTM parameters from current URL
  function getUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {};
    let hasUTM = false;

    UTM_PARAMS.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        utmData[param] = value;
        hasUTM = true;
      }
    });

    return { utmData, hasUTM };
  }

  // Get or create attribution data
  function getAttributionData() {
    try {
      const stored = localStorage.getItem(UTM_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        // Check if TTL has expired
        if (Date.now() < data.expires) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Failed to parse attribution data:', e);
    }
    return null;
  }

  // Save attribution data with TTL
  function saveAttributionData(data) {
    try {
      const expires = Date.now() + (TTL_DAYS * 24 * 60 * 60 * 1000);
      const attributionData = {
        ...data,
        expires: expires,
        updated: Date.now()
      };
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(attributionData));
    } catch (e) {
      console.warn('Failed to save attribution data:', e);
    }
  }

  // Initialize attribution tracking
  function initAttributionTracking() {
    const { utmData, hasUTM } = getUTMParams();
    let attributionData = getAttributionData();

    // If no existing data or new UTM params, create/update
    if (!attributionData || hasUTM) {
      if (!attributionData) {
        // First visit - capture everything
        attributionData = {
          initial_referrer: document.referrer || 'direct',
          landing_page: window.location.pathname,
          ...utmData
        };
      } else if (hasUTM) {
        // Update with new UTM data, keep original referrer/landing page
        attributionData = {
          ...attributionData,
          ...utmData
        };
      }
      
      saveAttributionData(attributionData);
    }

    return attributionData;
  }

  // Add hidden input to form
  function addHiddenInput(form, name, value) {
    let input = form.querySelector(`input[name="${name}"]`);
    
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.id = name;
      input.setAttribute('data-hs', 'true');
      form.appendChild(input);
    }

    // Only set value if input is empty
    if (!input.value && value) {
      input.value = value;
    }
  }

  // Process lead forms
  function processLeadForms(attributionData) {
    // Find lead forms: forms on /contact, /partner pages, or with .lead-form class
    const isLeadPage = /^\/(contact|partner)/.test(window.location.pathname);
    const leadForms = document.querySelectorAll(
      isLeadPage ? 'form' : 'form.lead-form'
    );

    leadForms.forEach(form => {
      // Add unique name if missing
      if (!form.name) {
        const pageName = window.location.pathname.replace(/^\//, '').replace(/\//g, '_') || 'home';
        form.name = `${pageName}_emviapp`;
      }

      // Add attribution fields
      ATTRIBUTION_FIELDS.forEach(field => {
        const value = attributionData[field] || '';
        addHiddenInput(form, field, value);
      });

      // Add submit listener for logging
      form.addEventListener('submit', function() {
        const formData = {};
        ATTRIBUTION_FIELDS.forEach(field => {
          const input = form.querySelector(`input[name="${field}"]`);
          if (input && input.value) {
            formData[field] = input.value;
          }
        });
        console.log('UTM attached', formData);
      });
    });
  }

  // Initialize when DOM is ready
  function init() {
    const attributionData = initAttributionTracking();
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => processLeadForms(attributionData));
    } else {
      processLeadForms(attributionData);
    }
  }

  // Start initialization
  init();

})();

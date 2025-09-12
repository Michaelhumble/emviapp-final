import { supabase } from '@/integrations/supabase/client';

// Content sanitization utility
export const sanitizeUserInput = (input: string): string => {
  if (!input) return '';
  
  // Remove script tags and potential XSS vectors
  let sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
  
  // Trim and normalize whitespace
  sanitized = sanitized.trim().replace(/\s+/g, ' ');
  
  return sanitized;
};

// Rate limiting check
export const checkRateLimit = async (
  endpoint: string, 
  maxRequests: number = 100, 
  windowMinutes: number = 60
): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_endpoint: endpoint,
      p_max_requests: maxRequests,
      p_window_minutes: windowMinutes
    });
    
    if (error) {
      console.error('Rate limit check error:', error);
      return false; // Fail closed
    }
    
    return data;
  } catch (error) {
    console.error('Rate limiting service unavailable:', error);
    return false; // Fail closed for security
  }
};

// Audit logging
export const auditUserAction = async (
  action: string,
  resourceType: string,
  resourceId?: string,
  metadata: Record<string, any> = {}
): Promise<void> => {
  try {
    await supabase.rpc('audit_user_action', {
      p_action: action,
      p_resource_type: resourceType,
      p_resource_id: resourceId || null,
      p_metadata: metadata
    });
  } catch (error) {
    console.error('Audit logging failed:', error);
    // Don't throw - audit failure shouldn't break user flow
  }
};

// Session validation - TRUST SUPABASE, NO FORCED SIGNOUTS
export const validateSession = async (): Promise<boolean> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    // Let Supabase handle session validity - don't force signouts
    if (error || !session) {
      console.warn('⚠️ [SECURITY] Session validation warning:', error?.message || 'No session');
      return false;
    }
    
    // REMOVED: Automatic signOut on expiry - Supabase handles token refresh
    // Trust Supabase's token management and auto-refresh capabilities
    console.log('✅ [SECURITY] Session validation passed');
    return true;
    
  } catch (error) {
    console.error('❌ [SECURITY] Session validation error:', error);
    return false;
  }
};

// Content moderation
export const submitForModeration = async (
  contentType: string,
  contentId: string,
  contentText: string
): Promise<void> => {
  try {
    // Create content hash for duplicate detection
    const contentHash = btoa(contentText).slice(0, 32);
    
    const { error } = await supabase
      .from('content_moderation')
      .insert({
        content_type: contentType,
        content_id: contentId,
        content_hash: contentHash,
        status: 'pending'
      });
    
    if (error) {
      console.error('Content moderation submission failed:', error);
    }
  } catch (error) {
    console.error('Content moderation error:', error);
  }
};

// HTTPS enforcement
export const enforceHTTPS = (): void => {
  if (typeof window !== 'undefined' && window.location.protocol === 'http:' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
    window.location.href = window.location.href.replace('http:', 'https:');
  }
};

// Password strength validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// File upload validation
export const validateFileUpload = (file: File): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('File must be a JPEG, PNG, or WebP image');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Input validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
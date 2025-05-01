
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  determineUserRole, 
  persistUserRole,
  handleRoleChange 
} from '@/context/auth/utils/roleManagement';
import { toast } from 'sonner';

// Mock toast library
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('Role management functions', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('determineUserRole function', () => {
    it('should prioritize user metadata role', () => {
      const metadataRole = 'artist';
      const profileRole = 'customer';
      const storedRole = 'salon';
      
      const result = determineUserRole({ role: metadataRole }, profileRole, storedRole);
      
      expect(result).toBe('artist');
    });

    it('should fall back to profile role if metadata role is not available', () => {
      const profileRole = 'customer';
      const storedRole = 'salon';
      
      const result = determineUserRole(null, profileRole, storedRole);
      
      expect(result).toBe('customer');
    });

    it('should fall back to stored role if metadata and profile roles are not available', () => {
      const storedRole = 'salon';
      
      const result = determineUserRole(null, null, storedRole);
      
      expect(result).toBe('salon');
    });

    it('should normalize role variants correctly', () => {
      // Test with role variations
      expect(determineUserRole({ role: 'nail tech' }, null, null)).toBe('artist');
      expect(determineUserRole({ role: 'CUSTOMER' }, null, null)).toBe('customer');
      expect(determineUserRole({ role: 'Salon Owner' }, null, null)).toBe('owner');
    });

    it('should return null if no role is found', () => {
      const result = determineUserRole(null, null, null);
      
      expect(result).toBeNull();
    });
  });

  describe('persistUserRole function', () => {
    it('should store role in localStorage', () => {
      persistUserRole('artist');
      
      expect(localStorage.getItem('emviapp_user_role')).toBe('artist');
    });

    it('should remove role from localStorage when null is passed', () => {
      // First set a value
      localStorage.setItem('emviapp_user_role', 'customer');
      
      // Then call persistUserRole with null
      persistUserRole(null);
      
      expect(localStorage.getItem('emviapp_user_role')).toBeNull();
    });
  });

  describe('handleRoleChange function', () => {
    it('should return false if role is null', () => {
      const result = handleRoleChange(null, 'customer');
      
      expect(result).toBe(false);
    });

    it('should not show notification if role has not changed', () => {
      const oldRole = 'artist';
      const newRole = 'artist';
      
      const result = handleRoleChange(newRole, oldRole);
      
      expect(result).toBe(false);
      expect(toast.success).not.toHaveBeenCalled();
    });

    it('should show notification and persist role if role has changed', () => {
      const oldRole = 'customer';
      const newRole = 'artist';
      
      const result = handleRoleChange(newRole, oldRole);
      
      expect(result).toBe(true);
      expect(toast.success).toHaveBeenCalledWith('Your role has been updated to: artist');
      expect(localStorage.getItem('emviapp_user_role')).toBe('artist');
    });

    it('should normalize roles before comparing', () => {
      // 'nail tech' should normalize to 'artist', which is the same as the oldRole
      const oldRole = 'artist';
      const newRole = 'nail tech';
      
      const result = handleRoleChange(newRole, oldRole);
      
      expect(result).toBe(false); // No change after normalization
      expect(toast.success).not.toHaveBeenCalled();
    });
  });
});

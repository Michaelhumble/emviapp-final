
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { determineUserRole, persistUserRole, handleRoleChange } from '@/context/auth/utils/roleManagement';
import { UserRole } from '@/context/auth/types/authTypes';
import { normalizeRole } from '@/utils/roles';
import { toast } from 'sonner';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  }
}));

// Mock normalizeRole
vi.mock('@/utils/roles', () => ({
  normalizeRole: vi.fn((role) => role),
}));

describe('Role Management Utils', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('determineUserRole', () => {
    it('should return role from metadata with highest priority', () => {
      const metadata = { role: 'artist' as UserRole };
      const profileRole: UserRole = 'customer';
      const storedRole: UserRole = 'salon';
      
      expect(determineUserRole(metadata, profileRole, storedRole)).toBe('artist');
      expect(normalizeRole).toHaveBeenCalledWith('artist');
    });

    it('should fall back to profile role if metadata role is missing', () => {
      const metadata = {};
      const profileRole: UserRole = 'customer';
      const storedRole: UserRole = 'salon';
      
      expect(determineUserRole(metadata, profileRole, storedRole)).toBe('customer');
      expect(normalizeRole).toHaveBeenCalledWith('customer');
    });

    it('should fall back to stored role if metadata and profile roles are missing', () => {
      const metadata = {};
      const profileRole = null;
      const storedRole: UserRole = 'salon';
      
      expect(determineUserRole(metadata, profileRole, storedRole)).toBe('salon');
      expect(normalizeRole).toHaveBeenCalledWith('salon');
    });

    it('should return null if no role is found', () => {
      const metadata = {};
      const profileRole = null;
      const storedRole = null;
      
      expect(determineUserRole(metadata, profileRole, storedRole)).toBeNull();
    });
  });

  describe('persistUserRole', () => {
    it('should store role in localStorage', () => {
      const role: UserRole = 'artist';
      persistUserRole(role);
      expect(localStorageMock.getItem('emviapp_user_role')).toBe('artist');
    });

    it('should remove role from localStorage if role is null', () => {
      localStorageMock.setItem('emviapp_user_role', 'artist');
      persistUserRole(null);
      expect(localStorageMock.getItem('emviapp_user_role')).toBeNull();
    });
  });

  describe('handleRoleChange', () => {
    it('should return false if role is null', () => {
      expect(handleRoleChange(null, 'customer' as UserRole)).toBe(false);
      expect(toast.success).not.toHaveBeenCalled();
    });

    it('should show notification and update localStorage if role changes', () => {
      const newRole: UserRole = 'artist';
      const oldRole: UserRole = 'customer';
      
      expect(handleRoleChange(newRole, oldRole)).toBe(true);
      expect(toast.success).toHaveBeenCalled();
      expect(localStorageMock.getItem('emviapp_user_role')).toBe('artist');
    });

    it('should not show notification if role does not change', () => {
      const role: UserRole = 'artist';
      
      expect(handleRoleChange(role, role)).toBe(false);
      expect(toast.success).not.toHaveBeenCalled();
    });
  });
});

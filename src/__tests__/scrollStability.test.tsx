import { render } from '@testing-library/react';
import { generateStableKey, preserveScrollOnUpdate } from '@/utils/scrollStabilizer';
import StableList from '@/components/ui/StableList';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Scroll Stability', () => {
  describe('generateStableKey', () => {
    it('should use id when available', () => {
      const item = { id: 'test-123', name: 'Test' };
      expect(generateStableKey(item, 0)).toBe('test-123');
    });

    it('should use user_id as fallback', () => {
      const item = { user_id: 'user-456', name: 'User' };
      expect(generateStableKey(item, 0)).toBe('user-456');
    });

    it('should use slug as fallback', () => {
      const item = { slug: 'test-slug', name: 'Test' };
      expect(generateStableKey(item, 0)).toBe('test-slug');
    });

    it('should use title + created_at when available', () => {
      const item = { title: 'Test Title Long', created_at: '2024-01-01' };
      expect(generateStableKey(item, 0)).toBe('Test Title-2024-01-01');
    });

    it('should fall back to index with warning', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const item = { name: 'No ID' };
      expect(generateStableKey(item, 5)).toBe('item-5');
      expect(consoleSpy).toHaveBeenCalledWith('Using index as key - consider adding stable ID', item);
      consoleSpy.mockRestore();
    });
  });

  describe('StableList', () => {
    it('should render items with stable keys', () => {
      const items = [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' }
      ];

      render(
        <StableList
          items={items}
          renderItem={(item) => <div>{item.name}</div>}
        />
      );

      expect(document.body.textContent).toContain('Item 1');
      expect(document.body.textContent).toContain('Item 2');
      expect(document.body.textContent).toContain('Item 3');
    });

    it('should use custom getItemId when provided', () => {
      const items = [
        { customId: 'custom-1', name: 'Item 1' },
        { customId: 'custom-2', name: 'Item 2' }
      ];

      const getItemId = (item: typeof items[0]) => item.customId;

      render(
        <StableList
          items={items}
          renderItem={(item) => <div>{item.name}</div>}
          getItemId={getItemId}
        />
      );

      expect(document.body.textContent).toContain('Item 1');
      expect(document.body.textContent).toContain('Item 2');
    });
  });

  describe('preserveScrollOnUpdate', () => {
    let mockScrollTo: any;

    beforeEach(() => {
      mockScrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 100
      });
    });

    afterEach(() => {
      mockScrollTo.mockRestore();
    });

    it('should preserve scroll position when callback changes it', () => {
      return new Promise<void>((done) => {
      const callback = () => {
        // Simulate scroll change
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          value: 0
        });
      };

      preserveScrollOnUpdate(callback);

        // Wait for requestAnimationFrame
        setTimeout(() => {
          expect(mockScrollTo).toHaveBeenCalledWith(0, 100);
          done();
        }, 100);
      });
    });

    it('should not restore scroll if change is small', () => {
      return new Promise<void>((done) => {
      const callback = () => {
        // Simulate small scroll change
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          value: 120
        });
      };

      preserveScrollOnUpdate(callback);

        setTimeout(() => {
          expect(mockScrollTo).not.toHaveBeenCalled();
          done();
        }, 100);
      });
    });
  });
});
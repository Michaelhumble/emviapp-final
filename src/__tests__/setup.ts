
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Setup mock for localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: function(key: string): string | null {
      return store[key] || null;
    },
    setItem: function(key: string, value: string): void {
      store[key] = value;
    },
    clear: function(): void {
      store = {};
    },
    removeItem: function(key: string): void {
      delete store[key];
    },
    length: 0,
    key: function(): string | null {
      return null;
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

// Clean up the DOM after each test
afterEach(() => {
  cleanup();
});

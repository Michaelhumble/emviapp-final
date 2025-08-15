import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '@/utils/security/sanitizeHtml';

describe('sanitizeHtml', () => {
  it('should remove script tags', () => {
    const maliciousHtml = '<p>Safe content</p><script>alert("XSS")</script>';
    const result = sanitizeHtml(maliciousHtml);
    expect(result).toBe('<p>Safe content</p>');
    expect(result).not.toContain('<script>');
  });

  it('should remove iframe tags', () => {
    const maliciousHtml = '<p>Safe content</p><iframe src="evil.com"></iframe>';
    const result = sanitizeHtml(maliciousHtml);
    expect(result).toBe('<p>Safe content</p>');
    expect(result).not.toContain('<iframe>');
  });

  it('should allow safe HTML tags', () => {
    const safeHtml = '<p>Safe <strong>bold</strong> and <em>italic</em> text</p>';
    const result = sanitizeHtml(safeHtml);
    expect(result).toBe('<p>Safe <strong>bold</strong> and <em>italic</em> text</p>');
  });

  it('should handle empty input', () => {
    expect(sanitizeHtml('')).toBe('');
    expect(sanitizeHtml(undefined)).toBe('');
  });

  it('should remove javascript: URLs', () => {
    const maliciousHtml = '<a href="javascript:alert(1)">Click me</a>';
    const result = sanitizeHtml(maliciousHtml);
    expect(result).not.toContain('javascript:');
  });

  it('should preserve allowed attributes', () => {
    const htmlWithAttrs = '<a href="https://safe.com" target="_blank">Link</a>';
    const result = sanitizeHtml(htmlWithAttrs);
    expect(result).toContain('href="https://safe.com"');
    expect(result).toContain('target="_blank"');
  });
});
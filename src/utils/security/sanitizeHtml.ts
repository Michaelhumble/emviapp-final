import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(input?: string): string {
  if (!input) return '';
  
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'br', 'span', 'h2', 'h3', 'h4', 'blockquote', 'img'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title'],
    ADD_ATTR: ['loading'],
    ADD_TAGS: []
  });
}
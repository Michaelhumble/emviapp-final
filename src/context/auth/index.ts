
export * from './AuthProvider';
export * from './types';
// Remove the duplicate useAuth export to fix the namespace conflict
// useAuth is already exported from AuthProvider.tsx

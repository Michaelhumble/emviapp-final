export {};

declare global {
  // Allow legacy gtag(...) shapes during migration
  function gtag(...args: any[]): void;
}
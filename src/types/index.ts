
// Add types exports for the application

// Re-export all type definitions for easier imports
export * from "./activity";
export * from "./artist";
export * from "./availability";
export * from "./booking";
export * from "./booth";
export * from "./job";
export * from "./listing";
export * from "./map";
export * from "./MessageSender";
export * from "./notification";
// Export from portfolio without PortfolioImage to avoid conflict with artist.ts
export type {
  PortfolioCollection,
  PortfolioItem,
  PortfolioFormData
} from "./portfolio";
export * from "./profile";
export * from "./profile-completion";
export * from "./reviews";
export * from "./salon";
export * from "./salonSale";
export * from "./BookingStatsItem";
export * from "./SalonMessage";


// Add types exports for the application

// Re-export all type definitions for easier imports
export * from "./activity";
// Export artist types except PortfolioImage to avoid conflict
export type {
  ArtistProfile,
  ArtistStats,
  HighlightStat,
  ProfileHighlightProps
} from "./artist";
export * from "./availability";
export * from "./booking";
export * from "./booth";
export * from "./job";
export * from "./listing";
export * from "./map";
export * from "./MessageSender";
export * from "./notification";
// Export from portfolio with PortfolioImage to be the canonical source
export type {
  PortfolioCollection,
  PortfolioItem,
  PortfolioFormData,
  PortfolioImage
} from "./portfolio";
export * from "./profile";
export * from "./profile-completion";
export * from "./reviews";
export * from "./salon";
export * from "./salonSale";
export * from "./BookingStatsItem";
export * from "./SalonMessage";

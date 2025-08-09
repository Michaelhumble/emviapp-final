export const isProd = () =>
  process.env.NODE_ENV === "production" ||
  (process.env.VERCEL_ENV || "").toLowerCase() === "production";

export const isPreview = () => !isProd();

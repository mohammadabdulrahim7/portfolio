export const isBrowser = typeof window !== "undefined";

export const isProduction = process.env.NODE_ENV === "production";

export const isStrictContent = process.env.STRICT_CONTENT === "1";

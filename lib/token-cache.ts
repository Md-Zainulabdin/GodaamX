/* =========================================================
   Token Cache (Client-side only)
   ========================================================= */

let cachedToken: string | null = null;

export const setCachedToken = (token: string | null) => {
  cachedToken = token;
};

export const getCachedToken = () => {
  return cachedToken;
};

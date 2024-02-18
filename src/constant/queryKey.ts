export const QUERY_KEY = {
  PRODUCT: {
    NAME: ["product"] as const,
    MAIN: () => [...QUERY_KEY.PRODUCT.NAME] as const,
  },
};

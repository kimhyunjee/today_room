export const QUERY_KEY = {
  PRODUCT: {
    NAME: ["product"] as const,
    MAIN: () => [...QUERY_KEY.PRODUCT.NAME] as const,
    DETAIL: (productId: string) =>
      [...QUERY_KEY.PRODUCT.NAME, productId] as const,
  },
};

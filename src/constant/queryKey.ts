export const QUERY_KEY = {
  PRODUCT: {
    NAME: ["product"] as const, // 수정 불가한 readonly 성격으로 바뀜
    MAIN: () => [...QUERY_KEY.PRODUCT.NAME] as const,
    DETAIL: (productId: string) =>
      [...QUERY_KEY.PRODUCT.NAME, productId] as const,
    CATEGORY: (category: string) =>
      [...QUERY_KEY.PRODUCT.NAME, category] as const,
  },
};

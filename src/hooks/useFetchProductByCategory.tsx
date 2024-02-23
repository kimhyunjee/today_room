import { QUERY_KEY } from "@/constant/queryKey";
import { db } from "@/lib/firebase/firebase.config";
import { Product } from "@/lib/firebase/types";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  collection,
  query,
  startAfter,
  limit,
  getDocs,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

const useFetchProductByCategory = (category: string) => {
  const fetchProductByCategory = async (
    pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData>
  ) => {
    const productByCategory = query(
      collection(db, "product"),
      where("category", "==", category),
      limit(4),
      ...(pageParam ? [startAfter(pageParam)] : []) // 추가 코드
      // 처음 pageParam이 undefined임-> productByCategory undefined면 [] / next기능과 같음
    );
    const documentSnapshots = await getDocs(productByCategory);

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    console.log("last", lastVisible);

    const data = documentSnapshots.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as Product;
    });

    return { data, lastVisible };

    // const next = query(
    //   collection(db, "product"),
    //   where("category", "==", category),
    //   startAfter(lastVisible),
    //   limit(8)
    // );
  };
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEY.PRODUCT.CATEGORY(category),
    queryFn: ({
      pageParam, //다음에 받아올 데이터가 있는지
    }: {
      pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData>;
    }) => fetchProductByCategory(pageParam),
    initialPageParam: undefined, //맨 처음 한 번만 들어가는 param
    // ...options,
    getNextPageParam: ({ data, lastVisible }) => {
      if (data.length >= 4) return lastVisible;
      return undefined;
    },
    // getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });
  return { data, hasNextPage, fetchNextPage };
};

export default useFetchProductByCategory;

import { useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";
import { Product } from "@/lib/firebase/types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/queryKey";

const useFetchProduct = () => {
  const [dataList, setDataList] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const q = collection(db, "product");
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as Product;
      });
      console.log(data);
      setDataList(data);

      return data;
    } catch (error) {
      console.log("error", error);
    }
  };
  const { isLoading, data, isError, error } = useQuery({
    queryKey: QUERY_KEY.PRODUCT.MAIN(),
    queryFn: fetchData,
  });

  return { dataList, setDataList };
};

export default useFetchProduct;

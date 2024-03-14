import { useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";
import { CartProduct, Product } from "@/lib/firebase/types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/queryKey";

const useFetchCartList = () => {
  const fetchCart = async () => {
    try {
      const q = collection(db, "cart");
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as CartProduct;
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const { data: cartList } = useQuery({
    queryKey: QUERY_KEY.AUTH.CART(),
    queryFn: fetchCart,
  });
  return { cartList: cartList ?? [] };
};

export default useFetchCartList;

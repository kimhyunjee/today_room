import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/queryKey";
import { Product } from "@/lib/firebase/types";

const useFetchProduct = (productId: string) => {
  const fetchData = async () => {
    try {
      const productRef = doc(db, "product", productId);
      const docSnap = await getDoc(productRef);

      if (docSnap.exists()) {
        const { id } = docSnap;
        const data = docSnap.data() as Product;

        return { ...data, id };
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: QUERY_KEY.PRODUCT.DETAIL(productId),
    queryFn: fetchData,
  });

  return { product };
};

export default useFetchProduct;

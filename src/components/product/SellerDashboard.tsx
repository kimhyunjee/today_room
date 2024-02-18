import useFetchProduct from "@/hooks/useFetchProduct";
import { Button } from "../ui/button";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/queryKey";
import { queryClient } from "@/App";

const SellerDashboard = () => {
  const { dataList } = useFetchProduct();
  const { mutate } = useMutation({
    mutationFn: ({ productId }: { productId: string }) =>
      productDelete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.PRODUCT.MAIN() });
    },
  });

  const productDelete = async (productId: string) => {
    await deleteDoc(doc(db, "product", productId));
  };

  const handleClick = (productId: string) => {
    mutate({ productId });
  };

  return (
    <>
      {dataList.map((item) => {
        return (
          <div>
            <p>{item.title}</p>
            <Button onClick={() => handleClick(item.id)}>삭제</Button>
          </div>
        );
      })}
    </>
  );
};

export default SellerDashboard;

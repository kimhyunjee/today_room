import useFetchProducts from "@/hooks/useFetchProducts";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/queryKey";
import { queryClient } from "@/App";
import { Product } from "@/lib/firebase/types";

const SellerDashboard = () => {
  const { dataList } = useFetchProducts();
  const { mutate } = useMutation({
    mutationFn: ({ productId }: { productId: string }) =>
      productDelete(productId),
    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY.PRODUCT.MAIN() });
      const previousProduct = queryClient.getQueryData(
        QUERY_KEY.PRODUCT.MAIN()
      );
      queryClient.setQueryData(
        QUERY_KEY.PRODUCT.MAIN(),
        (prevProduct: Product[]) =>
          prevProduct.filter((product) => product.id !== productId)
      );
      return { previousProduct };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        QUERY_KEY.PRODUCT.MAIN(),
        context?.previousProduct
      );
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
      <Table>
        <TableCaption>최근 등록한 상품들입니다</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">이미지</TableHead>
            <TableHead className="w-[100px]">상품명</TableHead>
            <TableHead className="w-[100px]">카테고리</TableHead>
            <TableHead className="w-[600px]">상품설명</TableHead>
            <TableHead className="w-[100px]">가격</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataList.map((data) => (
            <TableRow key={data.productId}>
              <TableCell>
                <img src={data.img} />
              </TableCell>
              <TableCell className="font-medium">{data.title}</TableCell>
              <TableCell></TableCell>
              <TableCell>{data.description}</TableCell>
              <TableCell>{data.price}</TableCell>
              <TableCell className="text-right">
                <Button onClick={() => handleClick(data.id)}>삭제</Button>
                <Link to={`/editProduct/${data.id}`}>수정</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default SellerDashboard;

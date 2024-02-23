import { Button } from "@/components/ui/button";
import useFetchProductByCategory from "@/hooks/useFetchProductByCategory";
import { useParams } from "react-router-dom";

const ProductByCategoryPage = () => {
  const { id } = useParams() as { id: string };
  const { data, fetchNextPage, hasNextPage } = useFetchProductByCategory(id);

  console.log(data);
  return (
    <>
      <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        누르기
      </Button>

    </>
  );
};

export default ProductByCategoryPage;

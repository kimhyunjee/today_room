import { Button } from "../ui/button";
import ProductLayout from "./ProductLayout";
import useFetchProduct from "@/hooks/useFetchProduct";


const ProductByCategory = () => {
  const { dataList } = useFetchProduct()
  return (
    <>
      <h2> </h2>
      <div>
        <div>
          <Button>Table </Button>
          <Button>Sofa </Button>
          <Button>Bed </Button>
          <Button>Chair </Button>
          <Button>Closet </Button>
        </div>
        <div>
          <Button>더보기</Button>
        </div>
      </div>
      <div>
        <ProductLayout dataList={dataList}/>
      </div>
    </>
  );
};

export default ProductByCategory;

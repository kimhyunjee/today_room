import ProductDetail from "@/components/product/ProductDetail";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams() as { id: string };
  console.log(id);

  return <>
  <ProductDetail productId={id} />
  </>;
};

export default ProductDetailPage;

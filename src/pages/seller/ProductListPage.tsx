import Products from "@/components/product/Products";
import { auth } from "@/firebase";

const ProductListPage = () => {
  console.log("현재 로그인한 유저 정보", auth.currentUser);
  return <>{Products}</>;
};

export default ProductListPage;

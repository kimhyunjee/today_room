import Products from "@/components/product/Products";
import { auth } from "@/firebase";
import ProductByCategory from "@/components/product/ProductByCategory";

const ProductMainPage = () => {
  console.log("현재 로그인한 유저 정보", auth.currentUser?.email);
  const userId = auth.currentUser?.uid;
  const user = auth.currentUser;
  console.log(user);
  const productList = Products;
  console.log(productList);
  return (
    <>

      <ProductByCategory />
    </>
  );
};

export default ProductMainPage;

import { auth } from "@/lib/firebase/firebase.config";
import ProductByCategory from "@/components/product/ProductByCategory";

const ProductMainPage = () => {
  const user = auth.currentUser;
  const userId = user?.uid;
  console.log("현재 로그인한 유저 정보", user?.email);

  return (
    <>
      <ProductByCategory />
    </>
  );
};

export default ProductMainPage;

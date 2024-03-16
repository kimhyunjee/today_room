import { auth } from "@/lib/firebase/firebase.config";
import ProductByCategoryPage from "./ProductByCategoryPage";

const ProductMainPage = () => {
  const user = auth.currentUser;
  console.log("현재 로그인한 유저 정보", user?.email);

  return (
    <>
      <ProductByCategoryPage />
    </>
  );
};

export default ProductMainPage;

import { useState, useEffect } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { onAuthStateChanged, getAuth, User } from "firebase/auth";

import ProductMain from "../pages/seller/ProductMainPage";
import LogInPage from "../pages/logIn/LogInPage";
import SignUpPage from "../pages/logIn/SignUpPage";
import AddProductPage from "../pages/seller/AddProductPage";
import SellerDashboard from "@/components/product/SellerDashboard";
import EditProductPage from "@/pages/seller/EditProductPage";
import CartPage from "@/pages/cart/CartPage";
import ProductByCategoryPage from "@/pages/product/ProductByCategoryPage";
import ProductDetailPage from "@/pages/product/ProductDetailPage";

const Router = () => {
  const [userState, setUserState] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    // console.log(auth);

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      const isAuthenticated = user !== null;
      setUserState(isAuthenticated);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={userState ? <ProductMain /> : <LogInPage />} />
        <Route path="/logIn" element={<LogInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/addProduct" element={<AddProductPage />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/editProduct/:id" element={<EditProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductByCategoryPage />} />
        <Route path="/product/detail/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
};

export default Router;

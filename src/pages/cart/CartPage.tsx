import { useState } from "react";
import useFetchCartList from "@/hooks/useFetchCartList";
import CartItem from "@/components/cart/CartItem";

const CartPage = () => {
  const { cartList } = useFetchCartList();
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);

  return (
    <>
      {cartList.map((product, index) => (
        <CartItem key={index} product={product}></CartItem>
      ))}
      <div>
        <p>결제 금액 {totalPaymentAmount}원 </p>
      </div>
    </>
  );
};

export default CartPage;

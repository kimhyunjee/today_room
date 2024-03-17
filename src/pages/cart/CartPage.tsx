import { useEffect, useState } from "react";
import useFetchCartList from "@/hooks/useFetchCartList";
import CartItem from "@/components/cart/CartItem";

const CartPage = () => {
  const { cartList } = useFetchCartList();
  const [cartItemAmountList, setCartItemAmountList] = useState<number[]>([]);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<number>(0);

  useEffect(() => {
    const calculateTotal = () => {
      const cartItemAmountArray = cartList.map((cart) => cart.total).flat();
      const totalAmount = cartItemAmountArray.reduce(
        (acc, cur) => acc + cur,
        0
      );

      if (totalPaymentAmount !== totalAmount) {
        setTotalPaymentAmount(totalAmount);
      }
    };

    calculateTotal();
  }, [cartList]);

  // const handleCheckboxChange = (isChecked: boolean, price: number) => {
  //   if (isChecked) {
  //     setTotalPaymentAmount((current) => current + price);
  //   } else {
  //     setTotalPaymentAmount((current) => current - price);
  //   }
  // };

  //{totalPaymentAmount.reduce((acc, num) => acc + num, 0)}원

  return (
    <>
      {cartList.map((product, index) => (
        <CartItem
          key={index}
          product={product}
          // onCheckboxChange={handleCheckboxChange}
        ></CartItem>
      ))}
      <div>
        <p>총 결제 금액 {totalPaymentAmount}원 </p>
        <button>주문하러 가기</button>
      </div>
    </>
  );
};

export default CartPage;

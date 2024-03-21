import { useEffect, useState } from "react";
import useFetchCartList from "@/hooks/useFetchCartList";
import CartItem from "@/components/cart/CartItem";

const CartPage = () => {
  const { cartList } = useFetchCartList();
  const [checkedList, setCheckedList] = useState<
    {
      id: string;
      amount: number;
    }[]
  >([]);


  return (
    <>
      {cartList.map((product, index) => (
        <CartItem
          key={index}
          product={product}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          cartList={cartList}
        ></CartItem>
      ))}
      <div>
        <p>
          총 결제 금액
          {checkedList.reduce((total, item) => total + item.amount, 0)}원
        </p>
        <button>주문하러 가기</button>
      </div>
    </>
  );
};

export default CartPage;

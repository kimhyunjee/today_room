import { DocumentData, Timestamp } from "firebase/firestore";

export interface Product {
  title: string;
  description: string;
  img: string[];
  price: number;
  id: string;
  category: string;
  sellerId: string;
  productId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CartProduct extends Product {
  count: number;
  total: number;
}

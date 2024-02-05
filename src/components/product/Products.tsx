import { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

import { Button } from "@/components/ui/button";

interface ProductType {
  id: string;
  img: string[];
  title: string;
  price: number;
  description: string;
}

const Products = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "product"));
        const querySnapshot = await getDocs(q);

        const initialProduct: ProductType[] = [];

        querySnapshot.forEach((doc) => {
          // console.log(doc, "id", doc.id, "data", doc.data());
          initialProduct.push({ id: doc.id, ...doc.data() } as ProductType);
          <div>{doc.id}</div>;
        });

        setProduct(initialProduct);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  console.log(product);

  return;
  {
    product;
  }
};

export default Products;

import { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

interface ProductType {
  id: string;
  img: string[];
  title: string;
  price: number;
  description: string;
}

const Products = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });

        // const q = query(collection(db, "product"));
        // const querySnapshot = await getDocs(q);

        // const initialProduct: ProductType[] = [];

        // querySnapshot.forEach((doc) => {
        //   // console.log(doc, "id", doc.id, "data", doc.data());
        //   initialProduct.push({ id: doc.id, ...doc.data() } as ProductType);
        //   <div>{doc.id}</div>;
        // });

        // setProduct(initialProduct);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();


  return;
  {
    product;
  }
};

export default Products;

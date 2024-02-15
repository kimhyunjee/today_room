import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface ProductData {
  title: string;
  description: string;
  img: [];
  price: "";
  id: "";
}

const useFetchProduct = () => {
  const [dataList, setDataList] = useState<(ProductData | string)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = collection(db, "product");
        const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());
        // });
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(data);
        setDataList(data);

        return data;
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  return { dataList, setDataList };
};

export default useFetchProduct;

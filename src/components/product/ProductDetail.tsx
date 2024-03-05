import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

import useFetchProduct from "@/hooks/useFetchProduct";
import { useState } from "react";

import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage, db } from "@/lib/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

interface Props {
  productId: string;
}

const ProductDetail = ({ productId }: Props) => {
  const { product } = useFetchProduct(productId);
  const [count, setCount] = useState<number>(1);

  if (!product) {
    return <p>Loading...</p>;
  }

  const { title, description, img, price, category } = product || {};

  const onChangeCount = (value: string) => {
    setCount(Number(value));
  };

  // const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  //   const files = await Promise.all(promises);
  //   try {
  //     const docRef = await addDoc(collection(db, "product"), {
  //       title: data.title,
  //       description: data.description,
  //       img: files,
  //       price: data.price,
  //       category: data.category,
  //       totalPrice: data.totalPrice,
  //       count: data.count,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //     navigate(`/cart/${data.category}`);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  return (
    <>
      <div className="flex justify-center m-8">
        <Card className="w-4/12 m-8">
          <Carousel>
            {img.map((src, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 shadow-none ">
                  <CardContent className="flex aspect-square items-center justify-center p-6 ">
                    <div className="w-full h-full object-cover">
                      <img
                        src={src}
                        alt={`img ${index}`}
                        className="w-full h-full object-fit"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Card>

        <div className="m-8 w-4/12 flex flex-col justify-between">
          <div>
            <p className="text-gray-light text-sm">{category}</p>
            <p className="text-gray mt-2"> {description}</p>
          </div>
          <div>
            <p className="text-2xl mt-4">{title}</p>
            <div className="flex justify-between items-center mt-2">
              <Select
                defaultValue="1"
                value={String(count)}
                onValueChange={onChangeCount}
              >
                <SelectTrigger className="w-4/12">
                  <SelectValue>{count}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => String(i + 1)).map(
                    (selectValue) => (
                      <SelectItem value={selectValue}>{selectValue}</SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <p className="text-xl"> {count * price}원</p>
            </div>
          </div>

          <div className="flex justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  장바구니
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    상품이 장바구니에 담겼습니다
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    장바구니로 이동하시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>계속 쇼핑하기</AlertDialogCancel>
                  <AlertDialogAction>
                    <Link to={`/cart`}> 장바구니 보러가기</Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button variant="outline" className="w-full">
              바로구매
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

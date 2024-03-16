import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import useFetchProduct from "@/hooks/useFetchProduct";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage, db } from "@/lib/firebase/firebase.config";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

interface Props {
  productId: string;
}

const FormSchema = z.object({
  title: z.string().min(1, { message: "상품명을 입력해주세요" }).optional(),
  description: z
    .string()
    .min(1, { message: "상품 설명을 입력해주세요" })
    .optional(),
  price: z
    .string()
    .min(1, { message: "상품 가격을 입력해주세요" })
    .or(z.number())
    .optional(),
  category: z.string().min(1, { message: "" }),
});

const ProductDetail = ({ productId }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // img: "",
      title: "",
      description: "",
      price: "",
    },
  });

  const { product } = useFetchProduct(productId);
  const [count, setCount] = useState<number>(1);

  if (!product) {
    return <p>Loading...</p>;
  }

  const { title, description, img, price, category } = product || {};

  const onChangeCount = (value: string) => {
    setCount(Number(value));
  };

  const totalPrice = count ? Number(count) * Number(product?.price) : 0;

  // 장바구니 버튼을 누르면
  // 상품정보 + 선택된 갯수, 총 금액 정보 전달/ cart컬렉션
  const handleAddCart = async (count: Number) => {
    try {
      const q = query(collection(db, "cart"), where("id", "==", productId));
      const querySnap = await getDocs(q);

      let productAlreadyExists = false;
      querySnap.docs.map((doc) => {
        console.log(doc.data().id == productId);
        if (doc.data().id == productId) {
          console.log("이미 장바구니에 상품이 있음");
          productAlreadyExists = true;
        }
      });

      if (!productAlreadyExists) {
        const docRef = await addDoc(collection(db, "cart"), {
          ...product,
          total: totalPrice,
          count: count,
        });
        const cartProductRef = doc(db,"cart",docRef.id)
        await updateDoc(cartProductRef,{uid:docRef.id})
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleAddCart(count)}
                >
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
                    <Link to={`/cart/:id`}> 장바구니 보러가기</Link>
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

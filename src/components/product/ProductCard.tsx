import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { FaCartPlus } from "react-icons/fa6";

import { Product } from "@/lib/firebase/types";
import { Link } from "react-router-dom";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage, db } from "@/lib/firebase/firebase.config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import useFetchProduct from "@/hooks/useFetchProduct";

interface Props {
  dataList: Product[];
}

const ProductCard = ({ dataList }: Props) => {
  const handleAddCart = (product: Product) => {
    console.log(product);
  };

  return (
    <>
      {dataList?.map((item: Product) => (
        <Card key={(item as Product).id} className="w-[240px] h-100 my-8">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {item.img.map((src, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 shadow-none">
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
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <CardContent>
            <CardTitle>{(item as Product).title}</CardTitle>
            <CardDescription>{(item as Product).description}</CardDescription>
            <CardDescription> {(item as Product).price}원</CardDescription>
          </CardContent>

          <CardFooter className="flex justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" onClick={() => handleAddCart(item)}>
                  <FaCartPlus />
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
            <Link
              to={`/product/:id`}
              className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              상세보기
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProductCard;

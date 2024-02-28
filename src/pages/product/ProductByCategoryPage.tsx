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
import Skeleton from "@/components/product/Skeleton";
import { FaCartPlus } from "react-icons/fa6";

import useFetchProductByCategory from "@/hooks/useFetchProductByCategory";
import { Link, useParams } from "react-router-dom";
import { Product } from "@/lib/firebase/types";

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ProductByCategoryPage = () => {
  const { id } = useParams() as { id: string };
  const {
    data: product,
    fetchNextPage, //다음 페이지를 요청할 때 사용되는 메서드
    hasNextPage, //다음 페이지가 있는지 판별하는 boolean 값
  } = useFetchProductByCategory(id);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const categories = [
    { label: "Bed", value: "bed" },
    { label: "Table", value: "table" },
    { label: "Sofa", value: "sofa" },
    { label: "Chair", value: "chair" },
    { label: "Closet", value: "closet" },
  ];

  return (
    <>
      <div className="m-8">
        <h1> All Products</h1>
        <div className="border border-gray border-y-2 border-x-0 my-2">
          <div>
            {categories.map((category) => (
              <Link
                to={`/product/${category.value}`}
                key={category.value}
                className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-gray-light hover:font-semibold focus:outline-none active:bg-gray-light  disabled:pointer-events-none disabled:opacity-50 "
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="my-8 mx-8 flex flex-wrap justify-around">
          {product?.pages.map((data) => (
            <Card key={data.id} className="w-[240px] h-100 my-8">
              <Carousel className="w-full max-w-xs">
                <CarouselContent>
                  {data.img.map((src, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-0 shadow-none">
                        <CardContent className="flex aspect-square items-center justify-center p-6 ">
                          <div className="w-full h-full object-cover" ref={ref}>
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
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
                <CardDescription> {data.price}원</CardDescription>
              </CardContent>

              <CardFooter className="flex justify-between">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
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
                        <Link to={`/cart/${data.id}`}> 장바구니 보러가기</Link>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Link
                  to={`/product/`}
                  className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                  border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                >
                  상세보기
                </Link>
              </CardFooter>
            </Card>
          ))}
          {/* {hasNextPage ? <Skeleton /> : <div ref={ref} />} */}
        </div>
      </div>
    </>
  );
};

export default ProductByCategoryPage;

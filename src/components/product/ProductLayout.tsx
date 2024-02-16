import { useState, useEffect } from "react";
import * as React from "react";

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
import { FaCartPlus } from "react-icons/fa6";

import { useQuery } from "@tanstack/react-query";
import useFetchProduct from "@/hooks/useFetchProduct";

interface ProductData {
  title: string;
  description: string;
  img: [];
  price: "";
  id: "";
}

const ProductLayout = ({ dataList }: { dataList: ProductData }) => {
  const [imgList, setImgList] = useState<string[]>([]);
  // const { isLoading, data, isError, error } = useQuery({
  //   queryKey: ["getProduct"],
  //   queryFn: useFetchProduct,
  // });

  useEffect(() => {
    const flattenedImgList = Array.from(Object.values(dataList))
      .filter((item) => item.img && Array.isArray(item.img))
      .reduce((acc, item) => acc.concat(item.img), [] as string[]);

    setImgList(flattenedImgList);
  }, []);

  return (
    <>
      {dataList.map((item: ProductData) => (
        <Card key={(item as ProductData).id} className="w-[240px] h-100 my-8">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {item.img &&
                Array.isArray(item.img) &&
                item.img.map((src, index) => (
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
            <CardTitle>{(item as ProductData).title}</CardTitle>
            <CardDescription>
              {(item as ProductData).description}
            </CardDescription>
            <CardDescription> {(item as ProductData).price}원</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <FaCartPlus />
            </Button>
            <Button variant="outline">상세보기</Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProductLayout;

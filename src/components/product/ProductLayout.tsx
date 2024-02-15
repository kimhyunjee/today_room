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
import { defaultMaxListeners } from "stream";


interface ProductData {
  title: string;
  description: string;
  img: [];
  price: "";
  id: "";
}

const ProductLayout = ({ dataList }) => {
  const [imgList, setImgList] = useState<string[]>([]);
  const {
    isLoading,
    data: product,
    isError,
    error,
  } = useQuery({ queryKey: ["getProduct"], queryFn: useFetchProduct });
  console.log(dataList);

  return (
    <>
      {dataList.map((item) => (
        <Card key={(item as ProductData).id} className="w-[240px] h-80">
          <CardHeader>
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {imgList.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img src={src} alt={`img ${index}`} />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <CardTitle>{(item as ProductData).title}</CardTitle>
            <CardDescription>
              {(item as ProductData).description}
            </CardDescription>
          </CardHeader>
          <CardContent>{(item as ProductData).price}</CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <FaCartPlus />
            </Button>
            <Button variant="outline">구매하기</Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProductLayout;

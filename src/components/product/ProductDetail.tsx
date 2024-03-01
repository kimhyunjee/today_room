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

import useFetchProduct from "@/hooks/useFetchProduct";
import { Button } from "../ui/button";
import { useState } from "react";

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
            <Button variant="outline" className="w-full">
              장바구니
            </Button>
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

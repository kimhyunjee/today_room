import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import useFetchProduct from "@/hooks/useFetchProduct";
import { Product } from "@/lib/firebase/types";
import { useParams } from "react-router-dom";

const CartPage = () => {
  const { id } = useParams() as { id: string };
  const { product } = useFetchProduct(id);

  return (
    <>
      <Card className="w-full h-100 my-8 flex">
        <Carousel className="w-40 max-w-xs bg-blue">
          <CarouselContent>
            {product?.img.map((src, index) => (
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

        <CardContent className="my-4">
          <CardTitle>{product?.title}</CardTitle>
          <CardDescription>{product?.description}</CardDescription>
          <CardDescription> {product?.price}원</CardDescription>
        </CardContent>
      </Card>
    </>
  );
};

export default CartPage;

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

import { Product } from "@/lib/firebase/types";

interface Props {
  dataList: Product[];
}

const ProductLayout = ({ dataList }: Props) => {
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

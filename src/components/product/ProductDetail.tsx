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

interface Props {
  productId: string;
}

const ProductDetail = ({ productId }: Props) => {
  const { product } = useFetchProduct(productId);

  if (!product) {
    return <p>Loading...</p>;
  }

  const { title, description, img, price, category } = product || {};
  console.log(img);

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
              <Select>
                <SelectTrigger className="w-4/12">
                  <SelectValue placeholder="0" />개
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xl"> {price} 원</p>
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

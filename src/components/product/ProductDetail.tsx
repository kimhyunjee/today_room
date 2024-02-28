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
      <div className="flex">
        <Card className="w-4/12 ">
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

          <CardFooter>
            <Button variant="outline">장바구니 담기</Button>
          </CardFooter>
        </Card>
        <div>
          <p>Title: {title}</p>
          <p>Description: {description}</p>
          <p>Price: {price}</p>
          <p>Category: {category}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

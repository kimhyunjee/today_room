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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { CartProduct } from "@/lib/firebase/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";

const ProductCount = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const [productValue, setProductValue] = useState(product.count);
  const [openPopover, setOpenPopover] = useState(false);

  const [productTotalAmount, setProductTotalAmount] = useState(product.total);

  const handleSelect = async (value: number) => {
    setProductValue(value);
    const ref = doc(db, "cart", product.uid);
    await updateDoc(ref, {
      count: value,
      total: value * product.price,
    });
    setOpenPopover(false);
    setProductTotalAmount(value * product.price);
  };

  return (
    <>
      <Card className="w-full h-100 my-8 flex">
        <Carousel className="w-40 max-w-xs bg-blue">
          <CarouselContent>
            {product.img.map((src, index) => (
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
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
          <CardDescription>{product.price}원</CardDescription>
        </CardContent>

        {/* 상품 수량 선택 Popover */}
        <CardContent>
          <Popover
            open={openPopover}
            onOpenChange={(isOpen) => setOpenPopover(true)}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openPopover}
                className="w-[150px] justify-between"
              >
                {productValue
                  ? ProductCount.find(
                      (ProductCount) => ProductCount.value === productValue
                    )?.label
                  : "상품 수량 선택"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {ProductCount.map((ProductCount) => (
                    <CommandItem
                      key={ProductCount.value}
                      value={ProductCount.value.toString()}
                      onSelect={() => {
                        handleSelect(ProductCount.value);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          productValue === ProductCount.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {ProductCount.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>

        {/* 총 합계 금액 */}
        <CardContent> {productTotalAmount}원</CardContent>
      </Card>
    </>
  );
};

export default CartItem;

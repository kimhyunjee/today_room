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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCartPlus } from "react-icons/fa6";

const ProductLayout = () => {
  return (
    <>
      <Card className="w-[240px] h-80">
        <CardHeader>
          <CardTitle>상품명</CardTitle>
          <CardDescription>상품 가격</CardDescription>
        </CardHeader>
        <CardContent>
          <p>상품 이미지 </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <FaCartPlus />
          </Button>
          <Button variant="outline">구매하기</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductLayout;

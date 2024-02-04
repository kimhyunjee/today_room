import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  img: z.string().min(1),
  title: z.string().min(1, { message: "상품명을 입력해주세요" }),
  description: z.string().min(1, { message: "상품 설명을 입력해주세요" }),
  price: z
    .string()
    .min(1, { message: "상품 가격을 입력해주세요" })
    .or(z.number()),
});

const AddProductPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      img: "",
      title: "",
      description: "",
      price: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="picture">
                  상품 이미지를 등록하세요
                </FormLabel>
                <FormControl>
                  <Input id="picture" type="file" multiple {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="productName">
                  상품명을 입력해주세요
                </FormLabel>
                <FormControl>
                  <Input id="productName" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">
                  상품 설명을 입력해주세요
                </FormLabel>
                <FormControl>
                  <Input id="description" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="price">상품 가격을 입력해주세요</FormLabel>
                <FormControl>
                  <Input id="price" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <Button type="submit">상품 등록</Button>
        </form>
      </Form>
    </>
  );
};

export default AddProductPage;

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

const FormSchema = z.object({
  img: z.string().min(1),
  // title: z.string().min(1, { message: "상품명을 입력해주세요" }),
  // description: z.string().min(1, { message: "상품 설명을 입력해주세요" }),
  // price: z
  //   .string()
  //   .min(1, { message: "상품 가격을 입력해주세요" })
  //   .or(z.number()),
});

const AddProductPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      img: "",
      // title: "",
      // description: "",
      // price: "",
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
                <FormLabel>상품 이미지</FormLabel>
                <FormControl>
                  <Label htmlFor="picture">상품 이미지를 등록하세요</Label>
                  <Input id="picture" type="file" multiple {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        </form>
      </Form>
    </>
  );
};

export default AddProductPage;

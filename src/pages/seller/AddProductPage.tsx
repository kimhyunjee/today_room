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
import { useState, useRef } from "react";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

const FormSchema = z.object({
  img: z.string().min(1),
  title: z.string().min(1, { message: "상품명을 입력해주세요" }),
  description: z.string().min(1, { message: "상품 설명을 입력해주세요" }),
  price: z
    .string()
    .min(1, { message: "상품 가격을 입력해주세요" })
    .or(z.number()),
});

interface Props {
  data?: string[];
  limit?: number;
  handleFile: (val: File) => void;
  handleImgSrcList?: (val: string[]) => void;
}

const AddProductPage = () => {
  const [previewImageFiles, setPreviewImageFiles] = useState<string[]>([]);
  const [uploadImageFiles, setUploadImageFiles] = useState<string[]>([]);
  const [imgSrcList, setImgSrcList] = useState<string[]>([]);


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      img: "",
      title: "",
      description: "",
      price: "",
    },
  });

  const UploadImage = ({
    setUploadImageFiles,
  }: {
    setUploadImageFiles: (p: string) => void;
  }) => {};

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return null;
    console.log(file);

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytes(storageRef, file);

    uploadTask.then((shapshot) => {
      e.target.value="";
      getDownloadURL(shapshot.ref).then((downloadURL)=> {
console.log("file abailable at",downloadURL);
// setUploadImageFiles(downloadURL);
// setUploadImageFiles(downloadURL);


      })
    })

    // const fileReader = new FileReader();
    // // fileReader.readAsDataURL(file);
    // fileReader.onload = (e) => {
    //   const result = e?.target?.result as string;
    //   setImgSrcList([...imgSrcList, result]);
    // };
  };

  const fileRef = useRef<HTMLInputElement>(null);



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
                  <Input
                    id="picture"
                    type="file"
                    multiple
                    {...field}
                    onChange={onChangeImg}
                    ref={fileRef}
                  />
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

          <Button type="submit" className="border m-4">
            상품 등록
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddProductPage;

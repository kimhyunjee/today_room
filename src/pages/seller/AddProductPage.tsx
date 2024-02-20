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
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage, db } from "@/lib/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  // img: z.string().min(1).optional(),
  title: z.string().min(1, { message: "상품명을 입력해주세요" }).optional(),
  description: z
    .string()
    .min(1, { message: "상품 설명을 입력해주세요" })
    .optional(),
  price: z
    .string()
    .min(1, { message: "상품 가격을 입력해주세요" })
    .or(z.number())
    .optional(),
});

interface Props {
  data?: string[];
  limit?: number;
  handleFile: (val: File) => void;
  handleImgSrcList?: (val: string[]) => void;
}

const AddProductPage = () => {
  const [previewImageFiles, setPreviewImageFiles] = useState<string[]>([]);
  const [uploadImageFiles, setUploadImageFiles] = useState<FileList>();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // img: "",
      title: "",
      description: "",
      price: "",
    },
  });

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files;
    if (!file) return null;

    const previewImages = Array.from(file).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImageFiles(previewImages);
    setUploadImageFiles(file);
    // e.target.value = "";
  };

  const uploadFile = async (file: File) => {
    //파일을 업로드하려는 firebase storage에 대한 참조생성 / 폴더명은 product
    const storageRef = ref(storage, `product/${file.name}`);
    console.log(file);
    // ref로 만든 참조와 해당 파일을 매개변수로 하여 파일을 업로드
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };
  console.log(uploadImageFiles); //FileList {name: "",...}

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data.title);
    const promises = Array.from(uploadImageFiles as FileList).map((file) =>
      uploadFile(file)
    );
    const files = await Promise.all(promises);
    console.log(files);

    try {
      const docRef = await addDoc(collection(db, "product"), {
        title: data.title,
        description: data.description,
        img: files,
        price: data.price,
      });
      console.log("Document written with ID: ", docRef.id);
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {previewImageFiles.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={src} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Input
        id="picture"
        type="file"
        multiple
        // {...field}
        onChange={onChangeImg}
        // ref={fileRef}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <Textarea {...field} />
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

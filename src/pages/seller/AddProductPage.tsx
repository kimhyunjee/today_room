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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const FormSchema = z.object({
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
  category: z.string().min(1, { message: "" }),
});

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
  };

  const uploadFile = async (file: File) => {
    //파일을 업로드하려는 firebase storage에 대한 참조생성 / 폴더명은 product
    const storageRef = ref(storage, `product/${file.name}`);
    // ref로 만든 참조와 해당 파일을 매개변수로 하여 파일을 업로드
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const promises = Array.from(uploadImageFiles as FileList).map((file) =>
      uploadFile(file)
    );
    const files = await Promise.all(promises);

    try {
      const docRef = await addDoc(collection(db, "product"), {
        title: data.title,
        description: data.description,
        img: files,
        price: data.price,
        category: data.category,
      });
      console.log("Document written with ID: ", docRef.id);
      navigate(`/product/${data.category}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Card className="w-1/3 h-100 my-8 flex flex-col items-center">
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

        <div className="py-4">
          <Label htmlFor="picture" className="py-2 border rounded-md p-2">
            상품 이미지를 선택해주세요
          </Label>
          <Input
            id="picture"
            type="file"
            multiple
            onChange={onChangeImg}
            className="hidden"
          />
        </div>

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
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full my-2">
                      <SelectValue placeholder="카테고리를 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="bed">bed</SelectItem>
                        <SelectItem value="table">table</SelectItem>
                        <SelectItem value="sofa">sofa</SelectItem>
                        <SelectItem value="chair">chair</SelectItem>
                        <SelectItem value="closet">closet</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

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
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">
                    상품 가격을 입력해주세요
                  </FormLabel>
                  <FormControl>
                    <Input id="price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="border my-4">
              상품 등록
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default AddProductPage;

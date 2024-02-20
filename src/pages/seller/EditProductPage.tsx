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
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Product } from "@/lib/firebase/types";
import { useForm } from "react-hook-form";
import { useNavigate, Location, useLocation } from "react-router-dom";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase/firebase.config";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useFetchProduct from "@/hooks/useFetchProduct";

interface Props {
  dataList: Product[];
}

const EditProductPage = (data: Props) => {
  const [previewImageFiles, setPreviewImageFiles] = useState<string[]>([]);
  const [uploadImageFiles, setUploadImageFiles] = useState<FileList>();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as Props;
  console.log(state.data.img);

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
    console.log(file);
    // ref로 만든 참조와 해당 파일을 매개변수로 하여 파일을 업로드
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const editHandler = async (data: z.infer<typeof FormSchema>) => {
    console.log(data.title);
    const promises = Array.from(uploadImageFiles as FileList).map((file) =>
      uploadFile(file)
    );
    const files = await Promise.all(promises);
    console.log(files);

    try {
      const docRef = doc(db, "product");
      await updateDoc(docRef, {
        title: data.title,
        description: data.description,
        img: files,
        price: data.price,
      });
      console.log("Document written with ID: ", docRef.id);
      navigate("/seller");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Card className="w-1/3 h-100 my-8 ">
        <div>
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {previewImageFiles.map((src, index) => (
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

          <Input id="picture" type="file" multiple onChange={onChangeImg} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(editHandler)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="productName" className="px-3">
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
                    <FormLabel htmlFor="description" className="px-3">
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
                    <FormLabel htmlFor="price" className="px-3">
                      상품 가격을 입력해주세요
                    </FormLabel>
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
        </div>
      </Card>
    </>
  );
};

export default EditProductPage;

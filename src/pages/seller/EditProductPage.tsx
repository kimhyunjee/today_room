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

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProduct from "@/hooks/useFetchProduct";

import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { Product } from "@/lib/firebase/types";
import { db, storage } from "@/lib/firebase/firebase.config";

const EditProductPage = () => {
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };
  const { product } = useFetchProduct(id) as { product: Product };

  const [previewImageFiles, setPreviewImageFiles] = useState<string[]>(
    product?.img || []
  );
  const [uploadImageFiles, setUploadImageFiles] = useState<FileList>();

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
    // ref로 만든 참조와 해당 파일을 매개변수로 하여 파일을 업로드
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const storageDelete = async (file: File) => {
    const storageRef = ref(storage, `product/${file.name}`);

    const downloadURL = await getDownloadURL(storageRef);

    let productRef;

    const match = downloadURL.match(/product([^\/]+)\.png/);

    if (match) {
      const productName = match[1];
      console.log(productName);
      const decodeName = decodeURIComponent(`${productName}`);
      console.log(decodeName);

      productRef = ref(storage, `product/${decodeName}`);
    }

    if (productRef) {
      deleteObject(productRef)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const url =
  //   "https://firebasestorage.googleapis.com/v0/b/today-room.appspot.com/o/product%2F%EC%B4%88%EC%BD%94%EB%83%A5PC.png?alt=media&token=277f754a-4272-4291-8f07-146a8edc7652";

  const editHandler = async (newData: z.infer<typeof FormSchema>) => {
    const promises = Array.from(uploadImageFiles as FileList).map((file) =>
      uploadFile(file)
    );
    const files = await Promise.all(promises);

    try {
      const docRef = doc(db, "product", product.id);
      await updateDoc(docRef, {
        title: newData.title,
        description: newData.description,
        img: files,
        price: newData.price,
      });
      await storageDelete(files);
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
                      <Input
                        id="productName"
                        {...field}
                        placeholder={product?.title}
                      />
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
                      <Textarea {...field} placeholder={product?.description} />
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
                수정 완료
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default EditProductPage;

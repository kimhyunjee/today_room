import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { auth } from "@/lib/firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  //isSeller: z.string(),
  username: z.string().min(2, { message: "이름을 입력해주세요" }),
  email: z
    .string()
    .min(2, {
      message: "이메일을 입력해주세요",
    })
    .email({ message: "이메일 형식이 아닙니다" }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 입력해주세요" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/, {
      message: "8자 이상의 영문자, 숫자, 특수문자가 필요합니다",
    }),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const to = location.pathname;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      //isSeller: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmitSignUp = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(userCredential);
      localStorage.setItem("user", JSON.stringify(userCredential));
    } catch (error) {
      console.log(error);
    }
    console.log("현재 로그인한 유저 정보", auth.currentUser);
    navigate("/");
  };

  return (
    <>
      <p className="text-2xl text-lime-400"> Today Room </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitSignUp)}
          className="w-2/3 space-y-6"
        >
          {/* {to === "/logIn" ? null : (
            <FormField
              control={form.control}
              name="isSeller"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>판매자/구매자 구분</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="판매자 혹은 구매자를 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="판매자">판매자</SelectItem>
                      <SelectItem value="구매자">구매자</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          )} */}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input placeholder="이름을 적어주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디(이메일)</FormLabel>
                <FormControl>
                  <Input placeholder="아이디를 적어주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder="8자 이상의 영문자, 숫자, 특수문자"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button type="submit">가입 완료</Button>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;

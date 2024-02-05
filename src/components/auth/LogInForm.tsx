import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

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

const LogInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const to = location.pathname;
  const [isLogIn, setIsLogIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogIn = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    try {
      const userLogIn = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(userLogIn);
      localStorage.setItem("user", JSON.stringify(userLogIn));
    } catch (error) {
      console.log(error);
    }
    console.log("현재 로그인한 유저 정보", auth.currentUser);
    navigate("/");
  };

  const logOut = async () => {
    await signOut(auth);
    console.log("현재 로그인한 유저 정보", auth.currentUser);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <p className="text-2xl text-lime-400"> Today Room </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitLogIn)}
          className="w-2/3 space-y-6"
        >
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

          <Button type="submit">로그인</Button>

          <Button asChild>
            <Link to="/signUp">회원가입</Link>
          </Button>

          {/* <Button onClick={logOut}>로그아웃</Button> */}
        </form>
      </Form>
    </>
  );
};

export default LogInForm;

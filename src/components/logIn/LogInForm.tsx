import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "../ui/use-toast";
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
          onSubmit={
            to === "/logIn"
              ? form.handleSubmit(onSubmitLogIn)
              : form.handleSubmit(onSubmitSignUp)
          }
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

          {to === "/logIn" ? null : (
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
          )}
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
          {to === "/logIn" ? (
            <Button type="submit">로그인</Button>
          ) : (
            <Button type="submit">가입 완료</Button>
          )}
          {to === "/logIn" ? (
            <Button asChild>
              <Link to="/signUp">회원가입</Link>
            </Button>
          ) : null}
          {/* <Button onClick={logOut}>로그아웃</Button> */}
        </form>
      </Form>
    </>
  );
};

export default LogInForm;

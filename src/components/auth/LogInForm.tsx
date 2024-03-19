import { zodResolver } from "@hookform/resolvers/zod";
import { logInFormSchema, type LogInFormSchema } from "@/lib/zod/logInSchema";
import { auth } from "@/lib/firebase/firebase.config";
import { useForm } from "react-hook-form";

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

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LogInForm = () => {
  const navigate = useNavigate();
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

  const form = useForm<LogInFormSchema>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogIn = async (data: LogInFormSchema) => {
    try {
      const userLogIn = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
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

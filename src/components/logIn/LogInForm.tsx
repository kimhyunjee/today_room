import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Link, useLocation } from "react-router-dom";

const FormSchema = z.object({
  sortation: z.string(),
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
  const location = useLocation();
  const to = location.pathname;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sortation: "",
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <p className="text-2xl text-lime-400"> Today Room </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          {to === "/logIn" ? null : (
            <FormField
              control={form.control}
              name="sortation"
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
          )}
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
          {to === "/logIn" ? (
            <Button type="submit">
              <Link to="/">로그인</Link>
            </Button>
          ) : (
            <Button type="submit">
              <Link to="/">가입 완료</Link>
            </Button>
          )}
          {to === "/logIn" ? (
            <Button asChild>
              <Link to="/signUp">회원가입</Link>
            </Button>
          ) : null}
        </form>
      </Form>
    </>
  );
};

export default LogInForm;

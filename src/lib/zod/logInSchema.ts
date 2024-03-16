import * as z from "zod";

export const logInFormSchema = z.object({
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

export type LogInFormSchema = z.infer<typeof logInFormSchema>;

import * as z from "zod";

export type RegisterState = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine((args) => args.includes("@")),
  password: z.string().min(1, "Password is required"),
});

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export const LoginSchema = z.object({
  email: z.string().min(1, "Email required"),
  password: z.string().min(1, "Password required"),
});

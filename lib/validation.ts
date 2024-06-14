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
  email: z
    .string()
    .min(1, "Email required")
    .refine((args) => args.includes("@")),
  password: z.string().min(1, "Password required"),
});

export type CreatePostState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

export const CreatePostSchema = z.object({
  title: z.string().min(1, "Title required"),
  content: z.string().min(1, "Content required"),
  imageUrl: z.string().min(1, "Content required"),
});

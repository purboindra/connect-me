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
  email: z.string().min(1, "Email is required").email(),
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
  email: z.string().min(1, "Email required").email(),
  password: z.string().min(1, "Password required"),
});

export type CreatePostState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const CreatePostSchema = z.object({
  title: z.string().min(1, "Title required"),
  content: z.string().min(1, "Content required"),
  hashtags: z.array(z.string()).optional(),
  imageUrl: z
    .any()
    .refine((file) => {
      if (!file) return true;
      return file.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((file) => {
      if (!file) return true;
      return ACCEPTED_IMAGE_MIME_TYPES.includes(file.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  // .optional(),
});

export const EditProfileSchema = z.object({
  username: z
    .string()
    .max(20, "Username should only be maximum 20 characters")
    .optional(),
  bio: z.string().max(50, "Bio should only be maximum 50 character").optional(),
  photoUrl: z.string().optional(),
});

export type EditUserState = {
  errors?: {
    username?: string[];
    bio?: string[];
    photoUrl?: string[];
  };
  message?: string | null;
};

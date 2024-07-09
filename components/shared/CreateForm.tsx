"use client";

import { CreatePostSchema } from "@/lib/validation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createPost } from "@/app/actions/post.action";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "../ui/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="flex w-full justify-end">
      <Button disabled={pending}>{`${pending ? "Loading..." : "Post"}`}</Button>
    </div>
  );
}

const initialState = {
  message: null,
  errors: {},
};

export const CreateForm = () => {
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [state, dispatch] = useFormState(createPost, initialState);

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
      hashtags: [],
    },
    // resolver: zodResolver(CreatePostSchema),
  });

  const { control, register } = form;

  // TODO ADD HASHTAGS FROM CLIENT
  const addHashtags = (text: string) => {
    const words = text.split(" ");
    const newHashtags = words.filter(
      (word) => word.startsWith("#") && word.length > 1
    );
    setHashtags(newHashtags);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    if (state.errors.imageUrl) {
      toast({
        title: "Something went wrong",
        description: state.errors.imageUrl[0],
        variant: "destructive",
      });
    }
  }, [state.errors, toast]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex space-y-2 w-full">
      <Form {...form}>
        <form className="w-full space-y-4" action={dispatch}>
          <FormField
            name="title"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    state.errors.title ? "text-red-500" : "text-neutral-800"
                  }`}
                >
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title maximal 100 characters..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {state.errors.title && (
            <p className="text-sm font-normal text-red-600">
              {state.errors.title}
            </p>
          )}
          <FormField
            name="content"
            control={control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    state.errors.content ? "text-red-500" : "text-neutral-800"
                  }`}
                >
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your story.."
                    onChange={(e) => {
                      addHashtags(e.target.value);
                    }}
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {state.errors.content && (
            <p className="text-sm font-normal text-red-600">
              {state.errors.content}
            </p>
          )}
          <div
            className="flex flex-row gap-1 flex-wrap"
            {...register("hashtags", {
              required: true,
            })}
          >
            {hashtags.length > 0 &&
              hashtags.map((hashtag, index) => (
                <div
                  key={index}
                  className="py-1 px-2 rounded-sm bg-neutral-200/60"
                >
                  <p className="text-neutral-600 font-medium flex">
                    {hashtag.replaceAll("#", " ")}
                  </p>
                </div>
              ))}
          </div>
          <FormField
            name="imageUrl"
            control={control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    state.errors.imageUrl ? "text-red-500" : "text-neutral-800"
                  }`}
                >
                  Image
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Upload Imge"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      handleImageChange(event);
                      onChange(event.target.files && event.target.files[0]);
                    }}
                    {...fieldProps}
                  />
                </FormControl>
                {imagePreview && (
                  <div className="mt-4">
                    <Image
                      src={imagePreview}
                      alt="Selected"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />
          {state.errors.imageUrl && (
            <p className="text-sm font-normal text-red-600">
              {state.errors.imageUrl}
            </p>
          )}
          <SubmitButton />
          <Button onClick={() => {}}>Testt</Button>
        </form>
      </Form>
    </div>
  );
};
function zodResolver(
  CreatePostSchema: z.ZodObject<
    {
      title: z.ZodString;
      content: z.ZodString;
      hashtags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      imageUrl: z.ZodOptional<z.ZodAny>;
    },
    "strip",
    z.ZodTypeAny,
    {
      title: string;
      content: string;
      hashtags?: string[] | undefined;
      imageUrl?: any;
    },
    {
      title: string;
      content: string;
      hashtags?: string[] | undefined;
      imageUrl?: any;
    }
  >
):
  | import("react-hook-form").Resolver<
      {
        title: string;
        content: string;
        hashtags?: string[] | undefined;
        imageUrl?: any;
      },
      any
    >
  | undefined {
  throw new Error("Function not implemented.");
}

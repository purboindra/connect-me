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
import { X } from "lucide-react";

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
  errors: null,
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
  });

  const { control, register, setValue } = form;

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
    if (state.errors) {
      let errorMessage;
      const errors = state.errors || {};

      if (typeof errors !== "string") {
        errorMessage = errors?.content?.[0];
      } else {
        errorMessage = errors;
      }

      if (errors) {
        toast({
          title: "Oops...",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  }, [state.errors, toast]);

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
                    state.errors?.title ? "text-red-500" : "text-neutral-800"
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
          {state.errors?.title && (
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
                    state.errors?.content ? "text-red-500" : "text-neutral-800"
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
          {state.errors?.content && (
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
                    state.errors?.imageUrl ? "text-red-500" : "text-neutral-800"
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
                  <div className="h-32 items-center flex ">
                    <div className="relative z-10 p-[2px] bottom-10 left-[76px] rounded-full bg-neutral-50/70 flex items-center">
                      <X
                        size={14}
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedImage(null);
                          setValue("imageUrl", "");
                        }}
                      />
                    </div>
                    <Image
                      src={imagePreview}
                      alt="Selected"
                      width={100}
                      height={100}
                      className="object-cover absolute"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />
          {state.errors?.imageUrl && (
            <p className="text-sm font-normal text-red-600">
              {state.errors.imageUrl}
            </p>
          )}
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};

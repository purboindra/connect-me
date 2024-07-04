"use client";

import { CreatePostSchema } from "@/lib/validation";
import React, { useActionState, useEffect, useState } from "react";
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

  const [state, dispatch] = useFormState(createPost, initialState);
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
      hastags: [],
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [hastags, setHastags] = useState<string[]>([]);

  const addHastags = (text: string) => {
    const words = text.split(" ");
    const newHastags = words.filter(
      (word) => word.startsWith("#") && word.length > 1
    );
    setHastags(newHastags);
    form.setValue("hastags", newHastags, {
      shouldTouch: true,
    });
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      form.setValue("imageUrl", file, {
        shouldTouch: true,
      });
    }
  };

  useEffect(() => {
    if (imagePreview) {
      console.log("imagePreview", imagePreview);
    }
  }, [imagePreview]);

  return (
    <div className="flex space-y-2 w-full">
      <Form {...form}>
        <form className="w-full space-y-4" action={dispatch}>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
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
            control={form.control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your story.."
                    onChange={(e) => {
                      addHastags(e.target.value);
                    }}
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-1 flex-wrap">
            {hastags.length > 0 &&
              hastags.map((hastag, index) => (
                <div
                  key={index}
                  className="py-1 px-2 rounded-sm bg-neutral-200/60"
                >
                  <p className="text-neutral-600 font-medium flex">
                    {hastag.replaceAll("#", " ")}
                  </p>
                </div>
              ))}
          </div>
          {state.errors.content && (
            <p className="text-sm font-normal text-red-600">
              {state.errors.content}
            </p>
          )}
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
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
        </form>
      </Form>
    </div>
  );
};

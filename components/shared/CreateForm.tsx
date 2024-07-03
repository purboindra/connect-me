"use client";

import { CreatePostSchema } from "@/lib/validation";
import React, { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
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

  const [state, dispatch] = useFormState(createPost, initialState);
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    console.log("error happen", state.errors);
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
      console.log("my file", file);
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
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your story.."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};

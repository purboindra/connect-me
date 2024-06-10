"use client";

import { CreatePostSchema } from "@/lib/validation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { createPost } from "@/app/actions/post.action";

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
  const [state, dispatch] = useFormState(createPost, initialState);

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

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
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};

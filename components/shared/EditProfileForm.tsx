"use client";

import { EditProfileSchema } from "@/lib/validation";
import { UserInterface } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface EditProfileFormInterface {
  user: UserInterface;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button>{`${pending ? "Loading..." : "Edit"}`}</Button>;
}

export const EditProfileForm = ({ user }: EditProfileFormInterface) => {
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      bio: user.bio || "No bio yet",
      photoUrl: user.photoUrl || "",
      username: user.username || "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-2 max-w-5xl mx-auto justify-center">
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-7 flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </Form>
  );
};

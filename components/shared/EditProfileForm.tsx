"use client";

import { EditProfileSchema } from "@/lib/validation";
import { UserInterface } from "@/types";
import React, { useEffect, useState } from "react";
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
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { editProfile } from "@/app/actions/user.action";
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

interface EditProfileFormInterface {
  user: UserInterface;
}

export const EditProfileForm = ({ user }: EditProfileFormInterface) => {
  const { toast } = useToast();

  const [mounted, setMounted] = useState(false);

  const updateuserWithId = editProfile.bind(null, user.id);

  const [state, dispatch] = useFormState(updateuserWithId, initialState);

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      bio: user.bio || "No bio yet",
      photoUrl: user.photoUrl || "",
      username: user.username || "",
    },
  });

  useEffect(() => {
    if (state.errors.length > 0) {
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
  }, [state.errors ? JSON.stringify(state.errors) : ""]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Form {...form}>
        <form
          className="flex flex-col space-y-2 max-w-5xl mx-auto justify-center"
          action={dispatch}
        >
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
    )
  );
};
